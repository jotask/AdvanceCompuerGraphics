/**
 * Created by Jose Vives Iznardo on 18/11/2016.
 */

// Game state manager controller
function GameStateManager(){

    // current State
    var state = new SimulationState();

    // Update current state
    this.update = function(){
        state.update();
    };

    // Render current state
    this.render = function(){
        state.render();
    };

}

// Manage all the assets available
function AssetManager(){

    // Know if all the assets are loaded
    var isFinished = false;

    // Whe the assets are
    const folderModels = "assets/models/";
    const folderTextures = "assets/textures/";
    const folderAnimations = "assets/animated/";

    // Manager to control all the loaders available
    var manager = new THREE.LoadingManager();

    // What needs to do when is loading the assets
    manager.onProgress = function ( item, loaded, total ) {
        console.log("Loading assets...");
    };

    // When the assets are all loaded
    manager.onLoad = function () {
        console.log('all items loaded');
        isFinished = true;
    };

    // If an error has ocurred when loading an asset
    manager.onError = function () {
        console.error('there has been an error loading assets');
    };

    // Loader for the texture
    var textureLoader = new THREE.TextureLoader(manager);

    // Loader for the models
    var modelLoader = new THREE.ColladaLoader(manager);

    // Loader for animations
    var animatedLoader = new THREE.JSONLoader(manager);

    // Store and acces all the models
    this.textures = {
        waternormals: {
            url: 'waternormals.jpg',
                scale: 1,
                val: undefined
        },
        carpet: {
            url: 'carpet.jpg',
            scale: 1,
            val: undefined
        },
        wall: {
            url: 'wall.jpg',
            scale: 0.1,
            val: undefined
        },
        wood: {
            url: 'wood.jpg',
            scale: 0.1,
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

    // Store and acces all the models
    this.models = {
        door: {
            url : 'Door.dae',
            scale2:{ x: 1.15, y: 1.65, z: 1.5},
            val: undefined
        },
        door_frame: {
            url : 'Frame.dae',
            scale2:{ x: 1.15, y: 1.65, z: 1.5},
            val: undefined
        },
        toilet: {
            url : 'toilet.dae',
            scale2:{ x: 0.1, y: 0.1, z: 0.1},
            val: undefined
        },
        bed: {
            url : 'bed.dae',
            scale2:{ x: 0.05, y: 0.05, z: 0.05},
            val: undefined
        },
        drawer: {
            url : 'drawer.dae',
            scale2:{ x: 25, y: 25, z: 25},
            val: undefined
        },
        smallTable: {
            url : 'smalltable.dae',
            scale2:{ x: 0.15, y: 0.15, z: 0.15},
            val: undefined
        },
        lavalamp: {
            url : 'lavalamp.dae',
            scale2:{ x: 0.5, y: 0.5, z: 0.5},
            val: undefined
        },
        lamptop: {
            url : 'lamptop.dae',
            scale2:{ x: 3, y: 0.25, z: 3},
            val: undefined
        },
        desk: {
            url : 'desk.dae',
            scale2:{ x: 0.04, y: 0.04, z: 0.04},
            val: undefined
        },
        chair: {
            url : 'chair.dae',
            scale2:{ x: 0.06, y: 0.06, z: 0.06},
            val: undefined
        },
        kitchen: {
            url : 'kit.dae',
            scale2:{ x: 7, y: 7, z: 7},
            val: undefined
        },
        tableK: {
            url : 'table.dae',
            scale2:{ x: 3, y: 5, z: 3},
            val: undefined
        },
        sink: {
            url : 'sink.dae',
            scale2:{ x: 0.25, y: 0.25, z: 0.25},
            val: undefined
        }
    };

    // Hold all the animations
    this.animation = {
        fox: {
            url: 'fox.js',
            scale: { x: 0.25, y: 0.25, z: 0.25 },
            g: undefined,
            m: undefined,
            val: undefined
        },
        eagle: {
            url: 'eagle.js',
            scale: { x: 0.1, y: 0.1, z: 0.1 },
            g: undefined,
            m: undefined,
            val: undefined
        }
    };

    // Load all the assets
    this.load = function(){

        // Iterate all the textures required and load each one
        for(var key in this.textures) {
            loadTexture(this.textures[key]);
        }

        // Iterate all the models required an load each one
        for(var key in this.models){
            loadModel(this.models[key]);
        }

        // Iterate all the animations required an load each one
        for(var key in this.animation){
            loadAnimation(this.animation[key]);
        }

    };

    // Know if everything is loaded
    this.isFinished = function(){
        return isFinished;
    };

    // Load one mode, scale the model and set to cast and receieve shadows
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
        });
    }

    // Load one texture
    function loadTexture(url) {
        textureLoader.load(folderTextures + url.url, function (text) {
            text.wrapS = text.wrapT = THREE.MirroredRepeatWrapping;
            text.repeat.set(url.scale, url.scale);
            url.val = text;
        });
    }

    // Load an animation
    function loadAnimation(url){

        animatedLoader.load( folderAnimations + url.url, function( geometry ) {


            var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 20, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
            var mesh = new THREE.Mesh( geometry, material );
            mesh.scale.set( url.scale.x, url.scale.y, url.scale.z );
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            url.g = geometry;
            url.material = material;
            url.val = mesh;

        } );

    }

}