/**
 * ============================================================
 * SHOP GIA LINH - BACKEND API SERVER
 * ============================================================
 * HOW TO RUN:
 *   npm install
 *   npm run dev       (auto-reload on save)
 *   npm start         (normal start)
 *
 * URLs:
 *   Website:  http://localhost:3000
 *   Homepage: http://localhost:3000/pages/index.html
 *   Checkout: http://localhost:3000/pages/checkout.html
 *   Admin:    http://localhost:3000/pages/admin.html
 *   API:      http://localhost:3000/api/orders
 * ============================================================
 */

const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ──
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── SERVE STATIC FILES ──
// Serves everything from the project root folder.
// So /assets/css/style.css → reads shop-gia-linh/assets/css/style.css
// And /pages/index.html    → reads shop-gia-linh/pages/index.html
// And /public/clothes/...  → reads shop-gia-linh/public/clothes/...
const ROOT = path.join(__dirname, '..');
app.use(express.static(ROOT));

// ── DATABASE FILE ──
// Vercel serverless can only write to /tmp; locally use the project folder.
const DB_FILE = process.env.VERCEL
  ? '/tmp/orders.json'
  : path.join(__dirname, 'orders.json');

function loadOrders() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ orders: [] }));
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch(e) {
    return { orders: [] };
  }
}

function saveOrders(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

/* ════════════════════════════════════════
   API ROUTES
════════════════════════════════════════ */

// GET all orders
app.get('/api/orders', (req, res) => {
  const data = loadOrders();
  let orders = [...data.orders].reverse();
  if (req.query.status) orders = orders.filter(o => o.status === req.query.status);
  if (req.query.limit)  orders = orders.slice(0, parseInt(req.query.limit));
  res.json({ success: true, count: orders.length, orders });
});

// GET single order
app.get('/api/orders/:id', (req, res) => {
  const data  = loadOrders();
  const order = data.orders.find(o => o.orderId === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
  res.json({ success: true, order });
});

// POST create order
app.post('/api/orders', (req, res) => {
  const data  = loadOrders();
  const order = {
    ...req.body,
    status:    req.body.status    || 'pending',
    createdAt: req.body.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.orders.push(order);
  saveOrders(data);
  console.log(`📦 New order: ${order.orderId} — ${order.customer?.name} — ${new Intl.NumberFormat('vi-VN').format(order.total || 0)}₫`);
  res.status(201).json({ success: true, message: 'Đặt hàng thành công!', orderId: order.orderId, order });
});

// PATCH update order
app.patch('/api/orders/:id', (req, res) => {
  const data  = loadOrders();
  const index = data.orders.findIndex(o => o.orderId === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
  ['status', 'note'].forEach(f => { if (req.body[f] !== undefined) data.orders[index][f] = req.body[f]; });
  data.orders[index].updatedAt = new Date().toISOString();
  saveOrders(data);
  res.json({ success: true, order: data.orders[index] });
});

// DELETE order
app.delete('/api/orders/:id', (req, res) => {
  const data = loadOrders();
  const len  = data.orders.length;
  data.orders = data.orders.filter(o => o.orderId !== req.params.id);
  if (data.orders.length === len) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
  saveOrders(data);
  res.json({ success: true, message: 'Đã xóa' });
});

// GET stats
app.get('/api/stats', (req, res) => {
  const { orders } = loadOrders();
  res.json({
    success: true,
    stats: {
      total:     orders.length,
      pending:   orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      revenue:   orders.filter(o => o.status !== 'cancelled').reduce((s,o) => s + (o.total || 0), 0)
    }
  });
});

/* ════════════════════════════════════════
   ROOT → redirect to homepage
════════════════════════════════════════ */
app.get('/', (req, res) => {
  res.redirect('/pages/index.html');
});

/* ════════════════════════════════════════
   START SERVER
════════════════════════════════════════ */
app.listen(PORT, () => {
  console.log('');
  console.log('💓 ══════════════════════════════════ 💓');
  console.log('      SHOP GIA LINH  —  Server ON');
  console.log(`  🌐  http://localhost:${PORT}`);
  console.log(`  📊  http://localhost:${PORT}/pages/admin.html`);
  console.log(`  💳  http://localhost:${PORT}/pages/checkout.html`);
  console.log(`  📦  http://localhost:${PORT}/api/orders`);
  console.log('💓 ══════════════════════════════════ 💓');
  console.log('');
});

module.exports = app;
