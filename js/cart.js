console.log(localStorage);
console.log("cart");
console.log(cartListProduct);

// xử lý bỏ chọn sản phẩm khi có sự thay đổi
function unChecked(item) {
    //item = li
    let checkbox = item.querySelector(".cart__item-checkbox");
    if (checkbox.checked == true) {
        checkbox.checked = false;
        handleChoose(checkbox);
    }
}

// xử lý sự kiện nhấn chọn sản phẩm
// hàm nhận vào 1 tag <input> để có thể tái sử dụng cho phần edit và xóa sản phẩm
function handleChoose(target) {
    function increaseOderSummary(price, discount, quantity) {
        // console.log(price, discount, quantity);
        let cartSummary = document.querySelector(".cart__summary");
        let summaryQuantity = cartSummary.querySelector(".summary__quantity");
        let summarySave = cartSummary.querySelector(".summary__save");
        let summaryTotal = cartSummary.querySelector(".summary__total");
        let summaryFinalPrice = cartSummary.querySelector(".summary__final-price");

        discount = discount * quantity * price + parseFloat(summarySave.getAttribute("value"));
        price = price * quantity * (quantity < 0 ? -1 : 1) + parseFloat(summaryTotal.getAttribute("value"));
        quantity += parseFloat(summaryQuantity.innerText);

        // sửa nội dung của tag
        summaryQuantity.innerText = quantity;
        summarySave.innerText = Number(discount).toLocaleString("vi-VN") + "₫";
        summaryTotal.innerText = Number(price).toLocaleString("vi-VN") + "₫";
        summaryFinalPrice.innerText = Number(price - discount).toLocaleString("vi-VN") + "₫";

        // Đặt lại thuộc tính Attribute của price và save
        summaryTotal.setAttribute("value", price);
        summarySave.setAttribute("value", discount);
    }

    let item = target.closest("li");

    let itemPrice = parseFloat(item.querySelector("#cart__product-old-price").getAttribute("value"));
    let itemDiscount = parseFloat(item.querySelector("#cart__product-price").getAttribute("value"));
    let itemQuantity = Number(item.querySelector("#cart__product-quantity").getAttribute("value"));
    if (target.checked == true) {
        increaseOderSummary(itemPrice, itemDiscount, itemQuantity);
    } else increaseOderSummary(-itemPrice, -itemDiscount, -itemQuantity);
}

// lấy tìm vị trí của sản phẩm trong giỏ hàng tương ứng với thẻ li truyền vào trong mảng cartListProduct
// cần dựa vào 3 yếu tố name, size, color.
// -> vì các sản phẩm có thể trùng tên nhưng khác nhau về màu sắc và size
function getIndex(item) {
    let productName = item.querySelector("#cart__product-name").innerText;
    let productSize = item.querySelector("#cart__product-size").getAttribute("value");
    let productColor = item.querySelector("#cart__product-color").getAttribute("value");
    let result = -1;
    cartListProduct.forEach((product, index) => {
        if (product.name == productName && product.colorChosen == productColor && product.sizeChosen == productSize) {
            result = index;
            return;
        }
    });

    return result;
}

