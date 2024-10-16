// dashboard.js

import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";
// Import necessary Firebase modules
import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"; // Import signOut function

// Sign-out functionality
const signOutButton = document.getElementById("sign-out");
signOutButton.addEventListener("click", async () => {
    try {
        await signOut(auth); // Sign out the user
        alert("Signed out successfully!");
        window.location.href = "index.html"; // Redirect to the homepage after signing out
    } catch (error) {
        console.error("Error signing out: ", error);
        alert("Sign out failed. Please try again.");
    }
});

const db = getFirestore();

// Show passwords function
const showPasswords = async () => {
    const tb = document.getElementById("passwords-table");
    tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Actions</th>
    </tr>`;
    
    const passwordsCollection = collection(db, "passwords");
    const passwordDocs = await getDocs(passwordsCollection);
    
    passwordDocs.forEach((doc) => {
        const data = doc.data();
        tb.innerHTML += `<tr>
            <td>${data.website}</td>
            <td>${data.username}</td>
            <td>
                <span class="password-hidden" id="password-hidden-${doc.id}" style="display: inline;">********</span>
                <span class="password" id="password-${doc.id}" style="display: none;">${data.password}</span>
                <button onclick="togglePasswordVisibility('${doc.id}')">Show/Hide</button>
                <button class="btnsm" onclick="copyToClipboard('${data.password}')">Copy</button>
            </td>
            <td><button class="btnsm" onclick="deletePassword('${doc.id}')">Delete</button></td>
        </tr>`;
    });
};

// Function to add password
document.getElementById("password-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        await addDoc(collection(db, "passwords"), {
            website,
            username,
            password
        });
        alert("Password saved!");
        showPasswords();
        document.getElementById("password-form").reset(); // Reset form after submission
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Function to delete password
window.deletePassword = async (id) => {
    try {
        await deleteDoc(doc(db, "passwords", id));
        alert("Password deleted!");
        showPasswords();
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};

// Toggle password visibility
window.togglePasswordVisibility = (id) => {
    const passwordField = document.getElementById(`password-${id}`);
    const passwordHiddenField = document.getElementById(`password-hidden-${id}`);
    if (passwordField.style.display === "none") {
        passwordField.style.display = "inline";
        passwordHiddenField.style.display = "none";
    } else {
        passwordField.style.display = "none";
        passwordHiddenField.style.display = "inline";
    }
};

// Copy password to clipboard
window.copyToClipboard = (password) => {
    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
    }).catch((err) => {
        console.error("Could not copy text: ", err);
    });
};

// Initial call to show passwords
showPasswords();
