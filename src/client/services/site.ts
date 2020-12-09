import {autoinject, PLATFORM} from "aurelia-framework";
import {NotificationService} from "./notification";
import {RouterConfiguration, NavigationInstruction, activationStrategy} from "aurelia-router";
import {PagesView} from "@client/views";
import {PageService} from "./page";
import {PageConfig, Page} from "@client/interfaces";

export interface SiteConfig {
  title: string;
  url: string;
  theme: string;
}

@autoinject
export class Site {
  private _config: SiteConfig | undefined;

  constructor(
    private pageService: PageService,
    private notification: NotificationService,
    private pages: PagesView,
  ) {}

  public async getConfig(): Promise<SiteConfig> {
    if (!this._config) {
      const resp = await fetch('/api/site');
      this._config = await resp.json();
    }
    return this._config as SiteConfig;
  }

  public async saveConfig(config: SiteConfig) {
    try {
      const result = await fetch('/api/site', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config),
      });
      this.notification.success('Site settings saved');
      return result.json()
    } catch (err) {
      this.notification.error(err.message);
    }
  }

  public async configureRouter(config: RouterConfiguration) {
    this.configureRouterSync(config, await this.getConfig(), await this.getPages());
  }

  public getPages(): Promise<PageConfig[]> {
    return this.pages.refresh();
  }

  public configureRouterSync(config: RouterConfiguration, siteConfig: SiteConfig, pages: PageConfig[]) {
    config.title = siteConfig.title;

    let page: Page | undefined;

    const navStrat = async (instruction: NavigationInstruction) => {
      const routeConfig = instruction.config;

      routeConfig.activationStrategy = activationStrategy.noChange;

      if (!page || page.config.name !== routeConfig.name) {
        page = await this.pageService.loadPage(routeConfig.name as string, siteConfig.theme);
        routeConfig.activationStrategy = activationStrategy.replace;
      }

      routeConfig.moduleId = PLATFORM.moduleName(`themes/${siteConfig.theme}/${page.config.type}`);
      routeConfig.settings = page;
      routeConfig.href = instruction.fragment

      let viewPorts = routeConfig.viewPorts;
      if (viewPorts) {
        viewPorts.default.moduleId = routeConfig.moduleId;
      }
    };
    config.map(pages.map(p => {
      return { route: p.route || p.name, name: p.name, navigationStrategy: navStrat};
    }));
    return config;
  } 
}