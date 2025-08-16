// Main entry
window.addEventListener('DOMContentLoaded', () => {
  initCategoryHover();
  initSliceOverlay();
  initMenuToggle();
  initWordAnimator();
  initContactButton();
  initSectionReveal();
  initLoader();
  initContentLockdown();
  initCameraHover();
  initializeKeyboardProtection();
  initZoomStopCarousel();
  initSmartHeaderFlip();
  initWhyOurProcess();
});

// Hover effect for SHOOTS BY CATEGORY section
function initCategoryHover() {
  const wrapper = document.getElementById("categoryWrapper");
  const categories = document.querySelectorAll(".category");
  if (wrapper && categories.length) {
    categories.forEach(item => {
      item.addEventListener("mouseenter", () => {
        wrapper.style.backgroundImage = `url('${item.dataset.image}')`;
      });
      item.addEventListener("mouseleave", () => {
        wrapper.style.backgroundImage = "url('logo.jpg')";
      });
    });
  }
}

// Hover color effect on camera image (first image in section)
function initCameraHover() {
  const img = document.querySelector('section img[src="images/grid.webp"]');
  if (!img) return;

  img.style.transition = 'filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  img.style.filter = 'grayscale(100%) brightness(30%)';

  img.addEventListener('mouseenter', () => {
    img.style.filter = 'grayscale(0%) brightness(100%)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.filter = 'grayscale(100%) brightness(30%)';
  });

  // Mobile touch support
  // ['touchstart', 'touchend', 'touchcancel'].forEach(eventType => {
  //   img.addEventListener(eventType, e => {
  //     e.preventDefault();
  //     const isActive = eventType === 'touchstart';
  //     img.style.filter = isActive
  //       ? 'grayscale(0%) brightness(100%)'
  //       : 'grayscale(100%) brightness(30%)';
  //   });
  // });

  let isTouching = false;
  let touchTimeout;

  // Touch start: Wait a bit before triggering to avoid interfering with scroll
  img.addEventListener('touchstart', (e) => {
    isTouching = true;
    touchTimeout = setTimeout(() => {
      if (isTouching) {
        img.style.filter = 'grayscale(0%) brightness(100%)';
      }
    }); // short delay to ensure it’s a tap, not a scroll
  });

  // Touch end: revert
  img.addEventListener('touchend', () => {
    isTouching = false;
    clearTimeout(touchTimeout);
    img.style.filter = 'grayscale(100%) brightness(30%)';
  });

  // Touch cancel (e.g., scroll interrupted it)
  img.addEventListener('touchcancel', () => {
    isTouching = false;
    clearTimeout(touchTimeout);
    img.style.filter = 'grayscale(100%) brightness(30%)';
  });

}

// Overlay image transition on slice hover
function initSliceOverlay() {
  const slices = document.querySelectorAll('.slice');
  const overlayImages = document.querySelectorAll('.overlay-image');
  slices.forEach(slice => {
    slice.addEventListener('mouseenter', () => {
      const index = slice.dataset.index;
      slices.forEach(s => s.classList.remove('current-item'));
      overlayImages.forEach(img => {
        img.classList.remove('current-item', 'animate__fadeIn', 'animate__animated');
        void img.offsetWidth; // force reflow
      });
      slice.classList.add('current-item');
      const targetImg = overlayImages[index];
      targetImg.classList.add('current-item', 'animate__animated', 'animate__fadeIn');
    });
    slice.addEventListener('touchstart', () => {
      if (window.innerWidth <= 1024) {
        slices.forEach(s => s.classList.add('current-item'));

        overlayImages.forEach(img => {
          img.classList.remove('current-item', 'animate__fadeIn', 'animate__animated');
        });

        const targetImg = overlayImages[index];
        targetImg.classList.add('current-item', 'animate__animated', 'animate__fadeIn');
      }
    });
  });
}

// Reveal sections on scroll with animation
function initSectionReveal() {
  const reveal = () => {
    const allSections = [
      ...document.querySelectorAll('section'),
      ...document.querySelectorAll('.centered-section')
    ];
    const triggerBottom = window.innerHeight * 0.95;

    allSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom && !section.classList.contains('visible')) {
        section.classList.add('visible', 'animate__animated', 'animate__fadeInUp');
        section.style.setProperty('--animate-duration', '0.3s');
      }
    });
  };

  window.addEventListener('scroll', reveal);
  window.addEventListener('resize', reveal);
  reveal(); // initial call
}

// Loader logic for intro animation
function initLoader() {
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const video = loader?.querySelector('video');
    video?.play();

    setTimeout(() => {
      loader?.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        window.scrollTo(0, 0);
      }, 1000);
    }, 5000);
  });
}

function initWhyOurProcess() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    const steps = document.querySelectorAll('.step');

    // Handle step activation on tap
    steps.forEach(step => {
      step.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent bubbling to document

        const isActive = step.classList.contains('active');
        steps.forEach(s => s.classList.remove('active'));
        if (!isActive) {
          step.classList.add('active');
        }
      });
    });

    // Handle tap outside to deactivate all
    document.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
    });
  }
}