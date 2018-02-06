var EventHandler = Object.create(Array.prototype);

EventHandler.trigger = function(e){
	var temp;
	for(var i = 0; i < this.length;i++){
		temp = this[i];
		//console.log(this);
		temp(e);
		//console.log('EventHandler_'+i);
	}   
}
module.exports = EventHandler;
