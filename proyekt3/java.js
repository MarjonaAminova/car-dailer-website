// ---------- Side drawer ----------
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const drawerBg = document.getElementById("drawerBg");
const drawerClose = document.getElementById("drawerClose");

function toggleDrawer(open) {
    drawer.classList.toggle("open", open);
    drawerBg.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
}

menuBtn.addEventListener("click", () => toggleDrawer(true));
drawerClose.addEventListener("click", () => toggleDrawer(false));
drawerBg.addEventListener("click", () => toggleDrawer(false));
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleDrawer(false);
});

// ---------- Tabs (All / New / Used) ----------
const tabs = document.querySelectorAll(".tab");
let activeType = "all";

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeType = tab.dataset.type;
    });
});

// ---------- Make -> Model ----------
const models = {
    audi: ["A3", "A4", "A6", "Q5", "Q7", "e-tron GT"],
    bmw: ["3 Series", "5 Series", "X3", "X5", "i4"],
    chevrolet: ["Cobalt", "Malibu", "Tahoe", "Equinox"],
    mercedes: ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
};

const makeSel = document.getElementById("make");
const modelSel = document.getElementById("model");
const priceSel = document.getElementById("price");

makeSel.addEventListener("change", () => {
    modelSel.innerHTML = '<option value="">Any Models</option>';
    (models[makeSel.value] || []).forEach((m) => {
        const opt = document.createElement("option");
        opt.value = m.toLowerCase().replace(/\s+/g, "-");
        opt.textContent = m;
        modelSel.appendChild(opt);
    });
});

// ---------- Categories ----------
const cats = document.querySelectorAll(".cat");
let activeCat = "";

cats.forEach((cat) => {
    cat.addEventListener("click", () => {
        const same = cat.classList.contains("active");
        cats.forEach((c) => c.classList.remove("active"));
        if (!same) {
            cat.classList.add("active");
            activeCat = cat.dataset.cat;
        } else {
            activeCat = "";
        }
    });
});

// ---------- Search ----------
const form = document.getElementById("searchForm");
const resultMsg = document.getElementById("resultMsg");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (activeType !== "all") params.set("type", activeType);
    if (makeSel.value) params.set("make", makeSel.value);
    if (modelSel.value) params.set("model", modelSel.value);
    if (priceSel.value) params.set("price", priceSel.value);
    if (activeCat) params.set("body", activeCat);

    const query = params.toString();
    resultMsg.textContent = query
        ? "Qidiruv: " + query.replace(/&/g, "  |  ").replace(/=/g, ": ")
        : "Barcha e'lonlar ko'rsatiladi";

    // Listings sahifangiz tayyor bo'lganda quyidagini yoqing:
    // window.location.href = "listings.html?" + query;
});



// =========================================================
// MA'LUMOTLAR (mashinalar)
// =========================================================
const cars = [
    { title: "Toyota Camry New", make: "toyota", desc: "3.5 D5 PowerPulse Momentum 5dr AW...", miles: "20 Miles", fuel: "Petrol", trans: "Automatic", price: 40000, img: "img/car1.jpg", badge: "Great Price", badgeType: "green" },
    { title: "T-Cross – 2023", make: "audi", desc: "4.0 D5 PowerPulse Momentum 5dr AW...", miles: "15 Miles", fuel: "Petrol", trans: "CVT", price: 15000, img: "img/car2.jpg" },
    { title: "C-Class – 2023", make: "mercedes", desc: "4.0 D5 PowerPulse Momentum 5dr AW...", miles: "50 Miles", fuel: "Petrol", trans: "Automatic", price: 150000, img: "img/car3.jpg" },
    { title: "Ford Transit – 2021", make: "ford", desc: "4.0 D5 PowerPulse Momentum 5dr AW...", miles: "2500 Miles", fuel: "Diesel", trans: "Manual", price: 22000, img: "img/car4.jpg", badge: "Great Price", badgeType: "green" },
    { title: "New GLC – 2023", make: "mercedes", desc: "4.0 D5 PowerPulse Momentum 5dr AW...", miles: "50 Miles", fuel: "Petrol", trans: "Automatic", price: 95000, img: "img/car5.jpg", badge: "Low Mileage", badgeType: "blue" },
    { title: "Audi A6 3.5 – New", make: "audi", desc: "3.5 D5 PowerPulse Momentum 5dr AW...", miles: "100 Miles", fuel: "Petrol", trans: "Automatic", price: 58000, img: "img/car6.jpg" },
    { title: "Corolla Altis – 2023", make: "toyota", desc: "3.5 D5 PowerPulse Momentum 5dr AW...", miles: "15000 Miles", fuel: "Petrol", trans: "CVT", price: 45000, img: "img/car7.jpg" },
    { title: "Ford Explorer 2023", make: "ford", desc: "3.5 D5 PowerPulse Momentum 5dr AW...", miles: "10 Miles", fuel: "Diesel", trans: "CVT", price: 35000, img: "img/car8.jpg", badge: "Great Price", badgeType: "green" },
];

