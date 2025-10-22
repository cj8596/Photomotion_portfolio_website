window.addEventListener('DOMContentLoaded', () => {
  initMenuToggle();
  initContentLockdown();
  initializeKeyboardProtection();
  initVideoGallery();
});

/* ======================================================
   1️⃣ Video Grid Initialization
====================================================== */
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

  videoGrid.innerHTML = ""; // Clear existing content if reinitializing

  videoData.forEach(video => {
    const item = document.createElement("div");
    item.classList.add("portfolio-item");

    item.innerHTML = `
      <a data-fancybox="video-gallery" href="${video.src}">
        <video 
          src="${video.src}" 
          muted 
          playsinline 
          preload="metadata"
          data-gallery-video
        ></video>
        <div class="overlay">
          <img src="/images/icons/play_button.png" alt="Play" class="play-icon">
        </div>
      </a>
    `;

    const vid = item.querySelector("video");

    // Hover play/pause effect
    item.addEventListener("mouseenter", () => vid.play());
    item.addEventListener("mouseleave", () => vid.pause());

    videoGrid.appendChild(item);
  });

  console.log("✅ Video gallery initialized.");
}

