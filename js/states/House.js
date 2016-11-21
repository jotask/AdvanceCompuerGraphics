/**
 * Created by Jota on 20/11/2016.
 */
function House(scene){

    var size = new THREE.Vector2(40, 50);

    var p = new THREE.Vector3(0, 0, 0)
    var room = new Room(p, size);

    scene.add(room.group);

}

// TODO implement https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_shapes.html

function Room(p, size){

    const cellingSize = 24;
    const wallDepth = 1.143;

    const extrudeSettings = { amount: wallDepth, bevelEnabled: false};

    this.group = new THREE.Group();

    var floor = createWall(size.x + wallDepth, size.y + wallDepth);
    floor.rotation.x = Math.PI/2;
    this.group.add(floor);

    var celling = createWall(size.x + wallDepth - 0.1, size.y + wallDepth - 0.1);
    celling.rotation.x = Math.PI/2;
    celling.position.setY(cellingSize);
    this.group.add(celling);

    var w1 = createWall(size.x, cellingSize);
    this.group.add(w1);

    var w2 = createWall(size.x + wallDepth, cellingSize);
    w2.position.setZ(size.y);
    this.group.add(w2);

    var w3 = createWall(size.y, cellingSize);
    w3.rotation.y = Math.PI / 2;
    w3.position.setZ(size.y);
    w3.position.setX(size.x);
    this.group.add(w3);

    var w4 = createWallWithDoor(size.y, cellingSize);
    w4.rotation.y = Math.PI / 2;
    w4.position.setZ(size.y);
    this.group.add(w4);

    {
        // var spotLight = new THREE.PointLight(0xffffff, 1);
        // spotLight.position.set( p.x + (size .x / 2), 20, p.y + (size.y / 2) );
        // spotLight.target.position.set(
        //     spotLight.position.x,
        //     0,
        //     spotLight.position.z
        // );
        // spotLight.target.updateMatrixWorld();
        // this.group.add(spotLight);
        // this.group.add(new THREE.SpotLightHelper(spotLight));

        var light = new THREE.PointLight( 0xff0040, 2, 50 );
        light.position.set(p.x + (size .x / 2), 20, p.y + (size.y / 2));
        this.group.add(light);
        this.group.add(new THREE.PointLightHelper(light, 1));

    }

    function createWall(width, height){
        // Rectangle
        var rectShape = new THREE.Shape();
        rectShape.moveTo( 0,0 );
        rectShape.lineTo( 0, height );
        rectShape.lineTo( width, height );
        rectShape.lineTo( width, 0 );
        rectShape.lineTo( 0, 0 );

        var mesh = createMeshFromShape(rectShape, 0xff0000, 1);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    function createWallWithDoor(width, height){

        const doorW = 8.2;
        const doorH = 20.3;
        const offsetX = 5;

        var rectShape = new THREE.Shape();
        rectShape.moveTo( 0, 0 );           // 0
        rectShape.lineTo( offsetX, 0 );     // 1
        rectShape.lineTo( offsetX, doorH ); // 2
        rectShape.lineTo( offsetX + doorW, doorH );       // 3
        rectShape.lineTo( offsetX + doorW, 0 );           // 4
        rectShape.lineTo( width, 0 );           // 5
        rectShape.lineTo( width, height );           // 6
        rectShape.lineTo( 0, height );           // 7
        rectShape.lineTo( 0, 0 );           // 8

        var mesh = createMeshFromShape(rectShape, 0xff0000, 1);

        return mesh;

    }

    function createMeshFromShape(shape, color){
        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        var material = new THREE.MeshLambertMaterial( { color: color } );
        var mesh = new THREE.Mesh( geometry, material);
        return mesh;
    }

}

function RoomPlane(p, size){

    const cellingSize = 24;

    this.group = new THREE.Group();

    {
        var spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set( p.x/2, 20, p.z/2 );

        this.group.add(spotLight);
        this.group.add(new THREE.PointLightHelper(spotLight, 3));
    }

    {
        var ground;
        var groundGeo = new THREE.PlaneBufferGeometry( size.x, size.y );
        groundGeo.computeFaceNormals();
        var groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        groundMat.color.setHSL( 0.095, 1, 0.75 );
        ground = new THREE.Mesh( groundGeo, groundMat );
        ground.rotation.x = -Math.PI/2;
        ground.receiveShadow = true;
        ground.position.set(p.x, p.y, p.z);
        this.group.add( ground );
    }


    {
        var ceiling;
        var ceilingGeo = new THREE.PlaneBufferGeometry( size.x, size.y );
        ceilingGeo.computeFaceNormals();
        var ceilingMat = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        groundMat.color.setHSL( 0.095, 1, 0.75 );
        ceiling = new THREE.Mesh( ceilingGeo, ceilingMat );
        ceiling.rotation.x = Math.PI/2;
        ceiling.receiveShadow = true;
        ceiling.position.set(p.x, p.y + cellingSize, p.z);
        this.group.add( ceiling );
    }

    {
        var wall = createWall(size.y, cellingSize);
        wall.rotation.y = Math.PI / 2;
        wall.position.set(p.x - ( size.x / 2), p.y, p.z + ( size.y / 2));
        this.group.add(wall);
    }

    {
        var wall = createWallWithDoor(size.y, cellingSize);
        wall.rotation.y = Math.PI / 2;
        wall.position.set(p.x + ( size.x / 2), p.y, p.z + ( size.y / 2));
        this.group.add(wall);
    }

    {
        var wall = createWall(size.x, cellingSize);
        wall.position.set(p.x - (size.x / 2), p.y, p.z - (size.y / 2));
        this.group.add(wall);
    }

    {
        var wall = createWall(size.x, cellingSize);
        wall.position.set(p.x - (size.x / 2), p.y, p.z + (size.y / 2));
        this.group.add(wall);
    }

    function createWall(width, height){
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(width, 0, 0));
        geometry.vertices.push(new THREE.Vector3(width, height, 0));
        geometry.vertices.push(new THREE.Vector3(0, height, 0));
        geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );
        geometry.computeFaceNormals();
        var material = new THREE.MeshLambertMaterial( { color: 0xff0000, side:THREE.DoubleSide } );
        var mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    function createWallWithDoor(width, height){

        const doorW = 8.2;
        // const doorW = 30;
        const doorH = 20.3;
        // const doorH = 5;

        const offsetX = 5;

        var geometry = new THREE.Geometry();
        // left side
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(offsetX, 0, 0));
        geometry.vertices.push(new THREE.Vector3(offsetX, height, 0));
        geometry.vertices.push(new THREE.Vector3(0, height, 0));
        // right side
        geometry.vertices.push(new THREE.Vector3(offsetX + doorW, 0, 0));
        geometry.vertices.push(new THREE.Vector3(width, 0, 0));
        geometry.vertices.push(new THREE.Vector3(width, height, 0));
        geometry.vertices.push(new THREE.Vector3(offsetX + doorW, height, 0));

        //top side
        geometry.vertices.push(new THREE.Vector3(offsetX, doorH, 0));
        geometry.vertices.push(new THREE.Vector3(offsetX + doorW, doorH, 0));
        geometry.vertices.push(new THREE.Vector3(offsetX + doorW, height, 0));
        geometry.vertices.push(new THREE.Vector3(offsetX, height, 0));

        // left side
        geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

        // right side
        geometry.faces.push( new THREE.Face3( 4, 5, 6 ) );
        geometry.faces.push( new THREE.Face3( 4, 6, 7 ) );

        // top side
        geometry.faces.push( new THREE.Face3( 8, 9, 10 ) );
        geometry.faces.push( new THREE.Face3( 8, 10, 11 ) );

        geometry.computeFaceNormals();

        var material = new THREE.MeshLambertMaterial( { color: 0xff0000, side:THREE.DoubleSide } );
        var mesh = new THREE.Mesh(geometry, material);
        mesh.receiveShadow = true;
        return mesh;

    }

}
