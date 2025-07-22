/* Tác giả: Nguyễn Huy Lợi MSSV: B2306556 */
/* <!-- Tài liệu tham khảo: Tài liệu thực hành thầy Vũ Duy Linh --> */

// Set tài khoản mật khẩu cố định trên localStorage
if (!localStorage.getItem('users')) {
    const users = [
        { username: 'loi@gmail.com', password: 'password1' }
    ]
    localStorage.setItem('users', JSON.stringify(users));
}

// hàm tìm tổ tiên có lớp form__line
function findAncentor(elmt) {
    while (elmt.parentElement !== elmt) {
        elmt = elmt.parentElement;
        if (elmt.classList[0] == "form__line") {
            break;
        }
    }
    return elmt;
}

// thông điệp khi hợp lệ của 1 input
function successMessage(elmt) {
    const formLine = findAncentor(elmt);
    if (formLine.classList.contains("error")) {
        formLine.classList.remove("error");
        formLine.classList.add("success");
    } else {
        formLine.classList.add('success');
    }
    formLine.querySelector("INPUT").classList.add("valid");
    formLine.querySelector(".message").innerHTML = "";
}

// thông điệp khi không hợp lệ của 1 input
function errorMessage(elmt, message) {
    const formLine = findAncentor(elmt);
    if (formLine.classList.contains("success")) {
        formLine.classList.remove("success");
        formLine.classList.add("error");
    } else {
        formLine.classList.add('error');
    }
    formLine.querySelector(".message").innerHTML = message;
}

//kiểm tra biểu thức quy chuẩn của email
function validateEmail(email) {
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(String(email).toLowerCase());
}


// kiểm tra sự hợp lệ của email
function checkEmail(elmt) {
    if (elmt.value === "") {
        errorMessage(elmt, "Trường này không thể bỏ trống.");
    } else if (!validateEmail(elmt.value)) {
        errorMessage(elmt, "Không đúng định dạng email.");
    } else {
        successMessage(elmt);
    }

}

// kiểm tra sự hợp lệ của password
function checkPw(elmt) {
    if (elmt.value === "") {
        errorMessage(elmt, "Trường này không thể bỏ trống.");
    } else if (elmt.value.length < 8) {
        errorMessage(elmt, "Mật khẩu ít nhất 8 kí tự.");
    } else {
        successMessage(elmt);
    }

}

//dự định cải tiến nhưng không còn thời gian
// function turnOff(elmt) {
//     const formLine = findAncentor(elmt);
//     formLine.className = "form__line";
//     formLine.querySelector(".message").innerHTML = "";
// }


// lấy các thẻ cần nghe sự kiên
const logInForm = document.getElementById("log-in-form");
const elEmail = document.getElementById("email");
// console.log(elEmail);
const elPw = document.getElementById("pw");

//gán lắng nghe sự kiện
elEmail.addEventListener("blur", () => {
    checkEmail(elEmail);
}, false);

elEmail.addEventListener("input", () => {
    checkEmail(elEmail);
}, false);

elPw.addEventListener("blur", () => {
    checkPw(elPw);
}, false);

elPw.addEventListener("input", () => {
    checkPw(elPw);
}, false);


logInForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    var valid = true;
    var formLines = logInForm.querySelectorAll(".form__line");
    var arrformLines = Array.from(formLines);
    arrformLines.pop();
    arrformLines.forEach(item => {
        if (!item.classList.contains("success")) {
            valid = false;
        }
    });

    if (valid) {
        var logINSuccess = false;
        if (localStorage.getItem('users')) {
            var users = JSON.parse(localStorage.getItem('users'));
            // nên dùng for in hoặc of để break khi true
            users.forEach(item => {
                var email = document.getElementById("email").value;
                var pw = document.getElementById("pw").value;
                if (item.username === email && item.password === pw) {
                    logINSuccess = true;
                }
            })
        }
        if (logINSuccess) {
            alert("Đăng nhập thành công!");
            // chuyển sang trang chủ khi đăng nhập thành công
            window.location.href = "index.html";
        } else {
            alert("Email hoặc mật khẩu không đúng.");
        }

    } else {
        alert("Vui lòng nhập đúng thông tin đăng nhập.");
    }
})

// JS cho con mắt ẩn hiện mặt khẩu
const eye = document.getElementById("eye");

eye.addEventListener("click", () => {
    // kiểm tra type của password hiện hành và đặt type mới
    const type = elPw.type === "password" ? "text" : "password";
    elPw.setAttribute("type", type);

    //chuyển đổi giữa 2 icon khi có click
    eye.classList.toggle("fa-eye");
    eye.classList.toggle("fa-eye-slash");

})