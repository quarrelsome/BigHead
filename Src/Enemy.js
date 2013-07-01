var Enemy = cc.LayerColor.extend({

    ship: null,
	speed: 100,
	bulletSpeed: 500,
	tag: 3,
    isTarget: false,
    playerHitLocationY: 0,
	runMoveRatioY: 0,
    enemyFireWaitCompleted: 0,
    bullets: [],

	ctor:function (enemyType) {
        this._super();

//		var enemyTexture;
//		switch (enemyType) {
//			case 1: enemyTexture = cc.TextureCache.getInstance().addImage(s_enemy1); break;
//			case 2: enemyTexture = cc.TextureCache.getInstance().addImage(s_enemy2); break;
//		}
//        this.initWithTexture(enemyTexture);

        switch (enemyType) {
            case 1: this.ship = cc.Sprite.create(s_enemy1); break;
            case 2: this.ship = cc.Sprite.create(s_enemy2); break;
        }

        //this.ship.setPosition(,);
        this.enemyFireWaitCompleted = getRandomInt(-2, -1);
        this.bulletSpeed = getRandomInt(400, 800);
		this.setTag(this.tag);
        this.addChild(this.ship);
        this.setContentSize(cc.size(this.ship.getContentSize().width, this.ship.getContentSize().height));
        this.ship.setAnchorPoint(this.getAnchorPoint());
	},

    shoot: function () {
        var bullet = cc.Sprite.create(s_enemy_bullet);
        bullet.setPosition(this.getPositionX() + 15, this.getPositionY() + this.getContentSize().height/2);
        bullet.setTag(4);
        this.bullets.push(bullet);
        return bullet;
    },

    getPosition: function() {

    }
});