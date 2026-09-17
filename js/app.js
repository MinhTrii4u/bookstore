/* ============================================================
   GoldPage — Core App Logic
   Shared state, toast notifications, cart badge, utilities
   ============================================================ */

const GoldPage = (() => {
  // ========== Default Book Data ==========
  const defaultBooks = [
    {
      id: 1,
      title: 'Đắc Nhân Tâm',
      author: 'Dale Carnegie',
      price: 86000,
      originalPrice: 108000,
      rating: 4.8,
      reviews: 2341,
      category: 'Kỹ năng sống',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop',
      badge: 'bestseller',
      description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử, giúp bạn chinh phục mọi mối quan hệ trong cuộc sống.',
      publisher: 'NXB Tổng hợp TP.HCM',
      pages: 320,
      year: 2023
    },
    {
      id: 2,
      title: 'Nhà Giả Kim',
      author: 'Paulo Coelho',
      price: 69000,
      originalPrice: 79000,
      rating: 4.9,
      reviews: 3120,
      category: 'Văn học',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=560&fit=crop',
      badge: 'bestseller',
      description: 'Hành trình theo đuổi giấc mơ của chàng chăn cừu Santiago — một câu chuyện truyền cảm hứng cho hàng triệu độc giả.',
      publisher: 'NXB Văn Học',
      pages: 228,
      year: 2022
    },
    {
      id: 3,
      title: 'Sapiens: Lược Sử Loài Người',
      author: 'Yuval Noah Harari',
      price: 189000,
      originalPrice: 239000,
      rating: 4.7,
      reviews: 1890,
      category: 'Kinh doanh',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=560&fit=crop',
      badge: 'bestseller',
      description: 'Khám phá lịch sử 70.000 năm của loài người từ một góc nhìn hoàn toàn mới.',
      publisher: 'NXB Tri Thức',
      pages: 560,
      year: 2023
    },
    {
      id: 4,
      title: 'Tư Duy Nhanh và Chậm',
      author: 'Daniel Kahneman',
      price: 199000,
      originalPrice: 249000,
      rating: 4.6,
      reviews: 1456,
      category: 'Kỹ năng sống',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=560&fit=crop',
      badge: '',
      description: 'Hành trình khám phá hai hệ thống tư duy chi phối mọi quyết định của con người.',
      publisher: 'NXB Thế Giới',
      pages: 620,
      year: 2022
    },
    {
      id: 5,
      title: 'Hoàng Tử Bé',
      author: 'Antoine de Saint-Exupéry',
      price: 55000,
      originalPrice: 68000,
      rating: 4.9,
      reviews: 5678,
      category: 'Thiếu nhi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&fit=crop',
      badge: 'bestseller',
      description: 'Tác phẩm kinh điển về tình bạn, tình yêu và ý nghĩa cuộc sống qua lời kể của Hoàng Tử Bé.',
      publisher: 'NXB Kim Đồng',
      pages: 112,
      year: 2023
    },
    {
      id: 6,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 145000,
      originalPrice: 0,
      rating: 4.5,
      reviews: 890,
      category: 'Ngoại văn',
      image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=560&fit=crop',
      badge: '',
      description: 'A masterpiece of American literature — the tragic story of Jay Gatsby and his pursuit of the American Dream.',
      publisher: 'Scribner',
      pages: 180,
      year: 2021
    },
    {
      id: 7,
      title: 'Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm',
      author: 'Mark Manson',
      price: 99000,
      originalPrice: 129000,
      rating: 4.4,
      reviews: 2100,
      category: 'Kỹ năng sống',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=560&fit=crop',
      badge: '',
      description: 'Cách tiếp cận ngược đời để sống một cuộc đời tốt đẹp hơn.',
      publisher: 'NXB Trẻ',
      pages: 245,
      year: 2023
    },
    {
      id: 8,
      title: 'Bộ Sưu Tập Bìa Da Mạ Vàng — Tam Quốc Diễn Nghĩa',
      author: 'La Quán Trung',
      price: 1250000,
      originalPrice: 1500000,
      rating: 5.0,
      reviews: 156,
      category: 'Sách quý hiếm',
      image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=560&fit=crop',
      badge: 'limited',
      description: 'Phiên bản giới hạn bìa da thật mạ vàng 24K, đánh số thứ tự, kèm hộp gỗ cao cấp.',
      publisher: 'NXB Văn Học',
      pages: 1200,
      year: 2024
    },
    {
      id: 9,
      title: 'Limited Edition — Truyện Kiều',
      author: 'Nguyễn Du',
      price: 890000,
      originalPrice: 1200000,
      rating: 5.0,
      reviews: 89,
      category: 'Sách quý hiếm',
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=560&fit=crop',
      badge: 'limited',
      description: 'Bản đặc biệt in trên giấy dó, minh họa thủ công bởi nghệ nhân, chỉ 500 bản.',
      publisher: 'NXB Văn Học',
      pages: 320,
      year: 2024
    },
    {
      id: 10,
      title: 'Từ Tốt Đến Vĩ Đại',
      author: 'Jim Collins',
      price: 145000,
      originalPrice: 179000,
      rating: 4.7,
      reviews: 1320,
      category: 'Kinh doanh',
      image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=560&fit=crop',
      badge: 'bestseller',
      description: 'Nghiên cứu kinh điển về hành trình từ một công ty tốt trở thành vĩ đại.',
      publisher: 'NXB Trẻ',
      pages: 380,
      year: 2022
    },
    {
      id: 11,
      title: 'Sách Bìa Da — Hồng Lâu Mộng',
      author: 'Tào Tuyết Cần',
      price: 1450000,
      originalPrice: 1800000,
      rating: 5.0,
      reviews: 67,
      category: 'Sách quý hiếm',
      image: 'https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=400&h=560&fit=crop',
      badge: 'limited',
      description: 'Bản giới hạn bìa da thật, chạm khắc hoa văn vàng, bộ 4 cuốn trong hộp nhung đỏ.',
      publisher: 'NXB Văn Học',
      pages: 2400,
      year: 2024
    },
    {
      id: 12,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 159000,
      originalPrice: 199000,
      rating: 4.8,
      reviews: 4560,
      category: 'Kỹ năng sống',
      image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=560&fit=crop',
      badge: 'bestseller',
      description: 'Thay đổi tí hon, hiệu quả bất ngờ — phương pháp xây dựng thói quen tốt đã được chứng minh.',
      publisher: 'NXB Thế Giới',
      pages: 340,
      year: 2023
    }
  ];

  // ========== Load books from localStorage or use defaults ==========
  let books;
  try {
    const stored = localStorage.getItem('goldpage_books');
    books = stored ? JSON.parse(stored) : [...defaultBooks];
  } catch(e) {
    books = [...defaultBooks];
  }

  // ========== Book CRUD (Admin) ==========
  function saveBooks() {
    try {
      localStorage.setItem('goldpage_books', JSON.stringify(books));
    } catch(e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  function getNextId() {
    return books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  }

  function addBook(bookData) {
    const newBook = {
      id: getNextId(),
      title: bookData.title || '',
      author: bookData.author || '',
      price: parseInt(bookData.price) || 0,
      originalPrice: parseInt(bookData.originalPrice) || 0,
      rating: parseFloat(bookData.rating) || 0,
      reviews: parseInt(bookData.reviews) || 0,
      category: bookData.category || '',
      image: bookData.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop',
      badge: bookData.badge || '',
      description: bookData.description || '',
      publisher: bookData.publisher || '',
      pages: parseInt(bookData.pages) || 0,
      year: parseInt(bookData.year) || new Date().getFullYear()
    };
    books.push(newBook);
    saveBooks();
    return newBook;
  }

  function updateBook(id, bookData) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;

    books[index] = {
      ...books[index],
      title: bookData.title ?? books[index].title,
      author: bookData.author ?? books[index].author,
      price: bookData.price !== undefined ? parseInt(bookData.price) : books[index].price,
      originalPrice: bookData.originalPrice !== undefined ? parseInt(bookData.originalPrice) : books[index].originalPrice,
      rating: bookData.rating !== undefined ? parseFloat(bookData.rating) : books[index].rating,
      reviews: bookData.reviews !== undefined ? parseInt(bookData.reviews) : books[index].reviews,
      category: bookData.category ?? books[index].category,
      image: bookData.image ?? books[index].image,
      badge: bookData.badge ?? books[index].badge,
      description: bookData.description ?? books[index].description,
      publisher: bookData.publisher ?? books[index].publisher,
      pages: bookData.pages !== undefined ? parseInt(bookData.pages) : books[index].pages,
      year: bookData.year !== undefined ? parseInt(bookData.year) : books[index].year,
    };
    saveBooks();
    return books[index];
  }

  function deleteBook(id) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    saveBooks();
    return true;
  }

  function resetBooks() {
    books.length = 0;
    defaultBooks.forEach(b => books.push({...b}));
    saveBooks();
  }

  // ========== Cart State ==========
  let cart = [];
  let wishlist = [];

  // ========== Utility Functions ==========
  function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  }

  function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';
    for (let i = 0; i < fullStars; i++) {
      html += '<i data-lucide="star" class="w-4 h-4 fill-current inline-block"></i>';
    }
    if (hasHalf) {
      html += '<i data-lucide="star-half" class="w-4 h-4 fill-current inline-block"></i>';
    }
    const empty = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < empty; i++) {
      html += '<i data-lucide="star" class="w-4 h-4 inline-block opacity-30"></i>';
    }
    return html;
  }

  // ========== Cart Functions ==========
  function addToCart(bookId, qty = 1) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const existing = cart.find(item => item.id === bookId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...book, qty });
    }
    updateCartBadge();
    showToast(`Đã thêm "${book.title}" vào giỏ hàng!`);
    renderCartPanel();
  }

  function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCartBadge();
    renderCartPanel();
  }

  function updateCartItemQty(bookId, delta) {
    const item = cart.find(i => i.id === bookId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(bookId);
      return;
    }
    updateCartBadge();
    renderCartPanel();
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = getCartCount();
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ========== Toast Notification ==========
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info';
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);

    // Initialize lucide icons in toast
    if (window.lucide) lucide.createIcons();

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // ========== Render Cart Panel ==========
  function renderCartPanel() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');

    if (!cartItems) return;

    if (cart.length === 0) {
      if (cartEmpty) cartEmpty.style.display = 'flex';
      if (cartContent) cartContent.style.display = 'none';
      return;
    }

    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartContent) cartContent.style.display = 'flex';

    cartItems.innerHTML = cart.map(item => `
      <div class="flex gap-4 p-4 border-b border-gray-100" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}" class="w-16 h-20 object-cover rounded-md gold-border">
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-sm truncate">${item.title}</h4>
          <p class="text-xs text-gray-500 mt-0.5">${item.author}</p>
          <p class="price-sale text-sm mt-1">${formatPrice(item.price)}</p>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="GoldPage.updateCartItemQty(${item.id}, -1)" class="qty-btn rounded-l-md text-sm">−</button>
            <span class="w-8 text-center text-sm font-semibold">${item.qty}</span>
            <button onclick="GoldPage.updateCartItemQty(${item.id}, 1)" class="qty-btn rounded-r-md text-sm">+</button>
          </div>
        </div>
        <button onclick="GoldPage.removeFromCart(${item.id})" class="text-red-800 hover:text-red-600 self-start mt-1 transition-colors">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `).join('');

    if (cartTotal) {
      cartTotal.textContent = formatPrice(getCartTotal());
    }

    if (window.lucide) lucide.createIcons();
  }

  // ========== Wishlist ==========
  function toggleWishlist(bookId) {
    const idx = wishlist.indexOf(bookId);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast('Đã xóa khỏi danh sách yêu thích');
    } else {
      wishlist.push(bookId);
      showToast('Đã thêm vào danh sách yêu thích ❤️');
    }
  }

  function isInWishlist(bookId) {
    return wishlist.includes(bookId);
  }

  // ========== Public API ==========
  return {
    books,
    defaultBooks,
    cart,
    formatPrice,
    generateStars,
    addToCart,
    removeFromCart,
    updateCartItemQty,
    getCartTotal,
    getCartCount,
    updateCartBadge,
    showToast,
    renderCartPanel,
    toggleWishlist,
    isInWishlist,
    // Admin CRUD
    addBook,
    updateBook,
    deleteBook,
    saveBooks,
    resetBooks,
    getNextId
  };
})();
