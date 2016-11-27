/**
 * Created by Jota on 19/11/2016.
 */
function SimulationState(){

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 1, 2000 );
    scene.fog.color.setHSL( 0.6, 0, 1 );

    var obj = new Objects(scene);

    var player = new Player();

    if(DEBUG) {
        // Add the axes
        var axes = new THREE.AxisHelper(1000);
        scene.add(axes);

        // Add the grid for the world
        var grid = new THREE.GridHelper(300, 10);
        scene.add(grid);
    }

    var ambientLight = new THREE.AmbientLight(0xffffff, 0);
    obj.lights.push(ambientLight);

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        player.camera.aspect = window.innerWidth / window.innerHeight;
        player.camera.updateProjectionMatrix();

        webGLRenderer.setSize( window.innerWidth, window.innerHeight );

    }

    var house = new House(obj);
    var world = new World(obj);

    var l = new THREE.PointLight(0xffffff, 5);
    l.position.set(0, 100, 0);
    l.castShadow = true;
    l.shadow.mapSize.width = 1024;
    l.shadow.mapSize.height = 1024;
    scene.add(l);
    scene.add(new THREE.PointLightHelper(l,3));

    obj.addToScene(scene);

    this.update = function(){
        // FIXME uncomment this line
        player.update();
    };

    this.render = function(){
        webGLRenderer.render(scene, player.camera);
    };

}