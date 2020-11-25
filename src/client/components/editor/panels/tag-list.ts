import {autoinject, PLATFORM} from 'aurelia-framework';
import {action, ContentEditorComponent} from '@client/interfaces';
import {Editor} from '@client/services/editor';
import UIkit from 'uikit';

@autoinject
export class TagListCustomElement extends ContentEditorComponent {
  key!: string;
  selected: string = '';

  constructor(public editor: Editor) { super(editor); }

  activate(key: string) {
    this.key = key;
  }

  @action({title: 'add', icon: 'plus'})
  createTag() {
    this.selected = '';
    UIkit.modal('#tag-edit-modal').show();
  }

  saveTag() {
    this.content[this.key].push(this.selected);
  }

  removeTag(tag: string) {
    this.content[this.key].splice(this.content[this.key].indexOf(tag), 1);
  }
}

export const tagList = (key: string) => {
  return {
    viewModel: TagListCustomElement,
    panel: PLATFORM.moduleName('components/editor/panels/tag-list.html'),
    model: key,
  }
}
