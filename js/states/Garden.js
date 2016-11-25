/**
 * Created by Jota on 22/11/2016.
 */
function Terrain(obj){

    // https://threejs.org/examples/webgl_geometry_terrain.html

    // var seed = Math.random();

    // noise.seed(Math.random());
    noise.seed(23);
    // noise.seed(0.2624946413746967);

    // console.log(seed);

    var worldWidth = 256, worldDepth = 256;

    var data = generateNoise( worldWidth, worldDepth );

    var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );

    var vertices = geometry.attributes.position.array;

    for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

        vertices[ j + 1 ] = data[ i ] * 10;

    }

    var texture = assets.textures.grass.val;

    var material = new THREE.MeshLambertMaterial( { map: texture} );
    // material.color.setHSL( 0.095, 1, 0.75 );

    var mesh = new THREE.Mesh( geometry, material );
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    // scene.add( mesh );
    obj.meshes.push(mesh);

    var water = new Water();
    obj.meshes.push(water);

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
                // const idk = 1.75;
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

    function Water(){


        var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
        geometry.rotateX( - Math.PI / 2 );

        var material = new THREE.MeshLambertMaterial( {color: 0x0000ff, transparent: true, opacity: 0.5} );
        // material.color.setHSL( 0.095, 1, 0.75 );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.transparent = 0.5;

        return mesh;

    }

}

function Garden(obj){

    new Terrain(obj);

}