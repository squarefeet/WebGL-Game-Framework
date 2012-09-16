(function(attachTo) {
    
    var GameObject = attachTo.GameObject;
    
    var Sun = GameObject.extend({
        
        texture0: THREE.ImageUtils.loadTexture( "res/img/textures/lensflare/lensflare0.png" ),
        texture1: THREE.ImageUtils.loadTexture( "res/img/textures/lensflare/lensflare2.png" ),
        texture2: THREE.ImageUtils.loadTexture( "res/img/textures/lensflare/lensflare3.png" ),
        
        initialize: function() {
            // var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
            // dirLight.position.set( 0, -1, 0 ).normalize();
            // dirLight.color.setHSV( 0.1, 0.725, 0.9 );
            // this.renderables.push( dirLight );
            
            // this.addLight( 0.55, 0.825, 0.99, 5000, 0, -1000 );
            this.addLight( 0.08, 0.825, 0.99,    0, 0, -1000 );
            // this.addLight( 0.995, 0.025, 0.99, 5000, 5000, -1000 );
        },
        
        addLight: function(h, s, v, x, y, z) {
            var light = new THREE.PointLight( 0xffffff, 1.5, 4500 );
			light.position.set( x, y, z );
			light.color.setHSV( h, s, v );

			var flareColor = new THREE.Color( 0xffffff );
			flareColor.copy( light.color );
			THREE.ColorUtils.adjustHSV( flareColor, 0, -0.5, 0.5 );

			var lensFlare = new THREE.LensFlare( this.texture0, 700, 0.0, THREE.AdditiveBlending, flareColor );

			lensFlare.add( this.texture1, 512, 0.0, THREE.AdditiveBlending );
			lensFlare.add( this.texture1, 512, 0.0, THREE.AdditiveBlending );
			lensFlare.add( this.texture1, 512, 0.0, THREE.AdditiveBlending );

			lensFlare.add( this.texture2, 60, 0.6, THREE.AdditiveBlending );
			lensFlare.add( this.texture2, 70, 0.7, THREE.AdditiveBlending );
			lensFlare.add( this.texture2, 120, 0.9, THREE.AdditiveBlending );
			lensFlare.add( this.texture2, 70, 1.0, THREE.AdditiveBlending );

			lensFlare.customUpdateCallback = this.lensFlareUpdate;
			lensFlare.position = light.position;
            
            
			this.renderables.push( light );
			this.renderables.push( lensFlare );
        },
        
        lensFlareUpdate: function(object) {
            var f, fl = object.lensFlares.length,
			    flare,
			    vecX = -object.positionScreen.x * 2,
			    vecY = -object.positionScreen.y * 2;

			for( f = 0; f < fl; f++ ) {
                flare = object.lensFlares[ f ];
                flare.x = object.positionScreen.x + vecX * flare.distance;
                flare.y = object.positionScreen.y + vecY * flare.distance;
                flare.rotation = 0;
			}

			object.lensFlares[ 2 ].y += 0.025;
			object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + 45 * Math.PI / 180;
                    }        
        
    });
    
    attachTo.Sun = Sun;
    
}(window));