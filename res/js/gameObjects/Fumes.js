(function(attachTo) {
    
    var Fumes = attachTo.GameObject.extend({
        
        initialize: function(pos, numParticles, cutoffDistance) {
            this.pos = pos || new THREE.Vector3(0, 0, 0);
            this.numParticles = numParticles || 1000;
            this.cutoffDistance = cutoffDistance || 1000;
            
            this.velocity = new THREE.Vector3(-1, 0, 0);
            this.acceleration = 1.5;
            
            this.randomDistribution = 150;
            
            this.targets = [];
            
            this.createParticles();
        },
        
        createParticles: function() {
            var i = 0,
	            numParticles = this.numParticles,
    			vertex, target,
    			material,
    			rand = Math.random;

    		this.geometry = new THREE.Geometry();
            
    		for(i; i < numParticles; ++i) {
    			vertex = new THREE.Vector3();
                
                target = new THREE.Vector3();
                
                target.x = -1000 + -(rand() * this.randomDistribution * 10);
                target.y = rand() * this.randomDistribution;
                target.z = rand() * this.randomDistribution;
                
                this.targets.push(target);
                
    			this.geometry.vertices.push( vertex );
    		}

    		material = new THREE.ParticleBasicMaterial({ size: 10, color: 0xFFFFFF });

    		this.particles = new THREE.ParticleSystem( this.geometry, material );
    		
    		this.particles.position = this.pos;
        },
        
        isOutOfBounds: function(vertex, target) {
            if(vertex.distanceTo(target) < 0.5 ) {
                return 1;
            }
            return 0;
        },
        
        updateVertex: function(vertex, target) {
            var cutoffDistance = this.cutoffDistance;
            
            vertex.x += target.x / cutoffDistance;
            vertex.y += target.y / cutoffDistance;
            vertex.z += target.z / cutoffDistance;
            
            // vertex.multiplyScalar(this.acceleration);
            
            if(this.isOutOfBounds(vertex, target)) {
                vertex.x = 0;
                vertex.y = 0;
                vertex.z = 0;
            }
        },
        
        tick: function() {
            var vertices = this.geometry.vertices,
                targets = this.targets,
                num = vertices.length;
                
            for(var i = 0; i < num; ++i) {
                this.updateVertex( vertices[i], targets[i] );
            }
            
            this.geometry.verticesNeedUpdate = true;
        }
        
    });
    
    attachTo.Fumes = Fumes;
    
}(window));