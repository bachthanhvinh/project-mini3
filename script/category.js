import { fetchApi } from "./fetchApi.js";
import { API_CATEGORY } from "./contants.js";
import { params } from "./variable.js";
import { drawProduct } from "./drawProduct.js";
const category = document.querySelector("#category");
fetchApi(API_CATEGORY).then((data) => {
  let htmls = data.map((item) => {
    return `
      <div class="category-item" data-category="${item.slug}">
      ${item.slug}</div>
    `;
  });

  category.innerHTML = htmls.join("");
  const categoryClick = document.querySelectorAll(".category-item");

  categoryClick.forEach((item) => {
    item.addEventListener("click", () => {
      params.category = item.dataset.category;
      drawProduct();
    });
  });
});
