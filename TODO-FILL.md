# TODO-FILL — những chỗ cần chủ site điền tay

Mọi mục dưới đây là chỗ site cố tình **để trống thay vì đoán số**. Trong code, mỗi chỗ
được đánh dấu bằng comment `FILL:`. Grep để tìm nhanh:

```
rg "FILL:" src/
```

---

## 1. File CV (chặn 2 nút đang live)

Nút "Download CV" đã có ở nav bar và section Contact, cả hai trỏ tới:

```
/cv/Kieu-Anh-Tuan-Unity.pdf
```

**Chưa có file này.** Thư mục `public/cv/` chưa tồn tại. Cho tới khi bỏ file vào,
cả hai nút sẽ trả 404.

- Việc cần làm: tạo `public/cv/` và đặt file PDF tên đúng như trên.
- Nếu muốn đổi tên file: sửa hằng `CV_HREF` trong [Navbar.jsx](src/components/Navbar.jsx) —
  Contact import lại từ đó nên chỉ cần sửa một chỗ.

---

## 2. Card SDK Integration — đã bỏ theo yêu cầu (để dành)

Brief mục 4.2 đề xuất nâng credit tích hợp VOD SDK thành card riêng trong Selected Works.
Chủ site quyết định **chưa thêm**, nên card đã được gỡ khỏi
[Projects.jsx](src/components/Projects.jsx) — hiện không còn placeholder nào live.

Nếu sau này muốn thêm lại, cần chuẩn bị: tên sản phẩm thật, SDK gì, ràng buộc khiến nó
khó (build size / latency / crash rate / store review), và 2–3 bullet kỹ thuật.

Lưu ý: tín hiệu monetization/SDK vẫn còn ở 2 chỗ khác — nhóm "Monetization & LiveOps"
trong Capabilities và đoạn nối trong About. Nếu bỏ luôn cả hai chỗ đó thì hướng
monetization sẽ biến mất hoàn toàn khỏi site.

---

## 3. Dòng metric còn thiếu

Signature element của site là dòng readout `▍ số + label`. Card nào có `metric: null`
thì **không render dòng nào cả** — không có placeholder giả, nhưng cũng mất điểm mạnh nhất.

| Card | Cần số gì |
|---|---|
| Seal of Exorcism | entity count / ms per frame / draw calls |
| Vinpearl Digital Aquarium | sai số sync hologram (ms) hoặc số thiết bị đồng thời |
| Catfe Scene Analyzer Suite | draw call trước/sau trên một scene thật |

Đã có sẵn (không cần làm gì):

- GPU Fish Ecosystem — `1M agents @ 60 FPS · RTX 4060 · scales to 2M · 6 indirect draw calls`
- PolyWorld — `12 ms avg NavMesh bake/chunk · 0 main-thread stall`
- Quick Scene Switcher — `82 KB package · zero dependencies · editor-only`

Format trong code:

```js
metric: { value: "1M agents @ 60 FPS", label: "RTX 4060 · scales to 2M · 6 indirect draw calls" }
```

`value` là phần in mono màu amber, `label` là phần chữ thường xám.

---

## 4. Stat strip ở hero

[Hero.jsx](src/components/Hero.jsx) — ô thứ 2 hiện là `1 / Tool live on the Unity Asset Store`.
Đây là số thật (Quick Scene Switcher) và dùng được, nhưng brief gợi ý ưu tiên
**một con số performance thật** nếu có — ví dụ "draw calls giảm X%" từ Scene Analyzer
trên một scene cụ thể. Nếu có số đó, thay vào sẽ mạnh hơn.

---

## 5. Nhóm "Monetization & LiveOps" trong Capabilities

[Skills.jsx](src/components/Skills.jsx) hiện liệt kê đủ 4 dòng theo brief:

```
Ad mediation (AppLovin MAX / LevelPlay)
In-app bidding & waterfall tuning
IAP & game economy design
Analytics & remote config
```

