import { useMemo } from 'react'
import { Link } from 'react-router'
import InventarioHeader from '../components/inventario/InventarioHeader.jsx'
import TablaCarrito from '../components/carrito/TablaCarrito.jsx'
import { buttonClass } from '../components/ui/Button.jsx'
import { ACCIONES, useInventario } from '../context/InventarioContext.jsx'
import {
  calcularTotalCarrito,
  contarUnidadesCarrito,
  obtenerCarritoDetallado,
} from '../utils/inventario.js'
import { formatearCLP } from '../utils/formatoMoneda.js'

export default function Carrito() {
  const { articulos, carrito, dispatch } = useInventario()
  const items = useMemo(
    () => obtenerCarritoDetallado(articulos, carrito),
    [articulos, carrito],
  )
  const totalUnidades = contarUnidadesCarrito(carrito)
  const totalCompra = calcularTotalCarrito(items)

  function incrementar(articuloId) {
    dispatch({ type: ACCIONES.AGREGAR_AL_CARRITO, payload: { articuloId, cantidad: 1 } })
  }

  function decrementar(articuloId) {
    dispatch({ type: ACCIONES.DECREMENTAR_CARRITO, payload: articuloId })
  }

  function eliminar(articuloId) {
    dispatch({ type: ACCIONES.ELIMINAR_DEL_CARRITO, payload: articuloId })
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <InventarioHeader
          eyebrow="Carrito"
          title="Carrito de compras"
          lead="Ajusta las cantidades y revisa el stock restante y el total de tu compra."
        />
        <Link to="/inventario/lista" className={buttonClass({ variant: 'secondary' })}>
          Seguir comprando
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-2 rounded-3xl border border-solid border-sf-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="mb-0 text-sm font-semibold text-sf-muted" aria-live="polite">
          {totalUnidades} {totalUnidades === 1 ? 'unidad en el carrito' : 'unidades en el carrito'}
        </p>
        <p className="mb-0 text-sm font-semibold text-sf-muted">
          Total:{' '}
          <span className="text-lg font-extrabold text-sf-green">{formatearCLP(totalCompra)}</span>
        </p>
      </div>

      {items.length === 0 ? (
        <div className="mt-4 rounded-3xl border border-dashed border-sf-border bg-white p-10 text-center">
          <p className="mb-0 text-lg font-bold text-sf-text">Tu carrito está vacío</p>
          <p className="mt-2 mb-0 text-sm text-sf-muted">
            Agrega artículos desde el detalle de cada producto.
          </p>
          <Link to="/inventario/lista" className={buttonClass({ className: 'mt-5' })}>
            Ver inventario
          </Link>
        </div>
      ) : (
        <div className="mt-4">
          <TablaCarrito
            items={items}
            onIncrementar={incrementar}
            onDecrementar={decrementar}
            onEliminar={eliminar}
          />
          <div className="mt-4 flex items-center justify-between rounded-3xl border border-solid border-sf-border bg-white p-5 shadow-sm">
            <span className="text-sm font-bold uppercase tracking-wide text-sf-muted">
              Total de la compra
            </span>
            <span className="text-2xl font-extrabold text-sf-green" aria-live="polite">
              {formatearCLP(totalCompra)}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
