var Player = cc.Sprite.extend({
	speed: 200,
	bulletSpeed: 900,
	tag: 1,
    bullets: [],

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
	},

    shoot: function () {
        var bullet = cc.Sprite.create(s_player_bullet);
        bullet.setPosition(this.getPositionX() + 20, this.getPositionY());
        bullet.setTag(2);
        this.bullets.push(bullet);
        return bullet;
    }
});