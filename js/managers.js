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

    manager.onLoad = function () {
        console.log('all items loaded');
    };

    manager.onError = function () {
        console.error('there has been an error loading assets');
    };

    var textureLoader = new THREE.TextureLoader(manager);
    var modelLoader = new THREE.ColladaLoader(manager);

    var xLoaded = 0;
    var textureLoaded = 0;
    var modelsLoaded = 0;

    this.textures = {
        uv: {
            url: 'uv.jpg',
            scale: 0.05,
            val: undefined
        },
        carpet: {
            url: 'carpet.jpg',
            scale: 1,
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

    this.x = {
        grass01: {
            url: 'grass01.png',
            val: undefined
        },
        grass02: {
            url: 'grass02.png',
            val: undefined
        },
        flowers01: {
            url: 'flowers01.png',
            val: undefined
        },
        flowers02: {
            url: 'flowers02.png',
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
        },
        toilet: {
            url : 'toilet/toilet.dae',
            scale2:{ x: 0.1, y: 0.1, z: 0.1},
            val: undefined
        },
        bed: {
            url : 'bed/bed.dae',
            scale2:{ x: 0.05, y: 0.05, z: 0.05},
            val: undefined
        },
        drawer: {
            url : 'drawer/drawer.dae',
            scale2:{ x: 25, y: 25, z: 25},
            val: undefined
        },
        smallTable: {
            url : 'stable/smalltable.dae',
            scale2:{ x: 0.15, y: 0.15, z: 0.15},
            val: undefined
        },
        lavalamp: {
            url : 'lavalamp/lavalamp.dae',
            scale2:{ x: 0.5, y: 0.5, z: 0.5},
            val: undefined
        },
        lamptop: {
            url : 'lamptop/lamptop.dae',
            scale2:{ x: 3, y: 0.25, z: 3},
            val: undefined
        },
        desk: {
            url : 'desk/desk.dae',
            scale2:{ x: 0.04, y: 0.04, z: 0.04},
            val: undefined
        },
        chair: {
            url : 'chair/chair.dae',
            scale2:{ x: 0.06, y: 0.06, z: 0.06},
            val: undefined
        },
        kitchen: {
            url : 'kit/kit.dae',
            scale2:{ x: 7, y: 7, z: 7},
            val: undefined
        },
        tableK: {
            url : 'kit/table.dae',
            scale2:{ x: 3, y: 5, z: 3},
            val: undefined
        }
    };

    const xToLoad = Object.keys(this.x).length;
    const texturesToLoad = Object.keys(this.textures).length;
    const modelsToLoad = Object.keys(this.models).length;

    this.load = function(){

        for(var key in this.x) {
            loadX(this.x[key]);
        }

        for(var key in this.textures) {
            loadTexture(this.textures[key]);
        }

        for(var key in this.models){
            loadModel(this.models[key]);
        }

    };

    this.isFinished = function(){

        if(textureLoaded === texturesToLoad && modelsLoaded === modelsToLoad && xLoaded === xToLoad) return true;

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

    function loadX(url) {
        textureLoader.load('assets/x/' + url.url, function (text) {
            url.val = text;
            xLoaded++;
        });
    }

}