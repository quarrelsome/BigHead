var dirArt = "Art/";
var dirSounds = "Sounds/";
var dirEnemy = "Enemy/";
var dirPlayer = "Player/";
var dirPowerUp = "PowerUp/";

//loading screen
var s_splashScreen = dirArt+"splash-screen.jpg";

//splash screen
var s_splashBg = dirArt+"splash/Splash-Bg.png";
var s_splashLogo = dirArt+"splash/BeattheBeads-logo.png";
var s_splashBigHeadLogo = dirArt+"splash/BigHead-logo.png";
var s_splashSunburst = dirArt+"splash/sunburst.png";
var s_splashMusic = dirSounds+"splash-sound.ogg";

//map screen
var s_mapBg = dirArt+"map-screen/map-bg.PNG";
var s_mapMusic = dirSounds+"map-sound.ogg";
var s_mapButton = dirArt+"map-screen/map-button.png";
var s_mapButtonPress = dirArt+"map-screen/map-button-press.png";

//menu
var s_menuBackground = dirArt + "main-menu/BH-MM-Bg.png";
var s_menuLogo = dirArt + "main-menu/BH-MM-logo.png";
var s_flare = dirArt + "flare.jpg";
var s_menuPlist = dirArt + "main-menu/menu.plist";
var s_menuImages = dirArt + "main-menu/menu.png";

//player
var s_player = dirArt + dirPlayer + "player.png";
var s_player2 = dirArt + dirPlayer + "player2.png";
var s_player_bullet = dirArt + dirPlayer + "bullet.png";
var s_player2_bullet = dirArt + dirPlayer + "bullet2.png";

//enemy
var s_enemy = dirArt + dirEnemy + "enemy.png";
var s_enemy_bullet = dirArt + dirEnemy + "bullet-enemy.png";
var s_explosion = dirArt + "explosion-particle.png";

//power-ups
var s_sloMo = dirArt + dirPowerUp + "slo_mo.png";
var s_doubleShot = dirArt + dirPowerUp + "double_shot.png";
var s_armour = dirArt + dirPowerUp + "armour.png";



//effect
var s_buttonEffect_mp3 = dirSounds + "buttonEffet.ogg";
var s_playerShootEffect = dirSounds + "player-fire.ogg";
var s_enemyDestroyedEffect = dirSounds + "enemy-destroy.ogg";
var s_playerGetsHitEffect = dirSounds + "player-hit.ogg";
var s_enemyShootEffect = dirSounds + "enemy-fire.ogg";
var s_playerFlying = dirSounds + "player-flying.ogg";
var s_wildLaughEffect = dirSounds + "wild-laugh.ogg";
var s_playerLowLifeEffect = dirSounds + "player-lowLife.ogg";

//music
var s_mainMainMusic = dirSounds + "backgroundMusic.ogg";

//plist
var s_player_plist = dirArt +  dirPlayer + "player.plist";
var s_player2_plist = dirArt +  dirPlayer + "player2.plist";

var s_enemy_plist = dirArt +  dirEnemy + "enemy.plist";
var s_explosionFire = dirArt + dirEnemy + "explosionFire.plist";
var s_explosionSmoke = dirArt + dirEnemy + "explosionSmoke.plist";

//Parallax
var s_cloud1 = dirArt + "Parallax/Common/Cloud1-common.png";
var s_cloud2 = dirArt + "Parallax/Common/Cloud2-common.png";
var s_cloud3 = dirArt + "Parallax/Common/Cloud3-common.png";

// Malaysia - KL
var s_location1Background = dirArt + "Parallax/Malaysia/KL/bg.png";
var s_location1Horizon = dirArt +"Parallax/Malaysia/KL/horizon.png";
var s_location1Building11 = dirArt + "Parallax/Malaysia/KL/building1-1.png";
var s_location1Building12 = dirArt + "Parallax/Malaysia/KL/building1-2.png";
var s_location1Building21 = dirArt + "Parallax/Malaysia/KL/building2-1.png";
var s_location1Building22 = dirArt + "Parallax/Malaysia/KL/building2-2.png";
var s_location1Special1 = dirArt + "Parallax/Malaysia/KL/Petronas.png";
var s_location1Front1 = dirArt + "Parallax/Malaysia/KL/buildingF-1.png";

