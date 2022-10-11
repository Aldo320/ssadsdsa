let data = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const botonComprar = document.querySelector('#boton-comprar');
const botonSorteo = document.querySelector('#boton-sorteo');
const formulario = document.querySelector('container') 




function renderizarProductos() {
  fetch("../data.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((info)=>{
        const Clase=document.createElement("div"); 
        Clase.classList.add("card','col-sm-4"); 
        const CardBody=document.createElement("div");   
        CardBody.classList.add("card-body"); 
        const Titulo =document.createElement("h5"); 
        Titulo.classList.add("card-title"); 
        Titulo.textContent=info.producto; 
        const Imagen=document.createElement("img"); 
        Imagen.classList.add("img-fluid"); 
        Imagen.setAttribute("src",info.imagen); 
        const Precio=document.createElement("p"); 
        Precio.classList.add("card-text"); 
        Precio.textContent=`${info.precio}${divisa}`; 
        const Boton=document.createElement("button"); 
        Boton.classList.add("btn","btn-primary"); 
        Boton.textContent="Agregar Al Carrito"; 
        Boton.setAttribute("marcador",info.id); 
        Boton.addEventListener("click",aniadirProdAlCarrito); 
        CardBody.appendChild(Imagen); 
        CardBody.appendChild(Titulo); 
        CardBody.appendChild(Precio); 
        CardBody.appendChild(Boton); 
        Clase.appendChild(CardBody); 
        DOMitems.appendChild(Clase); 
      });         
      }); 
    }

function aniadirProdAlCarrito(evento) {
  fetch("../data.json")
  .then((response)=>response.json())
  .then((data)=>{
  data.push(evento.target.getAttribute('marcador'))
})
}

function renderizarCarrito() {
  DOMcarrito.textContent = "";
  const carritoSinDuplicados = [...new Set(data)];
  carritoSinDuplicados.forEach((item) => {
    fetch("../data.json")
    .then((response)=>response.json())
    .then((data)=>{
      const miItem = data.filter((itemChampiones) => {
          return itemChampiones.id === parseInt(item);
      });
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          return itemId === item ? (total += 1) : total;
      }, 0);
      const Clase = document.createElement("li");
      Clase.classList.add("list-group-item", "text-right", "mx-2");
      Clase.textContent = `${numeroUnidadesItem} x ${miItem[0].producto} - ${miItem[0].precio}${divisa}`;
      const miBoton = document.createElement("button");
      miBoton.classList.add("btn", "btn-danger", "mx-5");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      miBoton.dataset.item = item;
      miBoton.addEventListener("click", comprarItemCarrito);
     
      Clase.appendChild(miBoton);
      DOMcarrito.appendChild(Clase);
    });
  DOMtotal.textContent = calcularTotal();
});
}

function comprarItemCarrito(evento) {
  const id = evento.target.dataset.item;
  data = data.filter((carritoId) => {
      return carritoId !== id;
  });
  renderizarCarrito();
}

function calcularTotal() {
  return data.reduce((total, item) => {
      const miItem = data.filter((itemChampiones) => {
          return itemChampiones.id === parseInt(item);
      });
      return total + miItem[0].precio;
  }, 0).toFixed(2);
}


function comprarCarrito() {
  data = [];
  renderizarCarrito();
}

botonComprar.addEventListener('click', comprarCarrito);

renderizarProductos();
renderizarCarrito();

const actualizarCarrito = (data) => {
localStorage.setItem ("data", JSON.stringify(data));
};

if (localStorage.getItem ("data")) {
data = JSON.parse(localStorage.getItem("data"));
renderizarCarrito();
}


let modalCarrito = document.getElementById("carrito")
const agregarAlCarrito = (carritoId) => {
const indiceEncontradoCarrito = carrito.findIndex ((producto) => {
  return producto.carritoId === productos [carritoId].carritoId;
});
if (indiceEncontradoCarrito === -1) {
  const productoAgregar = productos [carritoId];
  productoAgregar.cantidad = 1;
  Boton.push (productoAgregar)
  actualizarCarrito (carrito);
  dibujarCarrito();
}else{
  carrito[indiceEncontradoCarrito].cantidad += 1;
  actualizarCarrito(carrito);
  dibujarCarrito();
}
}

const removeProduct = (carritoId) => {
carrito.splice (carritoId, 1);
actualizarCarrito(carrito);
dibujarCarrito();
}


botonComprar.addEventListener('click', () =>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estas Seguro De Ejecutar Esta Compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ejecutar Compra',
        cancelButtonText: 'Cancelar Compra',
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Tu Compra Ha Sido Realizada Exitosamente',
            '¡Felicidaes! :)',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            
          swalWithBootstrapButtons.fire(
            'Tu Compra Ha Sido Cancelada',
            '',
            'error'
          )
        }
      })
})

botonSorteo.addEventListener('click', () =>{
    const { value: email } = Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address'
      })
      
      if (email) {
        Swal.fire(`Entered email: ${email}`)
      } 
    })

