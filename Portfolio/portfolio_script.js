window.addEventListener('DOMContentLoaded', () => {
  scrollContent();
});

function scrollContent(){
  const sections = document.querySelectorAll(".content-section:not(.fixed-heading)");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("active", entry.isIntersecting);
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach(section => observer.observe(section));
}
