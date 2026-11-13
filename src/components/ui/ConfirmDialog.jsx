import { useEffect } from 'react'
import Button from './Button.jsx'

export default function ConfirmDialog({
  open,
  titulo,
  descripcion,
  textoConfirmar = 'Eliminar',
  textoCancelar = 'Cancelar',
  onConfirmar,
  onCancelar,
}) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancelar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onCancelar])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-sf-text/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancelar()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-titulo"
        aria-describedby="confirm-dialog-descripcion"
        className="w-full max-w-md rounded-3xl border border-solid border-sf-border bg-white p-6 shadow-lg"
      >
        <h2 id="confirm-dialog-titulo" className="mb-0 text-lg font-bold text-sf-text">
          {titulo}
        </h2>
        <p id="confirm-dialog-descripcion" className="mt-2 mb-0 text-sm text-sf-muted">
          {descripcion}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            size="sm"
            autoFocus
            onClick={onCancelar}
          >
            {textoCancelar}
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirmar}>
            {textoConfirmar}
          </Button>
        </div>
      </div>
    </div>
  )
}
