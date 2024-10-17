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
// Show passwords function
const showPasswords = async () => {
    const tb = document.getElementById("passwords-table");
    tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`;

    const passwordsCollection = collection(db, "passwords");
    const passwordDocs = await getDocs(passwordsCollection);
    
    if (passwordDocs.empty) {
        // If no passwords are found, show the message
        tb.innerHTML += `<tr>
            <td colspan="4">Your entered passwords will show up here.</td>
        </tr>`;
    } else {
        passwordDocs.forEach((doc) => {
            const data = doc.data();
            tb.innerHTML += `<tr>
                <td>${data.website}</td>
                <td>${data.username}</td>
                <td>
                    <span class="password-hidden" id="password-hidden-${doc.id}" style="display: inline;">********</span>
                    <span class="password" id="password-${doc.id}" style="display: none;">${data.password}</span>
                    <button class="btnsm" onclick="togglePasswordVisibility('${doc.id}')">👀</button>
                    <button class="btnsm" onclick="copyToClipboard('${data.password}')">Copy</button>
                </td>
                <td><button class="btnsm" onclick="deletePassword('${doc.id}')">Delete</button></td>
            </tr>`;
        });
    }
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

// Password Strength Indicator Logic
const checkStrengthBtn = document.getElementById('check-strength');
const strengthPasswordInput = document.getElementById('strength-password');
const strengthResult = document.getElementById('strength-result');
const strengthBar = document.getElementById('strength-bar');

// Event listener for checking password strength
checkStrengthBtn.addEventListener('click', () => {
    const password = strengthPasswordInput.value;
    const strength = checkPasswordStrength(password);
    strengthResult.textContent = `Strength: ${strength}`;
    updateStrengthBar(strength);
});

// Function to evaluate password strength
function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++; // Length check
    if (/[A-Z]/.test(password)) strength++; // Uppercase letter check
    if (/[a-z]/.test(password)) strength++; // Lowercase letter check
    if (/[0-9]/.test(password)) strength++; // Number check
    if (/[@$!%*?&]/.test(password)) strength++; // Special character check

    return strength;
}

// Function to update strength bar width
function updateStrengthBar(strength) {
    const strengthPercentage = (strength / 5) * 100; // Maximum strength value is 5
    strengthBar.style.width = strengthPercentage + '%';

    // Change color based on strength
    if (strength === 0) {
        strengthBar.style.backgroundColor = 'red';
    } else if (strength === 1 || strength === 2) {
        strengthBar.style.backgroundColor = 'orange';
    } else if (strength === 3) {
        strengthBar.style.backgroundColor = 'yellow';
    } else if (strength === 4) {
        strengthBar.style.backgroundColor = 'lightgreen';
    } else {
        strengthBar.style.backgroundColor = 'green';
    }
}



// Password Generator Logic
const generatePasswordBtn = document.getElementById('generate-password');
const generatedPasswordInput = document.getElementById('generated-password');
const copyPasswordBtn = document.getElementById('copy-password');

generatePasswordBtn.addEventListener('click', () => {
    const password = generateRandomPassword(12); // 12-character password
    generatedPasswordInput.value = password;
});

function generateRandomPassword(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

// Copy Password to Clipboard
copyPasswordBtn.addEventListener('click', () => {
    generatedPasswordInput.select(); // Select the text in the input field
    navigator.clipboard.writeText(generatedPasswordInput.value)
        .then(() => alert("Password copied to clipboard!"))
        .catch(err => console.error("Failed to copy password: ", err));
});

