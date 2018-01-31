
var Base = {
    parent: undefined,
    cElement: document.createElement('div'),
    class: '',
    name: '',
    template: undefined,
    id: undefined,
    init: function (componentName) {
        this.name = componentName;
        this.template = TemplateManager.load(this.name);
    }
}

var Component = Object.create(Base);
Component.Render = function () {
    this.cElement = document.createElement('div');
    this.cElement.classList.add(this.class);
    this.cElement.innerHTML = this.template;
    this.cElement.id = this.id;
    this.parent.append(this.cElement);
}
Component.setParent = function (parentElement) {
    this.parent = parentElement;
}

