let currentCard = 1;
const totalCards = 20;

// Initialize progress dots
function initProgress() {
    const indicator = document.getElementById('progressIndicator');
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.id = `dot-${i+1}`;
        indicator.appendChild(dot);
    }
}

// Navigation
function nextCard() {
    const current = document.querySelector(`[data-card="${currentCard}"]`);
    current.classList.add('exit');
    
    setTimeout(() => {
        current.classList.remove('active', 'exit');
        current.style.display = 'none';
        
        currentCard++;
        if (currentCard <= totalCards) {
            const next = document.querySelector(`[data-card="${currentCard}"]`);
            next.style.display = 'flex';
            setTimeout(() => next.classList.add('active'), 50);
            updateProgress();
            initCardEffects(currentCard);
        }
    }, 600);
}

function updateProgress() {
    for (let i = 1; i <= totalCards; i++) {
        const dot = document.getElementById(`dot-${i}`);
        dot.classList.remove('active', 'completed');
        if (i < currentCard) dot.classList.add('completed');
        else if (i === currentCard) dot.classList.add('active');
    }
}

// ===== CARD 2: RUNAWAY BUTTON =====
function runAway(btn) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function heartPop(e) {
    const heart = document.createElement('div');
    heart.className = 'heart-pop';
    heart.textContent = '❤️';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// ===== CARD 3: ATTENTION TEST =====
function attentionTest(btn) {
    btn.parentElement.querySelectorAll('.btn').forEach(b => b.style.display = 'none');
    document.getElementById('attentionResponse').classList.add('show');
    setTimeout(nextCard, 3000);
}

// ===== CARD 4: GLOW SELECT =====
function selectGlow(btn) {
    document.querySelectorAll('.glow-select').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('card4').style.filter = 'blur(0px)';
    setTimeout(nextCard, 1000);
}

// ===== CARD 5: MEMORY LANE =====
function checkInput() {
    const input = document.getElementById('memoryInput');
    const btn = document.getElementById('memoryNext');
    if (input.value.length > 0) {
        btn.classList.remove('hidden');
        createFloatingHeart();
    }
}

function createFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '0';
    heart.style.animation = 'floatUp 3s ease-out forwards';
    heart.style.fontSize = '1.5rem';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

// ===== CARD 6: STUBBORN POLL =====
function correctAnswer(btn) {
    // Wiggle animation
    btn.classList.add('wiggle');
    
    // Disable all buttons
    btn.parentElement.querySelectorAll('.btn').forEach(b => {
        b.disabled = true;
        b.style.opacity = '0.5';
    });
    
    // Highlight correct button
    btn.style.opacity = '1';
    btn.style.transform = 'scale(1.1)';
    btn.style.boxShadow = '0 0 30px var(--primary)';
    
    // Show response
    document.getElementById('stubbornResponse').classList.add('show');
    
    // Advance to next card
    setTimeout(nextCard, 1500);
}

function wrongAnswerStubborn() {
    const response = document.getElementById('stubbornResponse');
    response.textContent = "Hmm... try again 👀";
    response.classList.add('show');
    btn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        response.classList.remove('show');
        btn.style.animation = '';
    }, 1000);
}

// ===== CARD 7: COMPLIMENT TRAP =====
function wrongAnswer(btn) {
    const response = document.getElementById('complimentResponse');
    response.textContent = "Hmm... try again 👀";
    response.classList.add('show');
    btn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        response.classList.remove('show');
        btn.style.animation = '';
    }, 1000);
}

function perfectAnswer() {
    createConfetti();
    document.getElementById('complimentResponse').textContent = "Perfect answer! ✨";
    document.getElementById('complimentResponse').classList.add('show');
    setTimeout(nextCard, 1500);
}

// ===== CARD 8: TRUST =====
function trustClick() {
    document.body.style.animation = 'flash 0.3s';
    setTimeout(() => document.body.style.animation = '', 300);
    document.getElementById('trustResponse').classList.add('show');
    setTimeout(nextCard, 1500);
}

