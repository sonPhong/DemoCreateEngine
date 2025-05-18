import { Sprite } from './components/Sprite.js';
import { UIButton } from './components/UIButton.js';
import { InfoLabel } from './components/InfoLabel.js';
import { ScoreLabel } from './components/ScoreLabel.js';
import { InputManager } from './managers/InputManager.js';
import { RenderManager } from './managers/RenderManager.js';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;


const sources = [
    'https://i.pinimg.com/originals/4b/06/a8/4b06a81e1d15347327df082905fec9cb.jpg',
    'https://th.bing.com/th/id/OIP.v6J2qtm6RS3LtVi4fG9C5QHaE6?rs=1&pid=ImgDetMain',
    'https://i.pinimg.com/736x/98/3b/c2/983bc2b504ff8cb23dbc44b2a877e918.jpg'
];
let index = 0;
let deltaX = 10, deltaY = 10;
let moveX = false, moveY = false;


const sprite = new Sprite(sources[index], { x: 400, y: 200 }, { width: 150, height: 150 });
const infoLabel = new InfoLabel({ x: 10, y: canvas.height - 10 });
const scoreLabel = new ScoreLabel({ x: 900, y: 25 });

// UI Buttons
const buttons = [
    new UIButton({ x: 50, y: 600 }, { width: 120, height: 30 }, 'Đổi ảnh', () => { index = (index + 1) % sources.length; sprite.setSource(sources[index]); }),
    new UIButton({ x: 200, y: 600 }, { width: 150, height: 30 }, 'Chạy/Dừng X', () => { moveX = !moveX; }),
    new UIButton({ x: 400, y: 600 }, { width: 150, height: 30 }, 'Xuống/Dừng Y', () => { moveY = !moveY; }),
    new UIButton({ x: 600, y: 600 }, { width: 150, height: 30 }, 'Reset Score', () => { scoreLabel.reset(); }),
    new UIButton({ x: 800, y: 600 }, { width: 150, height: 30 }, 'Tạo ảnh mới', () => {
        const src = prompt('URL ảnh:', '')?.trim(); if (!src) return;
        const x = Number(prompt('pos.x:', '0'));
        const y = Number(prompt('pos.y:', '0'));
        const width = Number(prompt('width', '50'));
        const height = Number(prompt('height', '50'));
        sources.push(src); index = sources.length - 1;
        sprite.setSource(src);
        sprite.pos = { x, y };
        sprite.size = { width: width, height: height };
    })
];


const inputManager = new InputManager(canvas);
inputManager.subscribe((x, y) => buttons.forEach(button => button.handleClick(x, y)));
inputManager.subscribe((x, y) => { if ((moveX || moveY) && sprite.contains(x, y)) scoreLabel.add(1); });

// Render
const renderManager = new RenderManager(
    ctx, sprite, buttons, infoLabel, scoreLabel,
    () => moveX, () => moveY,
    () => deltaX, () => deltaY
);
renderManager.start();