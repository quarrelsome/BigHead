var Player = cc.Sprite.extend({
    health : 100,
    hitImpact: 20,
    armour: 0,
	speed: 150,
    speedBoost: 0,
    dropSpeed: 30,
	bulletSpeed: 900,
	tag: 1,
    bullets: [],
    //isBlinking: false,
    blinkNumber: 0,
    spriteFrameIndex: 0,
    fireWait: 0.75,
    currentState: 0,

	ctor: function() {
        this._super();
        this.setTag(this.tag);

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_player_plist, s_player);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_player_spawn_plist, s_player_spawn);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_player_fire_plist, s_player_fire);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_player_die_plist, s_player_die);

        this.initWithSpriteFrameName("player_spawn_0.png");

        var spawnAnimationFrames = [];
        for (var i = 0; i < 36; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame('player_spawn_'+ i +'.png');
            spawnAnimationFrames.push(frame);
        }

        var animation = cc.Animation.create(spawnAnimationFrames, 0.1);
        var animate = cc.Animate.create(animation);
        this.runAction(cc.Sequence.create(animate,
            cc.CallFunc.create(function() {
                this.currentState = 1;
            }, this)
        ));
	},
	
	update:function (dt) {
        if (this._parent._time % 0.1 < 0.05) {
            if (this.currentState == 1 || this.currentState == 2)
                this.changeFrame();
        }

        this.updatePosition(dt);

        if (this.fireWait > 0) {
            this.fireWait -= dt;
        }
        if (this.blinkNumber > 0) {
            this.blink();
        }

        if(this.health>0 && this.health<=20)
            cc.AudioEngine.getInstance().playEffect(s_playerLowLifeEffect);
	},

    updatePosition: function(dt) {
        var position = this.getPosition();
        if (KEYS[cc.KEY.up]) {
            var nextPositionY = position.y + (dt * this.speed) + (this.speedBoost * this.speed);
            if (nextPositionY + this.getContentSize().height/2 <= winSize.height)
                position.y = nextPositionY;
        }
        else if (KEYS[cc.KEY.down]) {
            nextPositionY = position.y - (dt * this.speed) - (this.speedBoost * this.speed);
            if (nextPositionY >= this.getContentSize().height/2)
                position.y = nextPositionY;
        } else if (!KEYS[cc.KEY.space]) {
            nextPositionY = position.y - (dt * this.dropSpeed);
            if (nextPositionY >= this.getContentSize().height/2)
                position.y = nextPositionY;
        }

        this.setPosition(position);
    },

    changeFrame: function() {
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

    blink: function() {
        if ((this.blinkNumber / 0.5) % 8 < 1) {
            this.setColor(new cc.Color3B(255,255,255));
            this.setVisible(false);
        }
        else {
            this.setColor(new cc.Color3B(255,0,0));
            this.setVisible(true);
        }
        this.blinkNumber -= 0.5;

        if (this.blinkNumber == 0) {
            this.setColor(new cc.Color3B(255,255,255));
        }
    },

    shoot: function () {
        this.currentState = 2;
        this.spriteFrameIndex = 0;
        var bullet = cc.Sprite.create(s_player_bullet);
        bullet.setPosition(this.getPositionX() + 20, this.getPositionY() - 20);
        bullet.setTag(2);
        this.bullets.push(bullet);
        return bullet;
    },

    hit: function() {
        this.health = this.health - (this.hitImpact - this.armour * 2);
        if (this.health <= 0) {
            this.die();
        } else {
            this.blinkNumber = 16;
        }
    },

    die: function() {
        this.currentState = 3;
        var dieAnimationFrames = [];
        for (var i = 0; i < 15; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame('player_die_'+ i +'.png');
            dieAnimationFrames.push(frame);
        }

        var animation = cc.Animation.create(dieAnimationFrames, 0.1);
        var animate = cc.Animate.create(animation);
        this.runAction(cc.Sequence.create(animate,
            cc.CallFunc.create(function() {
                var scene = cc.Scene.create();
                scene.addChild(GameOver.create(false));
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, scene));
            }, this)
        ));

    }
});