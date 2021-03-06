/**
 * Created by Jose Vives Iznardo on 20/11/2016.
 */
// Create the house
function House(obj){

    // Store everything in one object
    var group = new THREE.Group();

    // Create each room in the house
    new LivingRoom(group);
    new BedRoomOne(group);
    new BedRoomTwo(group);
    new BathRoom(group);
    new Kitchen(group);
    new Passage(group);

    if(ROOF) {
        new Roof(group);
    }

    // Move the house
    group.translateY(10.5);

    // Add the house
    obj.meshes.push(group);

}

// Create the Roof
function Roof(g){

    // Set the roof offset
    const offset = 10;

    // Set the roof size
    const w = 50 + (offset);
    const h = 20;
    const d = 97 + (offset);

    // Array to store materials
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

    // Create roof geometry
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

    // Map uv textures
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

    // Create the roof
    var mat = new THREE.MultiMaterial(materials);
    var mesh = new THREE.Mesh(geometry, mat);

    mesh.position.setX(-offset / 2);
    mesh.position.setZ(-offset / 2);
    mesh.position.setY(24);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    g.add(mesh);

}

// Create the living room
function LivingRoom(g){

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

    var t = new Table().obj;
    t.position.set(25, 0, 15);
    group.add(t);

    var c = new Chair().obj;
    c.position.set(25 + 10, 0, 15);
    group.add(c);

    var c1 = new Chair().obj;
    c1.position.set(25 - 10, 0, 15);
    c1.rotation.y = Math.PI;
    group.add(c1);

    var carp = new Carpet().obj;
    carp.position.set(25, -0.45, 17);
    group.add(carp);

    var lamp = assets.models.lamptop.val.clone();
    lamp.rotation.y = Math.PI;
    lamp.position.setY(24);
    lamp.position.setX(19);
    lamp.position.setZ(15);
    group.add(lamp);

    // var light = new THREE.SpotLight(0xffffff, 0.25);
    // light.target.position.set(25, 0, 15);
    // light.target.updateMatrixWorld();
    // light.castShadow = true;
    // light.position.setY(21);
    // light.position.setX(25);
    // light.position.setZ(15);
    // light.angle = Math.PI / 2.25;
    // group.add(light);

    g.add(group);

}

// Create the passage
function Passage(g){

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

// Create the bedroom
function BedRoomOne(g){

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

    var bed = assets.models.bed.val;
    bed.position.setY(5);
    bed.position.setX(6.6);
    bed.position.setZ(19);
    bed.rotation.z = Math.PI;
    group.add(bed);

    var drawer = assets.models.drawer.val;
    drawer.position.setY(10);
    drawer.position.setX(2);
    drawer.position.setZ(4.7);
    drawer.rotation.z = Math.PI / 2;
    group.add(drawer);

    var st = assets.models.smallTable.val;
    st.position.setX(19);
    st.position.setZ(29.75);
    st.position.setY(0);
    st.rotation.z = Math.PI;
    group.add(st);

    var lavalamp = assets.models.lavalamp.val;
    lavalamp.position.setY(8);
    lavalamp.position.setX(13);
    lavalamp.position.setZ(27);
    group.add(lavalamp);

    // var light = new THREE.PointLight(0xff0000, 1);
    // light.position.set(15, 10, 25);
    // light.castShadow = true;
    // group.add(light);

    group.position.set(0, 0, 35.5);

    g.add(group);

}

// Create other bedroom
function BedRoomTwo(g){

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

    var desk = assets.models.desk.val;
    desk.rotation.z = Math.PI / 2;
    desk.position.setX(5);
    desk.position.setZ(26);
    group.add(desk);

    var chair = assets.models.chair.val;
    chair.rotation.z = Math.PI;
    chair.position.setZ(20);
    chair.position.setX(15);
    group.add(chair);

    group.position.set(0.0005, 0, 65);

    g.add(group);

}

// Create the kitchen
function Kitchen(g){

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

    var kit = assets.models.kitchen.val;
    kit.rotation.z = -Math.PI / 2;
    kit.position.setX(16.75);
    kit.position.setZ(1.75);
    group.add(kit);

    var table = assets.models.tableK.val;
    table.rotation.z = Math.PI / 2;
    table.position.setX(14);
    table.position.setZ(30);
    group.add(table);

    group.position.set(33, 0, 55);

    g.add(group);

}

// Create the bathroom
function BathRoom(g){

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

    var toilet = assets.models.toilet.val;
    toilet.position.setY(5.75);
    toilet.position.setX(12.4);
    toilet.position.setZ(16);
    toilet.rotation.z = -Math.PI / 2;
    group.add(toilet);

    var sink = assets.models.sink.val;
    sink.rotation.z = -Math.PI / 2;
    sink.position.setY(5);
    sink.position.setZ(7);
    sink.position.setX(15);
    group.add(sink);

    var lamp = assets.models.lamptop.val.clone();
    lamp.rotation.y = Math.PI;
    lamp.position.setY(24);
    lamp.position.setX(5);
    lamp.position.setZ(10);
    group.add(lamp);

    var light = new THREE.SpotLight(0xffffff, 0.25);
    light.target.position.set(11, 0, 11);
    light.target.updateMatrixWorld();
    light.distance = 100;
    light.position.setY(21);
    light.position.setX(10);
    light.position.setZ(11);
    light.angle = Math.PI / 2.25;
    group.add(light);

    group.position.set(33.0005, 0, 36);

    g.add(group);

}

// Configuration to use for create each room
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
        FLOOR:      new THREE.MeshPhongMaterial( { map: assets.textures.wood.val, shininess: 100, shading: THREE.SmoothShading } ),
        WALLS:      new THREE.MeshLambertMaterial( { map: assets.textures.wall.val, shading: THREE.SmoothShading } ),
        CELLING:    new THREE.MeshLambertMaterial( { map: assets.textures.wall.val, shading: THREE.SmoothShading } )
    };

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

