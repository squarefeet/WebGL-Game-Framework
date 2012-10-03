/**
 * @author James Baicoianu / http://www.baicoianu.com/
 * Duckpunched by Luke Moody. Adding basic acceleration/deceleration calcs.
 */
 
THREE.FlyControlsVelocity = function ( object, domElement, acceleration, deceleration, maxVel ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : null;
	
    // if ( domElement ) this.domElement.setAttribute( 'tabindex', -1 );

	// API

	this.movementSpeed = 1.0;
	this.rollSpeed = 0.005;
    
    this.rollSpeedLeftRight = 0.005;
    
    this.movementSpeedMultiplier = 1;
    
	this.dragToLook = false;
	this.autoForward = false;
    
    
    // Store acceleration, deceleration and maximum velocity values
    this.acceleration = acceleration || 0.5;
    this.deceleration = deceleration || 0.97;
    this.maximumVelocity = maxVel || 500;
    
    
	// disable default target object behavior

	this.object.useQuaternion = true;
    
	// internals

	this.tmpQuaternion = new THREE.Quaternion();

	this.mouseStatus = 0;

	this.moveState = { 
	    up: 0, down: 0, 
	    left: 0, right: 0, 
	    forward: 0, back: 0, 
	    pitchUp: 0, pitchDown: 0, 
	    yawLeft: 0, yawRight: 0, 
	    rollLeft: 0, rollRight: 0 
	};
	this.moveVector = new THREE.Vector3( 0, 0, 0 );
	this.rotationVector = new THREE.Vector3( 0, 0, 0 );
	this.velocityVector = new THREE.Vector3( 0, 0, 0 );

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	this.keydown = function( event ) {

		if ( event.altKey ) {
			return;
		}

		switch ( event.keyCode ) {

			case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

			case 87: /*W*/ this.moveState.forward = 1; break;
			case 83: /*S*/this.moveState.back = 1; break;

			case 65: /*A*/ this.moveState.left = 1; break;
			case 68: /*D*/ this.moveState.right = 1; break;

			case 82: /*R*/ this.moveState.up = 1; break;
			case 70: /*F*/ this.moveState.down = 1; break;

			case 38: /*up*/ this.moveState.pitchUp = 1; break;
			case 40: /*down*/ this.moveState.pitchDown = 1; break;

			case 37: /*left*/ this.moveState.yawLeft = 1; break;
			case 39: /*right*/ this.moveState.yawRight = 1; break;

			case 81: /*Q*/ this.moveState.rollLeft = 1; break;
			case 69: /*E*/ this.moveState.rollRight = 1; break;

		}
        
        this.active = true;
        
		this.updateMovementVector();
		this.updateRotationVector();

	};

	this.keyup = function( event ) {

		switch( event.keyCode ) {

			case 16: /* shift */ this.movementSpeedMultiplier = 1; break;

			case 87: /*W*/ this.moveState.forward = 0; break;
			case 83: /*S*/ this.moveState.back = 0; break;

			case 65: /*A*/ this.moveState.left = 0; break;
			case 68: /*D*/ this.moveState.right = 0; break;

			case 82: /*R*/ this.moveState.up = 0; break;
			case 70: /*F*/ this.moveState.down = 0; break;

			case 38: /*up*/ this.moveState.pitchUp = 0; break;
			case 40: /*down*/ this.moveState.pitchDown = 0; break;

			case 37: /*left*/ this.moveState.yawLeft = 0; break;
			case 39: /*right*/ this.moveState.yawRight = 0; break;

			case 81: /*Q*/ this.moveState.rollLeft = 0; break;
			case 69: /*E*/ this.moveState.rollRight = 0; break;

		}     
        
        
		this.updateMovementVector();
		this.updateRotationVector();

	};

	this.mousedown = function( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( this.dragToLook ) {

			this.mouseStatus ++;

		} else {

			switch ( event.button ) {

				case 0: this.object.moveForward = true; break;
				case 2: this.object.moveBackward = true; break;

			}

		}

	};

	this.mousemove = function( event ) {

		if ( !this.dragToLook || this.mouseStatus > 0 ) {

			var container = this.getContainerDimensions();
			var halfWidth  = container.size[ 0 ] / 2;
			var halfHeight = container.size[ 1 ] / 2;

			
			this.moveState.yawLeft   = - ( ( event.pageX - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;
			this.moveState.pitchDown =   ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;
            
            
            var absYaw = Math.abs(this.moveState.yawLeft),
                absPitchDown = Math.abs(this.moveState.pitchDown);
            
            
            if(absYaw < 0.01) {
                this.moveState.yawLeft = 0;
            }
            if(absPitchDown < 0.01) {
                this.moveState.pitchDown = 0;
            }
            
			this.updateRotationVector();

		}

	};

	this.mouseup = function( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( this.dragToLook ) {

			this.mouseStatus --;

			this.moveState.yawLeft = this.moveState.pitchDown = 0;

		} else {

			switch ( event.button ) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			}

		}

		this.updateRotationVector();

	};
    
    this.updateVelocity = function() {
        
        var state = this.moveState,
            vel = this.velocityVector,
            velx = vel.x, 
            vely = vel.y,
            velz = vel.z,
            roll = this.rollSpeedLeftRight,
            accel = this.acceleration,
            decel = this.deceleration,
            accelRoll = accel / 25,
            accelMove = accel * 10,            
            clamp = this.clamp;
            
        
        
        if(state.rollLeft) {
            roll += accelRoll;
        }
        else if(state.rollRight) {
            roll -= accelRoll;
        }
        else {
            roll *= decel;
        }
        
        
        this.rollSpeedLeftRight = clamp(roll, 0.001, this.maximumVelocity / 1000);
        
        
        if(this.movementSpeed) {
            
            // Forward/Back (Z axis)
            if(state.forward) {
                velz -= accelMove;
            }
            else if(state.back) {
                velz += accelMove;
            }
            else {
                velz *= decel;
            }
            
            // Left/Right (X axis)
            if(state.left) {
                velx -= accelMove;
            }
            else if(state.right) {
                velx += accelMove;
            }
            else {
                velx *= decel;
            }
            
            // Up/Down (Y axis)
            if(state.up) {
                vely += accelMove;
            }
            else if(state.down) {
                vely -= accelMove;
            }
            else {
                vely *= decel;
            }
            
            
            // Clamp velocities            
            vel.x = clamp(velx, 0.001, this.maximumVelocity);
            vel.y = clamp(vely, 0.001, this.maximumVelocity);
            vel.z = clamp(velz, 0.001, this.maximumVelocity);
            
        }
    };
    
    
    this.clamp = function(n, min, max) {
        if(n > 0) {
            return ( n < min ? 0 : (n > max ? max : n) );
        }
        else {
            return ( n > -min ? 0 : (n < -max ? -max : n) );
        }
    };
    
    
    this.update = function( delta ) {

		var rotMult = delta * this.rollSpeed,
		    vel = this.velocityVector;
		
        this.updateVelocity();
		
		
		var x = vel.x * delta,
		    y = vel.y * delta,
		    z = vel.z * delta,		    
		    roll = this.rollSpeedLeftRight * delta;
		    
		this.object.translateX( x );
		this.object.translateY( y );
		this.object.translateZ( z );

		this.tmpQuaternion.set( 
		    this.rotationVector.x * rotMult, 
		    this.rotationVector.y * rotMult, 
		    roll, 
		    1 
		).normalize();
		
		this.object.quaternion.multiplySelf( this.tmpQuaternion );
        
		this.object.matrix.setPosition( this.object.position );
		this.object.matrix.setRotationFromQuaternion( this.object.quaternion );
		this.object.matrixWorldNeedsUpdate = true;
	};


	this.updateMovementVector = function() {
		var forward = ( this.moveState.forward || ( this.autoForward && !this.moveState.back ) ) ? 1 : 0;
        
		this.moveVector.x = ( -this.moveState.left    + this.moveState.right );
		this.moveVector.y = ( -this.moveState.down    + this.moveState.up );
		this.moveVector.z = ( -forward + this.moveState.back );
	};


	this.updateRotationVector = function() {

		this.rotationVector.x = ( -this.moveState.pitchDown + this.moveState.pitchUp );
		this.rotationVector.y = ( -this.moveState.yawRight  + this.moveState.yawLeft );
		this.rotationVector.z = ( -this.moveState.rollRight + this.moveState.rollLeft );

        // console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

	};

	this.getContainerDimensions = function() {

		if ( this.domElement != document ) {

			return {
				size	: [ this.domElement.offsetWidth, this.domElement.offsetHeight ],
				offset	: [ this.domElement.offsetLeft,  this.domElement.offsetTop ]
			};

		} else {

			return {
				size	: [ window.innerWidth, window.innerHeight ],
				offset	: [ 0, 0 ]
			};

		}

	};

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};
    
    if(this.domElement) {
    	this.domElement.addEventListener( 'mousemove', bind( this, this.mousemove ), false );
    	this.domElement.addEventListener( 'mousedown', bind( this, this.mousedown ), false );
    	this.domElement.addEventListener( 'mouseup',   bind( this, this.mouseup ), false );

    	this.domElement.addEventListener( 'keydown', bind( this, this.keydown ), false );
    	this.domElement.addEventListener( 'keyup',   bind( this, this.keyup ), false );
    }

	this.updateMovementVector();
	this.updateRotationVector();

};