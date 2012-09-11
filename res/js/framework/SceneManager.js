(function(attachTo) {
	
	function Scene() {
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		
		return { scene: scene, camera: camera };
	}
	
	
	function SceneManager() {
		// Create a background scene to hold any static objects
		this.background = new Scene();
		
		// The middleground scene holds all objects that will inhabit the
		// game world (ships, the player, etc)
		this.middleground = new Scene();
		
		// The foreground will hold static objects to sit on top of everything
		// else (the HUD).
		this.foreground = new Scene();
	}
	
	
	
	
	
	attachTo.SceneManager = SceneManager;
	
}(window));