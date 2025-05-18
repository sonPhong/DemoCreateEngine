
// // 1. Interface chung: mô tả dữ liệu vị trí và kích thước
// interface Position { x: number; /* hoành độ */ y: number; /* tung độ */ }
// interface Size { width: number; /* chiều ngang */ height: number; /* chiều dọc */ }

// // 2. Class Sprite: quản lý ảnh (src, pos, size), di chuyển, hit-test, và xuất info
// class Sprite {
//     private readonly img: HTMLImageElement; // phần tử <img> nội bộ
//     public pos: Position;                   // vị trí hiện tại trên canvas
//     public size: Size;                      // kích thước vẽ lên canvas
//     constructor(src: string, pos: Position, size: Size) {
//         this.img = new Image();
//         this.img.src = src;
//         this.pos = { ...pos };
//         this.size = { ...size };
//     }

//     // Cập nhật nguồn ảnh (string)
//     public setSource(src: string): void {
//         this.img.src = src;
//     }

//     // Vẽ sprite mỗi frame
//     public draw(ctx: CanvasRenderingContext2D): void {
//         ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.width, this.size.height);
//     }

//     // Di chuyển sprite theo dx, dy
//     public move(dx: number, dy: number): void {
//         this.pos.x += dx;
//         this.pos.y += dy;
//     }

//     // Kiểm tra click/touch bên trong sprite
//     public contains(px: number, py: number): boolean {
//         return px >= this.pos.x && px <= this.pos.x + this.size.width &&
//             py >= this.pos.y && py <= this.pos.y + this.size.height;
//     }

//     // Xuất chuỗi thông tin: src, pos, size
//     public getInfo(): string {
//         return `src=${this.img.src}, pos=(${this.pos.x},${this.pos.y}), size=${this.size.width}x${this.size.height}`;
//     }
// }

// // 3. Class UIButton: vẽ nút, định nghĩa callback, và bắt click
// class UIButton {
//     constructor(
//         private readonly pos: Position,        // Position of button
//         private readonly size: Size,           // Size of button
//         private readonly label: string,        // Text on button
//         private readonly callback: () => void  // Function to run when clicked
//     ) { }

//     public draw(ctx: CanvasRenderingContext2D): void {
//         // nút nền đỏ và chữ trắng
//         ctx.fillStyle = '#d33';
//         ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
//         ctx.fillStyle = '#fff';
//         ctx.font = '20px sans-serif bold';
//         ctx.fillText(this.label, this.pos.x + 10, this.pos.y + this.size.height / 2 + 5);
//     }

//     public handleClick(px: number, py: number): void {
//         if (px >= this.pos.x && px <= this.pos.x + this.size.width &&
//             py >= this.pos.y && py <= this.pos.y + this.size.height) {
//             this.callback();
//         }
//     }
// }

// // 4a. InfoLabel: hiển thị thông tin sprite trên canvas
// class InfoLabel {
//     constructor(private readonly pos: Position, private text: string = '') { }

//     public setText(text: string): void { this.text = text; }
//     public draw(ctx: CanvasRenderingContext2D): void {
//         ctx.fillStyle = '#000';
//         ctx.font = '20px monospace';
//         ctx.fillText(this.text, this.pos.x, this.pos.y);
//     }
// }

// // 4b. ScoreLabel: quản lý và hiển thị điểm số
// class ScoreLabel {
//     private score = 0;
//     constructor(private readonly pos: Position) { }

//     public add(points: number): void { this.score += points; }
//     public reset(): void { this.score = 0; }
//     public draw(ctx: CanvasRenderingContext2D): void {
//         ctx.fillStyle = '#000';
//         ctx.font = '20px sans-serif bold';
//         ctx.fillText(`Điểm: ${this.score}`, this.pos.x, this.pos.y);
//     }
// }

// // 5. Canvas setup
// const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
// const ctx = canvas.getContext('2d')!; // bắt buộc phải có 2D context

