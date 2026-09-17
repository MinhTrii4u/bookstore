/* ============================================================
   GoldPage — Header Module
   Mega menu, search dropdown, mobile menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== Mobile Menu Toggle ==========
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuBtn.querySelector('[data-lucide]');
      if (icon) {
        const isOpen = !mobileMenu.classList.contains('hidden');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  // ========== Search Functionality ==========
  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchResults = document.getElementById('search-results');

  if (searchInput && searchDropdown && searchResults) {
    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim().toLowerCase();

      if (query.length < 2) {
        searchDropdown.classList.remove('active');
        return;
      }

      debounceTimer = setTimeout(() => {
        const results = GoldPage.books.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query)
        ).slice(0, 5);

        if (results.length === 0) {
          searchResults.innerHTML = `
            <div class="p-6 text-center text-gray-400">
              <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 opacity-40"></i>
              <p class="text-sm">Không tìm thấy sách phù hợp</p>
            </div>
          `;
        } else {
          searchResults.innerHTML = results.map(book => `
            <a href="product-detail.html?id=${book.id}" class="flex items-center gap-3 p-3 hover:bg-amber-50 transition-colors rounded-lg cursor-pointer">
              <img src="${book.image}" alt="${book.title}" class="w-10 h-14 object-cover rounded border border-amber-200">
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate text-gray-800">${book.title}</p>
                <p class="text-xs text-gray-500">${book.author}</p>
                <p class="text-xs font-bold mt-0.5" style="color: var(--gold-dark)">${GoldPage.formatPrice(book.price)}</p>
              </div>
            </a>
          `).join('');
        }

        searchDropdown.classList.add('active');
        if (window.lucide) lucide.createIcons();
      }, 200);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length >= 2) {
        searchDropdown.classList.add('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        searchDropdown.classList.remove('active');
      }
    });
  }

  // ========== Sticky Header Shadow ==========
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
    });
  }

  // ========== Cart Panel Toggle ==========
  const cartBtn = document.getElementById('cart-btn');
  const cartPanel = document.getElementById('cart-panel');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');

  function openCart() {
    if (cartPanel) cartPanel.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    GoldPage.renderCartPanel();
  }

  function closeCart() {
    if (cartPanel) cartPanel.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Expose for external use
  window.openCart = openCart;
  window.closeCart = closeCart;
});
