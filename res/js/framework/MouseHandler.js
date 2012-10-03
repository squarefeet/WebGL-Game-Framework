(function(attachTo) {
    
    var LEFTBUTTON = 0,
        RIGHTBUTTON = 2,
        _null = null;  
    
    
    function bind(scope, fn) {
        return function() {
            fn.apply(scope, arguments);
        };
    }
    
    
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
        
        el.addEventListener('mousedown', function(e) {
            that.onMouseDown.call(that, e);
        }, false);
        el.addEventListener('mouseup', function(e) {
            that.onMouseUp.call(that, e);
        }, false);
        el.addEventListener('mousemove', function(e) {
            that.onMouseMove.call(that, e);
        }, false);        
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
        
        if(button == LEFTBUTTON) {
            that.left = e;
        }
        else if(button == RIGHTBUTTON) {
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
        that.x = e.offsetX;
        that.y = e.offsetY;
    };
    


    attachTo.MouseHandler = MouseHandler;
    
    
}(window));