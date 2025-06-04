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

  headers.forEach(header => {
    const imageUrl = header.dataset.image;

    const showColor = () => {
      bg.style.backgroundImage = `url('${imageUrl}')`;
      bg.classList.add('show-color');
    };

    const showBlack = () => {
      bg.classList.remove('show-color');
    };

    // Desktop hover
    header.addEventListener('mouseenter', showColor);
    header.addEventListener('mouseleave', showBlack);

    // Mobile touch - now with toggle on tap and release back to black
    header.addEventListener('touchstart', e => {
      e.preventDefault(); // prevent ghost clicks and double triggers
      showColor();
    });

    header.addEventListener('touchend', e => {
      e.preventDefault();
      showBlack();
    });

    header.addEventListener('touchcancel', e => {
      e.preventDefault();
      showBlack();
    });
  });
}



function initSliceOverlay() {
  const slices = document.querySelectorAll('.slice');
  const overlayImages = document.querySelectorAll('.overlay-image');
  slices.forEach(slice => {
    slice.addEventListener('mouseenter', () => {
      const index = slice.dataset.index;
      slices.forEach(s => s.classList.remove('current-item'));
      overlayImages.forEach(img => {
        img.classList.remove('current-item', 'animate__fadeIn', 'animate__animated');
        void img.offsetWidth;
      });
      slice.classList.add('current-item');
      const targetImg = overlayImages[index];
      targetImg.classList.add('current-item', 'animate__animated', 'animate__fadeIn');
    });
  });
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
      contactBtn.textContent = entry.isIntersecting ? '⬆️' : 'Book an Appointment with Us!';
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
    }, 3000);
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
