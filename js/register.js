// register.js

// Chờ cho trang web tải xong hoàn toàn
document.addEventListener("DOMContentLoaded", function () {
    // Lấy form đăng ký
    const registerForm = document.querySelector(".register__form");

    // Hàm kiểm tra họ tên hợp lệ
    function validateFullName(fullname) {
        const regex = /^[a-zA-ZÀ-ỹ\s]+$/; // Chỉ cho phép chữ cái và khoảng trắng
        return regex.test(fullname) && fullname.length >= 3; // Ít nhất 3 ký tự
    }

    // Hàm kiểm tra email hợp lệ
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email cơ bản
        return regex.test(email);
    }

    // Hàm kiểm tra số điện thoại Việt Nam hợp lệ
    function validatePhone(phone) {
        const regex = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/;
        return regex.test(phone);
    }

    // Hàm kiểm tra mật khẩu mạnh
    function validatePassword(password) {
        // Ít nhất 8 ký tự, có chữ hoa, chữ thường và số
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
    }

    // Hàm hiển thị thông báo lỗi
    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector(".error-message");

        // Nếu đã có thông báo lỗi thì cập nhật nội dung
        if (error) {
            error.textContent = message;
        } else {
            // Tạo thông báo lỗi mới
            const errorElement = document.createElement("small");
            errorElement.className = "error-message";
            errorElement.style.color = "red";
            errorElement.textContent = message;
            formGroup.appendChild(errorElement);
        }

        // Đổi màu viền sang đỏ
        input.style.borderColor = "red";
        input.classList.remove("valid"); // Xóa lớp hợp lệ nếu có
    }

    // Hàm hiển thị trường nhập hợp lệ
    function showValid(input) {
        clearError(input); // Xóa thông báo lỗi nếu có
        input.style.borderColor = "#4CAF50"; // Đổi màu viền sang xanh lá
        input.classList.add("valid"); // Thêm lớp hợp lệ
    }

    // Hàm xóa thông báo lỗi
    function clearError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector(".error-message");

        // Xóa thông báo lỗi nếu tồn tại
        if (error) {
            error.remove();
        }

        // Chỉ đặt lại viền nếu không phải trường hợp lệ
        if (!input.classList.contains("valid")) {
            input.style.borderColor = "#444";
        }
    }

    // Thêm sự kiện kiểm tra khi rời khỏi trường (blur) và khi đang nhập (input)
    registerForm.querySelectorAll("input").forEach((input) => {
        input.addEventListener("blur", function () {
            validateField(this);
        });

        input.addEventListener("input", function () {
            // Chỉ kiểm tra khi đã từng rời khỏi trường hoặc đã nhập đủ dài
            if (this.dataset.touched === "true" || this.value.length > 3) {
                validateField(this);
            }
        });

        // Đánh dấu trường đã được chạm vào
        input.addEventListener("blur", function () {
            this.dataset.touched = "true";
        });
    });

    // Hàm kiểm tra một trường cụ thể
    function validateField(input) {
        const value = input.value.trim();
        const id = input.id;

        clearError(input);

        // Kiểm tra trường bắt buộc
        if (value === "") {
            showError(input, "Yêu cầu nhập thông tin");
            return false;
        }

        let isValid = true;

        // Kiểm tra theo từng loại trường
        switch (id) {
            case "fullname":
                if (!validateFullName(value)) {
                    showError(input, "Họ tên phải có ít nhất 3 ký tự và không chứa số");
                    isValid = false;
                }
                break;
            case "email":
                if (!validateEmail(value)) {
                    showError(input, "Email không hợp lệ");
                    isValid = false;
                }
                break;
            case "phone":
                if (!validatePhone(value)) {
                    showError(input, "Số điện thoại không hợp lệ");
                    isValid = false;
                }
                break;
            case "username":
                if (!validateUsername(value)) {
                    showError(input, "Tên đăng nhập phải có ít nhất 5 ký tự và không chứa khoảng trắng");
                    isValid = false;
                }
                break;
            case "password":
                if (!validatePassword(value)) {
                    showError(input, "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số");
                    isValid = false;
                }
                break;
            case "confirm-password":
                const password = registerForm.querySelector("#password").value;
                if (value !== password) {
                    showError(input, "Mật khẩu không khớp");
                    isValid = false;
                }
                break;
        }

        // Nếu hợp lệ thì hiển thị trạng thái hợp lệ
        if (isValid) {
            showValid(input);
        }

        return isValid;
    }

    // Kiểm tra mật khẩu nhập lại khớp ngay khi đang nhập
    const passwordInput = registerForm.querySelector("#password");
    const confirmPasswordInput = registerForm.querySelector("#confirm-password");

    confirmPasswordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        const confirmPassword = this.value;

        // Bỏ qua nếu chưa nhập gì
        if (confirmPassword === "") {
            clearError(this);
            return;
        }

        // Kiểm tra khớp mật khẩu
        if (confirmPassword !== password) {
            showError(this, "Mật khẩu không khớp");
        } else {
            showValid(this);
        }
    });

    // Xử lý khi gửi form
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Ngăn form gửi đi mặc định

        // Kiểm tra tất cả trường trước khi gửi
        let isValid = true;

        // Kiểm tra các trường bắt buộc
        registerForm.querySelectorAll("[required]").forEach((input) => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        // Nếu tất cả đều hợp lệ thì gửi form
        if (isValid) {
            // Trong thực tế sẽ gửi dữ liệu lên server ở đây
            // Đây chỉ là demo hiển thị thông báo thành công
            //thêm user mới vào localStorage
            let email = registerForm.querySelector("#email").value;
            let pass = registerForm.querySelector("#password").value;
            let fullname = registerForm.querySelector("#fullname").value;
            let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
            users.push({ username: email, password: pass, fullname: fullname });
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem(`cart${users.length - 1}`, JSON.stringify([]));

            // Vô hiệu hóa nút gửi để tránh gửi nhiều lần
            const submitButton = registerForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = "Đang xử lý...";

            // Giả lập gọi API
            setTimeout(() => {
                alert("Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.");
                window.location.href = "log_in.html";
            }, 1500);
        }
    });

    // Hiển thị độ mạnh mật khẩu
    passwordInput.addEventListener("input", function () {
        const strengthIndicator = document.createElement("div");
        strengthIndicator.className = "password-strength";

        const strengthText = document.createElement("small");
        strengthText.className = "strength-text";

        const password = this.value;
        let strength = 0;

        // Kiểm tra độ dài
        if (password.length >= 8) strength++;

        // Kiểm tra chữ hoa
        if (/[A-Z]/.test(password)) strength++;

        // Kiểm tra số
        if (/\d/.test(password)) strength++;

        // Kiểm tra ký tự đặc biệt
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        // Xác định mức độ mạnh
        let text = "";
        let color = "";

        switch (strength) {
            case 0:
            case 1:
                text = "Yếu";
                color = "red";
                break;
            case 2:
                text = "Trung bình";
                color = "orange";
                break;
            case 3:
                text = "Mạnh";
                color = "green";
                break;
            case 4:
                text = "Rất mạnh";
                color = "darkgreen";
                break;
        }

        strengthText.textContent = `Mức độ mật khẩu: ${text}`;
        strengthText.style.color = color;

        // Thêm hoặc cập nhật chỉ báo độ mạnh
        const existingIndicator = this.parentElement.querySelector(".password-strength");
        if (existingIndicator) {
            existingIndicator.querySelector(".strength-text").textContent = strengthText.textContent;
            existingIndicator.querySelector(".strength-text").style.color = color;
        } else {
            strengthIndicator.appendChild(strengthText);
            this.parentElement.appendChild(strengthIndicator);
        }
    });
});