function carCard(c) {
    return `
    <article class="car-card">
      <div class="car-img">
        <img src="${c.img}" alt="${c.title}" loading="lazy">
        ${c.badge ? `<span class="badge ${c.badgeType === "blue" ? "blue" : ""}">${c.badge}</span>` : ""}
        <button class="save-btn" aria-label="Save"><i class="fa-regular fa-bookmark"></i></button>
      </div>
      <div class="car-body">
        <h3>${c.title}</h3>
        <p class="car-desc">${c.desc}</p>
        <ul class="specs">
          <li><i class="fa-solid fa-gauge-high"></i>${c.miles}</li>
          <li><i class="fa-solid fa-gas-pump"></i>${c.fuel}</li>
          <li><i class="fa-solid fa-sliders"></i>${c.trans}</li>
        </ul>
        <div class="car-foot">
          <strong>$${c.price.toLocaleString("en-US")}</strong>
          <a href="#" class="view">View Details <i class="fa-solid fa-arrow-up arr"></i></a>
        </div>
      </div>
    </article>`;
}

function renderCars(el, list) {
    el.innerHTML = list.map(carCard).join("");
}

// =========================================================
// SUV kartalar
// =========================================================
renderCars(document.getElementById("suvGrid"), cars);

// =========================================================
// Saqlash (bookmark) tugmasi
// =========================================================
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".save-btn");
    if (!btn) return;
    btn.classList.toggle("saved");
    const icon = btn.querySelector("i");
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
});

// =========================================================
// Popular Makes: tablar + slider
// =========================================================
const slider = document.getElementById("makeSlider");
const makeTabs = document.querySelectorAll(".mk-tab");

function renderMakes(make) {
    const list = make === "all" ? cars : cars.filter((c) => c.make === make);
    renderCars(slider, list);
    slider.scrollTo({ left: 0, behavior: "auto" });
}
renderMakes("all");

makeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        makeTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderMakes(tab.dataset.make);
    });
});

function slideBy(dir) {
    const card = slider.querySelector(".car-card");
    if (!card) return;
    slider.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
}
document.getElementById("mkPrev").addEventListener("click", () => slideBy(-1));
document.getElementById("mkNext").addEventListener("click", () => slideBy(1));

// =========================================================
// Mijozlar fikrlari
// =========================================================
const reviews = [
    {
        name: "Ali TUFAN", role: "Designer", img: "img/avatar1.jpg",
        text: "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team."
    },
    {
        name: "Sarah JOHNSON", role: "Marketing Manager", img: "img/avatar2.jpg",
        text: "The whole buying process was fast and transparent. They found me the perfect car within my budget in just two days."
    },
    {
        name: "David MILLER", role: "Engineer", img: "img/avatar3.jpg",
        text: "Excellent finance options and a very friendly team. I would definitely recommend CarHut to anyone looking for a reliable car."
    },
];

const review = document.getElementById("review");
const rvName = document.getElementById("rvName");
const rvRole = document.getElementById("rvRole");
const rvText = document.getElementById("rvText");
const avatars = document.getElementById("avatars");
let rvIndex = 0;

avatars.innerHTML = reviews
    .map((r, i) => `<button data-i="${i}" aria-label="${r.name}"><img src="${r.img}" alt="${r.name}"></button>`)
    .join("");

function showReview(i) {
    rvIndex = (i + reviews.length) % reviews.length;
    review.classList.add("fade");
    setTimeout(() => {
        const r = reviews[rvIndex];
        rvName.textContent = r.name;
        rvRole.textContent = r.role;
        rvText.textContent = r.text;
        avatars.querySelectorAll("button").forEach((b, idx) => b.classList.toggle("active", idx === rvIndex));
        review.classList.remove("fade");
    }, 250);
}

showReview(0);
document.getElementById("rvPrev").addEventListener("click", () => showReview(rvIndex - 1));
document.getElementById("rvNext").addEventListener("click", () => showReview(rvIndex + 1));
avatars.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) showReview(Number(b.dataset.i));
});

// =========================================================
// Video modal
// =========================================================
const videoModal = document.getElementById("videoModal");
const finVideo = document.getElementById("finVideo");

function closeVideo() {
    videoModal.classList.remove("open");
    finVideo.pause();
}
document.getElementById("videoBtn").addEventListener("click", () => {
    videoModal.classList.add("open");
    finVideo.play().catch(() => { });
});
document.getElementById("videoClose").addEventListener("click", closeVideo);
videoModal.addEventListener("click", (e) => { if (e.target === videoModal) closeVideo(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeVideo(); });

// =========================================================
// Statistika hisoblagichi (ekranga kelganda)
// =========================================================
const statsEl = document.getElementById("stats");

function countUp(el) {
    const target = Number(el.dataset.count);
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(target * p) + "M";
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        statsEl.querySelectorAll("[data-count]").forEach(countUp);
        statsObserver.disconnect();
    }
}, { threshold: 0.4 });
statsObserver.observe(statsEl);

// =========================================================
// Newsletter
// =========================================================
const newsForm = document.getElementById("newsForm");
const newsEmail = document.getElementById("newsEmail");
const newsMsg = document.getElementById("newsMsg");

newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(newsEmail.value.trim());
    newsMsg.className = "news-msg " + (ok ? "ok" : "err");
    newsMsg.textContent = ok ? "Rahmat! Siz muvaffaqiyatli obuna bo'ldingiz." : "Iltimos, to'g'ri email kiriting.";
    if (ok) newsForm.reset();
});

// =========================================================
// Tepaga qaytish tugmasi
// =========================================================
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));