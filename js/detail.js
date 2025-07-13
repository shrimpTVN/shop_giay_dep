// tạo slide trượt
const slider = document.getElementById("slide__transition");
const slides = slider.querySelectorAll(".order__img");
const totalSlides = slides.length;
let currentIndex = 0;

// slide__transition phải rộng = số ảnh * 100%(vd 3 ảnh thì vùng chứa rộng là 300%)
slider.style.width = `${totalSlides * 100}%`;

// chia % cho từng ảnh(quay về 100% mỗi ảnh)
slides.forEach(slide => {
  slide.style.width = `${100 / totalSlides}%`;
});

// hàm chuyển ảnh
function showSlide(index) {
  slider.style.transform = `translateX(-${(index * 100) / totalSlides}%)`;
  currentIndex = index;
}

// chỉ số ảnh kế tiếp, nếu ở cuối quay về 0
function nextSlide() {
  const nextIndex = (currentIndex + 1) % totalSlides;
  showSlide(nextIndex);
}

// chỉ số ảnh phía trước, nếu đang ở đầu quay xuống cuối
function prevSlide() {
  const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(prevIndex);
}

// nút bấm trượt
document.getElementById("slide__next").addEventListener("click", nextSlide);
document.getElementById("slide__prev").addEventListener("click", prevSlide);

//trượt tự động
setInterval(nextSlide, 5000);

//js cho chọn màu sắc
var img_color = document.querySelectorAll(".img-color");
img_color.forEach(function(e){
  e.addEventListener("click", function () {
    img_color.forEach(function(img) {
      img.style.border = "none";
    });
    e.style.border = "1px solid black";
    let p = document.querySelector(".opt__img-color h2");
    // bổ sung thêm sau
    p.innerHTML = "Màu sắc " + "Thêm màu json";
  });
})
  

//khi click vào ngôi sao sẽ focus vào comment
document.getElementById("rating").addEventListener("click", function () {
  document.getElementById("comment").focus();
});





