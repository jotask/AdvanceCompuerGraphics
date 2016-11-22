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

function AssetManager(){

    const folder = "assets/";

    var loader = new THREE.TextureLoader();

    var loaded = 0;

    this.textures = {
        floor: {
            url: 'carpet.jpg',
            scale: 0.05,
            val: undefined
        },
        wall: {
            url: 'wall.jpg',
            scale: 0.05,
            val: undefined
        },
        wood: {
            url: 'wood.jpg',
            scale: 0.05,
            val: undefined
        },
        grass: {
            url: 'grass.jpg',
            scale: 100,
            val: undefined
        },
        roof: {
            url: 'roof.jpg',
            scale: 0.05,
            val: undefined
        }
    };

    const toLoad = 5;

    this.load = function(){

        loadTexture(this.textures.floor);
        loadTexture(this.textures.wall);
        loadTexture(this.textures.wood);
        loadTexture(this.textures.grass);
        loadTexture(this.textures.roof);

    };

    this.isFinished = function(){

        if(loaded === toLoad) return true;

        return false;
    };

    function loadTexture(url) {
        loader.load(folder + url.url, function (text) {
            text.wrapS = text.wrapT = THREE.MirroredRepeatWrapping;
            text.repeat.set(url.scale, url.scale);
            url.val = text;
            loaded++;
        });
    }

}