// ===== CARD 9: MERGE =====
function mergeButtons() {
    const left = document.getElementById('leftBtn');
    const right = document.getElementById('rightBtn');
    
    left.classList.add('merged');
    right.classList.add('merged');
    right.style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('mergeResponse').classList.add('show');
        setTimeout(nextCard, 1500);
    }, 800);
}

// ===== CARD 10: SLIDER =====
let sliderUnlocked = false;

function handleSliderAttempt() {
    if (sliderUnlocked) return;
    
    const tooltip = document.getElementById('sliderTooltip');
    tooltip.classList.add('show');
    
    // Keep tooltip visible briefly then show button
    setTimeout(() => {
        tooltip.classList.remove('show');
        document.getElementById('sliderNext').classList.remove('hidden');
        sliderUnlocked = true;
    }, 5000);
}

function forceMax(slider) {
    // Always force back to 10
    slider.value = 10;
}

// Reset for card revisit
function resetSlider() {
    sliderUnlocked = false;
    document.getElementById('sliderNext').classList.add('hidden');
    document.getElementById('sliderTooltip').classList.remove('show');
}


// ===== CARD 11: EMOJI =====
function selectEmoji(btn, mood) {
    btn.classList.add('selected');
    document.getElementById('moodResponse').textContent = `That ${mood.toLowerCase()} looks good on you.`;
    document.getElementById('moodResponse').classList.add('show');
    setTimeout(nextCard, 1500);
}

// ===== CARD 12: TILT =====
function tiltSelect(btn, isCorrect) {
    const response = document.getElementById('apologyResponse');
    if (isCorrect) {
        btn.style.boxShadow = '0 0 30px rgba(84, 160, 255, 0.6)';
        response.textContent = '*gentle aww sound* ❤️';
        response.classList.add('show');
        setTimeout(nextCard, 1500);
    } else {
        response.textContent = 'Are you sure? 🤔';
        response.classList.add('show');
        setTimeout(() => response.classList.remove('show'), 1500);
    }
}

// ===== CARD 13: WORD FADE =====
function initWordFade() {
    const text = document.getElementById('appreciateText');
    const words = text.textContent.split(' ');
    text.innerHTML = words.map((word, i) => `<span style="animation-delay: ${i * 0.3}s">${word}</span>`).join(' ');
    
    setTimeout(() => {
        document.getElementById('appreciateBtn').classList.remove('hidden');
    }, words.length * 300 + 500);
}

// ===== CARD 14: MOVIE =====
function movieSelect(btn) {
    document.getElementById('card14').style.filter = 'brightness(0.7)';
    btn.style.background = 'var(--primary)';
    document.getElementById('movieResponse').classList.add('show');
    setTimeout(nextCard, 1500);
}

// ===== CARD 15: PAUSE =====
function initPause() {
    setTimeout(() => {
        document.getElementById('pauseBtn').classList.remove('hidden');
    }, 3000);
}

// ===== CARD 16: DATE =====
function dateSelect(tile) {
    tile.style.background = 'var(--primary)';
    document.querySelectorAll('.tile').forEach(t => t.style.pointerEvents = 'none');
    document.getElementById('dateResponse').classList.add('show');
    setTimeout(nextCard, 1500);
}

// ===== CARD 17: PROMISE =====
function checkPromise() {
    const text = document.getElementById('promiseText');
    const btn = document.getElementById('promiseBtn');
    const response = document.getElementById('promiseResponse');
    
    if (text.value.length > 5) {
        btn.classList.remove('hidden');
        response.classList.add('show');
    }
}

// ===== CARD 18: PROGRESS =====
function initProgressBar() {
    setTimeout(() => {
        document.getElementById('progressBar').style.width = '95%';
        setTimeout(() => {
            document.getElementById('almostText').style.opacity = '1';
            setTimeout(nextCard, 2000);
        }, 2000);
    }, 500);
}

