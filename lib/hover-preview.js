'use babel';

import HoverPreviewView from './hover-preview-view';
import { CompositeDisposable } from 'atom';

export default {

  hoverPreviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hoverPreviewView = new HoverPreviewView(state.hoverPreviewViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.hoverPreviewView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hover-preview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hoverPreviewView.destroy();
  },

  serialize() {
    return {
      hoverPreviewViewState: this.hoverPreviewView.serialize()
    };
  },

  toggle() {
    console.log('HoverPreview was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
