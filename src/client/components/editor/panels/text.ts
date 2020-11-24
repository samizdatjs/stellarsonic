import {PLATFORM} from "aurelia-framework";
import {EditorPanel} from "@client/interfaces";

export interface TextEditorModel {
  data: any;
  key: string;
  save: () => void;
}

export class TextEditorPanel extends EditorPanel<TextEditorModel> {
  component = {
    viewModel: TextCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/text.html')
  }
}

export class TextCustomElement {
  model: TextEditorModel | undefined;
  actions = [
    { title: 'Save', icon: 'cloud-upload', call: () => this.model ? this.model.save() : null }
  ] 

  activate(model: TextEditorModel) {
    this.model = model;
  }
}
