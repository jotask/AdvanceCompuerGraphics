/**
 * Created by Jota on 19/11/2016.
 */
var camera;
function Player(scene){

    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.set(25, 75, 125);
    this.camera.lookAt(new THREE.Vector3(0,25,150));

    camera = this.camera;

    var controls = new THREE.OrbitControls( this.camera, webGLRenderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

}
