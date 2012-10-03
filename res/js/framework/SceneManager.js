(function(attachTo) {
	
	// A no-op function. Used by each Scene instance's tick as a "placeholder"
	var noop = function() {};
	
	function Scene(near, far) {
	    // Create a new scene and camera.
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, near || 1, far || 10000);
		
		// Add the camera to the scene to save doing it later.
		scene.add(camera);
		
		// Pass back the scene and camera, creating a no-op tick function
		// as well. Override this tick function with your own if you've
		// applied any camera controls or whatnot.
		return { scene: scene, camera: camera, tick: noop };
	}
	
	
	/**
	*   @constructor.
	*/
	function SceneManager() {
		// Create a background scene to hold any static objects
		this.background = new Scene();
		
		// The middleground scene holds all objects that will inhabit the
		// game world (ships, the player, etc). Giving this scene's camera
		// a near clipping z position (I think it's a z-position anyway) of 3,
		// so that the HUD doesn't get overlapped by any of this scenes objects.
		this.middleground = new Scene(1, 100000);
        // this.middleground.scene.fog = new THREE.FogExp2( 0x000000, 0.0024 );
		
		
        // var light = new THREE.DirectionalLight(0x00c1f8, 1);
        // light.position.set(0, 0, -1);
        // this.middleground.camera.add(light);
		
		
		// The foreground will hold static objects to sit on top of everything
		// else (the HUD, lensflares, etc.).
		this.foreground = new Scene();
		
		
        // An array to hold all the objects for each scene. Kept in bg -> fg
        // order.
        this.storeCache = [];
        
        // Each layer also has its own array of objects. Note that these 
        // objects are instances, where as each layer's scene instance will
        // hold the actual renderables (meshes, lights, etc.)
        this.backgroundStore = []; 
        this.middlegroundStore = [];
        this.foregroundStore = [];
	}
	
	
	/**
	*   An Array sort function that organises things by their zIndex property.
	*/
	SceneManager.prototype.sortFunction = function(a, b) {
	    return a.zIndex - b.zIndex;
	};
	
	
	/**
	*   Add an object to the specified level array, then resort 
	*/
	SceneManager.prototype.addObjectTo = function(level, object) {
	    var renderables = object.renderables,
	        i = 0, il = renderables.length,
	        scene = this[level].scene,
	        store;
	    
        // Set the sceneManager property for this object
	    object.sceneManager = this;
	    object.sceneLevel = level;
	    
	    // Add object to the specified level.
	    store = this[level + 'Store'];
	    store.push(object);
	    
	    
	    // Add the renderable items to the specified scene
	    for(i; i < il; ++i) {
	        scene.add(renderables[i]);
	    }
	    
	    // Update the store cache.
	    this.updateStores(store);
	    
	    // Fire the update event
	    eventHandler.fire('scene:' + level + ':add', null, object);	    
	    
	    return this;
	};
	
	
    /**
    *   Removes an object from a given level.
    */
	SceneManager.prototype.removeObjectFrom = function(level, object) {
	    var renderables = object.renderables,
	        i = 0, il = renderables.length,
	        scene = this[level].scene,
	        store;
	    
	    
	    // Cache the level Array
	    store = this[level + 'Store'];
	    
	    // Remove the renderable items from the specified scene
	    for(i; i < il; ++i) {
	        scene.remove(renderables[i]);
	    }
	    
	    // Update the store cache.
	    this.updateStores(store);
	    
	    
        // Fire the update event
	    eventHandler.fire('scene:' + level + ':remove', object);
	    
	    return this;
	};
	
	SceneManager.prototype.removeRenderable = function(level, renderable) {
	    var scene = this[level].scene;
        scene.remove(renderable);
	};
	
	/**
	*   Rebuilds the object cache store. Called whenever a new object is added
	*   or an existing object removed from a particular level.
	*/
	SceneManager.prototype.updateStores = function(level) {
	    var that = this,
	        bg = that.backgroundStore,
	        mg = that.middlegroundStore,
	        fg = that.foregroundStore,
	        cache = that.storeCache,
	        sortFn = that.sortFunction;
	        
	    // Reset the cache.
	    cache.length = 0;
	    
	    // Sort the stores, but only the level that's changed.
	    level.sort(sortFn);
	    
	    // Rebuild the cache.
	    that.storeCache = cache.concat(bg, mg, fg);
	};
	
	
	/**
	*   Fetch the object cache (an amalgamation of all the store arrays, 
	*   pre-sorted).
	*/
	SceneManager.prototype.getObjects = function() {
	    return this.storeCache;
	};
	
	
	
	
	attachTo.SceneManager = SceneManager;
	
}(window));