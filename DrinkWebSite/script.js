const revealItems = document.querySelectorAll('.reveal');
const faqButtons = document.querySelectorAll('.faq-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

revealItems.forEach((item) => revealObserver.observe(item));

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    const isExpanded = button.classList.contains('is-open');

    faqButtons.forEach((otherButton) => {
      otherButton.classList.remove('is-open');
      otherButton.setAttribute('aria-expanded', 'false');
      const otherPanel = otherButton.nextElementSibling;
      if (otherPanel && otherPanel.classList.contains('faq-panel')) {
        otherPanel.classList.remove('is-open');
      }
    });

    if (!isExpanded) {
      button.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      if (panel && panel.classList.contains('faq-panel')) {
        panel.classList.add('is-open');
      }
    }
  });
});
