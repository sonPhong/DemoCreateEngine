import { Position } from './Sprite';

export class InfoLabel {
    constructor(private pos: Position, private text = '') { }

    public setText(text: string) { this.text = text; }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#000';
        ctx.font = '20px monospace bold';
        ctx.fillText(this.text, this.pos.x, this.pos.y);
    }
}