/**
 * Created by Jota on 19/11/2016.
 */
function SimulationState(){

    var player = new Player();

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
    scene.fog.color.setHSL( 0.6, 0, 1 );

    if(DEBUG) {
        // Add the axes
        var axes = new THREE.AxisHelper(1000);
        scene.add(axes);

        // Add the grid for the world
        var grid = new THREE.GridHelper(300, 10);
        scene.add(grid);
    }

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        player.camera.aspect = window.innerWidth / window.innerHeight;
        player.camera.updateProjectionMatrix();

        webGLRenderer.setSize( window.innerWidth, window.innerHeight );

    }

    var world = new World(scene);
    var garden = new Garden(scene);
    var house = new House(scene);

    this.update = function(){
        // FIXME uncomment this line
        player.update();
        // console.log(camera.position.x + " - " + camera.position.z);
    };

    this.render = function(){
        webGLRenderer.render(scene, player.camera);
    };

}