var dirArt = "Art/";
var dirSounds = "Sounds/";
var dirEnemy = "Enemy/";
var dirPlayer = "Player/";

//image
var s_splashScreen = dirArt + "splash-screen.jpg";
var s_menu = dirArt + "menu.png";
var s_menuTitle = dirArt + "menuTitle.png";
var s_flare = dirArt + "flare.jpg";

var s_player = dirArt + dirPlayer + "player.png";
var s_player_spawn = dirArt + dirPlayer + "player_spawn.png";
var s_player_fire = dirArt + dirPlayer + "player_fire.png";
var s_player_die = dirArt + dirPlayer + "player_die.png";
var s_player_bullet = dirArt + dirPlayer + "bullet.png";

var s_enemy = dirArt + dirEnemy + "enemy.png";
var s_enemy_stick0 = dirArt + dirEnemy + "enemy-stick0.png";
var s_enemy_stick1 = dirArt + dirEnemy + "enemy-stick1.png";
var s_enemy_stick2 = dirArt + dirEnemy + "enemy-stick2.png";
var s_enemy_stick3 = dirArt + dirEnemy + "enemy-stick3.png";
var s_enemy_stick4 = dirArt + dirEnemy + "enemy-stick4.png";
var s_enemy_stick5 = dirArt + dirEnemy + "enemy-stick5.png";
var s_enemy_stick6 = dirArt + dirEnemy + "enemy-stick6.png";
var s_enemy_stick7 = dirArt + dirEnemy + "enemy-stick7.png";
var s_enemy_stick8 = dirArt + dirEnemy + "enemy-stick8.png";
var s_enemy_stick9 = dirArt + dirEnemy + "enemy-stick9.png";
var s_enemy_bullet = dirArt + dirEnemy + "bullet-enemy.png";

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
var s_player_plist = dirArt +  dirPlayer + "player.plist";
var s_player_spawn_plist = dirArt + dirPlayer + "player_spawn.plist";
var s_player_fire_plist = dirArt + dirPlayer + "player_fire.plist";
var s_player_die_plist = dirArt + dirPlayer + "player_die.plist";

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

//hud
var s_pauseButton = dirArt + "hud/BH-Pause-bt.png";
var s_scoreContainer = dirArt + "hud/BH-Score-container.png";
var s_healthContainer = dirArt + "hud/BH-Health-container.png";
var s_healthBar = dirArt + "hud/BH-Health-bar.png";
var s_targetNumberContainer = dirArt + "hud/BH-Targetnumber-container.png";
var s_scoreFont = dirArt + "hud/hud-font.fnt";
var s_scoreFontImage = dirArt + "hud/hud-font.png";
var s_scoreFontHd = dirArt + "hud/hud-font-hd.fnt";
var s_scoreFontImageHd = dirArt + "hud/hud-font-hd.png";

//pause screen
var s_pauseScreenBackground = dirArt +"pause-screen/BH-PM-SemiBlack-bg.png";
var s_pauseScreenWindow = dirArt +"pause-screen/BH-PM-window.png";
var s_pauseTitle = dirArt +"pause-screen/BH-PM-Paused-text.png";
var s_pauseScreenResumeBtn = dirArt +"pause-screen/BH-PM-Resume-BT.png";
var s_pauseScreenResumeBtnPress = dirArt +"pause-screen/BH-PM-Resume-BT-Press.png";

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
    {src:s_player_fire},
    {src:s_player_die},
    {src:s_player_plist},
    {src:s_player_spawn_plist},
    {src:s_player_fire_plist},
    {src:s_player_die_plist},
    {src:s_enemy},
    {src:s_enemy_stick0},
    {src:s_enemy_stick1},
    {src:s_enemy_stick2},
    {src:s_enemy_stick3},
    {src:s_enemy_stick4},
    {src:s_enemy_stick5},
    {src:s_enemy_stick6},
    {src:s_enemy_stick7},
    {src:s_enemy_stick8},
    {src:s_enemy_stick9},
    {src:s_playerShootEffect},
    {src:s_enemyDestroyedEffect},
    {src:s_playerGetsHitEffect},
    {src:s_enemyShootEffect},
    {src:s_playerFlying},
    {src:s_wildLaughEffect},
    {src:s_playerLowLifeEffect},
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
    {src:s_rainEnvironment},
    {src:s_pauseButton},
    {src:s_scoreContainer},
    {src:s_healthContainer},
    {src:s_healthBar},
    {src:s_targetNumberContainer},
    {src:s_scoreFont},
    {src:s_scoreFontImage},
    {src:s_scoreFontHd},
    {src:s_scoreFontImageHd},
    {src:s_pauseScreenBackground},
    {src:s_pauseScreenWindow},
    {src:s_pauseTitle},
    {src:s_pauseScreenResumeBtn},
    {src:s_pauseScreenResumeBtnPress}
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
