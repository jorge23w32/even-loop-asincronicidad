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
  const datos = new FormData(document.getElementById("_pedido"));
  pedidos.push(
    new Pedido(
      datos.get("nombreCliente"),
      datos.get("nombreProducto"),
      datos.get("precio"),
      datos.get("unidades")
    )
  );
  id++;
  mostrarPedidos(pedidos);
}

//Muestra la lista de pedidos en la tabla
function mostrarPedidos(pedidos) {
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
        `;
    filas.appendChild(fila);
  });
}

document.getElementById("_pedido").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que se envíe el formulario
  crearPedido();
});

function finalizarPedido() {}
