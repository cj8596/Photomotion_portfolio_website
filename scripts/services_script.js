window.addEventListener('DOMContentLoaded', () => {
  initHeaderFlip();
  initContentLockdown();
  initializeKeyboardProtection();
  initCustomAccordion();
});

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



