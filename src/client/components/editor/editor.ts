import {Container, autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {MenuItem} from './interfaces';
import { Component } from '@client/interfaces';

@autoinject
export class EditorCustomElement {
  constructor(public editor: Editor, private container: Container) {}

  get section(): MenuItem | undefined {
    return this.editor.activeMenuItem;
  }

  model(item: MenuItem | undefined) {
    if (item === undefined) {
      return null;
    } else if (typeof item.panel.model === 'function') {
      item.panel.model = item.panel.model(this.editor.page);
    } 
    return item.panel.model;
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
