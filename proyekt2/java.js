const $ = s => document.querySelector(s);
const money = n => '$' + n.toLocaleString('en-US');
const sub = '4.0 D5 PowerPulse Momentum 5dr AWD...';

/* ===== Ma'lumotlar ===== */
const cars = [
    { n: 'Ford Transit – 2021', t: 'SUV', p: 22000, mi: '2500 Miles', f: 'Diesel', g: 'Manual', b: ['Great Price', 'green'], img: 'img/car-transit.jpg' },
    { n: 'New GLC – 2023', t: 'SUV', p: 95000, mi: '50 Miles', f: 'Petrol', g: 'Automatic', b: ['Low Mileage', 'blue'], img: 'img/car-glc.jpg' },
    { n: 'Audi A6 3.5 – New', t: 'Sedan', p: 58000, mi: '100 Miles', f: 'Petrol', g: 'Automatic', img: 'img/car-audi.jpg' },
    { n: 'Corolla Altis – 2023', t: 'Convertible', p: 45000, mi: '15000 Miles', f: 'Petrol', g: 'CVT', img: 'img/car-corolla.jpg' },
    { n: 'T-Cross – 2023', t: 'SUV', p: 15000, mi: '15 Miles', f: 'Petrol', g: 'CVT', img: 'img/car-tcross.jpg' },
    { n: 'C-Class – 2023', t: 'Sedan', p: 150000, mi: '50 Miles', f: 'Petrol', g: 'Automatic', img: 'img/car-cclass.jpg' }
];

const types = [
    ['fa-truck-monster', 'suv'], ['fa-car', 'Sedan'], ['fa-car-rear', 'Hatchback'],
    ['fa-car-side', 'Coupe'], ['fa-leaf', 'Hybrid'], ['fa-wind', 'Convertible'],
    ['fa-van-shuttle', 'Van'], ['fa-truck-pickup', 'Truck'], ['fa-bolt', 'Electric']
];

/* ===== Kartalarni chizish ===== */
function cardHTML(c) {
    return `<div class="card">
    <div class="pic">
      <img src="${c.img}" alt="${c.n}" loading="lazy" onerror="this.style.display='none'">
      ${c.b ? `<span class="badge ${c.b[1]}">${c.b[0]}</span>` : ''}
      <button class="save" aria-label="Save"><i class="fa-regular fa-bookmark"></i></button>
    </div>
    <div class="body">
      <h4>${c.n}</h4><p class="sub">${sub}</p>
      <div class="specs">
        <span><i class="fa-solid fa-gauge-high"></i>${c.mi}</span>
        <span><i class="fa-solid fa-gas-pump"></i>${c.f}</span>
        <span><i class="fa-solid fa-gears"></i>${c.g}</span>
      </div>
      <div class="price"><b>${money(c.p)}</b><a href="#">View Details <i class="fa-solid fa-arrow-up ar"></i></a></div>
    </div></div>`;
}
const render = (el, list) => { el.innerHTML = list.map(cardHTML).join(''); };

render($('#track1'), cars);
render($('#track2'), [cars[4], cars[5], cars[0], cars[1]]);

/* ===== Browse by type ===== */
$('#types').innerHTML = types
    .map(t => `<div class="type"><i class="fa-solid ${t[0]}"></i>${t[1]}</div>`).join('');

$('#types').addEventListener('click', e => {
    const t = e.target.closest('.type'); if (!t) return;
    document.querySelectorAll('.type').forEach(x => x.classList.remove('on'));
    t.classList.add('on');
});

/* ===== Tablar (filtr) ===== */
$('#tabs').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('#tabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const f = b.dataset.f;
    render($('#track1'), f === 'all' ? cars : cars.filter(c => c.t === f));
    $('#track1').scrollTo({ left: 0 });
});

/* ===== Karusel strelkalari + bookmark ===== */
document.addEventListener('click', e => {
    const a = e.target.closest('.arrows button');
    if (a) {
        const tr = document.getElementById(a.dataset.t);
        const step = tr.firstElementChild ? tr.firstElementChild.offsetWidth + 24 : 300;
        tr.scrollBy({ left: a.dataset.d * step, behavior: 'smooth' });
    }
    const s = e.target.closest('.save');
    if (s) {
        s.classList.toggle('on');
        const i = s.querySelector('i');
        i.classList.toggle('fa-solid');
        i.classList.toggle('fa-regular');
    }
});

/* ===== Burger menyu ===== */
const menu = $('#menu'), burgerIcon = $('#burger i');
const setBurger = open => { burgerIcon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'; };

$('#burger').addEventListener('click', () => setBurger(menu.classList.toggle('open')));
menu.addEventListener('click', e => {
    if (e.target.closest('a')) { menu.classList.remove('open'); setBurger(false); }
});
addEventListener('resize', () => {
    if (innerWidth > 900) { menu.classList.remove('open'); setBurger(false); }
});

/* ===== Qidiruv ===== */
$('#searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = [...e.target.querySelectorAll('select')].map(s => s.value).join(' | ');
    alert('Qidiruv: ' + v);
    $('#cars').scrollIntoView({ behavior: 'smooth' });
});

/* ===== Newsletter ===== */
$('#mailForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#email').value.trim(), m = $('#mailMsg');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    m.textContent = ok ? 'Rahmat! Siz obuna bo‘ldingiz' : 'Email noto‘g‘ri kiritildi';
    m.style.color = ok ? 'green' : 'crimson';
    if (ok) e.target.reset();
});

/* ===== Tepaga qaytish ===== */
const topBtn = $('#toTop');
addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 500));
topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));