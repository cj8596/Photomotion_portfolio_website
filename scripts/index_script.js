// Main entry
window.addEventListener('DOMContentLoaded', () => {
  initCategoryHover();
  // initHeaderHover(); 
  initSliceOverlay();
  initMenuToggle();
  initWordAnimator();
  initContactButton();
  initSectionReveal();
  initLoader();
  initContentLockdown();
  initCameraHover();
  initializeKeyboardProtection();
  // wrapImagesWithWatermark(); 
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

// Image transition from black to color on hover (currently unused)
// function initHeaderHover() {
//   const headers = document.querySelectorAll('.column-header');
//   const bg = document.getElementById('header-bg');
//   if (!headers.length || !bg) return;

//   let timeoutId = null;
//   const isSmallScreen = () => window.innerWidth < 768;

//   headers.forEach(header => {
//     const imageUrl = header.dataset.image;
//     const showColor = () => {
//       clearTimeout(timeoutId);
//       bg.style.backgroundImage = `url('${imageUrl}')`;
//       bg.classList.add('show-color');
//     };
//     const showBlack = () => {
//       clearTimeout(timeoutId);
//       bg.classList.remove('show-color');
//     };
//     header.addEventListener('mouseenter', () => {
//       if (!isSmallScreen()) showColor();
//     });
//     header.addEventListener('mouseleave', () => {
//       if (!isSmallScreen()) showBlack();
//     });
//     header.addEventListener('touchstart', e => {
//       if (!isSmallScreen()) return;
//       e.preventDefault();
//       showColor();
//       timeoutId = setTimeout(() => {
//         bg.classList.remove('show-color');
//       }, 1000);
//     });
//     header.addEventListener('touchend', e => {
//       if (!isSmallScreen()) return;
//       e.preventDefault();
//       clearTimeout(timeoutId);
//       showBlack();
//     });
//     header.addEventListener('touchcancel', e => {
//       if (!isSmallScreen()) return;
//       e.preventDefault();
//       clearTimeout(timeoutId);
//       showBlack();
//     });
//   });
// }

// Hover color effect on camera image (first image in section)
function initCameraHover() {
  const img = document.querySelector('section img[src="images/camera.webp"]');
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
  ['touchstart', 'touchend', 'touchcancel'].forEach(eventType => {
    img.addEventListener(eventType, e => {
      e.preventDefault();
      const isActive = eventType === 'touchstart';
      img.style.filter = isActive
        ? 'grayscale(0%) brightness(100%)'
        : 'grayscale(100%) brightness(30%)';
    });
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
  });
}

// Full-page menu toggle logic
function initMenuToggle() {
  const menuButton = document.getElementById('menu-button');
  const menuClose = document.getElementById('menu-close');
  const fullpageMenu = document.getElementById('fullpage-menu');
  const contactBtn = document.getElementById('contact-float-btn');

  function openMenu() {
    fullpageMenu.classList.add('active');
    document.body.classList.add('menu-active');
    fullpageMenu.setAttribute('aria-hidden', 'false');
    fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = 0);
    fullpageMenu.style.display = 'flex';
    if (contactBtn) contactBtn.style.display = 'none';
  }

  function closeMenu() {
    fullpageMenu.classList.remove('active');
    document.body.classList.remove('menu-active');
    fullpageMenu.setAttribute('aria-hidden', 'true');
    fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = -1);
    fullpageMenu.classList.add('closing');
    if (contactBtn) contactBtn.style.display = 'block';
    setTimeout(() => {
      fullpageMenu.classList.remove('closing');
      fullpageMenu.style.display = 'none';
    }, 700);
  }

  if (menuButton && menuClose && fullpageMenu) {
    menuButton.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
  }
}

// Rotating animated text in menu contact section
function initWordAnimator() {
  const words = ["Start a Conversation!", "Book a Session!", "Let’s Create!", "Say Hello!"];
  const wordElement = document.getElementById("animated-word");
  if (!wordElement) return;
  let wordIndex = 0;
  const typingSpeed = 150;
  const pauseAfterWord = 2000;

  function typeWord() {
    const currentWord = words[wordIndex];
    let letterIndex = 0;
    wordElement.textContent = '';

    function addLetter() {
      if (letterIndex < currentWord.length) {
        wordElement.textContent += currentWord.charAt(letterIndex++);
        setTimeout(addLetter, typingSpeed);
      } else {
        setTimeout(() => {
          wordIndex = (wordIndex + 1) % words.length;
          typeWord();
        }, pauseAfterWord);
      }
    }
    addLetter();
  }

  typeWord();
}

// Floating button toggles contact section scroll
function initContactButton() {
  const contactBtn = document.getElementById('contact-float-btn');
  const contactSection = document.getElementById('contact');
  if (!(contactBtn && contactSection)) return;
  let isAtContact = false;

  contactBtn.addEventListener('click', () => {
    if (isAtContact) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      contactBtn.textContent = entry.isIntersecting
        ? '⬆'
        : 'Book an Appointment with Us!';
      isAtContact = entry.isIntersecting;
    });
  }, { threshold: 0.5 });

  observer.observe(contactSection);
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
    }, 1700);
  });
}

// Disables text selection, copy/paste, dev tools
function initContentLockdown() {
  const preventEvent = e => e.preventDefault();

  ['contextmenu', 'selectstart', 'copy', 'cut', 'paste', 'dragstart'].forEach(event =>
    document.addEventListener(event, preventEvent)
  );

  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
      if (["s", "u", "c", "x", "v", "a", "p", "i", "j", "k"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    }
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      alert("No Screenshots Allowed");
    }
  });

  const blocker = document.createElement('div');
  blocker.style.cssText = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 999999; pointer-events: none; background: transparent;
  `;
  document.body.appendChild(blocker);

  const style = document.createElement('style');
  style.innerHTML = `
    img, video, canvas {
      -webkit-user-drag: none !important;
      user-select: none !important;
    }
  `;
  document.head.appendChild(style);
}

// Secondary key protection
function initializeKeyboardProtection() {
  document.addEventListener('keydown', function (event) {
    const forbiddenKeys = ['s', 'u', 'c', 'a'];
    if (event.ctrlKey && forbiddenKeys.includes(event.key.toLowerCase())) {
      event.preventDefault();
      alert("Action disabled on this page.");
    }
  });
}

// Image watermark wrapper (unused, optional feature)
// function wrapImagesWithWatermark() {
//   const images = document.querySelectorAll('img');
//   images.forEach(img => {
//     if (!img.parentElement.classList.contains('image-wrapper')) {
//       const wrapper = document.createElement('div');
//       wrapper.classList.add('image-wrapper');
//       img.parentNode.insertBefore(wrapper, img);
//       wrapper.appendChild(img);
//     }
//   });
// }
