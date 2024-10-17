// Import Firebase modules
import { auth, googleProvider } from "./firebase-config.js"; // Ensure correct imports
import { signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";

// Select buttons
const signInButton = document.getElementById("google-sign-in");
const goToDashboardButton = document.getElementById("go-to-dashboard");

// Sign in with Google
signInButton.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        alert("Signed in successfully!");
    } catch (error) {
        console.error("Error signing in: ", error);
        alert("Failed to sign in. Please try again.");
    }
});

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        signInButton.style.display = "none";
        goToDashboardButton.style.display = "inline-block";

        // Redirect to the dashboard on button click
        goToDashboardButton.addEventListener("click", () => {
            window.location.href = "dashboard.html";
        });
    } else {
        // User is not signed in
        signInButton.style.display = "flex";
        goToDashboardButton.style.display = "none";
    }
});
