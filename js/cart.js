console.log(localStorage);
console.log("cart");

// xử lý sự kiện nhấn chọn sản phẩm
function handleChoose(event) {
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
        summarySave.innerText = discount.toLocaleString("vi-VN") + "₫";
        summaryTotal.innerText = price.toLocaleString("vi-VN") + "₫";
        summaryFinalPrice.innerText = Number(price - discount).toLocaleString("vi-VN") + "₫";

        // Đặt lại thuộc tính Attribute của price và save
        summaryTotal.setAttribute("value", price);
        summarySave.setAttribute("value", discount);
    }

    let item = event.target.closest("li");

    let itemPrice = parseFloat(item.querySelector("#cart__product-price").innerText);
    let itemDiscount = parseFloat(item.querySelector("#cart__product-price").getAttribute("value"));
    let itemQuantity = Number(item.querySelector("#cart__product-quantity").getAttribute("value"));
    if (event.target.checked == true) {
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
    let itemIndex = getIndex(item);
    let editComponent = item.querySelector(".cart__edit-component");
    let isHidden = editComponent.style.display == "none" || getComputedStyle(editComponent).display == "none";
    editComponent.style.display = isHidden ? "block" : "none";

    let confirmBtn = editComponent.querySelector(".cart__button--confirm");
    let cancleBtn = editComponent.querySelector(".cart__button--cancle");

    // Xử lý sự kiện xác nhận chỉnh sửa
    function handleConfirm(event) {
        let selectColor = editComponent.querySelector(".edit__select-color").value;
        let selectSize = editComponent.querySelector(".edit__select-size").value;
        let editQuantity = editComponent.querySelector(".edit__quantity-input").value;

        function updateLocalStorage() {
            if (itemIndex < 0) return;

            cartListProduct[itemIndex].colorChosen = Number(selectColor);
            cartListProduct[itemIndex].sizeChosen = Number(selectSize);
            cartListProduct[itemIndex].quantityChosen = Number(editQuantity);
            localStorage.setItem("cartListProduct", JSON.stringify(cartListProduct));
        }

        function updateTag() {
            let colorInfor = item.querySelector("#cart__product-color");
            let sizeInfor = item.querySelector("#cart__product-size");
            let quantityInfor = item.querySelector("#cart__product-quantity");
            let image = item.querySelector(".cart__item-image");
            image.setAttribute(
                "src",
                `./images/products/product_${cartListProduct[itemIndex].id}/image_${selectColor}.png`
            );

            colorInfor.innerText = `Màu: ${cartListProduct[itemIndex].color_names[Number(selectColor)]}`;
            sizeInfor.innerText = `Kích cở: ${selectSize} `;
            quantityInfor.innerText = `Số lượng: ${editQuantity}`;

            colorInfor.setAttribute("value", selectColor);
            sizeInfor.setAttribute("value", selectSize);
            quantityInfor.setAttribute("value", editQuantity);
        }

        // cập nhật lại dữ liệu trong mảng cartListproduct và dữ liệu trong localStorage
        updateLocalStorage();

        // cập nhật thông tin trên thẻ li
        updateTag();
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
    // xóa sản phẩm ra khỏi Database
    function removeFromDB(index) {
        cartListProduct.splice(index, 1);
        localStorage.setItem("cartListProduct", JSON.stringify(cartListProduct));
    }

    let item = event.target.closest("li");
    removeFromDB(getIndex(item));
    item.remove();
}
