/**
 * ============================================================
 * SHOP GIA LINH - MAIN JAVASCRIPT
 * ============================================================
 * Contains:
 * - Cart management
 * - Product rendering
 * - Modal handling
 * - Rental date calculation
 * - Notifications
 * ============================================================
 */

/* ─────────────────────────────────────────
   CART STATE
   Stores all items the user has added
───────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('glCart') || '[]');
let orderIdCounter = parseInt(localStorage.getItem('glOrderId') || '1000');

/* ─────────────────────────────────────────
   SAVE CART
───────────────────────────────────────── */
function saveCart() {
  localStorage.setItem('glCart', JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}

/* ─────────────────────────────────────────
   UPDATE CART BADGE (number on nav icon)
───────────────────────────────────────── */
function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

/* ─────────────────────────────────────────
   ADD TO CART
   @param product - product object from PRODUCTS
   @param type    - 'rent' or 'buy'
   @param options - { startDate, endDate, days, size }
───────────────────────────────────────── */
function addToCart(product, type, options = {}) {
  const item = {
    id: Date.now(),
    productId: product.id,
    name: product.name,
    folder: product.folder,
    image: product.images[0],
    type: type,
    size: options.size || 'M',
    qty: 1
  };

  if (type === 'rent') {
    // Rental item includes dates and calculated price
    item.startDate = options.startDate;
    item.endDate   = options.endDate;
    item.days      = options.days || 1;
    item.price     = product.rentPrice * item.days;
    item.unitPrice = product.rentPrice;
  } else {
    // Buy item uses selling price
    item.price = product.buyPrice;
  }

  cart.push(item);
  saveCart();

  // Show success notification
  showToast('Đã thêm vào giỏ!', `${product.name} đã được thêm vào giỏ hàng.`, 'fa-bag-shopping');
}

/* ─────────────────────────────────────────
   REMOVE FROM CART
───────────────────────────────────────── */
function removeFromCart(itemId) {
  cart = cart.filter(i => i.id !== itemId);
  saveCart();
}

/* ─────────────────────────────────────────
   GET CART TOTAL
───────────────────────────────────────── */
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

/* ─────────────────────────────────────────
   RENDER CART ITEMS (in sidebar)
───────────────────────────────────────── */
function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  const totalEl   = document.getElementById('cartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 3rem; color: var(--gray-mid);">
        <i class="fas fa-shopping-bag" style="font-size:3rem; margin-bottom:1rem; display:block;"></i>
        <p>Giỏ hàng trống</p>
      </div>`;
    if (totalEl) totalEl.textContent = formatVND(0);
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="/public/clothes/${item.folder}/${item.image}"
             onerror="this.src='../assets/images/placeholder.jpg'" alt="${item.name}">
      </div>
      <div style="flex:1;">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-type">
          ${item.type === 'rent'
            ? `<i class="fas fa-calendar-days"></i> Thuê ${item.days} ngày (${item.startDate} → ${item.endDate})`
            : '<i class="fas fa-shopping-bag"></i> Mua'}
        </div>
        <div class="cart-item-price">Size ${item.size} • ${formatVND(item.price)}</div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
          <i class="fas fa-trash-can"></i> Xóa
        </button>
      </div>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = formatVND(getCartTotal());
}

/* ─────────────────────────────────────────
   OPEN / CLOSE CART
───────────────────────────────────────── */
function openCart() {
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
}

/* ─────────────────────────────────────────
   RENDER PRODUCTS
   @param productsToRender - array of products
   Call with PRODUCTS to show all, or a filtered array
───────────────────────────────────────── */
function renderProducts(productsToRender) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (productsToRender.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:4rem; color:var(--gray-mid);">
        <i class="fas fa-search" style="font-size:3rem;margin-bottom:1rem;display:block;"></i>
        <p>Không tìm thấy sản phẩm nào</p>
      </div>`;
    return;
  }

  grid.innerHTML = productsToRender.map(p => `
    <!--
      PRODUCT CARD: ${p.name}
      Folder: public/clothes/${p.folder}/
      To change price: edit products.js → rentPrice / buyPrice
    -->
    <div class="product-card" data-aos="fade-up">
      <div class="product-image-wrap">
        <!-- Main product image (first image in folder) -->
        <img src="/public/clothes/${p.folder}/${p.images[0]}"
             onerror="this.src='../assets/images/placeholder.jpg'"
             alt="${p.name}" loading="lazy">

        <!-- Badge: New or Featured -->
        ${p.isNew ? '<span class="product-badge badge-new">Mới</span>' : ''}
        ${p.rating >= 5 && !p.isNew ? '<span class="product-badge badge-hot">Hot</span>' : ''}

        <!-- Wishlist button -->
        <button class="wishlist-btn" onclick="toggleWishlist(this, ${p.id})">
          <i class="far fa-heart"></i>
        </button>

        <!-- Quick action overlay (shows on hover) -->
        <div class="product-actions-overlay">
          <button class="overlay-btn overlay-btn-rent" onclick="openProductModal(${p.id})">
            <i class="fas fa-calendar-days"></i> Thuê
          </button>
          <button class="overlay-btn overlay-btn-buy" onclick="quickBuy(${p.id})">
            <i class="fas fa-bag-shopping"></i> Mua
          </button>
          <button class="overlay-btn overlay-btn-view" onclick="openProductModal(${p.id})">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>

      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <div class="product-category-tag">${getCategoryName(p.category)}</div>

        <div class="product-prices">
          <span class="price-rent">
            <i class="fas fa-calendar-days"></i> ${formatVND(p.rentPrice)}/ngày
          </span>
          <span class="price-buy">
            <i class="fas fa-tag"></i> ${formatVND(p.buyPrice)}
          </span>
        </div>

        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '½' : ''}</span>
          <span style="font-weight:600;">${p.rating}</span>
          <span class="rating-count">(${p.reviews} đánh giá)</span>
        </div>

        <div class="product-btn-group">
          <button class="btn-rent-small" onclick="openProductModal(${p.id})">
            <i class="fas fa-calendar-days"></i> Thuê
          </button>
          <button class="btn-buy-small" onclick="quickBuy(${p.id})">
            <i class="fas fa-shopping-bag"></i> Mua ngay
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Re-initialize AOS for new elements
  if (window.AOS) AOS.refresh();
}

/* ─────────────────────────────────────────
   GET CATEGORY NAME
───────────────────────────────────────── */
function getCategoryName(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  return cat ? cat.name : catId;
}

/* ─────────────────────────────────────────
   FILTER BY CATEGORY
───────────────────────────────────────── */
function filterByCategory(catId) {
  // Highlight active category button
  document.querySelectorAll('.category-card').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === catId);
  });

  const filtered = catId === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === catId);

  renderProducts(filtered);
}

/* ─────────────────────────────────────────
   SEARCH PRODUCTS
───────────────────────────────────────── */
function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) { renderProducts(PRODUCTS); return; }

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    getCategoryName(p.category).toLowerCase().includes(q)
  );

  renderProducts(filtered);
}

/* ─────────────────────────────────────────
   QUICK BUY (adds buy item directly to cart)
───────────────────────────────────────── */
function quickBuy(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  addToCart(product, 'buy', { size: 'M' });
  openCart();
}

/* ─────────────────────────────────────────
   TOGGLE WISHLIST
───────────────────────────────────────── */
function toggleWishlist(btn, productId) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('active')) {
    icon.className = 'fas fa-heart';
    showToast('Đã thêm vào yêu thích!', 'Sản phẩm đã lưu vào danh sách yêu thích.', 'fa-heart');
  } else {
    icon.className = 'far fa-heart';
  }
}

/* ─────────────────────────────────────────
   PRODUCT MODAL
   Opens a detailed product view with image slider,
   rental date picker, and size selection
───────────────────────────────────────── */
let activeProduct = null;
let rentalStartPicker = null;
let rentalEndPicker  = null;

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeProduct = product;

  const modal = document.getElementById('productModal');
  if (!modal) return;

  // Populate modal content
  modal.querySelector('.modal-product-name').textContent = product.name;
  modal.querySelector('.modal-price-val.rent').textContent = `${formatVND(product.rentPrice)}/ngày`;
  modal.querySelector('.modal-price-val.buy').textContent  = formatVND(product.buyPrice);
  modal.querySelector('.modal-desc').textContent = product.description;

  // Sizes
  const sizeRow = modal.querySelector('.size-row');
  if (sizeRow) {
    sizeRow.innerHTML = product.sizes.map(s =>
      `<button class="size-btn" onclick="selectSize(this)">${s}</button>`
    ).join('');
    // Select first size by default
    sizeRow.querySelector('.size-btn')?.classList.add('selected');
  }

  // Category tag
  const catTag = modal.querySelector('.modal-category');
  if (catTag) catTag.textContent = getCategoryName(product.category);

  // Build image slider
  const swiperWrapper = modal.querySelector('.modal-swiper-wrapper');
  if (swiperWrapper) {
    swiperWrapper.innerHTML = product.images.map(img => `
      <div class="swiper-slide">
        <img src="/public/clothes/${product.folder}/${img}"
             onerror="this.src='../assets/images/placeholder.jpg'"
             alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">
      </div>
    `).join('');

    // Initialize / update Swiper
    if (window.modalSwiper) {
      window.modalSwiper.destroy();
    }
    window.modalSwiper = new Swiper('.modal-swiper', {
      loop: product.images.length > 1,
      pagination: { el: '.modal-swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.modal-swiper-next',
        prevEl: '.modal-swiper-prev'
      }
    });
  }

  // Reset rental total
  updateRentalTotal(0);

  // Open modal
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Initialize date pickers
  setTimeout(() => initModalDatepickers(product), 200);
}

/* ─────────────────────────────────────────
   SELECT SIZE
───────────────────────────────────────── */
function selectSize(btn) {
  btn.closest('.size-row').querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

/* ─────────────────────────────────────────
   INIT MODAL DATE PICKERS
   Uses Flatpickr for the rental date selection
───────────────────────────────────────── */
function initModalDatepickers(product) {
  if (!window.flatpickr) return;

  // Destroy old pickers if they exist
  if (rentalStartPicker) rentalStartPicker.destroy();
  if (rentalEndPicker)   rentalEndPicker.destroy();

  const today = new Date();

  rentalStartPicker = flatpickr('#rentalStart', {
    minDate: 'today',
    dateFormat: 'd/m/Y',
    locale: 'vn',
    onChange(selectedDates) {
      // When start date changes, update end date minimum
      rentalEndPicker.set('minDate', selectedDates[0]);
      calculateRental(product);
    }
  });

  rentalEndPicker = flatpickr('#rentalEnd', {
    minDate: 'today',
    dateFormat: 'd/m/Y',
    locale: 'vn',
    onChange() { calculateRental(product); }
  });
}

/* ─────────────────────────────────────────
   CALCULATE RENTAL PRICE
   Formula: days × rentPrice per day
───────────────────────────────────────── */
function calculateRental(product) {
  const startEl = document.getElementById('rentalStart');
  const endEl   = document.getElementById('rentalEnd');
  if (!startEl?.value || !endEl?.value) return;

  // Parse dates (format: dd/mm/yyyy)
  const parseDate = str => {
    const [d, m, y] = str.split('/');
    return new Date(`${y}-${m}-${d}`);
  };

  const start = parseDate(startEl.value);
  const end   = parseDate(endEl.value);
  const ms    = end - start;

  if (ms <= 0) {
    updateRentalTotal(0);
    return;
  }

  // Calculate number of days
  const days  = Math.ceil(ms / (1000 * 60 * 60 * 24));
  // Calculate total price: days × price per day
  const total = days * product.rentPrice;

  updateRentalTotal(total, days);
}

/* ─────────────────────────────────────────
   UPDATE RENTAL TOTAL DISPLAY
───────────────────────────────────────── */
function updateRentalTotal(total, days = 0) {
  const el = document.getElementById('rentalTotal');
  if (!el) return;

  if (total > 0) {
    el.textContent = `Tổng tiền thuê: ${formatVND(total)} (${days} ngày)`;
    el.style.color = 'var(--pink-dark)';
  } else {
    el.textContent = 'Chọn ngày để xem giá thuê';
    el.style.color = 'var(--gray-mid)';
  }
}

/* ─────────────────────────────────────────
   CLOSE PRODUCT MODAL
───────────────────────────────────────── */
function closeProductModal() {
  document.getElementById('productModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────
   ADD RENTAL TO CART (from modal)
───────────────────────────────────────── */
function addRentalToCart() {
  if (!activeProduct) return;

  const startVal = document.getElementById('rentalStart')?.value;
  const endVal   = document.getElementById('rentalEnd')?.value;

  if (!startVal || !endVal) {
    showToast('Chú ý!', 'Vui lòng chọn ngày bắt đầu và ngày kết thúc.', 'fa-calendar-exclamation', 'warning');
    return;
  }

  const parseDate = str => {
    const [d, m, y] = str.split('/');
    return new Date(`${y}-${m}-${d}`);
  };

  const start = parseDate(startVal);
  const end   = parseDate(endVal);
  const days  = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    showToast('Lỗi!', 'Ngày kết thúc phải sau ngày bắt đầu.', 'fa-circle-exclamation', 'error');
    return;
  }

  const selectedSize = document.querySelector('.size-btn.selected')?.textContent || 'M';

  addToCart(activeProduct, 'rent', {
    startDate: startVal,
    endDate: endVal,
    days,
    size: selectedSize
  });

  closeProductModal();
  openCart();
}

/* ─────────────────────────────────────────
   ADD BUY TO CART (from modal)
───────────────────────────────────────── */
function addBuyToCart() {
  if (!activeProduct) return;
  const selectedSize = document.querySelector('.size-btn.selected')?.textContent || 'M';
  addToCart(activeProduct, 'buy', { size: selectedSize });
  closeProductModal();
  openCart();
}

/* ─────────────────────────────────────────
   SHOW TOAST NOTIFICATION
   @param title   - notification title
   @param message - notification message
   @param icon    - FontAwesome icon class (without 'fa-' prefix won't work, pass full 'fa-...')
   @param type    - 'success' | 'warning' | 'error'
───────────────────────────────────────── */
function showToast(title, message, icon = 'fa-check-circle', type = 'success') {
  const container = document.getElementById('notifContainer');
  if (!container) return;

  const colors = {
    success: 'var(--pink-dark)',
    warning: '#f57c00',
    error:   '#c62828'
  };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = colors[type] || colors.success;
  toast.innerHTML = `
    <div class="toast-icon" style="color:${colors[type] || colors.success}">
      <i class="fas ${icon}"></i>
    </div>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ─────────────────────────────────────────
   NAVBAR SCROLL EFFECT
   Makes navbar more compact when scrolled
───────────────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ─────────────────────────────────────────
   SCROLL TO TOP BUTTON
───────────────────────────────────────── */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────
   PAGE LOADER (hide after page loads)
───────────────────────────────────────── */
function initPageLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('.page-loader')?.classList.add('hidden');
    }, 600);
  });
}

