// DAYLAN FRANK CAR WASHING - INTERACTIVE LOGIC & WHATSAPP DISPATCH

// Current State
let state = {
  quickVehicle: 'salon', // 'salon' or 'big'
  quickPackage: 'normal', // 'normal' or 'vip'
  pricingCategory: 'salon',
  modalPackage: 'VIP Wash',
  modalVehicle: 'salon',
  lang: 'en',
  mobileMenuOpen: false
};

// Pricing Configuration based on Flyer
const PRICING = {
  salon: {
    normal: 40,
    vip: 60,
    label: 'Salon / Sedan (Voitures Classiques)',
    sublabel: 'for Sedans & Hatchbacks'
  },
  big: {
    normal: 50,
    vip: 80,
    label: 'SUV / Big (Grands Véhicules)',
    sublabel: 'for SUVs, 4x4 & Large Vehicles'
  }
};

// 1. Mobile Menu Toggle
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  const icon = document.getElementById('menuIcon');
  if (!drawer) return;

  state.mobileMenuOpen = !state.mobileMenuOpen;
  if (state.mobileMenuOpen) {
    drawer.classList.remove('hidden');
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    }
  } else {
    drawer.classList.add('hidden');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  }
}

// 2. Quick Vehicle Switcher (Hero section)
function selectQuickVehicle(type) {
  state.quickVehicle = type;
  
  const salonBtn = document.getElementById('quickVehSalon');
  const bigBtn = document.getElementById('quickVehBig');
  
  if (type === 'salon') {
    salonBtn.classList.add('active');
    bigBtn.classList.remove('active');
  } else {
    bigBtn.classList.add('active');
    salonBtn.classList.remove('active');
  }
  
  document.getElementById('quickNormalPrice').innerText = `${PRICING[type].normal} AED`;
  document.getElementById('quickVipPrice').innerText = `${PRICING[type].vip} AED`;
}

function selectQuickPackage(pkg) {
  state.quickPackage = pkg;
}

// 3. Main Pricing Section Category Switcher
function setPricingCategory(type) {
  state.pricingCategory = type;
  
  const tabSalon = document.getElementById('pricingTabSalon');
  const tabBig = document.getElementById('pricingTabBig');
  
  if (type === 'salon') {
    tabSalon.classList.add('active');
    tabBig.classList.remove('active');
  } else {
    tabBig.classList.add('active');
    tabSalon.classList.remove('active');
  }
  
  document.getElementById('displayNormalPrice').innerText = PRICING[type].normal;
  document.getElementById('displayVipPrice').innerText = PRICING[type].vip;
  document.getElementById('displayNormalVehicleLabel').innerText = PRICING[type].sublabel;
  document.getElementById('displayVipVehicleLabel').innerText = PRICING[type].sublabel;
}

