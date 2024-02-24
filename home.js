const sectionProductsEl = document.querySelector('.products');
const btnFilterByExpensiveItemsEl = document.querySelector('#btnFilterByExpensiveItems');
const btnFilterByCheepItemsEl = document.querySelector('#btnFilterByCheepItems');
const btnFilterByAlphabetItemsEl = document.querySelector('#btnFilterByAlphabetItems');
const inputSearchEl = document.querySelector('#input-search');
const textPrudctsemptyEl = document.querySelector('.text-prudcts-empty');

console.log(inputSearchEl);

let products = [];
const searchProducts = [];

const drawProducts = (data) => {
  sectionProductsEl.innerHTML = data
    .map((item) => {
      return `<article class="product-card">
      <img src="${item.images[0]}" alt="">
      <h3>${item.title}</h3>
      <span>${item.price}$</span>
    </article>`;
    })
    .join('');
};

const fetchData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=10');

    const data = await response.json();
    console.log(data);
    products = data.products;

    drawProducts(products);
  } catch (error) {
    console.log(error);
  }
};

fetchData();

const getUser = () => {
  const storagedUser = JSON.parse(localStorage.getItem('user'));
  console.log(storagedUser);
};

getUser();

// btnFilterByExpensiveItemsEl.addEventListener('click', () => {
//   const sortedProductsByMaxPrice = products.sort((a, b) => b.price - a.price);

//   drawProducts(sortedProductsByMaxPrice);
// });

// btnFilterByCheepItemsEl.addEventListener('click', () => {
//   const sortedProductsByMinPrice = products.sort((a, b) => a.price - b.price);

//   drawProducts(sortedProductsByMinPrice);
// });

// btnFilterByAlphabetItemsEl.addEventListener('click', () => {
//   const sortedProductsByMinPrice = products.sort(function (a, b) {
//     if (a.title < b.title) return -1;
//     if (a.title > b.title) return 1;

//     return 0;
//   });

//   drawProducts(sortedProductsByMinPrice);
// });

inputSearchEl.addEventListener('keyup', () => {
  const productCardsEls = document.querySelectorAll('.product-card');
  const searchValue = inputSearchEl.value.toLowerCase();

  searchProducts.length = 0;

  productCardsEls.forEach((productCardEl) => {
    const productText = productCardEl.textContent.toLowerCase();
    const isMatch = productText.includes(searchValue);

    productCardEl.style.display = isMatch ? 'block' : 'none';

    if (isMatch) {
      searchProducts.push(productCardEl);
    }
  });

  if (searchProducts.length === 0) {
    textPrudctsemptyEl.style.display = 'block';
  } else {
    textPrudctsemptyEl.style.display = 'none';
  }
});
