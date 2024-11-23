import { API_PRODUCT } from "./contants.js";
import { fetchApi } from "./fetchApi.js";
import { params } from "./variable.js";

const product = document.querySelector("#product");

export const drawProduct = () => {
  const api = `${API_PRODUCT}?_sort=${params.sort}&_page=${params.page}&_per_page=${params.per_page}&category=${params.category}`;

  fetchApi(api).then((data) => {
    let htmls = data.data.map((item) => {
      return `
      <div class="product__item">
        <div class="product-image">
          <img src="${item.thumbnail}" alt="${item.description}" />
          <div class="product__percen">${item.discountPercentage}</div>
        </div>
        <div class="product__title">${item.title}</div>
        <div class="product__body">
          <div class="price">${item.price}$</div>
          <div class="stock">Còn lại: ${item.stock}</div>
        </div>
      </div>
      `;
    });
    product.innerHTML = htmls.join("");
  });
};
export const draw = (data) => {
  let htmls = data.map((item) => {
    return `
      <div class="product__item">
        <div class="product-image">
          <img src="${item.thumbnail}" alt="${item.description}" />
          <div class="product__percen">${item.discountPercentage}</div>
        </div>
        <div class="product__title">${item.title}</div>
        <div class="product__body">
          <div class="price">${item.price}$</div>
          <div class="stock">Còn lại: ${item.stock}</div>
        </div>
      </div>
      `;
  });
  product.innerHTML = htmls.join("");
};
