// Dynamische Navigation & Effekte für die Hochzeitswebsite

// Basisdomain für externe Links
const baseDomain = "https://unser-liebesfest.ch";

// Dynamische Links generieren
document.querySelectorAll('nav a[data-section]').forEach(link => {
    const section = link.getAttribute('data-section');
    link.href = `${baseDomain}/${section}`;

    // Externe Links im neuen Tab öffnen (außer Home & Kontakt)
    if (section !== 'home' && section !== 'kontakt') {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Sanftes Scrollen für interne Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamische Slideshow
const slideshowImages = [
    "Pictures/Tanz1.JPG",
    "Pictures/Tanz2.JPG",
    "Pictures/Tanz3.JPG",
    "Pictures/Tanz4.JPG",
    "Pictures/Tanz5.JPG",
    "Pictures/Tanz6.JPG",
    "Pictures/Tanz7.JPG",
    "Pictures/Tanz8.JPG",
    "Pictures/Tanz9.JPG"
];

let currentImageIndex = 0;
const slideshowElement = document.getElementById("slideshow");

if (slideshowElement) {
    function changeImage() {
        // Bild ausblenden
        slideshowElement.style.opacity = 0;

        // Nach 1 Sekunde neues Bild setzen
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
            slideshowElement.src = slideshowImages[currentImageIndex];
            // Bild wieder einblenden
            slideshowElement.style.opacity = 1;
        }, 1200);
    }

    // Alle 3 Sekunden wechseln (langsamer & sanfter)
    setInterval(changeImage, 2500);
}

// Countdown zur Hochzeit
const countdownElement = document.getElementById("countdown");

// Ziel-Datum (26. Juni 2026, 15:45 Uhr)
const targetDate = new Date("June 26, 2026 15:45:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdownElement.textContent = "Heute ist unser großer Tag!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `
    Noch ${days} Tage, ${hours} Std, ${minutes} Min und ${seconds} Sek!
  `;
}

// Alle 1 Sekunde aktualisieren
setInterval(updateCountdown, 1000);
updateCountdown();

// ====== ROOMS & APARTMENTS ======
const ROOM_CATEGORIES = [
  {
    id: "villa-porta-plus-room",
    hotel: "Villa Porta",
    type: "Doppelzimmer (Plus Room)",
    priceFlex: 399,
    priceNonRef: 359,
    currency: "€",
    per: "Nacht (Frühstück inkl.)",
    capacity: "1–2 Erw.",
    count: 4,
    dates: "nach Absprache",
    notes: "Babybett möglich (bis 4 J., gratis)"
  },
  {
    id: "villa-porta-superior-room",
    hotel: "Villa Porta",
    type: "Superior Room",
    priceFlex: 409,
    priceNonRef: 369,
    currency: "€",
    per: "Nacht (Frühstück inkl.)",
    capacity: "1–2 Erw.",
    count: 1,
    dates: "nach Absprache",
    notes: "Babybett möglich (bis 4 J., gratis)"
  },
  {
    id: "villa-porta-emotion-room",
    hotel: "Villa Porta",
    type: "Emotion Room",
    priceFlex: 437,
    priceNonRef: 394,
    currency: "€",
    per: "Nacht (Frühstück inkl.)",
    capacity: "1–2 Erw.",
    count: 1,
    dates: "nach Absprache",
    notes: "Babybett möglich (bis 4 J., gratis)"
  },
  {
    id: "villa-porta-junior-suite",
    hotel: "Villa Porta",
    type: "Junior Suite",
    priceFlex: 549,
    priceNonRef: 494,
    currency: "€",
    per: "Nacht (Frühstück inkl.)",
    capacity: "1–2 Erw. (bis max. 4 Personen mit Aufpreis)",
    count: 1,
    dates: "nach Absprache",
    notes: "Babybett möglich (bis 4 J., gratis)"
  },
  {
    id: "villa-porta-junior-suite-balkon",
    hotel: "Villa Porta",
    type: "Junior Suite mit Balkon",
    priceFlex: 599,
    priceNonRef: 544,
    currency: "€",
    per: "Nacht (Frühstück inkl.)",
    capacity: "1–2 Erw. (bis max. 4 Personen mit Aufpreis)",
    count: 1,
    dates: "nach Absprache",
    notes: "Babybett möglich (bis 4 J., gratis)"
  },
];

function renderRoomsGrid(categories = ROOM_CATEGORIES) {
  const grid = document.getElementById("roomsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  categories.forEach(category => {
    const priceInfo = typeof category.priceNonRef === "number"
      ? `${category.currency} ${category.priceFlex} (Flex) / ${category.currency} ${category.priceNonRef} (Non-Refund)`
      : `${category.currency} ${category.priceFlex}`;

    const card = document.createElement("article");
    card.className = "room-card";
    card.dataset.roomId = category.id;
    card.innerHTML = `
      <h3>${category.hotel}</h3>
      <p><strong>${category.type}</strong></p>
      <p class="rates">${priceInfo} / ${category.per}</p>
      <p><strong>Belegung:</strong> ${category.capacity}</p>
      <p><strong>Zeitraum:</strong> ${category.dates}</p>
      <p class="small">${category.notes || ""}</p>
    `;
    grid.appendChild(card);
  });
}

