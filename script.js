
// Helper: safely get an element
const $ = (sel) => document.querySelector(sel);

// Task A: Theme toggle (toggle .dark-mode on <body> and remember choice)
(() => {
  const btn = $('#themeBtn');
  if (!btn) return;

  // restore saved theme
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark-mode');

  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // persist preference
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
})();

// Task B: Edit Job Title (prompt + update textContent)
(() => {
  const btn = $('#editJobBtn');
  const jobEl = document.querySelector('.job-title');
  if (!btn || !jobEl) return;

  btn.addEventListener('click', () => {
    const current = jobEl.textContent.trim();
    const next = prompt('Enter your new job title:', current);
    if (next !== null) {
      const cleaned = next.trim();
      if (cleaned.length > 0) jobEl.textContent = cleaned;
      else alert('Job title cannot be empty.');
    }
  });
})();

// Task C: Show/Hide Skills (toggle visibility + button label)
(() => {
  const btn = $('#toggleSkillsBtn');
  const section = $('#skillsSection');
  if (!btn || !section) return;

  btn.addEventListener('click', () => {
    const hidden = section.hasAttribute('hidden');
    if (hidden) {
      section.removeAttribute('hidden');
      btn.textContent = 'Hide Skills';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      section.setAttribute('hidden', '');
      btn.textContent = 'Show Skills';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Task D: Live Character Counter (200 max)
(() => {
  const textarea = $('#msgBox');
  const counter = $('#counter');
  if (!textarea || !counter) return;

  const max = parseInt(textarea.getAttribute('maxlength') || '200', 10);
  const update = () => {
    const remaining = max - textarea.value.length;
    counter.textContent = String(remaining);
  };
  textarea.addEventListener('keyup', update);
  textarea.addEventListener('input', update);
  update(); // initialize on load
})();

// Task E: Basic Form Validation (Name + Email not empty)
// The submit button calls validateForm() inline per instructions.
// We attach the function to window so it's visible to inline onclick.
window.validateForm = function () {
  const nameField = $('#nameField');
  const emailField = $('#emailField');
  if (!nameField || !emailField) return true; // nothing to validate

  const nameOk = nameField.value.trim().length > 0;
  const emailOk = emailField.value.trim().length > 0;

  if (!nameOk || !emailOk) {
    alert('Please fill out both Name and Email before sending.');
    return false; // block submission
  }
  // Allow submission (if your instructor doesn't want navigation, just return true)
  alert('Thanks! Your message was validated (demo).');
  return true;
};

// Task F: Display today’s date in footer
(() => {
  const el = $('#dateDisplay');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
})();

// Task G: Extra feature — Live Skills Search (filters <dd> items while typing)
(() => {
  const input = $('#skillsSearch');
  const skillsSection = $('#skillsSection');
  if (!input || !skillsSection) return;

  const items = skillsSection.querySelectorAll('dd');
  const filter = () => {
    const q = input.value.trim().toLowerCase();
    items.forEach(dd => {
      const match = dd.textContent.toLowerCase().includes(q);
      dd.style.display = match ? '' : 'none';
    });
  };

  input.addEventListener('keyup', filter);
  input.addEventListener('input', filter);
})();
