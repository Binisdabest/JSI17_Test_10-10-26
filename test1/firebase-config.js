// ==============================
// 1. SIGN UP
// ==============================

document.getElementById("signupBtn").addEventListener("click", function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)

        .then((userCredential) => {

            const user = userCredential.user;

            alert("Đăng ký thành công!");

            console.log("User:", user);

        })

        .catch((error) => {

            alert(error.message);

        });

});


// ==============================
// 2. LOGIN EMAIL/PASSWORD
// ==============================

document.getElementById("loginBtn").addEventListener("click", function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)

        .then((userCredential) => {

            const user = userCredential.user;

            alert("Đăng nhập thành công!");

            console.log("User:", user);

        })

        .catch((error) => {

            alert(error.message);

        });

});


// ==============================
// 3. LOGIN GOOGLE
// ==============================

document.getElementById("googleBtn").addEventListener("click", function () {

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)

        .then((result) => {

            const user = result.user;

            console.log("Google user:", user);

            alert("Đăng nhập Google thành công!");

        })

        .catch((error) => {

            console.log(error);

            alert(error.message);

        });

});


// ==============================
// 4. AUTH STATE
// ==============================

auth.onAuthStateChanged(function (user) {

    if (user) {

        // Người dùng đã đăng nhập

        console.log("Đã đăng nhập:", user);

        document.getElementById("userInfo").style.display = "block";

        document.getElementById("userEmail").innerText =
            user.email;

        document.getElementById("userUID").innerText =
            user.uid;

        if (user.providerData.length > 0) {

            document.getElementById("userProvider").innerText =
                user.providerData[0].providerId;

        }

    } else {

        // Người dùng chưa đăng nhập

        console.log("Chưa đăng nhập");

        document.getElementById("userInfo").style.display = "none";

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

            console.log(error);

        });

});