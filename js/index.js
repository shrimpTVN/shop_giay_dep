// Tác giả: Nguyễn Tiểu Mẫn MSSV: B2304068
// Tài liệu tham khảo : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow , chatGPT-cách thêm chuyển slide tự động
let slideIndex = 1;
showSlides(slideIndex);

// Chuyển slide tiếp hoặc lùi
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Hiển thị slide hiện tại
function showSlides(n) {
  const slides = document.getElementsByClassName("section-banner__slide");
  if (slides.length === 0) return;

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Ẩn tất cả các slide
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Hiển thị slide hiện tại
  slides[slideIndex - 1].style.display = "block";

  // Chuyển slide tự động
  setInterval(() => {
    plusSlides(1);
  }, 5000);
}
