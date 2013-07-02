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
    displacementTop: 0,
    displacementBottom: 0,
    displacementDirection: 0,

	ctor: function (enemyType) {
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

        var minWait = -2 + 0.1*ENEMY_WAIT_TIME_FACTOR;
        var maxWait = -1 + 0.1*ENEMY_WAIT_TIME_FACTOR;
        ENEMY_WAIT_TIME_FACTOR += ENEMY_SPEED_INCREASE_FACTOR;
        cc.log(minWait + " " + maxWait);
        this.enemyFireWaitCompleted = getRandomInt(minWait, maxWait);
        this.bulletSpeed = getRandomInt(200, 400);
		this.setTag(this.tag);
        this.addChild(this.ship);
        this.setContentSize(cc.size(this.ship.getContentSize().width, this.ship.getContentSize().height));
        this.ship.setAnchorPoint(this.getAnchorPoint());
	},

    configure: function() {
        this.displacementTop = this.getPositionY() + getRandomInt(20, 30);
        this.displacementBottom = this.getPositionY() - getRandomInt(20,30);
    },

    update: function(dt) {
        if (this.displacementDirection == 0) {
            var positionY = this.getPositionY() + dt * ENEMY_VERTICAL_SPEED;
            if (positionY > this.displacementTop) {
                this.displacementDirection = 1;
            }
            else {
                this.setPositionY(positionY);
            }
        }
        else {
            positionY = this.getPositionY() - dt * ENEMY_VERTICAL_SPEED/2;
            if (positionY < this.displacementBottom) {
                this.displacementDirection = 0;
            }
            else {
                this.setPositionY(positionY);
            }
        }
    },

    shoot: function () {
        var bullet = cc.Sprite.create(s_enemy_bullet);
        bullet.setPosition(this.getPositionX() + 15, this.getPositionY() + this.getContentSize().height/2);
        bullet.setTag(4);
        this.bullets.push(bullet);
        return bullet;
    }
});