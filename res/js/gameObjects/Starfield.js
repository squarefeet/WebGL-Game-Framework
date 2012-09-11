/**
*   @requires GameObject
*/
(function(attachTo) {
	
	var GameObject = attachTo.GameObject;
	
	
	var Starfield = GameObject.extend({
	    
	    initialize: function(position) {
	        this.radius = 1000;
	        this.numStars = 10000;
	        
	        // This starfield requires a position vector to track in order
	        // for the stars (particles) to be moved.
            this.position = position;
	        
	        this.createStarfield();
	    },
	    
	    createStarfield: function() {
	        var i = 0,
	            numStars = this.numStars,
    			vertex,
    			material, particles,
    			radius = this.radius,
    			doubleRadius = radius * 2,
    			rand = Math.random;

    		this.geometry = new THREE.Geometry();
            
    		for(i; i < numStars; ++i) {
    			vertex = new THREE.Vector3();
                vertex.x = rand() * doubleRadius - radius;
                vertex.y = rand() * doubleRadius - radius;
                vertex.z = rand() * doubleRadius - radius;

    			this.geometry.vertices.push( vertex );
    		}

    		material = new THREE.ParticleBasicMaterial({ size: 1, color: 0xFFFFFF });

    		this.particles = new THREE.ParticleSystem( this.geometry, material );

    		// Add the particle system to this object's renderables Array.
    		this.renderables.push( this.particles );
	    },
	    
	    
	    detectIfOutsideBounds: function(vertex, radius) {
	        var pos = this.position,
	        
	            // Find the distance from the central point of the starfield
	            // and the given vertex
	            distance = pos.distanceTo(vertex);
	            
            if(distance > radius) {
                vertex.z = vertex.z + (radius*2);
            }
            
            // console.log(vertex.z);
            
            // vertex.subSelf(pos);
            
	    },
	    
	    
	    tick: function() {
	        var i = 0, il = this.numStars,
	            vertices = this.geometry.vertices,
	            radius = this.radius;
	        
	        for(i; i < il; ++i) {
	            this.detectIfOutsideBounds( vertices[i], radius );
	        }
	        
            // this.particles.geometry.__dirtyVertices = true;
	        this.particles.geometry.verticesNeedUpdate = true;
	    }
	    
	})
	
	
	
	attachTo.Starfield = Starfield;
	
}(window));