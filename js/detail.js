// Tác giả: Nguyễn Huy Lợi MSSV: B2306556

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

  

//khi click vào ngôi sao sẽ focus vào comment
document.getElementById("rating").addEventListener("click", function () {
  document.getElementById("comment").focus();
});





