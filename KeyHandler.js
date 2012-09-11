(function(attachTo) {
	
	var KeyHandler = function(element) {
	    var that = this;
	    
	    that.el = element || document;
		
		that.keys = {};		
		that.addEvents();
	};
	
	KeyHandler.prototype.addEvents = function() {
	    var that = this,
	        el = that.el;
	        
		el.addEventListener('keydown', function(e) { 
		    that.onKeyDown.call(that, e); 
		}, false);
		
		el.addEventListener('keyup', function(e) { 
		    that.onKeyUp.call(that, e); 
		}, false);
	};
	
	
	KeyHandler.prototype.removeEvents = function() {
	    var that = this,
	        el = that.el;
	        
		el.removeEventListener('keydown', function(e) { 
		    that.onKeyDown.call(that, e); 
		}, false);
		
		el.removeEventListener('keyup', function(e) { 
		    that.onKeyUp.call(that, e); 
		}, false);
	};
	
	
	KeyHandler.prototype.onKeyDown = function(e) {
		this.keys[''+e.keyCode] = e;
	};
	
	
	KeyHandler.prototype.onKeyUp = function(e) {
		this.keys[''+e.keyCode] = null;
	};
	
	
	attachTo.KeyHandler = KeyHandler;
	
}(window))