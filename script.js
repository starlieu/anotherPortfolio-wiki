const MICROSOFT_FORMS_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=owEOp2muF02tbUB_Fou0Xs50xp76p7JDjd6VeGx2VCdUOEM5UVRXUERIRE1EQ1A0SDkxOFJXVFdQNi4u&embed=true";

const voteButton = document.querySelector('[data-vote-button]');
const voteStatus = document.getElementById('voteStatus');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const formsPreview = document.querySelector('.forms-preview');

function configureVoteLink() {
  const hasConfiguredLink =
    typeof MICROSOFT_FORMS_URL === 'string' &&
    MICROSOFT_FORMS_URL.trim() !== '' &&
    MICROSOFT_FORMS_URL.trim() !== 'MON_LIEN';

  const fallbackUrl = 'https://forms.office.com/';
  const targetUrl = hasConfiguredLink ? MICROSOFT_FORMS_URL.trim() : fallbackUrl;

  if (voteButton) {
    voteButton.addEventListener('click', () => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }

  if (voteStatus) {
    if (hasConfiguredLink) {
      voteStatus.textContent = 'Le bouton ouvre le formulaire officiel Microsoft Forms.';
    } else {
      voteStatus.textContent =
        'Configure le lien Microsoft Forms dans script.js pour activer le bulletin.';
    }
  }

  if (formsPreview && hasConfiguredLink) {
    formsPreview.innerHTML = `
      <div class="preview-topbar">
        <span class="preview-brand">MICROSOFT FORMS</span>
      </div>
      <iframe
        title="Formulaire de vote Microsoft Forms"
        src="${targetUrl}"
        frameborder="0"
        marginwidth="0"
        marginheight="0"
        style="border: none; width: 100%; min-height: 520px; max-width: 100%; max-height: 100vh; border-radius: 18px; background: #fff;"
        allowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
        msallowfullscreen>
      </iframe>
      <p class="preview-note">Le formulaire est intégré directement dans la page.</p>
    `;
  }
}

function setupMobileMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
  configureVoteLink();
  setupMobileMenu();
  revealOnScroll();

  const footerYear = document.getElementById('year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});

/*
  SI TU VEUX EMBARQUER MICROSOFT FORMS DIRECTEMENT :
  remplace cette zone par le code iframe fourni par Microsoft Forms.
*/
