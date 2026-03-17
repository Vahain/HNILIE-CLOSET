/**
 * ============================================================
 * SHOP GIA LINH - DISCOUNT CODE MANAGER
 * ============================================================
 * Đọc mã giảm giá từ file assets/discounts.txt
 *
 * ĐỂ THÊM MÃ MỚI: Mở file assets/discounts.txt và thêm dòng:
 *   TENMA | % | 20 | Mô tả giảm 20%
 *   TENMA | vnd | 50000 | Mô tả giảm 50k
 *
 * ĐỂ XÓA MÃ: Xóa dòng tương ứng hoặc thêm # ở đầu dòng
 * ============================================================
 */

// Cache để tránh fetch nhiều lần
let _discountCache = null;

/**
 * LOAD DISCOUNTS FROM TXT FILE
 * Fetches and parses assets/discounts.txt
 * Returns: Map of { CODE -> { type, value, description } }
 */
async function loadDiscounts() {
  if (_discountCache) return _discountCache;

  try {
    const res  = await fetch('/assets/discounts.txt');
    const text = await res.text();
    _discountCache = parseDiscountFile(text);
    console.log(`✅ Loaded ${_discountCache.size} discount codes`);
    return _discountCache;
  } catch (err) {
    console.warn('Could not load discounts.txt, using empty list');
    return new Map();
  }
}

/**
 * PARSE DISCOUNT TXT FILE
 * Format per line:  CODE | type | value | description
 * Lines starting with # or blank are ignored
 *
 * @param {string} text - raw file content
 * @returns {Map}
 */
function parseDiscountFile(text) {
  const map = new Map();

  text.split('\n').forEach(line => {
    // Skip comments and blank lines
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const parts = trimmed.split('|').map(p => p.trim());
    if (parts.length < 3) return; // Skip malformed lines

    const [code, type, rawValue, ...descParts] = parts;
    const value = parseFloat(rawValue);

    if (!code || !type || isNaN(value)) return;

    map.set(code.toUpperCase(), {
      type:        type.toLowerCase().trim(), // "%" or "vnd"
      value:       value,
      description: descParts.join('|').trim() || `Giảm ${type === '%' ? value + '%' : formatVND(value)}`
    });
  });

  return map;
}

/**
 * APPLY DISCOUNT CODE
 * Call this from checkout page to validate and apply a code
 *
 * @param {string} code        - code entered by user
 * @param {number} orderTotal  - original total in VND
 * @returns {object} { valid, discount, finalTotal, message, description }
 */
async function applyDiscountCode(code, orderTotal) {
  const discounts = await loadDiscounts();
  const entry     = discounts.get(code.toUpperCase().trim());

  if (!entry) {
    return {
      valid:      false,
      discount:   0,
      finalTotal: orderTotal,
      message:    'Mã giảm giá không hợp lệ hoặc đã hết hạn.'
    };
  }

  let discountAmount = 0;

  if (entry.type === '%') {
    // Percentage discount
    discountAmount = Math.round(orderTotal * entry.value / 100);
  } else {
    // Fixed VND discount — cannot exceed order total
    discountAmount = Math.min(entry.value, orderTotal);
  }

  const finalTotal = Math.max(0, orderTotal - discountAmount);

  return {
    valid:       true,
    discount:    discountAmount,
    finalTotal:  finalTotal,
    description: entry.description,
    typeLabel:   entry.type === '%' ? `-${entry.value}%` : `-${formatVND(entry.value)}`,
    message:     `✅ Áp dụng thành công: ${entry.description}`
  };
}

/**
 * GET ALL DISCOUNT CODES (for admin panel display)
 * Returns array of { code, type, value, description }
 */
async function getAllDiscounts() {
  const map = await loadDiscounts();
  return Array.from(map.entries()).map(([code, data]) => ({ code, ...data }));
}

// Expose globally
window.loadDiscounts     = loadDiscounts;
window.applyDiscountCode = applyDiscountCode;
window.getAllDiscounts   = getAllDiscounts;
