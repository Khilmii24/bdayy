
const TARGET_DATE = new Date("April 29, 2026 01:00:00").getTime();

const heartsBg = document.getElementById('hearts-bg');
const roseSVG = `<svg viewBox="0 0 512 512" width="100%" height="100%"><path d="M444.6 156.9c-10.7-32.6-43.1-51.2-76.3-43.7l-7.3 1.7c-21.7-27.4-56.1-41.2-90.1-34.9-38.3 7.1-66.3 39.1-68.5 77.2-25.1-6.1-51.8 1.4-69.8 19.3-25.2 25.1-26.6 64.9-3.2 91.6l125.6 142.1c5.2 5.9 14.1 6.3 19.8 1l125.1-125.1c32.7-32.7 34.6-86.3 4.5-121.2l40.2-9z" fill="#e53935"/></svg>`;
const kissSVG = `<svg viewBox="0 0 512 512" width="100%" height="100%"><path d="M410.1 213.1c-19.1-23.3-51.2-34.1-85.3-34.1-34.1 0-66.2 10.8-85.3 34.1-19.1-23.3-51.2-34.1-85.3-34.1-34.1 0-66.2 10.8-85.3 34.1-22.1 27-23.7 65.7-4.7 93.9 31.4 46.5 91.1 94.2 159.2 136.6 10.3 6.4 23.8 6.4 34.1 0 68.1-42.4 127.8-90.1 159.2-136.6 19.1-28.2 17.5-66.9-4.7-93.9z" fill="#ff4081"/></svg>`;


function createFloatingElement() {
    if (!heartsBg) return;
    const el = document.createElement('div');
    const isRose = Math.random() > 0.5;
    el.classList.add('floating-svg');
    el.innerHTML = isRose ? roseSVG : kissSVG;
    el.style.left = Math.random() * 100 + 'vw';
    el.style.width = (Math.random() * 20 + 20) + 'px';
    el.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heartsBg.appendChild(el);
    setTimeout(() => el.remove(), 10000);
}
setInterval(createFloatingElement, 500);

// Logika Hitung Mundur
const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        unlockWebsite();
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}, 1000);

function unlockWebsite() {
    const overlay = document.getElementById("countdown-overlay");
    const mainContent = document.getElementById("main-content");
    overlay.style.opacity = "0";
    overlay.style.transform = "translateY(-100%)";
    setTimeout(() => {
        overlay.style.display = "none";
        mainContent.classList.add("active");
    }, 1200);
}

// --- LOGIKA PESTA (HUJAN ICON 1 MENIT) ---
const playBtn = document.getElementById('play-button');
const music = document.getElementById('bg-music');
const partyCanvas = document.getElementById('party-canvas');

playBtn.addEventListener('click', () => {
    // Pastikan link Dropbox sudah menggunakan &raw=1
    if (music.paused) {
        music.play().catch(e => console.log("Audio play failed:", e));
        playBtn.innerText = "Enjoy the Story... ❤️";
        triggerFullRain();
    }
});

function triggerFullRain() {
    const partyIcons = ['🌸', '🎂', '🌹', '✨', '💖', '🎁', '🍰', '🧁', '🌷', '💍', '💌'];
    
    // Interval pembuatan icon (60ms = Sangat Lebat)
    const rainEffect = setInterval(() => {
        const icon = document.createElement('div');
        icon.classList.add('party-icon');
        icon.innerText = partyIcons[Math.floor(Math.random() * partyIcons.length)];
        
        icon.style.left = Math.random() * 100 + "vw";
        icon.style.fontSize = (Math.random() * 30 + 15) + "px";
        
        // Durasi jatuh acak antara 3 - 6 detik agar terlihat natural menutupi layar
        const duration = Math.random() * 3 + 3;
        icon.style.animationDuration = duration + "s";
        
        partyCanvas.appendChild(icon);
        
        // Hapus elemen setelah jatuh agar tidak memberatkan browser
        setTimeout(() => icon.remove(), duration * 1000);
    }, 60);

    // Berhenti membuat icon baru setelah 60 detik (1 menit)
    setTimeout(() => {
        clearInterval(rainEffect);
        playBtn.innerText = "The song that always remind me about you";
    }, 60000); 
}