**Xoá những dòng chưa thực sự làm.** Brief nói rõ: đừng để nguyên cả 4 nếu chỉ làm 2.
Đây là nhóm đặt ở vị trí thứ 2 nên sẽ bị hỏi kỹ ở vòng phỏng vấn.

---

## 6. Claim C++ trong About — cần tự xác nhận

[About.jsx](src/components/About.jsx) đã bỏ "low-level C++ memory management" và
"GAS ability pipelines" theo brief mục 3. Đoạn 2 giờ mô tả ở mức kiến trúc/hệ thống.

Nếu thực tế **có** làm GAS hoặc multi-threaded async trong production Unreal thì thêm lại
được — nhưng phải trả lời trôi chảy câu "kể tôi nghe bug khó nhất trong đó".

---

## 7. Ảnh/video — đã kiểm tra, không thiếu

Brief mục 7.5 nghi ~9/14 card thiếu media. Kiểm tra thực tế: **đủ cả.**
`public/videos/` có 11 file, `public/posters/` có đủ 11 poster tương ứng,
`public/images/` có 9 ảnh. Không có card nào thiếu asset.

Nguyên nhân trông như "thiếu ảnh": video dùng `preload="none"` nên chỉ hiện poster
cho tới khi hover, và trước đây poster bị phủ `mix-blend-luminosity` + `opacity-60`
nên xám xịt như khung rỗng. Đã bỏ hiệu ứng đó, đổi nhãn từ "Demo" thành "Hover to play"
cho rõ ý.

**Đã xử lý (2026-09-02):** `public/videos/gpu-ecosystem.mp4` từng nặng 94 MB. Nội dung
là đàn cá dày đặc nên nén interframe gần như vô hiệu — hạ CRF không ăn thua (CRF 28 vẫn
còn 50 MB). Cần gạt thật là độ phân giải và cắt bớt thời lượng:

```
ffmpeg -ss 5 -i gpu-ecosystem.mp4 -t 76.8 -c:v libx264 -crf 26 -preset slow -vf scale=960:-2 -pix_fmt yuv420p -movflags +faststart -an out.mp4
```

Kết quả: 94 MB → **30.1 MB**, 960x540, 76.8s. Card hiển thị ~580px và modal ~1024px nên
540p không mất gì đáng kể.

`-movflags +faststart` là phần quan trọng nhất và độc lập với dung lượng: bản cũ có atom
`moov` nằm ở 99.9% cuối file, khiến trình duyệt không phát được frame nào cho tới khi với
tới cuối file. Mọi video khác trên site đã có moov ở đầu — riêng file này thì chưa.

Master gốc 94 MB (bản render 2M) **chưa từng được commit** — cần tự lưu trữ ngoài repo.

---

## 8. Rio: Arcane Warden — đã thêm (2026-09-11)

