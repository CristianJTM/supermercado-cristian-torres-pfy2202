import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buscarArticulo,
  calcularSubtotal,
  calcularTotalCarrito,
  contarUnidadesCarrito,
  filtrarArticulos,
  obtenerCarritoDetallado,
} from './inventario.js'

const articulos = [
  { id: 'a1', nombre: 'Leche', marca: 'Colún', tipo: 'Lácteos', stock: 3, precio: 1290 },
  {
    id: 'a2',
    nombre: 'Pan',
    marca: 'Súper Fresco',
    tipo: 'Panadería',
    stock: 5,
    precio: 1890,
  },
  {
    id: 'a3',
    nombre: 'Manzana',
    marca: 'Frutas del Sur',
    tipo: 'Frutas y verduras',
    stock: 2,
    precio: 990,
  },
]

test('filtrarArticulos devuelve todos con Todas sin mutar el original', () => {
  const resultado = filtrarArticulos(articulos, 'Todas')

  assert.equal(resultado, articulos)
  assert.equal(articulos.length, 3)
})

test('filtrarArticulos devuelve solo la categoría solicitada', () => {
  const resultado = filtrarArticulos(articulos, 'Lácteos')

  assert.deepEqual(resultado, [articulos[0]])
  assert.equal(articulos.length, 3)
})

test('filtrarArticulos devuelve vacío para una categoría sin artículos', () => {
  assert.deepEqual(filtrarArticulos(articulos, 'Bebidas'), [])
})

test('buscarArticulo encuentra por id o devuelve null', () => {
  assert.equal(buscarArticulo(articulos, 'a2'), articulos[1])
  assert.equal(buscarArticulo(articulos, 'inexistente'), null)
})

test('obtenerCarritoDetallado une artículos y descarta referencias inexistentes', () => {
  const carrito = [
    { articuloId: 'a1', cantidad: 2 },
    { articuloId: 'a3', cantidad: 1 },
    { articuloId: 'borrado', cantidad: 4 },
  ]

  const resultado = obtenerCarritoDetallado(articulos, carrito)

  assert.equal(resultado.length, 2)
  assert.equal(resultado[0].articulo.nombre, 'Leche')
  assert.equal(resultado[1].articulo.nombre, 'Manzana')
})

test('contarUnidadesCarrito suma cantidades', () => {
  assert.equal(
    contarUnidadesCarrito([
      { articuloId: 'a1', cantidad: 2 },
      { articuloId: 'a2', cantidad: 3 },
    ]),
    5,
  )
  assert.equal(contarUnidadesCarrito([]), 0)
})

test('calcularSubtotal multiplica precio por cantidad', () => {
  assert.equal(calcularSubtotal(1290, 3), 3870)
  assert.equal(calcularSubtotal(990, 0), 0)
})

test('calcularTotalCarrito suma los subtotales de los items detallados', () => {
  const items = obtenerCarritoDetallado(articulos, [
    { articuloId: 'a1', cantidad: 2 },
    { articuloId: 'a2', cantidad: 1 },
  ])

  assert.equal(calcularTotalCarrito(items), 1290 * 2 + 1890)
  assert.equal(calcularTotalCarrito([]), 0)
})
