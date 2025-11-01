window.addEventListener('DOMContentLoaded', () => {
  scrollContent();
  waitForImagesAndHideLoader();
});

function scrollContent() {
  const sections = document.querySelectorAll(".content-section:not(.fixed-heading)");
  let currentActive = null;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const section = entry.target;

        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          if (currentActive !== section) {
            if (currentActive) currentActive.classList.remove("active");
            section.classList.add("active");
            currentActive = section;
          }
        }
      });
    },
    {
      threshold: [0.6],
    }
  );

  sections.forEach(section => observer.observe(section));

  const firstSection = document.querySelector(".content-section:not(.fixed-heading)");
  if (firstSection && !firstSection.classList.contains("active")) {
    const rect = firstSection.getBoundingClientRect();
    const visiblePixels = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visibleRatio = visiblePixels / rect.height;

    if (visibleRatio > 0.6) {
      firstSection.classList.add("active");
      currentActive = firstSection;
    }
  }
}

function initializeFancyboxGallery(images) {

  const container = document.getElementById("portfolioGrid");
  if (!container) return;
  container.innerHTML = "";
  images.forEach((set, idx) => {
    const item = document.createElement("div");
    item.className = "portfolio-item";
    const imgList = [set.main];
    if (set.sides && set.sides.length > 0) imgList.push(...set.sides);
    item.dataset.images = JSON.stringify(imgList);
    item.innerHTML = `<img src="${set.main}" alt="Portfolio ${idx + 1}"/>`;
    item.addEventListener("click", () => openAdaptiveViewer(images, idx));
    container.appendChild(item);
  });


  const gridItems = document.querySelectorAll(".portfolio-item");
  gridItems.forEach(item => {
    const img = item.querySelector("img");
    const imgs = item.dataset.images ? JSON.parse(item.dataset.images) : [];

if (imgs.length > 1) {
  let index = 0;
  let interval;
  const fadeDuration = 1000; // 1s fade
  const delayBetween = 2000; // 2s visible before next image

  // smooth transitions
  img.style.transition = `opacity ${fadeDuration}ms ease-in-out, transform ${fadeDuration}ms ease-in-out`;
  img.style.transformOrigin = "center center";

  const switchImage = () => {
    img.style.opacity = "0";
    img.style.transform = "scale(1.04)";

    setTimeout(() => {
      index = (index + 1) % imgs.length;
      img.src = imgs[index];
      requestAnimationFrame(() => {
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
      });
    }, fadeDuration * 0.8); // swap just before fade ends for smoothness
  };

  item.addEventListener("mouseenter", () => {
    if (interval) clearInterval(interval);
    index = 0;
    switchImage();
    interval = setInterval(switchImage, delayBetween);
  });

  item.addEventListener("mouseleave", () => {
    if (interval) clearInterval(interval);
    interval = null;

    // ✅ fade back to original image smoothly
    img.style.opacity = "0";
    img.style.transform = "scale(1.04)";

    setTimeout(() => {
      img.src = imgs[0]; // main/original image
      requestAnimationFrame(() => {
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
      });
    }, fadeDuration * 0.8);
  });
}


  });
}

