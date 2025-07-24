// Set tài khoản mật khẩu cố định trên localStorage
const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
//ban đầu sẽ có 1 tài khoản và 1 giỏ hàng cố định để test chức năng đăng nhập
if (users.length === 0) {
    users.push({ username: "loi@gmail.com", password: "password1", fullname: "Nguyễn Huy Lợi" });
    localStorage.setItem("cart0", JSON.stringify([]));
}
localStorage.setItem("users", JSON.stringify(users));
if (!localStorage.getItem("logined")) {
    localStorage.setItem("logined", "-1");
}
function handleShowNav() {
    let ss_nav = document.querySelector(".small-screen-nav");
    ss_nav.style.display = "block";
}

function handleHideNav() {
    let ss_nav = document.querySelector(".small-screen-nav");
    ss_nav.style.display = "none";
}

// Trong file header.js hoặc file script chung
function handleOpenCart() {
    if (Number(localStorage.getItem("logined")) === -1) {
        alert("Bạn cần đăng nhập để vào giỏ hàng");
    } else {
        // Chỉ chuyển trang, không render gì ở đây cả
        window.location.href = "cart.html";
    }
}

let logined = Number(localStorage.getItem("logined"));
if (logined != -1) {
    let nav_login = document.querySelector(".nav__list-item--login");
    let user = JSON.parse(localStorage.getItem("users"))[logined] || { fullname: "User" };
    nav_login.innerHTML = ` <span class="nav__username">${user.fullname}</span>
                            <i class="nav__user-icon fa-solid fa-circle-user"></i>`;

    document.querySelector(".ss-nav__list-item--register").style.display = "none";
    document.querySelector(".ss-nav__list-item--login").style.display = "none";
}
