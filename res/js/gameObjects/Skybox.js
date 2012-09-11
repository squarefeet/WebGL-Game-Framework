(function(attachTo) {
	
	function Skybox() {
		
		var bg, texture, material, geometry, mesh;
		
		// Create the BackgroundObject instance and the required THREE objects.
		bg 				=	this.backgroundObject = new BackgroundObject();
		
		texture 		= 	this.texture = THREE.ImageUtils.loadTexture('res/img/backdrops/universe_sml.jpg');
		
		material 		= 	this.material = new THREE.MeshBasicMaterial({ map: texture });
		material.side 	= 	THREE.DoubleSide;
		
		geometry 		=	this.geometry = new THREE.SphereGeometry(10000, 8, 8);
		
		mesh 			= 	this.mesh = new THREE.Mesh(this.geometry, this.material);
		
		
		// Add the mesh to the BackgroundObject and the mesh to the scene
		bg.objects.mesh = this.mesh;		
		bg.objects.scene.add(this.mesh);
		
		
		// Add FlyControls to the camera
		var controls = this.backgroundObject.objects.controls = new THREE.FlyControls( bg.objects.camera );
	    controls.movementSpeed = 0;
	    controls.rollSpeed = Math.PI / 2;
	    controls.autoForward = false;
	    controls.dragToLook = false;
	
		bg.setTickFunction(function(objects, dt) { 
			controls.update(dt); 
		});
		
		return bg;
	}
	
	
	attachTo.Skybox = Skybox;
	
}(window));