// ===== CARD 19: VALENTINE =====
function escapeButton(btn) {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function valentineYes() {
    createConfetti();
    createHeartRain();
    setTimeout(nextCard, 2000);
}

// ===== CARD 20: FINAL =====
function initFinal() {
    document.getElementById('navHint').style.display = 'none';
}

// ===== EFFECTS =====
function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

function createHeartRain() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animation = 'confetti-fall 4s ease-out forwards';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }
}

// ===== INITIALIZE CARD EFFECTS =====
function initCardEffects(cardNum) {
    switch(cardNum) {
        case 4:
            setTimeout(() => {
                document.getElementById('card4').style.filter = 'blur(0px)';
            }, 100);
            break;
        case 13:
            initWordFade();
            break;
        case 15:
            initPause();
            break;
        case 18:
            initProgressBar();
            break;
        case 20:
            initFinal();
            break;
    }
}

// ===== CARD 20: FINAL =====
function initFinal() {
    document.getElementById('navHint').style.display = 'none';
    
    // Auto-show photo collage after final card text finishes
    setTimeout(() => {
        showPhotoCollage();
    }, 5500); // After all line reveals complete
}

// ===== PHOTO COLLAGE =====
const collagePhotos = [
    "../assets/img/usphoto/couple1.jpeg",
    "../assets/img/usphoto/couple2.jpeg",
    "../assets/img/usphoto/couple3.jpeg",
    "../assets/img/usphoto/couple4.jpeg",
    "../assets/img/usphoto/couple5.jpeg",
    "../assets/img/usphoto/couple6.jpeg",
    "../assets/img/usphoto/couple7.jpeg",
    "../assets/img/usphoto/couple8.jpeg",
    "../assets/img/usphoto/couple9.jpeg",
    "../assets/img/usphoto/couple10.jpeg",
    "../assets/img/usphoto/couple11.jpeg",
    "../assets/img/usphoto/couple12.jpeg",
    "../assets/img/usphoto/couple13.jpeg",
    "../assets/img/usphoto/couple14.jpeg",
    "../assets/img/usphoto/couple15.jpeg",
    "../assets/img/usphoto/couple16.jpeg",
    "../assets/img/usphoto/couple17.jpeg",
    "../assets/img/usphoto/couple18.jpeg",
    "../assets/img/usphoto/couple19.jpeg",
    "../assets/img/usphoto/couple20.jpeg",
    "../assets/img/usphoto/couple21.jpeg",
    "../assets/img/usphoto/couple22.jpeg",
    "../assets/img/usphoto/couple23.jpeg",
    "../assets/img/usphoto/couple24.jpeg",
    "../assets/img/usphoto/couple25.jpeg",
    "../assets/img/usphoto/couple26.jpeg",
    "../assets/img/usphoto/couple27.jpeg",
    "../assets/img/usphoto/couple28.jpeg",
    "../assets/img/usphoto/couple29.jpeg",
    "../assets/img/usphoto/couple30.jpeg",
    "../assets/img/usphoto/couple31.jpg",
    "../assets/img/usphoto/couple32.jpg",
    "../assets/img/usphoto/couple33.jpg",
    "../assets/img/usphoto/couple34.jpg",
    "../assets/img/usphoto/couple35.jpeg",
    "../assets/img/usphoto/couple36.jpeg",
    "../assets/img/usphoto/couple37.jpeg",
    "../assets/img/usphoto/couple38.jpeg",
    "../assets/img/usphoto/couple39.jpeg",
    "../assets/img/usphoto/couple40.jpeg"
];


