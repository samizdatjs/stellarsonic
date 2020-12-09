import {inject, PLATFORM} from 'aurelia-framework';
import {EditorComponent, EditorComponentConfig, action} from '@client/interfaces';
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
    this.router.navigate(this.router.currentInstruction.fragment, {
      replace:true,
      trigger:true,
    });
  }

  @action({ title: 'save', icon: 'cloud-upload' })
  save() {
    this.site.saveConfig(this.config);
  }
}

export const siteSettings: EditorComponentConfig = {
  viewModel: SiteSettingsCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/site-settings.html'),
}