Card mới trong **Core Engineering**, đặt `featured: true` và nằm ngay cạnh
Quick Scene Switcher trong lưới flagship (vị trí #2 của `FLAGSHIP_ORDER`).

**Video:** `rio-in-jurney.mp4` gốc nặng **130 MB** (1280x720, 112s, 9.2 Mbps — bitrate
thừa gấp ~6 lần so với nội dung low-poly). Nén lại và đổi tên cho khớp tiêu đề:

```
ffmpeg -i rio-in-jurney.mp4 -an -c:v libx264 -preset slow -crf 26 \
  -maxrate 2600k -bufsize 5200k -pix_fmt yuv420p -profile:v high \
  -movflags +faststart -g 60 rio-arcane-warden.mp4
```

Kết quả: 130 MB → **19.1 MB**, giữ nguyên 1280x720 (khác với gpu-ecosystem: video này
đầy chữ HUD nên hạ xuống 540p sẽ mất chi tiết). Đã kiểm frame sau khi nén — HUD vẫn đọc rõ.
Poster `posters/rio-arcane-warden.jpg` lấy từ giây 42, scale 960x540 theo đúng lệ các poster khác.

**FILL — metric:** hiện dùng `61-enemy waves` (đọc trực tiếp từ HUD "WAVE 3 — ENEMIES LEFT: 61"),
là con số đếm được chứ chưa phải số đo hiệu năng. Nếu profile được thì thay bằng số thật:
frame time hoặc số agent đồng thời ở wave cao nhất trên một máy cụ thể — giống cách
GPU Fish Ecosystem ghi "1M agents @ 60 FPS · RTX 4060".

**Master gốc 130 MB chưa commit** — tự lưu trữ ngoài repo như bản gpu-ecosystem.

---

## 9. Web Games (Three.js) — đã thêm (2026-09-17)

Section mới **`<WebGames />`** trong [page.js](src/app/page.js), đặt ngay sau Hero —
tức là mục nội dung đầu tiên của site, trước cả About. Có `id="web-games"`, link trong
nav bar (vị trí đầu) và một link phụ trong Hero.

Bốn game portrait nên card dùng `aspect-[9/16]` và modal dùng nhánh `portrait: true`
(khung giới hạn chiều cao thay vì khung 16:9) — tránh đúng lỗi black bars đã sửa ở QSS.

**Refactor kèm theo:** `LazyVideo`, `MetricReadout`, `CardMedia` và toàn bộ modal được
tách từ [Projects.jsx](src/components/Projects.jsx) sang
[ProjectMedia.jsx](src/components/ProjectMedia.jsx) để hai section dùng chung — sửa style
card/modal giờ chỉ sửa một chỗ.

**Video:** 4 file gốc tổng **54 MB**, có cả audio track (trang luôn phát muted nên audio
là byte thừa). Nén lại, bỏ tiếng:

```
ffmpeg -i <src> -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart <out>
```

`mergedrop3d.mp4` gốc dài **190 giây** — quá dài cho một card portfolio — cắt còn 45s
(`-ss 130 -t 45`, đoạn các quả cầu đã merge lớn, đọc ra luật chơi ngay).

Kết quả: 54 MB → **4.2 MB** tổng. Poster lấy từ bản đã nén, để ở `public/posters/threejs/`
theo đúng quy ước `posterFor()` (`/videos/x.mp4` → `/posters/x.jpg`).

**Bản gốc 4 file không commit** — tự lưu trữ ngoài repo như gpu-ecosystem và rio.

### FILL — link chơi thử

Chủ site xác nhận **sẽ có link deploy** (itch.io / Vercel / GitHub Pages) nhưng chưa có.
Code đã chừa sẵn: thêm `link` (và `linkLabel` nếu muốn đổi chữ) vào object game trong
[WebGames.jsx](src/components/WebGames.jsx) là nút hiện ra ở cả card lẫn modal:

```js
link: "https://...",
linkLabel: "Play in browser"   // optional, mặc định đã là "Play in browser"
```

Chưa điền thì không render nút nào — không có placeholder chết.

| Game | File video | Link |
|---|---|---|
| Hexa Merge | `threejs/hexa_threejs.mp4` | chưa có |
| Merge Drop 3D | `threejs/mergedrop3d.mp4` | chưa có |
| MewShoot | `threejs/mewshoot.mp4` | chưa có |
| CasualShoot | `threejs/casualshoot.mp4` | chưa có |

### FILL — metric

Bốn card này **chưa có dòng metric** nào. Web game có sẵn số dễ đo và đáng tin:
FPS trên một máy cụ thể, số rigid body đồng thời lúc stack đầy (Merge Drop), bundle size
sau gzip, hoặc thời gian tới frame đầu tiên. Đo được thì thêm `metric: { value, label }` —
component dùng chung nên hiển thị giống hệt các card Unity.

### Mô tả — nguồn gốc

Toàn bộ nội dung card viết từ những gì **nhìn thấy trên HUD trong video** (wave 1/3,
HP 1000, moves 3/15, combo x2, tier/kills/survival timer...). Không có con số nào suy đoán.
Stack ghi `Three.js · React Three Fiber · TypeScript · WebGL` theo xác nhận của chủ site —
nếu hai game pixel (MewShoot, CasualShoot) thật ra không chạy trên Three.js thì sửa tag
trong `webGames[]`.
