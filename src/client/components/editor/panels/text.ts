import {inject, PLATFORM} from "aurelia-framework";
import {ContentEditorComponent, EditorPanel} from "@client/interfaces";
import {Editor} from "@client/services/editor";

export class TextEditorPanel extends EditorPanel<string> {
  component = {
    viewModel: TextCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/text.html')
  }

  public static forContentKey(key: string) {
    return new TextEditorPanel(key);
  }
}

@inject(Editor)
export class TextCustomElement extends ContentEditorComponent {
  key!: string;

  activate(key: string) {
    this.key = key;
  }
}
