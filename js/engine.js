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

        console.log(this.meshes.length + " - " + this.lights.length);

        for(var i = 0; i < this.meshes.length; i++){
            this.scene.add(this.meshes[i]);
        }

        for(var i = 0; i < this.lights.length; i++){
            this.scene.add(this.lights[i]);
        }

    };

    this.addObjects = function(obj){

        console.log(obj.meshes.length + " - " + obj.lights.length);

        for(var i = 0; i < obj.meshes.length; i++){
            this.scene.add(obj.meshes[i]);
        }

        for(var i = 0; i < obj.lights.length; i++){
            this.scene.add(obj.lights[i]);
        }
    }
    
}

function load(){
    assets = new AssetManager();

    assets.load();

    var millisecondsToWait = 500;

    setTimeout(function() {
        if(assets.isFinished()){
            init();
        }
    }, millisecondsToWait);

}

function init(){

    webGLRenderer = new THREE.WebGLRenderer();
    //webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize( window.innerWidth, window.innerHeight );
    webGLRenderer.shadowMap.enabled = true;
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
