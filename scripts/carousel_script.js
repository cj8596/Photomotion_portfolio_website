function initZoomStopCarousel() {
  const isSmallScreen = window.innerWidth <= 768;
  const track = document.getElementById("carousel-track");
  const originalItems = Array.from(track.children);

  const cloneFactor = isSmallScreen ? 6 : 10;
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

  let style = getComputedStyle(track);
  let itemGap = parseFloat(style.columnGap || style.gap || "0");
  let itemWidth = originalItems[0].getBoundingClientRect().width + itemGap;

  let middleStartOffset = cloneFactor * originalCount * itemWidth;
  let scrollOffset = middleStartOffset;
  let lastCenteredIndex = null;
  let isPaused = false;
  let pauseStartTime = 0;

  const pauseDuration = isSmallScreen ? 1200 : 1000;
  const glideSpeed = isSmallScreen ? 4 : 5;

  let isDragging = false;
  let startX = 0;
  let currentOffset = 0;

  track.style.transition = 'transform 0.2s linear';
  track.style.transform = `translateX(${-scrollOffset}px)`;

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
    track.style.transition = 'none';
    track.style.transform = `translateX(${-scrollOffset}px)`;
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
  });

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
      distance: minDistance
    };
  }

  function resetIfOutOfBounds() {
    const loopDistance = originalCount * itemWidth;
    const offsetFromMiddle = scrollOffset - middleStartOffset;
    const resetThreshold = loopDistance * (cloneFactor + 6); // you can keep this high if needed

    if (Math.abs(offsetFromMiddle) >= resetThreshold) {
      const wrappedOffset = ((offsetFromMiddle % loopDistance) + loopDistance) % loopDistance;
      scrollOffset = middleStartOffset + wrappedOffset;

      // ✅ SEAMLESS SNAP WITHOUT FADE
      track.style.transition = 'none';
      track.style.transform = `translateX(${-scrollOffset}px)`;

      // ✅ Restore transition
      void track.offsetWidth; // force reflow
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.2s linear';
      });
    }
  }




  function animate() {
    const now = performance.now();

    if (!isPaused && !isDragging) {
      scrollOffset += glideSpeed;
      track.style.transform = `translateX(${-scrollOffset}px)`;
    }

    const centerX = window.innerWidth / 2;
    const maxDistance = window.innerWidth / 2;

    allItems.forEach((item, index) => {
      const img = item.querySelector("img");
      if (!img) return;

      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - itemCenter);

      const zoomScale = isSmallScreen
        ? 1 + (1.25 - 1) * (1 - distance / maxDistance)
        : 1 + (1.4 - 1) * (1 - distance / maxDistance);

      const blurAmount = Math.min(2, (distance / maxDistance) * 2);

      img.style.transform = `scale(${zoomScale})`;
      img.style.filter = `blur(${blurAmount}px)`;

      if (zoomScale > (isSmallScreen ? 1.2 : 1.35)) {
        img.classList.add("zoomed-in-center");
      } else {
        img.classList.remove("zoomed-in-center");
      }
    });

    const { index: currentCenterIndex, distance } = getCenteredItemIndex();

    if (
      distance < (isSmallScreen ? 60 : 50) &&
      currentCenterIndex !== lastCenteredIndex &&
      !isPaused &&
      !isDragging
    ) {
      lastCenteredIndex = currentCenterIndex;
      isPaused = true;
      pauseStartTime = now;
    }

    if (isPaused && now - pauseStartTime >= pauseDuration) {
      isPaused = false;
    }

    resetIfOutOfBounds();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    const isSmallScreen = window.innerWidth <= 768;
    if (!isSmallScreen) return; // only apply fix on small screens

    style = getComputedStyle(track);
    itemGap = parseFloat(style.columnGap || style.gap || "0");

    // Use a visible item to get current width
    const visibleItem = allItems.find(item => item.offsetParent !== null);
    if (!visibleItem) return;

    const newWidth = visibleItem.getBoundingClientRect().width;
    itemWidth = newWidth + itemGap;

    const loopDistance = originalCount * itemWidth;
    const newMiddleOffset = cloneFactor * originalCount * itemWidth;

    scrollOffset = newMiddleOffset + ((scrollOffset - middleStartOffset) % loopDistance);
    middleStartOffset = newMiddleOffset;

    track.style.transition = 'none';
    track.style.transform = `translateX(${-scrollOffset}px)`;
  });
}