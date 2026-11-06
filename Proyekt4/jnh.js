const $ = id => document.getElementById(id);

/* ===================== HERO ===================== */
/* Mashinalar ro'yxati. Rasmlarni images/ papkasiga qo'ying */
const cars = [
    { title: 'Ranger Black – 2021', price: '$165,000', fuel: 'Petrol', miles: '250 Miles', trans: 'Manual', year: '2021', img: 'images/car-1.jpg', link: '#car-1' },
    { title: 'Aurora Silver – 2022', price: '$142,500', fuel: 'Hybrid', miles: '180 Miles', trans: 'Automatic', year: '2022', img: 'images/car-2.jpg', link: '#car-2' },
    { title: 'Nomad Grey – 2020', price: '$118,900', fuel: 'Diesel', miles: '410 Miles', trans: 'Automatic', year: '2020', img: 'images/car-3.jpg', link: '#car-3' },
    { title: 'Volt Blue – 2023', price: '$179,000', fuel: 'Electric', miles: '90 Miles', trans: 'Automatic', year: '2023', img: 'images/car-4.jpg', link: '#car-4' },
];

const hero = $('hero'), dotsBox = $('dots');
let current = 0, timer;

cars.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `${i + 1}-mashina`);
    b.addEventListener('click', () => { show(i); restart(); });
    dotsBox.appendChild(b);
});

/* Rasm bor bo'lsa fon qiladi, yo'q bo'lsa gradient qoladi */
function setBg(src) {   
    const img = new Image();
    img.onload = () => hero.style.setProperty('--bg', `url("${src}")`);
    img.onerror = () => hero.style.removeProperty('--bg');
    img.src = src;
}   

function render(i) {
    const c = cars[i];
    $('title').textContent = c.title;
    $('price').textContent = c.price;
    $('fuel').textContent = c.fuel;
    $('miles').textContent = c.miles;
    $('trans').textContent = c.trans;
    $('year').textContent = c.year;
    $('learn').href = c.link;
    setBg(c.img);
    [...dotsBox.children].forEach((d, k) => {
        d.classList.toggle('active', k === i);
        d.setAttribute('aria-selected', k === i);
    });
}

function show(i) {
    current = (i + cars.length) % cars.length;
    hero.classList.add('swap');
    setTimeout(() => { render(current); hero.classList.remove('swap'); }, 350);
}

function restart() {
    clearInterval(timer);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => show(current + 1), 6000);
}

/* Klaviatura ← → (input va sharhlar ro'yxatida ishlamaydi) */
addEventListener('keydown', e => {
    if (e.target.closest('input, textarea, #rTrack')) return;
    if (e.key === 'ArrowRight') { show(current + 1); restart(); }
    if (e.key === 'ArrowLeft') { show(current - 1); restart(); }
});
    
/* Dropdown menyular */
document.querySelectorAll('.has-sub > button').forEach(btn => {
    btn.addEventListener('click', e => {
        const li = btn.parentElement;
        const wasOpen = li.classList.contains('open');
        document.querySelectorAll('.has-sub.open').forEach(x => x.classList.remove('open'));
        if (!wasOpen) li.classList.add('open');
        e.stopPropagation();
    });
});
document.addEventListener('click', () =>
    document.querySelectorAll('.has-sub.open').forEach(x => x.classList.remove('open')));

/* Burger menyu (havola bosilganda o'zi yopiladi) */
const burger = $('burger'), menu = $('menu');
const setMenu = open => {
    menu.classList.toggle('show', open);
    burger.setAttribute('aria-expanded', open);
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('show')));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

$('submitBtn').addEventListener('click', () => alert('Bu yerga o‘z havolangizni qo‘ying'));

hero.addEventListener('mouseenter', () => clearInterval(timer));
hero.addEventListener('mouseleave', restart);

render(0);
restart();

