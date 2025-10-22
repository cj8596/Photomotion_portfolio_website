window.addEventListener('DOMContentLoaded', () => {
  initMenuToggle();
  initContentLockdown();
  initializeKeyboardProtection();
  initVideoGallery();
});

function initVideoGallery() {
  const videoGrid = document.getElementById("videoGrid");

  if (!videoGrid) {
    console.error("No videoGrid element found.");
    return;
  }

  if (typeof videoData === "undefined" || !Array.isArray(videoData)) {
    console.error("video_data.js not loaded or invalid.");
    return;
  }

  videoGrid.innerHTML = ""; // Clear grid before filling

  videoData.forEach(video => {
    const item = document.createElement("div");
    item.classList.add("portfolio-item");

    item.innerHTML = `
      <a data-fancybox="video-gallery" href="${video.src}">
        <video 
          src="${video.src}" 
          muted 
          playsinline 
          preload="metadata">
        </video>
        <div class="overlay">
          <span class="play-icon">▶</span>
        </div>
      </a>
    `;

    const vid = item.querySelector("video");
    const link = item.querySelector("a");

    // --- 🖱️ Desktop Hover ---
    item.addEventListener("mouseenter", () => vid.play());
    item.addEventListener("mouseleave", () => {
      vid.pause();
      vid.currentTime = 0;
    });

    // --- 📱 Mobile Touch Hold ---
    let touchStartTime = 0;
    let touchHoldTimer = null;
    let isPlaying = false;

    item.addEventListener("touchstart", (e) => {
      touchStartTime = Date.now();

      // Start a timer — if finger stays >300ms, treat it as a "hover touch"
      touchHoldTimer = setTimeout(() => {
        vid.play();
        isPlaying = true;
      }, 300);
    }, { passive: true });

    item.addEventListener("touchend", (e) => {
      const touchDuration = Date.now() - touchStartTime;
      clearTimeout(touchHoldTimer);

      // If the touch was quick (<300ms) — consider it a "tap" → open Fancybox
      if (touchDuration < 300) {
        vid.pause();
        vid.currentTime = 0;
        isPlaying = false;
        link.click(); // ✅ triggers Fancybox open
      } else {
        // If user held finger, stop video when they lift it
        if (isPlaying) {
          vid.pause();
          vid.currentTime = 0;
          isPlaying = false;
        }
      }
    });

    videoGrid.appendChild(item);
  });

  console.log("✅ Video gallery initialized with hover + touch hold support.");
}
