// cartItemIndex - id - number
// cartItemIndex - colorChosen - number
// cartItemIndex - sizeChosen - number
// cartItemIndex - quantityChosen - number
let localStorage = window.localStorage;
if (!localStorage.getItem("cartListProduct")) {
    localStorage.setItem("cartListProduct", "[]");
}
let cartListProduct = JSON.parse(localStorage.getItem("cartListProduct"));
console.log(cartListProduct);
let cartList = document.getElementsByClassName("cart__list")[0];

// render các sản phẩm đã có trong giỏ hàng từ trước
cartListProduct.forEach((product) => {
    addProductToDOM(product);
});

// render 1 sản phẩm vào giỏ hàng
function addProductToDOM(product) {
    let imageSrc = `./images/products/product_${product.id}/image_${product.colorChosen}.png`;
    //tạo sản phẩm vào add vào danh sách giỏ hàng
    let li = document.createElement("li");
    li.className = "cart__item";
    li.id = `cart__item-${product.id}`;
    li.innerHTML = `    <div class="cart__item-info">
                                    <div class="cart__item-checkbox-wrap">
                                        <input
                                            type="checkbox"
                                            class="cart__item-checkbox"
                                            id="cart__item-checkbox-${product.id}"
                                            onclick="handleChoose(event)"
                                
                                            unchecked
                                        />
                                    </div>

                                    <img class="cart__item-image" src="${imageSrc}" alt="" />
                                    <div class="cart__item-detail-wrap">
                                        <h3 class="cart__item-name" id="cart__product-name">${product.name}</h3>
                                        <div class="cart__item-price-wrap">
                                            <p class="cart__item-price"> Giá: </p> 
                                            <p class="cart__item-price" id="cart__product-price"
                                            value="${product.discount}">
                                                 ${product.price - product.price * product.discount}
                                            </p>
                                            <p class="cart__item-price" id="cart__product-old-price"
                                            value="${product.price}">  ${product.discount != 0 ? product.price : ""}</p>
                                        </div>

                                        <p class="cart__item-detail" id="cart__product-color"
                                        value="${product.colorChosen}">
                                            Màu:${product.color_names[product.colorChosen - 1]}
                                        </p>
                                        <p class="cart__item-detail" id="cart__product-size" value="${
                                            product.sizeChosen
                                        }">
                                            Kích cở: ${product.sizeChosen}
                                        </p>
                                        <p class="cart__item-detail" id="cart__product-quantity"
                                        value="${product.quantityChosen}">
                                            Số lượng: ${product.quantityChosen}
                                        </p>
                                    </div>
                                </div>

                                <div class="cart__item-actions">
                                    <button class="cart__button cart__item-edit" type="button" onclick="handleEdit(event)">
                                        <i class="cart__button-icon fa-solid fa-pen-to-square"></i><br />Chỉnh sửa
                                    </button>
                                    <button
                                        class="cart__button cart__item-remove"
                                        type="button"
                                        onclick="handleRemove(event)"
                                    >
                                        <i class="cart__button-icon cart__button-icon--remove fa-solid fa-trash"></i
                                        ><br />Xóa
                                    </button>
                                </div>
                                <div class="cart__edit-component">
                                    <div class="edit__item edit__color">
                                        <span class="edit__label"> Màu: </span>
                                        <select class="edit__select edit__select-color"   value="${
                                            product.color_names[0]
                                        }">
                                             ${
                                                 product.color_names[0] &&
                                                 `<option class="edit__option" value="1">${product.color_names[0]}</option>`
                                             }
                                             ${
                                                 product.color_names[2] &&
                                                 `<option class="edit__option" value="3">${product.color_names[2]}</option>`
                                             } 
                                            ${
                                                product.color_names[3] &&
                                                `
                                                    <option class="edit__option" value="4">${product.color_names[3]}</option>`
                                            }
                                            ${
                                                product.color_names[4] &&
                                                `<option class="edit__option" value="5">${product.color_names[4]}</option>`
                                            }
                                        </select>
                                    </div>
                                    <div class="edit__item edit__size">
                                        <span class="edit__label"> Kích cỡ: </span>
                                        <select class="edit__select edit__select-size" value="38">
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
                                    <div class="edit__item edit__button-wrap">
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
        li.querySelector("#cart__product-price").classList.add("cart__item-price--discount");
        li.querySelector("#cart__product-old-price").classList.add("cart__item-price--old");
    }
}

function addProduct(product) {
    cartListProduct.push(product);
    localStorage.setItem("cartListProduct", JSON.stringify(cartListProduct));
    addProductToDOM(product);
}

// render dữ liệu các sản phẩm trong giỏ hàng
// try to read date from file json
fetch("../cart.json") //gui request doc file json
    .then((respone) => respone.json()) //chuyen du lieu json ve object trong javascript
    .then((data) => {
        //du lieu trong file json

        //lưu vào file localStorage

        let addProductBtn = document.getElementsByClassName("cart__checkout-button")[0];
        let index = 0;
        addProductBtn.onclick = (event) => {
            addProduct(data[index]);
            index++;
            if (index >= 4) index = 0;
        };
    })
    .catch((error) => console.log("read cart.js error", error));
