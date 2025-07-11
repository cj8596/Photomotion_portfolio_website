document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".content-section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("active", entry.isIntersecting);
      });
    },
    {
      threshold: 0.5, // section is visible when 50% enters viewport
    }
  );

  sections.forEach(section => observer.observe(section));
});
