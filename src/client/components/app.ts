import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router, NavigationInstruction} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import {Editor} from '@client/services/editor';
import {Theming} from '@client/services/theming';
import {Page} from '@client/interfaces';
import {SEO} from '@client/services/seo';
import {Content} from '@client/services/content';

@inject(Editor, Theming, Content, SEO, 'stellarsonic.Environment')
export class App {
  router!: Router;

  constructor(
    public editor: Editor,
    private theming: Theming,
    private contentProvider: Content,
    private seo: SEO,
    public env: string,
  ) {}

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Stellarsonic';

    const navStrat = async (instruction: NavigationInstruction) => {
      const content = await this.contentProvider.content(instruction);
      if (content) {
        this.seo.update(content);
      }

      const theme = await this.theming.settings(instruction);

      const page: Page = {
        route: instruction.config.name,
        theme: theme.settings,
        content: content,
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
