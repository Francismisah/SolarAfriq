document.getElementById("openFormBtn").addEventListener("click", function() {
    document.getElementById("popupForm").style.display = "block";
    document.getElementById("popupOverlay").style.display = "block"; // Show overlay
});

document.getElementById("closeFormBtn").addEventListener("click", function() {
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("popupOverlay").style.display = "none"; // Hide overlay
});

document.getElementById("popupOverlay").addEventListener("click", function() {
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("popupOverlay").style.display = "none"; // Hide overlay if clicking outside form
});
