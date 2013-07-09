var Enemy = cc.LayerColor.extend({

    ship: null,
    stick1: null,
    stick2: null,
    value: -1,
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

	ctor: function (enemyValue) {
        this._super();

        this.setTag(this.tag);
        this.value = enemyValue;
        this.ship = cc.Sprite.create(s_enemy);
        this.ship.setAnchorPoint(this.getAnchorPoint());

        var currentValue = enemyValue;

        if (enemyValue > 9) {
            currentValue = Math.floor(enemyValue / 10);
        }

        this.stick1 = cc.Sprite.create(this.getStickName(currentValue));
        if (enemyValue > 9)
            this.stick1.setPosition(this.ship.getContentSize().width/2 + 10, this.ship.getContentSize().height/2);
        else
            this.stick1.setPosition(this.ship.getContentSize().width/2 + 20, this.ship.getContentSize().height/2);

        this.addChild(this.stick1);

        if (enemyValue > 9) {
            currentValue = enemyValue % 10;
            this.stick2 = cc.Sprite.create(this.getStickName(currentValue));
            this.stick2.setPosition(this.ship.getContentSize().width/2 + 28, this.ship.getContentSize().height/2);
            this.addChild(this.stick2);
        }

        this.addChild(this.ship);

        this.setContentSize(cc.size(this.ship.getContentSize().width, this.ship.getContentSize().height));
        this.fireWaitCompleted = 0;
        this.bulletSpeed = getRandomInt(200, 300);

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
        bullet.setPosition(this.getPositionX() - 15, this.getPositionY() + this.getContentSize().height/2);
        bullet.setTag(4);
        this.bullets.push(bullet);
        return bullet;
    },

    getStickName: function (stickNumber) {
        switch(stickNumber) {
            case 0: return s_enemy_stick0;
            case 1: return s_enemy_stick1;
            case 2: return s_enemy_stick2;
            case 3: return s_enemy_stick3;
            case 4: return s_enemy_stick4;
            case 5: return s_enemy_stick5;
            case 6: return s_enemy_stick6;
            case 7: return s_enemy_stick7;
            case 8: return s_enemy_stick8;
            case 9: return s_enemy_stick9;
            default: return -1;
        }
    }
});