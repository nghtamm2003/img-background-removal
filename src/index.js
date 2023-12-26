"use strict";

// Import Firebase vào dự án
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleButton = document.getElementById("google");
const emailSignUp = document.getElementById("email-sign-up");
const passwordSignUp = document.getElementById("password-sign-up");
const emailSignIn = document.getElementById("email-sign-in");
const passwordSignIn = document.getElementById("password-sign-in");
const signUpButton = document.getElementById("sign-up-button");
const signInButton = document.getElementById("sign-in-button");

if (signUpButton) {
    signUpButton.addEventListener("click", (e) => {
        e.preventDefault();
        authCreateAccountWithEmail();
    });
}

if (signInButton) {
    signInButton.addEventListener("click", (e) => {
        e.preventDefault();
        authSignInWithEmail();
    });
}

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
