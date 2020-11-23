import {PLATFORM} from "aurelia-framework";
import {EditorPanel} from "@client/interfaces";

export interface DataBindingModel {
  data: any;
  key: string;
}

export class TextEditorPanel extends EditorPanel<DataBindingModel> {
  component = {
    viewModel: TextCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/text.html')
  }
}

export class TextCustomElement {
  public model: DataBindingModel | undefined;

  activate(model: DataBindingModel) {
    this.model = model;
  }
}
