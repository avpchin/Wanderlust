// CSCI & ARTS 107 Final Game
// By Kar Yern Chin, Dalia Luque, and Winnie Ma
// May 2015 
///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

var ANIMATION_RATE = 5; // frames per second
var SHADOW_IMAGE = loadImage("shadow16.png");
var MAIN_MUSIC = loadSound("509696_LUXX.mp3");
var LEVEL1_BG_LIGHT = loadImage("level1LightBackground.png");
var LEVEL1_BG_DARK = loadImage("level1DarkBackground.png");
var LEVEL2_BG_LIGHT = loadImage("level2Lightbackground.png");
var LEVEL2_BG_DARK = loadImage("Level2Darkbackground.png");
var LEVEL3_BG_LIGHT = loadImage("level3Light.png");
var LEVEL3_BG_DARK = loadImage("level3darkbackground.png");
var SPARKS = loadImage("SPARKS.png");
var STAR_SHADOW = loadImage("starShadow.png");
var LEVEL1_TILE_LIGHT = loadImage("level1LightPlatform.png");
var LEVEL1_TILE_DARK = loadImage("level1DarkPlatform1.png");
var LEVEL2_TILE_LIGHT = loadImage("level2LightPlatform.png");
var LEVEL2_TILE_DARK = loadImage("level2DarkPlatform.png");
var LEVEL3_TILE_LIGHT = loadImage("level3lightPlatform1.png");
var LEVEL3_TILE_DARK = loadImage("level3darkPlatform.png");

var LEVEL1_HOLE_LIGHT = loadImage("level1LightHole.png");
var LEVEL1_HOLE_DARK = loadImage("level1DarkHole.png");
var LEVEL2_HOLE_LIGHT = loadImage("level2LightHole1.png");
var LEVEL2_HOLE_DARK = loadImage("level2DarkHole.png");
var LEVEL3_HOLE_LIGHT = loadImage("level3LightHole2.png");
var LEVEL3_HOLE_DARK = loadImage("level3DarkHole2.png");

var LEVEL1_HOLE_LIGHT_FILLED = loadImage("level1LightHoleFilled.png");
var LEVEL1_HOLE_DARK_FILLED = loadImage("level1DarkHoleFilled.png");
var LEVEL2_HOLE_LIGHT_FILLED = loadImage("level2LightHoleClosed2.png");
var LEVEL2_HOLE_DARK_FILLED = loadImage("level2DarkHoleClosed2.png");
var LEVEL3_HOLE_LIGHT_FILLED = loadImage("level3LightHoleFilled2.png");
var LEVEL3_HOLE_DARK_FILLED = loadImage("level3DarkHoleFilled2.png");
var GAME_INSTRUCTIONS = loadImage("GAMEINSTRUCTIONS.png");
var SPECIAL_HOLE_1 = loadImage("specialHoleOpen.png");
var SPECIAL_HOLE_2 = loadImage("specialHole2open.png");

var SPECIAL_HOLE_1_FILLED = loadImage("specialHoleClosed2.png");
var SPECIAL_HOLE_2_FILLED = loadImage("specialHole2Filled2.png");

var QUEST_SPRITE = loadImage("questItemSheet.png");
var RIVER_IMAGE = loadImage("riverTile.png");
var STAR_IMAGE = loadImage("star.png");
var STAR_SPRITE = loadImage("STARSPRITE2.png");
var PORTAL_IMAGE = loadImage("portal.png");
var MUSIC_RECHARGE_TIME = 82;
var BLACK_BG = loadImage("blackBackground.png");
var PLATFORM_SIZE = 128;


//var BACKGROUND_COLOR = makeColor(0.1, 0.2, 0.2, 0.7)

var WALK = 1;
var IDLE = 2;

// These correspond to the order of animations in myplayer.png
var EAST = 0;
var NORTH = 1;
var WEST = 2;
var SOUTH = 3;

var PI = 3.1415927;

///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

var dpad;

var roomArray;
var worldArray
var currentRoom;

var music_last_time = 0;

var player;
var lastChangeTime = 0;
var changeDir = 0.02;
var nextStep = false;
var winGame = false;
var offPlatform = false;
var roomNum = 0;
var isChanging = false;
var opacity = 0.999;
var holeChanging = false;
var lastFillTime = 0;
var lastChangeFillTime = 0;
var changeNum = 0;
var fillingHole;
var lastHoleFillTime2 = 0;
var lastQuestChangeTime = 0;
var hasGameStarted = false;
///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //

defineGame("Final Game", "codeheart.js developer", "title.png");

// When setup happens...
function onSetup() {
    createplayer();
    createDPad();

    roomArray = [];
    createRoom();
    createRoom();
    createRoom();
    createWorld(roomArray[0]);
    createWorld(roomArray[0]);
    createWorld(roomArray[1]);
    createWorld(roomArray[1]);
    createWorld(roomArray[2]);
    createWorld(roomArray[2]);
    currentRoom = roomArray[0];
    roomArray[0].currentWorld = roomArray[0].worldArray[0];
    roomArray[1].currentWorld = roomArray[1].worldArray[0];
    roomArray[2].currentWorld = roomArray[2].worldArray[0];
    startGame();
   playSound(MAIN_MUSIC);
}

