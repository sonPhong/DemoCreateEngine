export class InputManager {
    constructor(canvas) {
        this.handlers = [];
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.handlers.forEach(h => h(x, y));
        });
    }
    subscribe(handler) {
        this.handlers.push(handler);
    }
}
