import {autoinject, PLATFORM, transient} from 'aurelia-framework';
import {Assets} from '@client/services/assets';
import {EditorComponentConfig, ContentEditorComponent} from '@client/interfaces';
import {Editor} from '@client/services/editor';

@transient()
@autoinject
export class ImageCustomElement extends ContentEditorComponent {
  images: Assets;
  key!: string;

  constructor(editor: Editor) {
    super(editor);
    this.images = editor.page.images;
  }

  activate(key: string) {
    this.key = key;
  }

  select(image: string) {
    this.content[this.key] = image;
  }
}

export const image = (key: string) => {
  return {
    viewModel: ImageCustomElement,
    panel: PLATFORM.moduleName('components/editor/panels/image.html'),
    model: key,
  } as EditorComponentConfig;
}