function showPhotoCollage() {
    const collage = document.getElementById('photoCollage');
    const container = document.getElementById('collagePhotos');
    const currentCard20 = document.querySelector('[data-card="20"]');
    
    // Fade out card 20
    currentCard20.style.transition = 'opacity 0.8s ease';
    currentCard20.style.opacity = '0';
    
    setTimeout(() => {
        currentCard20.classList.remove('active');
        currentCard20.style.display = 'none';
        
        // Show collage
        collage.style.display = 'block';
        setTimeout(() => collage.classList.add('active'), 50);
        
        // Generate photos
        generateCollagePhotos(container);
        
        // Add background particles
        addParticles();
        
    }, 800);
}

function generateCollagePhotos(container) {
    const photoCount = 40;
    const usedPositions = [];

    for (let i = 0; i < photoCount; i++) {
        setTimeout(() => {
            createCollagePhoto(container, i, photoCount, usedPositions);
        }, i * 200);
    }
}

function createCollagePhoto(container, index, total, usedPositions) {
    const photo = document.createElement('div');
    photo.className = 'collage-photo';
    
    // Random size between 120px and 250px
    const size = Math.random() * 130 + 120 * 1.5; // Scale up for better visibility
    photo.style.width = size + 'px';
    photo.style.height = (size * 1.25) + 'px'; // Portrait ratio
    
    // Random position with overlap prevention (loose)
    let left, top, attempts = 0;
    do {
        left = Math.random() * 85 + 5; // 5% to 90%
        top = Math.random() * 75 + 5;  // 5% to 80%
        attempts++;
    } while (attempts < 5 && isTooClose(left, top, usedPositions));
    
    photo.style.left = left + '%';
    photo.style.top = top + '%';

    usedPositions.push({ left, top });
    
    // Random rotation (-20 to 20 degrees)
    const rotation = Math.random() * 40 - 20;
    photo.style.setProperty('--final-transform', `rotate(${rotation}deg)`);
    
    // Random z-index for overlapping
    photo.style.zIndex = Math.floor(Math.random() * 100) + 1;
    
    // Random entrance animation
    const entrances = ['flyFromLeft', 'flyFromRight', 'flyFromTop', 'flyFromBottom', 'flyFromCorner', 'flyFromCorner2'];
    const entrance = entrances[Math.floor(Math.random() * entrances.length)];
    photo.style.animation = `${entrance} 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`;
    photo.style.animationDelay = `${index * 3}s`; // 3s delay per photo
    
    // Create image
    const img = document.createElement('img');
    // Cycle through available photos
    const photoIndex = (index % collagePhotos.length);
    img.src = collagePhotos[photoIndex];
    img.alt = 'Memory ' + (index + 1);
    img.onerror = () => {
        // Fallback if image doesn't load
        photo.style.background = `linear-gradient(135deg, hsl(${Math.random() * 360}, 70%, 60%), hsl(${Math.random() * 360}, 70%, 40%))`;
    };
    
    photo.appendChild(img);
    container.appendChild(photo);
    
    // Trigger animation
    requestAnimationFrame(() => {
        photo.classList.add('show');
    }, index * 3000);
    
    // Store position
    usedPositions.push({left, top});
}

function isTooClose(left, top, positions) {
    // Allow some overlap, just not exact same position
    for (let pos of positions) {
        const dist = Math.sqrt(Math.pow(left - pos.left, 2) + Math.pow(top - pos.top, 2));
        if (dist < 12) return true; // Too close if less than 8% apart
    }
    return false;
}

function addParticles() {
    const collage = document.getElementById('photoCollage');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'collage-particle';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        collage.appendChild(particle);
    }
}

// Click photo to bring to front
document.addEventListener('click', (e) => {
    if (e.target.closest('.collage-photo')) {
        const photo = e.target.closest('.collage-photo');
        // Find max z-index
        const allPhotos = document.querySelectorAll('.collage-photo');
        let maxZ = 0;
        allPhotos.forEach(p => {
            const z = parseInt(p.style.zIndex) || 0;
            if (z > maxZ) maxZ = z;
        });
        photo.style.zIndex = maxZ + 1;
    }
});

// ===== START =====
window.onload = () => {
    initProgress();
};