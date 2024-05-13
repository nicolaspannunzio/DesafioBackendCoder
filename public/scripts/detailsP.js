const socket = io();
const disminuir = document.getElementById("disminuir")
const contador = document.getElementById("contador")
const aumentar = document.getElementById("aumentar")
const addCart = document.getElementById("addCart")

socket.on("products", (data) => {
    // Función para renderizar los productos
    let template = ``
      // Iterar sobre los productos y crear elementos para mostrarlos en la página
      template = data
      .map(each=>`
          <div class="card" style="max-width:40vw" >
              <img src="${each.photo}" class="card-img-top"  style="max-height:30vh" alt="${each.title}">
              <div class="card-body"> 
                <h5 class="card-title">${each.title}</h5>
                <p class="card-text">Precio: $${each.price}</p>
                <a id="addCart" class="btn btn-primary" >ADD TO CART</a>
              </div>
            </div>
        `)
        .reverse()
        .join("")
        document.querySelector("#realTimeProducts").innerHTML = template
    });
    
    const draw = () => {
      contador.innerHTML = "";
      contador.innerHTML += `
            <p>${quant}</p>
        `;
    };
    
    aumentar.addEventListener("click", () => {
      if (quant < prod.response.stock) {
        quant++;
      }
      draw();
    });
    
    disminuir.addEventListener("click", () => {
      if (quant) {
        quant--;
      }
      draw();
    });
    
    addCart.addEventListener("click", () => {
      console.log(prod.response._id);
      addCartfunc(prod.response._id);
    });
    
    async function addCartfunc(id) {
      try {
        const data = {
          user_id: "965f09604ce0a9aaed939762",
          product_id: id,
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