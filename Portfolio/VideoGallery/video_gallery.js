document.addEventListener("DOMContentLoaded", function() {
  const videoGrid = document.getElementById("videoGrid");

  if (!videoData || !Array.isArray(videoData)) {
    console.error("video_data.js not loaded or invalid");
    return;
  }

  videoData.forEach(video => {
    const item = document.createElement("div");
    item.classList.add("portfolio-item");

    item.innerHTML = `
      <a data-fancybox="video-gallery" href="${video.src}" data-caption="${video.title}">
        <video src="${video.src}" muted playsinline preload="none" poster="/images/thumbnails/video_placeholder.jpg"></video>
        <div class="overlay">
          <span class="play-icon">▶</span>
          <h3>${video.title}</h3>
        </div>
      </a>
    `;

    const vid = item.querySelector("video");
    item.addEventListener("mouseenter", () => vid.play());
    item.addEventListener("mouseleave", () => vid.pause());

    videoGrid.appendChild(item);
  });
});
