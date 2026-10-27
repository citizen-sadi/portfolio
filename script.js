document.documentElement.classList.add('js');

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
  nav.classList.toggle('is-open', open);
}

if (toggle && nav) {
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
}

// Draw the fibre run once, when it scrolls into view
const fibre = document.querySelector('.fibre');
if (fibre) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { fibre.classList.add('is-live'); io.disconnect(); }
      });
    }, { threshold: 0.6 });
    io.observe(fibre);
  } else {
    fibre.classList.add('is-live');
  }
}

// Contact form: posts to the existing Google Sheets script
const scriptURL = 'https://script.google.com/macros/s/AKfycbx-OPZ1qdQ4o9DybgqP5HeTnhUDXa_kPgVG44VVohKpTK31LG_DJrdnvkqAm6y6gPk/exec';
const form = document.forms['submit-to-google-sheet'];

if (form) {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');

  const showStatus = (text, isError = false) => {
    status.textContent = text;
    status.classList.toggle('is-error', isError);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = [...form.querySelectorAll('input, textarea')];
    let firstInvalid = null;
    fields.forEach((field) => {
      const valid = field.checkValidity() && field.value.trim() !== '';
      field.setAttribute('aria-invalid', String(!valid));
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      const label = form.querySelector(`label[for="${firstInvalid.id}"]`).textContent.toLowerCase();
      showStatus(firstInvalid.type === 'email' && firstInvalid.value.trim()
        ? 'Enter a valid email address, like name@example.com.'
        : `Add ${label} before sending.`, true);
      firstInvalid.focus();
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';
    showStatus('');

    try {
      const res = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      fields.forEach((f) => f.removeAttribute('aria-invalid'));
      showStatus('Message sent. I’ll reply by email.');
    } catch (err) {
      console.error(err);
      showStatus('Your message didn’t send. Check your connection and try again, or email hassansadisu@gmail.com.', true);
    } finally {
      button.disabled = false;
      button.textContent = 'Send message';
    }
  });

  form.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity() && e.target.value.trim()) {
      e.target.setAttribute('aria-invalid', 'false');
    }
  });
}
