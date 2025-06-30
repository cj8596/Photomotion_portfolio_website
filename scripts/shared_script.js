// Menu toggle
function initMenuToggle() {
  const menuButton = document.getElementById('menu-button');
  const menuClose = document.getElementById('menu-close');
  const fullpageMenu = document.getElementById('fullpage-menu');
  const contactBtn = document.getElementById('contact-float-btn');

  // function openMenu() {
  //   fullpageMenu.classList.add('active');
  //   document.body.classList.add('menu-active');
  //   fullpageMenu.setAttribute('aria-hidden', 'false');
  //   fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = 0);
  //   fullpageMenu.style.display = 'flex';
  //   if (contactBtn) contactBtn.style.display = 'none';
  // }

  function openMenu() {
    fullpageMenu.classList.remove('closing'); // Ensure clean state
    fullpageMenu.style.display = 'flex';
    fullpageMenu.classList.add('animating-in');

    requestAnimationFrame(() => {
      fullpageMenu.classList.add('active');

      setTimeout(() => {
        fullpageMenu.classList.remove('animating-in');
      }, 700);
    });

    document.body.classList.add('menu-active');
    fullpageMenu.setAttribute('aria-hidden', 'false');
    fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = 0);
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

// Word animator
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


function initContactButton() {
  const contactBtn = document.getElementById('contact-float-btn');
  if (!contactBtn) return;

  let isInBackToTopMode = false;

  contactBtn.addEventListener('click', () => {
    if (isInBackToTopMode) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = 'contact.html'; // Replace with actual contact page
    }
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const pageHeight = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollTop / pageHeight;

    if (scrollProgress > 0.6 && !isInBackToTopMode) {
      isInBackToTopMode = true;
      contactBtn.textContent = '⌂';
    } else if (scrollProgress <= 0.6 && isInBackToTopMode) {
      isInBackToTopMode = false;
      contactBtn.textContent = 'Book a Session!';
    }
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

function initSmartHeaderFlip() {
  const header = document.getElementById('main-header');
  const gridSection = document.querySelector('.image-wrapper');
  if (!header || !gridSection) return;

  let pageTurned = false;
  let hasScrolled = false;
  let lastScrollY = window.scrollY;

  function updateHeaderState() {
    const gridTop = gridSection.getBoundingClientRect().top;
    const currentScrollY = window.scrollY;
    const scrollingUp = currentScrollY < lastScrollY;
    const scrolled = currentScrollY > 0;

    if (scrolled) hasScrolled = true;

    // Flip header up when image-wrapper is visible AND scrolling down
    if (gridTop <= 120 && !pageTurned && hasScrolled && !scrollingUp) {
      header.classList.remove('light-header');
      header.classList.add('turn-page');
      pageTurned = true;
    }

    // Flip header back immediately if scrolling up
    else if (scrollingUp && pageTurned) {
      header.classList.remove('turn-page');
      header.classList.add('light-header');
      pageTurned = false;
    }

    // Initial load: force header to be visible
    if (!hasScrolled) {
      header.classList.remove('turn-page');
      header.classList.add('light-header');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', updateHeaderState);
  window.addEventListener('load', updateHeaderState);
}


function initHeaderFlip() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let pageTurned = false;

  function updateHeaderState() {
    const scrollY = window.scrollY;

    // Flip header when scrolling down beyond 80px
    if (scrollY > 80 && !pageTurned) {
      header.classList.add('turn-page');
      pageTurned = true;
    }

    // Restore header when scrolling back up
    if (scrollY <= 80 && pageTurned) {
      header.classList.remove('turn-page');
      pageTurned = false;
    }
  }

  window.addEventListener('scroll', updateHeaderState);
  window.addEventListener('load', updateHeaderState);
}