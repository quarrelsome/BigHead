var PowerUp = cc.Sprite.extend({
    type: 0,
    displacementDirection: 0,
    verticalSpeed: 200,
    timeRemaining: 0,
    isConsumed: false,

    ctor: function(powerType, timeRemaining) {
        this._super();
        this.initWithFile(s_explosion);
        this.setScale(0.5);
        this.type = powerType;
        this.timeRemaining = timeRemaining;
    },

    update: function(dt) {
        if (!this.isConsumed)
            this.verticalMovement(dt);
        this.timeRemaining -= dt;
    },

    verticalMovement: function (dt) {
        if (this.displacementDirection == 0) {
            var positionY = this.getPositionY() + dt * this.verticalSpeed;
            if ((positionY > winSize.height - this.getContentSize().height/2)) {
                this.displacementDirection = 1;
            }
            else {
                this.setPositionY(positionY);
            }
        }
        else {
            positionY = this.getPositionY() - dt * this.verticalSpeed;
            if ((positionY < this.getContentSize().height/2)) {
                this.displacementDirection = 0;
            }
            else {
                this.setPositionY(positionY);
            }
        }
    }
});