window.addEventListener('DOMContentLoaded', () => {
  initBackgroundFadeEffect();
  initSmartAboutHeaderFlip();
  initMenuToggle();
  initWordAnimator();
  initContentLockdown();
  initializeKeyboardProtection();
});

function initSmartAboutHeaderFlip() {
  const header = document.getElementById('main-header');
  const triggerSection = document.querySelector('.hero');
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


function initBackgroundFadeEffect() {
    const bg1 = document.getElementById("bg1");
    const bg2 = document.getElementById("bg2");
    const sections = Array.from(document.querySelectorAll(".hero"));

    let currentIndex = -1;
    let activeBg = bg1;
    let hiddenBg = bg2;

    function preloadImage(src, callback) {
        const img = new Image();
        img.onload = callback;
        img.src = src;
    }

    function updateBackgroundForSection(index) {
        if (index === currentIndex) return;
        const newImage = sections[index].getAttribute("data-bg");
        if (!newImage) return;

        preloadImage(newImage, () => {
            hiddenBg.style.backgroundImage = `url('${newImage}')`;
            hiddenBg.style.opacity = "1";
            activeBg.style.opacity = "0";
            [activeBg, hiddenBg] = [hiddenBg, activeBg];
            currentIndex = index;
        });
    }

    function getActiveSectionIndex() {
        const scrollMiddle = window.innerHeight / 2;
        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            if (rect.top <= scrollMiddle && rect.bottom >= scrollMiddle) {
                return i;
            }
        }
        return -1;
    }

    function update() {
        const index = getActiveSectionIndex();
        if (index !== -1) {
            updateBackgroundForSection(index);
        }
    }

    window.addEventListener("scroll", update);
    window.addEventListener("load", update);
}