// Function for create room
function Room(config) {

    const cfg = config;

    this.group = new THREE.Group();

    var floor = createFloor(cfg.materials.FLOOR);
    floor.rotation.x = Math.PI / 2;
    this.group.add(floor);

    if (ROOF) {
        var celling = createWall(cfg.size.x + cfg.wallDepth - 0.1, cfg.size.y + cfg.wallDepth - 0.1, cfg.materials.CELLING);
        celling.rotation.x = Math.PI / 2;
        celling.position.setY(cfg.cellingSize + 1);
        this.group.add(celling);
    }

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

        return createMeshFromShape(rectShape, material);

    }

    function createWallWithWindow(wall, width, height) {

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
        var glassMaterial = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: 0x91FFD7,
            transparent: true,
            opacity: 0.5,
            shininess: 200,
            specular: 0xFAFAC8
        });

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

        geometry.faceVertexUvs[0] = [];

        geometry.faces.forEach(function(face) {

            var components = ['x', 'y', 'z'].sort(function(a, b) {
                return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
            });

            var v1 = geometry.vertices[face.a];
            var v2 = geometry.vertices[face.b];
            var v3 = geometry.vertices[face.c];

            geometry.faceVertexUvs[0].push([
                new THREE.Vector2(v1[components[0]], v1[components[1]]),
                new THREE.Vector2(v2[components[0]], v2[components[1]]),
                new THREE.Vector2(v3[components[0]], v3[components[1]])
            ]);

        });

        geometry.uvsNeedUpdate = true;

        var mesh = new THREE.Mesh( geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;

    }

    function create(wall){

        switch(wall){
            case cfg.WALLS.LEFT:
                var w = createFromType( wall, cfg.size.x, cfg.cellingSize);
                w.position.setX(0.0005);
                w.position.setZ(-0.0005);
                return w;
            case cfg.WALLS.RIGHT:
                var w = createFromType(wall, cfg.size.x + cfg.wallDepth, cfg.cellingSize);
                w.position.setZ(cfg.size.y);
                return w;
            case cfg.WALLS.FRONT:
                var w = createFromType(wall, cfg.size.y, cfg.cellingSize);
                w.rotation.y = Math.PI / 2;
                w.position.setZ(cfg.size.y);
                return w;
            case cfg.WALLS.BACK:
                var w = createFromType(wall, cfg.size.y, cfg.cellingSize);
                w.rotation.y = Math.PI / 2;
                w.position.setZ(cfg.size.y);
                w.position.setX(cfg.size.x);
                return w;
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

// First function to create room, only uses planes
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
        mesh.castShadow = true;
        mesh.receiveShadow = true;
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
