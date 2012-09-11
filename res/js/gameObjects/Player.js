(function(attachTo) {
	
	function Player() {
		
		var bg, texture, material, geometry, mesh,
			that = this;
		
		// Create the BackgroundObject instance and the required THREE objects.
		bg = this.backgroundObject = new BackgroundObject();
		
		
		// Add FlyControls to the camera
		var controls = this.backgroundObject.objects.controls = new THREE.FlyControls( bg.objects.camera );
	    controls.movementSpeed = 0;
	    controls.rollSpeed = Math.PI / 2;
	    controls.autoForward = false;
	    controls.dragToLook = false;
	
		bg.setTickFunction(function(objects, dt) { 
			controls.update(dt);
			
			var keys = keyHandler.keys;
			
			if(keys['87']) {
				that.moveForward(dt);
			}
			else if(keys['83']) {
				that.moveBackward(dt);
			}
			else {
				that.decelerate();
			}
			
		});
		
		this.acceleration = 0.5;
		this.deceleration = 0.7;
		this.maxSpeed = 100;
		
		this.velocity = new THREE.Vector3(0, 0, 0);
		
		return bg;
	}
	
	
	Player.prototype.moveForward = function() {
		var pos = this.backgroundObject.objects.camera.position,
			vel = this.velocity;
			
		if(vel.z < 100) {
			vel.z += this.acceleration;
		}
		else {
			vel.z = 100;
		}
		
		pos.z += vel.z;
	};
	
	
	Player.prototype.moveBackward = function() {
		var pos = this.backgroundObject.objects.camera.position,
			vel = this.velocity;
			
		vel.z -= this.acceleration;
		
		pos.z += vel.z;
	};
	
	Player.prototype.decelerate = function() {
		var pos = this.backgroundObject.objects.camera.position,
			vel = this.velocity;
			
		if(vel.z === 0) return;
		
		vel.z *= this.deceleration;
		
		pos.z += vel.z;
	};
	
	
	attachTo.Player = Player;
	
}(window));