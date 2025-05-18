export interface Position { x: number; y: number; }
export interface Size { width: number; height: number; }

export class Sprite {
    private img = new Image();
    constructor(
        public src: string,
        public pos: Position,
        public size: Size
    ) { this.img.src = src; }

    public setSource(src: string): void {
        this.src = src;
        this.img.src = src;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.width, this.size.height);
    }

    public move(deltaX: number, deltaY: number): void {
        this.pos.x += deltaX;
        this.pos.y += deltaY;
    }

    public contains(poiterX: number, poiterY: number): boolean {
        return poiterX >= this.pos.x && poiterX <= this.pos.x + this.size.width
            && poiterY >= this.pos.y && poiterY <= this.pos.y + this.size.height;
    }

    public getInfo(): string {
        return `src=${this.src}, pos=(${this.pos.x},${this.pos.y}), size=${this.size.width}x${this.size.height}`;
    }
}