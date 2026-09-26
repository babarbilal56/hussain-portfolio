/**
 * Muhammad Hussain - Portfolio Interactive Logic
 * Includes ROAS & Unit Economics Calculator, UTM Campaign Builder,
 * Copy-to-Clipboard handlers, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAccountsFilter();
  initRoasCalculator();
  initUtmBuilder();
  initCopyActions();
  initContactForm();
  initTabSwitching();
});

/* ==========================================================================
   Managed Accounts Real-Time Filter & Search
   ========================================================================== */
function initAccountsFilter() {
  const searchInput = document.getElementById('accountSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const filterPills = document.querySelectorAll('.category-filter-pills .filter-pill');
  const accountCards = document.querySelectorAll('#accountsGrid .account-card');
  const countDisplay = document.getElementById('accountCount');

  if (!accountCards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function filterAccounts() {
    let visibleCount = 0;

    accountCards.forEach(card => {
      const cardCategory = card.dataset.category || '';
      const cardText = (card.textContent || '').toLowerCase();

      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesSearch = (!searchQuery || cardText.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countDisplay) {
      countDisplay.textContent = visibleCount;
    }

    if (clearBtn) {
      clearBtn.style.display = searchQuery ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterAccounts();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      filterAccounts();
      searchInput.focus();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.filter;
      filterAccounts();
    });
  });
}

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section indicator on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   PPC & ROAS Calculator
   ========================================================================== */
function initRoasCalculator() {
  const spendInput = document.getElementById('adSpendInput');
  const cpcInput = document.getElementById('cpcInput');
  const cvrInput = document.getElementById('cvrInput');
  const aovInput = document.getElementById('aovInput');

  const spendDisplay = document.getElementById('adSpendDisplay');
  const cpcDisplay = document.getElementById('cpcDisplay');
  const cvrDisplay = document.getElementById('cvrDisplay');
  const aovDisplay = document.getElementById('aovDisplay');

  const resultRoas = document.getElementById('resultRoas');
  const resultCpa = document.getElementById('resultCpa');
  const resultClicks = document.getElementById('resultClicks');
  const resultConversions = document.getElementById('resultConversions');
  const resultRevenue = document.getElementById('resultRevenue');
  const resultProfit = document.getElementById('resultProfit');
  const roasStatusBadge = document.getElementById('roasStatusBadge');
  const insightMultiplier = document.getElementById('insightMultiplier');

  if (!spendInput || !cpcInput || !cvrInput || !aovInput) return;

  function calculate() {
    const spend = parseFloat(spendInput.value);
    const cpc = parseFloat(cpcInput.value);
    const cvr = parseFloat(cvrInput.value) / 100;
    const aov = parseFloat(aovInput.value);

    // Update displays
    spendDisplay.textContent = `$${spend.toLocaleString()}`;
    cpcDisplay.textContent = `$${cpc.toFixed(2)}`;
    cvrDisplay.textContent = `${(cvr * 100).toFixed(1)}%`;
    aovDisplay.textContent = `$${aov.toLocaleString()}`;

    // Core Metrics
    const clicks = Math.round(spend / cpc);
    const conversions = Math.round(clicks * cvr);
    const revenue = Math.round(conversions * aov);
    const roas = spend > 0 ? (revenue / spend) : 0;
    const cpa = conversions > 0 ? (spend / conversions) : 0;
    const profit = revenue - spend;

    // Display formatted results
    resultClicks.textContent = clicks.toLocaleString();
    resultConversions.textContent = conversions.toLocaleString();
    resultCpa.textContent = `$${cpa.toFixed(2)}`;
    resultRevenue.textContent = `$${revenue.toLocaleString()}`;
    resultRoas.textContent = `${roas.toFixed(2)}x`;

    if (insightMultiplier) {
      insightMultiplier.textContent = `$${roas.toFixed(2)}`;
    }

    if (profit >= 0) {
      resultProfit.textContent = `+$${profit.toLocaleString()}`;
      resultProfit.className = 'kpi-value text-green';
    } else {
      resultProfit.textContent = `-$${Math.abs(profit).toLocaleString()}`;
      resultProfit.className = 'kpi-value text-muted';
    }

    // Status Badge & Insight
    if (roas >= 4.0) {
      roasStatusBadge.textContent = '🚀 High Performance (Scale)';
      roasStatusBadge.style.color = '#10b981';
      roasStatusBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      roasStatusBadge.style.background = 'rgba(16, 185, 129, 0.15)';
    } else if (roas >= 2.5) {
      roasStatusBadge.textContent = '✅ Solid Profitability';
      roasStatusBadge.style.color = '#00f2fe';
      roasStatusBadge.style.borderColor = 'rgba(0, 242, 254, 0.4)';
      roasStatusBadge.style.background = 'rgba(0, 242, 254, 0.12)';
    } else if (roas >= 1.5) {
      roasStatusBadge.textContent = '⚡ Modest Margin (Optimize CVR)';
      roasStatusBadge.style.color = '#f59e0b';
      roasStatusBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
      roasStatusBadge.style.background = 'rgba(245, 158, 11, 0.12)';
    } else {
      roasStatusBadge.textContent = '⚠️ Needs CPA Optimization';
      roasStatusBadge.style.color = '#f87171';
      roasStatusBadge.style.borderColor = 'rgba(248, 113, 113, 0.4)';
      roasStatusBadge.style.background = 'rgba(248, 113, 113, 0.12)';
    }
  }

  // Event Listeners for Sliders
  [spendInput, cpcInput, cvrInput, aovInput].forEach(slider => {
    slider.addEventListener('input', calculate);
  });

  // Preset Buttons
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      spendInput.value = btn.dataset.spend;
      cpcInput.value = btn.dataset.cpc;
      cvrInput.value = btn.dataset.cvr;
      aovInput.value = btn.dataset.aov;
      calculate();
      showToast(`Loaded "${btn.textContent}" preset scenario`);
    });
  });

  // Run initial calculation
  calculate();
}

