export class Button {
    constructor(pos, size, onClick) {
        this.pos = pos;
        this.size = size;
        this.onClick = onClick;
    }
    draw(ctx) {
        ctx.fillStyle = "#007bff";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        ctx.fillStyle = "#fff";
        ctx.font = "16px sans-serif";
        ctx.fillText("Click", this.pos.x + 10, this.pos.y + this.size.height / 2 + 6);
    }
    contains(x, y) {
        return (x >= this.pos.x && x <= this.pos.x + this.size.width &&
            y >= this.pos.y && y <= this.pos.y + this.size.height);
    }
}
