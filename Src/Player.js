var Player = cc.Sprite.extend({
    life : 3,
	speed: 150,
    speedBoost: 0,
    dropSpeed: 20,
	bulletSpeed: 900,
	tag: 1,
    bullets: [],
    isBlinking: false,
    blinkNumber: 0,
    spriteFrameIndex: 1,

	ctor: function() {
        this._super();

        var cache = cc.SpriteFrameCache.getInstance().addSpriteFrames(s_player_plist, s_player);
        this.initWithSpriteFrameName("fly__001.png");
//		var playerTexture = cc.TextureCache.getInstance().addImage(s_player);
//        this.initWithTexture(playerTexture);
		this.setTag(this.tag);
	},
	
	update:function (dt) {
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

        if (this.blinkNumber > 0) {
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

        }
	},

    shoot: function () {
        var bullet = cc.Sprite.create(s_player_bullet);
        bullet.setPosition(this.getPositionX() + 20, this.getPositionY());
        bullet.setTag(2);
        this.bullets.push(bullet);
        return bullet;
    },

    startBlinking: function () {
        this.isBlinking = true;

    }
});