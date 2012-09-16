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
        
        that.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    	that.renderer.setFaceCulling(0);
    	that.renderer.setSize(width, height);
    	that.renderer.autoClear = false;
        that.renderer.sortObjects = false;
    	
        // that.renderer.gammaInput = true;
        // that.renderer.gammaOutput = true;
        // that.renderer.physicallyBasedShading = true;
    	
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
    
    
    Renderer.prototype.setSceneManager = function(manager) {
        this.sceneManager = manager;
    };

    
    Renderer.prototype.start = function() {
        var that = this;
        
        if(!that.sceneManager) return;
        
        var sceneManager = that.sceneManager,
            getDelta = that.clock.getDelta;
        
        function animate() {
            if(that.active) {
                requestAnimationFrame(animate);
                that.render( getDelta.call(that.clock), sceneManager.getObjects() );
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
            renderer = that.renderer,
            i = 0, 
            il = objects.length,
            obj,
            sceneManager = that.sceneManager,
            bg = sceneManager.background,
            mg = sceneManager.middleground,
            fg = sceneManager.foreground;
        
        
        // We need to clear the canvas since this renderer doesn't autoclear.
        renderer.clear();
        
        
        // Update all the objects in the sceneManager's cache.
		for(i = 0; i < il; ++i) {
			obj = objects[i];
            obj.tick(dt);
		}
		
		
		// Call each scene's tick function (just in case the camera is using
	    // any controls and requires updating on a per-frame basis).
	    bg.tick.call(bg, dt);
	    mg.tick.call(mg, dt);
	    fg.tick.call(fg, dt);
		
		
        // Render the scenes
        renderer.render(bg.scene, bg.camera);
        renderer.render(mg.scene, mg.camera);
        renderer.render(fg.scene, fg.camera);
    };
    
    
    
    attachTo.Renderer = Renderer;
    
}(window));