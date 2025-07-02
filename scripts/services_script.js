window.addEventListener('DOMContentLoaded', () => {
  initHeaderFlip();
  initContentLockdown();
  initializeKeyboardProtection();
  initDropDownDetails();
});

function initDropDownDetails() {
  const detailsElements = document.querySelectorAll(".expandable-bullet-list details");

  detailsElements.forEach((details) => {
    const summary = details.querySelector("summary");
    const content = details.querySelector(".detail-content");

    // Initial setup
    if (!details.hasAttribute("open")) {
      content.style.maxHeight = "0px";
      content.style.opacity = "0";
      details.classList.remove("is-open", "closing");
    }

    summary.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = details.hasAttribute("open");

      // Close all others
      detailsElements.forEach((el) => {
        if (el !== details) {
          el.removeAttribute("open");
          el.classList.remove("is-open", "closing");
          const otherContent = el.querySelector(".detail-content");
          otherContent.style.maxHeight = "0px";
          otherContent.style.opacity = "0";
        }
      });

      if (isOpen) {
        // Step 1: Add .closing so arrow rotates
        details.classList.add("closing");

        // Step 2: Force layout reflow
        void details.offsetWidth;

        // Step 3: Animate collapse manually
        content.style.maxHeight = content.scrollHeight + "px";
        requestAnimationFrame(() => {
          content.style.maxHeight = "0px";
          content.style.opacity = "0";
        });

        // Step 4: Remove open *after* transition completes
        setTimeout(() => {
          details.classList.remove("is-open", "closing");
          details.removeAttribute("open");
        }, 600); // match your CSS transition
      } else {
        // Opening: set open and add class
        details.setAttribute("open", "");
        details.classList.add("is-open");

        content.style.maxHeight = "0px";
        content.style.opacity = "0";

        requestAnimationFrame(() => {
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.opacity = "1";
        });

        setTimeout(() => {
          content.style.maxHeight = "none";
        }, 600);
      }
    });
  });
}
