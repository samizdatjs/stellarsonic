import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router, NavigationInstruction} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import {Editor} from '@client/services/editor';
import {Theming} from '@client/services/theming';
import {Page} from '@client/interfaces';
import {Database} from '@ziqquratu/ziqquratu';
import {SEO} from '@client/services/seo';

@inject(Editor, Theming, SEO, 'ziqquratu.Database')
export class App {
  router!: Router;

  constructor(
    public editor: Editor,
    private theming: Theming,
    private seo: SEO,
    private database: Database,
  ) {}

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Stellarsonic';

    const navStrat = async (instruction: NavigationInstruction) => {
      let content: any = undefined;

      if (instruction.config.name === 'post') {
        const collection = await this.database.collection('articles');
        content = await collection.findOne({_id: instruction.params.id});
        this.seo.update(content);
      }

      const pageSettings = await this.theming.settings(instruction);
      const themeSettings = pageSettings.themeConfig[pageSettings.theme];
      const page: Page = {
        route: instruction.config.name,
        settings: pageSettings,
        theme: themeSettings,
        content: content,
      }

      this.editor.setPage(page);

      instruction.config.moduleId = PLATFORM.moduleName(`themes/${pageSettings.theme}/${instruction.config.name}`);
      instruction.config.settings = page;
      instruction.config.href = instruction.fragment

    };
    config.map([
      { route: '', name: 'home', navigationStrategy: navStrat },
      { route: 'posts/:id', name: 'post', navigationStrategy: navStrat },
    ]);
  }
}
