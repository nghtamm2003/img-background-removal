// Thay đổi hamburger icon khi responsive heaader
function onClickHamburger(e) {
    let hamburger = document.querySelector(".lucide-menu");
    let close = document.querySelector(".lucide-x");
    let navBarItems = document.querySelector(".navbar-items");

    if (e.classList.contains("lucide-menu")) {
        hamburger.style.display = "none";
        close.style.display = "block";
        navBarItems.classList.remove("hidden");
        navBarItems.classList.add("flex");
    } else {
        hamburger.style.display = "block";
        close.style.display = "none";
        navBarItems.classList.remove("flex");
        navBarItems.classList.add("hidden");
    }
}
