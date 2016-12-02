/**
 * Created by Jose Vives Iznardo on 19/11/2016.
 */
var camera;

// Create the player to contrll the camera
function Player(){

    // Initialize the camera
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.set(25, 75, 125);
    this.camera.lookAt(new THREE.Vector3(0,25,150));

    // Save the camera as global variable
    camera = this.camera;

    // Camera controller
    var controls = new THREE.OrbitControls( this.camera, webGLRenderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

}
