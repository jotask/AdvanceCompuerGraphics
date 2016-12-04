/**
 * Created by Jose Vives Iznardo on 22/11/2016.
 */

// Create all the objects related with the world
function World(obj){

    // Create the lights that simulate a sun
    new Sun(obj);
    //
    // Create the skybox
    new Sky(obj);

    // Create the terrain
    new Terrain(obj);

    // Create the water
    var water = new Water(obj);

    // Create the bird
    var bird = new Bird(obj);

    var fox = new Fox(obj);

    // Update all the objects needed
    this.update = function(){
        water.update();
        bird.update();
        fox.update();
    };

    // Render required shadows
    this.render = function(){
        water.render();
    }

}

// Create the sky
// Original code belongs to https://threejs.org/examples/webgl_shaders_sky.html
function Sky(obj){

    // How far away is the sky box from the center
    const dist = 2000;

    // Add Sky Mesh
    var group = new THREE.Group();
    var sky = new THREE.Sky(dist);
    group.add(sky.mesh);

    // Add Sun Sphere
    var sunSphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry( 20000, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
    sunSphere.position.y = - 700000;
    sunSphere.visible = false;
    // group.add( sunSphere );

    obj.meshes.push(group);

    // Effect Controller for the sky shader
    var effectController  = {
        turbidity: 1,
        rayleigh: 1,
        mieCoefficient: 0.007,
        mieDirectionalG: 0.8,
        luminance: 1,
        inclination: 0.3, // elevation / inclination
        azimuth: 0.13, // Facing front,
        sun: true
    };

    // Configure uniforms
    var uniforms = sky.uniforms;
    uniforms.turbidity.value = effectController.turbidity;
    uniforms.rayleigh.value = effectController.rayleigh;
    uniforms.luminance.value = effectController.luminance;
    uniforms.mieCoefficient.value = effectController.mieCoefficient;
    uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

    // Set the position
    var theta = Math.PI * ( effectController.inclination - 0.5 );
    var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );
    sunSphere.position.x = dist * Math.cos( phi );
    sunSphere.position.y = dist * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = -dist * Math.sin( phi ) * Math.cos( theta );

    // Finishing the set up
    sunSphere.visible = effectController.sun;
    sky.uniforms.sunPosition.value.copy( sunSphere.position );

}

// Add light that simulate the sun
function Sun(obj){

    // Directional Light that simulate the sun
    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
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

    // Make it work
    var d = 150;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 1000;
    dirLight.shadow.bias = -0.001;

}

// Create the ground
function Terrain(obj){

    // Set the seed
    noise.seed(23);

    // define the size
    var worldWidth = 256;
    var worldDepth = 256;

    // Generate the height map
    var data = generateNoise( worldWidth, worldDepth );

    // Create a plane for the ground
    var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );

    // Get all the vertices
    var vertices = geometry.attributes.position.array;

    // Iterate throw all the height map and set this values to the mesh
    for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
        vertices[ j + 1 ] = data[ i ] * 10;
    }

    // Get the texture and the normal map
    var texture = assets.textures.grass.val;
    var normal  = assets.textures.grassNormal.val;

    // Configure the material
    var material = new THREE.MeshPhongMaterial( {
        map: texture,
        normalMap: normal,
        specular: 0x000000,
        shininess: 0,
        shading: THREE.SmoothShading,
        normalScale: new THREE.Vector2( 1, 1 )
    } );

    // Crate the mesh
    var mesh = new THREE.Mesh( geometry, material );
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    mesh.translateX(-80);
    mesh.translateZ(-100);

    obj.meshes.push(mesh);

    // Generate the height map noise
    function generateNoise( width, height ){
        var size = width * height;
        var data = new Uint8Array( size );
        var quality = 1;
        const idk = 0.2;
        // Crate noise with the perlin noise function
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

// Create the water for the rivers and create the shader for the water reflection
function Water(obj){

    // Get the sun light direction normalize for the reflections
    var sunDir = new THREE.Vector3(-0.4, 0.7, 0.4);

    // Get the water normals
    var waterNormals = assets.textures.waternormals.val;

    // Create the water effect
    this.ms_Water = new THREE.Water(webGLRenderer, camera, obj.scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 	0.75,
        sunDirection: sunDir,
        sunColor: 0xffffff,
        waterColor: 0x0000ff,
        distortionScale: 100
    });

    // Crate the water mesh
    var aMeshMirror = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(7500, 7500, 10, 10),
        this.ms_Water.material
    );
    aMeshMirror.add(this.ms_Water);
    aMeshMirror.rotation.x = - Math.PI * 0.5;
    aMeshMirror.position.setY(7);
    obj.meshes.push(aMeshMirror);

    // Update the mesh
    this.update = function(){
        this.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
    };

    // Render the water shader
    this.render = function(){
        this.ms_Water.render();
    };

}

// Create the bird
// The model and animation belongs to mirada from rome project
function Bird(obj){

    // How far we want the bird orbit
    const far = 100;

    // Know where we want to rotate
    var parent = new THREE.Object3D();

    // Pivot to rotate
    var pivot = new THREE.Object3D();
    pivot.rotation.y = 0;
    parent.add(pivot);
    parent.position.set(- (far / 2) - 100,0,0);

    // Get the bird mesh
    var mesh = assets.animation.eagle.val;
    var g = assets.animation.eagle.g;

    // Create the animation
    var mixer = new THREE.AnimationMixer( mesh );
    mixer.clipAction( g.animations[ 0 ] ).setDuration( 1 ).play();
    mesh.position.setY(100);

    pivot.add(mesh);
    obj.meshes.push(parent);

    // Update the animation and the bird position
    this.update = function(){
        var delta = clock.getDelta();
        mixer.update( delta );
        parent.translateX(far);
        parent.rotation.y += 0.015;
        parent.translateX(-far);
    }

}

// Add a fox into the scene
// The model and animation belongs to mirada from rome project
function Fox(obj){

    // Fox velocity
    const speed = 1;

    var mesh = assets.animation.fox.val;
    var g = assets.animation.fox.g;

    // Create the animation
    var mixer = new THREE.AnimationMixer( mesh );
    mixer.clipAction( g.animations[0] ).setDuration( 0.20 ).play();
    mesh.position.set(100, 9, 0);

    obj.meshes.push(mesh);

    const range = 150;

    // Update the fox position
    this.update = function(){
        mixer.update(clock.getDelta() * 100);

        if((mesh.position.z > range) || (mesh.position.z < -range)){
            mesh.rotation.y += Math.PI;
        }
        mesh.translateZ(speed);
    }

}