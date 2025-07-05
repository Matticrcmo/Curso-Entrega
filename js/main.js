let carrito = [];

// Cargar carrito desde localStorage (si existe)
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para actualizar el contador de carrito en el header
function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  contador.textContent = carrito.length;
}

// Función para mostrar el carrito en el modal
function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = ""; // limpio lista

  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - ${item.opcion} - $${item.precio}`;
    
    // botón para eliminar producto individual (opcional)
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.onclick = () => {
      carrito.splice(index, 1);
      guardarCarrito();  // guardo cambios
      mostrarCarrito();
      actualizarContador();
    };
    
    li.appendChild(btnEliminar);
    lista.appendChild(li);
    
    total += item.precio;
  });

  document.getElementById("total-carrito").textContent = total;
}

// Función para abrir el modal del carrito
function abrirCarrito() {
  document.getElementById("modal-carrito").classList.remove("oculto");
  mostrarCarrito();
}

// Función para cerrar el modal del carrito
function cerrarCarrito() {
  document.getElementById("modal-carrito").classList.add("oculto");
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();  // guardo carrito vacío
  mostrarCarrito();
  actualizarContador();
}

// Función que se ejecuta cuando se hace clic en "Agregar al carrito"
function agregarAlCarrito(e) {
  const producto = e.target.closest(".producto");

  const nombre = producto.querySelector("h3").textContent;
  const opcionSeleccionada = producto.querySelector("input[type='radio']:checked");

  if (!opcionSeleccionada) {
    alert("Por favor seleccioná una opción.");
    return;
  }

  const opcion = opcionSeleccionada.nextSibling.textContent.trim();
  const precio = parseInt(opcion.match(/\d+/)[0]);

  carrito.push({
    nombre,
    opcion,
    precio
  });

  guardarCarrito();  
  actualizarContador();
  alert(`Agregaste al carrito: ${nombre} - ${opcion} - $${precio}`);
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();  
  actualizarContador();

  
  const botonesAgregar = document.querySelectorAll(".btn-agregar");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });

  // Botón para abrir carrito
  document.getElementById("btn-ver-carrito").addEventListener("click", (e) => {
    e.preventDefault();
    abrirCarrito();
  });

  // Botones dentro del modal
 document.getElementById("btn-vaciar-carrito").addEventListener("click", vaciarCarrito);
 document.getElementById("btn-cerrar-carrito").addEventListener("click", cerrarCarrito);
  // Botón para finalizar compra
  const btnFinalizar = document.getElementById("btn-finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
      }
      alert("¡Gracias por tu compra!");
      vaciarCarrito();
    });
  }


  // Validación formulario 
  const form = document.getElementById("formulario-contacto");
  if(form) {
    form.addEventListener("submit", function (e) {
      const nombre = form.elements["nombre"].value.trim();
      const email = form.elements["email"].value.trim();
      const mensaje = form.elements["mensaje"].value.trim();

      if (!nombre || !email || !mensaje) {
        alert("Por favor, completá todos los campos.");
        e.preventDefault();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresá un correo electrónico válido.");
        e.preventDefault();
        return;
      }
    });
  }
});