/* ==========================================================================
   UTM Campaign Tag Builder
   ========================================================================== */
function initUtmBuilder() {
  const urlInput = document.getElementById('utmUrl');
  const sourceInput = document.getElementById('utmSource');
  const mediumInput = document.getElementById('utmMedium');
  const campaignInput = document.getElementById('utmCampaign');
  const contentInput = document.getElementById('utmContent');
  const termInput = document.getElementById('utmTerm');
  const finalCode = document.getElementById('utmFinalUrl');
  const copyUtmBtn = document.getElementById('copyUtmBtn');

  if (!urlInput || !finalCode) return;

  function updateUtmUrl() {
    let base = urlInput.value.trim();
    if (!base) base = 'https://example.com';
    if (!/^https?:\/\//i.test(base)) {
      base = 'https://' + base;
    }

    try {
      const url = new URL(base);
      if (sourceInput.value.trim()) url.searchParams.set('utm_source', sourceInput.value.trim());
      if (mediumInput.value.trim()) url.searchParams.set('utm_medium', mediumInput.value.trim());
      if (campaignInput.value.trim()) url.searchParams.set('utm_campaign', campaignInput.value.trim());
      if (contentInput.value.trim()) url.searchParams.set('utm_content', contentInput.value.trim());
      if (termInput.value.trim()) url.searchParams.set('utm_term', termInput.value.trim());

      finalCode.textContent = url.toString();
    } catch {
      finalCode.textContent = `${base}?utm_source=${sourceInput.value}&utm_medium=${mediumInput.value}&utm_campaign=${campaignInput.value}`;
    }
  }

  [urlInput, sourceInput, mediumInput, campaignInput, contentInput, termInput].forEach(field => {
    field.addEventListener('input', updateUtmUrl);
    field.addEventListener('change', updateUtmUrl);
  });

  if (copyUtmBtn) {
    copyUtmBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(finalCode.textContent).then(() => {
        showToast('UTM Tracking URL copied to clipboard!');
      }).catch(() => {
        showToast('Tracking URL ready to copy');
      });
    });
  }

  updateUtmUrl();
}

/* ==========================================================================
   Tab Switching (ROAS vs UTM Builder)
   ========================================================================== */
function initTabSwitching() {
  const tabButtons = document.querySelectorAll('.calc-tab-btn');
  const tabContents = document.querySelectorAll('.calc-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.add('active');
    });
  });
}

/* ==========================================================================
   Copy Actions (Email, Phone)
   ========================================================================== */
function initCopyActions() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }
}

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const company = document.getElementById('senderCompany').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    const subject = encodeURIComponent(`PPC Expert Inquiry - ${company ? company + ' (' + name + ')' : name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`);

    // Compose mailto
    const mailtoUrl = `mailto:emirates.hussain67345@gmail.com?subject=${subject}&body=${body}`;

    // Display status
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.className = 'form-status success';
      statusEl.innerHTML = `✓ Thank you, <strong>${name}</strong>! Opening your email client to dispatch message to <strong>emirates.hussain67345@gmail.com</strong>.`;
    }

    showToast('Dispatching your email inquiry...');
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 700);
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}
