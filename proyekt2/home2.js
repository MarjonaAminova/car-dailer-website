const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Most Searched Cars: tablar (kartalarni yashirib/ko'rsatadi)
const slider = $('#carSlider');
$('#carTabs').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#carTabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    slider.querySelectorAll('.card').forEach(c => {
        c.hidden = b.dataset.type !== 'all' && c.dataset.type !== b.dataset.type;
    });
    slider.scrollLeft = 0;
});

// Slider strelkalari
const step = () => slider.clientWidth / 2;
$('#nextC').onclick = () => slider.scrollBy({ left: step(), behavior: 'smooth' });
$('#prevC').onclick = () => slider.scrollBy({ left: -step(), behavior: 'smooth' });

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