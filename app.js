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

// Create an object manager that'll hold all our game objects. It organises
// things into three groups (background (skybox, etc), middleground (stuff
// what moves), and foreground (the HUD)). Each group is then sorted according
// to its "z-index" value, so you can control the renderering order.
var objectManager = new ObjectManager();


// Tell the renderer to use the object manager we just created
renderer.setObjectManager( objectManager );




// Create a new Skybox.
var skybox = new Skybox();

// Create the player (a middleground object)
var player = new Player();

// Create a starfield and tell it to render onto the player's camera
var starfield = new Starfield(player, 1000, 1000);


// Add the skybox to the objectManager so it'll be rendered by the renderer
objectManager.addObject('background', skybox);
objectManager.addObject('middleground', player);


// Render the scene!
renderer.start();

