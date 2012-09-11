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




// Create a new BackgroundObject.
var skybox = new BackgroundObject();

    // In this skybox, lets add a new sphere, with a texture.
    var skyboxTexture = THREE.ImageUtils.loadTexture('universe.jpg');
    
    var skyboxMaterial = new THREE.MeshBasicMaterial({ 
        map: skyboxTexture
    });
    
    // Make sure the sphere's material will be visible from the inside.
	skyboxMaterial.side = THREE.DoubleSide;
	
	// Create the sphere.
	var skyboxGeometry = new THREE.SphereGeometry(10000, 8, 8);
	
	// Using the geometry and mesh created above, create a pretty mesh.
	var skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
	
	// Add this mesh to the skybox scene.
	skybox.objects.sphere = skyboxMesh;
	
	// Add the sphere to the skybox scene
    skybox.objects.scene.add(skybox.objects.sphere);
    
	// Tell the skybox's camera to use Three.js's lovely FlyControls.
    skybox.objects.controls = new THREE.FlyControls( skybox.objects.camera );
    skybox.objects.controls.movementSpeed = 0;
    skybox.objects.controls.rollSpeed = Math.PI / 2;
    skybox.objects.controls.autoForward = false;
    skybox.objects.controls.dragToLook = false;


// Set a function on the skybox that will deal with updating the skybox's 
// objects (moving the camera, etc.)
skybox.setTickFunction(function(objects, dt) {
    objects.controls.update(dt);
});


// Tell the skybox to have a function that will deal with how to render the
// skybox's objects. Unused at this point.
skybox.setRenderFunction(function(objects, dt) {});



// Add the skybox to the objectManager so it'll be rendered by the renderer
objectManager.addObject('background', skybox);


// Render the scene!
renderer.start();

