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
[work.js](src/data/work.js) — hiện không còn placeholder nào live.

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
Sau redesign 2026-09-17 nhóm này đã lùi xuống vị trí thứ 5 (site giờ định vị game dev), nhưng vẫn
hiển thị nên vẫn có thể bị hỏi ở vòng phỏng vấn.

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

`mergedrop3d.mp4` quá dài cho một card portfolio nên cắt còn 45s (`-ss 100 -t 45`,
đoạn các quả cầu đã merge lớn, đọc ra luật chơi ngay).

Kết quả: **4.6 MB** cho cả 4 file. Poster lấy từ bản đã nén, để ở `public/posters/threejs/`
theo đúng quy ước `posterFor()` (`/videos/x.mp4` → `/posters/x.jpg`).

**Lưu ý về `mergedrop3d.mp4`:** file trong thư mục bị thay giữa chừng lúc đang làm —
bản đầu 384x798 / 190s (có HUD SCORE + BEST + Combo), bản thay thế 646x868 / 166s
(khung rộng hơn, thấy trọn hộp kính, nhưng **không còn HUD điểm**). Repo đang dùng bản
mới. Nếu muốn video khoe cả điểm số và combo thì cần quay lại bản có HUD — phần mô tả
trong card (combo multiplier, score/best) viết từ bản cũ, đúng về game nhưng bản video
hiện tại không thấy.

**Cập nhật 2026-09-17 (tối):** chủ site thay `mergedrop3d.mp4` bằng bản quay mới — 644x860,
60.6s, 18.7 MB, có audio, atom `moov` nằm cuối file. Nén lại cùng lệnh ở trên, **không cắt**
(60s đã vừa cho một card): 18.7 MB → **1.67 MB**, bỏ audio, `moov` về đầu file.
Poster lấy lại ở giây 48 (đang Fever Mode, stack đã đầy vừa).

Bản này vẫn **không có HUD SCORE/BEST**, nhưng thấy được combo (`GREAT ×3`), **Fever Mode**
(`LEVEL 2 · FEVER! · DOUBLE SCORE`, thanh ×2 đếm ngược) và popup **New Discovery**. Đã thêm
bullet "Fever Mode & Tier Discovery" vào card, chỉ viết từ những gì thấy trong video: không
ghi Fever kéo dài bao lâu hay điều kiện kích hoạt, vì video không cho thấy.

**Cập nhật 2026-09-18 — StackPuzzle 3D:** chủ site thay `threejs/hexa_threejs.mp4` bằng bản quay mới
(816x866, 29.0s, 10.66 MB, có audio, `moov` cuối file). Xử lý bằng `python tools/media.py video` theo
[WORKFLOW.md](WORKFLOW.md) mục 4.1, **không cắt**: 10.66 MB → **1.62 MB**, bỏ audio, `moov` về đầu.
Tool hạ 816 → 720 px ngang theo trần portrait; modal cao tối đa 70vh nên ở 1080p video hiện ~712 px
ngang — không mất gì nhìn thấy được. Poster lấy ở giây 21.7 (stack cao 9/7/6, một mục tiêu màu đã tick).
Bản gốc nằm ở `_originals/threejs/hexa_threejs-raw-20260918-035430.mp4` (local, ngoài git).

Bản quay này lần đầu cho thấy **luật chơi in trên màn hình tiêu đề**, nên mô tả card đã viết lại cho
đúng: kéo *stack* từ khay, hai stack cạnh nhau **cùng màu mặt trên** thì gộp, một màu **đủ 10 thì
được xoá**, chain combo. Bản cũ ghi "matching colours fuse into a higher number" — gần đúng nhưng
thiếu điều kiện xoá ở mốc 10. Thấy thêm: **12 level**, mỗi level **15 nước**, chấm **sao** khi hoàn thành
(bản quay được 2/3 sao, "cleared in 12 / 15 moves · +400 pts"), có **Endless mode** với best score riêng.

**Tags — đã chốt:** màn hình tiêu đề tự ghi stack là `THREE.JS · TYPESCRIPT · VITE · WEB AUDIO`,
không có React Three Fiber. Chủ site xác nhận theo màn hình tiêu đề, tags đổi thành
`["Three.js", "TypeScript", "Vite", "Web Audio"]`. Ba game web còn lại vẫn ghi R3F — nếu chúng cũng
là Three.js thuần thì sửa nốt trong `webProjects`.

