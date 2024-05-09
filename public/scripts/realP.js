const socket = io();

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
            <a id="cart-button" href="/products/productDetails" class="btn btn-primary">details</a>
          </div>
        </div>
    `)
    .reverse()
    .join("")
    document.querySelector("#realTimeProducts").innerHTML = template
});


