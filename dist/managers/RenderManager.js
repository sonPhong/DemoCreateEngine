export class RenderManager {
    constructor(ctx, sprite, buttons, infoLabel, scoreLabel, movingX, movingY, getDeltaX, getDeltaY) {
        this.ctx = ctx;
        this.sprite = sprite;
        this.buttons = buttons;
        this.infoLabel = infoLabel;
        this.scoreLabel = scoreLabel;
        this.movingX = movingX;
        this.movingY = movingY;
        this.getDeltaX = getDeltaX;
        this.getDeltaY = getDeltaY;
    }
    start() {
        const loop = () => {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            // di chuyển
            const deltaX = this.getDeltaX();
            const deltaY = this.getDeltaY();
            if (this.movingX())
                this.sprite.move(deltaX, 0);
            if (this.movingY())
                this.sprite.move(0, deltaY);
            /// đảo chiều
            if (this.sprite.pos.x <= 0) {
                this.sprite.pos.x = 0;
                this.setDeltaX(Math.abs(deltaX));
            }
            else if (this.sprite.pos.x + this.sprite.size.width >= ctx.canvas.width) {
                this.sprite.pos.x = ctx.canvas.width - this.sprite.size.width;
                this.setDeltaX(-Math.abs(deltaX));
            }
            if (this.sprite.pos.y <= 0) {
                this.sprite.pos.y = 0;
                this.setDeltaY(Math.abs(deltaY));
            }
            else if (this.sprite.pos.y + this.sprite.size.height >= ctx.canvas.height) {
                this.sprite.pos.y = ctx.canvas.height - this.sprite.size.height;
                this.setDeltaY(-Math.abs(deltaY));
            }
            this.sprite.draw(this.ctx);
            this.buttons.forEach(button => button.draw(this.ctx));
            // this.infoLabel.setText(this.sprite.getInfo());
            this.infoLabel.draw(this.ctx);
            this.scoreLabel.draw(this.ctx);
            requestAnimationFrame(loop);
        };
        loop();
    }
    setDeltaX(val) { this.getDeltaX = () => val; }
    setDeltaY(val) { this.getDeltaY = () => val; }
}
