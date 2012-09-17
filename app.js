// Create the main event store. Events will be added (.on(...)), removed
// (.off(...)), and fired (.fire(...)) from this object. 
var eventHandler = new EventHandler();

// Create a key handler. Note that this isn't used by most (if any) camera
// movements. Those are handled by three.js.
// It also doesn't use the EventHandler! Maybe it should...
var keyHandler = new KeyHandler();

// Create a mouse handler. Note that this isn't used by most (if any) camera
// movements. Those are handled by three.js.
// It also doesn't use the EventHandler. Maybe it should...
var mouseHandler = new MouseHandler();



// Create our custom Player object.
var player = new Player();




// Create the renderer. By default it'll set width and height to window values
// and attach the domElement to document.body. You only need one of these.
var renderer = new Renderer();

// Create a scene manager that'll hold all the scenes and game objects. It organises
// things into three groups (background (skybox, etc), middleground (stuff
// what moves), and foreground (the HUD)). Each group is then sorted according
// to its "z-index" value, so you can control the rendering order.
var sceneManager = new SceneManager();




// Add some camera controls to each scene's camera
sceneManager.background.controls = new THREE.FlyControlsVelocity( 
    sceneManager.background.camera,
    undefined, // domElement  (optional)
    0.5, // acceleration multiplier
    0.97, // deceleration multiplier
    1000 // maximum movement velocity
);
sceneManager.background.controls.movementSpeed = 0;
sceneManager.background.controls.rollSpeed = Math.PI / 3;

sceneManager.middleground.controls = new THREE.FlyControlsVelocity( 
    sceneManager.middleground.camera,
    undefined, // domElement  (optional)
    0.5, // acceleration multiplier
    0.97, // deceleration multiplier
    1000 // maximum movement velocity
);
sceneManager.middleground.controls.rollSpeed = Math.PI / 3;


// Make sure these controls can be updated by adding a custom tick function
sceneManager.background.tick = function(dt) {
    this.controls.update(dt);
};

// The middleground's tick function is slightly different, as we're using
// the middleground layer as the player and their camera, so we need to listen
// out for what keys are pressed and adjust the camera accordingly.
var canFire1 = true,
    canFire2 = false;

sceneManager.middleground.tick = function(dt) {
    this.controls.update(dt);
    
    var keys = keyHandler.keys;
		
	if(mouseHandler.left) {
	    
        if(canFire1) {
	        var proj = new Projectile(this.camera, -5);
	        sceneManager.addObjectTo( 'middleground', proj );
	        
	        var proj = new Projectile(this.camera, 5);
	        sceneManager.addObjectTo( 'middleground', proj );

	        canFire1 = false;
	        
	        setTimeout(function() {
	            canFire1 = true;
	        }, 150);
        }	    

	}
};



// Tell the renderer to use the object manager we just created
renderer.setSceneManager( sceneManager );



function loadCollada(url, callback) {
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

		callback(dae, skin);

	} );
}


loadCollada('./ship1.dae', function(dae, skin) {
    setTimeout(function() {
        dae.position.z = -1000;
        dae.position.x = -200;
        
        dae.rotation.y = Math.PI;
        dae.rotation.x = Math.PI / 10;
        sceneManager.middleground.scene.add(dae);
    }, 0);
});

// Create a new Skybox.
var skybox = new Skybox();

// Add this skybox to the background layer
sceneManager.addObjectTo( 'background', skybox );

var planet = new Sun(100, 200, -100);
sceneManager.addObjectTo( 'background', planet );

// Create a new Starfield, telling it to track the position of the 
// middleground's (player's) camera.
// var starfield = new Starfield(sceneManager.middleground.camera.position);

// Add the starfield to the middleground
// sceneManager.addObjectTo( 'middleground', starfield );



// for(var i = 0; i < 100; ++i) {
//     var enemyShip = new Ship(
//         Math.random() * 1000 - 500, 
//         Math.random() * 1000 - 500, 
//         Math.random() * 1000 - 500, 
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random() * 500
//     );
//     enemyShip.classification = Math.floor(Math.random() * 2);
//     sceneManager.addObjectTo( 'middleground', enemyShip );
// }

var turret = new Turret(100, 0, -500);

// Make this turret an enemy turret, so it'll fire on the player by default.
turret.classification = 1;

sceneManager.addObjectTo( 'middleground', turret );


var light = new THREE.PointLight(0xffffff);
sceneManager.middleground.scene.add( light );

// Create the HUD
var hud = new HUD();
sceneManager.addObjectTo( 'foreground', hud );


// Render the scene!
renderer.start();

