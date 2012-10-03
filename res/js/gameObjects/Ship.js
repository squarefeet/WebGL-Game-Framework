(function(attachTo) {
    
    var GameObject = attachTo.GameObject;
    
    
    var Ship = GameObject.extend({
        ship: null,
        
        radius: 1000,
        
        health: 100,
        
        initialize: function(x, y, z, a, b, c, r) {
            
            this.ship = null;
            
            this.createShip(x, y, z);
            
            this.lookAt = new THREE.Vector3();
            
            this.velocity = new THREE.Vector3(0, 0, 0);
            
            this.radius = r;
            
            this.currentTarget = sceneManager.middleground.camera;
            
        },
        
        createShip: function(x, y, z) {
            var that = this;

            this.loadCollada('./lowpoly 3.dae', function(dae, skin) {
                setTimeout(function() {
                    
                    that.ship = dae;
                    
                    that.ship.position = new THREE.Vector3(x, y, z);
                    
                    that.renderables.push(that.ship);
                    
                    sceneManager.addObjectTo( 'middleground', that );
                    
                    setInterval(function() {
                        
                        that.currentTarget = {
                            position: new THREE.Vector3(
                                Math.random() * 1000,
                                Math.random() * 1000,
                                Math.random() * 1000
                            )
                        };
                        
                    }, 5000);
                    
                }, 0);
            });
        },
        
        
        tick: function(dt) {
            if(!this.ship) {
                console.log('no ship');
                return;
            }
            
            // this.angleX += this.additionX;
            // this.angleY += this.additionY;
            // this.angleZ += this.additionZ;
            
            // this.ship.rotation.z = 90 * (Math.PI / 180);
            
            // this.ship.velocity.z = 10;
            
            // this.ship.translateZ(1);
            // this.ship.translateX(1);
            // this.ship.translateY(2);
            
            
            this.ship.rotation.y = Math.atan2( - this.velocity.z, this.velocity.x );
            
            if(this.velocity.y !== 0) {
			    this.ship.rotation.z = Math.asin( this.velocity.y / this.velocity.length() );
		    }
            
            
            if(this.currentTarget) {
                // this.ship.lookAt(this.currentTarget.position);
                
                // if(this.gun.position.distanceTo(this.currentTarget.position) < this.detectionRadius) {
                //     this.firePrimary();
                // }
                
                
                // this.rotateTo( this.lookAt );
                
                // this.ship.position.multiplySelf(this.ship.rotation);
            }
        },
        
        firePrimary: function() {
            
        },
        
        fireSecondary: function() {
            
        },
        
        onImpact: function(projectile) {
            // this.health -= projectile.power;
            // 
            // if(this.health <= 0) {
            //     this.remove(this.ship);                
            // }
        }
        
    });
    
    
    attachTo.Ship = Ship;
    
}(window));