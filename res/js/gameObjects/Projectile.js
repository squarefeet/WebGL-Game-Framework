(function(attachTo) {
    
    var GameObject = attachTo.GameObject;
    
    
    var Projectile = GameObject.extend({
        
        range: 4000,
        
        speed: -30,
        
        power: 100,
        
        projectile: true,
        
        initialize: function(parent, offsetX, offsetY, offsetZ) {
            
            offsetX = offsetX || 0;
            offsetY = offsetY || 0;
            offsetZ = offsetZ || 0;
            
            this.parent = parent;            
            
            // Create basic material. It won't be affected by lights.
            this.material = new THREE.MeshBasicMaterial({
                color: 0xFF0000
            });
            
            // Create a cube.
            this.geometry = new THREE.CubeGeometry(1, 1, 1);
            
            // Create a mesh and copy the position of the parent object's
            // camera.
            this.object = new THREE.Mesh(this.geometry, this.material);
            this.object.position.copy(this.parent.camera.position);
            
            this.startPos = this.object.position.z + 0;
            
            // Create a new matrix and copy the matrix from the parent 
            // object's camera.
            this.matrix = new THREE.Matrix4();
            this.matrix.copy(parent.camera.matrix);
            
            // Apply the matrix to the object, and set default translation
            // values so we can control exactly where on the screen this projectile
            // will emanate from.
            this.object.matrix.copy(this.matrix);
            this.object.translateX(offsetX);
            this.object.translateY(offsetY);
            this.object.translateZ(offsetZ);
            
            // Add these objects to the renderables array so they'll get added
            // to the scene.
            this.renderables.push(this.object);
            
            this.count = 0;
        },
        
        castRay: function() {
            var children = sceneManager.middlegroundStore,
                i = 0, il = children.length,
                child,
                childPos,
                distance, pos = this.object.position;
                
            for(i; i < il; ++i) {
                
                child = children[i];
                
                if(child.projectile || !child.renderables[0].position) continue;
                
                childPos = child.renderables[0].position;
                
                distance = pos.distanceTo(childPos);
                
                if(distance < 20 && typeof child.onImpact === 'function') {
                    // children[i].material.color.setHex(0xff0000);
                    // this.renderables.length = 0;
                    // this.remove(this.object);
                    
                    children[i].onImpact(this);
                    this.renderables.length = 0;
                    this.remove(this.object);
                    break;
                }
            }
            
        },
        
        tick: function() {      
            this.object.matrix.copy(this.matrix);
            
            // translate the projectile 1 unit along the -Z axis.
            this.object.translateZ( this.speed );
    		this.object.matrixWorldNeedsUpdate = true;
    		
    		if(this.object.position.distanceTo(this.parent.camera.position) > this.range) {
    		    this.renderables.length = 0;
    		    this.remove(this.object);
    		}
    		else {
    		    this.castRay();
		    }
        }
    });
    
    
    attachTo.Projectile = Projectile;
    
}(window));