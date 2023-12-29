// Hiển thị modal mã QR thanh toán cho gói subscription mỗi khi click vào nút Sign Up

// Modal mã QR cho gói Startup
document.getElementById("sign-up-button-1").addEventListener("click", (e) => {
    e.preventDefault();

    // Tạo tag <div> làm nền mờ cho modal
    let backdrop = document.createElement("div");
    backdrop.classList.add("fixed", "inset-0", "bg-gray-500", "bg-opacity-40", "flex", "justify-center", "items-center", "z-100");

    // Tạo tag <div> để chứa modal - là nơi hiển thị mã QR
    let modal = document.createElement("div");
    modal.classList.add("m-4", "p-2", "bg-white", "shadow-2xl", "rounded-lg");

    // Tạo tag <img> để chứa mã QR sẽ được hiển thị trong modal
    let modalQR = document.createElement("img");
    modalQR.src = "../images/pricing-qr/qr-startup.jpg";
    modalQR.classList.add("max-h-[60vh]", "max-w-[60vw]", "overflow-hidden");

    // Handle event click ra ngoài ảnh (hay click vào backdrop) sẽ ẩn mã QR
    backdrop.onclick = function (e) {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    };

    // Thêm tag <img> modalQR vào tag <div> modal
    modal.appendChild(modalQR);

    // Thêm tag <div> modal vào tag <div> backdrop
    backdrop.appendChild(modal);

    // Thêm tag <div> backdrop vào phần <body> file 'dashboard.html'
    document.body.appendChild(backdrop);
});

// Modal mã QR cho gói Teams
document.getElementById("sign-up-button-2").addEventListener("click", (e) => {
    e.preventDefault();

    // Tạo tag <div> làm nền mờ cho modal
    let backdrop = document.createElement("div");
    backdrop.classList.add("fixed", "inset-0", "bg-gray-500", "bg-opacity-40", "flex", "justify-center", "items-center", "z-100");

    // Tạo tag <div> để chứa modal - là nơi hiển thị mã QR
    let modal = document.createElement("div");
    modal.classList.add("m-4", "p-2", "bg-white", "shadow-2xl", "rounded-lg");

    // Tạo tag <img> để chứa mã QR sẽ được hiển thị trong modal
    let modalQR = document.createElement("img");
    modalQR.src = "../images/pricing-qr/qr-teams.jpg";
    modalQR.classList.add("max-h-[60vh]", "max-w-[60vw]", "overflow-hidden");

    // Handle event click ra ngoài ảnh (hay click vào backdrop) sẽ ẩn mã QR
    backdrop.onclick = function (e) {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    };

    // Thêm tag <img> modalQR vào tag <div> modal
    modal.appendChild(modalQR);

    // Thêm tag <div> modal vào tag <div> backdrop
    backdrop.appendChild(modal);

    // Thêm tag <div> backdrop vào phần <body> file 'dashboard.html'
    document.body.appendChild(backdrop);
});

// Modal mã QR cho gói Enterprises
document.getElementById("sign-up-button-3").addEventListener("click", (e) => {
    e.preventDefault();

    // Tạo tag <div> làm nền mờ cho modal
    let backdrop = document.createElement("div");
    backdrop.classList.add("fixed", "inset-0", "bg-gray-500", "bg-opacity-40", "flex", "justify-center", "items-center", "z-100");

    // Tạo tag <div> để chứa modal - là nơi hiển thị mã QR
    let modal = document.createElement("div");
    modal.classList.add("m-4", "p-2", "bg-white", "shadow-2xl", "rounded-lg");

    // Tạo tag <img> để chứa mã QR sẽ được hiển thị trong modal
    let modalQR = document.createElement("img");
    modalQR.src = "../images/pricing-qr/qr-enterprises.jpg";
    modalQR.classList.add("max-h-[60vh]", "max-w-[60vw]", "overflow-hidden");

    // Handle event click ra ngoài ảnh (hay click vào backdrop) sẽ ẩn mã QR
    backdrop.onclick = function (e) {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    };

    // Thêm tag <img> modalQR vào tag <div> modal
    modal.appendChild(modalQR);

    // Thêm tag <div> modal vào tag <div> backdrop
    backdrop.appendChild(modal);

    // Thêm tag <div> backdrop vào phần <body> file 'dashboard.html'
    document.body.appendChild(backdrop);
});
