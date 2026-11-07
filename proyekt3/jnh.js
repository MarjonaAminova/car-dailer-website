const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Popular Makes: tablar (kartalarni yashirib/ko'rsatadi)
const slider = $('#makeSlider');
$('#makeTabs').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#makeTabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    slider.querySelectorAll('.card').forEach(c => {
        c.hidden = b.dataset.make !== 'all' && c.dataset.make !== b.dataset.make;
    });
    slider.scrollLeft = 0;
});

// Slider strelkalari
const step = () => slider.clientWidth / 2;
$('#nextM').onclick = () => slider.scrollBy({ left: step(), behavior: 'smooth' });
$('#prevM').onclick = () => slider.scrollBy({ left: -step(), behavior: 'smooth' });

// Hero tablari
$('#heroTabs').addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
    $$('#heroTabs button').forEach(x => x.classList.remove('active'));
    e.target.classList.add('active');
});

// Bookmark
document.addEventListener('click', e => {
    const bm = e.target.closest('.bm'); if (!bm) return;
    bm.classList.toggle('on');
    bm.firstElementChild.className = bm.classList.contains('on') ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
});

// Sharhlar
const reviews = [
    { n: 'Ali TUFAN', r: 'Designer', t: "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team." },
    { n: 'Sara Miller', r: 'Developer', t: 'Smooth process from start to finish. The finance team found me a great deal and the car was ready the same day.' },
    { n: 'John Carter', r: 'Manager', t: 'Transparent pricing and friendly staff. I would happily buy my next car from CarHut as well.' }
];
let ri = 0;
const showReview = i => {
    ri = (i + reviews.length) % reviews.length;
    $('#rName').textContent = reviews[ri].n;
    $('#rRole').textContent = reviews[ri].r;
    $('#rText').textContent = reviews[ri].t;
    $$('#avatars img').forEach((im, k) => im.classList.toggle('active', k === ri));
};
showReview(0);
$('#nextR').onclick = () => showReview(ri + 1);
$('#prevR').onclick = () => showReview(ri - 1);
$('#avatars').addEventListener('click', e => {
    if (e.target.dataset.i) { e.stopPropagation(); showReview(+e.target.dataset.i); }
});

// Dark / light mode
const root = document.documentElement, themeBtn = $('#themeBtn');
const setTheme = t => {
    root.dataset.theme = t;
    themeBtn.innerHTML = t === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', t);
};
setTheme(localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

// Mobil menu
$('#burger').onclick = () => $('#links').classList.toggle('open');
$$('#links a').forEach(a => a.addEventListener('click', () => $('#links').classList.remove('open')));

// Tepaga qaytish tugmasi
const toTop = $('#toTop');
toTop.style.display = 'none';
addEventListener('scroll', () => toTop.style.display = scrollY > 400 ? 'block' : 'none');
toTop.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

// Lightbox: istalgan <img> bosilganda kattalashadi
const lb = $('#lightbox'), lbImg = lb.querySelector('img');
document.addEventListener('click', e => {
    const im = e.target.closest('img');
    if (im && !lb.contains(im) && !im.closest('.avatars')) {
        lbImg.src = im.src; lbImg.alt = im.alt; lb.classList.add('open');
    }
});
lb.onclick = () => lb.classList.remove('open');
addEventListener('keydown', e => e.key === 'Escape' && lb.classList.remove('open'));