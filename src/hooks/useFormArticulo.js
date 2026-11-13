import { useRef, useState } from 'react'
import { validarArticulo } from '../utils/validacion.js'

export default function useFormArticulo({ initialValues, articulos = [], onGuardar }) {
  const [form, setForm] = useState(initialValues)
  const [errores, setErrores] = useState({})
  const nombreRef = useRef(null)
  const marcaRef = useRef(null)
  const stockRef = useRef(null)
  const precioRef = useRef(null)
  const tipoRef = useRef(null)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((anterior) => ({ ...anterior, [name]: value }))
    setErrores((anteriores) => {
      const siguientes = { ...anteriores }
      delete siguientes[name]
      delete siguientes.duplicado
      return siguientes
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nuevosErrores = validarArticulo(form, articulos)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      if (nuevosErrores.nombre || nuevosErrores.duplicado) {
        nombreRef.current?.focus()
      } else if (nuevosErrores.marca) {
        marcaRef.current?.focus()
      } else if (nuevosErrores.stock) {
        stockRef.current?.focus()
      } else if (nuevosErrores.precio) {
        precioRef.current?.focus()
      } else if (nuevosErrores.tipo) {
        tipoRef.current?.focus()
      }

      return
    }

    onGuardar({
      nombre: form.nombre.trim().replace(/\s+/g, ' '),
      marca: form.marca.trim().replace(/\s+/g, ' '),
      tipo: form.tipo,
      stock: Number(form.stock),
      precio: Number(form.precio),
    })

    setForm(initialValues)
    setErrores({})
  }

  return {
    form,
    errores,
    handleChange,
    handleSubmit,
    nombreRef,
    marcaRef,
    stockRef,
    precioRef,
    tipoRef,
  }
}
