
# Password Manager 🔐

A **Password Manager** web application that allows users to securely store their website passwords and credentials. This project integrates **Firebase Authentication** for secure sign-in using Google and **Firebase Firestore** to store passwords safely. The UI allows users to save, copy, delete, and toggle password visibility efficiently.

## 🚀 Features
- **Google Authentication:** Sign in with your Google account to access the dashboard.
- **Firestore Integration:** Store, retrieve, and delete passwords securely in the cloud.
- **Toggle Password Visibility:** Hide or reveal passwords on the dashboard.
- **Copy to Clipboard:** Quickly copy saved passwords with a button click.
- **User-Friendly UI:** Designed for ease of use across devices (mobile responsiveness will be addressed in future updates).
- **Sign Out Functionality:** Log out easily with a sign-out button.

## 🛠️ Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend & Auth:** Firebase (Firestore & Authentication)
- **Hosting:** Vercel

## 🌐 Live Demo
Check out the live version of the project [here](https://password-manager-mu-henna.vercel.app/) 

## 📦 Installation and Setup
Follow these steps to set up the project locally:

### Prerequisites
- Node.js installed on your machine.
- A Firebase project with Authentication and Firestore enabled.

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Axyl07/password-manager.git
   cd password-manager
   ```

2. **Set up Firebase:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and enable **Google Authentication** and **Cloud Firestore**.
   - Generate the Firebase configuration and add it to `firebase-config.js`:
     ```javascript
     // firebase-config.js
     import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";

     const firebaseConfig = {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_PROJECT_ID.appspot.com",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID",
     };

     export const app = initializeApp(firebaseConfig);
     ```

3. **Deploy the app to Vercel:**
   - Create an account at [Vercel](https://vercel.com/).
   - Connect the repository and click **Deploy**.
   - Make sure your Firebase credentials are correctly configured for production.

## 🖥️ Usage
1. Visit the live demo or run the app locally.
2. Sign in using your **Google account**.
3. Add, view, or delete passwords in the dashboard.
4. Use the **copy button** to copy passwords to your clipboard.
5. Log out anytime using the **Sign Out button**.

## 🔧 Troubleshooting
- If **Google Sign-In** doesn’t work, ensure your OAuth consent screen and API keys are configured correctly in Firebase.
- Make sure Firestore permissions allow authenticated users to read and write data.

## 📄 License
This project is licensed under the **MIT License** – feel free to use, modify, and distribute it.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📧 Contact
If you have any questions or need help with the project, feel free to reach out:
- **GitHub:** [Axyl07](https://github.com/Axyl07)

---

