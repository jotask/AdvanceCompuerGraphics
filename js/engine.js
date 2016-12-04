/**
 * Created by Jose Vives Iznardo on 18/11/2016.
 */

// Show debug information on the scene
const DEBUG = false;
const ROOF = false;

// Global variables
var gsm;
var webGLRenderer;
var clock;
var stats;
var assets;

// Class to store all the objects, so when al the objects are created add this into the scene
function Objects(sce){

    // The scene where we need to add all the objects
    this.scene = sce;

    // Store meshes and lights
    this.meshes = [];
    this.lights = [];

    // Add everything into the scene
    this.addToScene = function(){

        // Add all the meshes
        for(var i = 0; i < this.meshes.length; i++){
            var mesh = this.meshes[i];
            this.scene.add(mesh);
        }

        // Add all the lights
        for(var i = 0; i < this.lights.length; i++){
            var l = this.lights[i];
            this.scene.add(l);
        }

    };
    
}

// Load all the assets required to run the simulation
function load(){

    // Crate the asset manager to store and request all the assets
    assets = new AssetManager();

    // start to load all the assets
    assets.load();

    // Wait until all the assets are loaded
    var millisecondsToWait = 500;
    var loader = setInterval(function() {
        if(assets.isFinished()){
            clearInterval(loader);
            init();
        }
    }, millisecondsToWait);

}

// Init global variables
function init(){

    // Renderer and all the options
    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setSize( window.innerWidth, window.innerHeight );
    webGLRenderer.shadowMap.enabled = true;
    webGLRenderer.shadowMap.Type = THREE.PCFSoftShadowMap;
    // webGLRenderer.gammaInput = true;
    // webGLRenderer.gammaOutput = true;
    webGLRenderer.setPixelRatio(window.devicePixelRatio);
    webGLRenderer.shadowMap.renderReverseSided = false;
    document.body.appendChild(webGLRenderer.domElement);

    // Clock to control simulation
    clock = new THREE.Clock();

    // Show stats on the screen
    stats = new Stats();
    document.body.appendChild( stats.domElement );

    // Initialize the State manager
    gsm = new GameStateManager();

    render();
}

// Render one frame
function render(){

    // Call this function again
    requestAnimationFrame(render);

    // Update before render
    stats.update();
    gsm.update();

    // Clear the screen
    webGLRenderer.clear();

    // Render the actual state
    gsm.render();

}
