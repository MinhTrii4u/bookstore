/* ============================================================
   GoldPage — Carousel Module
   Reusable carousel with touch/swipe, auto-play
   ============================================================ */

class GoldCarousel {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

    this.track = this.container.querySelector('.carousel-track');
    this.prevBtn = this.container.querySelector('.carousel-prev');
    this.nextBtn = this.container.querySelector('.carousel-next');
    this.dotsContainer = this.container.querySelector('.carousel-dots');

    this.options = {
      autoPlay: options.autoPlay || false,
      autoPlayInterval: options.autoPlayInterval || 5000,
      itemsPerView: options.itemsPerView || 4,
      gap: options.gap || 24,
      ...options
    };

    this.currentIndex = 0;
    this.totalItems = this.track ? this.track.children.length : 0;
    this.autoPlayTimer = null;

    this.init();
  }

  init() {
    if (!this.track || this.totalItems === 0) return;

    this.bindEvents();
    this.updateButtons();
    this.createDots();

    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Touch/Swipe support
    let startX = 0;
    let endX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.pauseAutoPlay();
    }, { passive: true });

    this.track.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    }, { passive: true });

    this.track.addEventListener('touchend', () => {
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
      }
      this.resumeAutoPlay();
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
  }

  getItemsPerView() {
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return this.options.itemsPerView;
  }

  getMaxIndex() {
    return Math.max(0, this.totalItems - this.getItemsPerView());
  }

  scrollToIndex(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.getMaxIndex()));
    const item = this.track.children[this.currentIndex];
    if (item) {
      this.track.scrollTo({
        left: item.offsetLeft - this.track.offsetLeft,
        behavior: 'smooth'
      });
    }
    this.updateButtons();
    this.updateDots();
  }

  next() {
    if (this.currentIndex >= this.getMaxIndex()) {
      this.scrollToIndex(0); // Loop back
    } else {
      this.scrollToIndex(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex <= 0) {
      this.scrollToIndex(this.getMaxIndex()); // Loop to end
    } else {
      this.scrollToIndex(this.currentIndex - 1);
    }
  }

  updateButtons() {
    // Buttons always visible since we loop
  }

  createDots() {
    if (!this.dotsContainer) return;
    const totalDots = this.getMaxIndex() + 1;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `dot-indicator ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => this.scrollToIndex(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots() {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll('.dot-indicator');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  startAutoPlay() {
    if (!this.options.autoPlay) return;
    this.autoPlayTimer = setInterval(() => this.next(), this.options.autoPlayInterval);
  }

  pauseAutoPlay() {
    clearInterval(this.autoPlayTimer);
  }

  resumeAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }

  destroy() {
    this.pauseAutoPlay();
  }
}

// ========== Testimonial Slider (simpler version) ==========
class TestimonialSlider {
  constructor(container) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.testimonial-slide');
    this.dotsContainer = this.container.querySelector('.testimonial-dots');
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayTimer = null;

    this.init();
  }

  init() {
    if (this.totalSlides === 0) return;

    this.createDots();
    this.showSlide(0);
    this.startAutoPlay();

    this.container.addEventListener('mouseenter', () => clearInterval(this.autoPlayTimer));
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  showSlide(index) {
    this.currentIndex = index;
    this.slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.transform = i === index ? 'translateX(0)' : 'translateX(30px)';
      slide.style.position = i === index ? 'relative' : 'absolute';
      slide.style.pointerEvents = i === index ? 'auto' : 'none';
    });
    this.updateDots();
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = `dot-indicator ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        this.showSlide(i);
        clearInterval(this.autoPlayTimer);
        this.startAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots() {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll('.dot-indicator');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.showSlide((this.currentIndex + 1) % this.totalSlides);
    }, 5000);
  }
}
