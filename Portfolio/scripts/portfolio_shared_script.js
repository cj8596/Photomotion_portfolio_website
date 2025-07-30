document.addEventListener("DOMContentLoaded", () => {
  if (typeof portfolioImages !== "undefined") {
    initializeFancyboxGallery(portfolioImages);
  } else {
    console.error("portfolioImages not found");
  }

  // ✅ Load Lottie animation
  const lottieContainer = document.getElementById("lottieLoader");
  if (lottieContainer) {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/images/icons/loader.json" // 🔁 ensure this path is correct
    });
  }

  initMenuToggle();
  initContentLockdown();
  initializeKeyboardProtection();
});
