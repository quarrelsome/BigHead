var dirArt = "Art/";
var dirSounds = "Sounds/";

//image
var s_loading = dirArt + "blue-sky.jpg";
var s_menu = dirArt + "menu.png";
var s_logo = dirArt + "logo.png";
var s_b01 = dirArt + "b01.png";
var s_menuTitle = dirArt + "menuTitle.png";
var s_flare = dirArt + "flare.jpg";
var s_textureTransparentPack = dirArt + "textureTransparentPack.png";

var s_player = dirArt + "player.png";
var s_enemy1 = dirArt + "enemy1.png";
var s_enemy2 = dirArt + "enemy2.png";

var s_player_bullet = dirArt + "bullet.png";
var s_enemy_bullet = dirArt + "bullet-enemy.png";

var s_static_background = dirArt + "bg-static.png";
var s_star_background = dirArt + "bg-stars-paralex.png";
var s_top_bar = dirArt + "top-bar.png";
var s_bottom_bar = dirArt + "bottom-bar.png";
var s_score_text = dirArt + "score-text.png";
var s_lives_text = dirArt + "lives-text.png";

var s_explosion = dirArt + "explosion-particle.png";
var s_fire_particle = dirArt + "ship-exhaust-fire-particle.png";
var s_cloud = dirArt + "clouds.png";

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


var g_mainmenu = [
    {src:s_loading},
    {src:s_flare},
    {src:s_menu},
    {src:s_logo},
    {src:s_flare},
    {src:s_b01},
    {src:s_mainMainMusic_mp3},
    {src:s_mainMainMusic_ogg},
    {src:s_menuTitle},
    {src:s_textureTransparentPack_plist},
    {src:s_textureTransparentPack}
];

var g_ressources = [
 
    {type:"image", src:s_player},
	{type:"image", src:s_enemy1},
	{type:"image", src:s_enemy2},
	
    {type:"sound", src:s_shootEffect},
    {type:"sound", src:s_shootEffectOgg},
    {type:"sound", src:s_shootEffectWav},
	
	{type:"image", src:s_static_background},
	{type:"image", src:s_star_background},
	{type:"image", src:s_top_bar},
	{type:"image", src:s_bottom_bar},
	
	{type:"image", src:s_score_text},
	{type:"image", src:s_lives_text},

    {type:"image", src:s_player_bullet},
    {type:"image", src:s_enemy_bullet},

    {type:"image", src:s_explosion},
	{type:"image", src:s_fire_particle}
];

var g_clouds = [
    {type:"image", src:s_cloud},
    {type:"image", src:s_cloud},
    {type:"image", src:s_cloud},
    {type:"image", src:s_cloud}
];