import {autoinject, bindable} from 'aurelia-framework';
import * as SimpleMDE from 'simplemde';

@autoinject()
export class EditorCustomElement {
  @bindable value!: string;

  private editor: SimpleMDE | undefined;

  public constructor(private element: Element) {}

  bind() {
    const elem = this.element.firstElementChild;
    if (elem) {
      this.editor = new SimpleMDE({
        element: elem as any,
        initialValue: this.value,
        autofocus: true,
      });
      this.editor.value(this.value);
    }
    /*
    if (this.edit) {
      await this.state.savePost();
      if (this.editor) {
        this.editor.toTextArea();
        this.editor = undefined;
      }
    } else {
      const elem = document.getElementById("editor");
      if (elem) {
        if (!this.editor) {
          this.editor = new SimpleMDE({ element: elem, });
          this.editor.value(this.post.text);
        }
      }
    }
    */
  }
}
