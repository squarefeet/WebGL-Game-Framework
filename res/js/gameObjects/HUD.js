(function(attachTo) {
    
    var GameObject = attachTo.GameObject;
    
    var HUD = GameObject.extend({
        zIndex: 10000,
        
        materialSettings: {   
            color: 0x00c1f8,
            opacity: 0.3,
        },
        
        scale: 0.002,
        
        initialize: function() {
            this.parent = new THREE.Object3D();            
            this.parent.position.z = -2;
            this.parent.scale.set(this.scale, this.scale, this.scale);
            
            
            this.velocity = new THREE.Vector3();
            
            var PI = Math.PI,
                thirdPI = (PI*2) / 3;
            
            this.makeCircle(0, 0, 3);
            
            var one = this.makeTriangle( 0, 0, 25, 6, 0 );
            var two = this.makeTriangle( 0, 0, 25, 6, 0 );
            var thr = this.makeTriangle( 0, 0, 25, 6, 0 );
            
            one.rotation.z = PI;
            one.position.y = 35;
            
            two.rotation.z = PI + thirdPI;
            two.position.y = -17;
            two.position.x = -30;
            
            thr.rotation.z = PI + thirdPI*2;
            thr.position.y = -17;
            thr.position.x = 30;
            
            this.parent.add(one);
            this.parent.add(two);
            this.parent.add(thr);
            
            
            this.makeVelHealthOutline(0, 0, 128);
            
            this.makeVelocity(64, -128, 128, 94);
            
            this.radar = new Radar(0, -256, 0, 64);
            
            this.parent.add(this.radar.parent);
            
            this.renderables.push(this.parent);
        },
        
        makeCircle: function(x, y, r) {
            var circle = new THREE.Shape();
			circle.moveTo( 0, r );
			circle.quadraticCurveTo( r, r, r, 0 );
			circle.quadraticCurveTo( r, -r, 0, -r );
			circle.quadraticCurveTo( -r, -r, -r, 0 );
			circle.quadraticCurveTo( -r, r, 0, r );
            
            var geometry = circle.extrude({ amount: 1, bevelEnabled: false });
            
            var mesh = this.makeMesh(geometry, x, y, r);
            
            this.parent.add(mesh);
        },
        
        makeTriangle: function(x, y, h, w, r) {
            var halfW = w/2,
                halfH = h/2;
            
            var triangleShape = new THREE.Shape();
			triangleShape.moveTo( x, y );
			triangleShape.lineTo( x + halfW, y + h );
			triangleShape.lineTo( x - halfW, y + h );
			triangleShape.lineTo( x, y );
            
            var geometry = triangleShape.extrude({ amount: 1, bevelEnabled: false });
            
            return this.makeMesh(geometry, x, y, r);
            
            
        },
        
        makeMesh: function(geometry, x, y, r) {
            var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial(this.materialSettings) );
			mesh.position.set( x, y, 0 );
			mesh.rotation.set( 0, 0, r );
			mesh.scale.set( 1, 1, 1 );
			return mesh;
        },
        
        
        makeVelHealthOutline: function(x, y, r) {
            
            var outline = new THREE.Shape();
            outline.moveTo(r, 0);
            outline.absarc(0, 0, r, -Math.PI, 0, false);
            
            outline = outline.createPointsGeometry();
            
            outline.vertices.pop();
            
            var line = new THREE.Line( outline, new THREE.LineBasicMaterial( this.materialSettings ) );
            this.parent.add(line);
        },
        
        
        makeVelocity: function(x, y, outerRadius, innerRadius) {
            
            var velocityLine = new THREE.Shape(),
                line1 = x - outerRadius + 50,
                line2 = x - outerRadius;
                
            velocityLine.moveTo(line1, y);
            velocityLine.lineTo(line2, y);
            
            var geometry = velocityLine.createPointsGeometry();
            
            this.velocityLine = new THREE.Line(geometry, new THREE.LineBasicMaterial(this.materialSettings));
            this.parent.add(this.velocityLine);
            
            var velocityCurve = new THREE.Shape();
            velocityCurve.moveTo(0, y);
            // velocityCurve.absarc(0, y+outerRadius, innerRadius, Math.PI, Math.PI + (Math.PI/2), false);
            velocityCurve.quadraticCurveTo( line2-20, y+10, line2 - 25, y + outerRadius );
            velocityCurve.moveTo(line2 - 25, y + outerRadius);
            velocityCurve.lineTo(line2 - 64, y + outerRadius);
            velocityCurve.quadraticCurveTo( -outerRadius + 10, y+10, 0, y-1);
            
            this.velocityCurve = new THREE.Line(
                velocityCurve.createPointsGeometry(),
                new THREE.LineBasicMaterial(this.materialSettings)
            );
            // this.velocityCurve.scale.set(1, 0.5, 1);
            
            this.parent.add(this.velocityCurve);
            
        },
        
        velocityToLinePosition: function(vel) {
            var degreesInVelocityRange = 90 / sceneManager.middleground.controls.maximumVelocity;
            
            var angle = vel * degreesInVelocityRange;
            
            var angleX = angle + 90;
            var angleY = angle - 90;
            
            angleX = angleX * (Math.PI/180);
            angleY = angleY * (Math.PI/180);
            
            this.velocityLine.position.x = -Math.cos(angleX) * 128 + 14;
            this.velocityLine.position.y = Math.sin(angleY) * 128 + 128;
        },
        
        
        
        makeRadar: function(x, y, r) {
            var radar = new THREE.Shape();
            radar.moveTo(r, 0);
            radar.absarc(0, 0, r, 0, Math.PI*2, false);
            
            this.radar = new THREE.Line(radar.createPointsGeometry(), new THREE.LineBasicMaterial(this.materialSettings));
            this.radar.position.y = -256;
            this.parent.add(radar);
        },
        
        
        tick: function() {
            this.parent.position.addSelf(this.velocity);
            
            this.velocityToLinePosition(sceneManager.middleground.controls.velocityVector.z);
            
            this.radar.tick();
            
        }
        
    });
    
    
    attachTo.HUD = HUD;
    
}(window));