STATE_PLAYING = 0;
STATE_PAUSED = 1;
STATE_GAMEOVER = 2;
Z_SCROLL = 10;
Z_MOUNTAINS = 0;
MOVEMENT_SPEED = 0.05;

var GameLayer = cc.Layer.extend({
	_player: null,
    _cloudParallax: null,
    _buildingParallax: null,
    _distanceTravelled: 0,
	
	init:function(scene) {
        var bRet = false;
        if (this._super()) {
            this.initStaticLayer(scene);
            this.initCloudLayer(scene);
            //this.initBuildingLayer(scene);
            this.initPlayer();
            this.enableEvents();
            this.scheduleUpdate();
            bRet = true;

            sys.dumpRoot();
            sys.garbageCollect();
        }
        return bRet;
    },

    initStaticLayer: function(scene){
        var staticParallaxLayer = cc.Layer.create();
        var staticBackground = cc.Sprite.create(s_loading);
        staticBackground.setAnchorPoint(cc.p(0, 0));
        staticParallaxLayer.addChild(staticBackground);
        scene.addChild(staticParallaxLayer);
    },

    initCloudLayer: function(scene){
        this._cloudParallax = CloudParallaxLayer.create(g_clouds,MOVEMENT_SPEED-0.02);
        this._cloudParallax.setAnchorPoint(cc.p(0, 0));
        scene.addChild(this._cloudParallax);
    },

    initBuildingLayer: function(scene){
        this._buildingParallax = BuildingParallaxLayer.create(g_buildings,MOVEMENT_SPEED-0.01);
        this._buildingParallax.setAnchorPoint(cc.p(0, 0));
        scene.addChild(this._buildingParallax);
    },

    initPlayer: function(){
        this._player = new Player();
        this._player.setPosition(0-this._player.getContentSize().width/2, winSize.height/2);
        this.addChild(this._player, this._player.tag);
        this._player.runAction(cc.MoveTo.create(1.5, cc.p(this._player.getContentSize().width/2, winSize.height/2)));
    },

	update:function (dt) {
        this._cloudParallax.update();
        this._player.update(dt);
        //this.addEnemy();
        this.setPositionX(this.getPositionX()-(100*MOVEMENT_SPEED));
        var playerMove =(100*MOVEMENT_SPEED);
        this._distanceTravelled = this._distanceTravelled + playerMove;
        this._player.setPositionX( this._player.getPositionX()+playerMove);
	},
	
	onKeyDown:function(e){
		 if (e == cc.KEY.down){
			KEYS[e] = true;
		 }
		 if (e == cc.KEY.up){
			KEYS[e] = true;
		 }
		 if (e == cc.KEY.space) {
			
		 }
	},
	
	onKeyUp:function(e) {
		if (e == cc.KEY.down) {
			KEYS[e] = false;
		}
		if (e == cc.KEY.up) {
			KEYS[e] = false;
		}
	},

    enableEvents: function(){
        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);

        if( 'keyboard' in sys.capabilities )
            this.setKeyboardEnabled(true);
    },

	addEnemy:function (){
		var enemyType = Math.floor((Math.random()*2)+1);
        var enemy = new Enemy(enemyType);

		var minY = enemy.getContentSize().height / 2 /* + this.topBar.getContentSize().height*2 */;
		var maxY = winSize.height - /* this.topBar.getContentSize().height - */ enemy.getContentSize().height/2;
		var rangeY = maxY - minY;
		var actualY = Math.floor((Math.random() * rangeY + 1) + minY);
		enemy.setPosition(this._player.getPositionX() + winSize.width + enemy.getContentSize().width/2, actualY);
		this.addChild(enemy); 
    }
});

GameLayer.create = function (scene) {
	var sg = new GameLayer();
	if (sg && sg.init(scene)) {
		return sg;
	}
	return null;
};