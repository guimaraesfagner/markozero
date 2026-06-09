const tracks = [
    { id: "4FeUl4t6MuYZ6TzUr42IQF", title: "Children Roses - Vip Mix", artist: "Malky Barros", genre: "Tech House", spotifyUrl: "https://open.spotify.com/track/4FeUl4t6MuYZ6TzUr42IQF" },
    { id: "02oCJv2jUnmZuMhBYknlBw", title: "Pump Up", artist: "PRINSH, EBO Live, Malky Barros", genre: "Bass House", spotifyUrl: "https://open.spotify.com/track/02oCJv2jUnmZuMhBYknlBw" },
    { id: "64p8MCyZ694ikWRSz3XVB2", title: "Changer", artist: "Malky Barros, DJ Mayon", genre: "House", spotifyUrl: "https://open.spotify.com/track/64p8MCyZ694ikWRSz3XVB2" },
    { id: "2GzyJvxqqexrhCTN0pByfv", title: "Jack3d", artist: "Morppheus, Davz", genre: "Bass House", spotifyUrl: "https://open.spotify.com/track/2GzyJvxqqexrhCTN0pByfv" },
    { id: "42PrOGI0IL85RE3okMVO5s", title: "Pense", artist: "Morppheus, Calerc", genre: "Tech House", spotifyUrl: "https://open.spotify.com/track/42PrOGI0IL85RE3okMVO5s" },
    { id: "3BaPC0eT9dhtNxZ72bj1yI", title: "Oops, I Did Again", artist: "Morppheus", genre: "Electronic", spotifyUrl: "https://open.spotify.com/track/3BaPC0eT9dhtNxZ72bj1yI" }
];

const playerBar = document.getElementById('fixedPlayer');
const playerIframe = document.getElementById('playerIframe');
const playerTrackTitle = document.getElementById('playerTrackTitle');
const playerArtistName = document.getElementById('playerArtistName');
const playerCover = document.getElementById('playerCover');
const closePlayerBtn = document.getElementById('closePlayer');

function loadTrack(trackId, trackTitle, trackArtist, coverUrl) {
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    playerIframe.src = embedUrl;
    playerTrackTitle.textContent = trackTitle;
    playerArtistName.textContent = trackArtist;
    playerCover.src = coverUrl || `https://i.scdn.co/image/ab67616d0000b273${trackId}`;
    playerBar.classList.add('active');
}

function closePlayer() {
    playerIframe.src = '';
    playerBar.classList.remove('active');
}

function attachPlayButtons() {
    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const trackId = btn.getAttribute('data-track-id');
            const trackTitle = btn.getAttribute('data-track-title');
            const trackArtist = btn.getAttribute('data-track-artist');
            if (trackId) loadTrack(trackId, trackTitle, trackArtist, null);
        });
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
                <h3 class="card-title">${track.title}</h3>
                <p class="card-artist">${track.artist}</p>
                <span class="card-genre">${track.genre}</span>
                <button class="btn-play" data-track-id="${track.id}" data-track-title="${track.title}" data-track-artist="${track.artist}">▶ OUÇA</button>
            </div>
        `;
        container.appendChild(card);
    });
    attachPlayButtons();
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

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initParallax();
    initSmoothScroll();
    if (closePlayerBtn) closePlayerBtn.addEventListener('click', closePlayer);
    if (document.getElementById('home-releases')) renderTracks('home-releases', 6);
    if (document.getElementById('all-releases')) renderTracks('all-releases');
});