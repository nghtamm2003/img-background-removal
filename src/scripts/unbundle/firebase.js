"use strict";

// Import Firebase vào dự án
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

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
const storage = getStorage(app);

// Set luật cho Firebase Cloud Storage (Firebase > Storage > Rules)
/* START
rules_version = '2';
service firebase.storage {
    match /b/{bucket}/o {
        match /{userId}/{allPaths=**} {
            allow read, write: if request.auth != null && request.auth.uid == userId;
        }
    }
}
END */

// Khai báo các biến
let googleButton = document.getElementById("google");

let emailSignUp = document.getElementById("email-sign-up");
let passwordSignUp = document.getElementById("password-sign-up");
let displayName = document.getElementById("name-sign-up");
let signUpButton = document.getElementById("sign-up-button");

let emailSignIn = document.getElementById("email-sign-in");
let passwordSignIn = document.getElementById("password-sign-in");
let signInButton = document.getElementById("sign-in-button");

let signOutButton = document.getElementsByClassName("sign-out-button");

let beforeSignIn = document.getElementById("before-sign-in");
let afterSignIn = document.getElementById("after-sign-in");
let userGreetings = document.getElementsByClassName("user-greetings");

let imagesList = document.getElementById("img-list");

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
            if (window.location.pathname === "/src/index.html") {
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

// Hàm khởi tạo một Promise để kiểm tra state của tài khoản (logged-in hay logged-out)
function getCurrentUID(auth) {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                unsubscribe();
                resolve(user);
            },
            reject
        );
    });
}

// Kiểm tra userID của người dùng hiện tại và list tất cả các hình ảnh đã được upload lên gallery của người đó
async function listAllImages() {
    // Kiểm tra state và khởi tạo userID, storageRef (nếu state là logged-in)
    const user = await getCurrentUID(auth);
    if (user) {
        // Khởi tạo userID và storageRef
        const userID = user.uid;
        const storageRef = ref(storage, `${userID}/`);

        // List tất cả các hình ảnh từ storageRef
        listAll(storageRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    // Gọi hàm để hiển thị hình ảnh và getDownloadURL
                    displayImagesAndGetDownloadURL(itemRef);
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
}

// Thực hiện listAll hình ảnh từ storageRef
listAllImages();

// Hiển thị tất cả các hình ảnh đã được list từ folder người dùng và lấy { metadata, downloadURL } của từng hình ảnh đó
function displayImagesAndGetDownloadURL(itemRef) {
    getMetadata(itemRef)
        .then((metadata) => {
            getDownloadURL(itemRef)
                .then((url) => {
                    if (imagesList) {
                        // Tạo tag <div> để chứa thông tin file ảnh sử dụng metadata và chứa các nút Preview, Download
                        let item = document.createElement("div");
                        item.classList.add("flex", "flex-row", "justify-between", "items-center", "p-2", "border-b", "gap-10");

                        // Tạo tag <div> chứa thông tin cho từng file ảnh
                        let itemInformation = document.createElement("div");
                        itemInformation.classList.add("overflow-hidden", "text-ellipsis", "whitespace-nowrap");

                        // Tạo tag <p> chứa tên file ảnh
                        let imageName = document.createElement("p");
                        imageName.innerText = metadata.name;
                        imageName.classList.add("[text-wrap:balance]");

                        // Tạo tag <p> chứa thông tin thời điểm upload file ảnh
                        let imageDate = document.createElement("p");
                        imageDate.innerText = new Date(metadata.updated).toLocaleDateString();
                        imageDate.classList.add("[text-wrap:balance]");

                        // Thêm 2 tag <p> imageName và imageDate vào tag <div> itemInformation
                        itemInformation.appendChild(imageName);
                        itemInformation.appendChild(imageDate);

                        // Tạo tag <div> chứa các nút Preview và Download
                        let buttonsGroup = document.createElement("div");
                        buttonsGroup.classList.add("flex", "flex-row", "justify-center", "items-center", "space-x-10");

                        // Tạo tag <button> chứa nút Preview
                        let previewButton = document.createElement("button");
                        previewButton.innerText = "Preview";
                        previewButton.classList.add("text-black", "text-opacity-100", "font-semibold", "hover:text-opacity-60");
                        previewButton.onclick = () => {
                            // Tạo tag <div> làm nền mờ cho modal
                            let backdrop = document.createElement("div");
                            backdrop.classList.add("fixed", "inset-0", "bg-gray-500", "bg-opacity-40", "flex", "justify-center", "items-center", "z-100");

                            // Tạo tag <div> để chứa modal - là nơi hiển thị hình ảnh preview
                            let modal = document.createElement("div");
                            modal.classList.add("m-4", "p-2", "bg-white", "shadow-2xl", "rounded-lg");

                            // Tạo tag <img> để chứa hình ảnh sẽ được hiển thị trong modal
                            let modalImage = document.createElement("img");
                            modalImage.src = url;
                            modalImage.classList.add("max-h-full", "max-w-full", "overflow-hidden");

                            // Handle event click ra ngoài ảnh (hay click vào backdrop) sẽ tắt preview
                            backdrop.onclick = function (event) {
                                if (event.target === backdrop) {
                                    backdrop.remove();
                                }
                            };

                            // Thêm tag <img> modalImage vào tag <div> modal
                            modal.appendChild(modalImage);

                            // Thêm tag <div> modal vào tag <div> backdrop
                            backdrop.appendChild(modal);

                            // Thêm tag <div> backdrop vào phần <body> file 'dashboard.html'
                            document.body.appendChild(backdrop);
                        };

                        // Tạo tag <button> chứa nút Download
                        let downloadButton = document.createElement("button");
                        downloadButton.innerText = "Download";
                        downloadButton.classList.add("text-emerald-700", "text-opacity-100", "font-semibold", "hover:text-opacity-60");
                        downloadButton.onclick = () => window.open(url);

                        // Thêm 2 tag <button> previewButton và downloadButton vào tag <div> buttonsGroup
                        buttonsGroup.appendChild(previewButton);
                        buttonsGroup.appendChild(downloadButton);

                        // Thêm 2 tag <div> itemInformation và buttonsGroup vào tag <div> item
                        item.appendChild(itemInformation);
                        item.appendChild(buttonsGroup);

                        // Thêm tag <div> item vào tag <div> 'img-list' có sẵn trong 'dashboard.html'
                        imagesList.appendChild(item);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        })
        .catch((error) => {
            console.log(error.message);
        });
}
