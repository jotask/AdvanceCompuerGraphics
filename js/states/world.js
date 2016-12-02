/**
 * Created by Jota on 22/11/2016.
 */
function World(obj){

    new Sun(obj);
    new Sky(obj);
    new Terrain(obj);
    var water = new Water2(obj);

    this.update = function(){
        water.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
    };

    this.render = function(){
        water.ms_Water.render();
    }

}

function Sky(obj){
    const dist = 2000;
    // Add Sky Mesh
    var group = new THREE.Group();
    var sky = new THREE.Sky(dist);
    group.add(sky.mesh);

    // Add Sun Helper
    var sunSphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry( 20000, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
    sunSphere.position.y = - 700000;
    sunSphere.visible = false;
    group.add( sunSphere );

    obj.meshes.push(group);

    var effectController  = {
        turbidity: 10,
        rayleigh: 2,
        mieCoefficient: 0.007,
        mieDirectionalG: 0.8,
        luminance: 1,
        inclination: 0.3, // elevation / inclination
        azimuth: 0.13, // Facing front,
        sun: true
    };

    var distance = dist;

    var uniforms = sky.uniforms;
    uniforms.turbidity.value = effectController.turbidity;
    uniforms.rayleigh.value = effectController.rayleigh;
    uniforms.luminance.value = effectController.luminance;
    uniforms.mieCoefficient.value = effectController.mieCoefficient;
    uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

    var theta = Math.PI * ( effectController.inclination - 0.5 );
    var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

    sunSphere.position.x = distance * Math.cos( phi );
    sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = -distance * Math.sin( phi ) * Math.cos( theta );

    sunSphere.visible = effectController.sun;

    sky.uniforms.sunPosition.value.copy( sunSphere.position );

}

function Sun(obj){

    // // LIGHTS
    // var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.25 );
    // hemiLight.color.setHSL( 0.6, 1, 0.6 );
    // hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    // // FIXME Original position y=500
    // hemiLight.position.set( 0, 500, 0 );
    // obj.lights.push( hemiLight );
    // if(DEBUG) {
    //     obj.lights.push(new THREE.HemisphereLightHelper(hemiLight, 10));
    // }

    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.25 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 100 );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    obj.lights.push( dirLight );
    if(DEBUG) {
        obj.lights.push(new THREE.DirectionalLightHelper(dirLight, 10));
    }

    var d = 150;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

}

function Terrain(obj){

    // https://threejs.org/examples/webgl_geometry_terrain.html

    noise.seed(23);

    var worldWidth = 256, worldDepth = 256;

    var data = generateNoise( worldWidth, worldDepth );

    var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );

    var vertices = geometry.attributes.position.array;

    for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

        vertices[ j + 1 ] = data[ i ] * 10;

    }

    var texture = assets.textures.grass.val;
    var normal  = assets.textures.grassNormal.val;

    var material = new THREE.MeshPhongMaterial( {
        map: texture,
        normalMap: normal,
        specular: 0x000000,
        shininess: 0,
        shading: THREE.SmoothShading,
        normalScale: new THREE.Vector2( 1, 1 )
    } );

    var mesh = new THREE.Mesh( geometry, material );
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    mesh.translateX(-80);
    mesh.translateZ(-100);

    obj.meshes.push(mesh);

    function generateHeight( width, height ) {
        // Original algorithm
        var size = width * height;
        var data = new Uint8Array( size );
        var perlin = new ImprovedNoise();
        var quality = 1;
        var z = Math.random() * 1;

        for ( var j = 0; j < 4; j ++ ) {
            for ( var i = 0; i < size; i ++ ) {
                var x = i % width, y = ~~ ( i / width );
                const idk = 0.2;
                data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * idk );
            }
            quality *= 5;
        }
        return data;
    }

    function generateNoise( width, height ){

        var size = width * height;
        var data = new Uint8Array( size );
        var quality = 1;
        const idk = 0.2;

        for ( var j = 0; j < 4; j ++ ) {

            for ( var i = 0; i < size; i ++ ) {

                var x = i % width, y = ~~ ( i / width );
                data[ i ] = Math.abs(noise.perlin2(x / quality, y / quality) * quality * idk);

            }

            quality *= 5;

        }

        return data;

    }

}

function Water(obj){

    var worldWidth = 256, worldDepth = 256;

    var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );

    var material = new THREE.MeshLambertMaterial( {color: 0x0000ff, transparent: true, opacity: 0.5} );
    // material.color.setHSL( 0.095, 1, 0.75 );

    var mesh = new THREE.Mesh( geometry, material );
    mesh.transparent = 0.5;

    mesh.position.setY(7);

    obj.meshes.push(mesh);

}

function Water2(obj){

    var sunDir = new THREE.Vector3(-0.4, 0.7, 0.4);

    var waterNormals = assets.textures.waternormals.val;

    // Create the water effect
    this.ms_Water = new THREE.Water(webGLRenderer, camera, obj.scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 	0.75,
        sunDirection: sunDir,
        sunColor: 0xffffff,
        // waterColor: 0x001e0f,
        waterColor: 0x0000ff,
        distortionScale: 50.0
    });
    var aMeshMirror = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(7500, 7500, 10, 10),
        this.ms_Water.material
    );
    aMeshMirror.add(this.ms_Water);
    aMeshMirror.rotation.x = - Math.PI * 0.5;
    aMeshMirror.position.setY(7);
    obj.meshes.push(aMeshMirror);

}

function Water3(obj){

    var sunDir = new THREE.Vector3(-0.4, 0.7, 0.4);

    // Load textures
    var waterNormals = new assets.textures.waternormals.val;
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    // Create the water effect
    this.ms_Water = new THREE.Water(webGLRenderer, camera, obj.scene, {
        textureWidth: 256,
        textureHeight: 256,
        waterNormals: waterNormals,
        alpha: 	1.0,
        sunDirection: sunDir,
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        betaVersion: 0,
        side: THREE.DoubleSide
    });
    var aMeshMirror = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2000, 2000, 10, 10),
        this.ms_Water.material
    );
    aMeshMirror.add(this.ms_Water);
    aMeshMirror.rotation.x = - Math.PI * 0.5;

    obj.meshes.push(aMeshMirror);

}