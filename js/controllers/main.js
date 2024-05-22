import { servicesProducts } from "../services/productServices.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
      <div class="img-container">
        <img src="${image}" alt="${name}">
        <div class="card-container--info">
          <p>${name}</p>
          <div class="card-container--value">
            <p>Q.${price}</p>
            <button id="clear-button"  class="delete-button" data-id="${id}">
              <img src="./assets/Trash Can.ico" alt="Eliminar">
            </button>
          </div>
        </div>
      </div>
    `;

  // Agregar un evento al botón de eliminar
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    try {
      await servicesProducts.deleteProduct(id);
      card.remove(); // Eliminar la tarjeta del DOM
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  });

  productContainer.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const listProducts = await servicesProducts.productList();
    listProducts.forEach((product) => {
      createCard(product.name, product.price, product.image, product.id);
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  try {
    const newProduct = await servicesProducts.createProducts(
      name,
      price,
      image
    );
    console.log("Producto creado:", newProduct);
    createCard(
      newProduct.name,
      newProduct.price,
      newProduct.image,
      newProduct.id
    );
  } catch (err) {
    console.error("Error al crear el producto:", err);
  }
});

render();
