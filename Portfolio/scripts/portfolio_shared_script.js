document.addEventListener("DOMContentLoaded", () => {
  if (typeof portfolioImages !== "undefined") {
    initializeFancyboxGallery(portfolioImages);
  } else {
    console.error("portfolioImages not found");
  }
  initMenuToggle();
  initContentLockdown();
  initializeKeyboardProtection();
});