/* ===================== EXPLORE ALL VEHICLES ===================== */
const vehicles = [
    { cat: 'stock', title: 'T-Cross – 2023', sub: '4.0 D5 PowerPulse Momentum 5dr AWD...', miles: '15 Miles', fuel: 'Petrol', trans: 'CVT', price: '$15,000', img: 'images/v1.jpg' },
    { cat: 'stock', title: 'C-Class – 2023', sub: '4.0 D5 PowerPulse Momentum 5dr AWD...', miles: '50 Miles', fuel: 'Petrol', trans: 'Automatic', price: '$150,000', img: 'images/v2.jpg' },
    { cat: 'stock', title: 'Bentayga – 2023', sub: '4.0 D5 PowerPulse Momentum 5dr AWD...', miles: '30 Miles', fuel: 'Petrol', trans: 'Automatic', price: '$210,000', img: 'images/v3.jpg', badge: 'Great Price' },
    { cat: 'new', title: 'Q7 – 2024', sub: '3.0 TDI Quattro S Line 5dr Tiptronic', miles: '0 Miles', fuel: 'Diesel', trans: 'Automatic', price: '$88,000', img: 'images/v4.jpg', badge: 'New' },
    { cat: 'new', title: 'X5 – 2024', sub: 'xDrive40i M Sport 5dr Auto', miles: '5 Miles', fuel: 'Hybrid', trans: 'Automatic', price: '$92,500', img: 'images/v5.jpg' },
    { cat: 'used', title: 'Golf – 2019', sub: '2.0 TDI SE Nav 5dr DSG', miles: '62 Miles', fuel: 'Diesel', trans: 'Manual', price: '$12,400', img: 'images/v6.jpg' },
    { cat: 'used', title: 'Civic – 2020', sub: '1.5 VTEC Turbo Sport 5dr CVT', miles: '41 Miles', fuel: 'Petrol', trans: 'CVT', price: '$16,900', img: 'images/v7.jpg', badge: 'Great Price' },
];

const ICONS = {
    miles: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m12 12 3-4"/></svg>',
    fuel: '<svg viewBox="0 0 24 24"><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3M7 7h4"/></svg>',
    trans: '<svg viewBox="0 0 24 24"><path d="M6 4v16M12 4v16M18 4v16M6 9a1.5 1.5 0 1 0 0-.01M12 15a1.5 1.5 0 1 0 0-.01M18 9a1.5 1.5 0 1 0 0-.01"/></svg>',
};
const ARROW = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const BOOKMARK = '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>';

const vTrack = $('vTrack'), vPrev = $('vPrev'), vNext = $('vNext');
const savedCars = new Set();

function cardHTML(v, i) {
    return `
  <article class="v-card enter">
    <div class="v-img" data-img="${v.img}">
      ${v.badge ? `<span class="badge">${v.badge}</span>` : ''}
      <button class="save ${savedCars.has(v.title) ? 'on' : ''}" data-title="${v.title}" aria-label="Saqlash">${BOOKMARK}</button>
    </div>
    <div class="v-body">
      <h3>${v.title}</h3>
      <p class="sub-t">${v.sub}</p>
      <ul class="v-meta">
        <li>${ICONS.miles}${v.miles}</li>
        <li>${ICONS.fuel}${v.fuel}</li>
        <li>${ICONS.trans}${v.trans}</li>
      </ul>
      <div class="v-foot">
        <strong>${v.price}</strong>
        <a href="#vehicle-${i}">View Details ${ARROW}</a>
      </div>
    </div>
  </article>`;
}

function renderVehicles(cat) {
    vTrack.innerHTML = vehicles
        .map((v, i) => ({ v, i }))
        .filter(x => x.v.cat === cat)
        .map(x => cardHTML(x.v, x.i))
        .join('');

    vTrack.querySelectorAll('.v-img').forEach(el => {
        const img = new Image();
        img.onload = () => { el.style.backgroundImage = `url("${el.dataset.img}")`; };
        img.src = el.dataset.img;
    });

    vTrack.scrollTo({ left: 0 });
    updateArrows();
}

$('vTabs').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    document.querySelectorAll('#vTabs button').forEach(b => b.classList.toggle('active', b === btn));
    renderVehicles(btn.dataset.cat);
});

vTrack.addEventListener('click', e => {
    const btn = e.target.closest('.save');
    if (!btn) return;
    const t = btn.dataset.title;
    savedCars.has(t) ? savedCars.delete(t) : savedCars.add(t);
    btn.classList.toggle('on', savedCars.has(t));
});

