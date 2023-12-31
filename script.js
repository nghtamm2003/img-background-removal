const DropArea = document.querySelector(".drag-area");
dragText = DropArea.querySelector("header");
button = DropArea.querySelector("button");
input = DropArea.querySelector("input");
let file;

button.onclick = () => {
    input.click();
};

input.addEventListener("change", function () {
    file = this.files[0];
    DropArea.classList.add("active");
    showFile();
});

DropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    DropArea.classList.add("active");
    dragText.textContent = "Release to Upload Image";
});

DropArea.addEventListener("dragleave", () => {
    DropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload Image";
});

DropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
});

function showFile() {
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="image">`;
            DropArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image file");
        DropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}