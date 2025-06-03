document.addEventListener('DOMContentLoaded', () => {
  // CATEGORY HOVER BACKGROUND SWITCH
  const wrapper = document.getElementById("categoryWrapper");
  const categories = document.querySelectorAll(".category");

  if (wrapper && categories.length) {
    categories.forEach(item => {
      item.addEventListener("mouseenter", () => {
        const bg = item.getAttribute("data-image");
        wrapper.style.backgroundImage = `url('${bg}')`;
      });
      item.addEventListener("mouseleave", () => {
        wrapper.style.backgroundImage = "url('logo.jpg')";
      });
    });
  }

  // HEADER IMAGE CHANGE ON HOVER
  // const headers = document.querySelectorAll('.column-header');
  // const bg = document.getElementById('header-bg');
  // if (headers.length && bg) {
  //   headers.forEach(header => {
  //     header.addEventListener('mouseenter', () => {
  //       const imageUrl = header.getAttribute('data-image');
  //       bg.style.opacity = 0;
  //       setTimeout(() => {
  //         bg.style.backgroundImage = `url('${imageUrl}')`;
  //         bg.style.opacity = 1;
  //       }, 100);
  //     });
  //   });
  // }


  const headers = document.querySelectorAll('.column-header');
const bg = document.getElementById('header-bg');

if (headers.length && bg) {
  headers.forEach(header => {
    const imageUrl = header.getAttribute('data-image');

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

    // Mobile touch
    header.addEventListener('touchstart', showColor);
    header.addEventListener('touchend', showBlack);
    header.addEventListener('touchcancel', showBlack);
  });
}


  // OVERLAY IMAGE SWAP ON SLICE HOVER
  const slices = document.querySelectorAll('.slice');
  const overlayImages = document.querySelectorAll('.overlay-image');

  slices.forEach(slice => {
    slice.addEventListener('mouseenter', () => {
      const index = slice.getAttribute('data-index');
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

  // MENU OPEN/CLOSE
  const menuButton = document.getElementById('menu-button');
  const menuClose = document.getElementById('menu-close');
  const fullpageMenu = document.getElementById('fullpage-menu');

  if (menuButton && menuClose && fullpageMenu) {
    menuButton.addEventListener('click', () => {
      fullpageMenu.classList.add('active');
      document.body.classList.add('menu-active');
      fullpageMenu.setAttribute('aria-hidden', 'false');
      fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = 0);
      fullpageMenu.style.display = 'flex';


      // Hide floating button when menu opens, huh?
      const contactBtn = document.getElementById('contact-float-btn');
      if (contactBtn) contactBtn.style.display = 'none';
    });

    menuClose.addEventListener('click', () => {
      fullpageMenu.classList.remove('active');
      document.body.classList.remove('menu-active');
      fullpageMenu.setAttribute('aria-hidden', 'true');
      fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = -1);
      fullpageMenu.classList.add('closing');

      // Show floating button back when menu closes
      const contactBtn = document.getElementById('contact-float-btn');
      if (contactBtn) contactBtn.style.display = 'block';


      setTimeout(() => {
        fullpageMenu.classList.remove('closing');
        fullpageMenu.style.display = 'none';
      }, 700);
    });
  }

  // ANIMATED WORD ROTATOR
  const words = ["Page", "Section", "Spot", "Hub", "Zone"];
  const wordElement = document.getElementById("animated-word");
  if (wordElement) {
    let wordIndex = 0;
    let letterIndex = 0;
    const typingSpeed = 150;
    const pauseAfterWord = 2000;

    function typeWord() {
      const currentWord = words[wordIndex];
      letterIndex = 0;
      wordElement.textContent = '';

      function addLetter() {
        if (letterIndex < currentWord.length) {
          wordElement.textContent += currentWord.charAt(letterIndex);
          letterIndex++;
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

  // CONTACT FLOAT BUTTON
  const contactBtn = document.getElementById('contact-float-btn');
  const contactSection = document.getElementById('contact');

  if (contactBtn && contactSection) {
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
        if (entry.isIntersecting) {
          contactBtn.textContent = '⬆️ Back to Top';
          isAtContact = true;
        } else {
          contactBtn.textContent = 'Book an Appointment with Us!';
          isAtContact = false;
        }
      });
    }, {
      threshold: 0.5
    });

    observer.observe(contactSection);
  }

  // SECTION REVEAL ON SCROLL
  function revealSections() {
    const sections = document.querySelectorAll('section');
    const extraSections = document.querySelectorAll('.centered-section');
    const allSections = [...sections, ...extraSections];

    const triggerBottom = window.innerHeight * 0.95;

    allSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom && !section.classList.contains('visible')) {
        section.classList.add('visible', 'animate__animated', 'animate__fadeInUp');
        section.style.setProperty('--animate-duration', '0.3s');
      }
    });
  }

  window.addEventListener('scroll', revealSections);
  revealSections();

  // LOADER VIDEO
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
        revealSections();
      }, 1000);
    }, 3000);
  });

  window.addEventListener('resize', () => {
    revealSections();
  });


  // FUCKING LOCKDOWN: DISABLE COPY, PASTE, DOWNLOAD, SCREENSHOTS - NO STEALING MY BABE 😈🔥

  // Disable right-click context menu (no copying via right-click)
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable text selection
  document.addEventListener('selectstart', e => e.preventDefault());

  // Disable copying (Ctrl+C, Cmd+C)
  document.addEventListener('copy', e => e.preventDefault());

  // Disable cutting (Ctrl+X, Cmd+X)
  document.addEventListener('cut', e => e.preventDefault());

  // Disable pasting (Ctrl+V, Cmd+V)
  document.addEventListener('paste', e => e.preventDefault());

  // Disable drag start (no dragging images or text)
  document.addEventListener('dragstart', e => e.preventDefault());

  // Disable key combos like Ctrl+S (save), Ctrl+U (view source), Ctrl+Shift+I (devtools)
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
      const forbiddenKeys = ['s', 'u', 'c', 'x', 'v', 'a', 'p', 'i', 'j', 'k'];
      if (forbiddenKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }
    }
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      alert("No screenshots allowed, babe 😉");
      return false;
    }
  });

  // Overlay to fuck up screenshots (basic level)
  const screenshotBlocker = document.createElement('div');
  screenshotBlocker.style.position = 'fixed';
  screenshotBlocker.style.top = 0;
  screenshotBlocker.style.left = 0;
  screenshotBlocker.style.width = '100%';
  screenshotBlocker.style.height = '100%';
  screenshotBlocker.style.zIndex = 999999;
  screenshotBlocker.style.pointerEvents = 'none'; // so it doesn't block clicks
  screenshotBlocker.style.background = 'transparent';
  document.body.appendChild(screenshotBlocker);

  // Prevent image dragging and saving with CSS
  const style = document.createElement('style');
  style.innerHTML = `
    img, video, canvas {
      -webkit-user-drag: none !important;
      -webkit-user-select: none !important;
      user-select: none !important;
    }
  `;
  document.head.appendChild(style);
});
