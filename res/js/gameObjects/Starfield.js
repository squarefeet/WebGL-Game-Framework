(function(attachTo) {
	
	function Starfield(parentObject, numStars, size) {
		this.scene = parentObject.objects.scene;
		this.addStars(numStars, size);
	}
	
	Starfield.prototype.addStars = function(numStars, size) {
		var i = 0,
			vertex,
			scene = this.scene,
			material, particles,
			doubleSize = size*2,
			rand = Math.random;
		
		var geometry = new THREE.Geometry();
		
		for(i; i < numStars; ++i) {
			vertex = new THREE.Vector3();
			vertex.x = rand() * doubleSize - size;
			vertex.y = rand() * doubleSize - size;
			vertex.z = rand() * doubleSize - size;
			
			geometry.vertices.push( vertex );
		}
		
		material = new THREE.ParticleBasicMaterial({ size: 1, color: 0xFFFFFF });
		
		particles = new THREE.ParticleSystem( geometry, material );
		// particles.frustrumCulled = true;
		
		scene.add(particles);
	};
	
	
	Starfield.prototype.update = function() {
		
	};
	
	
	attachTo.Starfield = Starfield;
	
}(window));