/* ─────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });
}

/* ─────────────────────────────────────────
   GENERATE ORDER ID
───────────────────────────────────────── */
function generateOrderId() {
  orderIdCounter++;
  localStorage.setItem('glOrderId', orderIdCounter.toString());
  return `GL${orderIdCounter}`;
}

/* ─────────────────────────────────────────
   SUBMIT ORDER (used in checkout.html)
   Sends order to local API and shows confirmation
───────────────────────────────────────── */
async function submitOrder(formData) {
  const orderId = generateOrderId();

  const order = {
    orderId,
    ...formData,
    items: cart,
    total: getCartTotal(),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  try {
    // Send to local Node.js API
    const response = await axios.post('/api/orders', order);
    console.log('Order sent:', response.data);
  } catch (err) {
    // If server not running, store locally
    console.warn('Server not available, saving locally');
    const orders = JSON.parse(localStorage.getItem('glOrders') || '[]');
    orders.push(order);
    localStorage.setItem('glOrders', JSON.stringify(orders));
  }

  // Clear cart
  cart = [];
  saveCart();

  return orderId;
}

/* ─────────────────────────────────────────
   INIT AOS ANIMATIONS
───────────────────────────────────────── */
function initAnimations() {
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }
}

/* ─────────────────────────────────────────
   INIT SWIPER FOR REVIEWS
───────────────────────────────────────── */
function initReviewsSwiper() {
  if (!window.Swiper) return;
  new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.reviews-pagination', clickable: true },
    breakpoints: {
      640:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}

/* ─────────────────────────────────────────
   INIT HERO SWIPER
───────────────────────────────────────── */
function initHeroSwiper() {
  if (!window.Swiper) return;
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: { el: '.hero-swiper-pagination', clickable: true }
  });
}

