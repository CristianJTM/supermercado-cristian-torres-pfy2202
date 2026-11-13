import { Link, useNavigate } from 'react-router'
import InventarioHeader from '../components/inventario/InventarioHeader.jsx'
import Button, { buttonClass } from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import { ACCIONES, useInventario } from '../context/InventarioContext.jsx'
import { FORM_INICIAL_ARTICULO, TIPOS_ARTICULO } from '../data/inventario.js'
import useFormArticulo from '../hooks/useFormArticulo.js'

function crearId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function AgregarArticulo() {
  const { articulos, dispatch } = useInventario()
  const navigate = useNavigate()

  const {
    form,
    errores,
    handleChange,
    handleSubmit,
    nombreRef,
    marcaRef,
    stockRef,
    precioRef,
    tipoRef,
  } = useFormArticulo({
    initialValues: FORM_INICIAL_ARTICULO,
    articulos,
    onGuardar: (datos) => {
      dispatch({
        type: ACCIONES.AGREGAR,
        payload: {
          id: crearId(),
          ...datos,
        },
      })

      navigate('/inventario/lista')
    },
  })

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10">
      <InventarioHeader
        eyebrow="Inventario"
        title="Agregar artículo"
        lead="Registra un nuevo producto con su nombre, marca, tipo, precio y stock para incorporarlo al inventario del supermercado."
      />

      <div className="mt-8 rounded-3xl border border-solid border-sf-border bg-white p-6 shadow-sm sm:p-8">
        <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
          {errores.duplicado && (
            <p
              role="alert"
              className="mb-0 rounded-xl border border-solid border-sf-error/30 bg-sf-soft px-3 py-2 text-xs font-semibold text-sf-error sm:col-span-2"
            >
              {errores.duplicado}
            </p>
          )}

          <FormField
            variant="tailwind"
            id="nombre"
            name="nombre"
            label="Nombre"
            value={form.nombre}
            onChange={handleChange}
            error={errores.nombre}
            inputRef={nombreRef}
            required
            autoComplete="off"
            placeholder="Ej: Leche entera"
          />

          <FormField
            variant="tailwind"
            id="marca"
            name="marca"
            label="Marca"
            value={form.marca}
            onChange={handleChange}
            error={errores.marca}
            inputRef={marcaRef}
            required
            autoComplete="off"
            placeholder="Ej: Colún"
          />

          <FormField
            variant="tailwind"
            id="precio"
            name="precio"
            label="Precio (CLP)"
            type="number"
            min={1}
            max={9999999}
            step={1}
            value={form.precio}
            onChange={handleChange}
            error={errores.precio}
            inputRef={precioRef}
            required
            placeholder="Ej: 1290"
          />

          <FormField
            variant="tailwind"
            id="stock"
            name="stock"
            label="Cantidad disponible"
            type="number"
            min={0}
            max={9999}
            step={1}
            value={form.stock}
            onChange={handleChange}
            error={errores.stock}
            inputRef={stockRef}
            required
          />

          <FormField
            variant="tailwind"
            as="select"
            id="tipo"
            name="tipo"
            label="Tipo"
            value={form.tipo}
            onChange={handleChange}
            error={errores.tipo}
            inputRef={tipoRef}
            options={TIPOS_ARTICULO}
            required
          />

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
            <Button type="submit">Guardar artículo</Button>
            <Link to="/inventario/lista" className={buttonClass({ variant: 'secondary' })}>
              Ver inventario
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
