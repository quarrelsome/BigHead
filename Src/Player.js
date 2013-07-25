var Player = cc.Sprite.extend({
    health: 100,
    hitImpact: 20,
    armour: 1,
    speed: 150,
    speedBoost: 0,
    dropSpeed: 30,
    bulletSpeed: 900,
    tag: 1,
    bullets: [],
    blinkNumber: 0,
    spriteFrameIndex: 0,
    fireWait: 2.25,
    currentState: 0,
    powerUp: null,
    alive: true,
    score: 0,

    ctor: function () {
        this._super();
        this.setTag(this.tag);
        this.armour = PLAYERLEVEL;

        var fileNames = this.getSpriteFileNames(this.armour);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(fileNames.plist, fileNames.sprite);
        this.initWithSpriteFrameName("player_spawn_0.png");

        var spawnAnimationFrames = [];
        for (var i = 0; i < 36; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame('player_spawn_' + i + '.png');
            spawnAnimationFrames.push(frame);
        }

        var animation = cc.Animation.create(spawnAnimationFrames, 0.05);
        var animate = cc.Animate.create(animation);
        this.runAction(cc.Sequence.create(animate,
            cc.CallFunc.create(function () {
                this.currentState = 1;
            }, this)
        ));
    },

    update: function (dt, score) {
        if (this._parent._time % 0.1 < 0.05) {
            if (this.currentState == 1 || this.currentState == 2)
                this.changeFrame();
        }

        this.updatePosition(dt, score);

        if (this.fireWait > 0) {
            this.fireWait -= dt;
        }
        if (this.blinkNumber > 0) {
            this.blink();
        }

        if (this.powerUp != null) {
            this.powerUp.update(dt);
            if (this.powerUp.timeRemaining <= 0) {
                delete this.powerUp;
            }
        }

        this.score = score;
    },

    updatePosition: function (dt) {
        if (this.currentState != 0) {
            var position = this.getPosition();
            var playerBoostPositionY = this._parent._playerBoost.getPositionY();
            if (KEYS[cc.KEY.up]) {
                var nextPositionY = position.y + (dt * this.speed) + (this.speedBoost * this.speed);
                if (nextPositionY + this.getContentSize().height / 2 <= winSize.height) {
                    position.y = nextPositionY;
                    this._parent._playerBoost.setPositionY(playerBoostPositionY + (dt * this.speed) + (this.speedBoost * this.speed));
                }
            }
            else if (KEYS[cc.KEY.down]) {
                nextPositionY = position.y - (dt * this.speed) - (this.speedBoost * this.speed);
                if (nextPositionY >= this.getContentSize().height / 2) {
                    position.y = nextPositionY;
                    this._parent._playerBoost.setPositionY(playerBoostPositionY - (dt * this.speed) - (this.speedBoost * this.speed));
                }
            } else if (!KEYS[cc.KEY.space]) {
                nextPositionY = position.y - (dt * this.dropSpeed);
                if (nextPositionY >= this.getContentSize().height / 2) {
                    position.y = nextPositionY;
                    this._parent._playerBoost.setPositionY(playerBoostPositionY - (dt * this.dropSpeed));
                }
            }

            this.setPosition(position);
        }
    },

    changeFrame: function () {
        if (this.currentState == 1) {
            var prefix = "player_fly_";
            if (this.spriteFrameIndex > 23) {
                this.spriteFrameIndex = 0;
            }
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(prefix + this.spriteFrameIndex + ".png");

        } else if (this.currentState == 2) {
            prefix = "player_fire_";
            frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(prefix + this.spriteFrameIndex + ".png");
            if (this.spriteFrameIndex == 4) {
                this.spriteFrameIndex = -1;
                this.currentState = 1;
            }
        }

        this.setDisplayFrame(frame);
        this.spriteFrameIndex++;
    },

    blink: function () {
        if ((this.blinkNumber / 0.5) % 8 < 1) {
            this.setColor(new cc.Color3B(255, 255, 255));
            this.setVisible(false);
        }
        else {
            this.setColor(new cc.Color3B(255, 0, 0));
            this.setVisible(true);
        }
        this.blinkNumber -= 0.5;

        if (this.blinkNumber == 0) {
            this.setColor(new cc.Color3B(255, 255, 255));
        }
    },

    shoot: function () {
        this.currentState = 2;
        this.spriteFrameIndex = 0;
        var bullet = cc.Sprite.create(this.getBulletFileName(this.armour));
        bullet.setPosition(this.getPositionX() + 20, this.getPositionY() - 20);
        bullet.setTag(2);
        this.bullets.push(bullet);
        this._parent.addChild(bullet);

        var bulletEffect = cc.Sprite.create(s_player_bulletEffect);
        bulletEffect.setPosition(this.getPositionX() + 70, this.getPositionY() - 20);
        this._parent.addChild(bulletEffect);
        bulletEffect.runAction(
            cc.Sequence.create(
                cc.FadeOut.create(0.25),
                cc.CallFunc.create(function () {
                    bulletEffect.removeFromParent();
                })
            )
        );
        if (this.powerUp != null) {
            if (this.powerUp.type == 2) {
                var bullet2 = cc.Sprite.create(this.getBulletFileName(this.armour));
                bullet2.setPosition(this.getPositionX() - 80, this.getPositionY() - 20);
                bullet2.setTag(2);
                this.bullets.push(bullet2);
                this._parent.addChild(bullet2);
            }
        }
    },

    hit: function () {
        if (this.powerUp == null || this.powerUp.type != 3) {
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

            this.health = this.health - (this.hitImpact - (this.armour - 1) * 2 + ((Math.floor((this.armour - 1) / 6)) * (this.armour) % 6 * 1.25));
            if (this.health > 0 && this.health <= 20)
                cc.AudioEngine.getInstance().playEffect(s_playerLowLifeEffect);
            if (this.health <= 0) {
                this.health = 0;
                this.die();
            } else {
                this.blinkNumber = 16;
            }
            return true;
        }
        return false;
    },

    die: function () {
        this.alive = false;
//        this.currentState = 3;
        var dieAnimationFrames = [];
        for (var i = 0; i < 15; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame('player_die_' + i + '.png');
            dieAnimationFrames.push(frame);
        }

        var moveDown = cc.MoveTo.create(1.5, cc.p(this.getPositionX(), 0 - this.getContentSize().height / 2));
        var rotate = cc.RotateBy.create(1, -70.0);
        var animation = cc.Animation.create(dieAnimationFrames, 0.1);
        var animate = cc.Animate.create(animation);
        this.runAction(cc.Sequence.create(animate));
        this.runAction(cc.Sequence.create(cc.DelayTime.create(1.15), rotate));
        this.runAction(cc.Sequence.create(cc.DelayTime.create(1.15), moveDown,
            cc.CallFunc.create(function () {
                this.currentState = 3;
                PostDataUsingXmlHttpRequest(this.score);
                var scene = cc.Scene.create();
                scene.addChild(GameOver.create(false));
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
            }, this)
        ));

        this._parent._playerBoost.removeFromParent();
        this._parent._playerBoost = null;
    },

    getSpriteFileNames: function (armourLevel) {
        switch (armourLevel) {
            case 1:
                return {'sprite': s_player, 'plist': s_player_plist};
            case 2:
                return {'sprite': s_player2, 'plist': s_player2_plist};
            default:
                return {'sprite': s_player, 'plist': s_player_plist};
        }
    },

    getBulletFileName: function (armourLevel) {
        switch (armourLevel) {
            case 1:
                return s_player_bullet;
            case 2:
                return s_player2_bullet;
            default:
                return s_player_bullet;
        }
    },

    consumePowerUp: function (powerUp) {
        powerUp.isConsumed = true;
        this._powerUp = powerUp;
        if (this._powerUp.type == 1) {
            this._parent._enemyTotalFireWait = 3;
        }
    }
});