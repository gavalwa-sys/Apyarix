(function () {
  'use strict';

  var products = [
    { id: 1, name: 'Pure Honey', slug: 'pure-honey', category: 'Honey', short: 'Natural honey for everyday enjoyment.', description: 'A rich honey product presented by Apyarix. Contact Apyarix for availability and packaging options.', price: 150, stock: 50 },
    { id: 2, name: 'Beeswax', slug: 'beeswax', category: 'Beeswax', short: 'Versatile natural beeswax from the hive.', description: 'Natural beeswax for household, craft and other suitable uses.', price: 120, stock: 30 },
    { id: 3, name: 'Propolis', slug: 'propolis', category: 'Propolis', short: 'A natural hive product from Apyarix.', description: 'Ask Apyarix about available propolis products and packaging.', price: 180, stock: 25 }
  ];
  var whatsappNumber = '254180737032';
  var money = function (value) { return 'K' + Number(value).toFixed(2); };
  var whatsapp = function (message) { return 'https://wa.me/' + whatsappNumber + (message ? '?text=' + encodeURIComponent(message) : ''); };
  var getCart = function () { try { return JSON.parse(localStorage.getItem('apy_cart') || '{}'); } catch (error) { return {}; } };
  var setCart = function (cart) { localStorage.setItem('apy_cart', JSON.stringify(cart)); updateCartBadge(); };
  var cartCount = function () { return Object.keys(getCart()).reduce(function (total, id) { return total + Number(getCart()[id] || 0); }, 0); };
  var findProduct = function (id) { return products.find(function (product) { return product.id === Number(id); }); };
  var productCard = function (product) {
    return '<article class="product-card"><div class="product-image"><span>🍯</span></div><div class="product-body"><small>Apyarix · ' + product.category + '</small><h3>' + product.name + '</h3><p>' + product.short + '</p><strong>' + money(product.price) + '</strong><div class="card-actions"><a href="product.html?id=' + product.id + '">Details →</a><button class="btn btn-gold add-to-cart" data-id="' + product.id + '">Add to cart</button></div></div></article>';
  };
  var updateCartBadge = function () { document.querySelectorAll('.cart-badge').forEach(function (badge) { badge.textContent = cartCount(); }); };

  function renderChrome() {
    var header = document.getElementById('site-header');
    var footer = document.getElementById('site-footer');
    if (header) header.innerHTML = '<header class="site-header"><a class="brand" href="index.html"><img src="images/logo.png" alt="Apyarix logo" class="site-logo"><span class="brand-wordmark">Apyarix</span></a><nav><a href="index.html">Home</a><a href="products.html">Products</a><a href="brands.html">About</a><a href="about.html">Story</a><a href="contact.html">Contact</a></nav><div class="nav-actions"><a href="cart.html">🛒 Cart <span class="cart-badge">0</span></a><a href="login.html">Login</a></div></header>';
    if (footer) footer.innerHTML = '<footer class="footer"><div><div class="footer-brand"><img src="images/logo.png" alt="Apyarix logo" class="footer-logo"> <span>Apyarix</span></div><p>Pure honey. Healthy tomorrow.</p><div class="social-row"><a href="' + whatsapp('Hello Apyarix, I would like to enquire about your products.') + '" target="_blank" rel="noopener" aria-label="WhatsApp">WhatsApp</a></div></div><div><h4>Explore</h4><a href="products.html">Products</a><a href="brands.html">About</a><a href="contact.html">Contact</a></div><div><h4>Our promise</h4><p>Natural ingredients, trusted quality and clean bee products.</p></div><div><h4>Contact</h4><p>WhatsApp ordering available</p><a href="contact.html">Send an enquiry →</a></div></footer><div class="copyright">© ' + new Date().getFullYear() + ' Apyarix. All rights reserved.</div>';
    var main = document.querySelector('main');
    if (main) {
      var floating = document.createElement('a'); floating.className = 'whatsapp-float'; floating.href = whatsapp('Hello Apyarix, I would like to enquire about your products.'); floating.target = '_blank'; floating.rel = 'noopener'; floating.textContent = 'WA'; floating.setAttribute('aria-label', 'Chat on WhatsApp'); main.prepend(floating);
    }
    updateCartBadge();
  }

  function renderProducts() {
    var grid = document.getElementById('product-grid');
    if (!grid) return;
    var category = new URLSearchParams(location.search).get('category');
    var visible = category ? products.filter(function (product) { return product.category.toLowerCase() === category.toLowerCase(); }) : products;
    grid.innerHTML = visible.map(productCard).join('') || '<div class="empty">No products found.</div>';
  }

  function renderFeatured() {
    var grid = document.getElementById('featured-products');
    if (grid) grid.innerHTML = products.slice(0, 3).map(productCard).join('');
  }

  function renderProduct() {
    var target = document.getElementById('product-detail');
    if (!target) return;
    var product = findProduct(new URLSearchParams(location.search).get('id')) || products[0];
    document.title = product.name + ' — Apyarix';
    target.innerHTML = '<div class="detail-image">🍯</div><div><span class="eyebrow">Apyarix</span><h1>' + product.name + '</h1><div class="price">' + money(product.price) + '</div><p class="lead">' + product.description + '</p><button class="btn btn-gold add-to-cart" data-id="' + product.id + '">Add to cart</button><a class="btn btn-outline" href="contact.html?product=' + encodeURIComponent(product.name) + '">Order / enquire</a><p class="muted">Stock: ' + product.stock + ' available</p></div>';
  }

  function renderCart() {
    var target = document.getElementById('cart-content');
    if (!target) return;
    var cart = getCart();
    var entries = Object.keys(cart).map(function (id) { return { product: findProduct(id), quantity: Math.min(Number(cart[id]), findProduct(id).stock) }; }).filter(function (item) { return item.product && item.quantity > 0; });
    if (!entries.length) { target.innerHTML = '<div class="empty">Your cart is empty. <a href="products.html">Browse products →</a></div>'; return; }
    var total = entries.reduce(function (sum, item) { return sum + item.product.price * item.quantity; }, 0);
    target.innerHTML = '<div class="cart-table">' + entries.map(function (item) { return '<div class="cart-row"><div class="cart-product"><div class="mini-image">🍯</div><div><b>' + item.product.name + '</b><small>Apyarix</small></div></div><span>' + money(item.product.price) + '</span><input class="qty cart-qty" type="number" min="0" max="' + item.product.stock + '" data-id="' + item.product.id + '" value="' + item.quantity + '"><b>' + money(item.product.price * item.quantity) + '</b><button class="link-btn remove-cart" data-id="' + item.product.id + '">Remove</button></div>'; }).join('') + '</div><div class="cart-summary"><span>Total</span><strong>' + money(total) + '</strong></div><div class="actions right"><a class="btn btn-gold" href="checkout.html">Checkout →</a></div>';
  }

  function bindActions() {
    document.addEventListener('click', function (event) {
      var add = event.target.closest('.add-to-cart');
      if (add) { var cart = getCart(); var product = findProduct(add.dataset.id); cart[product.id] = Math.min(product.stock, Number(cart[product.id] || 0) + 1); setCart(cart); add.textContent = 'Added'; setTimeout(function () { add.textContent = 'Add to cart'; }, 900); }
      var remove = event.target.closest('.remove-cart');
      if (remove) { var next = getCart(); delete next[remove.dataset.id]; setCart(next); renderCart(); }
    });
    document.addEventListener('change', function (event) {
      if (!event.target.classList.contains('cart-qty')) return;
      var cart = getCart(); var value = Number(event.target.value); if (value > 0) cart[event.target.dataset.id] = value; else delete cart[event.target.dataset.id]; setCart(cart); renderCart();
    });
    var contactForm = document.getElementById('contact-form');
    if (contactForm) contactForm.addEventListener('submit', function (event) { event.preventDefault(); var data = new FormData(contactForm); var message = 'Hello Apyarix, my name is ' + data.get('name') + '. ' + data.get('message'); window.open(whatsapp(message), '_blank', 'noopener'); contactForm.reset(); var notice = document.getElementById('form-notice'); if (notice) notice.textContent = 'WhatsApp opened with your enquiry.'; });
    var checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) checkoutForm.addEventListener('submit', function (event) { event.preventDefault(); var data = new FormData(checkoutForm); var items = Object.keys(getCart()).map(function (id) { var p = findProduct(id); return p.name + ' x ' + getCart()[id]; }).join(', '); window.open(whatsapp('Hello Apyarix, I would like to order: ' + items + '. Delivery address: ' + data.get('address')), '_blank', 'noopener'); localStorage.removeItem('apy_cart'); location.href = 'order-success.html'; });
  }

  renderChrome(); renderProducts(); renderFeatured(); renderProduct(); renderCart(); bindActions();
})();
