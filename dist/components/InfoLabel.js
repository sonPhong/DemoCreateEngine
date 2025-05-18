export class InfoLabel {
    constructor(pos, text = '') {
        this.pos = pos;
        this.text = text;
    }
    setText(text) { this.text = text; }
    draw(ctx) {
        ctx.fillStyle = '#000';
        ctx.font = '20px monospace bold';
        ctx.fillText(this.text, this.pos.x, this.pos.y);
    }
}
