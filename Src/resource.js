var dirArt = "Art/";
var dirSounds = "Sounds/";

//image
var s_splashScreen = dirArt + "splash-screen.jpg";
var s_menu = dirArt + "menu.png";
var s_menuTitle = dirArt + "menuTitle.png";
var s_flare = dirArt + "flare.jpg";
var s_player = dirArt + "player.png";
var s_player_spawn = dirArt + "player_spawn.png";
var s_enemy1 = dirArt + "enemy1.png";
var s_enemy2 = dirArt + "enemy2.png";
var s_player_bullet = dirArt + "bullet.png";
var s_enemy_bullet = dirArt + "bullet-enemy.png";


var s_explosion = dirArt + "explosion-particle.png";

//effect
var s_buttonEffect_mp3 = dirSounds + "buttonEffet.mp3";
var s_playerShootEffect = dirSounds + "player-fire.mp3";
var s_enemyDestroyedEffect = dirSounds + "enemy-destroy.mp3";
var s_playerGetsHitEffect = dirSounds + "player-hit.mp3";
var s_enemyShootEffect = dirSounds + "enemy-fire.mp3";
var s_playerFlying = dirSounds + "player-flying.mp3";
var s_wildLaughEffect = dirSounds + "wild-laugh.mp3";
var s_playerLowLifeEffect = dirSounds + "player-Lowlife.mp3";

//music
var s_mainMainMusic = dirSounds + "backgroundMusic.mp3";

//plist
var s_player_plist = dirArt + "player.plist";
var s_player_spawn_plist = dirArt + "player_spawn.plist";

//parallax
var s_backgeound = dirArt + "parallax/common/BG-common.png";
var s_cloud1 = dirArt + "parallax/common/Cloud1-common.png";
var s_cloud2 = dirArt + "parallax/common/Cloud2-common.png";
var s_cloud3 = dirArt + "parallax/common/Cloud3-common.png";
var s_horizon1 = dirArt +"parallax/common/Horizon2-common.png";
var s_horizon2 = dirArt +"parallax/common/Horizon1-common.png";
var s_tree1 = dirArt +"parallax/common/Trees1.png";
var s_tree2 = dirArt +"parallax/common/trees-foreground.png";
var s_iranSky = dirArt + "parallax/iran/Sky-IR.png";
var s_location1Building1 = dirArt + "parallax/iran/building-IR-1.png";
var s_location1Building2 = dirArt + "parallax/iran/building-IR-2.png";
var s_location1Building3 = dirArt + "parallax/iran/building-ir-3.png";
var s_location1Building4 = dirArt + "parallax/iran/building-ir-4.png";
var s_location1Building5 = dirArt + "parallax/iran/building-ir-5.png";
var s_location1Building6 = dirArt + "parallax/iran/building-ir-6.png";
var s_location1Building7 = dirArt + "parallax/iran/building-ir-7.png";
var s_location1Building8 = dirArt + "parallax/iran/building-ir-8.png";
var s_location1Building9 = dirArt + "parallax/iran/building-ir-9.png";
var s_location1Special1 = dirArt + "parallax/iran/Special-Ir-1.png";
var s_kazakhstanSky = dirArt + "parallax/kazakhstan/Sky-KH.png";
var s_location2Building1 = dirArt + "parallax/kazakhstan/Building-KH-1.png";
var s_location2Building2 = dirArt + "parallax/kazakhstan/Building-KH-2.png";
var s_location2Building3 = dirArt + "parallax/kazakhstan/Building-KH-3.png";
var s_location2Building4 = dirArt + "parallax/kazakhstan/Building-KH-4.png";
var s_location2Building5 = dirArt + "parallax/kazakhstan/Building-KH-5.png";
var s_location2Building6 = dirArt + "parallax/kazakhstan/Building-KH-6.png";
var s_location2Special1 = dirArt + "parallax/kazakhstan/Special-Kazakhstan-1.png";
var s_location2Special2 = dirArt + "parallax/kazakhstan/Special-Kazakhstan-2.png";
var s_malaysiaSky = dirArt + "parallax/Malaysia/Sky-MY.png";
var s_location3Building1 = dirArt + "parallax/Malaysia/Building-MY-1.png";
var s_location3Building2 = dirArt + "parallax/Malaysia/Building-MY-2.png";
var s_location3Building3 = dirArt + "parallax/Malaysia/Building-MY-3.png";
var s_location3Building4 = dirArt + "parallax/Malaysia/Building-MY-4.png";
var s_location3Building5 = dirArt + "parallax/Malaysia/Building-MY-5.png";
var s_location3Building6 = dirArt + "parallax/Malaysia/Building-MY-6.png";
var s_location3Special1 = dirArt + "parallax/Malaysia/Special-MY-1.png";
var s_location3Special2 = dirArt + "parallax/Malaysia/Special-MY-2.png";

