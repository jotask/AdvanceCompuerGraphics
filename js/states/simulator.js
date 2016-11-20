/**
 * Created by Jota on 19/11/2016.
 */
function SimulationState(){

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xAAAAAA, 500, 1000 );

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set(100, 100, 100);
    camera.lookAt(scene.position);

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        webGLRenderer.setSize( window.innerWidth, window.innerHeight );

    }

    var player = new Player(camera);

    var geometry = new THREE.BoxBufferGeometry( 5, 5, 5 );
    var material = new THREE.MeshLambertMaterial( {color: 0x00ffff} );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,0,0);
    scene.add( mesh );

    var grid = new THREE.GridHelper(300, 10);
    scene.add(grid);

    this.update = function(){
        // FIXME uncomment this line
        //player.update();
    };

    this.render = function(){
        webGLRenderer.render(scene, camera);
    };

}

function Room(){



}