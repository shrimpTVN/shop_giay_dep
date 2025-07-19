// Tác giả: Nguyễn Huy Lợi MSSV: B2306556
//JS cho json vào đồ án

// lấy id từ URL
function getProductIdFromURL() {
    //Lấy phần chuỗi truy vấn (query string) từ UR -> tạo đối tượng để xử lý
    // URLSearchParams là một đối tượng xử lý truy vấn
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Bổ sung của nhóm trưởng cho phần giỏ hàng

let productChosen = {
    sizeChosen: 36,
    colorChosen: 0,
    quantityChosen: 1,
};

function handleAddCart(event) {
    function addProduct(product) {
        let cartListProduct = JSON.parse(localStorage.getItem("cartListProduct"));

        let check = false;
        //xử lý khi thêm sản phẩm có cùng tên, cùng màu, cùng size với 1 sản phẩm đã có trong giỏ hàng
        cartListProduct.forEach((item) => {
            if (
                item.name === product.name &&
                item.colorChosen === product.colorChosen &&
                item.sizeChosen === product.sizeChosen
            ) {
                check = true;
                // vì iteam là tham chiếu nên giá trị của Object product sẽ bị thay đổi giá trị
                //khi gán giá trị mới thông quan tham chiếu
                item.quantityChosen = Number(item.quantityChosen) + product.quantityChosen;
                return;
            }
        });
        if (!check) cartListProduct.unshift(product);
        localStorage.setItem("cartListProduct", JSON.stringify(cartListProduct));
        alert("Thêm vào giỏ hàng thành công");
    }

    let sizeSelect = document.querySelector(".size__select");
    let quantitySelect = document.querySelector("#quantity");
    productChosen.sizeChosen = Number(sizeSelect.value);
    productChosen.quantityChosen = Number(quantitySelect.value);
    addProduct(productChosen);
}

// tiếp tục render chi tiết sapr phẩm

fetch("./products.json") //nạp file json từ localhost
    .then((response) => response.json()) // chuyển file json sang Object là Array: data
    .then((data) => {
        const id = getProductIdFromURL(); //Lấy id từ url
        const product = data.find((p) => p.id == id); //Tìm sản phảm có id trong url
        productChosen = { ...productChosen, ...product };
        // phần ảnh trượt
        const slider = document.getElementById("slide__transition");
        const slides = slider.children;
        for (let i = 0; i < slides.length; i++) {
            slides[i].src = product.images[i];
        }

        //phần order
        document.querySelector(".opt__title").innerHTML = product.name;
        document.querySelector(".opt__price").innerHTML =
            product.price - product.discount * product.price + `VNĐ (Đã giảm ${product.discount * 100}%)`;
        var img_color = document.querySelectorAll(".img-color");
        for (var i = 0; i < img_color.length; i++) {
            if (i == 0) {
                img_color[i].src = product.images[i];
            } else {
                img_color[i].src = product.images[i + 1];
            }
        }

        //JS cho phần chọn màu
        //Màu mặc định
        var imgDefault = document.querySelector(".img-color--default");
        imgDefault.style.border = "1px solid black";
        document.querySelector(".opt__img-color p").innerHTML = product.color_names[0];

        //Màu khi click
        img_color.forEach(function (e) {
            e.addEventListener("click", function () {
                img_color.forEach(function (img) {
                    img.style.border = "none";
                });
                e.style.border = "1px solid black";
                let p = document.querySelector(".opt__img-color p");
                var index = parseInt(e.classList[1]); //class để lấy thứ tự màu
                p.innerHTML = product.color_names[index];
                productChosen.colorChosen = index;
            });
        });

        //Tiếp tục Json
    })
    .catch((error) => {
        console.error("Lỗi khi đọc JSON:", error);
    });
