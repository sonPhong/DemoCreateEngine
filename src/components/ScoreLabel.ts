import { Position } from './Sprite';

export class ScoreLabel {
    private score = 0;

    constructor(private pos: Position) { }

    public add(points: number): void { this.score += points; }

    public reset(): void { this.score = 0; }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#000';
        ctx.font = '20px sans-serif bold';
        ctx.fillText(`Điểm: ${this.score}`, this.pos.x, this.pos.y);
    }
}