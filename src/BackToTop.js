export function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');

  function toggleBackToTopButton() {
    // Change 0.5 to 0.3 to make the button appear after scrolling 30% of the page height
    if (window.scrollY > document.documentElement.scrollHeight * 0.3) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', toggleBackToTopButton);
  backToTopButton.addEventListener('click', scrollToTop);
}
