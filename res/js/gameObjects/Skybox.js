/**
*   @requires Inheritance
*/
(function(attachTo) {
	
	
	var Skybox = GameObject.extend({
	    
	    initialize: function() {
	        
	        // Load the texture for the Skybox.
	        this.texture = THREE.ImageUtils.loadTexture('res/img/backdrops/universe_sml.jpg');
	        
	        // Create a material from this texture & make sure it can be
	        // seen from inside the mesh.
	        this.material = new THREE.MeshBasicMaterial({ map: this.texture });
	        this.material.side = THREE.DoubleSide;
	        
	        // Create the sphere to apply the material to.
	        this.geometry = new THREE.SphereGeometry(10000, 8, 8);
	        
	        // Finally, create the mesh using the above objects.
	        this.mesh = new THREE.Mesh(this.geometry, this.material);
	        
	        // Add the mesh to the renderables Array so it'll be rendered.
	        this.renderables.push(this.mesh);
	        
	    }
	    
	});	
	
	
	attachTo.Skybox = Skybox;
	
}(window));