(function(attachTo) {
    
    
    function Renderer(width, height, parent) {
        
        width = width || window.innerWidth;
        height = height || window.innerHeight;
        parent = parent || document.body;
        
        this.active = false;
        
        this.init(width, height, parent);
    }
    
    Renderer.prototype.active = false;
    
    Renderer.prototype.init = function(width, height, parent) {
        var that = this;
        
        that.renderer = new THREE.WebGLRenderer();
    	that.renderer.setFaceCulling(0);
    	that.renderer.setSize(width, height);
    	that.renderer.autoClear = false;
    	
    	parent.appendChild( that.renderer.domElement );
    	
    	that.clock = new THREE.Clock();
    	
    	window.addEventListener('resize', function(e) {
    	    that.onWindowResize(e);
    	}, false);
    };
    
    
    Renderer.prototype.onWindowResize = function() {
        var SCREEN_HEIGHT = window.innerHeight;
		var SCREEN_WIDTH  = window.innerWidth;

		this.renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    };
    
    
    Renderer.prototype.setObjectManager = function(manager) {
        this.objectManager = manager;
    };

    
    Renderer.prototype.start = function() {
        var that = this;
        
        if(!that.objectManager) return;
        
        var objectManager = that.objectManager,
            getDelta = that.clock.getDelta;
        
        
        console.log(objectManager.getObjects());
        
        
        function animate() {
            if(that.active) {
                requestAnimationFrame(animate);
                that.render( getDelta.call(that.clock), objectManager.getObjects() );
            }
        }
        
        
        that.active = true;
        
        animate();
    };
    
    
    Renderer.prototype.stop = function() {
        this.active = false;
    };
    
    
    Renderer.prototype.render = function(dt, objects) {
        
        var that = this,
            renderer = that.renderer;
        
        renderer.clear();
        
        
        var i = objects.length-1,
            obj;
        
        
        do {
            obj = objects[i];
            obj.tick(dt);
            obj.render(dt);
            
            renderer.render(obj.objects.scene, obj.objects.camera);
        }
        while(i > 0);        
    };
    
    
    
    attachTo.Renderer = Renderer;
    
}(window));