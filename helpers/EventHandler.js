var EventHandler = Object.create(Array.prototype);

EventHandler.trigger = function(e){
	var temp;
	// function asyncTrigger(callback,e){
	// 	//setTimeout(
	// 		//function(){
	// 			callback(e);
	// 	//	}
	// 	//);
	// }
	for(var i = 0; i < this.length;i++){
		temp = this[i];
		temp(e);
	}   
}
module.exports = EventHandler;
