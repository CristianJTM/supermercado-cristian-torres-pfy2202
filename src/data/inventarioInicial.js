export const ARTICULOS_INICIALES = [
  {
    id: 'art-001',
    nombre: 'Leche entera',
    marca: 'Colún',
    tipo: 'Lácteos',
    stock: 8,
    precio: 1290,
  },
  {
    id: 'art-002',
    nombre: 'Pan amasado',
    marca: 'Súper Fresco',
    tipo: 'Panadería',
    stock: 12,
    precio: 1890,
  },
  {
    id: 'art-003',
    nombre: 'Manzanas Fuji',
    marca: 'Frutas del Sur',
    tipo: 'Frutas y verduras',
    stock: 20,
    precio: 1490,
  },
  {
    id: 'art-004',
    nombre: 'Detergente líquido',
    marca: 'Limpia Más',
    tipo: 'Limpieza',
    stock: 5,
    precio: 3590,
  },
  {
    id: 'art-005',
    nombre: 'Bebida cola',
    marca: 'Cola Chile',
    tipo: 'Bebidas',
    stock: 10,
    precio: 1590,
  },
  {
    id: 'art-006',
    nombre: 'Carne molida',
    marca: 'Carnes del Sur',
    tipo: 'Carnes',
    stock: 6,
    precio: 6990,
  },
]

export function crearInventarioInicial() {
  return ARTICULOS_INICIALES.map((articulo) => ({ ...articulo }))
}
