import { Position, Size } from './Sprite';

export class UIButton {
    constructor(
        private pos: Position,
        private size: Size,
        private label: string,
        private onClick: () => void
    ) { }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#d33';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif bold';
        ctx.fillText(this.label, this.pos.x + 10, this.pos.y + this.size.height / 2 + 5);
    }

    public handleClick(poiterX: number, poiterY: number): void {
        if (poiterX >= this.pos.x && poiterX <= this.pos.x + this.size.width
            && poiterY >= this.pos.y && poiterY <= this.pos.y + this.size.height) {
            this.onClick();
        }
    }
}