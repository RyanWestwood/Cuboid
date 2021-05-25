//  Importing the Three.js library for creating a 3D web application.
//  README (three.js, 2020)
import * as THREE from '../../../vendor/three/build/three.module.js';
//  Importing Dat.GUI. Used for debugging. Easier to move objects around
//  the screen interactively without having to hard code guesses.
//  README (dat.gui, 2017)
import * as DAT from '../../../vendor/dat.gui/build/dat.gui.module.js';

// Importing my own modules 
import * as INPUT from './input.js';
import * as PRIM from './primitive.js';
import * as LIGHT from './lights.js';
import * as ENEMY from './enemy.js';

// Resizes the window to prevent the game from artifacting on resize.
// consistently always proportional. No streches or black bars on the side.
const onWindowResize = () => {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', onWindowResize, false);

//  https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
window.mobileCheck = () => {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// API - https://www.thecolorapi.com/
// Creates a URL with random RGB values, which creates a random colour scheme.
// The data is then fetched from the URL in JSON. The colour array from this 
// data is then collected and passed to a function that will loop through the
// array and push it to the colour palette to be used in gameplay.
// README (Getting data from Pokeapi.co, 2020) (The Color API, 2020)
var colourPalette = []

let r = () => {
    return String(Math.floor(Math.random() * 255));
}

const apiData = {
    url: 'https://www.thecolorapi.com/',
    type: 'scheme?',
    rgb: 'rgb=' + r() + ',' + r() + ',' + r(),
    mode: 'mode=analogic-complement',
    count: 'count=10',
}

const { url, type, rgb, mode, count } = apiData;
const apiUrl = `${url}${type}${rgb}&${mode}&${count}`

fetch(apiUrl)
    .then((data) => data.json())
    .then((scheme) => getColours(scheme))

const getColours = (data) => {
    data.colors.forEach(function (c) {
        colourPalette.push(c.rgb.value);
    });
}
// End of API

/// Variables created which are ready to be defined.
let game;

let input, camera, renderer;

let floor;

let enemySpawner, enemies;

let playerRotation, player;
let health = 100, lives = 1;
let alive = true;

let light, ambLight;

const ui = document.getElementById("ui");
let score = 0;

let spawnTimer = 0;
let moveSpeed = 0.4, spawnRate = 20;

var enemyArr = []
var collidableMeshList = []

let cloudSpawnRotate, cloudSpawnPoint, cloud;
let cloudMoveSpeed = 0.001;

let uiScore;
let font = new THREE.Font("resources/fonts/font.json");

//  Waiting until texture is loaded before loading.
//  README (loaded?, Deschamps and Deschamps, 2020)
let texture;
var loaderPromise = new Promise(function (resolve, reject) {
    let loadDone = (x) => resolve(x);
    new THREE.TextureLoader().load("resources/images/player.jpg", loadDone);
});

loaderPromise.
    then(function (response) {
        texture = response;
        //  Creates and repares the scene with objects.
        game = init();
        //  Begins rendering the scene.
        animate();
    }, (err) => console.log(err)
    );


//  Restart the game. Sets all the variables to init values.
const restart = () => {
    score = 0;
    spawnTimer = 0;
    moveSpeed = 0.4;
    spawnRate = 20;
    enemyArr.forEach(function (item) {
        game.remove(item);
    });
    enemyArr = []
    collidableMeshList.forEach(function (item) {
        game.remove(item);
    });
    collidableMeshList = []
    health = 100;
    lives = 1;
    alive = true;
}

const init = () => {
    let scene = new THREE.Scene();
    //  Creating the Scene, Camera and Renderer
    input = new INPUT.Input();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('world').appendChild(renderer.domElement);

    // Create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add( listener );

    // Create an audio source
    const sound = new THREE.Audio( listener );

    // Load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'resources/sounds/music.ogg', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( true );
      sound.setVolume( 0.5 );
      sound.play();
    });

    //  Adding fog to the scene. Gives the effect of the cubes
    //  coming out with a washed colour.
    scene.fog = new THREE.FogExp2(0x555555, 0.03);

    //  Sets the floor the enemies and player can move on.
    floor = PRIM.getCylinder(5, 50, 16, 0xA5A1A5);
    floor.position.x = -23;
    floor.rotateX(12.25 * (Math.PI / 180));
    floor.rotateZ(Math.PI / 2);
    scene.add(floor);

    //  Sets the clouds to add more of an enviroment.
    cloudSpawnRotate = new THREE.Group();
    cloudSpawnRotate.position.x = -20;

    cloudSpawnPoint = new THREE.Group();
    cloudSpawnPoint.position.y = 17;

    cloudSpawnRotate.add(cloudSpawnPoint);
    scene.add(cloudSpawnRotate)

    for(let i = 0; i < 10; i++){
      cloudSpawnRotate.rotateX((Math.random() * 0.2) +(i*0.2));

      var pos = new THREE.Vector3();
      cloudSpawnPoint.getWorldPosition(pos);
      pos.x += Math.floor(Math.random() * 10 ) + 5;

      var rot = new THREE.Quaternion();
      cloudSpawnRotate.getWorldQuaternion(rot);

      var mesh = PRIM.getCloud(0xffffff);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.applyQuaternion(rot);

      cloudSpawnRotate.add(mesh);
    }

    //  Sets the position enemies to spawn at. This is parent is rotated, 
    //  then an object is spawned at the childs position. To allow for enemies
    //  to spawn all around the cyclinder randomly. Gives effect of never 
    //  ending scroll.
    enemySpawner = new THREE.Object3D();
    enemySpawner.position.x = -50;

    enemies = new THREE.Object3D();
    enemies.position.y = 5.4;
    enemySpawner.add(enemies);
    scene.add(enemySpawner)

    // let test = new THREE.Vector3()
    // enemies.getWorldPosition(test);

    // console.log(test.x);

    //  Sets the player rotation point at 0,0,0 similar to enemySpawner,
    //  Sets the player to be a child of rotation. Rotate the playerRotation
    //  to make the player rotate around the cylinder correctly.
    playerRotation = new THREE.Object3D();
    player = PRIM.getBox(1, 1, 1, null, false, texture);
    player.position.y = 5.4;

    //  Sets the lights. Directional is placed behind enemies to give shadow.
    //  Ambient light is set so even though there is a shadow, you can make out
    //  the colour of the enemy. Light is a child of player so shadows are
    //  always facing the player.
    light = LIGHT.getDirectionalLight(0x777777, 1);
    light.position.y = 4;
    light.position.x = -20;

    ambLight = LIGHT.getAmbientLight(0xffffff, 0.5);
    scene.add(ambLight);

    player.add(light);

    //  Sets the camera position to be local to the player. To give the effect
    //  of third person gameplay.
    player.add(camera);
    camera.position.x = 3;
    camera.position.y = 2;
    camera.lookAt(new THREE.Vector3(0, 7, 0));

    playerRotation.add(player);
    scene.add(playerRotation);

    return scene;
}

