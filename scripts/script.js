// CATEGORY HOVER BACKGROUND SWITCH
const wrapper = document.getElementById("categoryWrapper");
const categories = document.querySelectorAll(".category");

categories.forEach(item => {
  // When mouse enters a category item, change the background
  item.addEventListener("mouseenter", () => {
    const bg = item.getAttribute("data-image");
    wrapper.style.backgroundImage = `url('${bg}')`;
  });

  // When mouse leaves, reset to default background
  item.addEventListener("mouseleave", () => {
    wrapper.style.backgroundImage = "url('logo.jpg')"; // fallback image
  });
});

// LOADER VIDEO AND SECTION REVEAL AFTER PAGE LOAD
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const video = loader.querySelector('video');

  video.play(); // Play the loader video

  setTimeout(() => {
    loader.classList.add('fade-out'); // Start fade out

    setTimeout(() => {
      loader.style.display = 'none'; // Hide the loader
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');

      window.scrollTo(0, 0); // Scroll to top once everything is ready
      revealSections(); // Reveal sections initially
    }, 1000);
  }, 3000); // Delay equal to video duration
});

// SCROLL-BASED SECTION REVEAL FUNCTION
function revealSections() {
  const sections = document.querySelectorAll('section');
  const extraSections = document.querySelectorAll('.centered-section');
  const allSections = [...sections, ...extraSections];

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.95; // 95% viewport height

    allSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      // If section is in view and not yet visible, animate it in
      if (sectionTop < triggerBottom && !section.classList.contains('visible')) {
        section.classList.add('visible', 'animate__animated', 'animate__fadeInUp');
        section.style.setProperty('--animate-duration', '0.3s'); // Quick animation
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on page load too
}

// HEADER IMAGE CHANGE ON HOVER
const headers = document.querySelectorAll('.column-header');
const bg = document.getElementById('header-bg');

headers.forEach(header => {
  header.addEventListener('mouseenter', () => {
    const imageUrl = header.getAttribute('data-image');
    bg.style.opacity = 0;

    // Wait briefly then change the background image and fade in
    setTimeout(() => {
      bg.style.backgroundImage = `url('${imageUrl}')`;
      bg.style.opacity = 1;
    }, 100);
  });
});

// OVERLAY IMAGE SWAP ON SLICE HOVER
const slices = document.querySelectorAll('.slice');
const overlayImages = document.querySelectorAll('.overlay-image');

slices.forEach(slice => {
  slice.addEventListener('mouseenter', () => {
    const index = slice.getAttribute('data-index');

    // Remove active class from all slices/images
    slices.forEach(s => s.classList.remove('current-item'));
    overlayImages.forEach(img => {
      img.classList.remove('current-item', 'animate__fadeIn', 'animate__animated');
      void img.offsetWidth; // Restart CSS animation
    });

    // Add class to current hovered slice/image
    slice.classList.add('current-item');
    const targetImg = overlayImages[index];
    targetImg.classList.add('current-item', 'animate__animated', 'animate__fadeIn');
  });
});

// MENU OPEN/CLOSE FUNCTIONALITY (Button + Escape + Accessibility)
const menuButton = document.getElementById('menu-button');
const fullpageMenu = document.getElementById('fullpage-menu');
const menuClose = document.getElementById('menu-close');
const body = document.body;

// Open fullpage menu
menuButton.addEventListener('click', () => {
  fullpageMenu.classList.add('active');
  body.classList.add('menu-active');
  fullpageMenu.setAttribute('aria-hidden', 'false');

  // Make menu links accessible by keyboard
  fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = 0);
});

// Close fullpage menu
menuClose.addEventListener('click', () => {
  fullpageMenu.classList.remove('active');
  body.classList.remove('menu-active');
  fullpageMenu.setAttribute('aria-hidden', 'true');

  // Remove menu links from tab order
  fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = -1);
});

// MENU DISPLAY TOGGLE FOR FALLBACK (display block instead of class toggle)
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-button");
  const closeBtn = document.getElementById("menu-close");
  const menu = document.getElementById("fullpage-menu");

  menuBtn.addEventListener("click", () => {
    menu.style.display = "block";
    menu.setAttribute("aria-hidden", "false");

    // Make menu links focusable
    menu.querySelectorAll("a").forEach(a => a.setAttribute("tabindex", "0"));
  });

  closeBtn.addEventListener("click", () => {
    menu.style.display = "none";
    menu.setAttribute("aria-hidden", "true");

    // Make menu links unfocusable
    menu.querySelectorAll("a").forEach(a => a.setAttribute("tabindex", "-1"));
  });
});

// MENU OPEN/CLOSE WITH ANIMATION
const menu = document.getElementById('fullpage-menu');
const openBtn = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('menu-close');

openBtn.addEventListener('click', () => {
  // Kill any closing animation leftovers
  menu.classList.remove('closing');
  menu.classList.add('active');
  document.body.classList.add('menu-active');
  menu.style.display = 'flex'; // show before animation
});

closeBtn.addEventListener('click', () => {
  // Start closing animation
  menu.classList.remove('active');
  menu.classList.add('closing');
  document.body.classList.remove('menu-active');

  // After animation, hide menu completely
  setTimeout(() => {
    menu.classList.remove('closing');
    menu.style.display = 'none'; // hide it for real
  }, 700); // match animation duration
});