// Xử lý sự kiện Chỉnh sửa sản phẩn
function handleEdit(event) {
    let item = event.target.closest("li");
    // bỏ chọn sản phẩm để phần tính giá ko bị sai.

    let itemIndex = getIndex(item);
    let editComponent = item.querySelector(".cart__edit-component");
    let isHidden = editComponent.style.display == "none" || getComputedStyle(editComponent).display == "none";
    editComponent.style.display = isHidden ? "block" : "none";

    let confirmBtn = editComponent.querySelector(".cart__button--confirm");
    let cancleBtn = editComponent.querySelector(".cart__button--cancle");

    // Xử lý sự kiện xác nhận chỉnh sửa
    function handleConfirm(event) {
        // bỏ chọn sản phẩm để phần tính giá ko bị sai
        unChecked(item);

        // lấy các giá trị từ component chỉnh sửa
        let selectColor = Number(editComponent.querySelector(".edit__select-color").value);
        let selectSize = Number(editComponent.querySelector(".edit__select-size").value);
        let editQuantity = Number(editComponent.querySelector(".edit__quantity-input").value);

        function updateTag(quantity) {
            let colorInfor = item.querySelector("#cart__product-color");
            let sizeInfor = item.querySelector("#cart__product-size");
            let quantityInfor = item.querySelector("#cart__product-quantity");
            let image = item.querySelector(".cart__item-image");
            image.setAttribute(
                "src",
                `./images/products/product_${cartListProduct[itemIndex].id}/image_${Number(selectColor) + 1}.png`
            );

            colorInfor.innerText = `Màu: ${cartListProduct[itemIndex].color_names[Number(selectColor)]}`;
            sizeInfor.innerText = `Kích cở: ${selectSize} `;
            quantityInfor.innerText = `Số lượng: ${quantity}`;

            console.log(quantity);

            colorInfor.setAttribute("value", selectColor);
            sizeInfor.setAttribute("value", selectSize);
            quantityInfor.setAttribute("value", quantity);
        }

        function updateLocalStorage() {
            if (itemIndex < 0) return;

            cartListProduct[itemIndex].colorChosen = Number(selectColor);
            cartListProduct[itemIndex].sizeChosen = Number(selectSize);
            // Tìm sản phẩm trùng (khác index)
            let duplicateIndex = cartListProduct.findIndex(
                (item, idx) =>
                    idx !== itemIndex &&
                    item.name === cartListProduct[itemIndex].name &&
                    item.colorChosen == cartListProduct[itemIndex].colorChosen &&
                    item.sizeChosen == cartListProduct[itemIndex].sizeChosen
            );

            if (duplicateIndex !== -1) {
                // Cập nhật số lượng sản phẩm
                cartListProduct[itemIndex].quantityChosen =
                    cartListProduct[duplicateIndex].quantityChosen + editQuantity;
                // cập nhật thông tin trên thẻ li
                updateTag(cartListProduct[itemIndex].quantityChosen);
                // Xóa sản phẩm trùng khỏi mảng
                cartListProduct.splice(duplicateIndex, 1);

                // Xóa sản phẩm trùng khỏi DOM
                let duplicateLi = document.querySelectorAll(".cart__item")[duplicateIndex];
                // console.log("xoas");
                if (duplicateLi) duplicateLi.remove();
            } else {
                // Nếu không có sản phẩm trùng, cập nhật thông tin của sản phẩm theo thông tin tùy chọn
                cartListProduct[itemIndex].quantityChosen = Number(editQuantity);
                updateTag(0);
            }

            localStorage.setItem("cartListProduct", JSON.stringify(cartListProduct));
        }

        // cập nhật lại dữ liệu trong mảng cartListproduct và dữ liệu trong localStorage
        updateLocalStorage();

        editComponent.style.display = "none";
    }

    // Xử lý sự kiện hủy thay đổi
    function handleCancle(event) {
        editComponent.style.display = "none";
    }

    confirmBtn.addEventListener("click", handleConfirm);
    cancleBtn.addEventListener("click", handleCancle);
}

// xử lý sự kiện nhấn nút xóa sản phẩm
function handleRemove(event) {
    // Hàm xóa sản phẩm ra khỏi giỏ hàng với tag <li> truyền vào
    function removeItem(item) {
        // xóa sản phẩm ra khỏi Database
        function removeFromDB(index) {
            cartListProduct.splice(index, 1);
            localStorage.setItem("cartListProduct", JSON.stringify(cartListProduct));
        }

        unChecked(item);
        removeFromDB(getIndex(item));
        item.remove();
    }
    let item = event.target.closest("li");

    // bỏ chọn sản phẩm để phần tính giá ko bị sai
    removeItem(item);
}
