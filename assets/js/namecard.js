function showQRModal() {
    document.getElementById("qrModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("qrModal").style.display = "none";
}

window.onload = function () {
    document.getElementById("qrModal").style.display = "none";
};

function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: "Check this out!",
            text: "Hey, check out this awesome website!",
            url: "https://www.shabirali.me/shabirali.html"
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
        alert("Sharing not supported on this browser. Copy the link manually.");
    }
}