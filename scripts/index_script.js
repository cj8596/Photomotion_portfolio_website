// Main entry
window.addEventListener('DOMContentLoaded', () => {
  initCategoryHover();
  initHeaderHover();
  initSliceOverlay();
  initMenuToggle();
  initWordAnimator();
  initContactButton();
  initSectionReveal();
  initLoader();
  initContentLockdown();
  initCameraHover();
  initializeKeyboardProtection();
  wrapImagesWithWatermark();
});

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

function initHeaderHover() {
  const headers = document.querySelectorAll('.column-header');
  const bg = document.getElementById('header-bg');
  if (!headers.length || !bg) return;

  let timeoutId = null;

  const isSmallScreen = () => window.innerWidth < 768;

  headers.forEach(header => {
    const imageUrl = header.dataset.image;

    const showColor = () => {
      clearTimeout(timeoutId);
      bg.style.backgroundImage = `url('${imageUrl}')`;
      bg.classList.add('show-color');
    };

    const showBlack = () => {
      clearTimeout(timeoutId);
      bg.classList.remove('show-color');
    };

    // Desktop hover (no timeout bullshit)
    header.addEventListener('mouseenter', () => {
      if (!isSmallScreen()) showColor();
    });
    header.addEventListener('mouseleave', () => {
      if (!isSmallScreen()) showBlack();
    });

    // Mobile touch with timeout fallback ONLY on small screens
    header.addEventListener('touchstart', e => {
      if (!isSmallScreen()) return;
      e.preventDefault();
      showColor();

      timeoutId = setTimeout(() => {
        bg.classList.remove('show-color');
      }, 1000);
    });

    header.addEventListener('touchend', e => {
      if (!isSmallScreen()) return;
      e.preventDefault();
      clearTimeout(timeoutId);
      showBlack();
    });

    header.addEventListener('touchcancel', e => {
      if (!isSmallScreen()) return;
      e.preventDefault();
      clearTimeout(timeoutId);
      showBlack();
    });
  });
}


function initCameraHover() {
  const img = document.querySelector('section img[src="images/camera.webp"]');
  if (!img) return;

  img.style.transition = 'filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

  // Start: dark but visible
  img.style.filter = 'grayscale(100%) brightness(30%)';

  img.addEventListener('mouseenter', () => {
    img.style.filter = 'grayscale(0%) brightness(100%)';
  });

  img.addEventListener('mouseleave', () => {
    img.style.filter = 'grayscale(100%) brightness(30%)';
  });

  // Mobile touch support
  img.addEventListener('touchstart', e => {
    e.preventDefault();
    img.style.filter = 'grayscale(0%) brightness(100%)';
  });

  img.addEventListener('touchend', e => {
    e.preventDefault();
    img.style.filter = 'grayscale(100%) brightness(30%)';
  });

  img.addEventListener('touchcancel', e => {
    e.preventDefault();
    img.style.filter = 'grayscale(100%) brightness(30%)';
  });
}


// function initSliceOverlay() {
//   const slices = document.querySelectorAll('.slice');

//   // Store each slice's original image
//   slices.forEach(slice => {
//     const bg = slice.dataset.bg;
//     slice.dataset.original = bg;

//     // Initial state: show individual image sized to fit slice
//     slice.style.backgroundImage = `url('${bg}')`;
//     slice.style.backgroundSize = 'cover';
//     slice.style.backgroundPosition = 'center';
//     slice.style.backgroundRepeat = 'no-repeat';
//   });

//   // Hover: make all slices show one unified image
//   // slices.forEach(slice => {
//   //   slice.addEventListener('mouseenter', () => {
//   //     const bgUrl = slice.dataset.bg;

//   //     slices.forEach((s, i) => {
//   //       s.classList.remove('current-item');
//   //       s.style.backgroundImage = `url('${bgUrl}')`;
//   //       s.style.backgroundSize = '900px 600px'; // match .big-rect
//   //       s.style.backgroundRepeat = 'no-repeat';
//   //       s.style.backgroundPosition = `${(i / (slices.length - 1)) * 100}% 0`;
//   //     });

//   //     slice.classList.add('current-item');
//   //   });

//   //   // Revert to original images on mouse leave
//   //   slice.addEventListener('mouseleave', () => {
//   //     slices.forEach(s => {
//   //       const original = s.dataset.original;
//   //       s.classList.remove('current-item');
//   //       s.style.backgroundImage = `url('${original}')`;
//   //       s.style.backgroundSize = 'cover';
//   //       s.style.backgroundPosition = 'center';
//   //       s.style.backgroundRepeat = 'no-repeat';
//   //     });
//   //   });
//   // });
//   slices.forEach(slice => {
//   // Existing hover
//   slice.addEventListener('mouseenter', () => {
//     const bgUrl = slice.dataset.bg;

//     slices.forEach((s, i) => {
//       s.classList.remove('current-item');
//       s.style.backgroundImage = `url('${bgUrl}')`;
//       s.style.backgroundSize = '900px 600px';
//       s.style.backgroundRepeat = 'no-repeat';
//       s.style.backgroundPosition = `${(i / (slices.length - 1)) * 100}% 0`;
//     });

//     slice.classList.add('current-item');
//   });

//   slice.addEventListener('mouseleave', () => {
//     slices.forEach(s => {
//       const original = s.dataset.original;
//       s.classList.remove('current-item');
//       s.style.backgroundImage = `url('${original}')`;
//       s.style.backgroundSize = 'cover';
//       s.style.backgroundPosition = 'center';
//       s.style.backgroundRepeat = 'no-repeat';
//     });
//   });

