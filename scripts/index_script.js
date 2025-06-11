// Main entry
window.addEventListener('DOMContentLoaded', () => {
  initCategoryHover();
  // initHeaderHover(); // ❌ Not used in HTML – commented out for cleanup
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

// Full-page menu toggle logic
// function initMenuToggle() {
//   const menuButton = document.getElementById('menu-button');
//   const menuClose = document.getElementById('menu-close');
//   const fullpageMenu = document.getElementById('fullpage-menu');
//   const contactBtn = document.getElementById('contact-float-btn');

//   function openMenu() {
//     fullpageMenu.classList.add('active');
//     document.body.classList.add('menu-active');
//     fullpageMenu.setAttribute('aria-hidden', 'false');
//     fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = 0);
//     fullpageMenu.style.display = 'flex';
//     if (contactBtn) contactBtn.style.display = 'none';
//   }

//   function closeMenu() {
//     fullpageMenu.classList.remove('active');
//     document.body.classList.remove('menu-active');
//     fullpageMenu.setAttribute('aria-hidden', 'true');
//     fullpageMenu.querySelectorAll('a').forEach(a => a.tabIndex = -1);
//     fullpageMenu.classList.add('closing');
//     if (contactBtn) contactBtn.style.display = 'block';
//     setTimeout(() => {
//       fullpageMenu.classList.remove('closing');
//       fullpageMenu.style.display = 'none';
//     }, 700);
//   }

//   if (menuButton && menuClose && fullpageMenu) {
//     menuButton.addEventListener('click', openMenu);
//     menuClose.addEventListener('click', closeMenu);
//   }
// }

// Rotating animated text in menu contact section
// function initWordAnimator() {
//   const words = ["Start a Conversation!", "Book a Session!", "Let’s Create!", "Say Hello!"];
//   const wordElement = document.getElementById("animated-word");
//   if (!wordElement) return;
//   let wordIndex = 0;
//   const typingSpeed = 150;
//   const pauseAfterWord = 2000;

//   function typeWord() {
//     const currentWord = words[wordIndex];
//     let letterIndex = 0;
//     wordElement.textContent = '';

//     function addLetter() {
//       if (letterIndex < currentWord.length) {
//         wordElement.textContent += currentWord.charAt(letterIndex++);
//         setTimeout(addLetter, typingSpeed);
//       } else {
//         setTimeout(() => {
//           wordIndex = (wordIndex + 1) % words.length;
//           typeWord();
//         }, pauseAfterWord);
//       }
//     }
//     addLetter();
//   }

//   typeWord();
// }

// Floating button toggles contact section scroll
// function initContactButton() {
//   const contactBtn = document.getElementById('contact-float-btn');
//   const contactSection = document.getElementById('contact');
//   if (!(contactBtn && contactSection)) return;
//   let isAtContact = false;

//   contactBtn.addEventListener('click', () => {
//     if (isAtContact) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       contactSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   });

//   const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       contactBtn.textContent = entry.isIntersecting
//         ? '⬆'
//         : 'Book an Appointment with Us!';
//       isAtContact = entry.isIntersecting;
//     });
//   }, { threshold: 0.5 });

//   observer.observe(contactSection);
// }

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
  const cloneFactor = 2; // Clone twice before and after
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
  const totalCount = allItems.length;

  const style = getComputedStyle(track);
  const itemGap = parseFloat(style.columnGap || style.gap || "0");
  const itemWidth = originalItems[0].getBoundingClientRect().width + itemGap;

  // const middleStartOffset = cloneFactor * originalCount * itemWidth;
  // let scrollOffset = middleStartOffset;
  const scrollOffsetStart = cloneFactor * originalCount * itemWidth;
  let scrollOffset = scrollOffsetStart;
  let lastCenteredOriginalIndex = -1;
  let lastCenteredIndex = null;
  let isPaused = false;
  let pauseStartTime = 0;

  const pauseDuration = 1000;
  const glideSpeed = 4;

  let isDragging = false;
  let startX = 0;
  let currentOffset = 0;

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
    track.style.transform = `translateX(${-scrollOffset}px)`;
    updateCenterDuringDrag();
  });

  function setItemState(index, isCenter) {
    const item = allItems[index];
    const img = item?.querySelector("img");
    if (!item || !img) return;
    item.style.filter = isCenter ? 'none' : 'blur(1px)';
    img.style.transform = isCenter ? 'scale(1.4)' : 'scale(1)';
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
    const totalScrollWidth = originalCount * itemWidth;
    const offsetFromMiddle = scrollOffset - middleStartOffset;
    if (Math.abs(offsetFromMiddle) >= totalScrollWidth) {
      const wrappedOffset = offsetFromMiddle % totalScrollWidth;
      scrollOffset = middleStartOffset + wrappedOffset;
      track.style.transition = 'none';
      track.style.transform = `translateX(${-scrollOffset}px)`;
      void track.offsetWidth;
      track.style.transition = 'transform 0.3s ease';
    }
  }

  function animate() {
    const now = performance.now();
    if (!isPaused && !isDragging) scrollOffset += glideSpeed;
    track.style.transform = `translateX(${-scrollOffset}px)`;

    const { index, originalIndex, distance } = getCenteredItemIndex();
    if (distance < 10 && originalIndex !== lastCenteredOriginalIndex && !isPaused && !isDragging) {
      if (lastCenteredIndex !== null) setItemState(lastCenteredIndex, false);
      lastCenteredOriginalIndex = originalIndex;
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

  // Initial setup
  track.style.transform = `translateX(${-scrollOffset}px)`;
  track.style.transition = 'transform 0.3s ease';
  // requestAnimationFrame(animate);
}





// function initZoomStopCarousel() {
//   const track = document.getElementById("carousel-track");
//   const originalItems = Array.from(track.children);
//   // const itemGap = 150;
//   const itemWidth = originalItems[0].getBoundingClientRect().width + 200; // 200 = your gap

//   const originalCount = originalItems.length;

//   // Clone before & after for infinite effect
//   const clonesBefore = originalItems.map(item => item.cloneNode(true));
//   const clonesAfter = originalItems.map(item => item.cloneNode(true));
//   clonesBefore.reverse().forEach(clone => track.prepend(clone));
//   clonesAfter.forEach(clone => track.append(clone));

//   const allItems = Array.from(track.children);
//   const startIndex = clonesBefore.length;
//   const middleStartOffset = startIndex * itemWidth;

//   let scrollOffset = middleStartOffset;
//   let lastCenteredOriginalIndex = -1;
//   let lastCenteredIndex = null;
//   let isPaused = false;
//   let pauseStartTime = 0;
//   const pauseDuration = 1000;
//   const glideSpeed = 4;

//   function setItemState(index, isCenter) {
//     const item = allItems[index];
//     const img = item.querySelector("img");
//     if (!item || !img) return;

//     if (isCenter) {
//       item.style.filter = 'none';
//       img.style.transform = 'scale(1.4)';
//     } else {
//       item.style.filter = 'blur(1px)';
//       img.style.transform = 'scale(1)';
//     }
//   }

//   function getCenteredItemIndex() {
//     const centerX = window.innerWidth / 2;
//     let closestIndex = -1;
//     let minDistance = Infinity;

//     allItems.forEach((item, index) => {
//       const rect = item.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(centerX - itemCenter);
//       if (distance < minDistance) {
//         minDistance = distance;
//         closestIndex = index;
//       }
//     });

//     return {
//       index: closestIndex,
//       originalIndex: closestIndex % originalCount,
//       distance: minDistance
//     };
//   }

//   function animate() {
//     const now = performance.now();

//     if (!isPaused) {
//       scrollOffset += glideSpeed;
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//     }

//     const { index, originalIndex, distance } = getCenteredItemIndex();

//     // If a new item is centered
//     if (distance < 10 && originalIndex !== lastCenteredOriginalIndex && !isPaused) {
//       // Reset previous centered item
//       if (lastCenteredIndex !== null) {
//         setItemState(lastCenteredIndex, false);
//       }

//       // Apply zoom/blur to new center
//       lastCenteredOriginalIndex = originalIndex;
//       lastCenteredIndex = index;
//       setItemState(index, true);

//       // Pause scroll
//       isPaused = true;
//       pauseStartTime = now;
//     }

//     // Resume scroll after pause
//     if (isPaused && now - pauseStartTime >= pauseDuration) {
//       isPaused = false;
//     }

//     requestAnimationFrame(animate);
//   }
//   // const totalWidth = originalCount * itemWidth;
//   // const maxOffset = middleStartOffset + totalWidth;

//   // if (scrollOffset >= maxOffset) {
//   //   scrollOffset = middleStartOffset;
//   //   track.style.transform = `translateX(${-scrollOffset}px)`;
//   // }

//   const totalScrollWidth = originalCount * itemWidth;
//   const maxScrollOffset = middleStartOffset + totalScrollWidth;

//   if (scrollOffset >= maxScrollOffset) {
//     scrollOffset = middleStartOffset;
//     track.style.transition = 'none'; // prevent animation jump
//     track.style.transform = `translateX(${-scrollOffset}px)`;

//     // Force reflow, then re-enable transition
//     void track.offsetWidth;
//     track.style.transition = 'transform 0.3s ease';
//   }

//   requestAnimationFrame(() => {
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     track.style.transition = 'transform 0.3s ease';
//     requestAnimationFrame(animate);
//   });
// }

// function initZoomStopCarousel() {
//   const track = document.getElementById("carousel-track");
//   const originalItems = Array.from(track.children);

//   // Get gap from CSS
//   const style = getComputedStyle(track);
//   const itemGap = parseFloat(style.columnGap || style.gap || "0");

//   const itemWidth = originalItems[0].getBoundingClientRect().width + itemGap;
//   const originalCount = originalItems.length;

//   // Clone before and after for infinite scroll
//   const clonesBefore = originalItems.map(item => item.cloneNode(true));
//   const clonesAfter = originalItems.map(item => item.cloneNode(true));
//   clonesBefore.reverse().forEach(clone => track.prepend(clone));
//   clonesAfter.forEach(clone => track.append(clone));

//   const allItems = Array.from(track.children);
//   const startIndex = clonesBefore.length;
//   const middleStartOffset = startIndex * itemWidth;

//   let scrollOffset = middleStartOffset;
//   let lastCenteredOriginalIndex = -1;
//   let lastCenteredIndex = null;
//   let isPaused = false;
//   let pauseStartTime = 0;

//   const pauseDuration = 1000;
//   const glideSpeed = 4;

//   // Drag state
//   let isDragging = false;
//   let startX = 0;
//   let currentOffset = 0;

//   // Drag handlers
//   track.addEventListener('mousedown', e => {
//     isDragging = true;
//     startX = e.clientX;
//     currentOffset = scrollOffset;
//     track.style.cursor = 'grabbing';
//   });

//   track.addEventListener('mouseup', () => {
//     isDragging = false;
//     track.style.cursor = 'grab';
//   });

//   track.addEventListener('mouseleave', () => {
//     isDragging = false;
//     track.style.cursor = 'grab';
//   });

//   track.addEventListener('mousemove', e => {
//     if (!isDragging) return;
//     const dx = e.clientX - startX;
//     scrollOffset = currentOffset - dx;
//     track.style.transform = `translateX(${-scrollOffset}px)`;

//     // ✅ Live zoom/blur during drag
//     const { index } = getCenteredItemIndex();
//     if (lastCenteredIndex !== index) {
//       if (lastCenteredIndex !== null) setItemState(lastCenteredIndex, false);
//       setItemState(index, true);
//       lastCenteredIndex = index;
//     }
//   });

//   // Touch handlers
//   track.addEventListener('touchstart', e => {
//     isDragging = true;
//     startX = e.touches[0].clientX;
//     currentOffset = scrollOffset;
//   });

//   track.addEventListener('touchend', () => {
//     isDragging = false;
//   });

//   track.addEventListener('touchcancel', () => {
//     isDragging = false;
//   });

//   track.addEventListener('touchmove', e => {
//     if (!isDragging) return;
//     const dx = e.touches[0].clientX - startX;
//     scrollOffset = currentOffset - dx;
//     track.style.transform = `translateX(${-scrollOffset}px)`;

//     // ✅ Live zoom/blur during touch drag
//     const { index } = getCenteredItemIndex();
//     if (lastCenteredIndex !== index) {
//       if (lastCenteredIndex !== null) setItemState(lastCenteredIndex, false);
//       setItemState(index, true);
//       lastCenteredIndex = index;
//     }
//   });

//   function setItemState(index, isCenter) {
//     const item = allItems[index];
//     const img = item.querySelector("img");
//     if (!item || !img) return;

//     if (isCenter) {
//       item.style.filter = 'none';
//       img.style.transform = 'scale(1.4)';
//     } else {
//       item.style.filter = 'blur(1px)';
//       img.style.transform = 'scale(1)';
//     }
//   }

//   function getCenteredItemIndex() {
//     const centerX = window.innerWidth / 2;
//     let closestIndex = -1;
//     let minDistance = Infinity;

//     allItems.forEach((item, index) => {
//       const rect = item.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(centerX - itemCenter);
//       if (distance < minDistance) {
//         minDistance = distance;
//         closestIndex = index;
//       }
//     });

//     return {
//       index: closestIndex,
//       originalIndex: closestIndex % originalCount,
//       distance: minDistance
//     };
//   }

//   function animate() {
//     const now = performance.now();

//     // Auto-scroll (unless paused or dragging)
//     if (!isPaused && !isDragging) {
//       scrollOffset += glideSpeed;
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//     }

//     const { index, originalIndex, distance } = getCenteredItemIndex();

//     if (distance < 10 && originalIndex !== lastCenteredOriginalIndex && !isPaused && !isDragging) {
//       if (lastCenteredIndex !== null) {
//         setItemState(lastCenteredIndex, false);
//       }

//       lastCenteredOriginalIndex = originalIndex;
//       lastCenteredIndex = index;
//       setItemState(index, true);

//       isPaused = true;
//       pauseStartTime = now;
//     }

//     if (isPaused && now - pauseStartTime >= pauseDuration) {
//       isPaused = false;
//     }

//     // Infinite loop reset
//     const totalScrollWidth = originalCount * itemWidth;
//     const maxScrollOffset = middleStartOffset + totalScrollWidth;

//     if (scrollOffset >= maxScrollOffset) {
//       scrollOffset = middleStartOffset;
//       track.style.transition = 'none';
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//       void track.offsetWidth;
//       track.style.transition = 'transform 0.3s ease';
//     }

//     requestAnimationFrame(animate);
//   }

//   requestAnimationFrame(() => {
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     track.style.transition = 'transform 0.3s ease';
//     requestAnimationFrame(animate);
//   });
// }

// function initZoomStopCarousel() {
//   const track = document.getElementById("carousel-track");
//   const originalItems = Array.from(track.children);

//   // Get computed gap from CSS
//   const style = getComputedStyle(track);
//   const itemGap = parseFloat(style.columnGap || style.gap || "0");
//   const itemWidth = originalItems[0].getBoundingClientRect().width + itemGap;
//   const originalCount = originalItems.length;

//   // Clone items before and after for infinite effect
//   const clonesBefore = originalItems.map(item => item.cloneNode(true));
//   const clonesAfter = originalItems.map(item => item.cloneNode(true));
//   clonesBefore.reverse().forEach(clone => track.prepend(clone));
//   clonesAfter.forEach(clone => track.append(clone));

//   const allItems = Array.from(track.children);
//   const startIndex = clonesBefore.length;
//   const middleStartOffset = startIndex * itemWidth;

//   let scrollOffset = middleStartOffset;
//   let lastCenteredOriginalIndex = -1;
//   let lastCenteredIndex = null;
//   let isPaused = false;
//   let pauseStartTime = 0;

//   const pauseDuration = 1000;
//   const glideSpeed = 4;

//   // Drag state
//   let isDragging = false;
//   let startX = 0;
//   let currentOffset = 0;

//   // Drag handlers - Mouse
//   track.addEventListener('mousedown', e => {
//     isDragging = true;
//     startX = e.clientX;
//     currentOffset = scrollOffset;
//     track.style.cursor = 'grabbing';
//   });

//   track.addEventListener('mouseup', () => {
//     isDragging = false;
//     track.style.cursor = 'grab';
//     resetIfOutOfBounds();
//   });

//   track.addEventListener('mouseleave', () => {
//     isDragging = false;
//     track.style.cursor = 'grab';
//     resetIfOutOfBounds();
//   });

//   track.addEventListener('mousemove', e => {
//     if (!isDragging) return;
//     const dx = e.clientX - startX;
//     scrollOffset = currentOffset - dx;
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     updateCenterDuringDrag();
//   });

//   // Drag handlers - Touch
//   track.addEventListener('touchstart', e => {
//     isDragging = true;
//     startX = e.touches[0].clientX;
//     currentOffset = scrollOffset;
//   });

//   track.addEventListener('touchend', () => {
//     isDragging = false;
//     resetIfOutOfBounds();
//   });

//   track.addEventListener('touchcancel', () => {
//     isDragging = false;
//     resetIfOutOfBounds();
//   });

//   track.addEventListener('touchmove', e => {
//     if (!isDragging) return;
//     const dx = e.touches[0].clientX - startX;
//     scrollOffset = currentOffset - dx;
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     updateCenterDuringDrag();
//   });

//   // Update zoom and blur state
//   function setItemState(index, isCenter) {
//     const item = allItems[index];
//     const img = item.querySelector("img");
//     if (!item || !img) return;
//     if (isCenter) {
//       item.style.filter = 'none';
//       img.style.transform = 'scale(1.4)';
//     } else {
//       item.style.filter = 'blur(1px)';
//       img.style.transform = 'scale(1)';
//     }
//   }

//   // Find the image currently closest to the center of the screen
//   function getCenteredItemIndex() {
//     const centerX = window.innerWidth / 2;
//     let closestIndex = -1;
//     let minDistance = Infinity;

//     allItems.forEach((item, index) => {
//       const rect = item.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(centerX - itemCenter);
//       if (distance < minDistance) {
//         minDistance = distance;
//         closestIndex = index;
//       }
//     });

//     return {
//       index: closestIndex,
//       originalIndex: closestIndex % originalCount,
//       distance: minDistance
//     };
//   }

//   // Called during drag to update the centered image
//   function updateCenterDuringDrag() {
//     const { index } = getCenteredItemIndex();
//     if (lastCenteredIndex !== index) {
//       if (lastCenteredIndex !== null) setItemState(lastCenteredIndex, false);
//       setItemState(index, true);
//       lastCenteredIndex = index;
//     }
//   }

//   // Clamp scrollOffset if it goes out of bounds
//   function resetIfOutOfBounds() {
//     const totalScrollWidth = originalCount * itemWidth;
//     const maxScrollOffset = middleStartOffset + totalScrollWidth;

//     if (scrollOffset >= maxScrollOffset || scrollOffset <= 0) {
//       scrollOffset = middleStartOffset;
//       track.style.transition = 'none';
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//       void track.offsetWidth;
//       track.style.transition = 'transform 0.3s ease';
//     }
//   }

//   // Animation loop
//   function animate() {
//     const now = performance.now();

//     if (!isPaused && !isDragging) {
//       scrollOffset += glideSpeed;
//     }

//     track.style.transform = `translateX(${-scrollOffset}px)`;

//     const { index, originalIndex, distance } = getCenteredItemIndex();

//     if (distance < 10 && originalIndex !== lastCenteredOriginalIndex && !isPaused && !isDragging) {
//       if (lastCenteredIndex !== null) {
//         setItemState(lastCenteredIndex, false);
//       }
//       lastCenteredOriginalIndex = originalIndex;
//       lastCenteredIndex = index;
//       setItemState(index, true);
//       isPaused = true;
//       pauseStartTime = now;
//     }

//     if (isPaused && now - pauseStartTime >= pauseDuration) {
//       isPaused = false;
//     }

//     // Infinite loop logic
//     const totalScrollWidth = originalCount * itemWidth;
//     const maxScrollOffset = middleStartOffset + totalScrollWidth;

//     if (scrollOffset >= maxScrollOffset || scrollOffset <= 0) {
//       scrollOffset = middleStartOffset;
//       track.style.transition = 'none';
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//       void track.offsetWidth;
//       track.style.transition = 'transform 0.3s ease';
//     }

//     requestAnimationFrame(animate);
//   }

//   // Start animation
//   requestAnimationFrame(() => {
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     track.style.transition = 'transform 0.3s ease';
//     requestAnimationFrame(animate);
//   });
// }


//Works
// function initZoomStopCarousel() {
//   const track = document.getElementById("carousel-track");
//   const originalItems = Array.from(track.children);
//   const itemGap = 200;
//   const itemWidth = originalItems[0].offsetWidth + itemGap;
//   const originalCount = originalItems.length;

//   // Clone items before and after
//   const clonesBefore = originalItems.map(item => item.cloneNode(true));
//   const clonesAfter = originalItems.map(item => item.cloneNode(true));
//   clonesBefore.reverse().forEach(clone => track.prepend(clone));
//   clonesAfter.forEach(clone => track.append(clone));

//   const allItems = Array.from(track.children);
//   const startIndex = clonesBefore.length;
//   const middleStartOffset = startIndex * itemWidth;

//   let scrollOffset = middleStartOffset;
//   let isPaused = false;
//   let lastPausedOriginalIndex = -1;

//   function updateZoom() {
//     const centerX = window.innerWidth / 2;
//     let closestIndex = -1;
//     let closestDistance = Infinity;

//     allItems.forEach((item, index) => {
//       const rect = item.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(centerX - itemCenter);

//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = index;
//       }

//       // Zoom + Blur
//       const maxBlur = 4;
//       const maxScale = 1.4;
//       const blur = Math.min(maxBlur, (distance / centerX) * maxBlur);
//       const scale = Math.max(0.8, maxScale - (distance / centerX) * 0.6);

//       item.style.filter = `blur(${blur}px)`;
//       item.querySelector("img").style.transform = `scale(${scale})`;
//     });

//     return {
//       isCentered: closestDistance < 10,
//       centeredIndex: closestIndex
//     };
//   }

//   function animateScroll() {
//     if (!isPaused) {
//       scrollOffset += 1;
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//     }

//     const { isCentered, centeredIndex } = updateZoom();

//     // Map to original image index regardless of clone
//     const originalIndex = centeredIndex % originalCount;

//     if (isCentered && !isPaused && originalIndex !== lastPausedOriginalIndex) {
//       lastPausedOriginalIndex = originalIndex;
//       isPaused = true;

//       // Snap to center
//       const centeredItem = allItems[centeredIndex];
//       const rect = centeredItem.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const scrollAdjustment = itemCenter - window.innerWidth / 2;
//       scrollOffset += scrollAdjustment;
//       track.style.transform = `translateX(${-scrollOffset}px)`;

//       setTimeout(() => {
//         isPaused = false;
//       }, 1500);
//     }

//     requestAnimationFrame(animateScroll);
//   }

//   // Start animation
//   requestAnimationFrame(() => {
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     updateZoom();
//     requestAnimationFrame(animateScroll);
//   });
// }



// function initZoomStopCarousel() {
//   const track = document.getElementById("carousel-track");
//   const originalItems = Array.from(track.children);
//   const itemGap = 150;
//   const itemWidth = originalItems[0].offsetWidth + itemGap;
//   const originalCount = originalItems.length;

//   // Clone before & after
//   const clonesBefore = originalItems.map(item => item.cloneNode(true));
//   const clonesAfter = originalItems.map(item => item.cloneNode(true));
//   clonesBefore.reverse().forEach(clone => track.prepend(clone));
//   clonesAfter.forEach(clone => track.append(clone));

//   const allItems = Array.from(track.children);
//   const startIndex = clonesBefore.length;
//   const middleStartOffset = startIndex * itemWidth;

//   let scrollOffset = middleStartOffset;
//   let isPaused = false;
//   let currentIndex = 0;
//   let lastCentered = -1;

//   function updateZoom() {
//     const centerX = window.innerWidth / 2;
//     let closestIndex = -1;
//     let closestDistance = Infinity;

//     allItems.forEach((item, index) => {
//       const rect = item.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(centerX - itemCenter);

//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = index;
//       }

//       const maxBlur = 4;
//       const maxScale = 1.4;
//       const blur = Math.min(maxBlur, (distance / centerX) * maxBlur);
//       const scale = Math.max(0.8, maxScale - (distance / centerX) * 0.6);

//       item.style.filter = `blur(${blur}px)`;
//       item.querySelector("img").style.transform = `scale(${scale})`;
//     });

//     return {
//       isCentered: closestDistance < 10, // more forgiving to trigger earlier
//       centeredIndex: closestIndex,
//     };
//   }

//   function animateScroll() {
//     if (!isPaused) {
//       scrollOffset += 2;
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//     }

//     const { isCentered, centeredIndex } = updateZoom();
//     const normalizedIndex = centeredIndex - startIndex;

//     if (
//       isCentered &&
//       !isPaused &&
//       normalizedIndex !== lastCentered &&
//       normalizedIndex >= 0 &&
//       normalizedIndex < originalCount
//     ) {
//       lastCentered = normalizedIndex;
//       currentIndex += 1;
//       isPaused = true;

//       // Snap image perfectly to center
//       const centeredItem = allItems[centeredIndex];
//       const rect = centeredItem.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const scrollAdjustment = itemCenter - window.innerWidth / 2;
//       scrollOffset += scrollAdjustment;
//       track.style.transform = `translateX(${-scrollOffset}px)`;

//       setTimeout(() => {
//         isPaused = false;
//         lastCentered = -1;

//         if (currentIndex >= originalCount) {
//           scrollOffset = middleStartOffset;
//           currentIndex = 0;
//           track.style.transform = `translateX(${-scrollOffset}px)`;
//         }
//       }, 1200); // 1.2-second pause
//     }

//     requestAnimationFrame(animateScroll);
//   }

//   // Kick things off
//   requestAnimationFrame(() => {
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     updateZoom();
//     requestAnimationFrame(animateScroll);
//   });
// }




// function initZoomStopCarousel() {
//   const track = document.getElementById("carousel-track");
//   const originalItems = Array.from(track.children);
//   const itemGap = 150;
//   const itemWidth = originalItems[0].offsetWidth + itemGap;
//   const originalCount = originalItems.length;

//   // Clone before & after
//   const clonesBefore = originalItems.map(item => item.cloneNode(true));
//   const clonesAfter = originalItems.map(item => item.cloneNode(true));
//   clonesBefore.reverse().forEach(clone => track.prepend(clone));
//   clonesAfter.forEach(clone => track.append(clone));

//   const allItems = Array.from(track.children);
//   const startIndex = clonesBefore.length;
//   const middleStartOffset = startIndex * itemWidth;

//   let scrollOffset = middleStartOffset;
//   let isPaused = false;
//   let currentIndex = 0;
//   let lastCentered = -1;

//   function updateZoom() {
//     const centerX = window.innerWidth / 2;
//     let closestIndex = -1;
//     let closestDistance = Infinity;

//     allItems.forEach((item, index) => {
//       const rect = item.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(centerX - itemCenter);

//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = index;
//       }

//       const maxBlur = 4;
//       const maxScale = 1.4;
//       const blur = Math.min(maxBlur, (distance / centerX) * maxBlur);
//       const scale = Math.max(0.8, maxScale - (distance / centerX) * 0.6);

//       item.style.filter = `blur(${blur}px)`;
//       item.querySelector("img").style.transform = `scale(${scale})`;
//     });

//     return {
//       isCentered: closestDistance < 1,
//       centeredIndex: closestIndex,
//     };
//   }

//   function animateScroll() {
//     if (!isPaused) {
//       scrollOffset += 2;
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//     }

//     const { isCentered, centeredIndex } = updateZoom();
//     const normalizedIndex = centeredIndex - startIndex;

//     if (
//       isCentered &&
//       !isPaused &&
//       normalizedIndex !== lastCentered &&
//       normalizedIndex >= 0 &&
//       normalizedIndex < originalCount
//     ) {
//       lastCentered = normalizedIndex;
//       currentIndex += 1;
//       isPaused = true;

//       // ✅ Freeze scroll visually by NOT updating offset
//       setTimeout(() => {
//         isPaused = false;
//         lastCentered = -1;

//         if (currentIndex >= originalCount) {
//           scrollOffset = middleStartOffset;
//           currentIndex = 0;
//           track.style.transform = `translateX(${-scrollOffset}px)`;
//         }
//       }, 1200);
//     }

//     // Keep animating whether paused or not
//     requestAnimationFrame(animateScroll);
//   }

//   // Kick things off after layout
//   requestAnimationFrame(() => {
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     updateZoom();
//     requestAnimationFrame(animateScroll);
//   });
// }



// function initZoomStopCarousel() {
//   const track = document.getElementById("carousel-track");
//   const originalItems = Array.from(track.children);
//   const itemGap = 150;
//   const itemWidth = originalItems[0].offsetWidth + itemGap;
//   const originalCount = originalItems.length;

//   // Clone before & after
//   const clonesBefore = originalItems.map(item => item.cloneNode(true));
//   const clonesAfter = originalItems.map(item => item.cloneNode(true));
//   clonesBefore.reverse().forEach(clone => track.prepend(clone));
//   clonesAfter.forEach(clone => track.append(clone));

//   const allItems = Array.from(track.children);
//   const startIndex = clonesBefore.length;
//   const middleStartOffset = startIndex * itemWidth;
//   let scrollOffset = middleStartOffset;
//   let isPaused = false;
//   let currentIndex = 0; // how many originals we've centered
//   let lastCentered = -1;

//   function updateZoom() {
//     const centerX = window.innerWidth / 2;
//     let closestIndex = -1;
//     let closestDistance = Infinity;

//     allItems.forEach((item, index) => {
//       const rect = item.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(centerX - itemCenter);

//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = index;
//       }

//       const maxBlur = 4;
//       const maxScale = 1.4;
//       const blur = Math.min(maxBlur, (distance / centerX) * maxBlur);
//       const scale = Math.max(0.8, maxScale - (distance / centerX) * 0.6);

//       item.style.filter = `blur(${blur}px)`;
//       item.querySelector("img").style.transform = `scale(${scale})`;
//     });

//     return {
//       isCentered: closestDistance < 1,
//       centeredIndex: closestIndex,
//     };
//   }

//   function animateScroll() {
//     if (!isPaused) {
//       scrollOffset += 2;
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//     }

//     const { isCentered, centeredIndex } = updateZoom();

//     const normalizedIndex = centeredIndex - startIndex;

// if (isCentered && !isPaused && normalizedIndex !== lastCentered) {
//   lastCentered = normalizedIndex;

//   if (normalizedIndex >= 0 && normalizedIndex < originalCount) {
//     currentIndex += 1;
//   }

//   isPaused = true;

//   // Lock pause for duration
//   setTimeout(() => {
//     isPaused = false;
//     lastCentered = -1; // ✅ Allow the next image to trigger pause

//     // Reset scroll if all original images have been shown
//     if (currentIndex >= originalCount) {
//       scrollOffset = middleStartOffset;
//       currentIndex = 0;
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//     }
//   }, 1200);
// }


//     requestAnimationFrame(animateScroll);
//   }

//   // Kick it off
//   requestAnimationFrame(() => {
//     track.style.transform = `translateX(${-scrollOffset}px)`;
//     updateZoom();
//     requestAnimationFrame(animateScroll);
//   });
// }


// function initZoomStopCarousel() {
//  const track = document.getElementById("carousel-track");
// const originalItems = Array.from(track.children);
// const itemGap = 150;
// const itemWidth = originalItems[0].offsetWidth + itemGap;

// // Clone items
// const clonesBefore = originalItems.map(item => item.cloneNode(true));
// const clonesAfter = originalItems.map(item => item.cloneNode(true));

// clonesBefore.reverse().forEach(clone => track.prepend(clone)); // ✅ Correct order
// clonesAfter.forEach(clone => track.append(clone));

// const allItems = Array.from(track.children);
// let scrollOffset = clonesBefore.length * itemWidth; // ✅ FIXED
// let isPaused = false;


//   function updateZoom() {
//     const centerX = window.innerWidth / 2;
//     let closestItem = null;
//     let closestDistance = Infinity;

//     allItems.forEach((item) => {
//       const rect = item.getBoundingClientRect();
//       const itemCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(centerX - itemCenter);

//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestItem = item;
//       }

//       const maxBlur = 4;
//       const maxScale = 1.4;
//       const blur = Math.min(maxBlur, (distance / centerX) * maxBlur);
//       const scale = Math.max(0.8, maxScale - (distance / centerX) * 0.6);

//       item.style.filter = `blur(${blur}px)`;
//       item.querySelector("img").style.transform = `scale(${scale})`;
//     });

//     return closestDistance < 1; // center image threshold
//   }

//   function animateScroll() {
//     if (!isPaused) {
//       scrollOffset += 3; // speed here
//       track.style.transform = `translateX(${-scrollOffset}px)`;
//     }

//     const isCenterAligned = updateZoom();

//     // pause only when centered image is really centered
//     if (isCenterAligned && !isPaused) {
//       isPaused = true;
//       setTimeout(() => {
//         isPaused = false;
//       }, 1200);
//     }

//     // loop logic
//     const totalWidth = originalItems.length * itemWidth;
//     if (scrollOffset >= totalWidth * 2) {
//       scrollOffset = totalWidth;
//     }

//     requestAnimationFrame(animateScroll);
//   }

//   // Initial setup
//   track.style.transform = `translateX(${-scrollOffset}px)`;
//   requestAnimationFrame(animateScroll);
// }



// Image watermark wrapper (unused, optional feature)
// function wrapImagesWithWatermark() {
//   const images = document.querySelectorAll('img');
//   images.forEach(img => {
//     if (!img.parentElement.classList.contains('image-wrapper')) {
//       const wrapper = document.createElement('div');
//       wrapper.classList.add('image-wrapper');
//       img.parentNode.insertBefore(wrapper, img);
//       wrapper.appendChild(img);
//     }
//   });
// }
