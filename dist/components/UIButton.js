export class UIButton {
    constructor(pos, size, label, onClick) {
        this.pos = pos;
        this.size = size;
        this.label = label;
        this.onClick = onClick;
    }
    draw(ctx) {
        ctx.fillStyle = '#d33';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif bold';
        ctx.fillText(this.label, this.pos.x + 10, this.pos.y + this.size.height / 2 + 5);
    }
    handleClick(poiterX, poiterY) {
        if (poiterX >= this.pos.x && poiterX <= this.pos.x + this.size.width
            && poiterY >= this.pos.y && poiterY <= this.pos.y + this.size.height) {
            this.onClick();
        }
    }
}
