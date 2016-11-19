/**
 * Created by Jota on 19/11/2016.
 */
function SimulationState(){

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    var scene = new THREE.Scene();

    var player = new Player(camera);

    this.update = function(){
        player.update();
    };

    this.render = function(){

        webGLRenderer.render(scene, camera);

    };

}