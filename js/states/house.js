/**
 * Created by Jota on 20/11/2016.
 */

function House(obj){

    var group = new THREE.Group();
    var lights = new THREE.Group();

    new LivingRoom(group, lights);
    new BedRoomOne(group, lights);
    new BedRoomTwo(group, lights);
    new BathRoom(group, lights);
    new Kitchen(group, lights);

    new Passage(group, lights);

    new Roof(group, lights);

    group.translateY(10.5);

    obj.meshes.push(group);
    obj.lights.push(lights);

}

function Roof(g, l){

    const offset = 10;

    const w = 50 + (offset);
    const h = 20;
    const d = 97 + (offset);

    var materials = [];

    var tiles = new THREE.MeshLambertMaterial({
        map: assets.textures.roof.val,
        side: THREE.DoubleSide
    });

    var sides = new THREE.MeshLambertMaterial({
        map: assets.textures.oldWood.val,
        side: THREE.DoubleSide
    });


    materials.push(tiles);
    materials.push(sides);

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, d),
        new THREE.Vector3(w, 0, d),
        new THREE.Vector3(w, 0, 0),
        new THREE.Vector3(w / 2, h, 0),
        new THREE.Vector3(w / 2, h, d)
    );

    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(2, 3, 0));

    geometry.faces.push(new THREE.Face3(0, 1, 5));
    geometry.faces.push(new THREE.Face3(0, 5, 4));

    geometry.faces.push(new THREE.Face3(2, 3, 5));
    geometry.faces.push(new THREE.Face3(3, 4, 5));

    geometry.faces.push(new THREE.Face3(0, 3, 4));
    geometry.faces.push(new THREE.Face3(1, 2, 5));

    var uvs = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 1)

    ];


    geometry.faceVertexUvs[0][0] = [ uvs[0], uvs[1], uvs[2] ];
    geometry.faceVertexUvs[0][1] = [ uvs[0], uvs[1], uvs[2] ];

    geometry.faceVertexUvs[0][2] = [ uvs[0], uvs[1], uvs[2] ];
    geometry.faceVertexUvs[0][3] = [ uvs[0], uvs[2], uvs[3] ];

    geometry.faceVertexUvs[0][4] = [ uvs[1], uvs[0], uvs[2] ];
    geometry.faceVertexUvs[0][5] = [ uvs[0], uvs[3], uvs[2] ];

    geometry.faceVertexUvs[0][6] = [ uvs[0], uvs[1], uvs[2] ];
    geometry.faceVertexUvs[0][7] = [ uvs[0], uvs[1], uvs[2] ];

    geometry.faces[0].materialIndex = 1;
    geometry.faces[1].materialIndex = 1;

    geometry.faces[6].materialIndex = 1;
    geometry.faces[7].materialIndex = 1;

    geometry.sortFacesByMaterialIndex();

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var mat = new THREE.MultiMaterial(materials);
    var mesh = new THREE.Mesh(geometry, mat);

    mesh.position.setX(-offset / 2);
    mesh.position.setZ(-offset / 2);
    mesh.position.setY(24);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    g.add(mesh);

}

function LivingRoom(g, l){

    var group = new THREE.Group();

    var config = new RoomDef();

    config.size.set(50, 35);

    config.windows.push(new config.Window(10, 5, 9, 15));
    config.windows.push(new config.Window(30, 5, 9, 15));
    config.windows.push(new config.Window(5, 5, 25, 15));

    config.WALLS.FRONT.TYPE = config.WALLTYPE.WINDOW;
    config.WALLS.FRONT.w = [2];

    config.WALLS.LEFT.TYPE = config.WALLTYPE.WINDOW;
    config.WALLS.LEFT.w = [0,1];

    config.WALLS.RIGHT.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 23;

    config.WALLS.BACK.TYPE = config.WALLTYPE.WINDOW;
    config.WALLS.BACK.w = [2];

    var door = assets.models.door_frame.val;
    door.position.setX(27.55);
    door.position.setZ(35.5);
    door.position.setY(-0.55);
    group.add(door);

    var room = new Room(config);
    group.add(room.group);

    g.add(group);

}

