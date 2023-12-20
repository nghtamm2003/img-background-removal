// Khai báo các biến
let file;
let fileReader = new FileReader();
let formData = new FormData();

const dropzone = document.querySelector(".dropzone");
droptext = dropzone.querySelector(".droptext");
button = dropzone.querySelector("button");
input = dropzone.querySelector("input");

const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "J5dHJCP2Yu9bokrx8B1tXptr";

let removeButton = document.querySelector(".remove-button");
let retryButton = document.querySelector(".retry-button");
let downloadImage = document.getElementById("download-img");
let downloadButton = document.querySelector(".download-button");
let saveButton = document.querySelector(".save-button");

// Nhận hình ảnh được upload từ thiết bị của user
function retrieveImages() {
    let fileType = file.type;
    let validType = ["image/jpeg", "image/jpg", "image/png"];
    if (validType.includes(fileType)) {
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img class="upload-img rounded-lg" src="${fileURL}" alt="">`;
            dropzone.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    } else {
        window.alert("It must be an image!");
    }
}

// Handle sự kiện drag ảnh lên trên dropzone
dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    droptext.textContent = "Release to Upload Image";
});

// Handle sự kiện drag ảnh ra ngoài dropzone
dropzone.addEventListener("dragleave", () => {
    droptext.textContent = "Drag & Drop to Upload Image";
});

// Handle sự kiện drop ảnh vào dropzone
dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    retrieveImages();
});

// Handle sự kiện upload ảnh thông qua button
button.onclick = () => {
    input.click();
};
input.addEventListener("change", function () {
    file = this.files[0];
    retrieveImages();
});

// Thực hiện xóa background ảnh
removeButton.addEventListener("click", () => {
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
                downloadImage.setAttribute("href", fileReader.result); // Download ảnh đã xóa background về máy
            };
        });
});

// Lựa chọn ảnh khác để xóa background
retryButton.addEventListener("click", () => {
    window.location.reload();
});
