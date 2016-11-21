/**
 * Created by Jota on 19/11/2016.
 */
function SimulationState(){

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xaaaaaa, 500, 1500 );
    
    // axes
    var axes = new THREE.AxisHelper(100);
    scene.add( axes );

    // var ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    // scene.add(ambientLight);

    var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 500 );
    const t = 50;
    camera.position.set(t, 7, t);
    camera.lookAt(scene.position);

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        webGLRenderer.setSize( window.innerWidth, window.innerHeight );

    }

    var player = new Player(camera);

    var grid = new THREE.GridHelper(300, 10);
    scene.add(grid);
    
    var house = new House(scene);

    this.update = function(){
        // FIXME uncomment this line
        player.update()
    };

    this.render = function(){
        webGLRenderer.render(scene, camera);
    };

}