import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import InventarioHeader from '../components/inventario/InventarioHeader.jsx'
import Button, { buttonClass } from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import { ACCIONES, useInventario } from '../context/InventarioContext.jsx'
import { FORM_INICIAL_ARTICULO, TIPOS_ARTICULO } from '../data/inventario.js'
import useFormArticulo from '../hooks/useFormArticulo.js'
import { buscarArticulo } from '../utils/inventario.js'

export default function EditarArticulo() {
  const { id } = useParams()
  const { articulos, dispatch } = useInventario()
  const navigate = useNavigate()
  const articulo = buscarArticulo(articulos, id)

  const otrosArticulos = useMemo(
    () => articulos.filter((item) => item.id !== id),
    [articulos, id],
  )

  const valoresIniciales = useMemo(
    () =>
      articulo
        ? {
            nombre: articulo.nombre,
            marca: articulo.marca,
            tipo: articulo.tipo,
            stock: articulo.stock,
            precio: articulo.precio,
          }
        : FORM_INICIAL_ARTICULO,
    [articulo],
  )

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
    initialValues: valoresIniciales,
    articulos: otrosArticulos,
    onGuardar: (datos) => {
      dispatch({
        type: ACCIONES.EDITAR,
        payload: { id, ...datos },
      })

      navigate(`/inventario/detalle/${id}`)
    },
  })

  if (!articulo) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-10">
        <InventarioHeader
          eyebrow="Inventario"
          title="Artículo no encontrado"
          lead="El artículo que intentas editar no existe o fue eliminado del inventario."
        />
        <Link to="/inventario/lista" className={buttonClass({ className: 'mt-6' })}>
          Volver a la lista
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10">
      <InventarioHeader
        eyebrow="Inventario"
        title="Editar artículo"
        lead={`Actualiza la información de ${articulo.nombre}. El stock disponible no incluye las unidades que ya están en el carrito.`}
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
            <Button type="submit">Guardar cambios</Button>
            <Link
              to={`/inventario/detalle/${id}`}
              className={buttonClass({ variant: 'secondary' })}
            >
              Cancelar
            </Link>
            <Link
              to="/inventario/lista"
              className={buttonClass({ variant: 'link', className: 'sm:ml-2' })}
            >
              Volver a la lista
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
