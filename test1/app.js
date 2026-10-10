// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY6BfUE035SH5AiiF5KRBo-yetiFmFt7M",
  authDomain: "jsi17-test.firebaseapp.com",
  projectId: "jsi17-test",
  storageBucket: "jsi17-test.firebasestorage.app",
  messagingSenderId: "826126846451",
  appId: "1:826126846451:web:483ea183dc27bc8ea1aa86",
  measurementId: "G-NVLK9GBL3R"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

console.log(auth);