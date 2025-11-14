function updateCountdown() {
    // 👉 Set your wedding date here
    const weddingDate = new Date("2026-04-18T00:00:00").getTime();
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    // Calculate time
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    
    const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Months + Days calculation
    const months = Math.floor(daysTotal / 30);
    const days   = daysTotal % 30;

    // Update HTML
    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();