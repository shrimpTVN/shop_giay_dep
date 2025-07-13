//JS cho json vào đồ án

fetch("./products.json") //nạp file json từ localhost
    .then(response => response.json()) // chuyển file json sang Object là Array: data
    .then(data => {
        const slider = document.getElementById("slide__transition");
        product = data[0];
        const slides = slider.children;
        slides[0].src = product.images[0];
        slides[1].src = product.images[1];
    })
    .catch(error => {
        console.error("Lỗi khi đọc JSON:", error);
    });