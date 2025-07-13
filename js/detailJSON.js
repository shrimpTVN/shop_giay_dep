//JS cho json vào đồ án

// lấy id từ URL
function getProductIdFromURL() {
    //Lấy phần chuỗi truy vấn (query string) từ UR -> tạo đối tượng để xử lý
    // URLSearchParams là một đối tượng xử lý truy vấn
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

fetch("./products.json") //nạp file json từ localhost
    .then(response => response.json()) // chuyển file json sang Object là Array: data
    .then(data => {
        const id = getProductIdFromURL();//Lấy id
        const product = data.find(p => p.id == id);//Tìm sản phảm có id trong url

        // phần ảnh trượt
        const slider = document.getElementById("slide__transition");
        const slides = slider.children;
        slides[0].src = product.images[0];
        slides[1].src = product.images[1];

        //phần order
        document.querySelector(".opt__title").innerHTML = product.name;
        document.querySelector(".opt__price").innerHTML = product.price - product.discount * product.price + `VNĐ (Đã giảm ${product.discount * 100}%)`;
        var img_color = document.querySelectorAll(".img-color");
        for(var i = 0; i < img_color.length; i++){
            img_color[i].src = product.images[i+2];
        }


        //JS cho phần chọn màu
        img_color.forEach(function (e) {
            e.addEventListener("click", function () {
                img_color.forEach(function (img) {
                    img.style.border = "none";
                });
                e.style.border = "1px solid black";
                let p = document.querySelector(".opt__img-color p");
                var index = parseInt(e.classList[1]);
                p.innerHTML =product.color_names[index];
            });
        })

        //Tiếp tục Json
    })
    .catch(error => {
        console.error("Lỗi khi đọc JSON:", error);
    });