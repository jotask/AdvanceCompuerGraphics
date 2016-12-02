/**
 * Created by Jose Vives Iznardo on 19/11/2016.
 */
var scene;

// State where all the simulation happend
function SimulationState() {

    // Scene for the simulation
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0005 );
    scene.fog.color.setHSL( 0.6, 0, 1 );

    // Where al the objects are
    var obj = new Objects(scene);

    // Camera controller
    var player = new Player(scene);

    // Configure the renderer for this scene
    webGLRenderer.shadowMapSoft = true;
    webGLRenderer.shadowCameraNear = 3;
    webGLRenderer.shadowCameraFar = camera.far;
    webGLRenderer.shadowCameraFov = 50;
    webGLRenderer.shadowMapBias = 0.0039;
    // webGLRenderer.shadowMapDarkness = 0.5;
    webGLRenderer.shadowMapWidth = 2048;
    webGLRenderer.shadowMapHeight = 2048;

    // Show debug helpers
    if (DEBUG) {
        // Add the axes
        var axes = new THREE.AxisHelper(1000);
        scene.add(axes);

        // Add the grid for the world
        var grid = new THREE.GridHelper(300, 10);
        scene.add(grid);
    }

    // Ambient light
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.33);
    obj.lights.push(ambientLight);

    // Add the event listener for when the screen is resized
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        // Update the camera aspect and the renderer size
        player.camera.aspect = window.innerWidth / window.innerHeight;
        player.camera.updateProjectionMatrix();
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
    }

    // Create the world
    var world = new World(obj);

    // Create the house
    new House(obj);

    // Add everything into the scene
    obj.addToScene(scene);

    // Add effects to the renderer and initalize all the shaders
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

    // Update everything is needed
    this.update = function () {
        world.update();
    };

    // Render everything is needed
    this.render = function () {
        // webGLRenderer.render(scene, player.camera);
        world.render();
        composer.render();
    };

}