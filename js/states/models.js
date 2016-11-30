/**
 * Created by Jota on 29/11/2016.
 */
function Table(){

    const legS = 1;

    const width = 10;
    const height = 5;
    const depth = 1;
    const length = 7;

    this.obj = new THREE.Object3D();

    var text = assets.textures.oldWood.val;

    var mat = new THREE.MeshLambertMaterial({ map: text });

    var gTop = new THREE.BoxGeometry(width, depth, length);

    var mTop = new THREE.Mesh(gTop, mat);
    mTop.position.setY(height);
    mTop.castShadow = true;
    mTop.receiveShadow = true;

    var legGeo = new THREE.BoxGeometry(legS, height, legS);

    var leg1 = new THREE.Mesh(legGeo, mat);
    leg1.position.setY(height / 2);
    leg1.position.setX(width / 2 - 0.75);
    leg1.position.setZ(length / 2 - 0.75);
    leg1.castShadow = true;
    leg1.receiveShadow = true;

    var leg2 = new THREE.Mesh(legGeo, mat);
    leg2.position.setY(height / 2);
    leg2.position.setX(width / 2 - 0.75);
    leg2.position.setZ(-length / 2 + 0.75);
    leg2.castShadow = true;
    leg2.receiveShadow = true;

    var leg3 = new THREE.Mesh(legGeo, mat);
    leg3.position.setY(height / 2);
    leg3.position.setX(- width / 2 + 0.75);
    leg3.position.setZ(-length / 2 + 0.75);
    leg3.castShadow = true;
    leg3.receiveShadow = true;

    var leg4 = new THREE.Mesh(legGeo, mat);
    leg4.position.setY(height / 2);
    leg4.position.setX(- width / 2 + 0.75);
    leg4.position.setZ(length / 2 - 0.75);
    leg4.castShadow = true;
    leg4.receiveShadow = true;


    this.obj.add(mTop);
    this.obj.add(leg1);
    this.obj.add(leg2);
    this.obj.add(leg3);
    this.obj.add(leg4);

    this.obj.castShadow = true;
    this.obj.receiveShadow = true;

}

function Chair(){

    const legS = 0.5;

    const width = 3;
    const height = 5 / 1.5;
    const depth = 0.5;
    const length = 3;

    this.obj = new THREE.Object3D();

    var text = assets.textures.oldWood.val;

    var mat = new THREE.MeshLambertMaterial({ map: text });

    var gTop = new THREE.BoxGeometry(width, depth, length);

    var mTop = new THREE.Mesh(gTop, mat);
    mTop.position.setY(height);
    mTop.castShadow = true;
    mTop.receiveShadow = true;

    var legGeo = new THREE.BoxGeometry(legS, height, legS);
    var legGeo1 = new THREE.BoxGeometry(legS, height * 2, legS);

    var leg1 = new THREE.Mesh(legGeo1, mat);
    leg1.position.setY(height);
    leg1.position.setX(width / 2 - 0.75);
    leg1.position.setZ(length / 2 - 0.75);
    leg1.castShadow = true;
    leg1.receiveShadow = true;

    var leg2 = new THREE.Mesh(legGeo1, mat);
    leg2.position.setY(height);
    leg2.position.setX(width / 2 - 0.75);
    leg2.position.setZ(-length / 2 + 0.75);
    leg2.castShadow = true;
    leg2.receiveShadow = true;

    var topCG = new THREE.BoxBufferGeometry(depth, height / 2, width);
    var topCM = new THREE.Mesh(topCG, mat);
    topCM.position.setX(width / 2 - 1);
    topCM.position.setY(height * 2 - (height / 3.5));
    topCM.castShadow = true;
    topCM.receiveShadow = true;
    this.obj.add(topCM);

    var leg3 = new THREE.Mesh(legGeo, mat);
    leg3.position.setY(height / 2);
    leg3.position.setX(- width / 2 + 0.75);
    leg3.position.setZ(-length / 2 + 0.75);
    leg3.castShadow = true;
    leg3.receiveShadow = true;

    var leg4 = new THREE.Mesh(legGeo, mat);
    leg4.position.setY(height / 2);
    leg4.position.setX(- width / 2 + 0.75);
    leg4.position.setZ(length / 2 - 0.75);
    leg4.castShadow = true;
    leg4.receiveShadow = true;


    this.obj.add(mTop);
    this.obj.add(leg1);
    this.obj.add(leg2);
    this.obj.add(leg3);
    this.obj.add(leg4);

    this.obj.castShadow = true;
    this.obj.receiveShadow = true;

}

function Carpet(){

    const width = 30;
    const lenght = 20;
    const s = 1;

    this.obj = new THREE.Object3D();

    var geo = new THREE.BoxBufferGeometry(width, s, lenght);

    const si = 100;

    var texture = assets.textures.carpet.val;
    texture.repeat.set(si / width, si / width);

    var material = new THREE.MeshLambertMaterial({
        map: texture
    });

    var mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.obj.add(mesh);

}