function openAdaptiveViewer(images, startIndex) {
  let currentSetIndex = startIndex;
  const set = images[currentSetIndex];
  const total = 1 + Math.min(set.sides?.length || 0, 2);

  let html = `
  <div class="adaptive-frame">
    <div class="images-row">`;

  if (total === 3) {
    html += `
      <img src="${set.sides[0]}" class="side left">
      <img src="${set.main}" class="center">
      <img src="${set.sides[1]}" class="side right">`;
  } else if (total === 2) {
    html += `
      <img src="${set.main}" class="center" data-main="${set.main}" data-alt="${set.sides[0]}">`;
  } else {
    html += `<img src="${set.main}" class="single center">`;
  }

  html += `
    </div>
  </div>`;

  const instance = Fancybox.show([{ src: html, type: "html" }], {
    Toolbar: false,
    dragToClose: false,
    placeFocusBack: false,
    closeButton: false
  });

  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    const container = instance?.$container;
    if (!container) return;
    const frame = container.querySelector(".adaptive-frame");
    setTimeout(() => {
      // Force correct centering before showing
      frame.style.transform = "translateX(0)";
      frame.style.left = "0";
      frame.style.right = "0";
      frame.classList.add("initial-open");
    }, 300);

    const row = frame.querySelector(".images-row");
    let imgs = Array.from(row.querySelectorAll("img"));

    const toolbar = document.createElement("div");
    toolbar.className = "custom-toolbar";
    frame.style.position = "relative";
    toolbar.innerHTML = `
      <button data-act="zoom"><img src="/images/icons/zoom.png"></button>
      <button data-act="fs"><img id="fullscreenIcon" src="/images/icons/fullscreen_enter.png"></button>
      <button data-act="close"><img src="/images/icons/grid.png"></button>`;
    frame.appendChild(toolbar);

    const lArr = document.createElement("button");
    lArr.className = "overlay-arrow left";
    lArr.innerHTML = `<img src="/images/icons/left-arrow.png">`;
    const rArr = document.createElement("button");
    rArr.className = "overlay-arrow right";
    rArr.innerHTML = `<img src="/images/icons/right-arrow.png">`;
    container.append(lArr, rArr);

    let thumbs = null;
    if (total > 1) {
      thumbs = document.createElement("div");
      thumbs.className = "custom-thumbs";

      const srcs =
        total === 3
          ? [set.sides[0], set.main, set.sides[1]]
          : [set.main, set.sides[0]];

      srcs.forEach((s, i) => {
        if (!s) return;
        const t = document.createElement("img");
        t.src = s;
        if (i === 0) t.classList.add("active");
        t.onclick = e => {
          e.stopPropagation();
          if (total === 3) rotate3ToCenter(s);
          else if (total === 2) show2ImageVariant(s);
          refreshActiveThumb(s);
        };
        thumbs.appendChild(t);
      });

      frame.appendChild(thumbs);
    }

    const refreshActiveThumb = src => {
      thumbs?.querySelectorAll("img").forEach(t => t.classList.toggle("active", t.src === src));
    };

    const refreshImages = () => (imgs = Array.from(row.querySelectorAll("img")));

    function rotate3ToCenter(target) {
      refreshImages();
      const idx = imgs.findIndex(i => i.src === target);
      if (idx === 1 || idx === -1) return;
      const srcs = imgs.map(i => i.src);
      const order = idx === 0 ? [srcs[2], srcs[0], srcs[1]] : [srcs[1], srcs[2], srcs[0]];
      imgs.forEach((img, i) => {
        img.src = order[i];
        img.className = i === 1 ? "center" : "side";
      });
      refreshActiveThumb(imgs[1].src);
    }

    function show2ImageVariant(target) {
      const center = row.querySelector(".center");
      if (center && target !== center.src) {
        center.classList.add("fade-out");
        setTimeout(() => {
          center.src = target;
          center.classList.remove("fade-out");
          center.classList.add("fade-in");
          setTimeout(() => center.classList.remove("fade-in"), 300);
        }, 200);
      }
    }

    let zoomed = false;
    let dragging = false;
    let startX = 0, startY = 0, ox = 0, oy = 0;

    function toggleZoom(img) {
      zoomed = !zoomed;

      const thumbs = frame.querySelector(".custom-thumbs");

      if (zoomed) {
        thumbs && (thumbs.style.opacity = "0", thumbs.style.pointerEvents = "none");

        img.style.transition = "transform 0.2s ease-out";
        img.style.cursor = "grab";
        img.style.transformOrigin = "center center";
        img.style.transform = `scale(3) translate(0, 0)`;
        img.style.objectFit = "contain";
        img.style.maxWidth = "none";
        img.style.maxHeight = "none";
        frame.classList.add("drag-enabled");

        ox = oy = 0;

        img.onmousedown = e => {
          if (!zoomed) return;
          e.preventDefault();
          dragging = true;
          img.style.cursor = "grabbing";
          startX = e.clientX - ox;
          startY = e.clientY - oy;

          const move = ev => {
            if (!dragging) return;
            ox = ev.clientX - startX;
            oy = ev.clientY - startY;
            img.style.transform = `scale(3) translate(${ox / 1.3}px, ${oy / 1.3}px)`;
          };

          const up = () => {
            dragging = false;
            img.style.cursor = "grab";
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
          };

          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", up);
        };

      } else {
        thumbs && (thumbs.style.opacity = "1", thumbs.style.pointerEvents = "auto");
        img.style.transform = "scale(1)";
        img.style.cursor = "pointer";
        img.style.maxWidth = "";
        img.style.maxHeight = "";
        ox = oy = 0;
        frame.classList.remove("drag-enabled");
      }
    }

    frame.addEventListener("click", e => {
      if (zoomed || dragging) {
        e.stopPropagation();
        return;
      }
      const isInside =
        e.target.closest(".images-row img, .custom-thumbs img, .custom-toolbar, .overlay-arrow");
      if (!isInside) instance.close();
    });


    imgs.forEach(img => {
      img.onclick = e => {
        e.stopPropagation();
        if (img.classList.contains("ghost")) return;
        if (total === 3 && img.classList.contains("side")) rotate3ToCenter(img.src);
        else if (total === 2) toggleZoom(img);
        else toggleZoom(img);
      };
    });

    toolbar.querySelector('[data-act="zoom"]').onclick = e => {
      e.stopPropagation();
      const active =
        imgs.find(i => i.classList.contains("center") && !i.classList.contains("ghost")) || imgs[0];
      toggleZoom(active);
    };

    const fsBtn = toolbar.querySelector('[data-act="fs"]');
    const fsIcon = toolbar.querySelector("#fullscreenIcon");
    fsBtn.onclick = async e => {
      e.stopPropagation();
      const isFull = !!document.fullscreenElement;
      if (!isFull) {
        await frame.requestFullscreen();
        frame.classList.add("fullscreen-only");
        fsIcon.src = "/images/icons/fullscreen_exit.png";
      } else {
        await document.exitFullscreen();
        frame.classList.remove("fullscreen-only");
        fsIcon.src = "/images/icons/fullscreen_enter.png";
      }
    };

    document.addEventListener("fullscreenchange", () => {
      const isFull = !!document.fullscreenElement;
      fsIcon.src = isFull
        ? "/images/icons/fullscreen_exit.png"
        : "/images/icons/fullscreen_enter.png";
      thumbs && (thumbs.style.display = isFull ? "none" : "flex");
    });

    toolbar.querySelector('[data-act="close"]').onclick = e => {
      e.stopPropagation();
      instance.close();
    };

    const goLeft = () => {
      currentSetIndex = (currentSetIndex - 1 + images.length) % images.length;
      updateViewer(images[currentSetIndex], "left");
    };

    const goRight = () => {
      currentSetIndex = (currentSetIndex + 1) % images.length;
      updateViewer(images[currentSetIndex], "right");
    };


    function updateViewer(newSet, direction = "right") {
      const frame = document.querySelector(".adaptive-frame");
      const row = frame?.querySelector(".images-row");
      const thumbs = frame?.querySelector(".custom-thumbs");
      if (!row) return;

      const total = 1 + Math.min(newSet.sides?.length || 0, 2);
      const isInitial = frame.classList.contains("initial-open");

      // Skip animation delay on first open
      if (isInitial) {
        applyNewImages();
        frame.classList.remove("initial-open");
      } else {
        row.classList.add(`slide-out-${direction}`);
        setTimeout(() => {
          applyNewImages();
          const inDir = direction === "right" ? "left" : "right";
          row.classList.remove(`slide-out-${direction}`);
          row.classList.add(`slide-in-${inDir}`);
          setTimeout(() => row.classList.remove(`slide-in-${inDir}`), 500);
        }, 400);
      }

      function applyNewImages() {
        // Rebuild image HTML dynamically
        let html = "";
        if (total === 3) {
          html = `
        <img src="${newSet.sides[0]}" class="side left" loading="eager" decoding="async">
        <img src="${newSet.main}" class="center" loading="eager" decoding="async">
        <img src="${newSet.sides[1]}" class="side right" loading="eager" decoding="async">
      `;
        } else if (total === 2) {
          html = `
        <img src="${newSet.main}" class="center" data-main="${newSet.main}" data-alt="${newSet.sides[0]}" loading="eager" decoding="async">
      `;
        } else {
          html = `<img src="${newSet.main}" class="single center" loading="eager" decoding="async">`;
        }

        row.innerHTML = html;

        // Rebuild thumbnails
        if (thumbs) {
          thumbs.innerHTML = "";
          const srcs =
            total === 3
              ? [newSet.sides[0], newSet.main, newSet.sides[1]]
              : total === 2
                ? [newSet.main, newSet.sides[0]]
                : [newSet.main];

          srcs.forEach((s, i) => {
            if (!s) return;
            const t = document.createElement("img");
            t.src = s;
            if (i === 0) t.classList.add("active");
            t.onclick = e => {
              e.stopPropagation();
              if (total === 3) rotate3ToCenter(s);
              else if (total === 2) show2ImageVariant(s);
              refreshActiveThumb(s);
            };
            thumbs.appendChild(t);
          });
        }
      }
    }

    lArr.onclick = e => {
      e.stopPropagation();
      goLeft();
    };
    rArr.onclick = e => {
      e.stopPropagation();
      goRight();
    };

    frame.addEventListener("click", e => {
      if (zoomed || dragging) return;

      const isInside =
        e.target.closest(".images-row img, .custom-thumbs img, .custom-toolbar, .overlay-arrow");
      if (!isInside) instance.close();
    });


    instance.on("closing", () => {
      document.body.style.overflow = "";
    });
  });
}

function waitForImagesAndHideLoader() {
  const loader = document.getElementById("imageLoader");
  const images = document.querySelectorAll("img");
  let loadedCount = 0;
  const total = images.length;

  if (total === 0) {
    loader?.classList.add("hidden");
    return;
  }

  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
      if (loadedCount === total) loader?.classList.add("hidden");
    } else {
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === total) loader?.classList.add("hidden");
      });
      img.addEventListener("error", () => {
        loadedCount++;
        if (loadedCount === total) loader?.classList.add("hidden");
      });
    }
  });
}

