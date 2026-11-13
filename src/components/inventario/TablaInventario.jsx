import { Link } from 'react-router'
import Button, { buttonClass } from '../ui/Button.jsx'
import StockBadge from '../ui/StockBadge.jsx'
import { formatearCLP } from '../../utils/formatoMoneda.js'

const ENLACE_TABLA =
  'text-sf-text underline decoration-sf-green/40 decoration-2 underline-offset-4 transition hover:text-sf-green'

export default function TablaInventario({ articulos, onEliminar }) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {articulos.map((articulo) => (
          <article
            key={articulo.id}
            className="rounded-2xl border border-solid border-sf-border bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link to={`/inventario/detalle/${articulo.id}`} className={`font-bold ${ENLACE_TABLA}`}>
                  {articulo.nombre}
                </Link>
                <p className="mt-1 mb-0 text-sm text-sf-muted">
                  {articulo.marca} · {articulo.tipo}
                </p>
              </div>
              <StockBadge stock={articulo.stock} />
            </div>

            <p className="mt-3 mb-0 text-sm text-sf-muted">
              Precio: <span className="font-bold text-sf-text">{formatearCLP(articulo.precio)}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to={`/inventario/detalle/${articulo.id}`}
                className={buttonClass({ variant: 'secondary', size: 'sm', className: 'flex-1' })}
              >
                Ver detalle
              </Link>
              <Link
                to={`/inventario/editar/${articulo.id}`}
                className={buttonClass({ variant: 'secondary', size: 'sm', className: 'flex-1' })}
              >
                Editar
              </Link>
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                onClick={() => onEliminar(articulo)}
                aria-label={`Eliminar ${articulo.nombre}`}
              >
                Eliminar
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-3xl border border-solid border-sf-border bg-white shadow-sm md:block">
        <table className="w-full min-w-[820px] text-left text-sm">
          <caption className="sr-only">Listado de artículos del inventario</caption>
          <thead className="bg-sf-sand text-xs font-extrabold uppercase tracking-wide text-sf-muted">
            <tr>
              <th scope="col" className="px-4 py-3">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3">
                Marca
              </th>
              <th scope="col" className="px-4 py-3">
                Tipo
              </th>
              <th scope="col" className="px-4 py-3">
                Precio
              </th>
              <th scope="col" className="px-4 py-3">
                Stock
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {articulos.map((articulo) => (
              <tr key={articulo.id} className="border-t border-solid border-sf-border">
                <td className="px-4 py-3 font-semibold">
                  <Link to={`/inventario/detalle/${articulo.id}`} className={ENLACE_TABLA}>
                    {articulo.nombre}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sf-muted">{articulo.marca}</td>
                <td className="px-4 py-3 text-sf-muted">{articulo.tipo}</td>
                <td className="px-4 py-3 font-semibold text-sf-text">
                  {formatearCLP(articulo.precio)}
                </td>
                <td className="px-4 py-3">
                  <StockBadge stock={articulo.stock} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      to={`/inventario/detalle/${articulo.id}`}
                      className={buttonClass({ variant: 'secondary', size: 'sm' })}
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/inventario/editar/${articulo.id}`}
                      className={buttonClass({ variant: 'secondary', size: 'sm' })}
                    >
                      Editar
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onEliminar(articulo)}
                      aria-label={`Eliminar ${articulo.nombre}`}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
