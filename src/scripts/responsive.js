"use strict";

let isHamburgerOpen = false;

// Handle hamburger khi chuyển qua lại giữa các kích thước màn hình
function handleHamburger() {
    let hamburger = document.querySelectorAll(".lucide-menu");
    let close = document.querySelectorAll(".lucide-x");

    if (window.innerWidth >= 1024) {
        Array.from(hamburger).forEach((e) => {
            e.style.display = "none";
        });
        Array.from(close).forEach((e) => {
            e.style.display = "none";
        });
    } else if (window.innerWidth < 1024 && isHamburgerOpen == true) {
        Array.from(hamburger).forEach((e) => {
            e.style.display = "none";
        });
        Array.from(close).forEach((e) => {
            e.style.display = "block";
        });
    } else if (window.innerWidth < 1024 && isHamburgerOpen == false) {
        Array.from(hamburger).forEach((e) => {
            e.style.display = "block";
        });
        Array.from(close).forEach((e) => {
            e.style.display = "none";
        });
    }
}
window.addEventListener("resize", handleHamburger);
handleHamburger();

// Thay đổi hamburger icon khi responsive header
function onClickHamburger(e) {
    let hamburger = document.querySelectorAll(".lucide-menu");
    let close = document.querySelectorAll(".lucide-x");
    let navBarItems = document.querySelector(".navbar-items");

    if (e.classList.contains("lucide-menu")) {
        Array.from(hamburger).forEach((e) => {
            e.style.display = "none";
        });
        Array.from(close).forEach((e) => {
            e.style.display = "block";
        });
        navBarItems.classList.remove("hidden");
        navBarItems.classList.add("flex");
        isHamburgerOpen = true;
    } else {
        Array.from(hamburger).forEach((e) => {
            e.style.display = "block";
        });
        Array.from(close).forEach((e) => {
            e.style.display = "none";
        });
        navBarItems.classList.remove("flex");
        navBarItems.classList.add("hidden");
        isHamburgerOpen = false;
    }
}