function Passage(g, l){

    var group = new THREE.Group();

    var config = new RoomDef();

    config.size.set(13, 61);

    config.WALLS.LEFT.TYPE = config.WALLTYPE.EMPTY;
    config.WALLS.RIGHT.TYPE = config.WALLTYPE.DOOR;
    config.WALLS.FRONT.TYPE = config.WALLTYPE.EMPTY;
    config.WALLS.BACK.TYPE = config.WALLTYPE.EMPTY;

    config.offsetX = 3;

    var room = new Room(config);
    group.add(room.group);

    var door = assets.models.door.val.clone();
    door.position.set(7.5,-0.55,61.5);
    group.add(door);

    group.position.set(20, 0, 35);

    g.add(group);

}

function BedRoomOne(g, l){

    var group = new THREE.Group();

    var config = new RoomDef();

    config.size.set(20, 30);

    config.WALLS.BACK.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 17;

    config.windows.push(new config.Window(5, 5, 9, 15));

    config.WALLS.FRONT.TYPE = config.WALLTYPE.WINDOW;
    config.WALLS.FRONT.w = [0];

    var room = new Room(config);
    group.add(room.group);

    var door = assets.models.door_frame.val.clone();
    door.rotation.z = Math.PI / 2;
    door.position.set(20.5,-0.55,8.5);
    group.add(door);

    group.position.set(0, 0, 35.5);

    g.add(group);

}

function BedRoomTwo(g, l){

    var group = new THREE.Group();

    var config = new RoomDef();

    config.size.set(20, 30);

    config.WALLS.BACK.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 17;

    config.windows.push(new config.Window(5, 5, 10, 15));

    config.WALLS.RIGHT.TYPE = config.WALLTYPE.WINDOW;
    config.WALLS.RIGHT.w = [0];

    var room = new Room(config);
    group.add(room.group);

    var door = assets.models.door_frame.val.clone();
    door.rotation.z = Math.PI / 2;
    door.position.set(20.5,-0.55,8.5);
    group.add(door);

    group.position.set(0.0005, 0, 65);

    g.add(group);

}

function Kitchen(g, l){

    var group = new THREE.Group();

    var config = new RoomDef();
    config.size.set(17, 40);

    config.WALLS.FRONT.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 23;

    config.windows.push(new config.Window(5, 5, 10, 15));

    config.WALLS.RIGHT.TYPE = config.WALLTYPE.WINDOW;
    config.WALLS.RIGHT.w = [0];

    var room = new Room(config);
    group.add(room.group);

    var door = assets.models.door_frame.val.clone();
    door.rotation.z = Math.PI / 2;
    door.position.set(0.5,-0.55,12.5);
    group.add(door);

    group.position.set(33, 0, 55);

    g.add(group);

}

function BathRoom(g, l){

    var group = new THREE.Group();

    var config = new RoomDef();

    config.size.set(17, 20);

    config.WALLS.FRONT.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 7;


    config.windows.push(new config.Window(3, 15, 15, 5));

    config.WALLS.BACK.TYPE = config.WALLTYPE.WINDOW;
    config.WALLS.BACK.w = [0];

    var room = new Room(config);
    group.add(room.group);

    var door = assets.models.door_frame.val.clone();
    door.rotation.z = Math.PI / 2;
    door.position.set(0.5,-0.55,8.5);
    group.add(door);

    group.position.set(33.0005, 0, 36);

    g.add(group);

}

