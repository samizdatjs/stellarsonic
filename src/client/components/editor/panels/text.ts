import {inject, PLATFORM} from "aurelia-framework";
import {ContentEditorComponent, EditorComponentConfig, EditorPanel} from "@client/interfaces";
import {Editor} from "@client/services/editor";

export const textEditor = (key: string) => {
  return {
    viewModel: TextCustomElement,
    panel:PLATFORM.moduleName('components/editor/panels/text.html'),
    model: key,
  } as EditorComponentConfig;
}

@inject(Editor)
export class TextCustomElement extends ContentEditorComponent {
  key!: string;

  activate(key: string) {
    this.key = key;
  }
}
