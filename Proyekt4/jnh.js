const $ = (s, p = document) => p.querySelector(s), $$ = (s, p = document) => [...p.querySelectorAll(s)];

/* ---------- Rasm topilmasa: kulrang blok ---------- */
const noImg = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#c9ccd6"/><text x="50%" y="50%" fill="#4b5163" font-family="sans-serif" font-size="32" text-anchor="middle">Rasm topilmadi</text></svg>');
document.addEventListener('error', e => {
    const i = e.target;
    if (i.tagName === 'IMG' && i.src !== noImg) i.src = noImg;
}, true);

/* ---------- Dark / Light ---------- */
const root = document.documentElement, themeBtn = $('#theme');
const setTheme = t => {
    root.dataset.theme = t;
    themeBtn.innerHTML = `<i class="fa-solid fa-${t === 'dark' ? 'sun' : 'moon'}"></i>`;
    try { localStorage.setItem('theme', t) } catch (_) { }
};
let saved = null; try { saved = localStorage.getItem('theme') } catch (_) { }
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

/* ---------- Menyu, scroll ---------- */
$('#burger').onclick = () => $('#nav').classList.toggle('open');
$$('#nav a').forEach(a => a.onclick = () => $('#nav').classList.remove('open'));
addEventListener('scroll', () => {
    $('#header').classList.toggle('scrolled', scrollY > 60);
    $('#toTop').classList.toggle('show', scrollY > 500);
});
$('#toTop').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

/* ---------- Hero slayder ---------- */
const slides = [
    { img: 'img/hero1.jpg', price: '$165,000', title: 'Ranger Black – 2021', fuel: 'Petrol', miles: '250 Miles', trans: 'Manual', year: '2021' },
    { img: 'img/hero2.jpg', price: '$98,000', title: 'Bentayga Sport – 2022', fuel: 'Hybrid', miles: '120 Miles', trans: 'Automatic', year: '2022' },
    { img: 'img/car2.jpg', price: '$150,000', title: 'C-Class Night – 2023', fuel: 'Petrol', miles: '50 Miles', trans: 'Automatic', year: '2023' },
    { img: 'img/car1.jpg', price: '$15,000', title: 'T-Cross Urban – 2023', fuel: 'Petrol', miles: '15 Miles', trans: 'CVT', year: '2023' }
];
let cur = 0, timer;
const dots = $('#dots');
slides.forEach((_, i) => { const s = document.createElement('span'); s.onclick = () => { show(i); auto() }; dots.append(s) });
function show(i) {
    cur = i; const s = slides[i], img = $('#hImg');
    img.style.opacity = 0;
    setTimeout(() => { img.src = s.img; img.alt = s.title; img.style.opacity = 1 }, 200);
    $('#hPrice').textContent = s.price; $('#hTitle').textContent = s.title;
    $('#hFuel').textContent = s.fuel; $('#hMiles').textContent = s.miles;
    $('#hTrans').textContent = s.trans; $('#hYear').textContent = s.year;
    $$('span', dots).forEach((d, k) => d.classList.toggle('on', k === i));
}
const auto = () => { clearInterval(timer); timer = setInterval(() => show((cur + 1) % slides.length), 5000) };
show(0); auto();

/* ---------- Tablar ---------- */
const brands = ['Ford', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Chrysler', 'Citroen', 'Cupra', 'Dacia', 'DS', 'Fiat', 'Land Rover', 'Lexus', 'Mercedes-Benz', 'Mazda', 'MG', 'Kia', 'Abarth', 'Romeo', 'Audi', 'Bentley', 'BMW', 'Chevrolet', 'Mini', 'Mitsubishi', 'Nissan', 'Peugeot', 'Porsche', 'Renault'];
const types = ['Sedan', 'SUV', 'Hatchback', 'Hybrid', 'Electric', 'Coupe', 'Truck', 'Convertible'];
const lists = { p1: brands.map(b => b + ' Cars'), p2: brands.map(b => 'Used ' + b + ' Cars'), p3: types.map(t => t + ' Cars'), p4: brands.slice(0, 20) };
const renderShop = p => $('#shopList').innerHTML = lists[p].map(x => `<a href="#">${x}</a>`).join('');
const filterCars = f => {
    $$('#carSlider .car').forEach(c => c.style.display = c.dataset.t.split(' ').includes(f) ? '' : 'none');
    $('#carSlider').scrollTo({ left: 0 });
};
$$('.tabs').forEach(tabs => tabs.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', tabs).forEach(x => x.classList.remove('active')); b.classList.add('active');
    tabs.dataset.group === 'cars' ? filterCars(b.dataset.f) : renderShop(b.dataset.p);
});
renderShop('p1');

