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



// Create the renderer. By default it'll set width and height to window values
// and attach the domElement to document.body. You only need one of these.
var renderer = new Renderer();

// Create a scene manager that'll hold all the scenes and game objects. It organises
// things into three groups (background (skybox, etc), middleground (stuff
// what moves), and foreground (the HUD)). Each group is then sorted according
// to its "z-index" value, so you can control the rendering order.
var sceneManager = new SceneManager();


// Add some camera controls to each scene's camera
sceneManager.background.controls = new THREE.FlyControls( sceneManager.background.camera );
sceneManager.background.controls.movementSpeed = 10;
sceneManager.background.controls.rollSpeed = Math.PI / 2;
sceneManager.background.controls.autoForward = false;
sceneManager.background.controls.dragToLook = false;

// Make sure these controls can be updated by adding a custom tick function
sceneManager.background.tick = function(dt) {
    this.controls.update(dt);
};


// Tell the renderer to use the object manager we just created
renderer.setSceneManager( sceneManager );




// Create a new Skybox.
var skybox = new Skybox();

// Add this skybox to the background layer
sceneManager.addObjectTo( 'background', skybox );


// Render the scene!
renderer.start();

