"use strict";

// Import Firebase vào dự án
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";

// Config cho Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDE_Gck8vvnJD5fIwXFF3KPS5QYjaR1nvE",
    authDomain: "img-background-removal.firebaseapp.com",
    projectId: "img-background-removal",
    storageBucket: "img-background-removal.appspot.com",
    messagingSenderId: "876840054249",
    appId: "1:876840054249:web:c40d0dc059f23d848cef78",
    measurementId: "G-XYGK4GKSV2",
};

// Khởi tạo biến cho Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Khai báo các biến
const googleButton = document.getElementById("google");

const emailSignUp = document.getElementById("email-sign-up");
const passwordSignUp = document.getElementById("password-sign-up");
const displayName = document.getElementById("name-sign-up");
const signUpButton = document.getElementById("sign-up-button");

const emailSignIn = document.getElementById("email-sign-in");
const passwordSignIn = document.getElementById("password-sign-in");
const signInButton = document.getElementById("sign-in-button");

const signOutButton = document.getElementsByClassName("sign-out-button");

const beforeSignIn = document.getElementById("before-sign-in");
const afterSignIn = document.getElementById("after-sign-in");
const userGreetings = document.getElementsByClassName("user-greetings");

// Handle event click vào nút đăng ký
if (signUpButton) {
    signUpButton.addEventListener("click", (e) => {
        e.preventDefault();
        authCreateAccountWithEmail();
    });
}

// Handle event click vào nút đăng nhập
if (signInButton) {
    signInButton.addEventListener("click", (e) => {
        e.preventDefault();
        authSignInWithEmail();
    });
}

// Handle event click vào nút đăng nhập bằng Google
if (googleButton) {
    googleButton.addEventListener("click", (e) => {
        e.preventDefault();
        authSignInWithGoogle();
    });
}

// Handle event click vào nút đăng xuất
if (signOutButton) {
    Array.from(signOutButton).forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            authSignOut();
        });
    });
}

// Thực hiện đăng ký bằng email và password
function authCreateAccountWithEmail() {
    const email = emailSignUp.value;
    const password = passwordSignUp.value;

    const checkboxTerms = document.getElementById("remember-me").checked;
    if (!checkboxTerms) {
        window.alert("Bạn phải đồng ý với các điều khoản của chúng tôi trước khi đăng ký tài khoản!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            authDisplayName();
            window.alert("Bạn đã đăng ký tài khoản thành công!");
            window.location.href = "../views/sign-in.html";
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    window.alert("Email không hợp lệ!");
                    break;
                case "auth/email-already-in-use":
                    window.alert("Tài khoản này đã tồn tại!");
                    break;
                case "auth/weak-password":
                    window.alert("Mật khẩu phải chứa ít nhất 6 ký tự!");
                    break;
                default:
                    window.alert("Đã có lỗi xảy ra! Vui lòng thử lại sau!");
                    console.log(error.message);
            }
        });
}

// Lấy dữ liệu tên user
function authDisplayName() {
    const newDisplayName = displayName.value;

    updateProfile(auth.currentUser, {
        displayName: newDisplayName,
    })
        .then(() => {
            showUserGreeting(userGreetings, user);
        })
        .catch((error) => {
            console.log(error.message);
        });
}

// Thực hiện đăng nhập bằng email và password
function authSignInWithEmail() {
    const email = emailSignIn.value;
    const password = passwordSignIn.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.alert("Đăng nhập thành công!");
            window.location.href = "../views/dashboard.html";
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    window.alert("Email không hợp lệ!");
                    break;
                case "auth/user-disabled":
                    window.alert("Tài khoản này đã bị vô hiệu hóa! Vui lòng liên hệ để biết thêm chi tiết!");
                    break;
                case "auth/invalid-credential":
                    window.alert("Thông tin đăng nhập không chính xác!");
                    break;
                default:
                    window.alert("Đã có lỗi xảy ra! Vui lòng thử lại sau!");
                    console.log(error.message);
            }
        });
}

// Thực hiện đăng nhập thông qua tài khoản Google được pop-up
function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            window.alert("Đăng nhập thành công!");
            window.location.href = "../views/dashboard.html";
        })
        .catch((error) => {
            console.log(error.message);
        });
}

// Thực hiện đăng xuất tài khoản
function authSignOut() {
    signOut(auth)
        .then(() => {
            window.alert("Đăng xuất thành công!");
            if (window.location.pathname == "/src/index.html") {
                window.location.href = "/src/index.html";
            } else {
                window.location.href = "../index.html";
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}

// Kiểm tra state của tài khoản (logged-in hay logged-out)
onAuthStateChanged(auth, (user) => {
    if (user) {
        showUserGreeting(userGreetings, user);
        if (beforeSignIn && afterSignIn) {
            beforeSignIn.classList.add("hidden");
            afterSignIn.classList.add("inline-flex");
            afterSignIn.classList.remove("hidden");
        }
    } else {
        if (beforeSignIn && afterSignIn) {
            beforeSignIn.classList.remove("hidden");
            afterSignIn.classList.remove("inline-flex");
            afterSignIn.classList.add("hidden");
        }
    }
});

// Hiển thị tên user lên auth-dropdown-menu và profile-dashboard
function showUserGreeting(userGreetings, user) {
    const displayName = user.displayName;
    if (displayName) {
        const userFirstName = displayName.split(" ")[0];
        Array.from(userGreetings).forEach((e) => {
            e.textContent += ` ${userFirstName}`;
        });
    }
}
