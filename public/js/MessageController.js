var BaseController = {
    _cElement : document.createElement('div'),
    _class : '',
    _name : '',
    _template : undefined,
    _id : undefined,
    _init : function(componentName)
    {
        this.cElement = document.createElement('div');
        this.name = componentName;
    }
}

var ComponentController = Object.create(BaseController);
ComponentController._parent = document.body;

ComponentController.Render = function()
{
    this.cElement.innerHTML = this.template;
    this.cElement.id=this.id;
    document.body.appendChild(this.cElement);
}
var MessageController = Object.create(ComponentController);

MessageController._init("Message Controller");
MessageController._parent = document.body;
MessageController.id = "Success";
MessageController.template = "<div style='background-color:black'>sdsds</div>";
