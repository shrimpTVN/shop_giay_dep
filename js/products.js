/*============================================================
  === Người thực hiện: Võ Nhựt Hào -|- MSSV: B2303808     ====
  === SCRIPTS TRANG SẢN PHẨM (COMMENTED)                  ====
  ============================================================ */

// ===== Accordion Toggle cho từng nhóm bộ lọc(FlexItem of I.1.b) =====
document.querySelectorAll(".filter-group__accordion").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");  // Đổi trạng thái mở/đóng
    const panel = this.nextElementSibling;  // Phần panel chứa checkbox
    const icon = this.querySelector("i"); //Mũi tên xuống

    // Chuyển hướng toggle icon
    if (icon) {
      icon.classList.toggle("fa-chevron-down");
      icon.classList.toggle("fa-chevron-up");
    }

    // Chuyển đổi khả năng hiển thị toggle panel
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  });
});

// Khai báo 2 biến chứa dữ liệu sản phẩm
let productsData = [];       // Dữ liệu gốc từ JSON
let filteredProducts = [];   // Dữ liệu sau khi lọc

// ===== Lấy dữ liệu sản phẩm từ file JSON =====
fetch("products.json")
  .then((res) => res.json())
  .then((data) => {
    productsData = data;
    renderPriceRange(productsData);     // Thiết lập thanh chọn giá
    renderProducts(productsData);       // Hiển thị sản phẩm ban đầu
    setupFilterEvents();                // Bắt sự kiện cho các bộ lọc
  });

// ===== Render product-cards into .product-listing__grid (GC I.1.c.1) =====
function renderProducts(products) {
  const grid = document.querySelector(".product-listing__grid");
  grid.innerHTML = ""; // Xóa nội dung cũ đang còn tồn tại

  products.forEach((product) => {
    const finalPrice = product.price * (1 - product.discount); // Giá sau giảm
    const article = document.createElement("article");
    article.className = "product-listing__card";  // GI of I.1.c.1

    // Tạo HTML cho 1 thẻ sản phẩm
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

    // Thêm sản phẩm vào grid
    grid.appendChild(article);
  });

  // Kích hoạt hiệu ứng hover ảnh nhỏ
  setupMiniImageHover();
}

// ===== Hover ảnh mini(GI I.1.c.1) để đổi ảnh chính  =====
function setupMiniImageHover() {
  document.querySelectorAll(".product-listing__card").forEach((card) => {
    const miniImages = card.querySelectorAll(".product-card-mini-image__img");
    const mainImages = card.querySelectorAll(".product-card-main-image__img");

    // Thiết lập mặc định: ảnh đầu tiên là ảnh chính
    mainImages.forEach(img => img.classList.remove("active"));
    if (mainImages[0]) mainImages[0].classList.add("active");

    // Hover ảnh nhỏ -> thay đổi ảnh chính
    miniImages.forEach((miniImg, index) => {
      miniImg.addEventListener("mouseenter", () => {
        mainImages.forEach(img => img.classList.remove("active"));
        if (mainImages[index + 1]) mainImages[index + 1].classList.add("active");

        miniImages.forEach(img => img.classList.remove("product-card-mini-image__img--active"));
        miniImg.classList.add("product-card-mini-image__img--active");
      });
    });

    // Khi rời chuột khỏi thẻ sản phẩm -> reset ảnh chính
    card.addEventListener("mouseleave", () => {
      mainImages.forEach(img => img.classList.remove("active"));
      if (mainImages[0]) mainImages[0].classList.add("active");

      miniImages.forEach(img => img.classList.remove("product-card-mini-image__img--active"));
    });
  });
}

// ===== Bắt sự kiện khi thay đổi checkbox bộ lọc hoặc thanh giá =====
function setupFilterEvents() {
  // Checkbox của từng nhóm filter
  document.querySelectorAll('.filter-group-option__custom-checkbox input').forEach((checkbox) => {
    checkbox.addEventListener('change', applyFilters);
  });

  // Thanh trượt giá
  const priceInput = document.querySelector('input[name="price_option"]');
  if (priceInput) {
    priceInput.addEventListener('input', applyFilters);
  }
}

// ===== Áp dụng các filter hiện tại lên danh sách sản phẩm =====
function applyFilters() {
  const gender = getCheckedValues('gender_option');
  const brand = getCheckedValues('brand_option');
  const colors = getCheckedValues('color_option');
  const priceLimit = parseFloat(document.querySelector('input[name="price_option"]').value);

  // Lọc sản phẩm theo các tiêu chí
  filteredProducts = productsData.filter((product) => {
    const productPrice = product.price * (1 - product.discount);
    const genderMatch = gender.length === 0 || gender.includes(product.gender.toLowerCase());
    const brandMatch = brand.length === 0 || brand.includes(product.brand);

    const colorCategory = product.color_names.map(c => c.toLowerCase()).some(color => {
      if (colors.includes("black") && color.includes("đen")) return true;
      if (colors.includes("white") && color.includes("trắng")) return true;
      if (colors.includes("warm") && /(đỏ|cam|vàng|nâu|hồng)/.test(color)) return true;
      if (colors.includes("cold") && /(xanh|tím|xám)/.test(color)) return true;
      return colors.length === 0; // Không chọn màu nào thì cho qua
    });

    return genderMatch && brandMatch && colorCategory && productPrice <= priceLimit;
  });

  renderProducts(filteredProducts); // Hiển thị danh sách đã lọc
}

// ===== Lấy danh sách các checkbox đang được chọn theo name =====
function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
}

// ===== Hiển thị thanh trượt giá và giá trị min/max =====
function renderPriceRange(data) {
  const prices = data.map(p => p.price * (1 - p.discount));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const rangeInput = document.querySelector('input[name="price_option"]');

  // gán giá trị min/max cho thanh trượt
  rangeInput.min = min;
  rangeInput.max = max;
  rangeInput.value = max;

  const span = document.getElementById('price-current');
  if (span) {
    span.textContent = max.toLocaleString('vi-VN') + 'đ';

    // Cập nhật khi người dùng thay đổi giá
    rangeInput.addEventListener('input', () => {
      span.textContent = parseInt(rangeInput.value).toLocaleString('vi-VN') + 'đ';
    });
  }
}

// ===== hiển thị/ẩn panel filter trên thiết bị nhỏ (for I.1.b layout on mobile) =====
const filterPanel = document.querySelector('.product-filter');
const filterToggleBtn = document.querySelector('.filter-toggle-btn');
const closeFilterBtn = document.querySelector('.filter-close-btn');

// Khi click vào nút mở bộ lọc → hiện panel
if (filterToggleBtn && filterPanel) {
  filterToggleBtn.addEventListener('click', () => {
    filterPanel.classList.add('show');
    filterToggleBtn.style.display = 'none'; // Ẩn nút khi panel mở
  });
}

// Khi click vào nút đóng → ẩn panel và hiện lại nút mở
if (closeFilterBtn) {
  closeFilterBtn.addEventListener('click', () => {
    filterPanel.classList.remove('show');
    filterToggleBtn.style.display = 'block';
  });
}
