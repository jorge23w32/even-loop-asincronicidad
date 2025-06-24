let id = 1;
class Pedido {
  constructor(cliente, producto, precio, unidades) {
    this.id = id;
    this.cliente = String(cliente);
    this.producto = String(producto);
    this.precio = Number(precio);
    this.unidades = Number(unidades);
    this.total = Number(this.precio * this.unidades);
  }
}
let pedidos = [];

//Crea el pedido y actualiza la tabla
function crearPedido() {
  const estatus = document.getElementById("estatus");
  const iconoEstatus = document.getElementById("iconoEstatus");
  const datos = new FormData(document.getElementById("_pedido"));
  const comprar = document.getElementById("comprar");
  pedidos.push(
    new Pedido(
      datos.get("nombreCliente"),
      datos.get("nombreProducto"),
      datos.get("precio"),
      datos.get("unidades")
    )
  );
  id++;
  setTimeout(() => {
    mostrarPedidos();
    estatus.innerText = "EN PROCESO!";
    iconoEstatus.style.background = "#FFFF00";
    comprar.style.display = "inline-block";
    limpiarCampos();
  }, Math.floor(Math.random() * 9000) + 1000);
}

//Muestra la lista de pedidos en la tabla
function mostrarPedidos() {
  const filas = document.getElementById("filas");
  filas.innerHTML = "";

  pedidos.forEach((it) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${it.cliente}</td>
            <td>${it.producto}</td>
            <td>${it.precio.toFixed(2)}</td>
            <td>${it.unidades}</td>
            <td>${it.total.toFixed(2)}</td>
            <td><button class="botonEliminar" onclick="eliminarPedido(${
              it.id
            })">
            <i class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
            </button></td>
        `;
    filas.appendChild(fila);
  });
}

document.getElementById("_pedido").addEventListener("submit", function (e) {
  e.preventDefault();
  crearPedido();
});

function eliminarPedido(id) {
  console.log(id);

  const estatus = document.getElementById("estatus");
  const iconoEstatus = document.getElementById("iconoEstatus");
  const comprar = document.getElementById("comprar");

  pedidos = pedidos.filter((pedido) => pedido.id != id);
  setTimeout(() => {
    mostrarPedidos();
    if (pedidos.length == 0) {
      estatus.innerText = "N/A";
      iconoEstatus.style.background = "#AB0000";
      comprar.style.display = "none";
    }
  }, Math.floor(Math.random() * 9000) + 1000);
}
function finalizarPedido() {
  let totalPagar = 0.0;
  pedidos.forEach((it) => {
    totalPagar += it.total;
  });
  const filas = document.getElementById("filas");
  const fila = document.createElement("tr");
  const estatus = document.getElementById("estatus");
  const iconoEstatus = document.getElementById("iconoEstatus");
  fila.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td style="text-aling: end; font-weight: bolder;">Total</td>
            <td>${totalPagar.toFixed(2)}</td>
            <td></td>
  `;
  setTimeout(() => {
    filas.appendChild(fila);
    estatus.innerText = "Confirmado!";
    iconoEstatus.style.backgroundColor = "#28a745";
    limpiarCampos(true);
  }, Math.floor(Math.random() * 5000) + 1000);
}

function limpiarCampos(todos = false) {
  if (todos) {
    document.getElementById("nombreCliente").value = "";
    document.getElementById("nombreProducto").value = "";
  }
  document.getElementById("precio").value = "";
  document.getElementById("unidades").value = "";
}