**Cập nhật 2026-09-18 — MewShoot (ban đầu bị đặt nhầm tên là CasualShoot):** bản quay mới
488x876, 81.1s, 19.26 MB, có audio, `moov` cuối file. Nhạc trọn 81s ở CRF 26 ra 7.05 MB — nặng gấp 4 lần
các card web khác, nên **chủ site chọn cắt**: giữ đoạn 0:30–1:00 (`--ss 30 --t 30`, dày sự kiện nhất:
banner SWARM, chain lên ×50, LV.3→LV.6) → **3.16 MB**. Poster lấy ở giây 3.8 của bản cắt (= 33.8s bản gốc):
banner SWARM "Runners from the treeline", đàn quái đang trúng đòn, chain ×9.
Bản gốc: `_originals/threejs/casualshoot-raw-20260918-041429.mp4` (tên file theo lúc còn nhầm).

**⚠️ Sự cố đã xảy ra:** file được copy nhầm vào `casualshoot.mp4` trong khi nội dung là MewShoot. Vì mô tả
card CasualShoot (thủ thành theo lane) không khớp video, đã kết luận nhầm là "game đổi thể loại" và viết lại
card CasualShoot theo nội dung MewShoot. Commit `660eba2` mang lỗi này. Chủ site phát hiện, đổi tên file và
copy lại; đã sửa ở commit sau. **Bài học: video không khớp mô tả card thì khả năng cao là copy nhầm file,
phải hỏi trước khi viết lại nội dung.**

**Card MewShoot viết lại** theo bản quay mới, chỉ từ HUD: kill chain có bậc NICE/GREAT/SAVAGE/BRUTAL
(cao nhất đếm được ×67), THREAT TIER 0→2, sự kiện SWARM có banner, 2 ô kỹ năng SPACE/R có số lần dùng,
XP lên LV.7 trong ~70s, HP 100. Subtitle "Survivor Arena" → **"Kill-Chain Survivor"**.

**Cập nhật 2026-09-18 — CasualShoot (bản đúng):** 490x864, 15.0s, 3.58 MB, có audio, `moov` cuối file
→ **1.62 MB**, không cắt. Poster ở giây 11.3: đội hình quái ở đỉnh lane đang trúng loạt tên, tường HP
1000/1000, "Stage 1 – Juicy Demo", Wave 1/3. Bản gốc: `_originals/threejs/casualshoot-raw-20260918-101600.mp4`.

Mô tả card cũ (thủ thành theo lane) **vẫn đúng** nên đã khôi phục nguyên văn. Bản quay này cho thấy thêm
một thứ chưa từng ghi: **màn chọn power-up khi lên cấp** — Blast Rounds (nổ bán kính 0.6u), Critical Eye
(+8% crit), Multishot (+1 đạn), mỗi thứ có cấp riêng. Đã thêm thành bullet thứ ba.

Hai game **không** trùng nhau: CasualShoot là thủ thành theo lane (đứng sau tường, bắn lên), MewShoot là
survivor arena (di chuyển giữa đồng trống). Ghi chú "hai card giống nhau" ở bản trước là hệ quả của vụ
copy nhầm, không còn đúng. Vẫn còn: `mewshoot.vercel.app` có `<title>` là "CasualShoot Web V2".

**Bản gốc 4 file không commit** — tự lưu trữ ngoài repo như gpu-ecosystem và rio. Bản quay
Merge Drop 18.7 MB lần này cũng đã bị ghi đè trong repo; chỉ còn một bản sao tạm trong
scratchpad của phiên làm việc, cần tự giữ bản gốc ở chỗ khác.

### FILL — link chơi thử

Thêm `link` (và `linkLabel` nếu muốn đổi chữ) vào object game trong
[work.js](src/data/work.js) (mảng `webProjects`) là nút hiện ra ở cả card lẫn modal:

```js
link: "https://...",
linkLabel: "Play in browser",   // optional, mặc định đã là "Play in browser"
badge: "Live demo"              // optional, nhãn amber góc trên ảnh card
```

Chưa điền thì không render nút nào — không có placeholder chết.

**Đã điền đủ 4 link (2026-09-17)** — card nào cũng có nút "Play in browser":

| Game | File video | Link | Title thật của trang |
|---|---|---|---|
| StackPuzzle 3D | `threejs/hexa_threejs.mp4` | https://stack-puzzle.vercel.app | StackPuzzle 3D — Hexa Tile Match |
| Merge Drop 3D | `threejs/mergedrop3d.mp4` | https://mergedrop3d.vercel.app | Merge Drop 3D |
| MewShoot | `threejs/mewshoot.mp4` | https://mewshoot.vercel.app | CasualShoot Web V2 ⚠️ |
| CasualShoot | `threejs/casualshoot.mp4` | https://casualshoot.vercel.app | CasualShoot |

**⚠️ `mewshoot.vercel.app` có `<title>` là "CasualShoot Web V2"** — chủ site xác nhận đây đúng
là MewShoot (survivor arena), title chỉ là tên codebase cũ chưa đổi. **Nên sửa title trong
game** cho khớp, không thì recruiter bấm vào từ card MewShoot sẽ thấy tab ghi tên game khác.

