const BOTON =
  'grid h-8 w-8 place-items-center rounded-full border border-solid border-sf-border text-base font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30 disabled:cursor-not-allowed disabled:opacity-40'

export default function QuantityStepper({
  cantidad,
  etiqueta = 'artículo',
  onIncrementar,
  onDecrementar,
  deshabilitarIncremento = false,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrementar}
        aria-label={`Disminuir cantidad de ${etiqueta}`}
        className={BOTON}
      >
        −
      </button>
      <span className="min-w-6 text-center font-bold text-sf-text" aria-live="polite">
        {cantidad}
      </span>
      <button
        type="button"
        onClick={onIncrementar}
        disabled={deshabilitarIncremento}
        aria-label={`Aumentar cantidad de ${etiqueta}`}
        className={BOTON}
      >
        +
      </button>
    </div>
  )
}
