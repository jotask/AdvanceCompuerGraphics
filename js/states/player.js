/**
 * Created by Jota on 19/11/2016.
 */
function Player(scene){

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    // this.camera.position.set(27, 10, 14);
    this.camera.position.set(163, 100, -100);
    this.camera.lookAt(new THREE.Vector3(27, 10, 80));

    var camControls = new THREE.FirstPersonControls(this.camera);
    camControls.lookSpeed = 0.4;
    camControls.movementSpeed = 100;
    camControls.noFly = false;
    camControls.lookVertical = true;
    camControls.constrainVertical = true;
    camControls.verticalMin = 1.0;
    camControls.verticalMax = 2.0;
    camControls.lon = -150;
    camControls.lat = 120;

    this.update = function(){
        camControls.update(clock.getDelta());
        // var p = this.camera.position;
        // console.log(p.x + " - " + p.z);
    };

}
