var Player = cc.Sprite.extend({
    life : 3,
	speed: 400,
	bulletSpeed: 900,
	tag: 1,
    bullets: [],
    isBlinking: false,
    blinkNumber: 0,

	ctor: function() {
        this._super();

		var playerTexture = cc.TextureCache.getInstance().addImage(s_player);
        this.initWithTexture(playerTexture);	
		this.setTag(this.tag);
	},
	
	update:function (dt) {
		var position = this.getPosition();
		if (KEYS[cc.KEY.up] && position.y + this.getContentSize().height/2 <= winSize.height ) {
			position.y += dt * this.speed;
		}
		else if (KEYS[cc.KEY.down] && position.y >= this.getContentSize().height/2) {
			position.y -= dt * this.speed;
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