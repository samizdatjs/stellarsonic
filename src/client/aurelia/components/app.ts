import {autoinject} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

@autoinject
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('pages/home') },
      { route: 'posts/:id', name: 'post', moduleId: PLATFORM.moduleName('pages/post') },
    ]);
  }
}
