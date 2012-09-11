(function(attachTo) {
    
    var LEFTBUTTON = 0,
        RIGHTBUTTON = 2,
        _null = null;  
    
    
    function MouseHandler(element) {
        var that = this;
        
        that.el = element || document;
        
        that.left = _null;
        that.right = _null;
        that.x = 0;
        that.y = 0;
        
        that.addEvents();
    }
    
    
    MouseHandler.prototype.addEvents = function() {
        var that = this,
            el = that.el;
        
        el.addEventListener('mousedown', that.onMouseDown, false);
        el.addEventListener('mouseup', that.onMouseUp, false);
        el.addEventListener('mousemove', that.onMouseMove, false);        
    };
    
    
    MouseHandler.prototype.removeEvents = function() {
        var that = this,
            el = that.el;
        
        el.removeEventListener('mousedown', that.onMouseDown, false);
        el.removeEventListener('mouseup', that.onMouseUp, false);
        el.removeEventListener('mousemove', that.onMouseMove, false);
    };
    
    
    MouseHandler.prototype.onMouseDown = function(e) {
        var button = e.button,
            that = this;
        
        if(button === LEFTBUTTON) {
            that.left = e;
        }
        else if(button === RIGHTBUTTON) {
            that.right = e;
        }
    };
    
    
    MouseHandler.prototype.onMouseUp = function(e) {
        var button = e.button,
            that = this;
        
        if(button === LEFTBUTTON) {
            that.left = _null;
        }
        else if(button === RIGHTBUTTON) {
            that.right = _null;
        }
    };
    
    
    MouseHandler.prototype.onMouseMove = function(e) {
        var that = this;
        that.x = e.clientX;
        that.y = e.clientY;
    };
    


    attachTo.MouseHandler = MouseHandler;
    
    
}(window));