
(function(attachTo) {
	
	var Player = function() {
	    this.acceleration = 0.5;
	    this.deceleration = 0.99;
	    
	    this.maxVelocity = 75;
	    this.minVelocity = 0.01;
	    this.velocity = new THREE.Vector3(0, 0, 0);
	};
	
	
	Player.prototype.moveForwards = function(camera, dt, controls) {
	    var that = this,
	        vel = that.velocity,
	        pos = camera.position,
	        acceleration = that.acceleration;
	    
	    if(vel.z < that.maxVelocity) {    
	        vel.x -= acceleration;
	        vel.y -= acceleration;
	        vel.z -= acceleration;
        }
        
        pos.addSelf(vel);
        // console.log(vel.z);
	};
	
	
	Player.prototype.moveBackwards = function(camera, dt) {
	    var that = this,
	        vel = that.velocity,
	        pos = camera.position;
	    
	    if(Math.abs(vel.z) < that.maxVelocity) {
	        vel.addScalar(that.acceleration);
        }
        
        pos.z += vel.z;
        // console.log(vel.z);
	};
	
	
	Player.prototype.decelerate = function(camera, dt) {
	    var that = this,
	        vel = that.velocity,
	        pos = camera.position,
	        deceleration = that.deceleration,
	        absZ = Math.abs(vel.z);
	    
	    if( absZ > 0 && absZ < that.minVelocity) {
	        vel.x = 0;
	        vel.y = 0;
	        vel.z = 0;
	        return;
	    }
	    
	    
	    if(vel.z !== 0) {
	        vel.multiplyScalar(deceleration);
    	    pos.z += vel.z;
	    }
	    
	};
	
	
	
	
	attachTo.Player = Player;
	
}(window));