function step() { return (vTrack.querySelector('.v-card')?.offsetWidth || 460) + 20; }
function updateArrows() {
    vPrev.disabled = vTrack.scrollLeft <= 4;
    vNext.disabled = vTrack.scrollLeft + vTrack.clientWidth >= vTrack.scrollWidth - 4;
}
vPrev.addEventListener('click', () => vTrack.scrollBy({ left: -step(), behavior: 'smooth' }));
vNext.addEventListener('click', () => vTrack.scrollBy({ left: step(), behavior: 'smooth' }));
vTrack.addEventListener('scroll', updateArrows, { passive: true });
addEventListener('resize', updateArrows);

renderVehicles('stock');

/* ===================== SHOP BOXCAR YOUR WAY ===================== */
const brandNames = [
    'Ford', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep',
    'Chrysler', 'Citroen', 'Cupra', 'Dacia', 'DS', 'Fiat',
    'Land Rover', 'Lexus', 'Mercedes-Benz', 'Mazda', 'MG', 'Kia',
    'Abarth', 'Romeo', 'Audi', 'Bentley', 'BMW', 'Chevrolet',
    'Mini', 'Mitsubishi', 'Nissan', 'Peugeot', 'Porsche', 'Renault'
];
const typeNames = [
    'SUV', 'Sedan', 'Hatchback', 'Coupe', 'Hybrid', 'Electric',
    'Convertible', 'Wagon', 'Pickup', 'Minivan', 'Crossover', 'Sports',
    'Luxury', 'Compact', 'Off-road', 'Diesel', 'Petrol', 'Automatic',
    'Manual', '4x4', 'Family', 'City', 'Estate', 'Van', 'Roadster', 'Limousine'
];
const slug = s => s.toLowerCase().replace(/\s+/g, '-');

const shopLists = {
    new: brandNames.map(n => ({ t: `${n} Cars`, h: `#new-${slug(n)}` })),
    used: brandNames.map(n => ({ t: `Used ${n}`, h: `#used-${slug(n)}` })),
    type: typeNames.map(n => ({ t: `${n} Cars`, h: `#type-${slug(n)}` })),
    brand: [...brandNames].sort().map(n => ({ t: n, h: `#brand-${slug(n)}` })),
};

const sLinks = $('sLinks');
function renderShop(key) {
    sLinks.innerHTML = shopLists[key].slice(0, 30)
        .map(i => `<li><a href="${i.h}">${i.t}</a></li>`).join('');
    sLinks.classList.remove('fade');
    void sLinks.offsetWidth;
    sLinks.classList.add('fade');
}
$('sTabs').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    document.querySelectorAll('#sTabs button').forEach(b => b.classList.toggle('active', b === btn));
    renderShop(btn.dataset.list);
});
renderShop('new');

/* ===================== AUTO LOAN CALCULATOR ===================== */
const loanForm = $('loanForm'), loanErr = $('loanError'), loanRes = $('loanResult');
const money = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

loanForm.addEventListener('submit', e => {
    e.preventDefault();

    const price = parseFloat($('lPrice').value);
    const rate = parseFloat($('lRate').value);
    const years = parseFloat($('lYears').value);
    const down = parseFloat($('lDown').value) || 0;

    document.querySelectorAll('.field').forEach(f => f.classList.remove('invalid'));
    const fail = (msg, id) => {
        loanErr.textContent = msg;
        loanErr.hidden = false;
        loanRes.hidden = true;
        if (id) $(id).closest('.field').classList.add('invalid');
    };

    if (!(price > 0)) return fail('Narxni to‘g‘ri kiriting.', 'lPrice');
    if (!(rate >= 0)) return fail('Foiz stavkasi 0 dan kichik bo‘lmasligi kerak.', 'lRate');
    if (!(years > 0)) return fail('Muddat kamida 1 yil bo‘lishi kerak.', 'lYears');
    if (down < 0) return fail('Boshlang‘ich to‘lov manfiy bo‘lmaydi.', 'lDown');
    if (down >= price) return fail('Boshlang‘ich to‘lov mashina narxidan kam bo‘lishi kerak.', 'lDown');

    loanErr.hidden = true;

    const principal = price - down;
    const n = Math.round(years * 12);
    const r = rate / 100 / 12;
    const monthly = r === 0 ? principal / n : principal * r / (1 - Math.pow(1 + r, -n));
    const total = monthly * n;

    $('rMonthly').textContent = money(monthly);
    $('rAmount').textContent = money(principal);
    $('rInterest').textContent = money(total - principal);
    $('rTotal').textContent = money(total);

    loanRes.hidden = false;
    loanRes.style.animation = 'none';
    void loanRes.offsetWidth;
    loanRes.style.animation = '';
});

