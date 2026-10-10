// ==============================
// APP LOGIC
// ==============================
// NOTE: needs firebase-config.js loaded first (it creates `auth`).

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageBox = document.getElementById("message");
const userInfo = document.getElementById("userInfo");


// ==============================
// MESSAGES (REQUIREMENT 4: show success / error)
// ==============================
// type is "success" or "error"; it picks the colour in style.css.

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = "message " + type;
}

// Firebase error codes -> short Vietnamese messages.
// Any code not listed falls back to Firebase's own error.message.
const firebaseErrors = {
    "auth/email-already-in-use": "Email này đã được đăng ký.",
    "auth/invalid-email": "Email không hợp lệ.",
    "auth/invalid-credential": "Sai email hoặc mật khẩu.",
    "auth/user-not-found": "Tài khoản không tồn tại.",
    "auth/wrong-password": "Sai mật khẩu.",
    "auth/too-many-requests": "Thử quá nhiều lần, hãy đợi một lúc rồi thử lại.",
    "auth/network-request-failed": "Lỗi mạng, hãy kiểm tra kết nối.",
    "auth/popup-closed-by-user": "Bạn đã đóng cửa sổ đăng nhập Google."
};

function showError(error) {
    showMessage("Lỗi: " + (firebaseErrors[error.code] || error.message), "error");
}


// ==============================
// REQUIREMENT 3: VALIDATION
// ==============================
// Email must contain "@".
// Password: at least 6 characters, an uppercase letter,
// a lowercase letter and at least 1 digit.
// Returns an error message, or null if everything is valid.

function validate(email, password) {
    if (!email.includes("@")) return "Email phải có ký tự @.";
    if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
    if (!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ hoa.";
    if (!/[a-z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ thường.";
    if (!/[0-9]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ số.";
    return null;
}

// Reads the inputs and validates them.
// Returns { email, password } if valid, otherwise shows the error and returns null.
// NOTE: the same rules are applied to login to match the assignment. In a real
// app you would only check the rules on sign up.
function getValidInput() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const error = validate(email, password);
    if (error) {
        showMessage(error, "error");
        return null;
    }
    return { email: email, password: password };
}


// ==============================
// 1. SIGN UP
// ==============================

document.getElementById("signupBtn").addEventListener("click", function () {

    const input = getValidInput();
    if (!input) return;

    auth.createUserWithEmailAndPassword(input.email, input.password)

        .then((userCredential) => {
            showMessage("Đăng ký thành công! Xin chào, " + userCredential.user.email, "success");
        })

        .catch(showError);

});


// ==============================
// 2. LOGIN EMAIL/PASSWORD
// ==============================

document.getElementById("loginBtn").addEventListener("click", function () {

    const input = getValidInput();
    if (!input) return;

    auth.signInWithEmailAndPassword(input.email, input.password)

        .then((userCredential) => {
            // REQUIREMENT 5 (Bonus): show the user's email on success
            showMessage("Đăng nhập thành công! Xin chào, " + userCredential.user.email, "success");
        })

        .catch(showError);

});


// ==============================
// 3. LOGIN GOOGLE (REQUIREMENT 6: Advance)
// ==============================
// NOTE: needs the Google provider enabled in the Firebase console, and the
// page must be opened from http://localhost or a real domain, NOT file://.

document.getElementById("googleBtn").addEventListener("click", function () {

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)

        .then((result) => {
            showMessage("Đăng nhập Google thành công! Xin chào, " + result.user.email, "success");
        })

        .catch(showError);

});


// ==============================
// 4. AUTH STATE
// ==============================
// Runs on page load and every time the user logs in or out,
// so the trainer card always matches the real login state.

auth.onAuthStateChanged(function (user) {

    if (user) {

        // Logged in: show the trainer card (email, UID, provider)
        userInfo.style.display = "block";

        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userUID").textContent = user.uid;

        // providerId is "password" for email login, "google.com" for Google
        document.getElementById("userProvider").textContent =
            user.providerData[0] ? user.providerData[0].providerId : "unknown";

    } else {

        // Logged out: hide it
        userInfo.style.display = "none";

    }

});


// ==============================
// 5. SIGN OUT
// ==============================

document.getElementById("logoutBtn").addEventListener("click", function () {

    auth.signOut()

        .then(() => {
            showMessage("Đã đăng xuất!", "success");
        })

        .catch(showError);

});
