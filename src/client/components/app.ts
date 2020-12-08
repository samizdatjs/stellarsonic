import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router, NavigationInstruction} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import {Editor} from '@client/services/editor';
import {Theming} from '@client/services/theming';
import {Page} from '@client/interfaces';
import {SEO} from '@client/services/seo';
import {Content} from '@client/services/content';
import {Assets} from '@client/services/assets';
import {Site} from '@client/services/site';

@inject(Site, Editor, Theming, Content, SEO, 'stellarsonic.Environment')
export class App {
  router!: Router;

  constructor(
    public site: Site,
    public editor: Editor,
    private theming: Theming,
    private contentProvider: Content,
    private seo: SEO,
    public env: string,
  ) {}

  async configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    const siteConfig = await this.site.getConfig();
    config.title = siteConfig.title;

    const navStrat = async (instruction: NavigationInstruction) => {
      const content = await this.contentProvider.content(instruction);
      if (content) {
        this.seo.update(content);
      }

      const theme = await this.theming.settings(instruction);

      const urlImages = content ? `/images/${content._id}` : '/images';
      const urlAudio = content ? `/audio/${content._id}` : '/audio';

      const page: Page = {
        route: instruction.config.name,
        theme: theme.settings,
        content: content,
        images: new Assets('image', urlImages),
        audio: new Assets('audio', urlAudio),
      }

      this.editor.setPage(page);

      instruction.config.moduleId = PLATFORM.moduleName(`themes/${theme.name}/${instruction.config.name}`);
      instruction.config.settings = page;
      instruction.config.href = instruction.fragment

    };
    config.map([
      { route: '', name: 'home', navigationStrategy: navStrat },
      { route: 'playlists/:id', name: 'playlist', navigationStrategy: navStrat },
    ]);
  }
}
