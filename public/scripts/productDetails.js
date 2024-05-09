const urlParams = new URL(location.href);
const pid = urlParams.searchParams.get("id");
const addButton = document.getElementById("incrementBtn");
const decButton = document.getElementById("decrementBtn");
const itemCount = document.getElementById("itemCount");
const addCart = document.getElementById("addCart");
let quant = 1;
let prod = {};

function retrieveData() {
  fetch("/api/products/" + pid)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al cargar los datos");
      }
      return res.json();
    })
    .then((data) => {
      prod = data;
      document.querySelector("#detail").innerHTML = `
              <h4 class="m-2">${data.response.title}</h4>
              <img class="mx-auto" style="width: 12rem; height: 15rem" src="${data.response.photo}" alt="${data.response._id}" />
              <p class="m-2">Precio:${data.response.price}</p>
              <p>Stock: ${data.response.stock}</p>
`;
    })
    .catch((err) => {
      console.log(err);
    });
}

retrieveData();

const draw = () => {
  itemCount.innerHTML = "";
  itemCount.innerHTML += `
        <p>${quant}</p>
    `;
};

addButton.addEventListener("click", () => {
  if (quant < prod.response.stock) {
    quant++;
  }
  draw();
});

decButton.addEventListener("click", () => {
  if (quant) {
    quant--;
  }
  draw();
});

addCart.addEventListener("click", () => {
  console.log(prod.response._id);
  addCartfunc(prod.response._id);
});

async function addCartfunc(pid) {
  try {
    const data = {
      user_id: "6630246a6d3d844262c48d0b",
      product_id: pid,
      quantity: quant,
    };
    const url = "/api/carts";
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(data);
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);

    setTimeout(() => {
      Swal.fire({
        title: "Information",
        text: "Product added successfully to cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }, 1000);

  } catch (error) {
    console.log(error);
  }
}

draw();