// This function is called many times a second. This is how all movement animations
// are computed.
const animate = () => {
    requestAnimationFrame(animate);
    if (alive == true) {
        //  UI
        ui.innerHTML = 'Score: ' + ++score;

        //  Input for keyboard and touchscreen. Left and Right.
        if (input.isLeftPressed || input.isLeftTap) {
            playerRotation.rotateX(Math.PI / 8);
            input.isLeftPressed = false;
            input.isLeftTap = false;
        }
        if (input.isRightPressed || input.isRightTap) {
            playerRotation.rotateX(-Math.PI / 8);
            input.isRightPressed = false;
            input.isRightTap = false;
        }

        //  Enemy spawner. Spawns the enemies everytime the spawnTimer is greater
        //  than the spawn rate. enemySpawn is rotated randomly so an object can be 
        //  created at the enemySpawner child (enemies) location.
        //  These are added to an enemyArray and a collidableArray.
        //  Resets spawn time to start counting Snext enemy spawn.
        if (spawnTimer >= spawnRate) {
            enemySpawner.rotateX(Math.ceil(Math.random() * 16) * (Math.PI / 8));

            var pos = new THREE.Vector3();
            enemies.getWorldPosition(pos);

            var rot = new THREE.Quaternion();
            enemySpawner.getWorldQuaternion(rot);

            var mesh = PRIM.getBox(1.9, 1.9, 1.9, colourPalette[Math.floor(Math.random() * colourPalette.length)], true);
            mesh.position.set(pos.x, pos.y, pos.z);
            mesh.applyQuaternion(rot);

            var enemy = new ENEMY.Enemy(game, mesh);

            enemyArr.push(enemy);
            collidableMeshList.push(mesh);
            spawnTimer = 0;
        }
        spawnTimer++;

        cloudSpawnRotate.rotateX(cloudMoveSpeed);

        //  Moves the enemies. Checks their positions and if theyre no longer
        //  infront of the player they get removed from the list and scene.
        enemyArr.forEach(function (item, index, object) {
            item.update(moveSpeed);
            if (item.mesh.position.x >= 0) {
                object.splice(index, 1);
                collidableMeshList.splice(index, 1);
                item.remove()
            }
        });

        //  Collision detection. Checks wether an enemy cube is intersecting with 
        //  the player. If it is alive is set to false and the game is over. Check Read me for collision.
        //  README (Collision Detection (Three.js), 2020)
        let originPoint = new THREE.Vector3();
        player.getWorldPosition(originPoint)
        for (var vertexIndex = 0; vertexIndex < player.geometry.vertices.length; vertexIndex++) {
            var localVertex = player.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(player.matrix);
            var directionVector = globalVertex.sub(player.position);

            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects(collidableMeshList);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                health = lives = 0;
                ui.innerHTML = 'Score: ' + ++score;
                alive = false;
            }
        }

        //  Increasing the games difficulty over time.
        //  Every 500 score the enemies speed increases.
        //  Every 1000 score enemies will spawn a little faster until.
        //  the spawn rate hits 8. At that point only their speed increases.
        if (score % 500 == 0) {
            moveSpeed += 0.01;
        }
        if (score % 1000 == 0) {
            spawnRate -= 2
            if (spawnRate <= 8) spawnRate = 8;
        }

    } else {
        // Tells the player the game is over, shows the score and how to restart/
        if(window.mobileCheck() == true){
           ui.innerHTML = 'Score: ' + score + ", Tap to replay";
        }else{
           ui.innerHTML = 'Score: ' + score + ", Press enter to replay";
        }

        if (input.isEnterPressed || (input.isLeftTap || input.isRightTap)) {
            restart();
            input.isEnterPressed = false;
            input.isLeftTap = false;
            input.isRightTap = false;
        }
    }
    renderer.render(game, camera);
}
