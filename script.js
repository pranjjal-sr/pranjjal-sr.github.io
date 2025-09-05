window.addEventListener('load', () => {
  const images = document.querySelectorAll('.plant-container img');
  let loaded = 0;
  const total = images.length;

  images.forEach(img => {
    if (img.complete) {
      loaded++;
      if (loaded === total) showContent();
    } else {
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === total) showContent();
      };
    }
  });
});

function showContent() {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');

  loader.style.transition = 'opacity 0.5s ease';
  loader.style.opacity = '0';

  setTimeout(() => {
    loader.style.display = 'none';
    content.style.display = 'block';

    setTimeout(() => {
      content.style.opacity = '1';
      animateLeaves();
    }, 100);
  }, 500);
}

function animateLeaves() {
  const leaves = document.querySelectorAll('.plant .leaf');

  leaves.forEach((leaf, index) => {
    setTimeout(() => {
      leaf.style.animation = `leaf-grow 1s ease-out forwards`;
      leaf.style.animationDelay = `${index * 0.4}s`;
    }, 100);
  });
}
