const baseUrl = "http://localhost:3000/productos";

const productList = () => {
  return fetch(baseUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al obtener los productos");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error en productList:", error);
    });
};

const createProducts = (name, price, image) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      image,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al crear el producto");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error en createProducts:", error);
    });
};

const deleteProduct = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al eliminar el producto");
      }
    })
    .catch((error) => {
      console.error("Error en deleteProduct:", error);
    });
};

export const servicesProducts = {
  productList,
  createProducts,
  deleteProduct, // Exportar el nuevo método
};
