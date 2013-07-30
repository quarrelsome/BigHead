var Enemy = cc.LayerColor.extend({

    ship: null,
    stick1: null,
    stick2: null,
    life: 1,
    value: -1,
    enemyIndex: -1,
	speed: 100,
	tag: 3,
    isTarget: false,
	runMoveRatioY: 0,
    fireWaitCompleted: 0,
    displacementTop: 0,
    displacementBottom: 0,
    displacementDirection: 0,
    blinkNumber: 0,
    isHit: false,

	ctor: function (enemyValue, enemyLife, enemyIndex) {
        this._super();

        this.setTag(this.tag);
        this.value = enemyValue;
        this.life = enemyLife;
        this.enemyIndex = enemyIndex;

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_enemy_plist, s_enemy);

        var enemyType = getRandomInt(1,2);
        var stickPlacement = 10;

        if(enemyType==1)
            this.ship = cc.Sprite.createWithSpriteFrameName("enemy_ship.png");
        else{
            this.ship = cc.Sprite.create(s_enemy1);
            stickPlacement = 20;
        }

        this.ship.setAnchorPoint(this.getAnchorPoint());

        var currentValue = enemyValue;

        if (enemyValue > 9) {
            currentValue = Math.floor(enemyValue / 10);
        }

        this.stick1 = cc.Sprite.createWithSpriteFrameName("enemy_stick_" + currentValue + ".png");

        if (enemyValue > 9)
            this.stick1.setPosition(this.ship.getContentSize().width/2 + stickPlacement, this.ship.getContentSize().height/2);
        else
            this.stick1.setPosition(this.ship.getContentSize().width/2 + (stickPlacement+10), this.ship.getContentSize().height/2);

        this.addChild(this.stick1);

        if (enemyValue > 9) {
            currentValue = enemyValue % 10;
            this.stick2 = cc.Sprite.createWithSpriteFrameName("enemy_stick_" + currentValue + ".png");
            this.stick2.setPosition(this.ship.getContentSize().width/2 + (stickPlacement+20), this.ship.getContentSize().height/2);
            this.addChild(this.stick2);
        }

        this.addChild(this.ship);

        this.setContentSize(cc.size(this.ship.getContentSize().width, this.ship.getContentSize().height));
        this.fireWaitCompleted = 0;
    },

    configure: function() {
        this.displacementTop = this.getPositionY() + getRandomInt(20, 30);
        this.displacementBottom = this.getPositionY() - getRandomInt(20,30);
    },

    update: function(dt) {
        this.verticalMovement(dt);
        if (this.blinkNumber > 0) {
            this.blink();
        }
    },

    verticalMovement: function (dt) {
        var reductionFactor = 1;
        if (this._parent._player.powerUp != null) {
            if (this._parent._player.powerUp.type == 1) {
                reductionFactor = 4;
            }
        }
        if (this.displacementDirection == 0) {
            var positionY = this.getPositionY() + dt * (this._parent._enemyVerticalSpeed) / reductionFactor;
            if (positionY > this.displacementTop) {
                this.displacementDirection = 1;
            }
            else {
                this.setPositionY(positionY);
            }
        }
        else {
            positionY = this.getPositionY() - dt * (this._parent._enemyVerticalSpeed/2) / reductionFactor;
            if (positionY < this.displacementBottom) {
                this.displacementDirection = 0;
            }
            else {
                this.setPositionY(positionY);
            }
        }
    },

    shoot: function () {
        var bulletEffect = cc.Sprite.create(s_enemy_bulletEffect);
        bulletEffect.setPosition(this.getPositionX() - 40, this.getPositionY() + this.getContentSize().height/2);
        this._parent.addChild(bulletEffect);
        bulletEffect.runAction(
            cc.Sequence.create(
                cc.FadeOut.create(0.25),
                cc.CallFunc.create(function () {
                    bulletEffect.removeFromParent();
                })
            )
        );

        var bullet = cc.Sprite.create(s_enemy_bullet);
        bullet.setPosition(this.getPositionX() - 15, this.getPositionY() + this.getContentSize().height/2);
        bullet.setTag(4);
        this._parent._enemyBullets.push(bullet);
        return bullet;
    },

    hitSurvive: function () {
        this.life--;
        if (this.life > 0) {
            this.isHit = true;
            this.blinkNumber = 16;
        }
        return !(this.life == 0);
    },

    die: function () {
        cc.AudioEngine.getInstance().playEffect(s_enemyDestroyedEffect);

        var blast = cc.ParticleSystem.create(s_explosionFire);
        blast.setPosition(this.getPosition());
        this._parent.addChild(blast);

        var smoke = cc.ParticleSystem.create(s_explosionSmoke);
        smoke.setPosition(this.getPosition());
        this._parent.addChild(smoke);

        blast.runAction(cc.Sequence.create(cc.DelayTime.create(1.5),
            cc.CallFunc.create(function (blast) {
                blast.removeFromParent();
            }, this)
        ));
        smoke.runAction(cc.Sequence.create(cc.DelayTime.create(1.5),
            cc.CallFunc.create(function (smoke) {
                smoke.removeFromParent();
            }, this)
        ));
    },

    blink: function() {
        if ((this.blinkNumber / 0.5) % 8 < 1) {
            this.ship.setColor(new cc.Color3B(255,255,255));
            this.setVisible(false);
        }
        else {
            if (this.isHit)
                this.ship.setColor(new cc.Color3B(255,0,0));
            else
                this.ship.setColor(new cc.Color3B(0,255,0));
            this.setVisible(true);
        }
        this.blinkNumber -= 0.5;

        if (this.blinkNumber == 0) {
            this.ship.setColor(new cc.Color3B(255,255,255));
            this.isHit = false;
        }
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}