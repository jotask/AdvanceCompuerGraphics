/**
 * Created by Jota on 18/11/2016.
 */
var gsm;
var webGLRenderer;

function init(){
    gsm = new GameStateManager();

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize( window.innerWidth, window.innerHeight );
    webGLRenderer.shadowMap.enabled = true;

    document.body.appendChild(webGLRenderer.domElement);

    render();
}

function render(){

    requestAnimationFrame(render);

    gsm.render();

}
