/**
 * Created by Jota on 20/11/2016.
 */

function House(scene){

    this.group = new THREE.Group();

    new LivingRoom(this.group);
    new BedRoomOne(this.group);
    new BedRoomTwo(this.group);
    new BathRoom(this.group);
    new Kitchen(this.group);

    new Passage(this.group);

    this.group.position.set(-50,0.5,0);

    scene.add(this.group);

}

function LivingRoom(scene){

    var config = new RoomDef();

    config.size.set(50, 35);

    // config.windows.push(new config.Window(10, 5, 20, 15));
    // config.windows.push(new config.Window(50, 5, 40, 15));
    //
    // config.WALLS.LEFT.TYPE = config.WALLTYPE.WINDOW;
    // config.WALLS.LEFT.w = [0, 1];

    config.WALLS.RIGHT.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 23;

    var room = new Room(config);

    scene.add(room.group);

}

function Passage(scene){

    var config = new RoomDef();

    config.size.set(13, 61);

    config.WALLS.LEFT.TYPE = config.WALLTYPE.EMPTY;
    config.WALLS.RIGHT.TYPE = config.WALLTYPE.DOOR;
    config.WALLS.FRONT.TYPE = config.WALLTYPE.EMPTY;
    config.WALLS.BACK.TYPE = config.WALLTYPE.EMPTY;

    config.offsetX = 3;

    var room = new Room(config);
    room.group.position.set(20, 0, 35);

    scene.add(room.group);

}

function BedRoomOne(scene){

    var config = new RoomDef();

    config.size.set(20, 30);

    config.WALLS.BACK.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 17;

    var room = new Room(config);
    room.group.position.set(0, 0, 35.5);

    scene.add(room.group);

}

function BedRoomTwo(scene){

    var config = new RoomDef();

    config.size.set(20, 30);

    config.WALLS.BACK.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 17;

    var room = new Room(config);
    room.group.position.set(0.0005, 0, 65);

    scene.add(room.group);

}

function Kitchen(scene){

    var config = new RoomDef();
    config.size.set(17, 40);

    config.WALLS.FRONT.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 23;

    var room = new Room(config);
    room.group.position.set(33, 0, 55);

    scene.add(room.group);

}

function BathRoom(scene){

    var config = new RoomDef();

    config.size.set(17, 20);

    config.WALLS.FRONT.TYPE = config.WALLTYPE.DOOR;
    config.offsetX = 7;

    var room = new Room(config);
    room.group.position.set(33.0005, 0, 36);

    scene.add(room.group);

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

        var material = new THREE.MeshLambertMaterial( { map: assets.textures.wall.val } );
        var mesh = createMeshFromShape(shape, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;

    }

    function createMeshFromShape(shape, material){
        var geometry = new THREE.ExtrudeGeometry( shape, cfg.extrudeSettings );
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