/* ---------- Slayder strelkalari ---------- */
$$('.arrows').forEach(a => {
    const sl = $('#' + a.dataset.target);
    const step = () => (sl.firstElementChild?.offsetWidth || 300) + 24;
    $('.prev', a).onclick = () => sl.scrollBy({ left: -step() });
    $('.next', a).onclick = () => sl.scrollBy({ left: step() });
});

/* ---------- Bookmark ---------- */
$$('.mark').forEach(m => m.onclick = () => {
    m.classList.toggle('on');
    $('i', m).className = m.classList.contains('on') ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
});

/* ---------- Sharhlar ---------- */
const reviews = [
    ['Ali Tufan', 5, 'Sales process was simple and easy', "Sales process was simple and easy. Maximillion was friendly and I didn't feel pressured."],
    ['John Doe', 4, 'Good job for project', "Sales process was simple and easy. Maximillion was friendly and I didn't feel pressured."],
    ['Brooklyn Simmons', 2, 'Sales process was simple and easy', 'At Voiture what matters to us is making your car search and buying easy.'],
    ['Augusta Silva', 5, 'Good job for project', "Sales process was simple and easy. Maximillion was friendly and I didn't feel pressured."],
    ['Jack Graham', 5, 'Sales process was simple and easy', "Sales process was simple and easy. Maximillion was friendly and I didn't feel pressured."]
];
$('#revSlider').innerHTML = reviews.map(([n, s, t, p]) => `
  <div class="rev"><div class="stars">${[1, 2, 3, 4, 5].map(i => `<i class="fa-solid fa-star s ${i > s ? 'off' : ''}"></i>`).join('')}&nbsp;<i class="fa-solid fa-circle-check"></i> Verified</div>
  <h5>${t}</h5><p>${p}</p><b>${n}</b></div>`).join('');

/* ---------- Kredit kalkulyatori ---------- */
$('#loanForm').onsubmit = e => {
    e.preventDefault();
    const price = +$('#price').value, rate = +$('#rate').value, years = +$('#term').value, down = +$('#down').value;
    const out = $('#loanResult'); out.hidden = false;
    if (!(price > 0) || !(years > 0) || down < 0 || down >= price || rate < 0) { out.textContent = "Qiymatlarni to'g'ri kiriting (boshlang'ich to'lov narxdan kichik bo'lsin)."; return }
    const P = price - down, r = rate / 100 / 12, n = years * 12;
    const m = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const f = x => x.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    out.innerHTML = `Monthly payment: <b>${f(m)}</b><br><small>Total: ${f(m * n)} · Interest: ${f(m * n - P)}</small>`;
};

/* ---------- Newsletter ---------- */
$('#mailForm').onsubmit = e => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').value.trim()), msg = $('#mailMsg');
    msg.textContent = ok ? 'Thank you for subscribing!' : 'Please enter a valid email.';
    msg.style.color = ok ? '#4ade80' : '#f87171';
    if (ok) e.target.reset();
};

/* ---------- Lightbox: rasmni bosganda katta ochiladi ---------- */
const lb = $('#lb'), lbImg = $('#lbImg');
const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = '' };
document.addEventListener('click', e => {
    const i = e.target;
    if (i.tagName !== 'IMG' || i.closest('#lb') || i.classList.contains('hero-img')) return;
    e.preventDefault();
    lbImg.src = i.currentSrc || i.src; lbImg.alt = i.alt;
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
});
lb.onclick = closeLb;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb() });