export class ScoreLabel {
    constructor(pos) {
        this.pos = pos;
        this.score = 0;
    }
    add(points) { this.score += points; }
    reset() { this.score = 0; }
    draw(ctx) {
        ctx.fillStyle = '#000';
        ctx.font = '20px sans-serif bold';
        ctx.fillText(`Điểm: ${this.score}`, this.pos.x, this.pos.y);
    }
}