// 4. WhatsApp Quick Booking Dispatch
function sendQuickBooking() {
  const vehicle = PRICING[state.quickVehicle].label;
  const pkgName = state.quickPackage === 'normal' ? 'Normal Wash' : 'VIP Wash (Seats & Carpet Detailing)';
  const price = state.quickPackage === 'normal' ? PRICING[state.quickVehicle].normal : PRICING[state.quickVehicle].vip;
  const area = document.getElementById('quickArea').value;
  const phone = document.getElementById('quickPhone').value.trim();

  let message = `🚗 *NEW DOORSTEP BOOKING - DAYLAN FRANK CAR WASHING*\n\n`;
  message += `• *Service:* ${pkgName}\n`;
  message += `• *Vehicle Type:* ${vehicle}\n`;
  message += `• *Price:* ${price} AED\n`;
  message += `• *Abu Dhabi Area:* ${area}\n`;
  if (phone) {
    message += `• *Customer Phone:* ${phone}\n`;
  }
  message += `\n📍 *Please confirm technician availability & ETA to my location!*`;

  const waUrl = `https://wa.me/971556439886?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// 5. Modal Booking Logic
function openBookingModal(pkgName) {
  state.modalPackage = pkgName;
  document.getElementById('modalSelectedPackage').innerText = `Selected: ${pkgName}`;
  updateModalPrice();
  document.getElementById('bookingModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function updateModalPrice() {
  const veh = document.getElementById('modalVehicleCategory').value;
  state.modalVehicle = veh;
  const isVip = state.modalPackage.includes('VIP');
  const price = isVip ? PRICING[veh].vip : PRICING[veh].normal;
  document.getElementById('modalPriceTag').innerText = `${price} AED`;
}

function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();
  const veh = document.getElementById('modalVehicleCategory').value;
  const location = document.getElementById('modalLocation').value.trim();
  const time = document.getElementById('modalTime').value;
  
  const isVip = state.modalPackage.includes('VIP');
  const price = isVip ? PRICING[veh].vip : PRICING[veh].normal;
  const vehLabel = PRICING[veh].label;

  let message = `🚗 *DAYLAN FRANK CAR WASHING - DOORSTEP BOOKING*\n\n`;
  message += `• *Customer Name:* ${name}\n`;
  message += `• *Phone / WhatsApp:* ${phone}\n`;
  message += `• *Package:* ${state.modalPackage}\n`;
  message += `• *Vehicle:* ${vehLabel}\n`;
  message += `• *Price:* ${price} AED\n`;
  message += `• *Location / Villa / Tower:* ${location}\n`;
  message += `• *Preferred Time:* ${time}\n\n`;
  message += `📍 *Hello! I submitted this doorstep booking via your website. Please confirm my appointment.*`;

  closeBookingModal();
  const waUrl = `https://wa.me/971556439886?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// 6. Flyer Modal Logic
function openFlyerModal() {
  document.getElementById('flyerModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeFlyerModal() {
  document.getElementById('flyerModal').classList.add('hidden');
  document.body.style.overflow = '';
}

// 7. Interactive Before / After Slider
function initBeforeAfterSlider() {
  const slider = document.getElementById('baSlider');
  const beforeImg = document.getElementById('baBefore');
  const handle = document.getElementById('baHandle');

  if (!slider || !beforeImg || !handle) return;

  let isDragging = false;

  function updateSlider(x) {
    const rect = slider.getBoundingClientRect();
    let posX = x - rect.left;
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    const percentage = (posX / rect.width) * 100;
    beforeImg.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  handle.addEventListener('mousedown', () => isDragging = true);
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch Events for Mobile & Tablets
  handle.addEventListener('touchstart', () => isDragging = true, { passive: true });
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  }, { passive: true });
}

// 8. FAQ Accordion Logic
function toggleFaq(id) {
  const content = document.getElementById(`faqContent${id}`);
  const icon = document.getElementById(`faqIcon${id}`);

  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    content.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
}

// 9. Language Switcher Toggle
const langBtn = document.getElementById('langToggleBtn');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    if (state.lang === 'en') {
      state.lang = 'fr';
      document.getElementById('currentLang').innerText = 'FR / EN';
      showToast('Langue changée: Français');
    } else {
      state.lang = 'en';
      document.getElementById('currentLang').innerText = 'EN / FR';
      showToast('Language changed: English');
    }
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-16 right-4 sm:right-6 z-50 bg-gold-500 text-navy-950 font-bold px-3.5 py-2 rounded-xl shadow-2xl text-xs flex items-center gap-1.5 animate-bounce';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// 10. Close modals on escape key or outside click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
    closeFlyerModal();
  }
});

const bookingModal = document.getElementById('bookingModal');
if (bookingModal) {
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });
}

const flyerModal = document.getElementById('flyerModal');
if (flyerModal) {
  flyerModal.addEventListener('click', (e) => {
    if (e.target === flyerModal) {
      closeFlyerModal();
    }
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSlider();
  console.log('DAYLAN Frank Car Washing Website loaded successfully.');
});
