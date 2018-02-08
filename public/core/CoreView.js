"use strict";
var CoreView = {}
CoreView.name = '';
CoreView.parent = undefined;

CoreView.display = function _display(boolprepend = false) {
    if(!boolprepend)
        this.parent.append(this.cElement);
        else
        this.parent.prepend(this.cElement);
}
CoreView.initialize = function _init(parent) {
    this.cElement = document.createElement('div');
    this.parent = parent;
    this.template = TemplateManager.load(this.name);
    this.cElement.innerHTML = this.template;
}
CoreView.remove = function _remove() {
    this.parent.removeChild(this.cElement);
}