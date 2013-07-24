STATE_PLAYING = 1;
STATE_PAUSED = 2;
STATE_GAMEOVER = 3;
Z_SCROLL = 10;
Z_MOUNTAINS = 0;
MOVEMENT_SPEED = 0.05;
LOCATION_CHANGE_FACTOR = 10000;
LANDMARK_PLACEMENT_FACTOR = 2000;

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
        _damageRed: null,
        _time: 0,
        _enemies: [],
        _blasts: [],
        _currentQuestion: 0,
        _powerUp: null,
        _powerUpDistance: -1,

        _enemiesHit: 0,
        _targetsDestroyed: 0,
        _totalEnemiesDestroyed: 0,
        _fireCount: 0,

        _enemyTotalFireWait: 2,
        _enemyLifeTime: 0,
        _enemyVerticalSpeed: 80,
        _enemyVerticalSpeedIncreaseFactor: 2,
        _enemyRunSpeed: 700,
        _enemyRunSpeedFactor: 50,

        _isTargetDestroyed: false,
        _isEnemyPresent: false,
        _isEnemyFireEnabled: false,
        _isEnemyInAttackMode: false,

        _playerHitLocationY: 0,
        _cloudParallax: null,
        _interchangeableParallax: null,
        _horizon1Parallax:null,
        _building1Parallax:null,
        _buildingParallax:null,
        _buildingFrontParallax:null,
        _distanceTravelled:0,
        _gameSate:null,
        _hudLayer:null,
         _layerSpeed: 100,
         _layerSpeedIncreaseFactor: 20,
        _location:0,

        init: function (scene, game_state) {
            var bRet = false;
            if (this._super()) {
                this._location = g_locations[PLAYERCURRENTLOCATION];
                this.initLocation(scene);
                this.initCloudLayer(scene);
                this.initHorizonLayer(scene);
                this.initBuilding1Layer(scene);
                this.initBuilding2Layer(scene);
                this.initPlayer();
                this.initBuildingFrontLayer(scene);
                this.initRainLayer(scene);
                this.initHudLayer(scene);
                this.enableEvents();
                this.scheduleUpdate();
                this._gameSate = game_state;
                this._enemies = [];

                bRet = true;
            }
            sys.dumpRoot();
            sys.garbageCollect();
            return bRet;
        },

        initLocation: function (scene) {
            var staticParallaxLayer = cc.Layer.create();
            var staticBackground = cc.Sprite.create(this._location.background);
            staticBackground.setAnchorPoint(cc.p(0,0));
            staticParallaxLayer.addChild(staticBackground);
            scene.addChild(staticParallaxLayer);
        },

        initCloudLayer: function (scene) {
            this._cloudParallax = CloudParallaxLayer.create(g_clouds);
            this._cloudParallax.setAnchorPoint(cc.p(0, 0));
            scene.addChild(this._cloudParallax);
        },

        initHorizonLayer: function (scene) {
            this._horizon1Parallax = CommonParallaxLayer.create(this._location.horizon);
            this._horizon1Parallax.setAnchorPoint(cc.p(0,0));
            scene.addChild(this._horizon1Parallax);
        },

        initBuilding1Layer: function (scene) {
            this._building1Parallax = Building1ParallaxLayer.create(this._location.building1,0);
            this._building1Parallax.setAnchorPoint(cc.p(0, 0));
            scene.addChild(this._building1Parallax);
        },

        initBuilding2Layer: function (scene) {
            this._buildingParallax = BuildingParallaxLayer.create(this._location.building2, this._location.specialBuilding, LANDMARK_PLACEMENT_FACTOR);
            this._buildingParallax.setAnchorPoint(cc.p(0, 0));
            scene.addChild(this._buildingParallax);
        },

        initBuildingFrontLayer: function (scene) {
            this._buildingFrontParallax = Building1ParallaxLayer.create(this._location.buildingFront,800);
            this._buildingFrontParallax.setAnchorPoint(cc.p(0, 0));
            scene.addChild(this._buildingFrontParallax,50);
        },

        initRainLayer: function(scene){
            var rainLayer = EnvironmentLayer.create(this._location.environment);
            rainLayer.setAnchorPoint(cc.p(0,0));
            scene.addChild(rainLayer,60);
        },

        initPlayer: function () {
            this._player = new Player();
            this._player.setPosition(0 - this._player.getContentSize().width / 2, winSize.height / 2);
            this.addChild(this._player, this._player.tag);
            this._player.runAction(cc.Sequence.create(cc.MoveTo.create(1.5, cc.p(this._player.getContentSize().width / 2 + 30, winSize.height / 2))));
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
                    health:this._player.health
                });

            if(this._gameSate.state == STATE_PLAYING){
                this._time += dt;
                this._enemyLifeTime += dt;
                this._cloudParallax.update(dt*(this._layerSpeed-60));
                this._horizon1Parallax.update(dt*(this._layerSpeed-50));
                this._building1Parallax.update(dt*(this._layerSpeed-40));
                this._buildingParallax.update(dt*(this._layerSpeed-30),this._distanceTravelled);
                this._buildingFrontParallax.update(dt*(this._layerSpeed-20));

                if (this._enemies.length == 0 && this._player.alive) {
                    this.addEnemy();
                }

                if (this._powerUpDistance == 0 && this._powerUp == null) {
                    this.addPowerUp();
                }
                else if (this._powerUp != null) {
                    this._powerUp.update(dt);
                    this.detectPlayerPowerUpCollision();
                    if (this._powerUp != null) {
                        if (this._powerUp.getPositionX() < this._player.getPositionX() - this._player.getContentSize().width/2 - 30) {
                            this._powerUp.removeFromParent();
                            delete this._powerUp;
                        }
                    }
                }

                if(this._player.alive){
                    this.moveLayer(dt);
                    this._player.update(dt,this._gameSate.score);
                    this.detectPlayerCollision(dt);
                }

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
                    if (this._player.powerUp != null) {
                        if (this._player.powerUp.type == 1) {
                            this._enemyTotalFireWait = 1.25;
                        }
                    }
                }

                this.enemyFire(dt);
                this.updateBulletPosition(dt);
                this.updateEnemyBulletPosition(dt);
                this.detectEnemyCollision(dt);

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
                    this._player.shoot();
                    this._fireCount++;
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
            if (this._player.getPositionX() - this._player.getContentSize().width / 2 + winSize.width - 30 <= enemyLocation) {
                this.setPositionX(this.getPositionX() - (this._layerSpeed * dt));
                this._player.setPositionX(this._player.getPositionX() + (this._layerSpeed * dt));
                if (this._damageRed)
                    this._damageRed.setPositionX(this._damageRed.getPositionX() + (this._layerSpeed * dt));
                if (this._enemiesHit == 0) {
                    this._enemyLifeTime = 0;
                }
            } else {
                if (!this._isTargetDestroyed)
                    this._isEnemyFireEnabled = true;

                if (this._powerUp != null)
                    this._powerUp.setPositionX(this._powerUp.getPositionX() - this._layerSpeed * dt);
            }
        },

        addPowerUp: function() {
            var powerType = getRandomInt(1,3);
            this._powerUp = new PowerUp(powerType, 15);
            this._powerUp.setPosition(this._player.getPositionX() - this._player.getContentSize().width/2 + 1000, getRandomInt(60, 580));
            this.addChild(this._powerUp);
            this._powerUpDistance--;
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
                var enemyLife = Math.floor(this._currentQuestion / 7) + 1;
                enemyLife = (enemyLife > 3) ? 3 : enemyLife;

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
                var enemy = new Enemy(enemyValue, enemyLife);

                var minY = ((winSize.height / totalEnemies) * i) + 30;
                var maxY = ((winSize.height / totalEnemies) * (i + 1)) - enemy.getContentSize().height - 30;
                var actualY = getRandomInt(minY, maxY);
                enemy.setPosition(this._player.getPositionX() + (winSize.width * 1.25) + enemy.getContentSize().width + xDisplacement, actualY);
                if (i == targetEnemy) {
                    this._hudLayer.setQuestionTitle(enemy.value);
                    enemy.isTarget = true;
                }
                enemy.configure();
                this.addChild(enemy);
                this._enemies.push(enemy);
            }

            this._isEnemyFireEnabled = false;
            this._enemiesHit = 0;
            this._enemyTotalFireWait = 2;
            this._layerSpeed += this._layerSpeedIncreaseFactor;
            this._enemyVerticalSpeed += this._enemyVerticalSpeedIncreaseFactor;
            this._enemyRunSpeed += this._enemyRunSpeedFactor;
            this._currentQuestion++;
            this._powerUpDistance--;

            if (this._powerUpDistance < 0) {
                this._powerUpDistance = getRandomInt(4,6);
            }

            if (this._player._powerUp != null) {
                if (this._player._powerUp.type == 1) {
                    this._enemyTotalFireWait = 3;
                }
            }
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
            var reductionFactor = 1;
            if (this._player.powerUp != null) {
                if (this._player.powerUp.type == 1) {
                    reductionFactor = 4;
                }
            }
            for (var i = 0; i < this._enemies.length; i++) {
                var enemy = this._enemies[i];
                for (var j = 0; j < enemy.bullets.length; j++) {
                    var bullet = enemy.bullets[j];
                    if (bullet.getPositionX() - this._player.getPositionX() + this._player.getContentSize().width < 0) {
                        cc.ArrayRemoveObject(enemy.bullets, bullet);
                        bullet.removeFromParent();
                    }

                    if (this._isEnemyInAttackMode) {
                        bullet.setPositionX(bullet.getPositionX() - ((enemy.bulletSpeed + this._layerSpeed/4 * 0.1)* dt * 1.5)/reductionFactor);
                    } else {
                        bullet.setPositionX(bullet.getPositionX() - ((enemy.bulletSpeed + this._layerSpeed/4 * 0.1) * dt)/reductionFactor);
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
                            if (enemy.isTarget || this._enemyLifeTime > 8) {
                                if (!enemy.hitSurvive()) {
                                    if (enemy.isTarget) {
                                        this._gameSate.score += 25;
                                        this._isTargetDestroyed = true;
                                        this._enemyLifeTime = 9;
                                        this._targetsDestroyed++;

                                        if (this._targetsDestroyed > 0 && this._targetsDestroyed % 10 == 0)
                                            cc.AudioEngine.getInstance().playEffect(s_wildLaughEffect);
                                    }
                                    enemy.die();
                                    this._totalEnemiesDestroyed++;
                                    cc.ArrayRemoveObject(this._enemies, enemy);
                                    enemy.removeFromParent();
                                }
                            } else {
                                if (this._enemyLifeTime < 6) {
                                    this._enemyLifeTime = 6;
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
            var reductionFactor = 1;
            if (this._player.powerUp != null) {
                if (this._player.powerUp.type == 1) {
                    reductionFactor = 4;
                }
            }
            for (var j = 0; j < this._enemies.length; j++) {
                var enemy = this._enemies[j];
                if (enemy.getPositionX() + enemy.getContentSize().width / 2 < this._player.getPositionX() - this._player.getContentSize().width / 2) {
                    enemy.removeFromParent();
                    cc.ArrayRemoveObject(this._enemies, enemy);
                }
                else {
                    if (enemy.getPositionY() >= this._playerHitLocationY) {
                        enemy.setPositionY(enemy.getPositionY() - (enemy.getPositionY() - this._playerHitLocationY) / (this._enemyRunSpeed * dt)/reductionFactor);
                    } else {
                        enemy.setPositionY(enemy.getPositionY() + (this._playerHitLocationY - enemy.getPositionY()) / (this._enemyRunSpeed * dt)/reductionFactor);
                    }
                    enemy.setPositionX(enemy.getPositionX() - (this._enemyRunSpeed * dt)/reductionFactor);
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
                    enemy.die();
                    enemy.removeFromParent();
                    cc.ArrayRemoveObject(this._enemies, enemy);
                    cc.AudioEngine.getInstance().playEffect(s_playerGetsHitEffect);
                    if (this._enemies.length == 0) {
                        this._isTargetDestroyed = false;
                    }
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
                this._damageRed = cc.Sprite.create(s_damageRed);
                this._damageRed.setAnchorPoint(new cc.p(0,0));
                this._damageRed.setPositionX(this._player.getPositionX() - this._player.getContentSize().width/2 - 30);
                this.addChild(this._damageRed);

                this._damageRed.runAction(
                    cc.Sequence.create(
                        cc.Blink.create(0.8,5),
                        cc.CallFunc.create(function() {
                            this._damageRed.removeFromParent();
                        }, this)
                    )
                );

            }
        },

        detectPlayerPowerUpCollision: function() {
            var playerRect = this._player.getBoundingBox();
            var powerUpRect = this._powerUp.getBoundingBox();

            if (cc.rectIntersectsRect(playerRect, powerUpRect)) {
                this._player.powerUp = this._powerUp;
                this._player.consumePowerUp(this._powerUp);
                this._powerUp.removeFromParent();
                delete this._powerUp;
            }
        }
    }
);

GameLayer.create = function (scene) {
    var sg = new GameLayer();
    if (sg && sg.init(scene, new GameState())) {
        return sg;
    }
    return null;
};