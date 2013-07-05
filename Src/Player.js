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
        var spawnCache = cc.SpriteFrameCache.getInstance().addSpriteFrames(s_player_spawn_plist, s_player_spawn);
        var cache = cc.SpriteFrameCache.getInstance().addSpriteFrames(s_player_plist, s_player);
        this.initWithSpriteFrameName("player_spawn_0.png");
		this.setTag(this.tag);
	},
	
	update:function (dt) {
        if (this._parent._time % 0.1 < 0.05)
            this.changeFrame();

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
        if (this.currentState == 0) {
            prefix = "player_spawn_";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(prefix + this.spriteFrameIndex + ".png");
            if (this.spriteFrameIndex == 35) {
                this.currentState = 1;
                this.spriteFrameIndex = 0;
            }
        }
        else if (this.currentState == 1) {
            var prefix = "player_fly_";
            if (this.spriteFrameIndex > 23) {
                this.spriteFrameIndex = 0;
            }
            frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(prefix + this.spriteFrameIndex + ".png");
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
        var scene = cc.Scene.create();
        scene.addChild(GameOver.create(false));
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, scene));
    }
});