//environment
var s_rainEnvironment = dirArt + "environment/rain.plist";

var g_mainmenu = [
    {src:s_splashScreen},
    {src:s_flare},
    {src:s_menu},
    {src:s_menuTitle}
];

var g_ressources = [
    {src:s_backgeound},
    {src:s_mainMainMusic},
    {src:s_player},
    {src:s_player_spawn},
    {src:s_player_plist},
    {src:s_player_spawn_plist},
	{src:s_enemy1},
	{src:s_enemy2},
//    {src:s_playerShootEffect},
//    {src:s_enemyDestroyedEffect},
//    {src:s_playerGetsHitEffect},
//    {src:s_enemyShootEffect},
//    {src:s_playerFlying},
//    {src:s_wildLaughEffect},
//    {src:s_playerLowLifeEffect},
    {src:s_player_bullet},
    {src:s_enemy_bullet},
	{src:s_explosion},
    {src:s_iranSky},
    {src:s_kazakhstanSky},
    {src:s_malaysiaSky},
    {src:s_cloud1},
    {src:s_cloud2},
    {src:s_cloud3},
	{src:s_horizon1},
    {src:s_horizon2},
    {src:s_tree1},
    {src:s_tree2},
    {src:s_location1Building1},
    {src:s_location1Building2},
    {src:s_location1Building3},
    {src:s_location1Building4},
    {src:s_location1Building5},
    {src:s_location1Building6},
    {src:s_location1Building7},
    {src:s_location1Building8},
    {src:s_location1Building9},
    {src:s_location2Building1},
    {src:s_location2Building2},
    {src:s_location2Building3},
    {src:s_location2Building4},
    {src:s_location2Building5},
    {src:s_location2Building6},
    {src:s_location3Building1},
    {src:s_location3Building2},
    {src:s_location3Building3},
    {src:s_location3Building4},
    {src:s_location3Building5},
    {src:s_location3Building6},
    {src:s_location1Special1},
    {src:s_location2Special1},
    {src:s_location2Special2},
    {src:s_location3Special1},
    {src:s_location3Special2},
    {src:s_rainEnvironment}
];

var g_clouds = [
    {src:s_cloud1},
    {src:s_cloud2},
    {src:s_cloud3}
];

var g_sky = [
    {src:s_iranSky},
    {src:s_kazakhstanSky},
    {src:s_malaysiaSky}
];

var g_buildings = {
    "location1":[
        s_location1Building1,
        s_location1Building2,
        s_location1Building3,
        s_location1Building4,
        s_location1Building5,
        s_location1Building6,
        s_location1Building7,
        s_location1Building8,
        s_location1Building9
    ],
    "location1special":[
       s_location1Special1
    ],
    "location2":[
        s_location2Building1,
        s_location2Building2,
        s_location2Building3,
        s_location2Building4,
        s_location2Building5,
        s_location2Building6
    ],
    "location2special":[
        s_location2Special1,
        s_location2Special2
    ],
    "location3":[
        s_location3Building1,
        s_location3Building2,
        s_location3Building3,
        s_location3Building4,
        s_location3Building5,
        s_location3Building6
    ],
    "location3special":[
        s_location3Special1,
        s_location3Special2
    ]
}

var g_environments = [
    {src:s_rainEnvironment}
]