function RoomDef(){

    this.WALLTYPE = {
        EMPTY: 0,
        SIMPLE: 1,
        DOOR: 2,
        WINDOW: 3
    };

    this.Window = function(xx, yy, ww, hh){
        this.x = xx;
        this.y = yy;
        this.w = ww;
        this.h = hh;
    };

    this.windows = [];

    this.materials = {
        FLOOR:      new THREE.MeshLambertMaterial( { map: assets.textures.wood.val } ),
        WALLS:      new THREE.MeshLambertMaterial( { map: assets.textures.wall.val } ),
        CELLING:    new THREE.MeshLambertMaterial( { map: assets.textures.wall.val } )
    }

    this.WALLS = {
        LEFT : { value: 0, TYPE: this.WALLTYPE.SIMPLE },
        RIGHT: { value: 1, TYPE: this.WALLTYPE.SIMPLE },
        FRONT: { value: 2, TYPE: this.WALLTYPE.SIMPLE },
        BACK : { value: 3, TYPE: this.WALLTYPE.SIMPLE }
    };

    this.size = new THREE.Vector2(10, 10);

    this.cellingSize = 24;
    this.wallDepth = 1.143;

    this.doorW = 8.2;
    this.doorH = 20.3;
    this.offsetX = 1;

    this.extrudeSettings = { amount: this.wallDepth, bevelEnabled: false};

}

