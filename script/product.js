import { draw, drawProduct } from "./drawProduct.js";
import { fetchApi } from "./fetchApi.js";
import { API_PRODUCT } from "./contants.js";
import { params } from "./variable.js";

drawProduct();

function searchProduct() {
  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  fetchApi(API_PRODUCT).then((data) => {
    let findProducts = data;

    if (search) {
      findProducts = data.filter((product) => {
        let matchingKeyword = false;
        product.tags.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        });

        return (
          matchingKeyword ||
          product.title.toLowerCase().includes(search.toLowerCase())
        );
      });

      if (findProducts.length === 0) {
        document.querySelector(
          "#product"
        ).innerHTML = `<div class="text-center"> <div>Không tìm thấy sản phẩm</div></div>`;
        return;
      }
    }

    draw(findProducts);
  });
}

const inputSearch = document.querySelector(".search-input");
const buttonSearch = document.querySelector(".btn-search");

const innerSearch = () => {
  const search = document.querySelector("#search input").value;
  window.location.href = `index.html?search=${search}`;
};
buttonSearch.addEventListener("click", () => {
  innerSearch();
});

inputSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    innerSearch();
  }
});

function displaypage() {
  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  if (search) {
    searchProduct();
  }
}
displaypage();

const productSort = document.querySelector("#js-sort");

const paramSort = (sort) => {
  params.sort = sort;
  drawProduct();
};

productSort.addEventListener("change", (event) => {
  console.log(event.target.value);
  switch (event.target.value) {
    case "gia-thap-den-cao":
      paramSort("price");
      break;

    case "gia-cao-den-thap":
      paramSort("-price");
      break;
    case "giam-gia-nhieu":
      paramSort("discountPercentage");
      break;
    default:
      paramSort("");
      break;
  }
});

const pageNumber = document.querySelector(".page__number");
const pageLeft = document.querySelector(".page__btn--left");
const pageRight = document.querySelector(".page__btn--right");

pageRight.addEventListener("click", () => {
  params.page += 1;
  pageNumber.innerHTML = params.page;
  drawProduct();
});
pageLeft.addEventListener("click", () => {
  params.page -= 1;
  pageNumber.innerHTML = params.page;
  drawProduct();
});
