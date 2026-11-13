import { Link } from 'react-router'
import Button from '../ui/Button.jsx'
import QuantityStepper from '../ui/QuantityStepper.jsx'
import StockBadge from '../ui/StockBadge.jsx'
import { calcularSubtotal } from '../../utils/inventario.js'
import { formatearCLP } from '../../utils/formatoMoneda.js'

const ENLACE = 'font-bold text-sf-text underline decoration-sf-green/40 decoration-2 underline-offset-4 transition hover:text-sf-green'

export default function TablaCarrito({
  items,
  onIncrementar,
  onDecrementar,
  onEliminar,
}) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {items.map((item) => (
          <article
            key={item.articuloId}
            className="rounded-2xl border border-solid border-sf-border bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link to={`/inventario/detalle/${item.articulo.id}`} className={ENLACE}>
                  {item.articulo.nombre}
                </Link>
                <p className="mt-1 mb-0 text-sm text-sf-muted">
                  {item.articulo.marca} · {item.articulo.tipo}
                </p>
              </div>
              <StockBadge stock={item.articulo.stock} sufijo="" />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-sf-muted">
                  Precio unitario
                </dt>
                <dd className="mt-1 mb-0 font-semibold text-sf-text">
                  {formatearCLP(item.articulo.precio)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-sf-muted">
                  Subtotal
                </dt>
                <dd className="mt-1 mb-0 font-bold text-sf-green">
                  {formatearCLP(calcularSubtotal(item.articulo.precio, item.cantidad))}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <QuantityStepper
                cantidad={item.cantidad}
                etiqueta={item.articulo.nombre}
                onIncrementar={() => onIncrementar(item.articuloId)}
                onDecrementar={() => onDecrementar(item.articuloId)}
                deshabilitarIncremento={item.articulo.stock === 0}
              />
              <Button
                variant="danger"
                size="sm"
                onClick={() => onEliminar(item.articuloId)}
                aria-label={`Quitar ${item.articulo.nombre} del carrito`}
              >
                Quitar
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-3xl border border-solid border-sf-border bg-white shadow-sm md:block">
        <table className="w-full min-w-[860px] text-left text-sm">
          <caption className="sr-only">Artículos agregados al carrito</caption>
          <thead className="bg-sf-sand text-xs font-extrabold uppercase tracking-wide text-sf-muted">
            <tr>
              <th scope="col" className="px-4 py-3">
                Producto
              </th>
              <th scope="col" className="px-4 py-3">
                Precio unitario
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Cantidad
              </th>
              <th scope="col" className="px-4 py-3">
                Subtotal
              </th>
              <th scope="col" className="px-4 py-3">
                Stock restante
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.articuloId} className="border-t border-solid border-sf-border">
                <td className="px-4 py-3">
                  <Link to={`/inventario/detalle/${item.articulo.id}`} className={ENLACE}>
                    {item.articulo.nombre}
                  </Link>
                  <p className="mt-1 mb-0 text-xs text-sf-muted">
                    {item.articulo.marca} · {item.articulo.tipo}
                  </p>
                </td>
                <td className="px-4 py-3 font-semibold text-sf-text">
                  {formatearCLP(item.articulo.precio)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <QuantityStepper
                      cantidad={item.cantidad}
                      etiqueta={item.articulo.nombre}
                      onIncrementar={() => onIncrementar(item.articuloId)}
                      onDecrementar={() => onDecrementar(item.articuloId)}
                      deshabilitarIncremento={item.articulo.stock === 0}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-sf-green">
                  {formatearCLP(calcularSubtotal(item.articulo.precio, item.cantidad))}
                </td>
                <td className="px-4 py-3">
                  <StockBadge stock={item.articulo.stock} sufijo="" />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onEliminar(item.articuloId)}
                    aria-label={`Quitar ${item.articulo.nombre} del carrito`}
                  >
                    Quitar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
