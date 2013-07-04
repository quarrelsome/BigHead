var Enemy = cc.LayerColor.extend({

    ship: null,
	speed: 100,
	bulletSpeed: 500,
	tag: 3,
    isTarget: false,
	runMoveRatioY: 0,
    fireWaitCompleted: 0,
    bullets: [],
    displacementTop: 0,
    displacementBottom: 0,
    displacementDirection: 0,
    bulletAngle: 0,

	ctor: function (enemyType) {
        this._super();

        switch (enemyType) {
            case 1: this.ship = cc.Sprite.create(s_enemy1); break;
            case 2: this.ship = cc.Sprite.create(s_enemy2); break;
        }

//        var minWait = -2 + 0.1*ENEMY_WAIT_TIME_FACTOR;
//        var maxWait = -1 + 0.1*ENEMY_WAIT_TIME_FACTOR;

//        this.fireWaitCompleted = getRandomInt(minWait, maxWait);

        this.fireWaitCompleted = 0;
        this.bulletSpeed = getRandomInt(200, 300);
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
        this.verticalMovement(dt);
    },

    verticalMovement: function (dt) {
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