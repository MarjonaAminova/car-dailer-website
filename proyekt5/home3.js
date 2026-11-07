const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Hero slider
const slides = $$('.slide');
let si = 0, timer;
const showSlide = i => {
    si = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === si));
};
const auto = () => { clearInterval(timer); timer = setInterval(() => showSlide(si + 1), 6000); };
$('#slNext').onclick = () => { showSlide(si + 1); auto(); };
$('#slPrev').onclick = () => { showSlide(si - 1); auto(); };
auto();

// Explore All Vehicles tablari
$('#vTabs').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#vTabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    $$('#vGrid .card').forEach(c => c.hidden = !c.dataset.tabs.split(' ').includes(b.dataset.tab));
});

// Slider strelkalari (Specials va Reviews)
const bindArrows = (sl, prev, next) => {
    const step = () => sl.clientWidth / 2;
    $(next).onclick = () => sl.scrollBy({ left: step(), behavior: 'smooth' });
    $(prev).onclick = () => sl.scrollBy({ left: -step(), behavior: 'smooth' });
};
bindArrows($('#spSlider'), '#prevS', '#nextS');
bindArrows($('#rvSlider'), '#prevR', '#nextR');

// Bookmark
document.addEventListener('click', e => {
    const bm = e.target.closest('.bm'); if (!bm) return;
    bm.classList.toggle('on');
    bm.firstElementChild.className = bm.classList.contains('on') ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
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

// Tepaga qaytish
const toTop = $('#toTop');
toTop.style.display = 'none';
addEventListener('scroll', () => toTop.style.display = scrollY > 400 ? 'block' : 'none');
toTop.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

// Lightbox: istalgan <img> bosilganda kattalashadi
const lb = $('#lightbox'), lbImg = lb.querySelector('img');
document.addEventListener('click', e => {
    const im = e.target.closest('img');
    if (im && !lb.contains(im)) { lbImg.src = im.src; lbImg.alt = im.alt; lb.classList.add('open'); }
});
lb.onclick = () => lb.classList.remove('open');
addEventListener('keydown', e => e.key === 'Escape' && lb.classList.remove('open'));