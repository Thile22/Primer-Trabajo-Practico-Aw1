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

const productos = [
  {
    titulo: "Notebook Lenovo",
    descripcion: "Ideal para estudio y trabajo",
    precio: 850000,
    imagen: "../img/lenovo.jpg",
    categoria: "netbooks"
  },
  {
    titulo: "Tablet Samsung",
    descripcion: "Pantalla amplia y excelente rendimiento",
    precio: 450000,
    imagen: "../img/tableta9.jpg",
    categoria: "tablets"
  },
  {
    titulo: "Mouse Gamer",
    descripcion: "Alta precisión y RGB",
    precio: 15000,
    imagen: "../img/mouse.jpg",
    categoria: "Accesorios"
  },
  {
    titulo: "Teclado Mecánico",
    descripcion: "Switch Blue profesional",
    precio: 35000,
    imagen: "../img/teclado.jpg",
    categoria: "Accesorios"
  },
  {
    titulo: "Auriculares Gamer",
    descripcion: "Sonido envolvente",
    precio: 25000,
    imagen: "../img/auriculares.webp",
    categoria: "Accesorios"
  },
  
    {
    titulo: "Netbook Asus",
    descripcion: "Ideal para estudio y trabajo",
    precio: 125000,
    imagen: "../img/asus.jpg",
    categoria: "netbooks"
  },
     {
    titulo: "Netbook HP",
    descripcion: "Ideal para estudio y trabajo",
    precio: 105000,
    imagen: "../img/hp.jpg",
    categoria: "netbooks"
  },
   
   {
    titulo: "Netbook Samsung",
    descripcion: "Ideal para estudio y trabajo",
    precio: 205000,
    imagen: "../img/samsung.jpg",
    categoria: "netbooks"
  },
   {
    titulo: "Tablet Lenovo",
    descripcion: "Pantalla amplia y excelente rendimiento",
    precio: 850000,
    imagen: "../img/tabletlenovo.png",
    categoria: "tablets"
  },
   {
    titulo: "Tablet Redmi",
    descripcion: "Pantalla amplia y excelente rendimiento",
    precio: 650000,
    imagen: "../img/redmi.jpg",
    categoria: "tablets"
  }


];
const contenedorProductos = document.querySelector("#contenedorProductos");
const categoriaActual = document.body.dataset.categoria;

if (contenedorProductos) {

  if (categoriaActual) {
    productosFiltrados = productos.filter(function(producto) {
      return producto.categoria === categoriaActual;
    });
  } else {
    productosFiltrados = productos;
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
}

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
    }
  });
});
const menu = document.querySelector("#menu");
if (menu) {

  paginas.forEach(function(pagina) {

    menu.innerHTML += `
      <li>
        <a href="${pagina.direccion}">
          ${pagina.titulo}
        </a>
      </li>
    `;

  });

}


const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    localStorage.setItem("logueado", "true");

    window.location.href = "./index.html";
  });
}
const paginaActual = window.location.pathname;

if (paginaActual.includes("index.html")) {
  const estaLogueado = localStorage.getItem("logueado");

  if (estaLogueado !== "true") {
    window.location.href = "./login.html";
  }
}
const logoutBtn = document.querySelector("#logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", function() {

    localStorage.removeItem("logueado");

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

