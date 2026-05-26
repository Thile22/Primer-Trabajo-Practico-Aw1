let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosFiltrados = [];

const estaEnPages = window.location.pathname.includes("/pages/");

const paginas = [
  {
    titulo: "Inicio",
    direccion: estaEnPages ? "../index.html" : "./index.html"
  },
  {
    titulo: "Netbooks",
    direccion: estaEnPages ? "./cat1.html" : "./pages/cat1.html"
  },
  {
    titulo: "Tablets",
    direccion: estaEnPages ? "./cat2.html" : "./pages/cat2.html"
  },
  {
    titulo: "Accesorios",
    direccion: estaEnPages ? "./cat3.html" : "./pages/cat3.html"
  },
  {
    titulo: "Carrito",
    direccion: estaEnPages ? "./carrito.html" : "./pages/carrito.html"
  }
];

const contenedorProductos = document.querySelector("#contenedorProductos");
const categoriaActual = document.body.dataset.categoria;

const rutaJson = window.location.pathname.includes("/pages/")
  ? "../data/productos.json"
  : "./data/productos.json";

fetch(rutaJson)
  .then(function(respuesta) {
    return respuesta.json();
  })
  .then(function(productos) {

    if (contenedorProductos) {

      if (categoriaActual) {
        productosFiltrados = productos.filter(function(producto) {
          return producto.categoria === categoriaActual;
        });
      } else {
        productosFiltrados = productos;
      }
      const buscador = document.querySelector("#buscador");

if (buscador) {
  buscador.addEventListener("input", function() {
    const textoBuscado = buscador.value.toLowerCase();

    const productosBuscados = productosFiltrados.filter(function(producto) {
      return producto.titulo.toLowerCase().includes(textoBuscado);
    });

  
  });
}

      productosFiltrados.forEach(function(producto, index) {
        contenedorProductos.innerHTML += `
          <div class="card-producto">
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <h3>${producto.titulo}</h3>
            <p>${producto.descripcion}</p>
            <span class="precio">$${producto.precio}</span>

            <div class="cantidad">
              <button class="btn-restar" data-index="${index}">-</button>
              <span id="cantidad-${index}">0</span>
              <button class="btn-sumar" data-index="${index}">+</button>
            </div>
          </div>
        `;
      });
const botonesSumar = document.querySelectorAll(".btn-sumar");
const botonesRestar = document.querySelectorAll(".btn-restar");

botonesSumar.forEach(function(boton) {
  boton.addEventListener("click", function() {
    const index = boton.dataset.index;
    const cantidad = document.querySelector(`#cantidad-${index}`);

    cantidad.textContent = Number(cantidad.textContent) + 1;

    carrito.push(productosFiltrados[index]);
    localStorage.setItem("carrito", JSON.stringify(carrito));
     console.log("Carrito guardado:", carrito);
  });
});


botonesRestar.forEach(function(boton) {
  boton.addEventListener("click", function() {
    const index = boton.dataset.index;
    const cantidad = document.querySelector(`#cantidad-${index}`);

    if (Number(cantidad.textContent) > 0) {
      cantidad.textContent = Number(cantidad.textContent) - 1;

      const productoARestar = productosFiltrados[index];

      const posicionEnCarrito = carrito.findIndex(function(producto) {
        return producto.titulo === productoARestar.titulo;
      });

      if (posicionEnCarrito !== -1) {
        carrito.splice(posicionEnCarrito, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
    }
  });
});


    }

  });



const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    sessionStorage.setItem("logueado", "true");

    window.location.href = "./index.html";
  });
}
const paginaActual = window.location.pathname;

const paginasPublicas = ["login.html", "registro.html"];

const esPublica = paginasPublicas.some(function(pagina) {
  return paginaActual.includes(pagina);
});

if (!esPublica) {
  const estaLogueado = sessionStorage.getItem("logueado");

  if (estaLogueado !== "true") {
    const ruta = paginaActual.includes("/pages/") ? "../login.html" : "./login.html";
    window.location.href = ruta;
  }
}
const logoutBtn = document.querySelector("#logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", function() {

    sessionStorage.removeItem("logueado");

    if (paginaActual.includes("/pages/")) {
  window.location.href = "../login.html";
} else {
  window.location.href = "./login.html";
}

  });

}
const contenedorCarrito = document.querySelector("#contenedorCarrito");

if (contenedorCarrito) {
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

 const carritoLimpio = carritoGuardado.filter(function(producto) {
  return producto !== null;
});

if (carritoLimpio.length === 0) {
  contenedorCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
}

carritoLimpio.forEach(function(producto, index) {

  contenedorCarrito.innerHTML += `
    <div class="card-producto">

      <button class="btn-eliminar" data-index="${index}">
        ❌
      </button>

      <img src="${producto.imagen}" alt="${producto.titulo}">

      <h3>${producto.titulo}</h3>

      <p>${producto.descripcion}</p>

      <span class="precio">$${producto.precio}</span>

    </div>
  `;
});
let total = 0;

carritoLimpio.forEach(function(producto) {
  total += producto.precio;
});

const totalCarrito = document.querySelector("#totalCarrito");

if (totalCarrito) {
  totalCarrito.textContent =  `Total: $${total.toLocaleString("es-AR")}`;
}
const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach(function(boton) {

  boton.addEventListener("click", function() {

    const index = boton.dataset.index;

    carritoLimpio.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carritoLimpio));

    location.reload();

  });

});

}

