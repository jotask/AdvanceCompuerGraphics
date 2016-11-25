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

    const folderModels = "assets/models/";
    const folderTextures = "assets/textures/";

    var manager = new THREE.LoadingManager();
    // manager.onProgress = function ( item, loaded, total ) {
    //     console.log( item, loaded, total );
    // };

    var textureLoader = new THREE.TextureLoader(manager);
    var modelLoader = new THREE.ColladaLoader(manager);

    var textureLoaded = 0;
    var modelsLoaded = 0;

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
            scale: 3,
            val: undefined
        }
    };

    this.models = {
        door: {
            url : 'door/Door.dae',
            scale2:{ x: 1.15, y: 1.65, z: 1.5},
            val: undefined
        }
    };

    const texturesToLoad = 5;
    const modelsToLoad = 1;

    this.load = function(){

        loadTexture(this.textures.floor);
        loadTexture(this.textures.wall);
        loadTexture(this.textures.wood);
        loadTexture(this.textures.grass);
        loadTexture(this.textures.roof);

        loadModel(this.models.door);

    };

    this.isFinished = function(){

        if(textureLoaded === texturesToLoad && modelsLoaded === modelsToLoad) return true;

        return false;

    };

    function loadModel(url){

        modelLoader.load(folderModels + url.url, function ( collada ) {
            var dae = collada.scene;
            // dae.scale.x = dae.scale.y = dae.scale.z = url.scale;
            dae.scale.x = url.scale2.x;
            dae.scale.y = url.scale2.z;
            dae.scale.z = url.scale2.y;
            dae.updateMatrix();
            dae.receiveShadow = true;
            dae.castShadow = true;
            url.val = dae;
            modelsLoaded++;
        });

    }

    function loadTexture(url) {
        textureLoader.load(folderTextures + url.url, function (text) {
            text.wrapS = text.wrapT = THREE.MirroredRepeatWrapping;
            text.repeat.set(url.scale, url.scale);
            url.val = text;
            textureLoaded++;
        });
    }

}