//   // ✅ Mobile touch support (mimics hover)
//   slice.addEventListener('touchstart', () => {
//     const bgUrl = slice.dataset.bg;

//     slices.forEach((s, i) => {
//       s.classList.remove('current-item');
//       s.style.backgroundImage = `url('${bgUrl}')`;
//       s.style.backgroundSize = 'cover';
//       s.style.backgroundRepeat = 'no-repeat';
//       s.style.backgroundPosition = 'center';
//     });

//     slice.classList.add('current-item');
//   });

//   slice.addEventListener('touchend', () => {
//     slices.forEach(s => {
//       const original = s.dataset.original;
//       s.classList.remove('current-item');
//       s.style.backgroundImage = `url('${original}')`;
//       s.style.backgroundSize = 'cover';
//       s.style.backgroundPosition = 'center';
//       s.style.backgroundRepeat = 'no-repeat';
//     });
//   });
// });
// }

function initSliceOverlay() {
  const slices = document.querySelectorAll('.slice');

  // Store each slice's original image
  slices.forEach(slice => {
    const bg = slice.dataset.bg;
    slice.dataset.original = bg;

    // Set initial slice backgrounds
    slice.style.backgroundImage = `url('${bg}')`;
    slice.style.backgroundSize = 'cover';
    slice.style.backgroundPosition = 'center';
    slice.style.backgroundRepeat = 'no-repeat';
  });

  const getResponsiveSize = () => window.innerWidth < 768 ? '600px 400px' : '900px 600px';

  const applyUnifiedImage = (bgUrl) => {
    slices.forEach((s, i) => {
      s.classList.remove('current-item');
      s.style.backgroundImage = `url('${bgUrl}')`;
      s.style.backgroundSize = getResponsiveSize();
      s.style.backgroundRepeat = 'no-repeat';
      s.style.backgroundPosition = `${(i / (slices.length - 1)) * 100}% 0`;
    });
  };

  const resetOriginalImages = () => {
    slices.forEach(s => {
      const original = s.dataset.original;
      s.classList.remove('current-item');
      s.style.backgroundImage = `url('${original}')`;
      s.style.backgroundSize = 'cover';
      s.style.backgroundPosition = 'center';
      s.style.backgroundRepeat = 'no-repeat';
    });
  };

  slices.forEach(slice => {
    const bgUrl = slice.dataset.bg;

    // Desktop hover
    slice.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 768) {
        applyUnifiedImage(bgUrl);
        slice.classList.add('current-item');
      }
    });

    slice.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 768) {
        resetOriginalImages();
      }
    });

    // Mobile tap: show unified image
    slice.addEventListener('touchstart', (e) => {
      if (window.innerWidth < 768) {
        e.stopPropagation(); // Prevent outer tap reset
        applyUnifiedImage(bgUrl);
        slice.classList.add('current-item');
      }
    });
  });

  // Tap outside to reset (on mobile only)
  if (window.innerWidth < 768) {
    document.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.slice')) {
        resetOriginalImages();
      }
    });
  }
}


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

function initWordAnimator() {
  const words = ["Page", "Section", "Spot", "Hub", "Zone"];
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
      contactBtn.textContent = entry.isIntersecting ? '^' : 'Book an Appointment with Us!';
      isAtContact = entry.isIntersecting;
    });
  }, { threshold: 0.5 });
  observer.observe(contactSection);
}

function initSectionReveal() {
  const reveal = () => {
    const allSections = [...document.querySelectorAll('section'), ...document.querySelectorAll('.centered-section')];
    const triggerBottom = window.innerHeight * 0.95;
    allSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom && !section.classList.contains('visible')) {
        section.classList.add('visible', 'animate__animated', 'animate__fadeInUp');
        section.style.setProperty('--animate-duration', '0.3s');
      }
    });
  }
  window.addEventListener('scroll', reveal);
  window.addEventListener('resize', reveal);
  reveal();
}

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
    }, 2000);
  });
}

function initContentLockdown() {
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('copy', e => e.preventDefault());
  document.addEventListener('cut', e => e.preventDefault());
  document.addEventListener('paste', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
      if (["s","u","c","x","v","a","p","i","j","k"].includes(e.key.toLowerCase())) e.preventDefault();
    }
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      alert("No screenshots allowed, babe 😉");
    }
  });

  const blocker = document.createElement('div');
  blocker.style.position = 'fixed';
  blocker.style.top = 0;
  blocker.style.left = 0;
  blocker.style.width = '100%';
  blocker.style.height = '100%';
  blocker.style.zIndex = 999999;
  blocker.style.pointerEvents = 'none';
  blocker.style.background = 'transparent';
  document.body.appendChild(blocker);

  const style = document.createElement('style');
  style.innerHTML = `img, video, canvas { -webkit-user-drag: none !important; user-select: none !important; }`;
  document.head.appendChild(style);
}

function initializeKeyboardProtection() {
  document.addEventListener('keydown', function(event) {
    const forbiddenKeys = ['s', 'u', 'c', 'a'];
    if (event.ctrlKey && forbiddenKeys.includes(event.key.toLowerCase())) {
      event.preventDefault();
      alert("Action disabled on this page.");
    }
  });
}

// function wrapImagesWithWatermark() {
//   const images = document.querySelectorAll('img'); // Select all images you want to watermark
//   images.forEach(img => {
//     if (!img.parentElement.classList.contains('image-wrapper')) {
//       const wrapper = document.createElement('div');
//       wrapper.classList.add('image-wrapper');
//       img.parentNode.insertBefore(wrapper, img);
//       wrapper.appendChild(img);
//     }
//   });
// }