// // 6. Nguồn ảnh và sprite chính
// const imageSources: string[] = [
//     'https://th.bing.com/th/id/OIP.v6J2qtm6RS3LtVi4fG9C5QHaE6?rs=1&pid=ImgDetMain',
//     'https://i.pinimg.com/originals/4b/06/a8/4b06a81e1d15347327df082905fec9cb.jpg'
// ];
// let currentIndex = 0; // idx trong imageSources
// const sprite = new Sprite(imageSources[0], { x: 400, y: 200 }, { width: 150, height: 150 });

// // 7. Label instances
// const infoLabel = new InfoLabel({ x: 10, y: canvas.height - 10 }); // khu vực [INFO_LABEL_AREA]
// const scoreLabel = new ScoreLabel({ x: 900, y: 25 });

// // 8. Movement state & speed
// let movingX = false; // flag di chuyển ngang
// let movingY = false; // flag di chuyển dọc
// let dx = 10;          // vận tốc theo X (px/frame)
// let dy = 10;          // vận tốc theo Y

// // 9. UIButton instances
// const changeImageBtn = new UIButton({ x: 50, y: 600 }, { width: 120, height: 30 }, 'Đổi ảnh', () => {
//     currentIndex = (currentIndex + 1) % imageSources.length;
//     sprite.setSource(imageSources[currentIndex]);
// });
// const toggleMoveXBtn = new UIButton({ x: 200, y: 600 }, { width: 150, height: 30 }, 'Chạy/Dừng X', () => { movingX = !movingX; });
// const toggleMoveYBtn = new UIButton({ x: 400, y: 600 }, { width: 150, height: 30 }, 'Xuống/Dừng Y', () => { movingY = !movingY; });
// const resetScoreBtn = new UIButton({ x: 600, y: 600 }, { width: 150, height: 30 }, 'Reset Score', () => { scoreLabel.reset(); });
// const createSpriteBtn = new UIButton({ x: 800, y: 600 }, { width: 150, height: 30 }, 'Tạo ảnh mới', () => {
//     // Prompt user input
//     const src = prompt('Nhập URL ảnh:', '')?.trim(); if (!src) return;
//     const x = Number(prompt('Nhập pos.x:', '0'));
//     const y = Number(prompt('Nhập pos.y:', '0'));
//     const w = Number(prompt('Nhập width:', '50'));
//     const h = Number(prompt('Nhập height:', '50'));
//     imageSources.push(src);
//     currentIndex = imageSources.length - 1;
//     sprite.setSource(src);
//     sprite.pos = { x, y };
//     sprite.size = { width: w, height: h };
// });

// // 10. Click handler
// canvas.addEventListener('click', (e: MouseEvent) => {
//     const rect = canvas.getBoundingClientRect();
//     const cx = e.clientX - rect.left;
//     const cy = e.clientY - rect.top;
//     [changeImageBtn, toggleMoveXBtn, toggleMoveYBtn, resetScoreBtn, createSpriteBtn]
//         .forEach(btn => btn.handleClick(cx, cy));
//     if ((movingX || movingY) && sprite.contains(cx, cy)) {
//         scoreLabel.add(1);
//     }
// });

// // 11. Render loop
// function loop(): void {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // di chuyển
//     const mvX = movingX ? dx : 0;
//     const mvY = movingY ? dy : 0;
//     sprite.move(mvX, mvY);
//     // đảo chiều đúng
//     if (sprite.pos.x <= 0) { sprite.pos.x = 0; dx = Math.abs(dx); }
//     else if (sprite.pos.x + sprite.size.width >= canvas.width) { sprite.pos.x = canvas.width - sprite.size.width; dx = -Math.abs(dx); }
//     if (sprite.pos.y <= 0) { sprite.pos.y = 0; dy = Math.abs(dy); }
//     else if (sprite.pos.y + sprite.size.height >= canvas.height) { sprite.pos.y = canvas.height - sprite.size.height; dy = -Math.abs(dy); }

//     // vẽ lên canvas
//     sprite.draw(ctx);
//     [changeImageBtn, toggleMoveXBtn, toggleMoveYBtn, resetScoreBtn, createSpriteBtn]
//         .forEach(btn => btn.draw(ctx));
//     // Info + score
//     //   infoLabel.setText(sprite.getInfo());
//     infoLabel.draw(ctx);
//     scoreLabel.draw(ctx);

//     requestAnimationFrame(loop);
// }
// loop();