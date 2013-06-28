var dirArt = "Art/";
var dirSounds = "Sounds/";

//image
var s_loading = dirArt + "blue-sky.jpg";
var s_menu = dirArt + "menu.png";
var s_logo = dirArt + "logo.png";
var s_menuTitle = dirArt + "menuTitle.png";
var s_flare = dirArt + "flare.jpg";
var s_textureTransparentPack = dirArt + "textureTransparentPack.png";

var s_player = dirArt + "player.png";
var s_enemy1 = dirArt + "enemy1.png";
var s_enemy2 = dirArt + "enemy2.png";

var s_player_bullet = dirArt + "bullet.png";
var s_enemy_bullet = dirArt + "bullet-enemy.png";
var s_top_bar = dirArt + "top-bar.png";
var s_bottom_bar = dirArt + "bottom-bar.png";

var s_score_text = dirArt + "score-text.png";
var s_lives_text = dirArt + "lives-text.png";

var s_explosion = dirArt + "explosion-particle.png";
var s_fire_particle = dirArt + "ship-exhaust-fire-particle.png";

//effect
var s_buttonEffect_mp3 = dirSounds + "buttonEffet.mp3";

//music
var s_mainMainMusic_mp3 = dirSounds + "mainMainMusic.mp3";
var s_mainMainMusic_ogg = dirSounds + "mainMainMusic.ogg";
var s_shootEffect = dirSounds + "pew-pew-lei.mp3";
var s_shootEffectOgg = dirSounds + "pew-pew-lei.ogg";
var s_shootEffectWav = dirSounds + "pew-pew-lei.wav";

//plist
var s_textureTransparentPack_plist = dirArt + "textureTransparentPack.plist";

//splash screen
var s_backgeound = dirArt + "parallax/common/BG-common.png";
var s_cloud1 = dirArt + "parallax/common/Cloud1-common.png";
var s_cloud2 = dirArt + "parallax/common/Cloud2-common.png";
var s_cloud3 = dirArt + "parallax/common/Cloud3-common.png";
var s_horizon1 = dirArt +"parallax/common/Horizon2-common.png";
var s_horizon2 = dirArt +"parallax/common/Horizon1-common.png";
var s_tree1 = dirArt +"parallax/common/Trees1.png";
var s_iranSky = dirArt + "parallax/iran/Sky-IR.png";
var s_kazakhstanSky = dirArt + "parallax/kazakhstan/Sky-KH.png";
var s_malaysiaSky = dirArt + "parallax/kazakhstan/Sky-MY.png";

var g_mainmenu = [
    {src:s_loading},
    {src:s_flare},
    {src:s_menu},
    {src:s_logo},
    {src:s_flare},
    {src:s_mainMainMusic_mp3},
    {src:s_mainMainMusic_ogg},
    {src:s_menuTitle},
    {src:s_textureTransparentPack_plist},
    {src:s_textureTransparentPack}
];

var g_ressources = [
 
    {src:s_player},
	{src:s_enemy1},
	{src:s_enemy2},
    {src:s_shootEffect},
    {src:s_shootEffectOgg},
    {src:s_shootEffectWav},
	{src:s_top_bar},
	{src:s_bottom_bar},
    {src:s_player_bullet},
    {src:s_enemy_bullet},
    {src:s_score_text},
	{src:s_lives_text},
	{src:s_explosion},
	{src:s_horizon1},
    {src:s_horizon2},
    {src:s_tree1}
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

//var g_buildings = {
//    "location1":[
//        s_location1Building1,
//        s_location1Building2
//    ],
//    "location2":[
//        s_location1Building1,
//        s_location1Building2
//    ]
//}