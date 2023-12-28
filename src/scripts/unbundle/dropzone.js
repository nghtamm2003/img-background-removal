"use strict";

// Khai báo các biến
let file;
let fileReader = new FileReader();
let formData = new FormData();

let dropzone = document.querySelector(".dropzone");
let droptext = dropzone.querySelector(".droptext");
let button = dropzone.querySelector("button");
let input = dropzone.querySelector("input");

const API_URL = "https://api.remove.bg/v1.0/removebg"; // Địa chỉ API của remove.bg
const API_KEY = "J5dHJCP2Yu9bokrx8B1tXptr"; // API Key

let removeButton = document.querySelector(".remove-button");
let retryButton = document.querySelector(".retry-button");
let downloadImage = document.getElementById("download-img");
let downloadButton = document.querySelector(".download-button");
let saveButton = document.querySelector(".save-button");

// Import Firebase vào dự án
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);

// Kiểm tra state của tài khoản (logged-in hay logged-out)
function getCurrentUID(auth) {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

// Nhận hình ảnh được upload từ thiết bị của user
function retrieveImages() {
    let fileType = file.type;
    let validType = ["image/jpeg", "image/jpg", "image/png"];
    if (validType.includes(fileType)) {
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img class="upload-img rounded-lg" src="${fileURL}" alt="">`;
            dropzone.innerHTML = imgTag;
            let downloadHREF = document.getElementById("download-img");
            let originalName = file.name.split(".").slice(0, -1).join("."); // Tách phần mở rộng ra khỏi tên file
            downloadHREF.setAttribute("data-original-name", originalName);
        };
        fileReader.readAsDataURL(file);
    } else {
        window.alert("Tập tin upload phải là hình ảnh!");
    }
}

// Handle event drag ảnh lên trên dropzone
dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    droptext.textContent = "Release to Upload Image";
});

// Handle event drag ảnh ra ngoài dropzone
dropzone.addEventListener("dragleave", () => {
    droptext.textContent = "Drag & Drop to Upload Image";
});

// Handle event drop ảnh vào dropzone
dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    retrieveImages();
});

// Handle event upload ảnh thông qua button
button.onclick = () => {
    input.click();
};
input.addEventListener("change", function () {
    file = this.files[0];
    retrieveImages();
});

// Thực hiện xóa background ảnh
removeButton.addEventListener("click", () => {
    // Xử lý loader
    const loader = document.querySelector(".loader");
    loader.classList.remove("loader--hidden");
    setTimeout(() => {
        loader.classList.add("loader--hidden");
        downloadButton.classList.remove("hidden");
        saveButton.classList.remove("hidden");
    }, 2000);

    formData.append("image_file", file);
    fetch(API_URL, {
        method: "POST",
        headers: {
            "X-Api-Key": API_KEY,
        },
        body: formData,
    })
        .then((res) => res.blob())
        .then((blob) => {
            fileReader.readAsDataURL(blob);
            fileReader.onloadend = () => {
                let originalName = downloadImage.getAttribute('data-original-name');
                let newName = originalName ? `${originalName}-background-removed` : 'background-removed';
                downloadImage.setAttribute('download', newName); // Đặt lại tên cho ảnh đã xóa background
                downloadImage.setAttribute('href', fileReader.result); // Download ảnh đã xóa background về máy
            };
        });
});

// Lựa chọn ảnh khác để xóa background
retryButton.addEventListener("click", () => {
    window.location.reload();
});