function startGame() {

    //createObjects(width1, width2, height1, height2, objectWidth, objectHeight, image, objectString, world);

    ///////////////////////////////////LEVEL 1////////////////////////////////////////////////////////////////

    // Room 1 first world
    createObjects(PLATFORM_SIZE / 2, PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);
    createObjects(PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, 5 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);
    createObjects(PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 6 * PLATFORM_SIZE, 9 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);
    createObjects(5 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 5 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 4 * PLATFORM_SIZE, 4 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);
    createObjects(4 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 5 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 4 * PLATFORM_SIZE, 4 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);

    createObjects(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 6 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, 5 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);
    createObjects(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 10 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);
    createObjects(10 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 10 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);
    createObjects(11 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 11 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 1 * PLATFORM_SIZE, 7 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_LIGHT, "platform", roomArray[0].worldArray[0]);
    createObjects(PLATFORM_SIZE + PLATFORM_SIZE / 2, 4 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 4 * PLATFORM_SIZE, 4 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(4 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 4 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 4 * PLATFORM_SIZE, 4 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 6 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(8 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 11 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(7 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 7 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 2 * PLATFORM_SIZE, 7 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(4 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 7 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 6 * PLATFORM_SIZE, 6 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(10 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 12 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(11 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 11 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 1 * PLATFORM_SIZE, 3 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(11 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 11 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 2 * PLATFORM_SIZE, 9 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(12 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 14 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 9 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObject(14 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 115, 115, QUEST_SPRITE, "quest", roomArray[0].worldArray[1]);
    var anObject = roomArray[0].worldArray[1].objectArray[roomArray[0].worldArray[1].objectArray.length - 1];
    anObject.hide = true;

    // Room 1 second world
    createObjects(PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 9 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObjects(3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 5 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 9 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObject(5 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 125, 125, PORTAL_IMAGE, "tele", roomArray[0].worldArray[1]);
    var thePortal = roomArray[0].worldArray[1].objectArray[roomArray[0].worldArray[1].objectArray.length - 1];
    thePortal.hide = true;
    createObjects(7 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 9 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 9 * PLATFORM_SIZE + 1, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    createObject(7 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 125, 125, PORTAL_IMAGE, "tele", roomArray[0].worldArray[1]);
    var theSecondPortal = roomArray[0].worldArray[1].objectArray[roomArray[0].worldArray[1].objectArray.length - 1];
    theSecondPortal.hide = true;
    linkObject2(thePortal, thePortal.position.x - 150, thePortal.position.y, theSecondPortal, theSecondPortal.position.x + 100, thePortal.position.y);
    createObject(12.0 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 0.73 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 2, 125, 125, SPECIAL_HOLE_2, "hole3", roomArray[0].worldArray[1]);

    // Room 1 Holes
    createObject(1215, 127, 133, 129, LEVEL1_HOLE_LIGHT, "hole", roomArray[0].worldArray[0]);
    createObject(955, 127, 133, 129, LEVEL1_HOLE_LIGHT, "hole", roomArray[0].worldArray[0]);
    createObject(1472, 127, 133, 129, LEVEL1_HOLE_LIGHT, "hole", roomArray[0].worldArray[0]);
    createObject(1472, 260, 133, 130, LEVEL1_HOLE_LIGHT, "hole", roomArray[0].worldArray[0]);
    createObject(1472, 900, 133, 130, LEVEL1_HOLE_LIGHT, "hole", roomArray[0].worldArray[0]);
    createObject(1471, 1024, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);
    createObject(447, 512, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);
    createObject(1216, 128, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);
    createObject(1471, 511, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);
    createObject(1471, 639, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);
    createObject(1471, 768, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);
    createObject(11 * PLATFORM_SIZE + PLATFORM_SIZE / 2 - 1, 2 * PLATFORM_SIZE - 1, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);

    //hole player has to put rock in to activate left hole
    createObject(4 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 3 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, SPECIAL_HOLE_1, "hole4", roomArray[0].worldArray[1]);
    var leObject = roomArray[0].worldArray[1].objectArray[roomArray[0].worldArray[1].objectArray.length - 1];

    // activates:
    createObject(PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 5 * PLATFORM_SIZE, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);
    var hiddenObject = roomArray[0].worldArray[1].objectArray[roomArray[0].worldArray[1].objectArray.length - 1];
    hiddenObject.hide = true;
    insertBack(leObject.objectArray, hiddenObject);
    createObject(PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 6 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL1_TILE_DARK, "platform", roomArray[0].worldArray[1]);
    hiddenObject = roomArray[0].worldArray[1].objectArray[roomArray[0].worldArray[1].objectArray.length - 1];
    hiddenObject.hide = true;
    insertBack(leObject.objectArray, hiddenObject);
    createObject(2 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 143, 143, LEVEL1_HOLE_DARK, "hole", roomArray[0].worldArray[1]);
    hiddenObject = roomArray[0].worldArray[1].objectArray[roomArray[0].worldArray[1].objectArray.length - 1];
    hiddenObject.hide = true;
    insertBack(leObject.objectArray, hiddenObject);
    insertBack(leObject.objectArray, hiddenObject);

    // If player places rock into this hole, activate portal
    createObject(4 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 9 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, SPECIAL_HOLE_1, "hole4", roomArray[0].worldArray[1]);
    leObject = roomArray[0].worldArray[1].objectArray[roomArray[0].worldArray[1].objectArray.length - 1];
    insertBack(leObject.objectArray, thePortal);
    insertBack(leObject.objectArray, theSecondPortal);

    createObject(PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 100, 100, STAR_IMAGE, "star", roomArray[0].worldArray[0]);

    createObject(9 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 9 * PLATFORM_SIZE, 100, 100, STAR_IMAGE, "star", roomArray[0].worldArray[1]);
    createObject(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE, 100, 100, STAR_IMAGE, "star", roomArray[0].worldArray[1]);

    ///////////////////////////////////LEVEL 2////////////////////////////////////////////////////////////////

    // Level 2 first world
    createObjects(12.5 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 15.5 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 4 * PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_LIGHT, "platform", roomArray[1].worldArray[0]);
    createObjects(12.5 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 15.5 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 5 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_LIGHT, "platform", roomArray[1].worldArray[0]);
    createObjects(10 * PLATFORM_SIZE, 14 * PLATFORM_SIZE, 7.5 * PLATFORM_SIZE, 8.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_LIGHT, "platform", roomArray[1].worldArray[0]);
    createObjects(2 * PLATFORM_SIZE, 2 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 8 * PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_LIGHT, "platform", roomArray[1].worldArray[0]);
    createObjects(PLATFORM_SIZE, 3 * PLATFORM_SIZE, 0.5 * PLATFORM_SIZE, 5.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_LIGHT, "platform", roomArray[1].worldArray[0]);
    createObjects(3.5 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 6 * PLATFORM_SIZE, 3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 4 * PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_LIGHT, "platform", roomArray[1].worldArray[0]);
    createObjects(10 * PLATFORM_SIZE, 11 * PLATFORM_SIZE, 3.5 * PLATFORM_SIZE, 6.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_LIGHT, "platform", roomArray[1].worldArray[0]);
    createObjects(7 * PLATFORM_SIZE, 8 * PLATFORM_SIZE, 4.5 * PLATFORM_SIZE, 5.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_LIGHT, "platform", roomArray[1].worldArray[0]);
   
    // Level 2 second world
    createObjects(11 * PLATFORM_SIZE, 13 * PLATFORM_SIZE, 9 * PLATFORM_SIZE, 10 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_DARK, "platform", roomArray[1].worldArray[1]);
    createObjects(4 * PLATFORM_SIZE, 15 * PLATFORM_SIZE, 1.5 * PLATFORM_SIZE, 2.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_DARK, "platform", roomArray[1].worldArray[1]);
    createObjects(4 * PLATFORM_SIZE, 5 * PLATFORM_SIZE, 8.5 * PLATFORM_SIZE, 10.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_DARK, "platform", roomArray[1].worldArray[1]);

    createObject(13 * PLATFORM_SIZE, 4.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, SPECIAL_HOLE_1, "hole5", roomArray[1].worldArray[0]);
    var objet1 = roomArray[1].worldArray[0].objectArray[roomArray[1].worldArray[0].objectArray.length - 1];
    createObject(12 * PLATFORM_SIZE, 4.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, SPECIAL_HOLE_1, "hole5", roomArray[1].worldArray[0]);
    var objet2 = roomArray[1].worldArray[0].objectArray[roomArray[1].worldArray[0].objectArray.length - 1];
    createObject(11 * PLATFORM_SIZE, 4.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, SPECIAL_HOLE_1, "hole5", roomArray[1].worldArray[0]);
    var objet3 = roomArray[1].worldArray[0].objectArray[roomArray[1].worldArray[0].objectArray.length - 1];
    createAndMarkObjects(8 * PLATFORM_SIZE, 10 * PLATFORM_SIZE, 3.5 * PLATFORM_SIZE, 6.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_DARK, "platform", roomArray[1].worldArray[1], objet1, objet2, objet3);
    createAndMarkObjects(4 * PLATFORM_SIZE, 10 * PLATFORM_SIZE, 5.5 * PLATFORM_SIZE, 6.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_TILE_DARK, "platform", roomArray[1].worldArray[1], objet1, objet2, objet3);

    //Create Objects, portals, and holes for level2
    createObject(2 * PLATFORM_SIZE, 5.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_LIGHT, "hole", roomArray[1].worldArray[0]);
    createObject(13 * PLATFORM_SIZE, 6.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_LIGHT, "hole", roomArray[1].worldArray[0]);

    createObject(13 * PLATFORM_SIZE, 2.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_LIGHT, "hole", roomArray[1].worldArray[0]);
    createObject(12 * PLATFORM_SIZE, 5.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_LIGHT, "hole", roomArray[1].worldArray[0]);
    createObject(10 * PLATFORM_SIZE, 4.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_DARK, "hole", roomArray[1].worldArray[1]);
    createObject(12 * PLATFORM_SIZE, 8 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_DARK, "hole", roomArray[1].worldArray[1]);

    createObject(3 * PLATFORM_SIZE, 3.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_LIGHT, "hole", roomArray[1].worldArray[0]);
    createObject(4 * PLATFORM_SIZE, 6.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_DARK, "hole", roomArray[1].worldArray[1]);
    createObject(4 * PLATFORM_SIZE, 7.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL2_HOLE_DARK, "hole", roomArray[1].worldArray[1]);
    createObject(4 * PLATFORM_SIZE, 9.5 * PLATFORM_SIZE, PLATFORM_SIZE, PLATFORM_SIZE, QUEST_SPRITE, "quest", roomArray[1].worldArray[1]);
    objet1 = roomArray[1].worldArray[1].objectArray[roomArray[1].worldArray[1].objectArray.length - 1];
    objet1.hide = true;
    createObject(2 * PLATFORM_SIZE, 7.5 * PLATFORM_SIZE, 115, 115, PORTAL_IMAGE, "tele", roomArray[1].worldArray[0]);
    thePortal = roomArray[1].worldArray[0].objectArray[roomArray[1].worldArray[0].objectArray.length - 1];
    createObject(10 * PLATFORM_SIZE, 7.5 * PLATFORM_SIZE, 115, 115, PORTAL_IMAGE, "tele", roomArray[1].worldArray[0]);
    theSecondPortal = roomArray[1].worldArray[0].objectArray[roomArray[1].worldArray[0].objectArray.length - 1];
    linkObject2(thePortal, thePortal.position.x, thePortal.position.y - 150, theSecondPortal, theSecondPortal.position.x + 150, thePortal.position.y);
    createObject(7 * PLATFORM_SIZE, 4.5 * PLATFORM_SIZE, 115, 115, SPECIAL_HOLE_2, "hole3", roomArray[1].worldArray[0]);
    createObject(PLATFORM_SIZE + PLATFORM_SIZE / 2, PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 100, 100, STAR_IMAGE, "star", roomArray[1].worldArray[0]);
    createObject(5 * PLATFORM_SIZE, 5.5 * PLATFORM_SIZE, 100, 100, STAR_IMAGE, "star", roomArray[1].worldArray[1]);
    createObject(4 * PLATFORM_SIZE, 1 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 100, 100, STAR_IMAGE, "star", roomArray[1].worldArray[1]);
    createObject(14.2 * PLATFORM_SIZE, 3 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 100, 100, STAR_IMAGE, "star", roomArray[1].worldArray[0]);
    createObject(11 * PLATFORM_SIZE, 9 * PLATFORM_SIZE, 100, 100, STAR_IMAGE, "star", roomArray[1].worldArray[1]);
    createObject(5 * PLATFORM_SIZE, 3.5 * PLATFORM_SIZE, 100, 100, STAR_IMAGE, "star", roomArray[1].worldArray[0]);

    ///////////////////////////////////LEVEL 3////////////////////////////////////////////////////////////////

    // Level 3 first world
    createObjects(PLATFORM_SIZE + PLATFORM_SIZE / 2, 3 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, 4 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_LIGHT, "platform", roomArray[2].worldArray[0]);
    createObjects(3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 5 * PLATFORM_SIZE, 9 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_LIGHT, "platform", roomArray[2].worldArray[0]);
    createObjects(3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 8 * PLATFORM_SIZE, 12 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_LIGHT, "platform", roomArray[2].worldArray[0]);
    createObjects(3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 11 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 4 * PLATFORM_SIZE, 5 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_LIGHT, "platform", roomArray[2].worldArray[0]);
    createObjects(11 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 11 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, PLATFORM_SIZE, 4 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_LIGHT, "platform", roomArray[2].worldArray[0]);
    createObjects(8 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 8 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 6 * PLATFORM_SIZE, 8 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_LIGHT, "platform", roomArray[2].worldArray[0]);
    createObjects(3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 11 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 10 * PLATFORM_SIZE - 100, PLATFORM_SIZE, 85, RIVER_IMAGE, "river1", roomArray[2].worldArray[0]);
    hideObjects("river1", roomArray[2].worldArray[0]);
    createObject(3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3.75 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, LEVEL3_HOLE_LIGHT, "hole", roomArray[2].worldArray[0]);
    createObject(4 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3.75 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, LEVEL3_HOLE_LIGHT, "hole", roomArray[2].worldArray[0]);
    createObject(8 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3.75 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, LEVEL3_HOLE_LIGHT, "hole", roomArray[2].worldArray[0]);
    createObject(8 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 4.75 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, LEVEL3_HOLE_LIGHT, "hole", roomArray[2].worldArray[0]);
    createObject(9 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3.75 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, LEVEL3_HOLE_LIGHT, "hole", roomArray[2].worldArray[0]);
    createObject(10 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3.75 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, LEVEL3_HOLE_LIGHT, "hole", roomArray[2].worldArray[0]);
    createObject(2 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 2 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 100, 100, STAR_IMAGE, "star", roomArray[2].worldArray[0]);
    createObject(11 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 2 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, QUEST_SPRITE, "quest", roomArray[2].worldArray[0]);
    createObject(7 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3.7 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 100, 100, STAR_IMAGE, "star", roomArray[2].worldArray[0]);
    hideObjects("quest", roomArray[2].worldArray[0]);

    // Level 3 second world
    createObjects(1 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 3 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 6 * PLATFORM_SIZE, 7 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_DARK, "platform", roomArray[2].worldArray[1]);
    createObjects(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 6 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 5 * PLATFORM_SIZE, 7 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_DARK, "platform", roomArray[2].worldArray[1]);
    createObjects(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 9 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 6 * PLATFORM_SIZE, 7 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_DARK, "platform", roomArray[2].worldArray[1]);
    createObjects(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 6 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 8 * PLATFORM_SIZE, 10 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_DARK, "platform", roomArray[2].worldArray[1]);
    createObjects(8 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 12 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 9 * PLATFORM_SIZE, 10 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_DARK, "platform", roomArray[2].worldArray[1]);
    createObjects(10 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 10 * PLATFORM_SIZE + PLATFORM_SIZE / 2 + 1, 5 * PLATFORM_SIZE, 9 * PLATFORM_SIZE - 100, PLATFORM_SIZE, PLATFORM_SIZE, LEVEL3_TILE_DARK, "platform", roomArray[2].worldArray[1]);
    createObject(9 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 5.74 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, LEVEL3_HOLE_DARK, "hole", roomArray[2].worldArray[1]);
    createObject(10 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 7.77 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, LEVEL3_HOLE_DARK, "hole", roomArray[2].worldArray[1]);
    createObject(10 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 4.7 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, SPECIAL_HOLE_2, "hole3", roomArray[2].worldArray[1]);
    createObject(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 7.7 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, SPECIAL_HOLE_2, "hole3", roomArray[2].worldArray[1]);
    createObject(3 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 6.7 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 125, 125, SPECIAL_HOLE_1, "hole2", roomArray[2].worldArray[1]);
    createObject(PLATFORM_SIZE + PLATFORM_SIZE / 2, 5.7 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 100, 100, STAR_IMAGE, "star", roomArray[2].worldArray[1]);
    createObject(6 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 4.7 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 100, 100, STAR_IMAGE, "star", roomArray[2].worldArray[1]);
    createObject(12 * PLATFORM_SIZE + PLATFORM_SIZE / 2, 8.7 * PLATFORM_SIZE + PLATFORM_SIZE / 4 + 1, 100, 100, STAR_IMAGE, "star", roomArray[2].worldArray[1]);

}

// When a key is pushed
function onKeyStart(key) {
    processDPadKey(key, true);
    var now = currentTime();
        if (!winGame&&(key == asciiCode("J")) && !isChanging &&
            (now - player.lastSwitchTime > 0.3)) {
            var object;
            var t = 0;
            isChanging = true;
        } else if (!winGame&&(key == asciiCode("U")) &&
            (now - player.lastPickUpTime > 0.2)) {
            if (!player.isPickingUp) {
                for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
                    var object = currentRoom.currentWorld.objectArray[n];
                    if (overlaps(player.position.x, player.position.y, player.tileSize + 100, player.tileSize + 100, object)) {
                        if (object.objectString == "star" || ((object.objectString == "hole" || object.objectString == "hole2" || object.objectString == "hole3" || object.objectString == "hole4" || object.objectString == "hole5") && object.interactHole)) {
                            if (!player.isPickingUp) {
                                playerInteractObject(object);
                            }
                        } else {
                            if (!object.interactHole) {
                                playerInteractObject(object);
                            }
                        }
                    }

                }
            } else if (player.isPickingUp) {
                var nearTele = false;
                var objet;
                var objet2;
                for (z = 0; z < currentRoom.currentWorld.objectArray.length; z++) {
                    objet = currentRoom.currentWorld.objectArray[z];
                    if (objet.objectString == "tele" && overlaps(player.position.x, player.position.y, player.tileSize + 100, player.tileSize + 100, objet)) {
                        nearTele = true;
                        objet2 = objet;
                    }

                }
                if (!nearTele) {
                    playerDropObject();
                } else {
                    playerInteractObject(objet2);
                }
            }
        } else if ((key == asciiCode("R")) &&
        (now - player.lastSwitchTime > 3)) {
            for (p = 0; p < roomArray.length; p++) {
                var room = roomArray[p];
                room.worldArray[0].objectArray.length = 0;
                room.worldArray[1].objectArray.length = 0;
                room.activateNum = 0;
                room.questNum = 0;
            }
            startGame();
            player.position.x = 2 * PLATFORM_SIZE;
            player.position.y = PLATFORM_SIZE;
            currentRoom.currentWorld = currentRoom.worldArray[0];
            player.isPickingUp = false;
            player.pickedUpObject = null;
            winGame = false;
            dpad.lt = false;
            dpad.up = false;
            dpad.dn = false;
            dpad.rt = false;
    } else if ((key == asciiCode(" ")) && !hasGameStarted){
        hasGameStarted = true;
    }

}


function onKeyEnd(key) {
    processDPadKey(key, false);
}


// Called 30 times or more per second
function onTick() {
    var time = 1.0 / 30.0;
    playMusic();

    if (hasGameStarted){
            if (isChanging) {
        changeWorld();
    }
    player.hide = false;
    if (currentRoom == roomArray[0] && currentRoom.currentWorld == currentRoom.worldArray[0]) {

        drawImage(LEVEL1_BG_LIGHT, 0, 0, 1920, 1280);
    } else if (currentRoom == roomArray[0] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
        drawImage(LEVEL1_BG_DARK, 4, 0, 1920, 1280);
    } else if (currentRoom == roomArray[1] && currentRoom.currentWorld == currentRoom.worldArray[0]) {
        drawImage(LEVEL2_BG_LIGHT, 0, 0);
        drawImage(LEVEL2_BG_LIGHT, 5.5, 0, 1920 * 0.998, 1280 * 0.987);
    } else if (currentRoom == roomArray[1] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
        drawImage(LEVEL2_BG_DARK, 0, 0);
    } else if (currentRoom == roomArray[2] && currentRoom.currentWorld == currentRoom.worldArray[0]) {
        drawImage(LEVEL3_BG_LIGHT, 0, 0);
    } else if (currentRoom == roomArray[2] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
        drawImage(LEVEL3_BG_DARK, 0, 0, 1920, 1280);
        drawImage(LEVEL3_BG_DARK, 2, 0, 1920, 1260);

    }
     moveplayer(time);

    drawScreen();

    if (player.holeIsFilling) {
        changeHole();
    }


    for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
        var object = currentRoom.currentWorld.objectArray[n];
        interactObject(object);
    }
        applyControls();
} else {
    drawGameInstructions();
}



   
}


///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// Draw an object that thas position and image fields.  Note that we
// can apply this to multiple kinds of objects as long as they have
// those properties.
function drawCentered(object) {
    drawImage(object.image,
        object.position.x - object.width / 2,
        object.position.y - object.height / 2, object.width, object.height);
}

function createWorld(room) {
    var world = {
        objectArray: [],
    };
    insertBack(room.worldArray, world);
}

function createRoom() {
    var room = {
        worldArray: [],
        currentWorld: {},
        questNum: 0,
        activateNum: 0
    };
    insertBack(roomArray, room);
}

function createDPad() {
    // Create the directional pad.  Note that images might not have
    // loaded yet, so we can't refer to their width and height.
    var w = 400;
    var h = 400;

    // Radius of a button
    var r = 200;

    dpad = makeObject();

    dpad.image = loadImage("");

    dpad.position = makeObject();
    dpad.position.x = screenWidth / 2 + 400;
    dpad.position.y = screenHeight / 2 - 700;

    dpad.up = false;
    dpad.dn = false;
    dpad.lt = false;
    dpad.rt = false;

    // Top row
    setTouchKeyCircle(asciiCode("W"),
        dpad.position.x,
        dpad.position.y - h / 2, r);

    // Bottom row
    setTouchKeyCircle(asciiCode("S"),
        dpad.position.x,
        dpad.position.y + h / 2, r);

    // Left column
    setTouchKeyCircle(asciiCode("A"),
        dpad.position.x - w / 2,
        dpad.position.y, r);

    // Right column
    setTouchKeyCircle(asciiCode("D"),
        dpad.position.x + w / 2,
        dpad.position.y, r);
}


// Handles the keys for the directional pad.  Called from onKeyStart
// and onKeyEnd.
function processDPadKey(key, value) {
        if (key == asciiCode("W")) {
            dpad.up = value;
        } else if (key == asciiCode("S")) {
            dpad.dn = value;
        } else if (key == asciiCode("A")) {
            dpad.lt = value;
        } else if (key == asciiCode("D")) {
            dpad.rt = value;
        }
}

// Compute velocity based on the controls
function applyControls() {
    var SPEED = 300; // Pixels/second
    var lastAction = player.action;
    var angle;

    player.action = IDLE;

    if (dpad.rt && !dpad.up && !dpad.lt && !dpad.dn) {
        if (player.direction != EAST) {
            player.animationTime = 0;
        }
        player.direction = EAST;
        player.action = WALK;


    } else if (!dpad.rt && dpad.up && !dpad.lt && !dpad.dn) {
        if (player.direction != NORTH) {
            player.animationTime = 0;
        }
        player.direction = NORTH;
        player.action = WALK;
    } else if (!dpad.rt && !dpad.up && dpad.lt && !dpad.dn) {
        if (player.direction != WEST) {
            player.animationTime = 0;
        }
        player.direction = WEST;
        player.action = WALK;
    } else if (!dpad.rt && !dpad.up && !dpad.lt && dpad.dn) {
        if (player.direction != SOUTH) {
            player.animationTime = 0;
        }
        player.direction = SOUTH;
        player.action = WALK;
    }

    if (player.action == WALK) {
        // Turn 90 degrees per direction
        angle = player.direction * PI / 2;

        // We have to round off in case small errors give a value
        // slightly different from 0, 1, or -1.
        player.velocity.x = round(cos(angle)) * SPEED;
        player.velocity.y = round(-sin(angle)) * SPEED;
    } else {
        player.velocity.x = 0;
        player.velocity.y = 0;
    }

    if (lastAction != player.action) {
        // Reset the animation frame and timer
        player.animationTime = 0;
        player.animationFrame = 0;
    }
}


function moveplayer(time) {

    var nextPosX = player.position.x + player.velocity.x * time;
    var nextPosY = player.position.y + player.velocity.y * time;

    var overlap = true;
    offPlatform = true;
    for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
        var object = currentRoom.currentWorld.objectArray[n];
        if (overlaps(nextPosX, nextPosY, player.tileSize / 2.5, player.tileSize / 2.7, object) && object != player.pickedUpObject && !object.hide) {
            overlap = false;
            offPlatform = false;
        }
        if (overlaps(nextPosX, nextPosY, player.tileSize, player.tileSize, object) && object != player.pickedUpObject && !object.hide) {
            offPlatform = false;
        }
        if (object.objectString == "star" && !object.interactHole && !object.hide && object != player.pickedUpObject) {
            if (overlaps(nextPosX, nextPosY, player.tileSize / 3, player.tileSize / 3, object)) {
                overlap = true;
                offPlatform = false;
            }

        }
        if ((object.objectString == "hole" || object.objectString == "hole2" || object.objectString == "hole3" || object.objectString == "hole4" || object.objectString == "hole5") && !object.interactHole && !object.hide) {
            if (overlaps(nextPosX, nextPosY, player.tileSize / 2.4, player.tileSize / 2.4, object)) {
                overlap = true;
                offPlatform = false;
            }


        }
    }
    if (!overlap) {
        if (player.isPickingUp) {
            player.pickedUpObject.position.x = nextPosX - 5;
            player.pickedUpObject.position.y = nextPosY - 25;
        }
        player.position.x = nextPosX;
        player.position.y = nextPosY;
    }
    // Keep it in the legal region
    player.position.x = min(max(63, player.position.x), screenWidth - 63);
    player.position.y = min(max(63, player.position.y), 1280 - 63);
}


function drawScreen() {
    for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
        var object = currentRoom.currentWorld.objectArray[n];
        if (!object.hide && object.objectString != "quest") {
            if (object.objectString == "star") {
                if (player.isPickingUp) {
                    if (player.pickedUpObject != object) {
                        drawImage(STAR_SHADOW, object.position.x - object.width, object.position.y - object.height);
                    }
                } else {

                    drawImage(STAR_SHADOW, object.position.x - object.width, object.position.y - object.height);

                }
            }
            drawCentered(object);
        }
    }
if (winGame){
      var context = canvas.getContext("2d");
                          context.globalAlpha = 1 - opacity;
      opacity = opacity - 0.02
                    drawImage(BLACK_BG,0,0, 1920, 1280);
                    fillText("As from a star I saw", 350, 300,  makeColor(1,1,1,1), 
                             "italic 80px Cambria", 
                             "start");
                    fillText("coldly and soberly, the", 350, 450,  makeColor(1,1,1,1), 
                             "italic 80px Cambria", 
                             "start");
                    fillText("the separateness of everything.", 350, 600,  makeColor(1,1,1,1), 
                             "italic 80px Cambria", 
                             "start");
                                        fillText("My beautiful fusion with", 350, 750,  makeColor(1,1,1,1), 
                             "italic 80px Cambria", 
                             "start");
                                        fillText("the things of this world", 350, 900,  makeColor(1,1,1,1), 
                             "italic 80px Cambria", 
                             "start");
                             fillText("was over.", 350, 1050,  makeColor(1,1,1,1), 
                             "italic 80px Cambria", 
                             "start");
                                                          fillText(" - Sylvia Plath", 350, 1150,  makeColor(1,1,1,1), 
                             "italic 60px Cambria", 
                             "start");
                    context.globalAlpha = 1;
      
                }
                    changeQuestItems();
                    if (!player.hide){
        drawCharacter(player);
    }

    for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
        var object = currentRoom.currentWorld.objectArray[n];
        if (!object.hide && object.objectString == "star" && player.isPickingUp && player.pickedUpObject == object && player.direction != NORTH) {
            drawCentered(object);
        }
    }
    drawCentered(dpad);

    if (player.isDead) {
        drawImage(LOSE_IMAGE, 0, 0, screenWidth, screenHeight);
    }
    //drawStatus();
}


function drawCharacter(character) {
    // The width and height of each frame of animation.  This number
    // is chosen for the specific myplayer.png image.
    var S = character.tileSize - 20;
    var x;
    var y;
    var now = currentTime();
    if (now - player.animationTime > 0.1) {
        if (player.direction == NORTH) {

            if (player.animationFrameX == 4 && player.action != IDLE) {
                player.animationFrameX = 2;
                player.animationFrameY = 1;
            } else {
                player.animationFrameX = 4;
                player.animationFrameY = 0;
            }
        } else if (player.direction == WEST) {

            if (player.animationFrameX == 3 && player.animationFrameY == 0 && player.action != IDLE) {
                player.animationFrameX = 2;
                player.animationFrameY = 0;
            } else {
                player.animationFrameX = 3;
                player.animationFrameY = 0;
            }
        } else if (player.direction == EAST) {

            if (player.animationFrameX == 0 && player.animationFrameY == 1 && player.action != IDLE) {
                player.animationFrameX = 1;
                player.animationFrameY = 1;
            } else {
                player.animationFrameX = 0;
                player.animationFrameY = 1;
            }
        } else if (player.direction == SOUTH) {


            if (player.animationFrameX == 1 && player.animationFrameY == 0 && player.action != IDLE) {
                player.animationFrameX = 0;
                player.animationFrameY = 0;
            } else {
                player.animationFrameX = 1;
                player.animationFrameY = 0;
            }
        }
        player.animationTime = now;
    }
    // These equations are specific to myplayer.png
    x = 40 + 400 * character.animationFrameX;
    y = 67 + 933 * character.animationFrameY;
    var context = canvas.getContext("2d");
    if (!player.winLevel) {

        context.globalAlpha = 1;
    } else {
        context.globalAlpha = player.opacity;
    }

    drawImage(SHADOW_IMAGE,
        character.position.x - SHADOW_IMAGE.width / 2,
        character.position.y - SHADOW_IMAGE.height / 1.5 + 2);
    if (offPlatform) {

        drawImage(STAR_SPRITE, player.position.x - 15 - player.tileSize / 4, player.position.y - 17.5 - player.tileSize / 4, 180, 195, 270, 30, 180, 196);
    }
    drawImage(character.spriteSheet,
        character.position.x - S / 5.5,
        character.position.y - S / 1.7,
        S / 3, S / 1.5, x, y, 400, 833);
    context.globalAlpha = 1;

}

function createplayer() {
    player = makeObject();

    player.position = makeObject();
    player.position.x = 2 * PLATFORM_SIZE;
    player.position.y = PLATFORM_SIZE;
    player.velocity = makeObject();
    player.velocity.x = 0;
    player.velocity.y = 0;

    player.lastSwitchTime = 0;

    player.action = WALK;
    player.direction = EAST;

    // Integer frame of animation 
    player.animationFrameX = 0;
    player.animationFrameY = 0;

    // Time since the previous frame of animation
    player.animationTime = 0;

    player.spriteSheet = loadImage("playerSheet3.png");
    player.tileSize = 252; // pixels
    player.lastPickUpTime = 0;

    player.isPickingUp = false;

    player.pickedUpObject = null;
    player.holeIsFilling = false;
    player.winLevel = false;
    player.opacity = 1;
    player.hide = false;
}

function overlaps(x, y, width, height, object) {
    return (
        // Left edge of object
        (((x + width / 4) > (object.position.x - object.width / 3)) &&

            // Right edge of object
            ((x - width / 4) < (object.position.x + object.width / 3)) &&

            // Top edge of object
            ((y + height / 4) > (object.position.y - object.height / 3)) &&

            // Bottom edge of object
            (y - height / 4) < (object.position.y + object.height / 3))
    )
}

function createObject(x, y, width, height, image, objectString, world) {
    var object = {
        image: image,
        position: {
            x: x,
            y: y
        },
        width: width,
        height: height,
        objectString: objectString,
        telePoint: null,
        interactHole: false,
        hide: false,
        objectArray: [],
        opacity: 1,
        aniFrameX: 0,
        aniFrameY: 0,
        questComplete: false
    };


    insertBack(world.objectArray, object);
}

function linkObject(object, anotherObject) {
    object.telePoint = anotherObject;
    anotherObject.telePoint = object;
}

function linkObject2(object, x1, y1, anotherObject, x2, y2) {
    object.telePoint = anotherObject;
    anotherObject.telePoint = object;
    object.teleX = x1;
    object.teleY = y1;
    anotherObject.teleX = x2;
    anotherObject.teleY = y2;
}

function interactObject(object) {

    if (object.objectString == "river1" && object.hide == false) {
        if (overlaps(player.position.x, player.position.y, player.tileSize / 3, player.tileSize / 3, object)) {
            player.position.x = player.position.x + 10;
            player.position.y = player.position.y;
        }
    }
}

function createObjects(width1, width2, height1, height2, objectWidth, objectHeight, image, objectString, world) {
    for (y = height1; y < height2; y = y + PLATFORM_SIZE) {
        for (x = width1; x < width2; x = x + PLATFORM_SIZE) {
            createObject(x, y, objectWidth, objectHeight, image, objectString, world);
        }
    }
}

function createAndMarkObjects(width1, width2, height1, height2, objectWidth, objectHeight, image, objectString, world, otherObject, otherObject2, otherObject3) {
    for (y = height1; y < height2; y = y + PLATFORM_SIZE) {
        for (x = width1; x < width2; x = x + PLATFORM_SIZE) {
            createObject(x, y, objectWidth, objectHeight, image, objectString, world);
            otherObject.objectArray, world.objectArray[world.objectArray.length - 1].hide = true;
            insertBack(otherObject.objectArray, world.objectArray[world.objectArray.length - 1]);
            insertBack(otherObject2.objectArray, world.objectArray[world.objectArray.length - 1]);
            insertBack(otherObject3.objectArray, world.objectArray[world.objectArray.length - 1]);
        }
    }
}

function playerInteractObject(object) {
    var doThing = false;
    width = player.tileSize;
    height = player.tileSize;
    x = player.position.x;
    y = player.position.y;
    if (player.direction == WEST) {
        doThing = (((x - width / 4) < (object.position.x + object.width / 2)) &&
            ((x + width / 4) > (object.position.x + object.width / 2)) &&
            // Top edge of object
            ((y + height / 15) < (object.position.y + object.height / 2)) &&

            // Bottom edge of object
            ((y - height / 15) > (object.position.y - object.height / 2)));
    } else if (player.direction == EAST) {
        doThing = (((x + width / 4) > (object.position.x - object.width / 2)) &&
            ((x - width / 4) < (object.position.x - object.width / 2)) &&
            // Top edge of object
            ((y + height / 15) < (object.position.y + object.height / 2)) &&

            // Bottom edge of object
            ((y - height / 15) > (object.position.y - object.height / 2)));
    } else if (player.direction == NORTH) {
        // Left edge of object
        doThing = (((x + width / 15) < (object.position.x + object.width / 2)) &&

            // Right edge of object
            ((x - width / 15) > (object.position.x - object.width / 2)) &&

            // Bottom edge of object
            ((y - height / 4) > (object.position.y - object.height / 2)) && ((y + height / 4) > (object.position.y - object.height / 2)));
    } else if (player.direction == SOUTH) {
        // Left edge of object
        doThing = (((x + width / 15) < (object.position.x + object.width / 2)) &&

            // Right edge of object
            ((x - width / 15) > (object.position.x - object.width / 2)) &&

            // Top edge of object
            ((y + height / 4) < (object.position.y + object.height / 2)) && ((y - height / 4) < (object.position.y + object.height / 2)));
    }

    if (doThing) {
        if (object.objectString == "star") {
            if (object.hide == false) {
                pickUpObject(object);
            }
        } else if ((object.objectString == "hole" || object.objectString == "hole2" || object.objectString == "hole3" || object.objectString == "hole4" || object.objectString == "hole5") && object.interactHole) {
            var pickObject = object.telePoint;
            if (!overlaps(x, y, player.tileSize / 3.2, player.tileSize / 3.2, object)) {
                pickUpObject(pickObject);
            }
        } else if (object.objectString == "quest" && !object.hide && !object.questComplete) {
            object.questComplete = true;
            player.winLevel = true;
        }
    }
    if (object.objectString == "tele" && !object.hide) {

        if (overlaps(x, y, player.tileSize / 15, player.tileSize / 15, object)) {
            player.holeIsFilling = true;
            fillingHole = player;
            player.position.x = object.telePoint.teleX;
            player.position.y = object.telePoint.teleY;
            if (player.isPickingUp) {
                player.pickedUpObject.position.x = object.telePoint.teleX;
                player.pickedUpObject.position.y = object.telePoint.teleY;
            }
        }
    }
}

function pickUpObject(object) {
    player.isPickingUp = true;
    player.pickedUpObject = object;
    object.position.x = player.position.x - 7;
    object.position.y = player.position.y - 25;
    if (object.interactHole) {
        object.interactHole = false;
        object.telePoint.interactHole = false;
        object.hide = false;
        if (object.telePoint.objectString == "hole") {
            if (currentRoom == roomArray[0] && currentRoom.currentWorld == currentRoom.worldArray[0]) {
                object.telePoint.image = LEVEL1_HOLE_LIGHT;
            } else if (currentRoom == roomArray[0] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
                object.telePoint.image = LEVEL1_HOLE_DARK;
            } else if (currentRoom == roomArray[1] && currentRoom.currentWorld == currentRoom.worldArray[0]) {
                object.telePoint.image = LEVEL2_HOLE_LIGHT;
            } else if (currentRoom == roomArray[1] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
                object.telePoint.image = LEVEL2_HOLE_DARK;
            } else if (currentRoom == roomArray[2] && currentRoom.currentWorld == currentRoom.worldArray[0]) {
                object.telePoint.image = LEVEL3_HOLE_LIGHT;
            } else if (currentRoom == roomArray[2] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
                object.telePoint.image = LEVEL3_HOLE_DARK;
            }
        } else if (object.telePoint.objectString == "hole2") {
            hideObjects("river1", roomArray[2].worldArray[0]);
            object.telePoint.image = SPECIAL_HOLE_1;
        } else if (object.telePoint.objectString == "hole3") {
            currentRoom.questNum = currentRoom.questNum - 1;
            object.telePoint.image = SPECIAL_HOLE_2;
            if (currentRoom == roomArray[2]) {
                if (currentRoom.questNum < 2) {
                    hideObjects("quest", currentRoom.worldArray[0]);
                }
            } else if (currentRoom == roomArray[0]) {
                if (currentRoom.questNum < 1) {
                    hideObjects("quest", currentRoom.worldArray[1]);
                }
            } else if (currentRoom == roomArray[1]) {
                object.telePoint.image = KEY_IMAGE;
                if (currentRoom.questNum < 1) {
                    hideObjects("quest", currentRoom.worldArray[1]);
                }
            }
        } else if (object.telePoint.objectString == "hole4") {
            for (q = 0; q < object.telePoint.objectArray.length; q++) {
                var hideObject = object.telePoint.objectArray[q];
                hideObject.hide = true;
            }
            object.telePoint.image = SPECIAL_HOLE_1;
        } else if (object.telePoint.objectString == "hole5") {
            currentRoom.activateNum = currentRoom.activateNum - 1;
            object.telePoint.image = SPECIAL_HOLE_1;
            if (currentRoom == roomArray[1] && currentRoom.activateNum < 3) {
                for (q = 0; q < object.telePoint.objectArray.length; q++) {
                    var hideObject = object.telePoint.objectArray[q];
                    hideObject.hide = true;
                }
            }
        }

    }
}

function playerDropObject() {
    dropObject = player.pickedUpObject;
    var dropObjectPosX;
    var dropObjectPosY;
    if (player.direction == WEST) {
        dropObjectPosX = player.position.x - 100;
        dropObjectPosY = player.position.y;
    } else if (player.direction == EAST) {
        dropObjectPosX = player.position.x + 100;
        dropObjectPosY = player.position.y;
    } else if (player.direction == NORTH) {
        dropObjectPosX = player.position.x;
        dropObjectPosY = player.position.y - 100;
    } else if (player.direction == SOUTH) {
        dropObjectPosX = player.position.x;
        dropObjectPosY = player.position.y + 75;
    }

    var floorIsEmpty = false;
    var holeInserted = false;
    for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
        var object = currentRoom.currentWorld.objectArray[n];
        if (overlaps(dropObjectPosX, dropObjectPosY, dropObject.width, dropObject.height, object) && object != player.pickedUpObject && !object.hide) {
            floorIsEmpty = true;
        }


        if (overlaps(dropObjectPosX, dropObjectPosY, dropObject.width, dropObject.height, object) && object != dropObject && object.objectString != "platform") {
            floorIsEmpty = false;
            if ((object.objectString == "hole" || object.objectString == "hole2" || object.objectString == "hole3" || object.objectString == "hole4" || object.objectString == "hole5") && !object.interactHole && !object.hide && !holeInserted) {
                holeInserted = true;
                player.holeIsFilling = true;
                fillingHole = object;
                dropObject.hide = true;
                object.interactHole = true;
                dropObject.interactHole = true;
                linkObject(object, dropObject);
                floorIsEmpty = true;
                player.holeIsFilling = true;
            }
        }

    }
    if (dropObjectPosX <= screenWidth - 63 && dropObjectPosX >= 63 && dropObjectPosY <= 1280 - 63 && dropObjectPosY >= 63) {
        if (floorIsEmpty) {
            dropObject.position.x = dropObjectPosX;
            dropObject.position.y = dropObjectPosY;
            player.pickedUpObject = null;
            player.isPickingUp = false;
        } else if (dropObject != null && dropObject.interactHole) {
            dropObject.position.x = dropObjectPosX;
            dropObject.position.y = dropObjectPosY;
            player.pickedUpObject = null;
            player.isPickingUp = false;
        }
    }
}


function hideObjects(String, array) {
    for (n = 0; n < array.objectArray.length; n++) {
        var object = array.objectArray[n];
        if (object.objectString == String) {
            object.hide = true;
        }
    }

}

function showObjects(String, array) {
    for (n = 0; n < array.objectArray.length; n++) {
        var object = array.objectArray[n];
        if (object.objectString == String) {
            object.hide = false;
        }
    }

}

function changeHole() {
    var now = currentTime();
    if (player.holeIsFilling && now - lastFillTime > 0.001) {
        if (now - lastChangeFillTime > 0.01) {
            changeNum = changeNum + 1;
            lastChangeFillTime = now;
        }
        var height = 0;
        var width = 0;
        if (fillingHole == player) {
            height = player.tileSize;
            width = player.tileSize - 96;
        } else {
            height = fillingHole.height;
            width = fillingHole.width;
        }
        if (changeNum == 1) {
            drawImage(STAR_SPRITE, fillingHole.position.x - width / 4, fillingHole.position.y - height / 4, 55, 70, 16, 40, 55, 70);
        } else if (changeNum == 2) {
            drawImage(STAR_SPRITE, fillingHole.position.x - 32 - width / 4, fillingHole.position.y - 37.5 - height / 4, 120, 150, 280, 40, 120, 150);
        } else if (changeNum >= 3) {
            var context = canvas.getContext("2d");
            //      context.globalAlpha = opacity;
            drawImage(STAR_SPRITE, fillingHole.position.x - 52.5 - 36 - width / 4, fillingHole.position.y - 255 / 2.30 - height / 4, 240, 298, 544.5, 20, 240, 298);
            for (n = 0; n < changeNum - 3; n++) {
                drawImage(STAR_SPRITE, fillingHole.position.x - 52.5 - 36 - width / 4, fillingHole.position.y - 255 / 2.30 - height / 4, 240, 298, 544.5, 20, 240, 298);

            }
            //    fillingHole.opacity = fillingHole.opacity - 0.3;
        }

        if (changeNum >= 8) {

            player.holeIsFilling = false;
            changeNum = 0;
            var object = fillingHole;
            if (object.objectString == "hole") {
                if (currentRoom == roomArray[0] && currentRoom.currentWorld == currentRoom.worldArray[0]) {
                    object.image = LEVEL1_HOLE_LIGHT_FILLED;
                } else if (currentRoom == roomArray[0] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
                    object.image = LEVEL1_HOLE_DARK_FILLED;
                } else if (currentRoom == roomArray[1] && currentRoom.currentWorld == currentRoom.worldArray[0]) {
                    object.image = LEVEL2_HOLE_LIGHT_FILLED;
                } else if (currentRoom == roomArray[1] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
                    object.image = LEVEL2_HOLE_DARK_FILLED;
                } else if (currentRoom == roomArray[2] && currentRoom.currentWorld == currentRoom.worldArray[0]) {
                    object.image = LEVEL3_HOLE_LIGHT_FILLED;
                } else if (currentRoom == roomArray[2] && currentRoom.currentWorld == currentRoom.worldArray[1]) {
                    object.image = LEVEL3_HOLE_DARK_FILLED;
                }
            } else if (object.objectString == "hole2") {
                object.image = SPECIAL_HOLE_1_FILLED;
                showObjects("river1", roomArray[2].worldArray[0]);

            } else if (object.objectString == "hole3") {
                object.image = SPECIAL_HOLE_2_FILLED;
                currentRoom.questNum = currentRoom.questNum + 1;
                if (currentRoom == roomArray[2] && currentRoom.questNum == 2) {
                    showObjects("quest", currentRoom.worldArray[0]);
                } else if (currentRoom == roomArray[0] && currentRoom.questNum == 1) {
                    showObjects("quest", currentRoom.worldArray[1]);
                } else if (currentRoom == roomArray[1] && currentRoom.questNum == 1) {
                    showObjects("quest", currentRoom.worldArray[1]);
                }
            } else if (object.objectString == "hole4") {
                for (q = 0; q < object.objectArray.length; q++) {
                    var showObject = object.objectArray[q];
                    showObject.hide = false;
                    object.image = SPECIAL_HOLE_1_FILLED;
                }
            } else if (object.objectString == "hole5") {
                currentRoom.activateNum = currentRoom.activateNum + 1;
                object.image = SPECIAL_HOLE_1_FILLED;
                if (currentRoom == roomArray[1] && currentRoom.activateNum == 3) {
                    for (q = 0; q < object.objectArray.length; q++) {
                        var showObject = object.objectArray[q];
                        showObject.hide = false;

                    }
                }
            }
        }
    }



}

function changeQuestItems() {
    var now = currentTime();
    var object;
    for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
        object = currentRoom.currentWorld.objectArray[n];
        if (object.objectString == "quest" && !object.hide) {
            var context = canvas.getContext("2d");
            if (player.winLevel) {
                object.opacity = object.opacity - 0.02;
                if (object.opacity <= 0.7) {
                    object.opacity = object.opacity - 0.10;
                }
            } else if (object.opacity >= 1) {
                changeDir = -0.02;
                object.opacity = object.opacity + changeDir;
            } else if (object.opacity <= 0.2) {
                changeDir = 0.02;
                object.opacity = object.opacity + changeDir;
            } else {
                object.opacity = object.opacity + changeDir;
            }
            context.globalAlpha = object.opacity;
            drawImage(QUEST_SPRITE, object.position.x - object.width / 2, object.position.y - object.height / 2, 100, 100, 28 + object.aniFrameX * 160, 20 + object.aniFrameY * 160, 125, 125);
            context.globalAlpha = 1;

        }
    }
    if (player.winLevel) {
        player.opacity = player.opacity - 0.02;
        if (player.opacity <= 0.7) {
            player.opacity = player.opacity - 0.20;
        }
        if (player.opacity <= 0.05) {
            player.winLevel = false;
            if (!winGame){
            player.opacity = 1;
        } else {
            player.opacity = 0;
        }
            object.opacity = 1;

            if (player.isPickingUp) {
                player.isPickingUp = false;
                player.pickedUpObject = null;
            }
            if (roomNum == roomArray.length - 1) {
                winGame = true;
                opacity = 1;
            } else {
                roomNum = roomNum + 1
                currentRoom = roomArray[roomNum];
                player.hide = true;
                if (roomNum == 1) {
                    player.position.x = 2 * PLATFORM_SIZE;
                    player.position.y = PLATFORM_SIZE;
                } else if (roomNum == 2) {
                    player.position.x = 2 * PLATFORM_SIZE;
                    player.position.y = PLATFORM_SIZE;
                }
            }
        }
    }
    if (now - lastQuestChangeTime > 1) {
        for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
            var object = currentRoom.currentWorld.objectArray[n];
            if (object.objectString == "quest" && !object.hide) {
                object.aniFrameX = object.aniFrameX + 1;
                if (object.aniFrameX > 5 && object.aniFrameY == 0) {
                    object.aniFrameY = object.aniFrameY + 1;
                    object.aniFrameX = 0;


                } else if (object.aniFrameX > 2 && object.aniFrameY == 1) {
                    object.aniFrameX = 0;
                    object.aniFrameY = 0;
                }


            }

        }
        lastQuestChangeTime = now;
    }
}

function changeWorld() {
    var now = currentTime();
    if ((now - lastChangeTime > 0.00001)) {
        var context = canvas.getContext("2d");
        context.globalAlpha = opacity;
        if (!nextStep && opacity >= 0.6) {
            opacity = opacity - 0.05;
        } else if (!nextStep) {
            opacity = opacity - 0.30;
        }
                        
        if (opacity <= 0.1 && !nextStep) {
            if (opacity <= 0.07) {
                nextStep = true;
                if (player.isPickingUp) {
                    var object;
                    var t = 0;
                    var dropObject = player.pickedUpObject;
                    for (n = 0; n < currentRoom.currentWorld.objectArray.length; n++) {
                        object = currentRoom.currentWorld.objectArray[n];
                        if (object == dropObject) {
                            t = n;
                        }
                    }
                }
                 if (currentRoom.currentWorld == currentRoom.worldArray[0]) {
                    currentRoom.currentWorld = currentRoom.worldArray[1];
                    if (player.isPickingUp) {
                        insertBack(currentRoom.currentWorld.objectArray, dropObject);
                        removeAt(currentRoom.worldArray[0].objectArray, t);
                    }

                } else {
                    currentRoom.currentWorld = currentRoom.worldArray[0];
                    if (player.isPickingUp) {
                        insertBack(currentRoom.currentWorld.objectArray, dropObject);
                        removeAt(currentRoom.worldArray[1].objectArray, t);
                    }
                }
            }
        }
        if (nextStep && opacity <= 1) {
            opacity = opacity + 0.30;
            context.globalAlpha = opacity;
            if (opacity >= 1) {
                opacity = 1;
                context.globalAlpha = opacity;
                isChanging = false;
                nextStep = false;
            }
        }
        lastChangeTime = now;
    }

}

function playMusic(){
    var now = currentTime() + MUSIC_RECHARGE_TIME;
    if (now - music_last_time > MUSIC_RECHARGE_TIME) { // plays the music on a loop
            playSound(MAIN_MUSIC);
            music_last_time = now;
        }
}

function drawGameInstructions(){
        drawImage(loadImage("title.png"), 0, 0);
    drawImage(GAME_INSTRUCTIONS, 60, 20);

}
