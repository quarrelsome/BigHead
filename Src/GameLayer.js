STATE_PLAYING = 0;
STATE_PAUSED = 1;
STATE_GAMEOVER = 2;
Z_SCROLL = 10;
Z_MOUNTAINS = 0;
MOVEMENT_SPEED = 0.05;
LAYER_SPEED = 100;
LAYER_SPEED_INCREASE_FACTOR = 20;
SKY_CHANGE_FACTOR = 5000;

var GameLayer = cc.Layer.extend({
        _player: null,
        _time: 0,
        _enemies: [],
        _blasts: [],

        _enemiesDestroyed: 0,
        _targetsDestroyed: 0,

        _enemyTotalFireWait: 0.5,
        _isTargetDestroyed: false,
        _isEnemyPresent: false,

        _isFireEnabled: false,
        _isEnemyFireEnabled: false,

        _cloudParallax: null,
        _interchangeableParallax: null,
        _horizon1Parallax:null,
        _horizon2Parallax:null,
        _trees1Parallax:null,
        _buildingParallax:null,
        _distanceTravelled:0,

        init: function (scene) {
            var bRet = false;
            if (this._super()) {
                this.initStaticLayer(scene);
                this.initInterchangeableLayer(scene);
                this.initCloudLayer(scene);
                this.initCommonLayer(scene);
                this.initBuildingLayer(scene);
                this.initPlayer();
                this.enableEvents();
                this.scheduleUpdate();
                bRet = true;

                sys.dumpRoot();
                sys.garbageCollect();
            }
            return bRet;
        },

        initStaticLayer: function (scene) {
            var staticParallaxLayer = cc.Layer.create();
            var staticBackground = cc.Sprite.create(s_backgeound);
            staticBackground.setAnchorPoint(cc.p(0,0));
            staticBackground.setPosition(winSize.width / 2, winSize.height / 2);
            staticParallaxLayer.addChild(staticBackground);
            scene.addChild(staticParallaxLayer);
        },

        initInterchangeableLayer: function(scene){
            this._interchangeableParallax = InterchangeableParallaxLayer.create(g_sky, SKY_CHANGE_FACTOR);
            this._interchangeableParallax.setAnchorPoint(cc.p(0,0));
            scene.addChild(this._interchangeableParallax);
        },

        initCloudLayer: function (scene) {
            this._cloudParallax = CloudParallaxLayer.create(g_clouds);
            this._cloudParallax.setAnchorPoint(cc.p(0, 0));
            scene.addChild(this._cloudParallax);
        },

        initBuildingLayer: function (scene) {
            this._buildingParallax = BuildingParallaxLayer.create(g_buildings);
            this._buildingParallax.setAnchorPoint(cc.p(0, 0));
            scene.addChild(this._buildingParallax);
        },

        initCommonLayer: function (scene) {
            this._horizon1Parallax = CommonParallaxLayer.create(s_horizon1);
            this._horizon1Parallax.setAnchorPoint(cc.p(0,0));
            scene.addChild(this._horizon1Parallax);

            this._horizon2Parallax = CommonParallaxLayer.create(s_horizon2);
            this._horizon2Parallax.setAnchorPoint(cc.p(0,0));
            scene.addChild(this._horizon2Parallax);

            this._trees1Parallax = CommonParallaxLayer.create(s_tree1);
            this._trees1Parallax.setAnchorPoint(cc.p(0,0));
            scene.addChild(this._trees1Parallax);
        },

        initPlayer: function () {
            this._player = new Player();
            this._player.setPosition(0 - this._player.getContentSize().width / 2, winSize.height / 2);
            this.addChild(this._player, this._player.tag);
            this._player.runAction(cc.MoveTo.create(1.5, cc.p(this._player.getContentSize().width / 2, winSize.height / 2)));
        },

        update: function (dt) {
            this._time += dt;

            this._interchangeableParallax.update(this._distanceTravelled);
            this._cloudParallax.update(dt*(LAYER_SPEED-60));
            this._horizon1Parallax.update(dt*(LAYER_SPEED-50));
            this._horizon2Parallax.update(dt*(LAYER_SPEED-40));
            this._trees1Parallax.update(dt*(LAYER_SPEED-30));
            this._buildingParallax.update(dt*(LAYER_SPEED-20));

            this._player.update(dt);
            this.moveLayer(dt);

            this.enemyFire(dt);
            this.updateBulletPosition(dt);
            this.updateEnemyBulletPosition(dt);
            this.detectCollision(dt);
        },

        onKeyDown: function (e) {
            if (e == cc.KEY.down) {
                KEYS[e] = true;
            }
            if (e == cc.KEY.up) {
                KEYS[e] = true;
            }
            if (e == cc.KEY.space) {
                if (this._isFireEnabled) {
                    this.addChild(this._player.shoot());
                }
            }
        },

        onKeyUp: function (e) {
            if (e == cc.KEY.down) {
                KEYS[e] = false;
            }
            if (e == cc.KEY.up) {
                KEYS[e] = false;
            }
        },

        enableEvents: function () {
            if ('touches' in sys.capabilities)
                this.setTouchEnabled(true);

            if ('keyboard' in sys.capabilities)
                this.setKeyboardEnabled(true);
        },

        moveLayer: function (dt) {
            if (this._enemies.length == 0) {
                this._isEnemyFireEnabled = false;
                this.addEnemy();
            }
                var enemyLocation = this._enemies[0].getPositionX() + this._enemies[0].getContentSize().width;

                if (this._enemies.length > 1) {
                    for (var i = 1; i < this._enemies.length; i++) {
                        var otherEnemyLocation = this._enemies[i].getPositionX() + this._enemies[i].getContentSize().width;
                        if (otherEnemyLocation > enemyLocation)
                            enemyLocation = otherEnemyLocation;
                    }
                }


            if ((this._enemies.length == 0) || (this._player.getPositionX() + winSize.width <= enemyLocation)) {
                this.setPositionX(this.getPositionX() - (LAYER_SPEED * dt));
                this._player.setPositionX(this._player.getPositionX() + (LAYER_SPEED * dt));
                this._distanceTravelled = Math.round(this._player.getPositionX());
            } else {
                this._isFireEnabled = true;
                if (!this._isTargetDestroyed)
                    this._isEnemyFireEnabled = true;
            }
        },

        addEnemy: function () {
            var totalEnemies = Math.floor((Math.random() * 2) + 2);
            for (var i = 0; i < totalEnemies; i++) {
                var xDisplacement = Math.floor((Math.random() * winSize.width * 0.15 + 1) + 0);
                var enemyType = Math.floor((Math.random() * 2) + 1);
                var enemy = new Enemy(enemyType);

                var minY = enemy.getContentSize().height / 2 + BarSize.bottomBar.height + ((winSize.height - BarSize.bottomBar.height - BarSize.topBar.height) / totalEnemies * i);
                var maxY = BarSize.bottomBar.height + ((winSize.height - BarSize.bottomBar.height - BarSize.topBar.height - enemy.getContentSize().height / 2) / totalEnemies * (i + 1));
                var rangeY = maxY - minY;
                var actualY = Math.floor((Math.random() * rangeY + 1) + minY);
                enemy.setPosition(this._player.getPositionX() + (winSize.width * 1.25) + enemy.getContentSize().width / 2 + xDisplacement, actualY);
                if (i == 0)
                    enemy.isTarget = true;
                this.addChild(enemy);
                this._enemies.push(enemy);
            }
        },

        removeBlast: function () {
            for (var i = 0; i < this._blasts.length; i++) {
                var blast = this._blasts[i];
                cc.ArrayRemoveObject(this._blasts, blast);
                blast.removeFromParent();
            }
        },

        updateBulletPosition: function (dt) {
            for (var i = 0; i < this._player.bullets.length; i++) {
                var bullet = this._player.bullets[i];
                if (bullet.getPositionX() - this._player.getPositionX() > winSize.width) {
                    cc.ArrayRemoveObject(this._player.bullets, bullet);
                    bullet.removeFromParent();
                }
                bullet.setPositionX(bullet.getPositionX() + ((MOVEMENT_SPEED + this._player.bulletSpeed) * dt));
            }
        },

        updateEnemyBulletPosition: function (dt) {
            for (var i = 0; i < this._enemies.length; i++) {
                var enemy = this._enemies[i];
                for (var j= 0; j < enemy.bullets.length; j++) {
                    var bullet = enemy.bullets[j];
                    if (bullet.getPositionX() - this._player.getPositionX() + this._player.getContentSize().width < 0) {
                        cc.ArrayRemoveObject(enemy.bullets, bullet);
                        bullet.removeFromParent();
                    }
                    bullet.setPositionX(bullet.getPositionX() - ((MOVEMENT_SPEED + enemy.bulletSpeed) * dt));
                }
            }
        },

        enemyFire: function (dt) {
            if (this._isEnemyFireEnabled) {
                for (var i = 0; i < this._enemies.length; i++) {
                    var enemy = this._enemies[i];
                    if (enemy.enemyFireWaitCompleted < this._enemyTotalFireWait) {
                        enemy.enemyFireWaitCompleted += dt;
                    }
                    else {
                        this.addChild(enemy.shoot());
                        enemy.enemyFireWaitCompleted = getRandomInt(-1, 0);
                    }
                }
            }
        },

        detectCollision: function (dt) {
            var isTargetHitNow = false;
            for (var i = 0; i < this._player.bullets.length; i++) {
                var bullet = this._player.bullets[i];
                var bulletRect = bullet.getBoundingBox();
                for (var j = 0; j < this._enemies.length; j++) {
                    var enemy = this._enemies[j];
                    var enemyRect = enemy.getBoundingBox();
                    if (cc.rectIntersectsRect(bulletRect, enemyRect)) {
                        if (enemy.isTarget) {
                            this._isTargetDestroyed = true;
                            isTargetHitNow = true;
                            this._targetsDestroyed++;
                        }
                        cc.ArrayRemoveObject(this._player.bullets, bullet);
                        bullet.removeFromParent();
                        var blast = cc.Sprite.create(s_explosion);
                        blast.setPosition(enemy.getPositionX(), enemy.getPositionY());
                        this.addChild(blast);
                        blast.runAction(cc.Sequence.create(cc.FadeOut.create(0.5),
                            cc.CallFunc.create(function(blast) {
                                blast.removeFromParent();
                            }, this)
                        ));
                        cc.ArrayRemoveObject(this._enemies, enemy);
                        enemy.removeFromParent();

                        this._enemiesDestroyed++;
                        LAYER_SPEED+=LAYER_SPEED_INCREASE_FACTOR;
                        if (this._targetsDestroyed >= 10) {
                            var scene = GameOver.scene(true);
                            cc.Director.getInstance().replaceScene(scene);
                        }
                    }
                }
            }

            if (this._isTargetDestroyed) {
                this._isFireEnabled = false;
                this._isEnemyFireEnabled = false;
                if (isTargetHitNow) {
                    if (this._enemies.length > 0) {
                        var closestEnemy = 0;
                        for (j = 0; j < this._enemies.length; j++) {
                            enemy = this._enemies[j];
                            enemy.playerHitLocationY = this._player.getPositionY();
                            enemy.runMoveRatioY = 0.03;
                            if (Math.abs(this._enemies[closestEnemy].playerHitLocationY - this._enemies[closestEnemy].getPositionY()) >
                                Math.abs(enemy.playerHitLocationY - enemy.getPositionY())) {
                                closestEnemy = j;
                            }
                        }
                        this._enemies[closestEnemy].runMoveRatioY = 0.07;
                    }
                }

                for (j = 0; j < this._enemies.length; j++) {
                    enemy = this._enemies[j];
                    if (enemy.getPositionX() + enemy.getContentSize().width / 2 < this._player.getPositionX() - this._player.getContentSize().width / 2) {
                        enemy.removeFromParent();
                        cc.ArrayRemoveObject(this._enemies, enemy);
                    }
                    else {
                        if (enemy.getPositionY() > enemy.playerHitLocationY) {
                            enemy.setPositionY(enemy.getPositionY() - (enemy.getPositionY() - enemy.playerHitLocationY) * enemy.runMoveRatioY);
                        } else {
                            enemy.setPositionY(enemy.getPositionY() + (enemy.playerHitLocationY - enemy.getPositionY()) * enemy.runMoveRatioY);
                        }
                        enemy.setPositionX(enemy.getPositionX() - (15*LAYER_SPEED * dt));
                    }
                }

                if (this._enemies.length == 0) {
                    this._isTargetDestroyed = false;
                }
            }

            var playerRect = this._player.getBoundingBox();
            for (i = 0; i < this._enemies.length; i++) {
                enemy = this._enemies[i];
                enemyRect = enemy.getBoundingBox();
                if (cc.rectIntersectsRect(playerRect, enemyRect)) {
                    enemy.removeFromParent();
                    cc.ArrayRemoveObject(this._enemies, enemy);
                    if (this._enemies.length == 0) {
                        this._isTargetDestroyed = false;
                    }
                    blast = cc.Sprite.create(s_explosion);
                    blast.setPosition(enemy.getPositionX(), enemy.getPositionY());
                    this.addChild(blast);
                    blast.runAction(cc.Sequence.create(cc.FadeOut.create(0.5),
                        cc.CallFunc.create(function(blast) {
                            blast.removeFromParent();
                        })
                    ));
                    this._player.life -= 1;
                    this._player.runAction(cc.Blink.create(0.5, 3));
                }

                for (j = 0; j < enemy.bullets.length; j++) {
                    bullet = enemy.bullets[j];
                    bulletRect = bullet.getBoundingBox();
                    if (cc.rectIntersectsRect(playerRect, bulletRect)) {
                        cc.ArrayRemoveObject(enemy.bullets, bullet);
                        bullet.removeFromParent();
                        this._player.life -= 1;
                        this._player.runAction(cc.Blink.create(0.5,3));
                    }
                }
            }
        }
    }
);

GameLayer.create = function (scene) {
    var sg = new GameLayer();
    if (sg && sg.init(scene)) {
        return sg;
    }
    return null;
};