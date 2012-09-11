/*
------------------------------------------------------------------------------
 ---=== DEPRECATED ===---  ---=== DEPRECATED ===---  ---=== DEPRECATED ===---
------------------------------------------------------------------------------
*/
(function(attachTo) {
    
    var zIndexCount = 0;
    
    function BackgroundObject(scene, camera) {
        this.objects = {};
        this.init(scene, camera);
        this.tick = function(){};
        this.render = function(){};
        this.zIndex = ++zIndexCount; // auto increment?
    }
    
    
    BackgroundObject.prototype.init = function(scene, camera) {
        var that = this;
        
        that.objects.scene = new THREE.Scene();
        that.objects.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        
        that.objects.scene.add(that.objects.camera);
        
        window.addEventListener('resize', function(e) {
            that.onWindowResize.call(that, e);
        }, false);
    };
    
    
    BackgroundObject.prototype.onWindowResize = function(e) {
        var SCREEN_HEIGHT = window.innerHeight;
		var SCREEN_WIDTH  = window.innerWidth;
		var camera = this.objects.camera;

        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
    };
    
    
    BackgroundObject.prototype.setTickFunction = function(tick) {
        var that = this;
        
        that.tick = function(dt) {
            tick(that.objects, dt);
        };
    };
    
    
    BackgroundObject.prototype.setRenderFunction = function(render) {
        var that = this;
        
        that.render = function(dt) {
            render(that.objects, dt);
        };
    };
    
    
    
    attachTo.BackgroundObject = BackgroundObject;
    
    
}(window));