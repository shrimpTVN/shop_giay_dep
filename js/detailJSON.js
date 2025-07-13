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
        const slider = document.getElementById("slide__transition");
        const id = getProductIdFromURL();//Lấy id
        const product = data.find(p => p.id == id);
        //Tìm sản phảm có id trong url
        const slides = slider.children;
        slides[0].src = product.images[0];
        slides[1].src = product.images[1];
    })
    .catch(error => {
        console.error("Lỗi khi đọc JSON:", error);
    });