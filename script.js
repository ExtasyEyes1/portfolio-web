(() => {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const themeToggle = document.querySelector('.theme-toggle');
  const backTop = document.querySelector('.back-to-top');
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.primary-nav a')];

  menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
  navLinks.forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));

  const storedMode = localStorage.getItem('fp-mode');
  if (storedMode === 'light') body.dataset.theme = 'light';
  themeToggle.setAttribute('aria-label', storedMode === 'light' ? 'Включить темную тему' : 'Включить светлую тему');
  themeToggle.addEventListener('click', () => { const light = body.dataset.theme !== 'light'; if (light) body.dataset.theme = 'light'; else delete body.dataset.theme; localStorage.setItem('fp-mode', light ? 'light' : 'dark'); themeToggle.setAttribute('aria-label', light ? 'Включить темную тему' : 'Включить светлую тему'); });

  const observer = new IntersectionObserver((entries) => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.12 });
  document.querySelectorAll('.section-reveal').forEach(section => observer.observe(section));
  const activeObserver = new IntersectionObserver((entries) => entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach(section => activeObserver.observe(section));

  window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 550), { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const form = document.querySelector('#contact-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    ['name', 'contact', 'message'].forEach(field => {
      const input = form.elements[field]; const wrapper = input.closest('.form-field'); const error = wrapper.querySelector('.error-message');
      if (!input.value.trim()) { wrapper.classList.add('invalid'); error.textContent = 'Заполните это поле'; valid = false; } else { wrapper.classList.remove('invalid'); error.textContent = ''; }
    });
    const status = form.querySelector('.form-status');
    if (valid) { window.alert('Спасибо! Сообщение заполнено и прошло проверку.'); status.textContent = ''; form.reset(); }
  });
  form.querySelectorAll('input, textarea').forEach(input => input.addEventListener('input', () => { const wrapper = input.closest('.form-field'); if (input.value.trim()) { wrapper.classList.remove('invalid'); wrapper.querySelector('.error-message').textContent = ''; } }));
})();
