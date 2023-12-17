let isHamburgerOpen = false;

// Handle hamburger khi chuyển qua lại giữa các kích thước màn hình
function handleHamburger() {
    let hamburger = document.querySelector(".lucide-menu");
    let close = document.querySelector(".lucide-x");

    if (window.innerWidth >= 1024) {
        hamburger.style.display = "none";
        close.style.display = "none";
    } else if (window.innerWidth < 1024 && isHamburgerOpen == true) {
        hamburger.style.display = "none";
        close.style.display = "block";
    } else if (window.innerWidth < 1024 && isHamburgerOpen == false) {
        hamburger.style.display = "block";
        close.style.display = "none";
    }
}
window.addEventListener("resize", handleHamburger);
handleHamburger();

// Thay đổi hamburger icon khi responsive header
function onClickHamburger(e) {
    let hamburger = document.querySelector(".lucide-menu");
    let close = document.querySelector(".lucide-x");
    let navBarItems = document.querySelector(".navbar-items");

    if (e.classList.contains("lucide-menu")) {
        hamburger.style.display = "none";
        close.style.display = "block";
        navBarItems.classList.remove("hidden");
        navBarItems.classList.add("flex");
        isHamburgerOpen = true;
    } else {
        hamburger.style.display = "block";
        close.style.display = "none";
        navBarItems.classList.remove("flex");
        navBarItems.classList.add("hidden");
        isHamburgerOpen = false;
    }
}
