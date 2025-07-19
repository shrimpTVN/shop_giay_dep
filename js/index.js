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
}