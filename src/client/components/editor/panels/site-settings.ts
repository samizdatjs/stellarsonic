import {inject, PLATFORM} from 'aurelia-framework';
import {EditorComponent, EditorComponentConfig} from '@client/interfaces';
import {Router} from 'aurelia-router';
import {Site, SiteConfig} from '@client/services/site';

@inject('stellarsonic.Themes', Site, Router)
export class SiteSettingsCustomElement extends EditorComponent {
  config!: SiteConfig;

  constructor(
    public themes: string[],
    private site: Site,
    private router: Router
  ) {
    super();
  }

  async activate() {
    this.config = await this.site.getConfig();
  }

  async selectTheme() {
    // console.log(this.config.theme);
    // console.log(this.router);
    this.router.navigate(this.router.currentInstruction.fragment, {
      replace:true,
      trigger:true,
    })
  }
/*
  async select(name: string) {
    const config = await this.site.getConfig()
    config.theme = name;
    await this.site.saveConfig(config);
    this.router.navigate('/', {
      replace:true,
      trigger:true,
    })
  }
  */
}

export const siteSettings: EditorComponentConfig = {
  viewModel: SiteSettingsCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/site-settings.html'),
}
