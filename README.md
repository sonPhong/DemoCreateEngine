### Hướng mở rộng core game bắn ruồi, đập chuột

# TestCreate Engine Game
---

### Sprite 

* **Interface**: `Position { x, y }` và `Size { width, height }` (public).
* **Class `Sprite`**:

  * **src**: URL ảnh.
  * **pos, size**: vị trí và kích thước hiển thị.
  * **`setSource(src)`**: thay đổi ảnh.
  * **`draw(ctx)`**: vẽ lên canvas.
  * **`move(dx,dy)`**: di chuyển.
  * **`contains(px,py)`**: kiểm tra click.
  * **`getInfo()`**: trả về chuỗi thông tin.

### UIButton 

* Nhận `pos`, `size`, `label`, `onClick` (callback).
* **`draw(ctx)`**: vẽ button nền & chữ.
* **`handleClick(px,py)`**: gọi `onClick` nếu click nằm trong vùng.

### InfoLabel & ScoreLabel

* **InfoLabel** hiển thị text (thông tin sprite).
* **ScoreLabel** quản lý `score`, các method `add()`, `reset()`, `draw()`.

---

## Managers

### InputManager 

* Đăng ký `click` trên `<canvas>`.
* Tính toạ độ click **relativ** so với canvas bằng `e.clientX - rect.left`/`e.clientY - rect.top`.
* **`subscribe(handler)`**: lưu callback `(x,y)` để gọi khi click.

### RenderManager

* **Constructor** nhận `ctx`, `sprite`, danh sách `UIButton`, `InfoLabel`, `ScoreLabel`, hàm getter `isMovingX`, `isMovingY`, `getDX`, `getDY`.
* **`start()`**: khởi chạy vòng lặp `gameLoop()`:

  1. `clearRect` làm sạch canvas.
  2. Di chuyển sprite theo `dx`, `dy` nếu flag bật.
  3. Bounce (đảo chiều) khi chạm biên: clamp `pos` và đổi dấu vận tốc.
  4. Gọi `draw()` cho sprite, buttons, labels.
  5. `requestAnimationFrame(loop)` để lặp lại.

---

## Kiến thức & Từ khoá

* **TypeScript**: `interface`, `class`, `constructor`, `public/private`, `export/import`.
* **ESModules**: `import ... from '...'`, `export class`.
* **Canvas API**: `getContext('2d')`, `drawImage`, `fillRect`, `fillText`, `clearRect`.
* **Event**: `addEventListener('click', ...)`, `MouseEvent.clientX/Y`.
* **Render Loop**: `requestAnimationFrame`.
* **Logic bounce**: clamp và đổi dấu `dx`/`dy` với `Math.abs`.
* **Dynamic**: prompt nhập liệu, mảng URL, `.push()`, modulo `%`.

---

## Đã refactor lại tên, model, module, nhưng chưa tối ưu nhất vì còn bug
