var acc = document.getElementsByClassName("filter-group__accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}

var prdct_card = document.getElementsByClassName("product-listing__card");

for (i = 0; i < acc.length; i++) {
  prdct_card[i].addEventListener("hover", function() {
    
    /* Toggle between hiding and showing the active panel */
    var panel = this.getElementsByClassName("product-card__mini-image");
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}