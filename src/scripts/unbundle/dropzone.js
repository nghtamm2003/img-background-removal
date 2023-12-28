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
import { getStorage, ref, uploadBytes } from "firebase/storage";

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

// Nhận hình ảnh được upload từ thiết bị của người dùng
function retrieveImages() {
    let fileType = file.type;
    let validType = ["image/jpeg", "image/jpg", "image/png"];
    if (validType.includes(fileType)) {
        fileReader.onload = () => {
            // Hiển thị hình ảnh đã nhận được vào trong Dropzone
            let fileURL = fileReader.result;
            let imgTag = `<img class="upload-img rounded-lg" src="${fileURL}" alt="">`;
            dropzone.innerHTML = imgTag;

            // Lấy thông tin về tên file ảnh
            let originalName = file.name.split(".").slice(0, -1).join("."); // Tách phần mở rộng ra khỏi tên file
            downloadImage.setAttribute("image-original-name", originalName);
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
    // Xử lý loader khi nhấn nút Remove Background
    let loader = document.querySelector(".loader");
    loader.classList.remove("loader--hidden");
    setTimeout(() => {
        loader.classList.add("loader--hidden");
        downloadButton.classList.remove("hidden");
        saveButton.classList.remove("hidden");
    }, 2000);

    // Xử lý chuỗi các event khi thực hiện call API
    formData.append("image_file", file); // Khởi tạo formData
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
                // Download ảnh đã xóa background về máy
                let originalName = downloadImage.getAttribute("image-original-name");
                let newName = originalName ? `${originalName}-background-removed` : "background-removed";
                downloadImage.setAttribute("download", newName); // Đặt lại tên cho ảnh đã xóa background
                downloadImage.setAttribute("href", fileReader.result);

                // Handle event click vào nút Save to Gallery
                saveButton.addEventListener("click", async () => {
                    // Kiểm tra state và khởi tạo userID, storageRef (nếu state là logged-in)
                    const user = await getCurrentUID(auth);
                    if (user) {
                        // Lấy thông về tên file ảnh sau khi xóa nền
                        const fileExtension = file.name.split(".").pop();
                        let fileType = file.type;
                        const newFile = new File([blob], `${newName}.${fileExtension}`, { type: fileType });

                        // Khởi tạo userID và storageRef
                        const userID = user.uid;
                        const storageRef = ref(storage, `${userID}/${newFile.name}`);

                        // Upload ảnh lên Firebase Cloud Storage
                        uploadBytes(storageRef, newFile).then((snapshot) => {
                            window.alert("Đã lưu ảnh vào bộ sưu tập cá nhân!");
                        });
                    } else {
                        window.alert("Bạn phải đăng nhập để sử dụng tính năng này!");
                    }
                });
            };
        });
});

// Lựa chọn ảnh khác để xóa background
retryButton.addEventListener("click", () => {
    window.location.reload();
});
