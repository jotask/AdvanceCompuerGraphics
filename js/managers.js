/**
 * Created by Jota on 18/11/2016.
 */
function GameStateManager(){

    var state = new SimulationState();

    this.update = function(){
        state.update();
    };

    this.render = function(){
        state.render();
    };

}