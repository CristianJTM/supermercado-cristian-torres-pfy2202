export default function StockBadge({ stock, sufijo = 'disponibles' }) {
  const sinStock = stock <= 0

  return (
    <span className={sinStock ? 'font-bold text-sf-error' : 'font-bold text-sf-green'}>
      {sinStock ? 'Sin stock' : sufijo ? `${stock} ${sufijo}` : stock}
    </span>
  )
}
