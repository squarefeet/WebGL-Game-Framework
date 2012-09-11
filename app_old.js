var renderer,
	scene, bgScene,
	camera, bgCamera,
	sphere,
	mouseX = 0, mouseY = 0,
	
	controls, bgControls,
	
	clock = new THREE.Clock(),
	
	windowWidth = window.innerWidth,
	windowHeight = window.innerHeight,
	halfWindowWidth = windowWidth / 2,
	halfWindowHeight = windowHeight / 2;

function init() {
	
	bgScene = new THREE.Scene();
	scene = new THREE.Scene();
	
	bgCamera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 1, 10000);
	camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 1, 10000);
	
	
	var image = THREE.ImageUtils.loadTexture('universe.jpg');
	
	
	var material = new THREE.MeshBasicMaterial({ map: image });
	material.side = THREE.DoubleSide;

	
	
	var geometry = new THREE.SphereGeometry(10000, 8, 8);
	
	sphere = new THREE.Mesh(geometry, material);
	
	
	var light = new THREE.PointLight(0xFFFFFF);
	light.position.z = 500;
	
	bgScene.add(bgCamera);
	bgScene.add(sphere);
	
	
	
	var redSphere = new THREE.Mesh( 
		new THREE.SphereGeometry(50, 8, 8), 
		new THREE.MeshLambertMaterial({ color: 0xFF0000 })
	);
	
	redSphere.position.z = -1000;
	
	scene.add(redSphere);
	scene.add(light);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setFaceCulling(0);
	renderer.setSize(windowWidth, windowHeight);
	renderer.autoClear = false;
	
	
	document.body.appendChild(renderer.domElement);
	
	
	
	
	bgControls = new THREE.FlyControls( bgCamera );
	controls = new THREE.FlyControls( camera );
	
	
	bgControls.movementSpeed = 10;
	bgControls.rollSpeed = Math.PI / 2;
	bgControls.autoForward = false;
	bgControls.dragToLook = false;
	
	controls.movementSpeed = 10;
	controls.rollSpeed = Math.PI / 2;
	controls.autoForward = false;
	controls.dragToLook = false;
	
	document.addEventListener('keydown', onDocumentKeyPress, false);
	
	animate();
}

function onDocumentMouseMove(e) {
	mouseX = e.clientX - halfWindowWidth;
	mouseY = e.clientY - halfWindowHeight;
}

function onDocumentKeyPress(e) {
	if(e.keyCode === 87) {
		camera.position.z -= 100;
	}
}


function addEvents() {
	document.addEventListener('mousemove', onDocumentMouseMove, false);
}



var delta;

function render() {
	delta = clock.getDelta();
	
	bgControls.update( delta );
	controls.update( delta );
	
	// Clear the renderer since !autoClear
	renderer.clear();
	
	// Render the background!
	renderer.render( bgScene, bgCamera );
	
	renderer.render( scene, camera );
}



function animate() {
	requestAnimationFrame(animate);	
	render();
}



init();