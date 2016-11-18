/**
 * Created by Jota on 18/11/2016.
 */
var gsm;
function init(){
    gsm = new GameStateManager();


    render();
}

function render(){

    requestAnimationFrame(render);

    gsm.render();

}