function buildRoomOptions(categories = ROOM_CATEGORIES) {
  return categories.map(category => ({
    value: category.id,
    label: category.hotel + " - " + category.type
  }));
}

function populateRoomSelect(selectEl, options) {
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Bitte auswählen …";
  placeholder.disabled = true;
  placeholder.selected = true;
  selectEl.appendChild(placeholder);

  options.forEach(optionData => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.label;
    selectEl.appendChild(option);
  });
}

function updateRoomHighlights(selects) {
  const selectedIds = new Set(
    selects
      .filter(select => select && !select.disabled)
      .map(select => select.value)
      .filter(Boolean)
  );

  document.querySelectorAll(".room-card").forEach(card => {
    card.classList.toggle("is-selected", selectedIds.has(card.dataset.roomId));
  });
}

function attachRoomCardInteractions(selects) {
  const cards = document.querySelectorAll(".room-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (selects.every(select => select.disabled)) return;

      const roomId = card.dataset.roomId;
      const alreadyChosen = selects.some(select => !select.disabled && select.value === roomId);
      if (alreadyChosen) {
        updateRoomHighlights(selects);
        return;
      }

      const target = selects.find(select => !select.disabled && !select.value);
      if (!target) return;

      target.value = roomId;
      target.dispatchEvent(new Event("change"));
      target.focus();
    });
  });
}

function initRoomSelects() {
  const selectIds = ["prio1", "prio2", "prio3"];
  const selects = selectIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (selects.length !== selectIds.length) return;

  const options = buildRoomOptions();
  selects.forEach((select, index) => {
    select.innerHTML = "";
    populateRoomSelect(select, options);
    if (index >= 1) {
      const selfManagedOption = document.createElement("option");
      selfManagedOption.value = "__SELF_MANAGED__";
      selfManagedOption.textContent = "Ich kümmere mich selbst (kein Zimmer nötig)";
      select.appendChild(selfManagedOption);
    }
  });

  attachRoomCardInteractions(selects);

  const selfArranged = document.getElementById("selfArranged");
  const syncHighlights = () => updateRoomHighlights(selects);

  selects.forEach(select => {
    select.addEventListener("change", syncHighlights);
  });

  const applyToggle = () => {
    const disabled = !!(selfArranged && selfArranged.checked);
    selects.forEach(select => {
      select.disabled = disabled;
      if (disabled) {
        select.selectedIndex = 0;
      }
    });
    syncHighlights();
  };

  if (selfArranged) {
    selfArranged.addEventListener("change", applyToggle);
  }

  const form = document.getElementById("anmeldeFormular");
  if (form) {
    form.addEventListener("reset", () => {
      setTimeout(applyToggle, 0);
    });
  }

  applyToggle();
}

// ====== Kinder-Altersfelder dynamisch ======
function initKidsAges() {
  const countInput = document.getElementById('kidsCount');
  const container = document.getElementById('kidsAgesContainer');
  if (!countInput || !container) return;

  const rebuild = () => {
    const n = Math.max(0, Math.min(10, Number(countInput.value) || 0));
    container.innerHTML = "";
    for (let i = 1; i <= n; i++) {
      const wrap = document.createElement('div');
      const label = document.createElement('label');
      label.setAttribute('for', `kidAge${i}`);
      label.textContent = `Alter Kind ${i} (Stand Aug. 26):`;

      const input = document.createElement('input');
      input.type = 'number';
      input.id = `kidAge${i}`;
      input.name = `kidAge${i}`;
      input.min = '0';
      input.max = '17';
      input.step = '1';
      input.required = true;

      wrap.appendChild(label);
      wrap.appendChild(document.createElement('br'));
      wrap.appendChild(input);
      container.appendChild(wrap);
    }
  };

  countInput.addEventListener('input', rebuild);
  rebuild(); // Initialer Aufbau (z.B. 0)
}

// ====== Init alles nach DOM-Load ======
document.addEventListener('DOMContentLoaded', () => {
  renderRoomsGrid();
  initRoomSelects();
  initKidsAges();
});

