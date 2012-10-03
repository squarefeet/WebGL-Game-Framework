(function(attachTo) {
    
    var noop = function() {};
    
    
    function GameObject() {
        
        // An object to hold all the renderable THREE objects (meshes, lights,
        // etc.)
        this.renderables = [];
        
        // Give this instance a default zIndex
        this.zIndex = 1;
        
        // Apply a default 'classification' (friendly, enemy, unknown; ints 0-2 inclusive)
        this.classification = 2;        
        
        // Call the initialization function
		this.initialize.apply(this, arguments);
		
    }
    
    
    GameObject.prototype = {
        
        loadCollada: function(url, callback) {
            var camera, scene, renderer, objects;
        	var particleLight, pointLight;
        	var dae, skin;

        	var loader = new THREE.ColladaLoader();
            loader.options.convertUpAxis = true;
        	loader.load( url, function ( collada ) {

        		dae = collada.scene;
        		skin = collada.skins[ 0 ];

        		dae.scale.x = dae.scale.y = dae.scale.z = 0.3;		
        		dae.updateMatrix();
        		
                // dae.rotation.y = -90 / (Math.PI*180);

        		callback(dae, skin);

        	} );
        },
        
        // The default, no-op tick function. Required by the Renderer. Override
        // with your own if necessary.
        tick: noop,
        
        // A default, no-op initialize function. Override it with your own
        // functionality.
        initialize: noop,
        
        // A link to the scene manager. Link create when added to sceneManager.
        sceneManager: null,
        sceneLevel: null,
        
        remove: function(obj) {
            this.sceneManager.removeRenderable(this.sceneLevel, obj);
        }
    };
    
    
    // Make sure this constructor can be "sub-classed"
    GameObject.extend = attachTo.Inheritance.extend;
    
    
    // Add the GameObject constructor to the specified parent object.
    attachTo.GameObject = GameObject;
    
}(window));