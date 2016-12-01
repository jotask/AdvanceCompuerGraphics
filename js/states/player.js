/**
 * Created by Jota on 19/11/2016.
 */
var camera;
function Player(scene){

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.set(27, 10, 14);
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    camera = this.camera;

    var controls = new THREE.OrbitControls( this.camera, webGLRenderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    this.update = function(){
        // camControls.update(clock.getDelta());
        // var p = this.camera.position;
        // console.log(p.x + " - " + p.z);
    };

}
