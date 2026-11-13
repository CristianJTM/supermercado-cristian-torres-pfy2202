import { crearInventarioInicial } from '../data/inventarioInicial.js'

export const ESTADO_INICIAL = {
  articulos: crearInventarioInicial(),
  carrito: [],
}

export const ACCIONES = {
  AGREGAR: 'ADD_ARTICULO',
  EDITAR: 'EDIT_ARTICULO',
  ELIMINAR: 'DELETE_ARTICULO',
  AGREGAR_AL_CARRITO: 'ADD_TO_CART',
  DECREMENTAR_CARRITO: 'DECREMENT_CART',
  ELIMINAR_DEL_CARRITO: 'REMOVE_FROM_CART',
}

const CANTIDAD_POR_DEFECTO = 1

// ADD_TO_CART acepta un id suelto o un payload { articuloId, cantidad }.
// Así el detalle (una unidad) y el carrito (reponer unidades) comparten acción.
function normalizarItemCarrito(payload) {
  if (typeof payload === 'string') {
    return { articuloId: payload, cantidad: CANTIDAD_POR_DEFECTO }
  }

  return {
    articuloId: payload?.articuloId,
    cantidad: payload?.cantidad ?? CANTIDAD_POR_DEFECTO,
  }
}

function ajustarStock(articulos, articuloId, delta) {
  return articulos.map((articulo) =>
    articulo.id === articuloId
      ? { ...articulo, stock: articulo.stock + delta }
      : articulo,
  )
}

export function inventarioReducer(state, action) {
  switch (action.type) {
    case ACCIONES.AGREGAR:
      return {
        ...state,
        articulos: [...state.articulos, action.payload],
      }

    case ACCIONES.EDITAR: {
      const datos = action.payload

      if (!datos?.id || !state.articulos.some((articulo) => articulo.id === datos.id)) {
        return state
      }

      return {
        ...state,
        articulos: state.articulos.map((articulo) =>
          articulo.id === datos.id
            ? {
                ...articulo,
                nombre: datos.nombre ?? articulo.nombre,
                marca: datos.marca ?? articulo.marca,
                tipo: datos.tipo ?? articulo.tipo,
                stock: datos.stock ?? articulo.stock,
                precio: datos.precio ?? articulo.precio,
              }
            : articulo,
        ),
      }
    }

    case ACCIONES.ELIMINAR:
      return {
        ...state,
        articulos: state.articulos.filter((articulo) => articulo.id !== action.payload),
        carrito: state.carrito.filter((item) => item.articuloId !== action.payload),
      }

    case ACCIONES.AGREGAR_AL_CARRITO: {
      const { articuloId, cantidad } = normalizarItemCarrito(action.payload)
      const articulo = state.articulos.find((item) => item.id === articuloId)

      if (
        !articulo ||
        !Number.isInteger(cantidad) ||
        cantidad <= 0 ||
        articulo.stock < cantidad
      ) {
        return state
      }

      const existeEnCarrito = state.carrito.some(
        (item) => item.articuloId === articulo.id,
      )

      return {
        ...state,
        articulos: ajustarStock(state.articulos, articulo.id, -cantidad),
        carrito: existeEnCarrito
          ? state.carrito.map((item) =>
              item.articuloId === articulo.id
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item,
            )
          : [
              ...state.carrito,
              { articuloId: articulo.id, cantidad },
            ],
      }
    }

    case ACCIONES.DECREMENTAR_CARRITO: {
      const itemCarrito = state.carrito.find(
        (item) => item.articuloId === action.payload,
      )

      if (!itemCarrito) {
        return state
      }

      const articulo = state.articulos.find((item) => item.id === action.payload)

      if (!articulo) {
        return {
          ...state,
          carrito: state.carrito.filter(
            (item) => item.articuloId !== action.payload,
          ),
        }
      }

      return {
        ...state,
        articulos: ajustarStock(state.articulos, articulo.id, 1),
        carrito:
          itemCarrito.cantidad > 1
            ? state.carrito.map((item) =>
                item.articuloId === articulo.id
                  ? { ...item, cantidad: item.cantidad - 1 }
                  : item,
              )
            : state.carrito.filter((item) => item.articuloId !== articulo.id),
      }
    }

    case ACCIONES.ELIMINAR_DEL_CARRITO: {
      const itemCarrito = state.carrito.find(
        (item) => item.articuloId === action.payload,
      )

      if (!itemCarrito) {
        return state
      }

      return {
        ...state,
        articulos: ajustarStock(
          state.articulos,
          itemCarrito.articuloId,
          itemCarrito.cantidad,
        ),
        carrito: state.carrito.filter(
          (item) => item.articuloId !== action.payload,
        ),
      }
    }

    default:
      return state
  }
}
