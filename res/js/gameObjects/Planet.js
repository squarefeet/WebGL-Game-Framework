(function(attachTo) {
    
    var GameObject = attachTo.GameObject;
    
    var Planet = GameObject.extend({
        initialize: function() {
            this.material = new THREE.MeshBasicMaterial({color: 0xFFccFF});
            this.geometry = new THREE.SphereGeometry(200, 32, 32);
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            
            this.mesh.position.z = -4000;
            
            this.renderables.push(this.mesh);
        }
    });
    
    
    attachTo.Planet = Planet;
    
}(window));