// Main entry
window.addEventListener('DOMContentLoaded', () => {
  initCategoryHover();
  initSliceOverlay();
  initMenuToggle();
  initWordAnimator();
  initContactButton();
  initSectionReveal();
  initLoader();
  initContentLockdown();
  initCameraHover();
  initializeKeyboardProtection();
  initZoomStopCarousel();
  // wrapImagesWithWatermark(); // ❌ Not needed unless watermark wrapping is used
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
    }, 1750);
  });
}

//experiment

// Infinite Zoom Carousel with Seamless Loop and Pause
function initZoomStopCarousel() {
  const track = document.getElementById("carousel-track");
  const originalItems = Array.from(track.children);

  // Clone setup
  const cloneFactor = 2;
  const clonesBefore = [], clonesAfter = [];
  for (let i = 0; i < cloneFactor; i++) {
    originalItems.forEach(item => {
      clonesBefore.push(item.cloneNode(true));
      clonesAfter.push(item.cloneNode(true));
    });
  }
  clonesBefore.reverse().forEach(clone => track.prepend(clone));
  clonesAfter.forEach(clone => track.append(clone));

  const allItems = Array.from(track.children);
  const originalCount = originalItems.length;

  const style = getComputedStyle(track);
  const itemGap = parseFloat(style.columnGap || style.gap || "0");
  const itemWidth = originalItems[0].getBoundingClientRect().width + itemGap;

  const middleStartOffset = cloneFactor * originalCount * itemWidth;
  const scrollOffsetStart = middleStartOffset;
  let scrollOffset = scrollOffsetStart;
  let lastCenteredOriginalIndex = -1;
  let lastCenteredIndex = null;
  let isPaused = false;
  let pauseStartTime = 0;

  const pauseDuration = 1000;
  const glideSpeed = 4; // slower for smoother motion

  let isDragging = false;
  let startX = 0;
  let currentOffset = 0;

  // Enable smooth motion globally for auto-scroll
  track.style.transition = 'transform 0.1s linear';

  // Mouse drag
  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    currentOffset = scrollOffset;
    track.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    track.style.cursor = 'grab';
    resetIfOutOfBounds();
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    scrollOffset = currentOffset - dx;
    track.style.transition = 'none'; // disable transition for manual drag
    track.style.transform = `translateX(${-scrollOffset}px)`;
    updateCenterDuringDrag();
  });

  // Touch drag
  track.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentOffset = scrollOffset;
  });
  track.addEventListener('touchend', () => {
    isDragging = false;
    resetIfOutOfBounds();
  });
  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    scrollOffset = currentOffset - dx;
    track.style.transition = 'none';
    track.style.transform = `translateX(${-scrollOffset}px)`;
    updateCenterDuringDrag();
  });

  function setItemState(index, isCenter) {
  const item = allItems[index];
  const img = item?.querySelector("img");
  if (!item || !img) return;

  img.style.transform = isCenter ? 'scale(1.4)' : 'scale(1)';
  img.style.filter = isCenter ? 'blur(0px)' : 'blur(2px)';
  
  if (isCenter) {
    img.classList.add('zoomed-in-center');
  } else {
    img.classList.remove('zoomed-in-center');
  }
}



  function getCenteredItemIndex() {
    const centerX = window.innerWidth / 2;
    let closestIndex = -1;
    let minDistance = Infinity;
    allItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    return {
      index: closestIndex,
      originalIndex: closestIndex % originalCount,
      distance: minDistance
    };
  }

  function updateCenterDuringDrag() {
    const { index } = getCenteredItemIndex();
    if (lastCenteredIndex !== index) {
      if (lastCenteredIndex !== null) setItemState(lastCenteredIndex, false);
      setItemState(index, true);
      lastCenteredIndex = index;
    }
  }

  function resetIfOutOfBounds() {
  const totalScrollWidth = (originalCount * itemWidth) * cloneFactor * 2; // full length of clones only
  const offsetFromMiddle = scrollOffset - middleStartOffset;

  if (Math.abs(offsetFromMiddle) > totalScrollWidth) {
    const wrappedOffset = offsetFromMiddle % (originalCount * itemWidth);
    scrollOffset = middleStartOffset + wrappedOffset;
    track.style.transition = 'none';
    track.style.transform = `translateX(${-scrollOffset}px)`;
    void track.offsetWidth;
    track.style.transition = 'transform 0.1s linear';
  }
}

  function animate() {
    const now = performance.now();
    if (!isPaused && !isDragging) {
      scrollOffset += glideSpeed;
      track.style.transform = `translateX(${-scrollOffset}px)`;
    }

    const { index, originalIndex, distance } = getCenteredItemIndex();

    if (distance < 50 && index !== lastCenteredIndex && !isPaused && !isDragging) {
      if (lastCenteredIndex !== null) setItemState(lastCenteredIndex, false);
      lastCenteredIndex = index;
      setItemState(index, true);
      isPaused = true;
      pauseStartTime = now;
    }

    if (isPaused && now - pauseStartTime >= pauseDuration) {
      isPaused = false;
    }

    resetIfOutOfBounds();
    requestAnimationFrame(animate);
  }

  // Initial position and animation start
  track.style.transform = `translateX(${-scrollOffset}px)`;
  requestAnimationFrame(animate);
}
