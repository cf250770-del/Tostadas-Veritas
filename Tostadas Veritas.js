// ----- PRODUCTOS -----
const productos = [
  { nombre: "Ceviche", precio: 40, img: "imagenes/ceviche.jpg" },
  { nombre: "Atún", precio: 40, img: "imagenes/atun.jpg" },
  { nombre: "Carne Tártara", precio: 40, img: "imagenes/carne_tartara.jpg" },
  { nombre: "Trompa", precio: 40, img: "imagenes/trompa.jpg" },
  { nombre: "Pata picada", precio: 40, img: "imagenes/pata_picada.jpeg" },
  { nombre: "Oreja", precio: 40, img: "imagenes/oreja.jpg" },
  { nombre: "Cueros", precio: 25, img: "imagenes/cueros.jpg" },
  { nombre: "Media orden de pata", precio: 60, img: "imagenes/media_pata.jpg" },
  { nombre: "Orden de pata", precio: 110, img: "imagenes/pata.jpg" }
];

// ----- RENDER DE PRODUCTOS -----
const menu = document.getElementById("menu");

productos.forEach(prod => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${prod.img}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
    <p>$${prod.precio} MXN</p>
    <button class="btn-add">Agregar</button>
  `;

  card.querySelector(".btn-add").onclick = () => agregarAlCarrito(prod);

  menu.appendChild(card);
});

// ----- CARRITO -----
let carrito = [];

function agregarAlCarrito(prod) {
  carrito.push(prod);

  document.getElementById("cartCount").textContent = carrito.length;

  mostrarToast();

  renderCarrito();
}

// ----- Mostrar carrito -----
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function renderCarrito() {
  cartItems.innerHTML = "";

  let total = 0;

  carrito.forEach((item, i) => {
    total += item.precio;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.nombre} - $${item.precio}</p>
    `;

    cartItems.appendChild(div);
  });

  if (carrito.length === 0) {
    cartItems.innerHTML = `<p class="empty">Aún no has agregado nada.</p>`;
  }

  cartTotal.textContent = `$${total} MXN`;
}

// ----- PANEL -----
const sidePanel = document.getElementById("sidePanel");

document.getElementById("cartBtn").onclick = () => {
  sidePanel.classList.add("open");
};

document.getElementById("closePanel").onclick = () => {
  sidePanel.classList.remove("open");
};

// ----- THEME -----
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// ----- TOAST -----
function mostrarToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 2000);
}

// ----- WHATSAPP -----
document.getElementById("sendWhatsApp").onclick = () => {
  const nombre = document.getElementById("clienteNombre").value;
  const ub = document.getElementById("clienteUbicacion").value;
  const com = document.getElementById("clienteComentarios").value;

  let mensaje = `*Pedido Tostadas Veritas*\n\n`;

  carrito.forEach(c => {
    mensaje += `• ${c.nombre} - $${c.precio}\n`;
  });

  mensaje += `\n*Total:* ${cartTotal.textContent}\n`;
  mensaje += `\n*Nombre:* ${nombre}`;
  mensaje += `\n*Ubicación:* ${ub}`;
  mensaje += `\n*Comentarios:* ${com}`;

  const url = "https://wa.me/524622336202?text=" + encodeURIComponent(mensaje);

  window.open(url, "_blank");
};