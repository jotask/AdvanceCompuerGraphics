/**
 * Created by Jota on 19/11/2016.
 */
function SimulationState(){

    var scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0,0,0));

    var player = new Player(camera);

    var geometry = new THREE.BoxBufferGeometry( 5, 5, 5 );
    var material = new THREE.MeshLambertMaterial( {color: 0x00ffff} );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,0,0);
    scene.add( mesh );

    this.update = function(){
        player.update();
    };

    this.render = function(){
        webGLRenderer.render(scene, camera);
    };

}