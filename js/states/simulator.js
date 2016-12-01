/**
 * Created by Jota on 19/11/2016.
 */
var scene;
function SimulationState() {

    var scene = new THREE.Scene();
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
        // composer.setSize(window.innerWidth, window.innerHeight);

    }

    new House(obj);
    var world = new World(obj);

    // var l = new THREE.SpotLight(0xff0000, 1);
    // l.position.set(20, 20, 20);
    // l.castShadow = true;
    // l.shadow.mapSize.width = 2048;
    // l.shadow.mapSize.height = 2048;
    // l.shadow.camera.near = .01;
    // l.shadow.camera.far = 4000;
    // l.shadow.camera.fov = 60;
    // obj.lights.push(l);
    // obj.lights.push(new THREE.SpotLightHelper(l));

    obj.addToScene(scene);

    var renderModel = new THREE.RenderPass( scene, player.camera );

    var effectBleach = new THREE.ShaderPass( THREE.BleachBypassShader );
    var effectColor = new THREE.ShaderPass( THREE.ColorCorrectionShader );
    var effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );

    effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );

    effectBleach.uniforms[ 'opacity' ].value = 0.4;

    effectColor.uniforms[ 'powRGB' ].value.set( 1.4, 1.45, 1.45 );
    effectColor.uniforms[ 'mulRGB' ].value.set( 1.1, 1.1, 1.1 );

    effectFXAA.renderToScreen = true;

    var composer = new THREE.EffectComposer( webGLRenderer );

    composer.addPass( renderModel );

    composer.addPass( effectBleach );
    composer.addPass( effectColor );
    composer.addPass( effectFXAA );


    this.update = function () {
        // FIXME uncomment this line
        player.update();
    };

    this.render = function () {
        // webGLRenderer.render(scene, player.camera);
        composer.render();
        world.render();
    };

}