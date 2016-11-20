/**
 * Created by Jota on 18/11/2016.
 */
var gsm;
var webGLRenderer;
var clock;

function init(){
    gsm = new GameStateManager();

    webGLRenderer = new THREE.WebGLRenderer();
    //webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize( window.innerWidth, window.innerHeight );
    webGLRenderer.shadowMap.enabled = true;
    document.body.appendChild(webGLRenderer.domElement);

    clock = new THREE.Clock();

    render();
}

function render(){

    requestAnimationFrame(render);
    webGLRenderer.clear();
    gsm.update();
    gsm.render();

}
