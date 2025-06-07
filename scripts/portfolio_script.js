const gallery = document.getElementById('gallery');
const template = document.getElementById('image-template');
const buttons = document.querySelectorAll('.category-btn');

// Your static image arrays (make sure these are loaded before this script)
const categories = {
  all: allImages,         // your big-ass array of URLs from Google Drive
  portraits: portraitsImages,
  landscapes: landscapesImages,
  // add other categories if needed
};

const MAX_IMAGES = 20; // still keep this if you want limit

function loadImages(category) {
    gallery.innerHTML = '';

    const images = categories[category] || [];

    // Load max or fewer images based on array length
    const count = Math.min(images.length, MAX_IMAGES);

    for (let i = 0; i < count; i++) {
        const img = template.content.cloneNode(true).querySelector('img');
        img.src = images[i];
        img.alt = `${category} ${i + 1}`;
        gallery.appendChild(img);

        setTimeout(() => img.classList.add('visible'), i * 100); // stagger fade-in
    }
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.category-btn.active')?.classList.remove('active');
        btn.classList.add('active');
        loadImages(btn.dataset.category);
    });
});

// Initial
loadImages('all');
