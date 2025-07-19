window.addEventListener('DOMContentLoaded', () => {
  initSmartAboutHeaderFlip();
  initMenuToggle();
  initWordAnimator();
  initContentLockdown();
  initializeKeyboardProtection();
});

function initSmartAboutHeaderFlip() {
  const header = document.getElementById('main-header');
  const triggerSection = document.querySelector('.centered-section'); // ✅ Replace .image-wrapper
  if (!header || !triggerSection) return;

  let pageTurned = false;
  let hasScrolled = false;
  let lastScrollY = window.scrollY;

  function updateHeaderState() {
    const sectionTop = triggerSection.getBoundingClientRect().top;
    const currentScrollY = window.scrollY;
    const scrollingUp = currentScrollY < lastScrollY;
    const scrolled = currentScrollY > 0;

    if (scrolled) hasScrolled = true;

    // Flip header up when section comes near top AND scrolling down
    if (sectionTop <= 120 && !pageTurned && hasScrolled && !scrollingUp) {
      header.classList.remove('light-header');
      header.classList.add('turn-page');
      pageTurned = true;
    }

    // Flip header back if scrolling up
    else if (scrollingUp && pageTurned) {
      header.classList.remove('turn-page');
      header.classList.add('light-header');
      pageTurned = false;
    }

    // Ensure visibility on first load or top
    if (!hasScrolled || currentScrollY <= 0) {
      header.classList.remove('turn-page');
      header.classList.add('light-header');
      pageTurned = false;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', updateHeaderState);
  window.addEventListener('load', updateHeaderState);
}