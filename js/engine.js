/**
 * Created by Jota on 18/11/2016.
 */
var gsm;
var webGLRenderer;
var clock;
var stats;

function init(){


    webGLRenderer = new THREE.WebGLRenderer();
    //webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize( window.innerWidth, window.innerHeight );
    webGLRenderer.shadowMap.enabled = true;
    webGLRenderer.gammaInput = true;
    webGLRenderer.gammaOutput = true;
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
