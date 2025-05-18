export class Sprite {
    constructor(src, pos, size) {
        this.src = src;
        this.pos = pos;
        this.size = size;
        this.img = new Image();
        this.img.src = src;
    }
    setSource(src) {
        this.src = src;
        this.img.src = src;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.width, this.size.height);
    }
    move(deltaX, deltaY) {
        this.pos.x += deltaX;
        this.pos.y += deltaY;
    }
    contains(poiterX, poiterY) {
        return poiterX >= this.pos.x && poiterX <= this.pos.x + this.size.width
            && poiterY >= this.pos.y && poiterY <= this.pos.y + this.size.height;
    }
    getInfo() {
        return `src=${this.src}, pos=(${this.pos.x},${this.pos.y}), size=${this.size.width}x${this.size.height}`;
    }
}
