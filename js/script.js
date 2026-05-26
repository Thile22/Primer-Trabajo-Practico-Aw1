let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosFiltrados = [];

const contenedorProductos = document.querySelector("#contenedorProductos");
const categoriaActual = document.body.dataset.categoria;
const paginaActual = window.location.pathname;

const rutaJson = paginaActual.includes("/pages/")
  ? "../data/productos.json"
  : "./data/productos.json";

/* LOGIN */
const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    sessionStorage.setItem("logueado", "true");
    window.location.href = "./index.html";
  });
}

/* PROTEGER PÁGINAS */
const paginasPublicas = ["login.html", "registro.html"];

const esPublica = paginasPublicas.some(function(pagina) {
  return paginaActual.includes(pagina);
});

if (!esPublica) {
  const estaLogueado = sessionStorage.getItem("logueado");

  if (estaLogueado !== "true") {
    const rutaLogin = paginaActual.includes("/pages/")
      ? "../login.html"
      : "./login.html";

    window.location.href = rutaLogin;
  }
}

/* LOGOUT */
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

/* MOSTRAR PRODUCTOS */
function mostrarProductos(listaProductos) {
  const rutaImagen = paginaActual.includes("/pages/")
    ? "../imagen/"
    : "./imagen/";
  contenedorProductos.innerHTML = "";

  listaProductos.forEach(function(producto, index) {
    contenedorProductos.innerHTML += `
      <div class="card-producto">
       <img src="${rutaImagen}${producto.imagen}" alt="${producto.titulo}">

        <h3>${producto.titulo}</h3>

        <p>${producto.descripcion}</p>

        <span class="precio">$${producto.precio}</span>

        <div class="cantidad">
          <button class="btn-restar" data-index="${index}">-</button>
          <span id="cantidad-${index}">0</span>
          <button class="btn-sumar" data-index="${index}">+</button>
        </div>

        <button class="btn-agregar" data-index="${index}">
          Añadir al carrito
        </button>
      </div>
    `;
  });

  activarBotones(listaProductos);
}

/* BOTONES DE PRODUCTOS */
function activarBotones(listaProductos) {
  const botonesSumar = document.querySelectorAll(".btn-sumar");
  const botonesRestar = document.querySelectorAll(".btn-restar");
  const botonesAgregar = document.querySelectorAll(".btn-agregar");

  botonesSumar.forEach(function(boton) {
    boton.addEventListener("click", function() {
      const index = boton.dataset.index;
      const cantidad = document.querySelector(`#cantidad-${index}`);

      cantidad.textContent = Number(cantidad.textContent) + 1;
    });
  });

  botonesRestar.forEach(function(boton) {
    boton.addEventListener("click", function() {
      const index = boton.dataset.index;
      const cantidad = document.querySelector(`#cantidad-${index}`);

      if (Number(cantidad.textContent) > 0) {
        cantidad.textContent = Number(cantidad.textContent) - 1;
      }
    });
  });

  botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function() {
      const index = boton.dataset.index;
      const cantidad = document.querySelector(`#cantidad-${index}`);
      const cantidadElegida = Number(cantidad.textContent);

      if (cantidadElegida > 0) {
        for (let i = 0; i < cantidadElegida; i++) {
          carrito.push(listaProductos[index]);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert("Producto agregado al carrito");

        cantidad.textContent = 0;
      } else {
        alert("Primero seleccioná una cantidad");
      }
    });
  });
}

/* CARGAR PRODUCTOS DESDE JSON */
if (contenedorProductos) {
  fetch(rutaJson)
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(productos) {
      if (categoriaActual) {
        productosFiltrados = productos.filter(function(producto) {
          return producto.categoria === categoriaActual;
        });
      } else {
        productosFiltrados = productos;
      }

      mostrarProductos(productosFiltrados);

      const buscador = document.querySelector("#buscador");

      if (buscador) {
        buscador.addEventListener("input", function() {
          const textoBuscado = buscador.value.toLowerCase();

          const productosBuscados = productosFiltrados.filter(function(producto) {
            return producto.titulo.toLowerCase().includes(textoBuscado);
          });

          mostrarProductos(productosBuscados);
        });
      }
    });
}

/* CARRITO */
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

       <img src="${rutaImagen}${producto.imagen}" alt="${producto.titulo}">

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
    totalCarrito.textContent = `Total: $${total.toLocaleString("es-AR")}`;
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