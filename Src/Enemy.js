var Enemy = cc.Sprite.extend({
	
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

		var enemyTexture;
		switch (enemyType) {
			case 1: enemyTexture = cc.TextureCache.getInstance().addImage(s_enemy1); break;
			case 2: enemyTexture = cc.TextureCache.getInstance().addImage(s_enemy2); break;
		}
		 
        this.initWithTexture(enemyTexture);
        this.enemyFireWaitCompleted = getRandomInt(-2, -1);
        this.bulletSpeed = getRandomInt(400, 800);
		this.setTag(this.tag);
	},

    shoot: function () {
        var bullet = cc.Sprite.create(s_enemy_bullet);
        bullet.setPosition(this.getPositionX() + 5 - this.getContentSize().width/2, this.getPositionY());
        bullet.setTag(4);
        this.bullets.push(bullet);
        return bullet;
    }
});