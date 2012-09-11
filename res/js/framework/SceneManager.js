(function(attachTo) {
	
	
	function Scene() {
	    // Create a new scene and camera.
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		
		// Add the camera to the scene to save doing it later.
		scene.add(camera);
		
		// Pass back the scene and camera
		return { scene: scene, camera: camera };
	}
	
	
	/**
	*   @constructor.
	*/
	function SceneManager() {
		// Create a background scene to hold any static objects
		this.background = new Scene();
		
		// The middleground scene holds all objects that will inhabit the
		// game world (ships, the player, etc)
		this.middleground = new Scene();
		
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
	        scene = this[level].scene;
	    
	    // Add object to the specified level.
	    level = this[level + 'Objects'].push(object);
	    
	    // Add the renderable items to the specified scene
	    for(i; i < il; ++i) {
	        scene.add(renderables[i]);
	    }
	    
	    // Update the store cache.
	    this.updateStores(level);
	    
	    return this;
	};
	
	
    /**
    *   Removes an object from a given level.
    */
	SceneManager.prototype.removeObjectFrom = function(level, object) {
	    // Grab the specified level array
	    level = this[level + 'Objects'];
	    
	    var i = 0, il = level.length, obj,
	        found = 0;
	    
	    // Loop thru and find a matching object, splicing it out from the level
	    // array if it's found. 
	    for(i; i < il; ++i) {
	        obj = level[i];
	        
	        if(obj === object) {
	            found = 1;
	            level.splice(i, 1);
	            break;
	        }
	    }
	    
	    // Rebuild the cache if we've found an object and its been removed
	    if(found) {
	        this.updateStores(level);
        }
        
        return this;
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
	    cache = cache.concat(bg, mg, fg);
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