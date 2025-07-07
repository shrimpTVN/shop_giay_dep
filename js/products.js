document.addEventListener("DOMContentLoaded", () => {
      fetch("products.json")
        .then((res) => res.json())
        .then((products) => renderProducts(products));
    });

    function renderProducts(products) {
      const container = document.getElementById("productGrid");
      container.innerHTML = "";

      products.forEach((product) => {
        const percent = 100 - Math.round((product.price_after_discount / product.price) * 100);
        const mainImg = product.images[0];
        const hoverImg = product.images[1] || mainImg;

        const article = document.createElement("article");
        article.className = "product-card";
        article.style.backgroundImage = "url('images/products/product-card_ADIDAS-backgroud_01.png')";

        article.innerHTML = `
          <div class="product-card__sale-persent">
            <p class="sale-persent__number">-${product.discount}%</p>
          </div>
          <div class="product-card__title-cell">
            <h3 class="product-card-title-cell__name">${product.name}</h3>
            <p class="product-card-title-cell__genttle">Men's shoes</p>
          </div>
          <div class="product-card__size-cell">
            <a class="product-card-size-cell__title">Size</a>
            ${product.sizes.map(s => `
              <label class="product-card-size-cell__custom-radio">
                <input type="radio" name="size-${product.id}" value="${s.size}">
                <b>${s.size}</b>
              </label>`).join('')}
          </div>
          <div class="product-card__favourite-cell">
            <a class="product-card-favourite-cell__title">Fav</a>
            <label class="product-card-favourite-cell__custom-radio">
              <input type="checkbox" name="favourite-${product.id}" value="love">
              <span>❤</span>
            </label>
          </div>
          <div class="product-card__image" style="background-image: url('${mainImg}');" onmouseover="this.style.backgroundImage='url(${JSON.stringify(hoverImg)})'" onmouseout="this.style.backgroundImage='url(${JSON.stringify(mainImg)})'"></div>
          <div class="product-card__color-cell">
            <a class="product-card-color-cell__title">Color</a>
            ${product.color.map((c, i) => `
              <label class="product-card-color-cell__custom-radio">
                <input type="radio" name="color-${product.id}" value="color-${i}">
                <span>
                  <div class="product-card-color-cell__product-color" style="background-color:${c}"></div>
                </span>
              </label>`).join('')}
          </div>
          <div class="product-card__price-cell">
            <a class="product-card-price-cell__title">Price</a>
            <b class="product-card-price-cell__then-price">${formatVND(product.price_after_discount)}</b>
            <p class="product-card-price-cell__original">${formatVND(product.price)}</p>
          </div>
          <div class="product-card__buy-cell">
            <label class="product-card-buy-cell-add-to-cart__custom-button">
              <input type="button" name="add_to_cart" value="${product.id}">
              <span>
                <div class="product-card-buy-cell-add-cart__logo"></div>
              </span>
            </label>
            <label class="product-card-buy-cell-buy-now__custom-button">
              <input type="button" name="buy_now" value="cart.html?id=${product.id}">
              <strong>Mua ngay</strong>
            </label>
          </div>
        `;

        container.appendChild(article);
      });
    }

    function formatVND(amount) {
      return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    }