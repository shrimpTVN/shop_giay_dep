var acc = document.getElementsByClassName("filter-group__accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    // Đưa css active vào
    this.classList.toggle("active");
    // Đổi giữa ẩn và hiện 
    var panel = this.nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}

document.querySelectorAll('.product-listing__card').forEach(function (card) {
  const miniImages = card.querySelectorAll('.product-card-mini-image__img');
  const mainImages = card.querySelectorAll('.product-card-main-image__img');

  // Mặc định hiển thị ảnh đầu tiên
  mainImages.forEach(img => img.classList.remove('active'));
  if (mainImages[0]) mainImages[0].classList.add('active');
  // if (mainImages[1]) mainImages[1].classList.add('hover-target'); // tạm đánh dấu ảnh hover

  let currentIndex = 0;

  miniImages.forEach(function (miniImg, index) {
    miniImg.addEventListener('mouseenter', function () {
      currentIndex = index;
      mainImages.forEach(img => img.classList.remove('active'));

      const mainIndex1 = index + 1;
      // const mainIndex2 = index + 2;

      if (mainImages[mainIndex1]) mainImages[mainIndex1].classList.add('active');
      // if (mainImages[mainIndex2]) mainImages[mainIndex2].classList.add('hover-target');

      // Cập nhật lại css border cho ảnh nhỏ được hover
      miniImages.forEach(img => img.classList.remove('product-card-mini-image__img--active'));
      miniImg.classList.add('product-card-mini-image__img--active');
    });
  });

  // Hiệu ứng hover chuyển ảnh chính -> ảnh hover
  const mainImageContainer = card.querySelector('.product-card__main-image');
 

  mainImageContainer.addEventListener('mouseleave', function () {
    const active = mainImageContainer.querySelector('.active');
    if (active) active.classList.remove('active');
    if (mainImages[0]) mainImages[0].classList.add('active');
  });
  card.addEventListener('mouseleave', function () {
    const active = mainImageContainer.querySelector('.active');
    if (active) active.classList.remove('active');
    if (mainImages[0]) mainImages[0].classList.add('active');
  });
});


