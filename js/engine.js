/**
 * Created by Jota on 18/11/2016.
 */

const DEBUG = true;

var gsm;
var webGLRenderer;
var clock;
var stats;

var assets;

function Objects(sce){

    this.scene = sce;

    this.meshes = [];
    this.lights = [];

    this.addToScene = function(){

        for(var i = 0; i < this.meshes.length; i++){
            var mesh = this.meshes[i];
            this.scene.add(mesh);
        }

        for(var i = 0; i < this.lights.length; i++){
            var l = this.lights[i];
            this.scene.add(l);
        }

    };
    
}

function load(){
    assets = new AssetManager();

    assets.load();

    var millisecondsToWait = 500;

    // TODO
    var loader = setInterval(function() {
        if(assets.isFinished()){
            clearInterval(loader);
            init();
        }
    }, millisecondsToWait);

}

function init(){

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setSize( window.innerWidth, window.innerHeight );
    webGLRenderer.shadowMap.enabled = true;
    webGLRenderer.shadowMap.Type = THREE.PCFSoftShadowMap;
    webGLRenderer.gammaInput = true;
    webGLRenderer.gammaOutput = true;
    webGLRenderer.setPixelRatio(window.devicePixelRatio);
    webGLRenderer.shadowMap.renderReverseSided = false;
    document.body.appendChild(webGLRenderer.domElement);

    clock = new THREE.Clock();

    stats = new Stats();
    document.body.appendChild( stats.domElement );

    gsm = new GameStateManager();

    render();
}

function render(){

    requestAnimationFrame(render);

    webGLRenderer.clear();
    stats.update();
    gsm.update();
    gsm.render();

}
