// ==============================
// REQUIREMENT 2: CONNECT FIREBASE
// ==============================
// The Firebase SDK itself is loaded with <script> tags in index.html.
// This file must be loaded BEFORE app.js, because it creates the `auth`
// object that app.js uses.

const firebaseConfig = {
  apiKey: "AIzaSyBY6BfUE035SH5AiiF5KRBo-yetiFmFt7M",
  authDomain: "jsi17-test.firebaseapp.com",
  projectId: "jsi17-test",
  storageBucket: "jsi17-test.firebasestorage.app",
  messagingSenderId: "826126846451",
  appId: "1:826126846451:web:483ea183dc27bc8ea1aa86"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
