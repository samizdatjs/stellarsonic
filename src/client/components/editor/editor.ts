import {Container, autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {Component} from '@client/interfaces';

@autoinject
export class EditorCustomElement {
  model: any;
  section: any;

  constructor(public editor: Editor, private container: Container) {
    editor.on('navigate', (to: string) => {
      if (to !== undefined) {
        this.section = this.editor.activeMenuItem;
        this.model = typeof this.section.panel.model === 'function'
          ? this.section.panel.model(this.editor.page, this.editor)
          : this.section.panel.model;
      }
    });
  }

  viewModel(component: Component | undefined) {
    if (component === undefined) {
      return null;
    } else if (typeof component.viewModel === 'function') {
      return this.container.get(component.viewModel);
    } else {
      return component.viewModel;
    }
  }
}
