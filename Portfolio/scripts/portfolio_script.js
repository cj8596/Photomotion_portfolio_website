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

  // Optional: Clear container before appending (if re-initializing)
  container.innerHTML = "";

  images.forEach((img) => {
    const full = `https://drive.google.com/thumbnail?id=${img.id}&sz=w4096`;
    const item = document.createElement("a");
    item.className = "portfolio-item";
    item.href = full;
    item.setAttribute("data-fancybox", "gallery");
    // item.setAttribute("data-caption", img.title);
    item.innerHTML = `<img src="${full}" alt="${img.title}" loading="lazy" />`;
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

        fullscreenBtn?.addEventListener("click", () => {
          Fancybox.getInstance()?.toggleFullscreen();
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
      }
    }
  });
}
