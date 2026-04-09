/* ────────────────────────────────────────────
   EmailJS Configuration
   Replace these values with your own keys.
──────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'TuQX3-yMeIyCxSZcq';
const EMAILJS_SERVICE_ID  = 'service_4lrqlek';
const EMAILJS_TEMPLATE_ID = 'template_e9t2ge8';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

/* ── Contact Form Handler ── */
async function handleContact() {
  const nameEl    = document.getElementById('cf-name');
  const emailEl   = document.getElementById('cf-email');
  const subjectEl = document.getElementById('cf-subject');
  const msgEl     = document.getElementById('cf-message');
  const statusEl  = document.getElementById('form-status');
  const sendBtn   = document.getElementById('send-btn');

  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const subject = subjectEl.value.trim();
  const message = msgEl.value.trim();

  statusEl.className = 'form-status';
  statusEl.textContent = '';

  if (!name || !email || !message) {
    statusEl.className = 'form-status error';
    statusEl.textContent = 'Please fill in Name, Email, and Message.';
    return;
  }
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    statusEl.className = 'form-status error';
    statusEl.textContent = 'Please enter a valid email address.';
    return;
  }

  sendBtn.textContent = 'Sending…';
  sendBtn.classList.add('loading');

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      subject:    subject || '(No subject)',
      message:    message,
      reply_to:   email
    });
    statusEl.className = 'form-status success';
    statusEl.textContent = '✓ Message sent! I\'ll get back to you soon.';
    [nameEl, emailEl, subjectEl, msgEl].forEach(el => el.value = '');
  } catch (err) {
    statusEl.className = 'form-status error';
    statusEl.textContent = 'Something went wrong. Please email me directly.';
    console.error('EmailJS error:', err);
  } finally {
    sendBtn.textContent = 'Send Message →';
    sendBtn.classList.remove('loading');
  }
}

/* ── Scroll Reveal + Progress Bars ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.skill-fill, .lang-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* Run on load for elements already in view */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
      el.querySelectorAll('.skill-fill, .lang-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
});

/* ── Smooth Scroll Nav ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── Active Nav Highlight ── */
const sections = document.querySelectorAll('section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});
