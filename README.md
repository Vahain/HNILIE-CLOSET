# 💓 Shop Gia Linh — Website Thời Trang Nữ

Website thuê và mua trang phục nữ cao cấp. Phong cách thanh lịch, giá phải chăng.

---

## 📁 Cấu trúc thư mục

```
shop-gia-linh/
├── public/
│   └── clothes/              ← Ảnh sản phẩm (thêm thư mục mới để thêm hàng)
│       ├── dress1/
│       │   ├── 1.jpg
│       │   ├── 2.jpg
│       │   └── 3.jpg
│       ├── dress2/
│       └── ...
│
├── assets/
│   ├── css/
│   │   └── style.css         ← Toàn bộ CSS (màu sắc, font, layout)
│   ├── js/
│   │   ├── products.js       ← Dữ liệu sản phẩm (thêm/sửa ở đây)
│   │   └── main.js           ← Logic chính của website
│   └── images/               ← Ảnh nền, logo
│
├── pages/
│   ├── index.html            ← Trang chủ
│   ├── checkout.html         ← Trang thanh toán
│   └── admin.html            ← Trang quản trị
│
├── server/
│   ├── api.js                ← Backend API (Node.js + Express)
│   └── orders.json           ← Database đơn hàng (tự tạo khi chạy)
│
├── package.json
└── README.md
```

---

## 🚀 Chạy local

### Bước 1: Cài Node.js
Tải tại: https://nodejs.org (phiên bản LTS)

### Bước 2: Mở VS Code
```bash
code shop-gia-linh
```

### Bước 3: Cài thư viện
```bash
npm install
```

### Bước 4: Chạy server
```bash
npm run dev
```

### Bước 5: Mở trình duyệt
- Website: http://localhost:3000/pages/index.html
- Admin: http://localhost:3000/pages/admin.html
- API: http://localhost:3000/api/orders

---

## 🎨 Thay đổi màu sắc & font

Mở file `assets/css/style.css`, tìm phần `:root`:

```css
:root {
  --pink-light: #ffb6c1;   /* màu hồng nhạt chính */
  --pink-mid:   #ff8fa3;   /* hồng đậm hơn */
  --pink-dark:  #e05f7a;   /* hồng đậm nhất (hover, accent) */
  --gold:       #c9a96e;   /* vàng gold phụ */
}
```

Thay `#ffb6c1` bằng màu bạn muốn.

---

## 👗 Thêm sản phẩm mới

### Cách 1: Thêm vào `assets/js/products.js`

```javascript
{
  id: 21,                          // ID duy nhất (tăng lên từ ID cuối)
  name: "Tên sản phẩm mới",
  folder: "dress21",               // Tên thư mục trong public/clothes/
  images: ["1.jpg", "2.jpg"],     // Danh sách tên file ảnh
  rentPrice: 80000,               // Giá thuê (VND/ngày)
  buyPrice: 450000,               // Giá mua (VND)
  category: "dam",                // dam | vay | ao-dai | set | ao | blazer
  description: "Mô tả sản phẩm",
  sizes: ["S", "M", "L"],
  colors: ["Hồng", "Trắng"],
  isNew: true,
  isFeatured: false,
  rating: 4.8,
  reviews: 5
}
```

### Cách 2: Upload ảnh
Tạo thư mục `public/clothes/dress21/` và upload các file:
- `1.jpg` (ảnh chính)
- `2.jpg`
- `3.jpg`
- ...

Website tự động hiển thị ảnh theo thứ tự file.

---

## 💳 Cài đặt thanh toán

### Chuyển khoản ngân hàng
Mở `pages/checkout.html`, tìm:
```html
<span class="bank-info-val">MBBANK (MBBank)</span>
<span class="bank-info-val">0962471234</span>
<span class="bank-info-val">NGUYEN THI GIA LINH</span>
```
Thay bằng thông tin tài khoản của bạn.

Cũng cập nhật trong `assets/js/products.js`:
```javascript
const SHOP_INFO = {
  bank: "MBBANK",
  bankAccount: "SỐ_TÀI_KHOẢN_CỦA_BẠN",
  bankOwner: "TÊN_CHỦ_TÀI_KHOẢN"
};
```

---

## 📞 Thay đổi thông tin liên hệ

Mở `assets/js/products.js`, tìm `SHOP_INFO`:
```javascript
const SHOP_INFO = {
  name: "Shop Gia Linh 💓",
  phone: "SỐ_ĐIỆN_THOẠI",
  facebook: "https://www.facebook.com/TRANG_FACEBOOK",
  email: "EMAIL_CỦA_BẠN@gmail.com",
  ...
};
```

Cũng cập nhật trực tiếp trong `pages/index.html` phần contact section.

---

## 📤 Deploy lên Vercel

### Bước 1: Tạo tài khoản Vercel
Đăng ký tại: https://vercel.com

### Bước 2: Push lên GitHub
```bash
git init
git add .
git commit -m "Shop Gia Linh website"
git branch -M main
git remote add origin https://github.com/USERNAME/shop-gia-linh.git
git push -u origin main
```

### Bước 3: Import vào Vercel
1. Vào https://vercel.com/new
2. Chọn "Import Git Repository"
3. Chọn repo `shop-gia-linh`
4. Framework Preset: **Other**
5. Root Directory: `/`
6. Build Command: (để trống)
7. Output Directory: (để trống)
8. Click **Deploy**

### Bước 4: Cấu hình cho backend API
Tạo file `vercel.json` ở root:
```json
{
  "version": 2,
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/api.js" },
    { "src": "/(.*)", "dest": "/pages/$1" }
  ]
}
```

---

## 📤 Deploy lên Netlify

### Bước 1: Tạo tài khoản Netlify
Đăng ký tại: https://netlify.com

### Bước 2: Drag & drop
1. Build project: `npm run build`
2. Vào https://app.netlify.com
3. Kéo thả thư mục `shop-gia-linh` vào Netlify

### Hoặc dùng GitHub
1. Push code lên GitHub
2. Vào Netlify → "New site from Git"
3. Chọn repo
4. Publish directory: `/`
5. Click Deploy

---

## 📱 Thông báo Telegram (nâng cao)

Để nhận thông báo khi có đơn hàng mới qua Telegram:

1. Tạo bot Telegram qua @BotFather, lấy TOKEN
2. Lấy Chat ID của bạn
3. Trong `server/api.js`, bỏ comment phần `sendTelegramNotification`
4. Tạo file `.env`:
```
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id
```
5. Cài thư viện: `npm install axios dotenv`
6. Thêm `require('dotenv').config()` đầu file `api.js`

---

## 🛠 Giá thuê

Mặc định: mỗi sản phẩm có giá thuê riêng trong `products.js`.

Để đổi giá thuê theo sản phẩm:
```javascript
rentPrice: 80000,  // 80.000₫/ngày
```

Giá sẽ tự tính: **số ngày × rentPrice**

---

## ❓ Hỗ trợ

- Facebook: https://www.facebook.com/linhtg06
- Email: ngval1234@gmail.com
- Hotline: 096 247 1234
