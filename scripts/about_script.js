window.addEventListener('DOMContentLoaded', () => {
  initAboutHeaderFlip();
});


function initAboutHeaderFlip() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let pageTurned = false;

  function updateHeaderState() {
    const scrollY = window.scrollY;

    // Flip header when scrolling down beyond 80px
    if (scrollY > 80 && !pageTurned) {
      header.classList.add('turn-page');
      pageTurned = true;
    }

    // Restore header when scrolling back up
    if (scrollY <= 80 && pageTurned) {
      header.classList.remove('turn-page');
      pageTurned = false;
    }
  }

  window.addEventListener('scroll', updateHeaderState);
  window.addEventListener('load', updateHeaderState);
}
