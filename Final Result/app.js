const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const userInfo = document.getElementById("userInfo");


// ==============================
// 1. SIGN UP
// ==============================
// Firebase requires a valid email and a password of at least 6 characters.
// If it fails, error.message explains why (e.g. email already in use).

document.getElementById("signupBtn").addEventListener("click", function () {

    auth.createUserWithEmailAndPassword(emailInput.value.trim(), passwordInput.value)

        .then(() => {
            alert("Đăng ký thành công!");
        })

        .catch((error) => {
            alert(error.message);
        });

});


// ==============================
// 2. LOGIN EMAIL/PASSWORD
// ==============================

document.getElementById("loginBtn").addEventListener("click", function () {

    auth.signInWithEmailAndPassword(emailInput.value.trim(), passwordInput.value)

        .then(() => {
            alert("Đăng nhập thành công!");
        })

        .catch((error) => {
            alert(error.message);
        });

});


// ==============================
// 3. LOGIN GOOGLE
// ==============================
// NOTE: needs the Google provider enabled in the Firebase console
// (Authentication -> Sign-in method) and the page must be opened from
// http://localhost or a real domain, NOT from a file:// path.

document.getElementById("googleBtn").addEventListener("click", function () {

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)

        .then(() => {
            alert("Đăng nhập Google thành công!");
        })

        .catch((error) => {
            alert(error.message);
        });

});


// ==============================
// 4. AUTH STATE
// ==============================
// Runs on page load and every time the user logs in or out,
// so the info panel always matches the real login state.

auth.onAuthStateChanged(function (user) {

    if (user) {

        // Logged in: show the trainer card
        userInfo.style.display = "block";

        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userUID").textContent = user.uid;

        // providerId is "password" for email login, "google.com" for Google
        if (user.providerData.length > 0) {
            document.getElementById("userProvider").textContent =
                user.providerData[0].providerId;
        }

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
            alert("Đã đăng xuất!");
        })

        .catch((error) => {
            alert(error.message);
        });

});
