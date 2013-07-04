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
    spriteFrameIndex: 1,
    fireWait: 0.75,

	ctor: function() {
        this._super();

        var cache = cc.SpriteFrameCache.getInstance().addSpriteFrames(s_player_plist, s_player);
        this.initWithSpriteFrameName("fly__001.png");
        this.setScale(0.6);
		this.setTag(this.tag);
	},
	
	update:function (dt) {
        this.changeFrame();
        this.updatePosition(dt);

        if (this.fireWait > 0) {
            this.fireWait -= dt;
        }
        if (this.blinkNumber > 0) {
            this.blink();
        }

        if(this.health<=20)
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
        var prefix = "fly__";
        if (this.spriteFrameIndex > 24) {
            this.spriteFrameIndex = 1;
        }
        if (this.spriteFrameIndex < 10) {
            prefix += "00";
        } else {
            prefix += "0";
        }

        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(prefix + this.spriteFrameIndex + ".png");
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
        var scene = GameOver.scene(false);
        cc.Director.getInstance().replaceScene(scene);
    }
});