/* ===================== REVIEWS ===================== */
const reviews = [
    { stars: 5, title: 'Sales process was simple and easy', text: 'Sales process was simple and easy. Maximillion was friendly and I didn’t feel pressured at all.', name: 'Ali Tufan' },
    { stars: 4, title: 'Good job for project', text: 'Sales process was simple and easy. Maximillion was friendly and I didn’t feel pressured at all.', name: 'John Doe' },
    { stars: 2, title: 'Sales process was simple and easy', text: 'At Voiture what matters to us is making your car search and buying experience easy.', name: 'Brooklyn Simmons' },
    { stars: 5, title: 'Good job for project', text: 'Sales process was simple and easy. Maximillion was friendly and I didn’t feel pressured at all.', name: 'Augusta Silva' },
    { stars: 5, title: 'Sales process was simple and easy', text: 'Sales process was simple and easy. Maximillion was friendly and I didn’t feel pressured at all.', name: 'Jack Graham' },
    { stars: 4, title: 'Smooth and honest service', text: 'The whole team was transparent about pricing and helped me find the right car within my budget.', name: 'Sara Lopez' },
    { stars: 5, title: 'Highly recommended', text: 'From the test drive to the paperwork everything was handled quickly. I would buy here again.', name: 'Daniel Kim' },
];

const STAR = '<svg viewBox="0 0 24 24"><path d="m12 2 3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#6d7285"/><path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const rTrack = $('rTrack'), rPrev = $('rPrev'), rNext = $('rNext');

rTrack.innerHTML = reviews.map(r => `
  <article class="r-card">
    <div class="r-top">
      <div class="stars" role="img" aria-label="5 yulduzdan ${r.stars}">
        ${[1, 2, 3, 4, 5].map(n => `<i class="${n <= r.stars ? '' : 'off'}">${STAR}</i>`).join('')}
      </div>
      <span class="verified">${CHECK}Verified</span>
    </div>
    <h3>${r.title}</h3>
    <p>${r.text}</p>
    <span class="who">${r.name}</span>
  </article>`).join('');

function rStep() { return (rTrack.querySelector('.r-card')?.offsetWidth || 250) + 18; }
function rUpdate() {
    rPrev.disabled = rTrack.scrollLeft <= 4;
    rNext.disabled = rTrack.scrollLeft + rTrack.clientWidth >= rTrack.scrollWidth - 4;
}
rPrev.addEventListener('click', () => rTrack.scrollBy({ left: -rStep(), behavior: 'smooth' }));
rNext.addEventListener('click', () => rTrack.scrollBy({ left: rStep(), behavior: 'smooth' }));
rTrack.addEventListener('scroll', rUpdate, { passive: true });
addEventListener('resize', rUpdate);
rTrack.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); rNext.click(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); rPrev.click(); }
});
rUpdate();

/* ===================== FOOTER ===================== */
$('copyYear').textContent = new Date().getFullYear();

const newsForm = $('newsForm'), newsEmail = $('newsEmail'), newsMsg = $('newsMsg');

newsForm.addEventListener('submit', e => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(newsEmail.value.trim());

    newsEmail.classList.toggle('invalid', !valid);
    newsMsg.className = 'ft-msg ' + (valid ? 'ok' : 'err');
    newsMsg.textContent = valid
        ? 'Rahmat! Obuna muvaffaqiyatli bajarildi.'
        : 'Email manzilni to‘g‘ri kiriting.';

    if (valid) newsForm.reset();
});
newsEmail.addEventListener('input', () => newsEmail.classList.remove('invalid'));

const toTop = $('toTop');
addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 600), { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));