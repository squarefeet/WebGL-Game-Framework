(function(attachTo) {
    
    
    var Radar = function(x, y, z, r) {
        this.initialize(x, y, z, r);
    };
    
    Radar.prototype = {

        threshold: 5000,
        
        dotRadius: 2,
        
        materials: [
            new THREE.LineBasicMaterial({ color: 0x00FF00 }),
            new THREE.LineBasicMaterial({ color: 0xFF0000 }),
            new THREE.LineBasicMaterial({ color: 0x888888 })
        ],
        
        objects: [],
        
        initialize: function(x, y, z, r) {
            this.parent = new THREE.Object3D();
            this.parent.position.set(x, y, z);
            this.parent.scale.set(1, 1, 1);
            
            this.parent.useQuaternion = true;
            
            var radar = new THREE.Shape();
            radar.moveTo(r, 0);
            radar.absarc(0, 0, r, 0, Math.PI*2, false);
            
            radar = new THREE.Line(radar.createPointsGeometry(), new THREE.LineBasicMaterial({   
                color: 0x00c1f8,
                opacity: 0.75,
            }));
            
            
            var that = this;
            
            eventHandler.on('scene:middleground:add', function(obj) {
                that.addObject(obj);
            });
            
            this.parent.add(radar);
            
            
            this.addEvents();
            
            var objs = sceneManager.middlegroundStore;
            
            for(var i = 0, il = objs.length; i < il; ++i) {
                this.addObject(objs[i]);
            }
        },
        
        addEvents: function() {
            eventHandler.on('scene:middleground:addObject', this.addObject, this);
            eventHandler.on('scene:middleground:removeObject', this.removeObject, this);
        },
        
        addObject: function(object) {
            var renderables = object.renderables,
                i = 0, il = renderables.length,
                radarObj;
                
            for(i; i < il; ++i) {
                radarObj = this.makeRadarObject(object.classification);
                
                this.parent.add(radarObj);
                
                this.objects.push([renderables[i], radarObj]);
            }
        },
        
        makeRadarObject: function(c) {
            var circle = new THREE.Shape(),
                r = this.dotRadius;
                
            circle.moveTo(r, 0);
            circle.absarc(0, 0, r, 0, Math.PI*2, false);
            
            circle = new THREE.Line(circle.createPointsGeometry(), this.materials[c]);
            return circle;
        },
        
        updateRadarObject: function(object) {
            var actual = object[0],
                radarObj = object[1],
                rPos = radarObj.position,
                aPos = actual.position;
            
            var pos = new THREE.Vector3().copy(sceneManager.middleground.camera.position);

            var distX = pos.x - aPos.x,
                distY = pos.y - aPos.y,
                distZ = pos.z - aPos.z;
            
            rPos.x = -(distX/20);
            rPos.y = distZ/20;
            
            if(rPos.x < -64 || rPos.x > 64 || rPos.y < -64 || rPos.y > 64) {
                radarObj.visible = false;
            }
            else {
                radarObj.visible = true;
            }
            
        },
        
        updateRadar: function() {
            var targetQ = sceneManager.middleground.camera.quaternion;
            
            // this.parent.quaternion.z = targetQ.x;
            // this.parent.quaternion.y = targetQ.y;
            // this.parent.quaternion.x = targetQ.z;
            // this.parent.quaternion.w = targetQ.w;
            // 
            // this.parent.matrix.copy( sceneManager.middleground.controls.object.matrix );
            // 
            // this.parent.matrixWorldNeedsUpdate = true;
        },
        
        
        tick: function() {
            var obj, radarObj;
            
            this.updateRadar();
            
            for(var i = 0, il = this.objects.length; i < il; ++i) {
                this.updateRadarObject( this.objects[i] );
            }
        }
        
    };
    
    attachTo.Radar = Radar;
    
}(window));