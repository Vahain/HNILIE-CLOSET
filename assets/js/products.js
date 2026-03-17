/**
 * ============================================================
 * SHOP GIA LINH - PRODUCTS DATA
 * ============================================================
 * HOW TO ADD A NEW PRODUCT:
 * 1. Create a new folder in public/clothes/ (e.g. dress21/)
 * 2. Upload images as 1.jpg, 2.jpg, 3.jpg ...
 * 3. Add a new object below following the same format
 *
 * PRICE FORMAT: numbers in VND (Vietnamese Dong)
 * ============================================================
 */

const PRODUCTS = [
  {
    id: 1,
    name: "MH0001",
    folder: "dress1",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 50000,      // VND per day — change this to adjust rent price
    buyPrice: 200000,      // VND — change this to adjust sell price
    category: "vay-bien",
    description: "Mã váy MH0001.",
    sizes: ["M"],
    colors: ["Trắng"],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviews: 24
  },
  {
    id: 2,
    name: "MH0002",
    folder: "dress2",
    images: ["1.jpg", "2.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-bien",
    description: "Mã váy MH0002.",
    sizes: ["M"],
    colors: ["Trắng"],
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    reviews: 18
  },
  {
    id: 3,
    name: "MH0003",
    folder: "dress3",
    images: ["1.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-bien",
    description: "Mã váy MH0003.",
    sizes: ["M"],
    colors: ["Nâu"],
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviews: 31
  },
  {
    id: 4,
    name: "MH0004",
    folder: "dress4",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-bien",
    description: "Mã váy MH0004.",
    sizes: ["M"],
    colors: ["Hồng Trắng"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviews: 15
  },
  {
    id: 5,
    name: "MH0005",
    folder: "dress5",
    images: ["1.jpg", "2.jpg", "3.jpg" ],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-bien",
    description: "Mã váy MH0005.",
    sizes: ["M"],
    colors: ["Hồng trắng"],
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    reviews: 12
  },
  {
    id: 6,
    name: "MH0006",
    folder: "dress6",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-bien",
    description: "Mã Váy MH0006.",
    sizes: ["M"],
    colors: ["Hồng Trắng"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    reviews: 9
  },
  {
    id: 7,
    name: "MH0007",
    folder: "dress7",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-bien",
    description: "Mã Váy MH0007.",
    sizes: ["M"],
    colors: ["Hồng Gold"],
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviews: 27
  },
  {
    id: 8,
    name: "MH0008",
    folder: "dress8",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-bien",
    description: "Mã váy MH0008.",
    sizes: ["M"],
    colors: ["Hồng Trắng"],
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    reviews: 21
  },
  {
    id: 9,
    name: "MH0009",
    folder: "dress9",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "ao-dai",
    description: "Mã váy MH0009.",
    sizes: ["M"],
    colors: ["Trắng"],
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviews: 42
  },
  {
    id: 10,
    name: "MH0005",
    folder: "dress5",
    images: ["1.jpg", "2.jpg", "3.jpg" ],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-bien",
    description: "Mã váy MH0005.",
    sizes: ["M"],
    colors: ["Hồng trắng"],
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    reviews: 12
  },
  {
    id: 11,
    name: "DT0001",
    folder: "dress10",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    rentPrice: 80000,
    buyPrice: 420000,
    category: "vay-tiec",
    description: "Mã váy DT0001.",
    sizes: ["M"],
    colors: ["Trắng chấm bi"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    reviews: 16
  },
  {
    id: 12,
    name: "DT0002",
    folder: "dress11",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 100000,
    buyPrice: 500000,
    category: "vay-tiec",
    description: "Mã váy DT0002.",
    sizes: ["M"],
    colors: ["Đen"],
    isNew: true,
    isFeatured: false,
    rating: 4.5,
    reviews: 19
  },
  {
    id: 13,
    name: "DT0003",
    folder: "dress12",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 90000,
    buyPrice: 470000,
    category: "vay-tiec",
    description: "Mã váy DT0003.",
    sizes: ["S", "M", "L"],
    colors: ["Trắng"],
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    reviews: 11
  },
  {
    id: 14,
    name: "DT0004",
    folder: "dress13",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 90000,
    buyPrice: 470000,
    category: "vay-tiec",
    description: "Mã váy DT0004.",
    sizes: ["M"],
    colors: ["Hồng kem"],
    isNew: true,
    isFeatured: false,
    rating: 4.8,
    reviews: 23
  },
  {
    id: 15,
    name: "DT0005",
    folder: "dress14",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 80000,
    buyPrice: 420000,
    category: "vay-tiec",
    description: "Mã váy DT0005.",
    sizes: ["M"],
    colors: [ "Trắng Sữa"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    reviews: 14
  },
  {
    id: 16,
    name: "DT0006",
    folder: "dress15",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    rentPrice: 90000,
    buyPrice: 450000,
    category: "vay-tiec",
    description: "Mã váy DT0006.",
    sizes: ["M"],
    colors: ["Trắng Sữa"],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviews: 33
  },
  {
    id: 17,
    name: "DT0007",
    folder: "dress16",
    images: ["1.jpg", "2.jpg"],
    rentPrice: 90000,
    buyPrice: 450000,
    category: "vay-tiec",
    description: "Mã váy DT0007.",
    sizes: ["S", "M", "L"],
    colors: ["Màu Be"],
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    reviews: 7
  },
  {
    id: 18,
    name: "DT0008",
    folder: "dress17",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    rentPrice: 120000,
    buyPrice: 600000,
    category: "vay-tiec",
    description: "Mã váy DT0008.",
    sizes: ["M"],
    colors: ["Xanh Lá"],
    isNew: true,
    isFeatured: false,
    rating: 4.8,
    reviews: 20
  },
  {
    id: 19,
    name: "DT0009",
    folder: "dress18",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 80000,
    buyPrice: 320000,
    category: "vay-tiec",
    description: "Mã váy DT0009.",
    sizes: ["M"],
    colors: ["Baby Pink"],
    isNew: false,
    isFeatured: true,
    rating: 5.0,
    reviews: 38
  },
  {
    id: 20,
    name: "YM0001",
    folder: "dress19",
    images: ["1.jpg", "2.jpg"],
    rentPrice: 80000,
    buyPrice: 320000,
    category: "ao-yem",
    description: "Mã Yếm YM0001.",
    sizes: ["M"],
    colors: ["Hồng Tweed"],
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    reviews: 13
  },
  {
    id: 21,                          // ID duy nhất (tăng lên từ ID cuối)
    name: "CF0001",
    folder: "dress20",               // Tên thư mục trong public/clothes/
    images: ["1.jpg", "2.jpg", "3.jpg"],     // Danh sách tên file ảnh
    rentPrice: 80000,               // Giá thuê (VND/ngày)
    buyPrice: 420000,               // Giá mua (VND)
    category: "vay-cafe",                // dam | vay | ao-dai | set | ao | blazer
    description: "Mã váy CF0001",
    sizes: ["S", "M", "L"],
    colors: ["Trắng đen"],
    isNew: true,
    isFeatured: false,
    rating: 4.8,
    reviews: 5
  },
  {
    id: 22,
    name: "CF0002",
    folder: "dress21",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 80000,
    buyPrice: 320000,
    category: "vay-cafe",
    description: "Mã váy CF0002.",
    sizes: ["M"],
    colors: ["Nâu"],
    isNew: false,
    isFeatured: false,
    rating: 4.9,
    reviews: 16
  },
  {
    id: 23,
    name: "CF0003",
    folder: "dress22",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-cafe",
    description: "Mã váy CF0002.",
    sizes: ["M"],
    colors: ["Trắng"],
    isNew: true,
    isFeatured: false,
    rating: 4.4,
    reviews: 8
  },
  {
    id: 24,
    name: "CF0004",
    folder: "dress23",
    images: ["1.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-cafe",
    description: "Mã váy CF0004.",
    sizes: ["M"],
    colors: ["Đỏ"],
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    reviews: 19
  },
  {
    id: 25,
    name: "CF0005",
    folder: "dress24",
    images: ["1.jpg", "2.jpg"],
    rentPrice: 50000,
    buyPrice: 200000,
    category: "vay-cafe",
    description: "Mã váy CF0005.",
    sizes: ["M"],
    colors: ["Xanh vàng"],
    isNew: true,
    isFeatured: false,
    rating: 4.5,
    reviews: 15
  },
  {
    id: 26,
    name: "CF0006",
    folder: "dress25",
    images: ["1.jpg", "2.jpg"],
    rentPrice: 50000,
    buyPrice: 2000000,
    category: "vay-cafe",
    description: "Mã váy CF0006.",
    sizes: ["M"],
    colors: ["Trắng xanh"],
    isNew: true,
    isFeatured: false,
    rating: 4.9,
    reviews: 25
  },
   {
    id: 27,
    name: "CF0007",
    folder: "dress26",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    rentPrice: 80000,
    buyPrice: 320000,
    category: "vay-cafe",
    description: "Mã váy CF0007.",
    sizes: ["M"],
    colors: ["Trắng đem"],
    isNew: true,
    isFeatured: false,
    rating: 4.2,
    reviews: 10
  }
];

/**
 * CATEGORIES LIST
 * Add or remove categories here as needed
 */
const CATEGORIES = [
  { id: "all",        name: "Tất cả",       icon: "fa-border-all" },
  { id: "vay-bien",  name: "Váy đi biển",  icon: "fa-umbrella-beach" },
  { id: "vay-cafe",  name: "Váy đi cafe",  icon: "fa-mug-hot" },
  { id: "ao-dai",    name: "Áo Dài",       icon: "fa-star" },
  { id: "ao-yem",    name: "Áo Yếm",       icon: "fa-heart" },
  { id: "vay-tiec",  name: "Váy dự tiệc",  icon: "fa-champagne-glasses" },
  { id: "phu-kien",  name: "Phụ kiện",     icon: "fa-gem" }
];

/**
 * RENT PRICE PER DAY (VND)
 * Change this base rate to adjust all rental prices globally
 */
const BASE_RENT_PRICE_PER_DAY = 20000;

/**
 * SHOP INFO
 * Update your shop details here
 */
const SHOP_INFO = {
  name: "Shop Gia Linh 💓",
  phone: "0962471234",
  facebook: "https://www.facebook.com/linhtg06",
  email: "ngval1234@gmail.com",
  address: "TP. Hồ Chí Minh, Việt Nam",
  bank: "MBBANK",
  bankAccount: "0962471234",
  bankOwner: "NGUYEN THI GIA LINH"
};

/**
 * FORMAT CURRENCY
 * Formats number to Vietnamese Dong format
 */
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

/**
 * GET IMAGE PATH
 * Returns the full path to a product image
 * Usage: getImagePath('dress1', '1.jpg')
 */
function getImagePath(folder, filename) {
  return `/public/clothes/${folder}/${filename}`;
}

// Expose for global use
window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;
window.SHOP_INFO = SHOP_INFO;
window.formatVND = formatVND;
window.getImagePath = getImagePath;