function Room(config){

    const cfg = config;

    this.group = new THREE.Group();

    var floor = createFloor(cfg.materials.FLOOR);
    floor.rotation.x = Math.PI/2;
    this.group.add(floor);

    var celling = createWall(cfg.size.x + cfg.wallDepth - 0.1, cfg.size.y + cfg.wallDepth - 0.1, cfg.materials.CELLING);
    celling.rotation.x = Math.PI/2;
    celling.position.setY(cfg.cellingSize + 1);
    this.group.add(celling);

    if(cfg.WALLS.LEFT.TYPE !== cfg.WALLTYPE.EMPTY) {
        var leftWall = create(cfg.WALLS.LEFT);
        this.group.add(leftWall);
    }

    if(cfg.WALLS.RIGHT.TYPE !== cfg.WALLTYPE.EMPTY) {
        var rightWall = create(cfg.WALLS.RIGHT);
        this.group.add(rightWall);
    }
    if(cfg.WALLS.FRONT.TYPE !== cfg.WALLTYPE.EMPTY) {
        var frontWall = create(cfg.WALLS.FRONT);
        this.group.add(frontWall);
    }

    if(cfg.WALLS.BACK.TYPE !== cfg.WALLTYPE.EMPTY) {
        var backWall = create(cfg.WALLS.BACK);
        this.group.add(backWall);
    }

    function createWall(width, height, material){

        var rectShape = new THREE.Shape();
        rectShape.moveTo( 0,0 );
        rectShape.lineTo( 0, height );
        rectShape.lineTo( width, height );
        rectShape.lineTo( width, 0 );
        rectShape.lineTo( 0 , 0 );

        var mesh = createMeshFromShape(rectShape, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;

    }

    function createFloor(material){

        var width = cfg.size.x;
        var height = cfg.size.y;

        // Rectangle
        var rectShape = new THREE.Shape();
        rectShape.moveTo( 0,0 );
        rectShape.lineTo( 0, height );
        rectShape.lineTo( width, height );
        rectShape.lineTo( width, 0 );
        rectShape.lineTo( 0, 0 );

        var mesh = createMeshFromShape(rectShape, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;

    }

    function createWallWithDoor(width, height, material){

        var rectShape = new THREE.Shape();
        rectShape.moveTo( 0, 0 );           // 0
        rectShape.lineTo( cfg.offsetX, 0 );     // 1
        rectShape.lineTo( cfg.offsetX, cfg.doorH ); // 2
        rectShape.lineTo( cfg.offsetX + cfg.doorW, cfg.doorH );       // 3
        rectShape.lineTo( cfg.offsetX + cfg.doorW, 0 );           // 4
        rectShape.lineTo( width, 0 );           // 5
        rectShape.lineTo( width, height );           // 6
        rectShape.lineTo( 0, height );           // 7
        rectShape.lineTo( 0, 0 );           // 8

        var mesh = createMeshFromShape(rectShape, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;

    }

    function createWallWithWindow(wall, width, height, material) {

        var shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, height);
        shape.lineTo(width, height);
        shape.lineTo(width, 0);
        shape.lineTo(0, 0);

        var winds = cfg.windows;
        var wind = wall.w;

        // Check if all we have windows stores on the array
        if(typeof winds != "undefined" && winds != null && winds.length > 0) {

            // Check if we have windows defined for this wall
            if (typeof wind != "undefined" && wind != null && wind.length > 0) {

                for(var i = 0; i < wind.length; i++){

                    var index = wind[i];

                    var w = winds[index];

                    var hole = new THREE.Path();
                    hole.moveTo(w.x,        w.y);
                    hole.lineTo(w.x + w.w,  w.y);
                    hole.lineTo(w.x + w.w,  w.y + w.h);
                    hole.lineTo(w.x,        w.y + w.h);
                    hole.lineTo(w.x,        w.y);
                    shape.holes.push(hole);

                }

            } else {
                console.error("Windows not defined for this wall.");
            }
        }else{
            console.error("Any window has been set for the configuration.");
        }

        var g = new THREE.Group();

        var material = new THREE.MeshLambertMaterial( { map: assets.textures.wall.val } );
        var mesh = createMeshFromShape(shape, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        g.add(mesh);

        // Create glass

        var glassMaterial = new THREE.MeshPhongMaterial(
            {
                color: 0x0000ff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.25,
                specular: 0x050505,
                shininess: 100
            }
            );

        var geo = new THREE.PlaneGeometry(width, height);

        var m = new THREE.Mesh(geo, glassMaterial);
        m.translateZ(0.5);
        m.translateX(width / 2);
        m.translateY(height / 2);
        g.add(m);

        return g;

    }

    function createMeshFromShape(shape, material){
        var geometry = new THREE.ExtrudeGeometry( shape, cfg.extrudeSettings );
        geometry.computeBoundingBox();

        var max = geometry.boundingBox.max;
        var min = geometry.boundingBox.min;

        var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
        var range = new THREE.Vector2(max.x - min.x, max.y - min.y);

        var faces = geometry.faces;

        geometry.faceVertexUvs[0] = [];

        for (var i = 0; i < faces.length ; i++) {

            var v1 = geometry.vertices[faces[i].a],
                v2 = geometry.vertices[faces[i].b],
                v3 = geometry.vertices[faces[i].c];

            geometry.faceVertexUvs[0].push([
                new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
                new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
                new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y)
            ]);
        }
        geometry.uvsNeedUpdate = true;

        var mesh = new THREE.Mesh( geometry, material);
        return mesh;
    }

    function create(wall){

        switch(wall){
            case cfg.WALLS.LEFT:
                var wall = createFromType( wall, cfg.size.x, cfg.cellingSize);
                wall.position.setX(0.0005);
                wall.position.setZ(-0.0005);
                return wall;
            case cfg.WALLS.RIGHT:
                var wall = createFromType(wall, cfg.size.x + cfg.wallDepth, cfg.cellingSize);
                wall.position.setZ(cfg.size.y);
                return wall;
            case cfg.WALLS.FRONT:
                var wall = createFromType(wall, cfg.size.y, cfg.cellingSize);
                wall.rotation.y = Math.PI / 2;
                wall.position.setZ(cfg.size.y);
                return wall;
                break;
            case cfg.WALLS.BACK:
                var wall = createFromType(wall, cfg.size.y, cfg.cellingSize);
                wall.rotation.y = Math.PI / 2;
                wall.position.setZ(cfg.size.y);
                wall.position.setX(cfg.size.x);
                return wall;
            default:
                return undefined;
        }

    }

    function createFromType(wall, width, height){
        switch(wall.TYPE){
            case cfg.WALLTYPE.DOOR:
                return createWallWithDoor(width, height, cfg.materials.WALLS);
                break;
            case cfg.WALLTYPE.WINDOW:
                return createWallWithWindow(wall, width, height, cfg.materials.WALLS);
                break;
            case cfg.WALLTYPE.SIMPLE:
                return createWall(width, height, cfg.materials.WALLS);
            default:
                return undefined;
        }
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
