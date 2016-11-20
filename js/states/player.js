/**
 * Created by Jota on 19/11/2016.
 */
function Player(camera){

    var camControls = new THREE.FirstPersonControls(camera);
    camControls.lookSpeed = 0.4;
    camControls.movementSpeed = 20;
    camControls.noFly = false;
    camControls.lookVertical = true;
    camControls.constrainVertical = true;
    camControls.verticalMin = 1.0;
    camControls.verticalMax = 2.0;
    camControls.lon = -150;
    camControls.lat = 120;

    this.update = function(){
        camControls.update(clock.getDelta());
    };

    this.render = function(){

    };

}
