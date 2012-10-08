(function(attachTo) {
    
    var noop = function(){};
    
    var PoolObject = function(Obj, reset) {
        this.parent = new Obj();
        this.reset = reset || noop;
        this.available = 1;
        this.release = noop;
    };
    
    
    var Pool = function() {
        
    };
    
    
    Pool.prototype.resourcePool = {};
    
    
    Pool.prototype.addType = function(name, obj, reset) {
        this.resourcePool[name] = new PoolObject(obj, reset);
    };
    
    Pool.prototype.get = function(name) {
        
    };
    
}(window));