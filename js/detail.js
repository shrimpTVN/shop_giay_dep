const slider = document.getElementById("slide__transition");
const slides = slider.querySelectorAll(".order__img");
const totalSlides = slides.length;
let currentIndex = 0;

// slide__transition phải rộng = số ảnh * 100%
slider.style.width = `${totalSlides * 100}%`;

slides.forEach(slide => {
  slide.style.width = `${100 / totalSlides}%`;
});


function showSlide(index) {
  slider.style.transform = `translateX(-${(index * 100) / totalSlides}%)`;
  currentIndex = index;
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % totalSlides;
  showSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(prevIndex);
}

document.getElementById("slide__next").addEventListener("click", nextSlide);
document.getElementById("slide__prev").addEventListener("click", prevSlide);

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
  

//js cho phan rating

document.getElementById("rating").addEventListener("click", function () {
  document.getElementById("comment").focus();
});

