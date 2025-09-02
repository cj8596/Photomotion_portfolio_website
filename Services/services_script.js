window.addEventListener('DOMContentLoaded', () => {
  initSmartAboutHeaderFlip();
  initContentLockdown();
  initializeKeyboardProtection();
  initCustomAccordion();
});


function initSmartAboutHeaderFlip() {
  const header = document.getElementById('main-header');
  const triggerSection = document.querySelector('.centered-section'); 
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



function initCustomAccordion() {
  const summaries = document.querySelectorAll('.accordion-summary');

  summaries.forEach(summary => {
    summary.addEventListener('click', () => {
      const item = summary.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // STEP 1: Close all other items (smoothly)
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.add('closing');
          openItem.classList.remove('open');
          setTimeout(() => {
            openItem.classList.remove('closing');
          }, 400); // match CSS transition
        }
      });

      // STEP 2: Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
      } else {
        // Delay the removal for smooth closing
        item.classList.add('closing');
        item.classList.remove('open');
        setTimeout(() => {
          item.classList.remove('closing');
        }, 400);
      }
    });
  });
}



