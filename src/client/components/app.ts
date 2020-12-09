import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';
import {Editor} from '@client/services/editor';
import {Site} from '@client/services/site';

@inject(Site, Editor, 'stellarsonic.Environment')
export class App {
  router!: Router;

  constructor(
    public site: Site,
    public editor: Editor,
    public env: string,
  ) {}

  async configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    await this.site.configureRouter(config);
  }
}
