const $ = (s, r = document) => r.querySelector(s);

/* ===== Dark / Light mode ===== */
const root = document.documentElement, themeBtn = $('#themeBtn');
function setTheme(t) {
    root.dataset.theme = t;
    themeBtn.innerHTML = `<i class="fa-solid fa-${t === 'dark' ? 'sun' : 'moon'}"></i>`;
    try { localStorage.setItem('theme', t); } catch (e) { }
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) { }
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

/* ===== Burger menu ===== */
$('#burger').onclick = () => $('#menu').classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a => a.onclick = () => $('#menu').classList.remove('open'));

/* ===== Hero slider ===== */
const slides = [
    { price: '$35,000', title: 'Mercedes-Benz, C Class', fuel: 'Petrol', mi: '100 Miles', tr: 'Automatic', img: 'img/hero1.jpg' },
    { price: '$58,000', title: 'Audi A6 3.5', fuel: 'Petrol', mi: '100 Miles', tr: 'Automatic', img: 'img/hero2.jpg' },
    { price: '$95,000', title: 'Nissan Qashqai GLC', fuel: 'Petrol', mi: '50 Miles', tr: 'Automatic', img: 'img/hero3.jpg' }
];
let si = 0, timer;
function showSlide(i) {
    si = (i + slides.length) % slides.length;
    const s = slides[si];
    $('#hero').style.backgroundImage = `url(${s.img})`;
    $('#hPrice').textContent = s.price;
    $('#hTitle').textContent = s.title;
    $('#hSpecs').innerHTML = `<span><i class="fa-solid fa-gas-pump"></i>${s.fuel}</span><span><i class="fa-solid fa-gauge-high"></i>${s.mi}</span><span><i class="fa-solid fa-gears"></i>${s.tr}</span>`;
}
function auto() { clearInterval(timer); timer = setInterval(() => showSlide(si + 1), 6000); }
$('#prev').onclick = () => { showSlide(si - 1); auto(); };
$('#next').onclick = () => { showSlide(si + 1); auto(); };
showSlide(0); auto();

/* ===== Cars ===== */
const cars = [
    { name: 'Toyota Camry New', price: 40000, mi: '20 Miles', fuel: 'Petrol', tr: 'Automatic', img: 'car1.jpg', badge: 'Great Price' },
    { name: 'T-Cross – 2023', price: 15000, mi: '15 Miles', fuel: 'Petrol', tr: 'CVT', img: 'car2.jpg' },
    { name: 'C-Class – 2023', price: 150000, mi: '50 Miles', fuel: 'Petrol', tr: 'Automatic', img: 'car3.jpg' },
    { name: 'Ford Transit – 2021', price: 22000, mi: '2500 Miles', fuel: 'Diesel', tr: 'Manual', img: 'car4.jpg', badge: 'Great Price' },
    { name: 'New GLC – 2023', price: 95000, mi: '50 Miles', fuel: 'Petrol', tr: 'Automatic', img: 'car5.jpg', badge: 'Low Mileage' },
    { name: 'Audi A6 3.5 – New', price: 58000, mi: '100 Miles', fuel: 'Petrol', tr: 'Automatic', img: 'car6.jpg' },
    { name: 'Corolla Altis – 2023', price: 45000, mi: '15000 Miles', fuel: 'Petrol', tr: 'CVT', img: 'car7.jpg' },
    { name: 'Ford Explorer 2023', price: 35000, mi: '10 Miles', fuel: 'Diesel', tr: 'CVT', img: 'car8.jpg', badge: 'Great Price' }
];
const money = n => '$' + n.toLocaleString('en-US');
const card = c => `
  <article class="car">
    <div class="thumb">
      ${c.badge ? `<span class="badge ${c.badge === 'Low Mileage' ? 'low' : ''}">${c.badge}</span>` : ''}
      <button class="bm" aria-label="Saqlash"><i class="fa-regular fa-bookmark"></i></button>
      <img src="img/${c.img}" alt="${c.name}" loading="lazy" onerror="this.remove()">
    </div>
    <div class="car-body">
      <h4>${c.name}</h4>
      <p class="desc">4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate</p>
      <div class="meta"><span><i class="fa-solid fa-gauge-high"></i>${c.mi}</span><span><i class="fa-solid fa-gas-pump"></i>${c.fuel}</span><span><i class="fa-solid fa-gears"></i>${c.tr}</span></div>
      <div class="foot"><b>${money(c.price)}</b><a href="#">View Details <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
    </div>
  </article>`;

const tabsData = {
    recent: cars,
    featured: [...cars].sort((a, b) => b.price - a.price),
    popular: [...cars].sort((a, b) => a.price - b.price)
};
function renderTab(t) {
    const g = $('#carGrid');
    g.style.opacity = 0;
    setTimeout(() => { g.innerHTML = tabsData[t].map(card).join(''); g.style.opacity = 1; }, 150);
}
$('#carGrid').style.transition = 'opacity .2s';
$('#tabs').onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('#tabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); renderTab(b.dataset.tab);
};
$('#carGrid').innerHTML = tabsData.recent.map(card).join('');
$('#specialGrid').innerHTML = [cars[2], cars[3], cars[4], cars[5]].map(card).join('');

/* Bookmark (barcha kartalar uchun) */
document.addEventListener('click', e => {
    const b = e.target.closest('.bm'); if (!b) return;
    b.classList.toggle('on');
    b.firstElementChild.className = b.classList.contains('on') ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
});

/* ===== Reviews ===== */
const reviews = [
    { s: 5, t: 'Sales process was simple and easy', d: 'Sales process was simple and easy. Maximillion was friendly and I didn\'t feel pressured.', n: 'Ali Tufan' },
    { s: 4, t: 'Good job for project', d: 'Sales process was simple and easy. Maximillion was friendly and I didn\'t feel pressured.', n: 'John Doe' },
    { s: 2, t: 'Sales process was simple and easy', d: 'At Voiture what matters to us is making your car search and buying experience easy.', n: 'Brooklyn Simmons' },
    { s: 5, t: 'Good job for project', d: 'Sales process was simple and easy. Maximillion was friendly and I didn\'t feel pressured.', n: 'Augusta Silva' },
    { s: 5, t: 'Highly recommended', d: 'Great service, transparent pricing and a very helpful team from start to finish.', n: 'Jane Cooper' }
];
$('#reviews').innerHTML = reviews.map(r => `
  <div class="review">
    <div class="stars">${[1, 2, 3, 4, 5].map(i => `<i class="fa-solid fa-star ${i > r.s ? 'off' : ''}"></i>`).join('')} <small class="muted"><i class="fa-solid fa-circle-check"></i> Verified</small></div>
    <h5>${r.t}</h5><p>${r.d}</p><b>${r.n}</b>
  </div>`).join('');
const step = () => $('.review').offsetWidth + 20;
$('#rPrev').onclick = () => $('#reviews').scrollBy({ left: -step() });
$('#rNext').onclick = () => $('#reviews').scrollBy({ left: step() });

/* ===== Newsletter ===== */
$('#nlForm').onsubmit = e => {
    e.preventDefault();
    const v = $('#nlEmail').value.trim(), m = $('#nlMsg');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    m.className = 'small msg ' + (ok ? 'ok' : 'err');
    m.textContent = ok ? 'Rahmat! Siz muvaffaqiyatli obuna bo\'ldingiz.' : 'Iltimos, to\'g\'ri email kiriting.';
    if (ok) $('#nlEmail').value = '';
};

/* ===== Back to top ===== */
const up = $('#toTop');
addEventListener('scroll', () => up.classList.toggle('show', scrollY > 500));
up.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });