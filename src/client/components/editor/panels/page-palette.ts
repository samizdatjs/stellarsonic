import {autoinject, PLATFORM, transient} from 'aurelia-framework';
import {action, EditorComponent, EditorComponentConfig} from '@client/interfaces';
import {Editor} from '@client/services/editor';

@transient()
@autoinject
export class PagePaletteCustomElement extends EditorComponent {
  pickerElem!: HTMLElement;
  palette: string[] = [];

  public constructor(public editor: Editor) {
    super();
    this.palette = editor.page.config.palette;
  }

  @action({ title: 'save', icon: 'cloud-upload' })
  async save() {
    console.log(this.editor.page.config);
    this.editor.savePage();
  }

  setColor(index: number, color: string) {
    this.palette[index] = color;
  }
}

export const pagePalette: EditorComponentConfig = {
  viewModel: PagePaletteCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/page-palette.html'),
}
