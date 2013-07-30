var Boss = cc.LayerColor.extend({
    ship: null,
    life: 3,
    displacementDirection: 0,
    displacementTop: 0,
    displacementBottom: 0,
    verticalSpeed: 200,
    moveTime: 0,
    fireWait: 0,
    state: 0,
    guns: [],

    ctor: function () {
        this._super();
        this.life = gameLevels[PLAYERCURRENTLOCATION-1].bigEnemyArmour;

        this.ship = cc.Sprite.create(s_enemy1);
        this.ship.setAnchorPoint(this.getAnchorPoint());
        this.ship.setScale(2);
        this.addChild(this.ship);
        this.setContentSize(cc.size(this.ship.getContentSize().width * 2, this.ship.getContentSize().height * 2));
        var tempGuns = [0,1,2];
        for (var i=0; i < 3; i++) {
            this.guns.push(tempGuns.splice(getRandomInt(0,tempGuns.length-1),1));
        }
    },

    configure: function () {
        this.displacementTop = this.getPositionY() + getRandomInt(10, winSize.height - this.getContentSize().height);
        this.displacementBottom = this.getPositionY() - getRandomInt(10, this.getPositionY() - 30);
    },

    update: function (dt) {
        this.moveTime += dt;

        if (this.moveTime < 2) {
            this.verticalMovement(dt);
        } else if (this.moveTime > 3) {
            this.moveTime = 0;
            var tempGuns = [0,1,2];
            for (var i=0; i < 3; i++) {
                this.guns.push(tempGuns.splice(getRandomInt(0,tempGuns.length-1),1));
            }
        } else if (this.moveTime > 2.3) {
            if (this.state == 1) {
                if (this.guns.length > 0)
                    this.fireWait += dt;
                if (this.fireWait >= 0.25) {
                    this.shoot();
                    this.fireWait = 0;
                }
            }
        }

        if (this.blinkNumber > 0) {
            this.blink();
        }
    },

    hitSurvive: function () {
        this.life--;
        if (this.life > 0) {
            this.isHit = true;
            this.blinkNumber = 16;
        }
        return !(this.life == 0);
    },

    blink: function() {
        if ((this.blinkNumber / 0.5) % 8 < 1) {
            this.ship.setColor(new cc.Color3B(255,255,255));
            this.setVisible(false);
        }
        else {
            this.ship.setColor(new cc.Color3B(255,0,0));
            this.setVisible(true);
        }
        this.blinkNumber -= 0.5;

        if (this.blinkNumber == 0) {
            this.ship.setColor(new cc.Color3B(255,255,255));
        }
    },

    shoot: function() {
        var gun = this.guns.pop();
        var bulletEffect = cc.Sprite.create(s_enemy_bulletEffect);
        bulletEffect.setPosition(this.getPositionX() - 40, this.getPositionY() + (this.getContentSize().height/2)*gun - (gun-1)*40);
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
        bullet.setPosition(this.getPositionX() - 15, this.getPositionY() + (this.getContentSize().height/2)*gun - (gun-1)*40);
        this._parent._enemyBullets.push(bullet);
        this._parent.addChild(bullet);
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

    verticalMovement: function (dt) {
        if (this.displacementDirection == 0) {
            var positionY = this.getPositionY() + dt * this.verticalSpeed;
            if (positionY > this.displacementTop) {
                this.displacementDirection = 1;
                this.displacementBottom = this.getPositionY() - getRandomInt(10, this.getPositionY() - 30);
            }
            else {
                this.setPositionY(positionY);
            }
        }
        else {
            positionY = this.getPositionY() - dt * this.verticalSpeed;
            if (positionY < 30) {
                this.displacementDirection = 0;
                this.displacementTop = this.getPositionY() + getRandomInt(10, winSize.height - this.getContentSize().height);
            }
            else {
                this.setPositionY(positionY);
            }
        }
    }
});