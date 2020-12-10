import {inject} from "aurelia-framework";
import {Theming} from "./theming";
import {Content} from "./content";
import {SEO} from "./seo";
import {Page, PageConfig } from "@client/interfaces";
import {Assets} from "./assets";
import {Database} from "@ziqquratu/ziqquratu";

@inject(Theming, Content, SEO, 'ziqquratu.Database')
export class PageService {
  constructor(
    private theming: Theming,
    private contentProvider: Content,
    private seo: SEO,
    private database: Database,
  ) {}

  public async loadPage(name: string, themeName: string): Promise<Page> {
    const pagesCollection = await this.database.collection<PageConfig>('pages');
    const config = await pagesCollection.findOne({name});

    if (!config) {
      throw Error(`Page not found: ${name}`);
    }

    let content = undefined;
    if (config.content) {
      content = await this.contentProvider.content(config.content);
      if (content) {
        this.seo.update(content);
      }
    }

    const theme = await this.theming.settings(config, themeName);

    const urlImages = content ? `/images/${config._id}` : '/images';
    const urlAudio = content ? `/audio/${config._id}` : '/audio';

    return {
      theme: theme.settings,
      content: content,
      images: new Assets('image', urlImages),
      audio: new Assets('audio', urlAudio),
      palette: config.palette,
      config,
    }
  }

  public async savePage(page: Page) {
    await this.saveConfig(page.config);

    if (page.content && page.config.content) {
      page.content.url = `/#/${page.config.name}`;
      await this.contentProvider.save(page.content, page.config.content.collection)
    }
    await this.theming.saveConfig(page.theme, page.config._id);
  }

  public async saveConfig(config: PageConfig) {
    const collection = await this.database.collection<PageConfig>('pages');
    if (config._id) {
      return collection.replaceOne({_id: config._id}, config);
    } else {
      return collection.insertOne(config);
    }
  }
}
