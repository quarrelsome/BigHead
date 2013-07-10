STATE_PLAYING = 1;
STATE_PAUSED = 2;
STATE_GAMEOVER = 3;
Z_SCROLL = 10;
Z_MOUNTAINS = 0;
MOVEMENT_SPEED = 0.05;
LOCATION_CHANGE_FACTOR = 10000;
LANDMARK_PLACEMENT_FACTOR = 2000;

ENEMY_VERTICAL_SPEED = 80;
ENEMY_VERTICAL_SPEED_INCREASE_FACTOR = 2;
ENEMY_WAIT_TIME_FACTOR = 0;
ENEMY_RUN_SPEED = 700;
ENEMY_RUN_SPEED_FACTOR = 50;

//
// Game State
//
var GameState = function () {
    this.score = 0;
    this.state = STATE_PAUSED;
};
GameState.prototype.reset = function () {
    this.score = 0;
    this.state = STATE_PAUSED;
};

var GameLayer = cc.Layer.extend({
        _player: null,
        _time: 0,
        _enemies: [],
        _blasts: [],
        _currentQuestion: 0,

        _enemiesHit: 0,
        _targetsDestroyed: 0,
        _enemyTotalFireWait: 2,
        _enemyLifeTime: 0,

        _isTargetDestroyed: false,
        _isWrongEnemyDestroyed: false,
        _isEnemyPresent: false,
        _isEnemyFireEnabled: false,
        _isEnemyInAttackMode: false,

        _playerHitLocationY: 0,
        _cloudParallax: null,
        _interchangeableParallax: null,
        _horizon1Parallax:null,
        _horizon2Parallax:null,
        _trees1Parallax:null,
        _buildingParallax:null,
        _trees2Parallax:null,
        _distanceTravelled:0,
        _gameSate:null,
        _hudLayer:null,
         _layerSpeed: 100,
         _layerSpeedIncreaseFactor: 40,
        _location:0,

        init: function (scene, game_state) {
            var bRet = false;
            if (this._super()) {
                this._location = getRandomInt(0,g_sky.length-1);
                this.initStaticLayer(scene);
                this.initInterchangeableLayer(scene);
                this.initCloudLayer(scene);
                this.initCommonLayer(scene);
                this.initBuildingLayer(scene);
                this.initPlayer();
                this.initTreeLayer(scene);
                this.initRainLayer(scene);
                this.initHudLayer(scene);
                this.enableEvents();
                this.scheduleUpdate();
                this._gameSate = game_state;

                bRet = true;
            }
            sys.dumpRoot();
            sys.garbageCollect();
            return bRet;
        },

        initStaticLayer: function (scene) {
            var staticParallaxLayer = cc.Layer.create();
            var staticBackground = cc.Sprite.create(s_backgeound);
            staticBackground.setAnchorPoint(cc.p(0,0));
            staticParallaxLayer.addChild(staticBackground);
            scene.addChild(staticParallaxLayer);
        },

        initInterchangeableLayer: function(scene){
            this._interchangeableParallax = InterchangeableParallaxLayer.create(g_sky,LOCATION_CHANGE_FACTOR);
            this._interchangeableParallax.setAnchorPoint(cc.p(0,0));
            scene.addChild(this._interchangeableParallax);
        },

        initCloudLayer: function (scene) {
            this._cloudParallax = CloudParallaxLayer.create(g_clouds);
            this._cloudParallax.setAnchorPoint(cc.p(0, 0));
            scene.addChild(this._cloudParallax);
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

        initBuildingLayer: function (scene) {
            this._buildingParallax = BuildingParallaxLayer.create(g_buildings, this._location+1, LANDMARK_PLACEMENT_FACTOR);
            this._buildingParallax.setAnchorPoint(cc.p(0, 0));
            scene.addChild(this._buildingParallax);
        },

        initTreeLayer: function(scene){
            this._trees2Parallax = CommonParallaxLayer.create(s_tree2);
            this._trees2Parallax.setAnchorPoint(cc.p(0,0));
            scene.addChild(this._trees2Parallax,90);
        },

        initRainLayer: function(scene){
            var rainLayer = EnvironmentLayer.create(g_environments[0].src);
            rainLayer.setAnchorPoint(cc.p(0,0));
            scene.addChild(rainLayer);
        },

        initPlayer: function () {
            this._player = new Player();
            this._player.setPosition(0 - this._player.getContentSize().width / 2, winSize.height / 2);
            this.addChild(this._player, this._player.tag);
            this._player.runAction(cc.Sequence.create(cc.MoveTo.create(1.5, cc.p(this._player.getContentSize().width / 2 + 10, winSize.height / 2))));
        },

        initHudLayer: function(scene){
            this._hudLayer = GameControlMenu.create(STATE_PLAYING);
            this._hudLayer.setAnchorPoint(cc.p(0,0));
            scene.addChild(this._hudLayer,this._hudLayer._tag);
        },

        update: function (dt) {
            if (this._distanceTravelled >= 29000) {
                this._gameSate.state = STATE_GAMEOVER;
                var scene = cc.Scene.create();
                scene.addChild(GameOver.create(true));
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
            }

            if(this._player.currentState==3){
                this._gameSate.state = STATE_GAMEOVER;
            }

            if(this._gameSate.state != STATE_GAMEOVER)
                this._gameSate.state = this._hudLayer.update(dt,{
                    score:this._gameSate.score,
                    travelledDistance:this._distanceTravelled,
                    health:this._player.health,
                    question: this._currentQuestion
                });

            if(this._gameSate.state == STATE_PLAYING){
                this._time += dt;
                this._enemyLifeTime += dt;
                this._interchangeableParallax.update(dt,this._distanceTravelled);
                this._cloudParallax.update(dt*(this._layerSpeed-60));
                this._horizon1Parallax.update(dt*(this._layerSpeed-50));
                this._horizon2Parallax.update(dt*(this._layerSpeed-40));
                this._trees1Parallax.update(dt*(this._layerSpeed-30));
                this._buildingParallax.update(dt*(this._layerSpeed-20),this._distanceTravelled);
                this._trees2Parallax.update(dt*(this._layerSpeed-10));

                if (this._enemies.length == 0) {
                    this.addEnemy();
                }

                this.moveLayer(dt);
                this._player.update(dt);
                for (var i=0; i < this._enemies.length; i++) {
                    this._enemies[i].update(dt);
                }

                if (this._enemyLifeTime > 9) {
                    if (this._isEnemyInAttackMode) {
                        this._isEnemyInAttackMode = false;
                        this._playerHitLocationY = this._player.getPositionY();
                    }
                    this.enemyRun(dt);
                }
                else if (this._enemyLifeTime > 8) {
                    this._isEnemyFireEnabled = false;
                }
                else if (this._enemyLifeTime > 6) {
                        this._isEnemyInAttackMode = true;
                        this._enemyTotalFireWait = 0.75;
                }

                //this.detectCollision(dt);
                this.enemyFire(dt);
                this.updateBulletPosition(dt);
                this.updateEnemyBulletPosition(dt);

                this.detectPlayerCollision(dt);
                this.detectEnemyCollision(dt);
                if (this._isTargetDestroyed) {
                    this.enemyRun(dt);
                }

                this._distanceTravelled = this._distanceTravelled + Math.round(this._layerSpeed * dt);
            }
        },

        onEnterTransitionDidFinish:function () {
            this._gameSate.state = STATE_PLAYING;
        },

        onKeyDown: function (e) {
            if (e == cc.KEY.down) {
                if (this._player.speedBoost < 0.15)
                    this._player.speedBoost += 0.05;
                KEYS[e] = true;
            }
            if (e == cc.KEY.up) {
                if (this._player.speedBoost < 0.15)
                    this._player.speedBoost += 0.05;
                KEYS[e] = true;
            }
            if (e == cc.KEY.space) {
                KEYS[e] = true;
                if (this._player.fireWait <= 0) {
                    this.addChild(this._player.shoot());
                    cc.AudioEngine.getInstance().playEffect(s_playerShootEffect);
                    this._player.fireWait = 0.3;
                }
            }
        },

        onKeyUp: function (e) {
            if (e == cc.KEY.down) {
                this._player.speedBoost = 0;
                KEYS[e] = false;
            }
            if (e == cc.KEY.up) {
                this._player.speedBoost = 0;
                KEYS[e] = false;
            }
            if (e == cc.KEY.space) {
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
            var enemyLocation = this._enemies[0].getPositionX() + this._enemies[0].getContentSize().width;

            if (this._enemies.length > 1) {
                for (var i = 1; i < this._enemies.length; i++) {
                    var otherEnemyLocation = this._enemies[i].getPositionX() + this._enemies[i].getContentSize().width;
                    if (otherEnemyLocation > enemyLocation)
                        enemyLocation = otherEnemyLocation;
                }
            }
            if (this._player.getPositionX() - this._player.getContentSize().width / 2 + winSize.width <= enemyLocation) {
                this.setPositionX(this.getPositionX() - (this._layerSpeed * dt));
                this._player.setPositionX(this._player.getPositionX() + (this._layerSpeed * dt));
                if (this._enemiesHit == 0) {
                    this._enemyLifeTime = 0;
                }
            } else {
                if (!this._isTargetDestroyed)
                    this._isEnemyFireEnabled = true;
            }
        },

        addEnemy: function () {
            for (var i = 0; i < this._player.bullets; i++) {
                var bullet = this._player.bullets[i];
                cc.ArrayRemoveObject(this._player.bullets, bullet);
                bullet.removeFromParent();
            }

            var totalEnemies = getRandomInt(2, 3);
            var targetEnemy = getRandomInt(0,totalEnemies-1);
            var enemyValues = [];
            var unique = true;

            for (i = 0; i < totalEnemies; i++) {
                var xDisplacement = Math.floor((Math.random() * winSize.width * 0.15 + 1) + 0);
                var enemyValue = 0;

                do {
                    unique = true;
                    if (this._targetsDestroyed < 5)
                        enemyValue = getRandomInt(0, 9);
                    else
                        enemyValue = getRandomInt(10, 99);

                    for (i = 0; i < enemyValues.length; i++) {
                        if (enemyValues[i] == enemyValue)
                            unique = false;
                    }
                }
                while (!unique);

                enemyValues.push(enemyValue);
                var enemy = new Enemy(enemyValue);

                //var minY = enemy.getContentSize().height / 2 + BarSize.bottomBar.height + ((winSize.height - BarSize.bottomBar.height - BarSize.topBar.height) / totalEnemies * i) + 30;
                //var maxY = BarSize.bottomBar.height + ((winSize.height - BarSize.bottomBar.height - BarSize.topBar.height - enemy.getContentSize().height / 2) / totalEnemies * (i + 1)) - 30;

                var minY = ((winSize.height / totalEnemies) * i) + 30;
                var maxY = ((winSize.height / totalEnemies) * (i + 1)) - enemy.getContentSize().height - 30;
                var actualY = getRandomInt(minY, maxY);
                enemy.setPosition(this._player.getPositionX() + (winSize.width * 1.25) + enemy.getContentSize().width + xDisplacement, actualY);
                if (i == targetEnemy) {
                    this._currentQuestion = enemy.value;
                    enemy.isTarget = true;
                }
                enemy.configure();
                this.addChild(enemy);
                this._enemies.push(enemy);
            }

            this._isEnemyFireEnabled = false;
            this._isWrongEnemyDestroyed = false;
            this._enemyTotalFireWait = 2;
            this._enemiesHit = 0;
            this._layerSpeed += this._layerSpeedIncreaseFactor;
            ENEMY_WAIT_TIME_FACTOR += ENEMY_VERTICAL_SPEED_INCREASE_FACTOR;
            ENEMY_VERTICAL_SPEED += ENEMY_VERTICAL_SPEED_INCREASE_FACTOR;
            ENEMY_RUN_SPEED += ENEMY_RUN_SPEED_FACTOR;
        },

        updateBulletPosition: function (dt) {
            for (var i = 0; i < this._player.bullets.length; i++) {
                var bullet = this._player.bullets[i];
                if (bullet.getPositionX() - this._player.getPositionX() > winSize.width) {
                    cc.ArrayRemoveObject(this._player.bullets, bullet);
                    bullet.removeFromParent();
                }
                bullet.setPositionX(bullet.getPositionX() + (this._player.bulletSpeed * dt));
            }
        },

        updateEnemyBulletPosition: function (dt) {
            for (var i = 0; i < this._enemies.length; i++) {
                var enemy = this._enemies[i];
                for (var j = 0; j < enemy.bullets.length; j++) {
                    var bullet = enemy.bullets[j];
                    if (bullet.getPositionX() - this._player.getPositionX() + this._player.getContentSize().width < 0) {
                        cc.ArrayRemoveObject(enemy.bullets, bullet);
                        bullet.removeFromParent();
                    }

                    if (this._isEnemyInAttackMode) {
                        bullet.setPositionX(bullet.getPositionX() - (enemy.bulletSpeed * dt * 1.5));
                    } else {
                        bullet.setPositionX(bullet.getPositionX() - (enemy.bulletSpeed * dt));
                    }
                }
            }
        },

        enemyFire: function (dt) {
            if (this._isEnemyFireEnabled) {
                for (var i = 0; i < this._enemies.length; i++) {
                    var enemy = this._enemies[i];
                        if (enemy.fireWaitCompleted < this._enemyTotalFireWait) {
                            enemy.fireWaitCompleted += dt;
                        }
                        else {
                            this.addChild(enemy.shoot());
                            cc.AudioEngine.getInstance().playEffect(s_enemyShootEffect);
                            enemy.fireWaitCompleted = 0;
                        }
                }
            }
        },

        detectEnemyCollision: function (dt) {
            for (var i = 0; i < this._player.bullets.length; i++) {
                var bullet = this._player.bullets[i];
                //var bulletRect = bullet.getBoundingBox();
                var bulletRect = new cc.Rect(
                    bullet.getPositionX() - bullet.getContentSize().width/2 + 20,
                    bullet.getPositionY() - bullet.getContentSize().height/2 + 10,
                    bullet.getContentSize().width - 40,
                    bullet.getContentSize().height - 20
                );
                for (var j = 0; j < this._enemies.length; j++) {
                    var enemy = this._enemies[j];
                    var enemyRect = enemy.getBoundingBox();
                    if (this._player.getPositionX() - this._player.getContentSize().width / 2 + winSize.width > enemy.getPositionX()) {
                        if (cc.rectIntersectsRect(bulletRect, enemyRect)) {
                            if (enemy.isTarget) {
                                this._gameSate.score += 25;
                                this._isTargetDestroyed = true;
                                this._targetsDestroyed++;
                                if (this._targetsDestroyed > 0 && this._targetsDestroyed % 10 == 0)
                                    cc.AudioEngine.getInstance().playEffect(s_wildLaughEffect);

                                var blast = cc.Sprite.create(s_explosion);
                                blast.setPosition(enemy.getPositionX(), enemy.getPositionY());
                                this.addChild(blast);
                                cc.AudioEngine.getInstance().playEffect(s_enemyDestroyedEffect);
                                blast.runAction(cc.Sequence.create(cc.FadeOut.create(0.5),
                                    cc.CallFunc.create(function (blast) {
                                        blast.removeFromParent();
                                    }, this)
                                ));
                                cc.ArrayRemoveObject(this._enemies, enemy);
                                enemy.removeFromParent();
                            } else {
                                if (!this._isWrongEnemyDestroyed && this._enemiesHit == 0) {
                                    this._enemyLifeTime = 6;
                                    this._isWrongEnemyDestroyed = true;
                                }
                                enemy.blinkNumber = 16;
                            }
                            cc.ArrayRemoveObject(this._player.bullets, bullet);
                            bullet.removeFromParent();

                            if (this._enemiesHit == 0) {
                                this._playerHitLocationY = this._player.getPositionY();
                            }
                            this._isEnemyFireEnabled = false;

                            this._enemiesHit++;
                        }
                    }
                }
            }
        },

        enemyRun: function (dt) {
            this._isEnemyFireEnabled = false;
            for (var j = 0; j < this._enemies.length; j++) {
                var enemy = this._enemies[j];
                if (enemy.getPositionX() + enemy.getContentSize().width / 2 < this._player.getPositionX() - this._player.getContentSize().width / 2) {
                    enemy.removeFromParent();
                    cc.ArrayRemoveObject(this._enemies, enemy);
                }
                else {
                    if (enemy.getPositionY() >= this._playerHitLocationY) {
                        enemy.setPositionY(enemy.getPositionY() - (enemy.getPositionY() - this._playerHitLocationY) / (ENEMY_RUN_SPEED * dt));
                    } else {
                        enemy.setPositionY(enemy.getPositionY() + (this._playerHitLocationY - enemy.getPositionY()) / (ENEMY_RUN_SPEED * dt));
                    }
                    enemy.setPositionX(enemy.getPositionX() - (ENEMY_RUN_SPEED * dt));
                }
            }

            if (this._enemies.length == 0) {
                this._isTargetDestroyed = false;
            }
        },

        detectPlayerCollision: function (dt) {
            var playerRect = this._player.getBoundingBox();
            var playerHit = false;
            for (var i = 0; i < this._enemies.length; i++) {
                var enemy = this._enemies[i];
                var enemyRect = enemy.getBoundingBox();
                if ((cc.rectIntersectsRect(playerRect, enemyRect)) && (this._player.blinkNumber == 0)) {
                    enemy.removeFromParent();
                    cc.ArrayRemoveObject(this._enemies, enemy);
                    cc.AudioEngine.getInstance().playEffect(s_playerGetsHitEffect);
                    if (this._enemies.length == 0) {
                        this._isTargetDestroyed = false;
                    }
                    var blast = cc.Sprite.create(s_explosion);
                    blast.setPosition(enemy.getPositionX(), enemy.getPositionY());
                    this.addChild(blast);
                    blast.runAction(cc.Sequence.create(cc.FadeOut.create(0.5),
                        cc.CallFunc.create(function (blast) {
                            blast.removeFromParent();
                        })
                    ));
                    playerHit = true;
                }

                for (var j = 0; j < enemy.bullets.length; j++) {
                    var bullet = enemy.bullets[j];
                    //var bulletRect = bullet.getBoundingBox();
                    var bulletRect = new cc.Rect(
                        bullet.getPositionX() - bullet.getContentSize().width/2 + 20,
                        bullet.getPositionY() - bullet.getContentSize().height/2 + 10,
                        bullet.getContentSize().width - 40,
                        bullet.getContentSize().height - 20
                    );

                    if ((cc.rectIntersectsRect(playerRect, bulletRect)) && (this._player.blinkNumber == 0)) {
                        cc.ArrayRemoveObject(enemy.bullets, bullet);
                        bullet.removeFromParent();
                        cc.AudioEngine.getInstance().playEffect(s_playerGetsHitEffect);
                        playerHit = true;
                    }
                }

            }
            if (playerHit) {
                this._player.hit();
            }
        }

        /*detectCollision: function (dt) {
         var isTargetHitNow = false;
         for (var i = 0; i < this._player.bullets.length; i++) {
         var bullet = this._player.bullets[i];
         var bulletRect = bullet.getBoundingBox();
         for (var j = 0; j < this._enemies.length; j++) {
         var enemy = this._enemies[j];
         var enemyRect = enemy.getBoundingBox();
         if (cc.rectIntersectsRect(bulletRect, enemyRect)) {
         this._gameSate.score += 25;
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
         cc.AudioEngine.getInstance().playEffect(s_enemyDestroyedEffect);
         blast.runAction(cc.Sequence.create(cc.FadeOut.create(0.5),
         cc.CallFunc.create(function(blast) {
         blast.removeFromParent();
         }, this)
         ));
         cc.ArrayRemoveObject(this._enemies, enemy);
         enemy.removeFromParent();

         this._enemiesHit++;
         this._layerSpeed+=this._layerSpeed_INCREASE_FACTOR;
         ENEMY_VERTICAL_SPEED += ENEMY_SPEED_INCREASE_FACTOR;
         ENEMY_RUN_SPEED += ENEMY_RUN_SPEED_FACTOR;
         }
         }
         }

         if (this._isTargetDestroyed) {
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
         enemy.setPositionX(enemy.getPositionX() - (ENEMY_RUN_SPEED * dt));
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
         if ((cc.rectIntersectsRect(playerRect, enemyRect)) && (this._player.blinkNumber == 0)) {
         this._player.hit();
         cc.AudioEngine.getInstance().playEffect(s_playerGetsHitEffect);
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
         this._player.blinkNumber = 16;
         }

         for (j = 0; j < enemy.bullets.length; j++) {
         bullet = enemy.bullets[j];
         bulletRect = bullet.getBoundingBox();
         if ((cc.rectIntersectsRect(playerRect, bulletRect))  && (this._player.blinkNumber == 0)) {
         this._player.hit();
         cc.AudioEngine.getInstance().playEffect(s_playerGetsHitEffect);
         cc.ArrayRemoveObject(enemy.bullets, bullet);
         bullet.removeFromParent();
         this._player.life -= 1;
         this._player.blinkNumber = 16;
         }
         }
         }
         }*/
    }
);

GameLayer.create = function (scene) {
    var sg = new GameLayer();
    if (sg && sg.init(scene, new GameState())) {
        return sg;
    }
    return null;
};