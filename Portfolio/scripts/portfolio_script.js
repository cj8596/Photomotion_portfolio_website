window.addEventListener('DOMContentLoaded', () => {
  scrollContent();
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
      threshold: [0.6], // Only trigger when 60% is in view
    }
  );

  sections.forEach(section => observer.observe(section));

  // ✅ Manual check on load to activate first section if already in view
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
  const loader = document.getElementById("gridLoader");

  container.innerHTML = "";
  let loadedCount = 0;

  images.forEach((img) => {
    const full = `https://drive.google.com/thumbnail?id=${img.id}&sz=w4096`;
    const item = document.createElement("a");
    item.className = "portfolio-item";
    item.href = full;
    item.setAttribute("data-fancybox", "gallery");

    const imageElement = document.createElement("img");
    imageElement.src = full;
    imageElement.alt = img.title;
    imageElement.loading = "lazy";

    imageElement.onload = imageElement.onerror = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setTimeout(() => {
          loader.style.opacity = "0";
          setTimeout(() => loader.style.display = "none", 400);
        }, 300);
      }
    };

    item.appendChild(imageElement);
    container.appendChild(item);
  });

  Fancybox.bind("[data-fancybox='gallery']", {
    closeButton: false,
    Thumbs: false,
    caption: (fancybox, carousel, slide) => {
      return `<div class="custom-caption">${slide.caption || ""}</div>`;
    },
    Toolbar: {
      display: [
        {
          id: "zoom",
          html: `<button class="fancybox__button custom-icon-btn" title="Zoom">
            <img src="/images/icons/zoom.png" alt="Zoom" />
          </button>`
        },
        {
          id: "fullscreen",
          html: `<button class="fancybox__button custom-icon-btn" id="customFullscreenBtn" title="Fullscreen">
            <img id="fullscreenIcon" src="/images/icons/fullscreen_enter.png" alt="Enter Fullscreen" />
          </button>`
        },
        {
          id: "grid-close",
          html: `<button class="fancybox__button custom-icon-btn" title="Close">
            <img src="/images/icons/grid.png" alt="Grid/Close" />
          </button>`,
          position: "right"
        }
      ]
    },
    on: {
      ready: (fancybox) => {
        const container = fancybox.$container;

        const navContainer = document.createElement("div");
        navContainer.className = "custom-nav-buttons";

        const prevBtn = document.createElement("button");
        prevBtn.className = "custom-arrow prev";
        prevBtn.innerHTML = `<img src="/images/icons/left-arrow.png" alt="Previous">`;

        const nextBtn = document.createElement("button");
        nextBtn.className = "custom-arrow next";
        nextBtn.innerHTML = `<img src="/images/icons/right-arrow.png" alt="Next">`;

        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          Fancybox.getInstance()?.prev();
        });
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          Fancybox.getInstance()?.next();
        });

        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        container.appendChild(navContainer);

        fancybox.on("closing", () => navContainer.remove());

        const fullscreenBtn = container.querySelector("#customFullscreenBtn");
        const fullscreenIcon = container.querySelector("#fullscreenIcon");

        // 🔄 Fullscreen the CENTER image (fallback to the only img)
        fullscreenBtn?.addEventListener("click", () => {
          const inst = Fancybox.getInstance();
          const currentSlide = inst?.getSlide();
          if (!currentSlide) return;

          const centerImg =
            currentSlide.$content?.querySelector(".product-carousel .carousel-item.active img") ||
            currentSlide.$content?.querySelector(".product-carousel img");

          if (!centerImg) return;

          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else {
            (centerImg.requestFullscreen ||
              centerImg.webkitRequestFullscreen ||
              centerImg.msRequestFullscreen ||
              centerImg.mozRequestFullScreen
            )?.call(centerImg);
          }
        });

        document.addEventListener("fullscreenchange", () => {
          const isFullscreen = !!document.fullscreenElement;
          if (fullscreenIcon) {
            fullscreenIcon.src = isFullscreen
              ? "/images/icons/fullscreen_exit.png"
              : "/images/icons/fullscreen_enter.png";
            fullscreenIcon.alt = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";
          }
        });

        container.querySelector(".fancybox__button[title='Zoom']")
          ?.addEventListener("click", () => Fancybox.getInstance()?.toggleZoom());

        container.querySelector(".fancybox__button[title='Close']")
          ?.addEventListener("click", () => Fancybox.getInstance()?.close());
      },

      /* ------------------------
         MAIN + SIDE IMAGE HOOK
      ------------------------ */
      "Carousel.selectSlide": (fancybox, carousel, slide) => {
        console.log("Slide opened:", slide.src);
        const url = slide.src;

        // Find the main image entry
        const main = portfolioImages.find(img => url.includes(img.id));
        if (!main || !main.group) return;

        // Gather and dedupe group images by id (avoid overlaps between main/extras)
        const groupMain = portfolioImages.filter(img => img.group === main.group);
        const groupExtras = portfolioExtraImages[main.group] || [];
        const dedupeById = (arr) => {
          const seen = new Set();
          const out = [];
          for (const img of arr) {
            if (img && !seen.has(img.id)) {
              seen.add(img.id);
              out.push(img);
            }
          }
          return out;
        };
        const groupImages = dedupeById([...groupMain, ...groupExtras]);

        let currentIndex = groupImages.findIndex(img => url.includes(img.id));
        if (currentIndex === -1) return;

        // ✅ Create carousel container
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'product-carousel';
        carouselContainer.innerHTML = `<div class="carousel-track"></div>`;

        const track = carouselContainer.querySelector(".carousel-track");

        // ✅ Render adaptable frame (1, 2, or 3 images)
        const renderCarousel = () => {
          const leftIndex  = (currentIndex - 1 + groupImages.length) % groupImages.length;
          const rightIndex = (currentIndex + 1) % groupImages.length;

          const center = groupImages[currentIndex];
          let imagesToShow = dedupeById([groupImages[leftIndex], center, groupImages[rightIndex]]);

          // Determine which rendered index is active:
          // - 3 items: middle is active
          // - 2 items: the one equal to center is active
          // - 1 item: the only one is active
          let activeRenderIndex = imagesToShow.findIndex(img => img.id === center.id);
          if (activeRenderIndex < 0) activeRenderIndex = 0;

          if (!track) {
            console.warn('Carousel track not found');
            return;
          }

          track.innerHTML = imagesToShow.map((img, i) => {
            const isActive = i === activeRenderIndex;
            const size = isActive ? 'w4096' : 'w1024';
            return `
              <div class="carousel-item ${isActive ? 'active' : 'side'}">
                <img
                  src="https://drive.google.com/thumbnail?id=${img.id}&sz=${size}"
                  alt="${img.title}"
                  ${isActive ? 'data-center="1"' : ''}
                >
              </div>
            `;
          }).join("");
        };

        renderCarousel();

        // ✅ Update the slide content safely
        setTimeout(() => {
          const currentSlide = fancybox.getSlide();
          if (currentSlide && currentSlide.$content) {
            currentSlide.$content.innerHTML = '';
            currentSlide.$content.appendChild(carouselContainer);

            // ✨ Click on empty space (not the image) closes the lightbox
            currentSlide.$content.addEventListener("click", (e) => {
              if (!(e.target instanceof HTMLImageElement)) {
                Fancybox.getInstance()?.close();
              }
            });
          } else {
            console.warn('Could not update slide content - element not ready');
          }
        }, 50);

        // Auto-advance every 3s (only when there are >1 items)
        let interval = null;
        if (groupImages.length > 1) {
          interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % groupImages.length;
            renderCarousel();
          }, 3000);
        }

        // Stop autoplay on close
        fancybox.on("closing", () => {
          if (interval) clearInterval(interval);
        });
      }

    }
  });
}
