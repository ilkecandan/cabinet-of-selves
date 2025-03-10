// Show the access code modal
function showModal() {
    document.getElementById("accessCodeModal").style.display = "flex";
    document.querySelector(".modal-overlay").style.display = "block";
}

// Close the modal
function closeModal() {
    document.getElementById("accessCodeModal").style.display = "none";
    document.querySelector(".modal-overlay").style.display = "none";
}

// Validate the access code and show content
function validateAccessCode() {
    const enteredCode = document.getElementById("accessCodeInput").value;
    const correctCode = "905445"; // Change this to your actual access code

    if (enteredCode === correctCode) {
        // Store access in localStorage
        localStorage.setItem("hasAccess", "true");

        // Hide modal and overlay
        closeModal();

        // Show the main page content
        document.getElementById("pageContent").style.display = "block";
    } else {
        alert("Incorrect access code. Please try again.");
    }
}

// Ensure the correct content is displayed on page load
document.addEventListener("DOMContentLoaded", () => {
    const hasAccess = localStorage.getItem("hasAccess");

    if (hasAccess === "true") {
        // If user has access, show the main page content and hide the modal
        document.getElementById("pageContent").style.display = "block";
        closeModal();
    } else {
        // If user does not have access, show the modal
        showModal();
    }
});
