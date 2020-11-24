import {PLATFORM} from "aurelia-framework";
import {EditorPanel, Page} from "@client/interfaces";
import {Editor} from "@client/services/editor";

export interface TextEditorModel {
  data: any;
  key: string;
  save(): any;
}

export class TextEditorContent implements TextEditorModel {
  public constructor(
    public data: any,
    public key: string,
    public editor: Editor
  ) {}

  async save() {
    this.data = await this.editor.saveContent();
  }
}

export class TextEditorPanel extends EditorPanel<TextEditorModel> {
  component = {
    viewModel: TextCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/text.html')
  }

  public static forContentKey(key: string) {
    return new TextEditorPanel((page: Page, editor: Editor) => new TextEditorContent(page.content, key, editor));
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
