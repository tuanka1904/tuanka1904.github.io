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

- GPU Fish Ecosystem — `200k agents · 6 indirect draw calls · 0 game-thread overhead`
- PolyWorld — `12 ms avg NavMesh bake/chunk · 0 main-thread stall`
- Quick Scene Switcher — `82 KB package · zero dependencies · editor-only`

Format trong code:

```js
metric: { value: "200k agents", label: "6 indirect draw calls · 0 game-thread overhead" }
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

**Một việc còn lại:** `public/videos/gpu-ecosystem.mp4` nặng **90 MB** — lớn gấp ~7 lần
file lớn thứ hai. Nó là card flagship đầu bảng nên sẽ bị mở nhiều. Nên nén xuống
dưới ~10 MB (720p, CRF 28, không audio):

```
ffmpeg -i gpu-ecosystem.mp4 -vcodec libx264 -crf 28 -vf scale=1280:-2 -an gpu-ecosystem-web.mp4
```
