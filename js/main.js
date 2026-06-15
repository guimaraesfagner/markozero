const tracks = [
    { id: "4FeUl4t6MuYZ6TzUr42IQF", title: "Children Roses - Vip Mix", artist: "Malky Barros", genre: "Tech House" },
    { id: "02oCJv2jUnmZuMhBYknlBw", title: "Pump Up", artist: "PRINSH, EBO Live, Malky Barros", genre: "Bass House" },
    { id: "64p8MCyZ694ikWRSz3XVB2", title: "Changer", artist: "Malky Barros, DJ Mayon", genre: "House" },
    { id: "2GzyJvxqqexrhCTN0pByfv", title: "Jack3d", artist: "Morppheus, Davz", genre: "Bass House" },
    { id: "42PrOGI0IL85RE3okMVO5s", title: "Pense", artist: "Morppheus, Calerc", genre: "Tech House" },
    { id: "3BaPC0eT9dhtNxZ72bj1yI", title: "Oops, I Did Again", artist: "Morppheus", genre: "Electronic" },
    { id: "7ckuWB5Xl2q2Yk4XpKFh3k", title: "Gibi Track 1", artist: "Gibi Music", genre: "Tech House" },
    { id: "6RTLVlaCNyqOQJiYMKgt3a", title: "Gibi Track 2", artist: "Gibi Music", genre: "Tech House" },
    { id: "4OpKnYWRtzte4mpq7PYG5M", title: "Gibi Track 3", artist: "Gibi Music", genre: "Tech House" }
];

const playerBar = document.getElementById('fixedPlayer');
const playerIframe = document.getElementById('playerIframe');
const playerTrackTitle = document.getElementById('playerTrackTitle');
const playerArtistName = document.getElementById('playerArtistName');
const playerCover = document.getElementById('playerCover');
const closePlayerBtn = document.getElementById('closePlayer');

function loadTrack(trackId, trackTitle, trackArtist) {
    if (!trackId) return;
    playerTrackTitle.textContent = trackTitle;
    playerArtistName.textContent = trackArtist;
    if (playerCover) {
        playerCover.src = `https://i.scdn.co/image/ab67616d0000b273${trackId}`;
        playerCover.style.display = 'block';
    }
    playerIframe.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    playerBar.classList.add('active');
}

function closePlayer() {
    playerIframe.src = '';
    playerBar.classList.remove('active');
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function(c) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
}

function attachPlayButtons() {
    document.querySelectorAll('[data-track-id]').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-track-id');
            const title = this.getAttribute('data-track-title');
            const artist = this.getAttribute('data-track-artist');
            loadTrack(id, title, artist);
        });
    });
}

function renderTracks(containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const list = limit ? tracks.slice(0, limit) : tracks;
    container.innerHTML = '';
    list.forEach(track => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrap">
                <img class="card-img" src="https://i.scdn.co/image/ab67616d0000b273${track.id}" alt="${escapeHtml(track.title)}" onerror="this.src='https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400'">
                <div class="card-play-overlay">
                    <button class="card-play-btn" data-track-id="${track.id}" data-track-title="${escapeHtml(track.title)}" data-track-artist="${escapeHtml(track.artist)}" aria-label="Ouvir ${escapeHtml(track.title)}">&#9654;</button>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${escapeHtml(track.title)}</h3>
                <p class="card-artist">${escapeHtml(track.artist)}</p>
                <span class="card-genre">${escapeHtml(track.genre)}</span>
                <br>
                <button class="btn-play" data-track-id="${track.id}" data-track-title="${escapeHtml(track.title)}" data-track-artist="${escapeHtml(track.artist)}">&#9654; Ouvir</button>
            </div>
        `;
        container.appendChild(card);
    });
    attachPlayButtons();
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

function initParallax() {
    const bg = document.querySelector('.parallax-bg');
    if (!bg) return;
    window.addEventListener('scroll', () => {
        bg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }, { passive: true });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initParallax();
    initSmoothScroll();
    initNavHighlight();
    initBackToTop();
    if (closePlayerBtn) closePlayerBtn.addEventListener('click', closePlayer);
    if (document.getElementById('home-releases')) renderTracks('home-releases', 6);
    if (document.getElementById('all-releases')) renderTracks('all-releases');
});
