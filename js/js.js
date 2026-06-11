const tracks = [
    // Malky Barros
    { id: "4FeUl4t6MuYZ6TzUr42IQF", title: "Children Roses - Vip Mix", artist: "Malky Barros", genre: "Tech House" },
    { id: "02oCJv2jUnmZuMhBYknlBw", title: "Pump Up", artist: "PRINSH, EBO Live, Malky Barros", genre: "Bass House" },
    { id: "64p8MCyZ694ikWRSz3XVB2", title: "Changer", artist: "Malky Barros, DJ Mayon", genre: "House" },
    // Morppheus
    { id: "2GzyJvxqqexrhCTN0pByfv", title: "Jack3d", artist: "Morppheus, Davz", genre: "Bass House" },
    { id: "42PrOGI0IL85RE3okMVO5s", title: "Pense", artist: "Morppheus, Calerc", genre: "Tech House" },
    { id: "3BaPC0eT9dhtNxZ72bj1yI", title: "Oops, I Did Again", artist: "Morppheus", genre: "Electronic" },
    // Gibi Music
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
let currentPlayer = null;

function loadTrack(trackId, trackTitle, trackArtist) {
    playerTrackTitle.textContent = trackTitle;
    playerArtistName.textContent = trackArtist;
    playerCover.src = `https://i.scdn.co/image/ab67616d0000b273${trackId}`;
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    playerIframe.src = embedUrl;
    playerBar.classList.add('active');
    if (!playerIframe.id) playerIframe.id = 'spotify-embed-iframe';
    if (window.SpotifyIframeApi) {
        initializeSpotifyPlayer();
    } else {
        window.onSpotifyIframeApiReady = initializeSpotifyPlayer;
    }
}

function initializeSpotifyPlayer() {
    const iframeElement = document.getElementById('playerIframe');
    if (!iframeElement) return;
    window.SpotifyIframeApi.createController(iframeElement, (controller) => {
        currentPlayer = controller;
        controller.play();
    });
}

function closePlayer() {
    if (currentPlayer) {
        currentPlayer.pause();
        currentPlayer.destroy();
        currentPlayer = null;
    }
    playerIframe.src = '';
    playerBar.classList.remove('active');
}

function attachPlayButtons() {
    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.removeEventListener('click', btn._listener);
        const handler = (e) => {
            e.preventDefault();
            const trackId = btn.getAttribute('data-track-id');
            const trackTitle = btn.getAttribute('data-track-title');
            const trackArtist = btn.getAttribute('data-track-artist');
            if (trackId) loadTrack(trackId, trackTitle, trackArtist);
        };
        btn.addEventListener('click', handler);
        btn._listener = handler;
    });
}

function renderTracks(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let tracksToRender = tracks;
    if (limit && limit > 0) tracksToRender = tracks.slice(0, limit);
    container.innerHTML = '';
    tracksToRender.forEach(track => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img class="card-img" src="https://i.scdn.co/image/ab67616d0000b273${track.id}" alt="${track.title}" onerror="this.src='https://via.placeholder.com/300?text=Markozero'">
            <div class="card-content">
                <h3 class="card-title">${escapeHtml(track.title)}</h3>
                <p class="card-artist">${escapeHtml(track.artist)}</p>
                <span class="card-genre">${escapeHtml(track.genre)}</span>
                <button class="btn-play" data-track-id="${track.id}" data-track-title="${escapeHtml(track.title)}" data-track-artist="${escapeHtml(track.artist)}">▶ OUÇA</button>
            </div>
        `;
        container.appendChild(card);
    });
    attachPlayButtons();
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }
}

function initParallax() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (!parallaxBg) return;
    window.addEventListener('scroll', () => {
        parallaxBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });
}

function loadSpotifyIframeApi() {
    if (document.getElementById('spotify-iframe-api')) return;
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.id = 'spotify-iframe-api';
    script.async = true;
    document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initParallax();
    initSmoothScroll();
    loadSpotifyIframeApi();
    if (closePlayerBtn) closePlayerBtn.addEventListener('click', closePlayer);
    if (document.getElementById('home-releases')) renderTracks('home-releases', 6);
    if (document.getElementById('all-releases')) renderTracks('all-releases');
});