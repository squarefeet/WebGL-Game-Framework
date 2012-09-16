(function(attachTo) {
    
    var GameObject = attachTo.GameObject;
    
    
    var Ship = GameObject.extend({
        ship: null,
        
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        
        additionX: 0.01,
        additionY: 0.01,
        additionZ: 0.01,
        
        radius: 1000,
        
        health: 100,
        
        initialize: function(x, y, z, a, b, c, r) {
            this.ship = this.createShip();
            
            this.additionX = a/100;
            this.additionY = b/100;
            this.additionZ = c/100;
            
            this.radius = r;
            
            this.ship.position.set(x, y, z);
            
            this.renderables.push(this.ship);
        },
        
        createShip: function() {
            var material = new THREE.MeshPhongMaterial({ 
                ambient: 0x333333, 
                color: 0xffffff, 
                specular: 0xffffff, 
                shininess: 50, 
                perPixel: true 
            });
            
            var geometry = new THREE.CubeGeometry(20, 20, 20);
            
            return new THREE.Mesh(geometry, material);
        },
        
        tick: function() {
            this.angleX += this.additionX;
            this.angleY += this.additionY;
            this.angleZ += this.additionZ;

            // this.ship.position.z = Math.sin(this.angleX) * this.radius;
            // this.ship.position.y = Math.sin(this.angleY) * this.radius;
            // this.ship.position.x = Math.cos(this.angleZ) * this.radius;
        },
        
        firePrimary: function() {
            
        },
        
        fireSecondary: function() {
            
        },
        
        onImpact: function(projectile) {
            this.health -= projectile.power;
            
            if(this.health <= 0) {
                this.remove(this.ship);                
            }
        }
        
    });
    
    
    attachTo.Ship = Ship;
    
}(window));