/* ─────────────────────────────────────────
   INIT FEATURED PRODUCTS SWIPER
───────────────────────────────────────── */
function initFeaturedSwiper() {
  if (!window.Swiper) return;
  new Swiper('.featured-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: false,
    pagination: { el: '.featured-pagination', clickable: true },
    navigation: {
      nextEl: '.featured-next',
      prevEl: '.featured-prev'
    },
    breakpoints: {
      480:  { slidesPerView: 2 },
      768:  { slidesPerView: 3 },
      1024: { slidesPerView: 4 }
    }
  });
}

/* ─────────────────────────────────────────
   INIT CATEGORIES SECTION
───────────────────────────────────────── */
function initCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card ${cat.id === 'all' ? 'active' : ''}"
         data-cat="${cat.id}"
         onclick="filterByCategory('${cat.id}')">
      <div class="category-icon">
        <i class="fas ${cat.icon}"></i>
      </div>
      <div class="category-name">${cat.name}</div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   INIT FEATURED PRODUCTS SLIDER
   Shows featured products in the slider section
───────────────────────────────────────── */
function initFeaturedProducts() {
  const wrap = document.getElementById('featuredWrapper');
  if (!wrap) return;

  const featured = PRODUCTS.filter(p => p.isFeatured);

  wrap.innerHTML = featured.map(p => `
    <div class="swiper-slide">
      <div class="product-card">
        <div class="product-image-wrap">
          <img src="/public/clothes/${p.folder}/${p.images[0]}"
               onerror="this.src='../assets/images/placeholder.jpg'"
               alt="${p.name}" loading="lazy">
          ${p.isNew ? '<span class="product-badge badge-new">Mới</span>' : ''}
          <button class="wishlist-btn" onclick="toggleWishlist(this, ${p.id})">
            <i class="far fa-heart"></i>
          </button>
          <div class="product-actions-overlay">
            <button class="overlay-btn overlay-btn-rent" onclick="openProductModal(${p.id})">
              <i class="fas fa-calendar-days"></i> Thuê
            </button>
            <button class="overlay-btn overlay-btn-buy" onclick="quickBuy(${p.id})">
              <i class="fas fa-bag-shopping"></i> Mua
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">${p.name}</h3>
          <div class="product-prices">
            <span class="price-rent">${formatVND(p.rentPrice)}/ngày</span>
          </div>
          <div class="product-btn-group">
            <button class="btn-rent-small" onclick="openProductModal(${p.id})">Thuê</button>
            <button class="btn-buy-small" onclick="quickBuy(${p.id})">${formatVND(p.buyPrice)}</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  initFeaturedSwiper();
}

/* ─────────────────────────────────────────
   MAIN INIT — runs when DOM is ready
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavbarScroll();
  initScrollTop();
  initMobileMenu();
  initAnimations();
  initCategories();
  renderProducts(PRODUCTS);
  initFeaturedProducts();
  initHeroSwiper();
  initReviewsSwiper();
  updateCartBadge();
  renderCartItems();

  // Cart open/close events
  document.querySelectorAll('[data-open-cart]').forEach(el => {
    el.addEventListener('click', openCart);
  });

  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.querySelector('.cart-close')?.addEventListener('click', closeCart);

  // Product modal close events
  document.getElementById('productModal')?.addEventListener('click', e => {
    if (e.target.id === 'productModal') closeProductModal();
  });

  document.querySelector('.modal-close')?.addEventListener('click', closeProductModal);

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => searchProducts(e.target.value));
  }

  // Contact form submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Gửi thành công!', 'Chúng tôi sẽ liên hệ lại với bạn sớm nhất.', 'fa-envelope-circle-check');
      contactForm.reset();
    });
  }
});
