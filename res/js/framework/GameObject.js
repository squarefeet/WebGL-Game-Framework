(function(attachTo) {
    
    var noop = function() {};
    
    
    function GameObject() {
        
        // An object to hold all the renderable THREE objects (meshes, lights,
        // etc.)
        this.renderables = {};
        
        // The default, no-op tick function. Required by the Renderer. Override
        // with your own if necessary.
        this.tick = noop;
        
        // A default, no-op initialize function. Override it with your own
        // functionality.
        this.initialize = noop;
    }
    
    
    
    attachTo.GameObject = GameObject;
    
    
}(window));