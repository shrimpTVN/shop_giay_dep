// lấy dữ liệu các sản phẩm từ localStorage
let localStorage = window.localStorage;
if (!localStorage.getItem("cartListProduct")) {
    localStorage.setItem("cartListProduct", "[]");
}
let cartListProduct = JSON.parse(localStorage.getItem("cartListProduct"));
// console.log(cartListProduct);
// lấy tag <ul> để chèn các tag <li> chứa sản phẩm vào
let cartList = document.getElementsByClassName("cart__list")[0];

// render các sản phẩm đã có trong giỏ hàng từ trước
cartListProduct.forEach((product) => {
    addProductToDOM(product);
});

// render 1 sản phẩm vào giỏ hàng
function addProductToDOM(product) {
    let imageSrc = `./images/products/product_${product.id}/image_${product.colorChosen + 1}.png`;
    //tạo sản phẩm vào add vào danh sách giỏ hàng
    let li = document.createElement("li");
    li.className = "cart__item pe-0 p-sm-4 row justify-content-between";
    li.id = `cart__item-${product.id}`;
    li.innerHTML = `<div class="cart__item-info col-8">
                                    <div class="cart__item-checkbox-wrap">
                                        <input
                                            type="checkbox"
                                            class="cart__item-checkbox me-0 me-md-3 w-200"
                                            id="cart__item-checkbox-${product.id}"
                                            onclick="handleChoose(event.target)"
                                
                                            unchecked
                                        />
                                    </div>

                                    <img class="cart__item-image w-25" src="${imageSrc}" alt="" />
                                    <div class="cart__item-detail-wrap">
                                        <h3 class="cart__item-name fs-3 mb-0" id="cart__product-name">${
                                            product.name
                                        }</h3>
                                        <div class="cart__item-price-wrap text-center align-middle">
                                            <p class="cart__item-price fs-4 mb-0"> Giá: </p> 
                                            <p class="cart__item-price" id="cart__product-price"
                                            value="${product.discount}">
                                               ${Number(
                                                   product.price - product.price * product.discount
                                               ).toLocaleString(
                                                   "vi-VN"
                                               )}đ                                             </p>
                                        <p class="cart__item-price text-decoration-line-through fs-4 d-none d-md-block" id="cart__product-old-price"
                                        value="${product.price}">  ${
        product.discount != 0 ? `${Number(product.price).toLocaleString("vi-VN")}đ` : ""
    }
                                        </p>
                                        </div>

                                        <p class="cart__item-detail mb-0" id="cart__product-color"
                                        value="${product.colorChosen}">
                                            Màu: ${product.color_names[product.colorChosen]}
                                        </p>
                                        <p class="cart__item-detail mb-0" id="cart__product-size" value="${
                                            product.sizeChosen
                                        }">
                                            Kích cở: ${product.sizeChosen}
                                        </p>
                                        <p class="cart__item-detail mb-0" id="cart__product-quantity"
                                        value="${product.quantityChosen}">
                                            Số lượng: ${product.quantityChosen}
                                        </p>
                                    </div>
                                </div>

                                <div class="cart__item-actions row pe-4 col-3">
                                    <button class="cart__button cart__item-edit col-12 col-md-8 px-md-3" type="button" onclick="handleEdit(event)">
                                        <i class="cart__button-icon fs-2 mb-3 fa-solid fa-pen-to-square"></i>
                                        <p class="d-none d-md-block">Chỉnh sửa</p>
                                    </button>
                                    <button
                                        class="cart__button cart__item-remove col-12 col-md-4 px-md-3"
                                        type="button"
                                        onclick="handleRemove(event)"
                                    >
                                        <i class="cart__button-icon cart__button-icon--remove fa-solid fa-trash"></i
                                        > <p class="d-none d-md-block">Xóa</p>
                                    </button>
                                </div>

                                <div class="cart__edit-component 
                                 top-50 end-0 w-100 w-ms-50">
                                    <div class="edit__item edit__color">
                                        <span class="edit__label"> Màu: </span>
                                        <select class="edit__select edit__select-color"   value="${
                                            product.color_names[0]
                                        }">
                                             ${
                                                 product.color_names[0] &&
                                                 `<option class="edit__option" value="0">${product.color_names[0]}</option>`
                                             }
                                             ${
                                                 product.color_names[2] &&
                                                 `<option class="edit__option" value="2">${product.color_names[2]}</option>`
                                             } 
                                            ${
                                                product.color_names[3] &&
                                                `<option class="edit__option" value="3">${product.color_names[3]}</option>`
                                            }
                                            ${
                                                product.color_names[4] &&
                                                `<option class="edit__option" value="4">${product.color_names[4]}</option>`
                                            }
                                        </select>
                                    </div>
                                    <div class="edit__item edit__size">
                                        <span class="edit__label"> Kích cỡ: </span>
                                        <select class="edit__select edit__select-size" value="38">
                                            <option class="edit__option" value="36">36</option>
                                            <option class="edit__option" value="37">37</option>
                                            <option class="edit__option" value="38">38</option>
                                            <option class="edit__option" value="39">39</option>
                                            <option class="edit__option" value="40">40</option>
                                            <option class="edit__option" value="41">41</option>
                                            <option class="edit__option" value="42">42</option>
                                        </select>
                                    </div>
                                    <div class="edit__item edit__quantity">
                                        <span class="edit__label">Số lượng:</span>
                                        <input class="edit__quantity-input"type="number" value="1" min="1" />
                                    </div>
                                    <div class="edit__item edit__button-wrap pe-5">
                                        <button
                                            class="edit__button edit__button--gray  cart__button--cancle"
                                            type="button"
                                        >
                                            Trở lại
                                        </button>
                                        <button class="edit__button cart__button--confirm" type="button">
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
        `;
    cartList.appendChild(li);
    if (product.discount != 0) {
        const priceEl = li.querySelector("#cart__product-price");
        if (priceEl) priceEl.classList.add("cart__item-price--discount");

        const oldPriceEl = li.querySelector("#cart__product-old-price");
        if (oldPriceEl) oldPriceEl.classList.add("cart__item-price--old");
    }
}

function addProduct(product) {
    cartListProduct.push(product);
    localStorage.setItem("cartListProduct", JSON.stringify(cartListProduct));
    addProductToDOM(product);
}