//environment
var s_rainEnvironment = dirArt + "environment/rain.plist";

//hud
var s_pauseButton = dirArt + "hud/BH-Pause-bt.png";
var s_scoreContainer = dirArt + "hud/BH-Score-container.png";
var s_healthContainer = dirArt + "hud/BH-Health-container.png";
var s_healthBar = dirArt + "hud/BH-health-bar.png";
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
var s_pauseScreenRestartBtn = dirArt +"pause-screen/BH-PM-Restart-BT.png";
var s_pauseScreenRestartBtnPress = dirArt +"pause-screen/BH-PM-Restart-BT-Press.png";
var s_pauseScreenMenuBtn = dirArt +"pause-screen/BH-PM-Menu-BT.png";
var s_pauseScreenMenuBtnPress = dirArt +"pause-screen/BH-PM-Menu-BT-Press.png";

//game over
var s_gameOverTitle = dirArt +"game-over/EM-gameover-text.png";
var s_gameOverWin = dirArt +"game-over/EM-Win-text.png";
var s_gameOverLost = dirArt +"game-over/EM-Lost-text.png";

var g_splashScreen = [
    {src:s_splashBg},
    {src:s_splashLogo},
    {src:s_splashBigHeadLogo},
    {src:s_splashSunburst},
    {src:s_splashMusic}
];

var g_mapScreen = [
    {src:s_mapBg},
    {src:s_mapMusic},
    {src:s_mapButton},
    {src:s_mapButtonPress}
];

var g_mainmenu = [
    {src:s_menuBackground},
    {src:s_menuLogo},
    {src:s_flare},
    {src:s_menuPlist},
    {src:s_menuImages}
];

var g_ressources = [
    {src:s_mainMainMusic},
    {src:s_player},
    {src:s_player2},
    {src:s_player_plist},
    {src:s_player2_plist},
    {src:s_enemy},
    {src:s_enemy_plist},
    {src:s_explosionFire},
    {src:s_playerShootEffect},
    {src:s_enemyDestroyedEffect},
    {src:s_playerGetsHitEffect},
    {src:s_enemyShootEffect},
    {src:s_playerFlying},
    {src:s_wildLaughEffect},
    {src:s_playerLowLifeEffect},
    {src:s_player_bullet},
    {src:s_player2_bullet},
    {src:s_enemy_bullet},
	{src:s_explosion},
    {src:s_explosionSmoke},
    {src:s_sloMo},
    {src:s_doubleShot},
    {src:s_armour},
    {src:s_cloud1},
    {src:s_cloud2},
    {src:s_cloud3},
    {src:s_location1Background},
	{src:s_location1Horizon},
    {src:s_location1Building11},
    {src:s_location1Building12},
    {src:s_location1Building21},
    {src:s_location1Building22},
    {src:s_location1Special1},
    {src:s_location1Front1},
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
    {src:s_pauseScreenResumeBtnPress},
    {src:s_pauseScreenRestartBtn},
    {src:s_pauseScreenRestartBtnPress},
    {src:s_pauseScreenMenuBtn},
    {src:s_pauseScreenMenuBtnPress},
    {src:s_gameOverTitle},
    {src:s_gameOverWin},
    {src:s_gameOverLost}
];

var g_clouds = [
    {src:s_cloud1},
    {src:s_cloud2},
    {src:s_cloud3}
];

var g_locations=[
    {
        background:s_location1Background,
        horizon:s_location1Horizon,
        building1: [s_location1Building11,s_location1Building12],
        building2: [s_location1Building21,s_location1Building22],
        specialBuilding: [s_location1Special1],
        buildingFront: [s_location1Front1]
    }
];

var g_environments = [
    {src:s_rainEnvironment}
]
