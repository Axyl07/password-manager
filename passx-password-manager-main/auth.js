// auth.js
import { auth } from "./firebase-config.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";

document.getElementById("google-sign-in").addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in:", user);
        // Redirect to dashboard after successful sign-in
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Error signing in:", error);
    }
});


