export class InputManager {
    private handlers: ((x: number, y: number) => void)[] = [];

    constructor(canvas: HTMLCanvasElement) {
        canvas.addEventListener('click', (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.handlers.forEach(h => h(x, y));
        });
    }

    public subscribe(handler: (x: number, y: number) => void): void {
        this.handlers.push(handler);
    }
}