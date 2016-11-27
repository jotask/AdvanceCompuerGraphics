/**
 * Created by Jota on 19/11/2016.
 */
function SimulationState() {

    var scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0xffffff, 500, 1000 );
    scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0005 );
    scene.fog.color.setHSL( 0.6, 0, 1 );

    var obj = new Objects(scene);

    var player = new Player(scene);

    if (DEBUG) {
        // Add the axes
        var axes = new THREE.AxisHelper(1000);
        scene.add(axes);

        // Add the grid for the world
        var grid = new THREE.GridHelper(300, 10);
        scene.add(grid);
    }

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    obj.lights.push(ambientLight);

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

        player.camera.aspect = window.innerWidth / window.innerHeight;
        player.camera.updateProjectionMatrix();

        webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    }

    new House(obj);
    new World(obj);

    obj.addToScene(scene);

    this.update = function () {
        // FIXME uncomment this line
        player.update();
    };

    this.render = function () {
        webGLRenderer.render(scene, player.camera);
    };

}