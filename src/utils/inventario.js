export function filtrarArticulos(articulos, categoria) {
  if (categoria === 'Todas') {
    return articulos
  }

  return articulos.filter((articulo) => articulo.tipo === categoria)
}

export function buscarArticulo(articulos, id) {
  return articulos.find((articulo) => articulo.id === id) ?? null
}

export function obtenerCarritoDetallado(articulos, carrito) {
  return carrito
    .map((item) => ({
      ...item,
      articulo: articulos.find((articulo) => articulo.id === item.articuloId),
    }))
    .filter((item) => item.articulo)
}

export function contarUnidadesCarrito(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0)
}

export function calcularSubtotal(precio, cantidad) {
  return precio * cantidad
}

export function calcularTotalCarrito(items) {
  return items.reduce(
    (total, item) => total + calcularSubtotal(item.articulo.precio, item.cantidad),
    0,
  )
}
