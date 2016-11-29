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
    manager.onProgress = function ( item, loaded, total ) {
        // console.log( item, loaded, total );
        console.log("Loading assets...");
    };

    var textureLoader = new THREE.TextureLoader(manager);
    var modelLoader = new THREE.ColladaLoader(manager);

    var textureLoaded = 0;
    var modelsLoaded = 0;

    this.textures = {
        uv: {
            url: 'uv.jpg',
            scale: 0.05,
            val: undefined
        },
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
        grassNormal: {
            url: 'grassNormal.png',
            scale: 100,
            val: undefined
        },
        grassN: {
            url: 'grassN.bmp',
            scale: 100,
            val: undefined
        },
        grassHM: {
            url: 'grassHM.png',
            scale: 100,
            val: undefined
        },
        roof: {
            url: 'roof.jpg',
            scale: 1,
            val: undefined
        },
        oldWood: {
            url: 'old_wood.jpg',
            scale: 1,
            val: undefined
        }
    };

    this.models = {
        door: {
            url : 'door/Door.dae',
            scale2:{ x: 1.15, y: 1.65, z: 1.5},
            val: undefined
        },
        door_frame: {
            url : 'door/Frame.dae',
            scale2:{ x: 1.15, y: 1.65, z: 1.5},
            val: undefined
        }
    };

    const texturesToLoad = Object.keys(this.textures).length;
    const modelsToLoad = Object.keys(this.models).length;

    this.load = function(){

        for(var key in this.textures) {
            loadTexture(this.textures[key]);
        }

        for(var key in this.models){
            loadModel(this.models[key]);
        }

    };

    this.isFinished = function(){

        if(textureLoaded === texturesToLoad && modelsLoaded === modelsToLoad) return true;

        return false;

    };

    function loadModel(url){

        modelLoader.load(folderModels + url.url, function ( collada ) {
            var dae = collada.scene;
            dae.scale.x = url.scale2.x;
            dae.scale.y = url.scale2.z;
            dae.scale.z = url.scale2.y;

            dae.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );

            dae.updateMatrix();
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