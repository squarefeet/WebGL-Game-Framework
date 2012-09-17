(function(attachTo) {
    
    var GameObject = attachTo.GameObject;
    
    
    var Turret = GameObject.extend({
        
        currentTarget: null,
        
        health: 100,
        
        detectionRadius: 1000,
        
        canFire: true,
        
        primaryFireRate: 1000,
        
        material: new THREE.MeshPhongMaterial({ 
            ambient: 0xff0000, 
            color: 0xffffff, 
            specular: 0xff0000, 
            shininess: 50, 
            perPixel: true 
        }),
        
        initialize: function(x, y, z) {
            this.gun = new THREE.Object3D();
            this.gun.position.set(x, y, z);
            
            this.base = this.createBase();
            this.base.position.set(x, y-30, z);

            
            this.ball = this.createBall();
            this.ball.position.set(0, 0, 0);
            
            this.arm = this.createArm();
            this.arm.position.set(0, 0, 50);
            
            // this.gun.add(this.base);
            this.gun.add(this.ball);
            this.gun.add(this.arm);
            
            this.renderables.push(this.base);
            this.renderables.push(this.gun);
            
            this.currentTarget = sceneManager.middleground.camera;
        },
        
        createBase: function() {
            return new THREE.Mesh( new THREE.CubeGeometry(25, 50, 25), this.material );
        },
        createBall: function() {
            return new THREE.Mesh( new THREE.SphereGeometry(30, 24, 24), this.material );
        },
        createArm: function() {
            return new THREE.Mesh( new THREE.CubeGeometry(12, 8, 50), this.material );
        },
        
        tick: function() {
            if(this.currentTarget) {
                this.gun.lookAt(this.currentTarget.position);
                
                if(this.gun.position.distanceTo(this.currentTarget.position) < this.detectionRadius) {
                    this.firePrimary();
                }
                
            }
        },
        
        firePrimary: function() {
            
            if(!this.canFire) return;
            
            var that = this;
            
            var proj = new Projectile(this.gun, 0, 0, 40);
            
            proj.speed = 10;
            
	        setTimeout(function() { sceneManager.addObjectTo( 'middleground', proj ); }, 0);

	        that.canFire = false;
	        
	        setTimeout(function() {
	            that.canFire = true;
	        }, that.primaryFireRate);
        },
        
        fireSecondary: function() {
            
        },
        
        onImpact: function(projectile) {
            // this.health -= projectile.power;
            // 
            // if(this.health <= 0) {
            //     this.remove(this.base);                
            // }
        }
        
    });
    
    
    attachTo.Turret = Turret;
    
}(window));