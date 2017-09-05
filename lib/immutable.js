'use babel';

import { CompositeDisposable } from 'atom';

export default {

  activated: false,
  subscriptions: null,

  activate(state) {
    this.activated = true;
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'immutable:toggle': () => this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('body', {
      'immutable:backspace': (event) => this.backspace(event)
    }));
    this.subscriptions.add(atom.commands.add('body', {
      'immutable:delete': (event) => this.delete(event)
    }));
  },

  deactivate() {
    this.activated = false;
    this.subscriptions.dispose();
  },

  toggle() {
    console.log(this.activated);
    this.activated = !this.activated;
    if (this.activated) {
      atom.notifications.addSuccess("Your editor is immutable!");
    }
    else {
      atom.notifications.addWarning("Your editor is mutable!");
    }
  },

  backspace(event) {
    if (!this.activated) {
      return event.abortKeyBinding();
    }
  },

  delete(event) {
    if (!this.activated) {
      return event.abortKeyBinding();
    }
  }
};
