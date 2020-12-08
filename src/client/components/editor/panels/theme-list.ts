import {inject, PLATFORM} from 'aurelia-framework';
import {EditorComponent, EditorComponentConfig} from '@client/interfaces';
import { Router } from 'aurelia-router';
import { Site } from '@client/services/site';

@inject('stellarsonic.Themes', Site, Router)
export class ThemeListCustomElement extends EditorComponent {
  constructor(public themes: string[], private site: Site, private router: Router) { super(); }

  async select(name: string) {
    const config = await this.site.getConfig()
    config.theme = name;
    await this.site.saveConfig(config);
    this.router.navigate('/', {
      replace:true,
      trigger:true,
    })
  }
}

export const themeList: EditorComponentConfig = {
  viewModel: ThemeListCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/theme-list.html'),
}
