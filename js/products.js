// ===== Accordion Toggle =====
document.querySelectorAll(".filter-group__accordion").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  });
});

let productsData = [];
let filteredProducts = [];

fetch("products.json")
  .then((res) => res.json())
  .then((data) => {
    productsData = data;
    renderPriceRange(productsData);
    renderProducts(productsData);
    setupFilterEvents();
  });

function renderProducts(products) {
  const grid = document.querySelector(".product-listing__grid");
  grid.innerHTML = "";

  products.forEach((product) => {
    const finalPrice = product.price * (1 - product.discount);
    const article = document.createElement("article");
    article.className = "product-listing__card";

    article.innerHTML = `
      <div class="product-card__main-image">
        ${product.images.map((img, index) => `
          <img class="product-card-main-image__img${index === 0 ? ' active' : ''}" src="${img}">
        `).join('')}
      </div>

      <div class="product-card__header-content">
        ${product.is_featured ? '<div class="product-card-header__feature">Best seller</div>' : '<div class="product-card-header__non-feature"></div>'}
        <label class="product-card-header__favourite">
          <input type="checkbox" name="product-favourite" value="like">
          <span>♡</span>
        </label>
      </div>

      <div class="product-card__mini-image">
        ${product.images.slice(1).map((img, index) => `
          <img class="product-card-mini-image__img" src="${img}" data-index="${index}">
        `).join('')}
      </div>

      <a href="product_detail.html?id=${product.id}" class="product-card__main-content">
        <h3 class="product-card-main__name">${product.brand} ${product.name}</h3>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <p class="product-card-main__gender">${product.gender}</p>
        <p class="product-card-main__color">${product.color_names.join(" | ")}</p>
        <div class="product-card-main__price">
          <p class="product-card-main__then-price">${finalPrice.toLocaleString()}đ</p>
          <p class="product-card-main__original-price">${product.price.toLocaleString()}đ</p>
          <p class="product-card-main__sale-percent">-${Math.round(product.discount * 100)}%</p>
        </div>
      </a>
    `;

    grid.appendChild(article);
  });

  setupMiniImageHover();
}

function setupMiniImageHover() {
  document.querySelectorAll(".product-listing__card").forEach((card) => {
    const miniImages = card.querySelectorAll(".product-card-mini-image__img");
    const mainImages = card.querySelectorAll(".product-card-main-image__img");

    mainImages.forEach(img => img.classList.remove("active"));
    if (mainImages[0]) mainImages[0].classList.add("active");

    miniImages.forEach((miniImg, index) => {
      miniImg.addEventListener("mouseenter", () => {
        mainImages.forEach(img => img.classList.remove("active"));
        if (mainImages[index + 1]) mainImages[index + 1].classList.add("active");

        miniImages.forEach(img => img.classList.remove("product-card-mini-image__img--active"));
        miniImg.classList.add("product-card-mini-image__img--active");
      });
    });

    card.addEventListener("mouseleave", () => {
      mainImages.forEach(img => img.classList.remove("active"));
      if (mainImages[0]) mainImages[0].classList.add("active");

      miniImages.forEach(img => img.classList.remove("product-card-mini-image__img--active"));
    });
  });
}

function setupFilterEvents() {
  document.querySelectorAll('.filter-group-option__custom-checkbox input').forEach((checkbox) => {
    checkbox.addEventListener('change', applyFilters);
  });

  const priceInput = document.querySelector('input[name="price_option"]');
  if (priceInput) {
    priceInput.addEventListener('input', applyFilters);
  }
}

function applyFilters() {
  const gender = getCheckedValues('gender_option');
  const brand = getCheckedValues('brand_option');
  const colors = getCheckedValues('color_option');
  const priceLimit = parseFloat(document.querySelector('input[name="price_option"]').value);

  filteredProducts = productsData.filter((product) => {
    const productPrice = product.price * (1 - product.discount);
    const genderMatch = gender.length === 0 || gender.includes(product.gender.toLowerCase());
    const brandMatch = brand.length === 0 || brand.includes(product.brand);

    const colorCategory = product.color_names.map(c => c.toLowerCase()).some(color => {
      if (colors.includes("black") && color.includes("đen")) return true;
      if (colors.includes("white") && color.includes("trắng")) return true;
      if (colors.includes("warm") && /(đỏ|cam|vàng|nâu|hồng)/.test(color)) return true;
      if (colors.includes("cold") && /(xanh|tím|xám)/.test(color)) return true;
      return colors.length === 0;
    });

    return genderMatch && brandMatch && colorCategory && productPrice <= priceLimit;
  });

  renderProducts(filteredProducts);
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
}

function renderPriceRange(data) {
  const prices = data.map(p => p.price * (1 - p.discount));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const rangeInput = document.querySelector('input[name="price_option"]');
  rangeInput.min = min;
  rangeInput.max = max;
  rangeInput.value = max;

  const span = document.getElementById('price-current');
  if (span) {
    span.textContent = max.toLocaleString('vi-VN') + 'đ';
    rangeInput.addEventListener('input', () => {
      span.textContent = parseInt(rangeInput.value).toLocaleString('vi-VN') + 'đ';
    });
  }
}

const filterPanel = document.querySelector('.product-filter');
const filterToggleBtn = document.querySelector('.filter-toggle-btn');
const closeFilterBtn = document.querySelector('.filter-close-btn');

if (filterToggleBtn && filterPanel) {
  filterToggleBtn.addEventListener('click', () => {
    filterPanel.classList.add('show');
    filterToggleBtn.style.display = 'none'; // ẩn nút khi filter đang mở
  });
}

if (closeFilterBtn) {
  closeFilterBtn.addEventListener('click', () => {
    filterPanel.classList.remove('show');
    filterToggleBtn.style.display = 'block'; // hiện lại nút khi filter đóng
  });
}