**Tên card:** "Hexa Merge" là tên mình đặt tạm, mở link deploy mới biết tên thật là
**StackPuzzle 3D** — đã sửa. Ba tên còn lại đã khớp với title của build.

**Đừng dùng link dashboard:** `vercel.com/tuan-ka-personal/stack-puzzle` là trang quản trị,
phải đăng nhập mới vào. Link public là dạng `<project>.vercel.app`.

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
trong `webProjects` của [work.js](src/data/work.js).

---

## 10. Redesign theo engine: Unity · Web · Unreal (2026-09-17)

Bố cục cũ chia dự án theo *loại* (Studio Works / Core Engineering / Custom Tooling), Unity
và Unreal trộn lẫn, cộng thêm một lưới flagship trùng lặp và Web Games đứng riêng ở đầu trang.
Giờ trang chia theo **engine**, thứ tự:

```
Hero (3 ô chọn engine) → 01 Unity → 02 Web → 03 Unreal → 04 About + Capabilities → 05 Contact
```

**Toàn bộ dữ liệu dự án giờ nằm ở một file: [src/data/work.js](src/data/work.js).**
`Projects.jsx` và `WebGames.jsx` đã bị xoá, thay bằng [Work.jsx](src/components/Work.jsx) dựng
cả ba section từ cùng một dữ liệu. Các mục 8 và 9 phía trên nhắc tới `featured: true`,
`FLAGSHIP_ORDER`, `Projects.jsx`, `WebGames.jsx` — đó là cấu trúc cũ. Cấu trúc mới:

| Trường | Ý nghĩa |
|---|---|
| mảng `unityProjects` / `webProjects` / `unrealProjects` | engine của dự án — chuyển dự án sang engine khác = cắt dán object |
| `tier: "lead"` | card ngang lớn mở đầu section (tối đa 1) |
| `tier: "feature"` | card lớn 2 cột ngay dưới lead |
| không có `tier` | lưới compact ("More Unity work") |
| `tier: "credit"` | dòng một hàng ở cuối section, cần thêm `summary` |

Thứ tự trong mảng = thứ tự hiển thị. Số cột lưới tự chọn theo số card để không có card lẻ
cuối hàng: 4/8 → 4 cột, 3/6 → 3 cột; 5 hoặc 7 → card **đầu tiên** của lưới rộng gấp đôi để
các hàng khép đều (Unity hiện có 7 card lưới nên Mobile Game Framework đang là card rộng).

**Lựa chọn đã đặt, có thể đổi:**

- **Lead của Unity là Rio: Arcane Warden** (thay vì Quick Scene Switcher như `FLAGSHIP_ORDER` cũ),
  vì hướng game dev nên mở bằng một game. QSS và GPU Fish Ecosystem là 2 card feature ngay dưới.
  Muốn đổi: chuyển `tier: "lead"` sang object khác và đưa object đó lên đầu mảng.
- **Christmas Wonderland Metaverse** trước là "earlier credit", giờ là card lưới trong Unreal —
  section Unreal chỉ có 4 dự án nên cần hình ảnh hơn là một dòng chữ.

### Engine của các dự án lai

Tags của mấy dự án này ghi cả Unity lẫn Unreal:

| Dự án | Đặt ở | Lý do |
|---|---|---|
| Vinpearl Digital Aquarium | **Unreal** | bullet đầu là IPC hologram viết bằng UE C++ (phần AR là Unity) |
| HomeTeam NS | **Unreal** | chủ site chốt (2026-09-17) |
| Singapore Discovery Center | **Unity** | bullet ghi rõ Unity AR Foundation |

Muốn đổi thì cắt object sang mảng engine đúng trong `work.js`.

### Copy đã đổi theo hướng game dev

- Title/description/OG trong [layout.js](src/app/layout.js): "Senior Unity Developer · Systems,
  Tooling & Monetization" → "Game Developer · Unity, Unreal & Web". Monetization bỏ khỏi keywords.
- Hero: eyebrow mới, đoạn giới thiệu nhắc cả ba engine. Stat "Unity · UE5" bỏ (ba ô engine đã
  thể hiện), thay bằng "4 — Browser games playable now". Headline giữ nguyên.
- About: "Senior Unity Developer" → "game developer", thêm Three.js vào dòng Engines. **Đoạn 3
  (SDK, ad mediation, ARPDAU) giữ nguyên** — nếu muốn bỏ hẳn hướng monetization thì xoá đoạn đó
  cùng nhóm Capabilities ở mục 5.
- Contact: "senior Unity roles … monetization" → "senior game developer roles — Unity first,
  Unreal or web when the project calls for it".
- Tên file CV vẫn là `Kieu-Anh-Tuan-Unity.pdf` — nếu CV mới cũng đổi hướng thì đổi `CV_HREF`
  trong [Navbar.jsx](src/components/Navbar.jsx).
