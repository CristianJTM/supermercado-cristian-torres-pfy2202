import { TIPOS_ARTICULO } from '../data/inventario.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TELEFONO_REGEX = /^\+?[\d\s]{8,15}$/
const TEXTO_PERMITIDO = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,'&()/-]+$/
const TIENE_LETRA = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/
const LARGO_MIN = 2
const LARGO_MAX = 60
const PRECIO_MAX = 9999999

export function validarContacto(form) {
  const errores = {}
  const nombre = String(form.nombre ?? '').trim()
  const email = String(form.email ?? '').trim()
  const telefono = String(form.telefono ?? '').trim()
  const mensaje = String(form.mensaje ?? '').trim()

  if (nombre.length < 2) {
    errores.nombre = 'Ingresa tu nombre completo.'
  }

  if (!EMAIL_REGEX.test(email)) {
    errores.email = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }

  if (telefono && !TELEFONO_REGEX.test(telefono)) {
    errores.telefono = 'Ingresa un teléfono válido o deja el campo vacío.'
  }

  if (mensaje.length < 10) {
    errores.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  }

  return errores
}

export function normalizarTexto(valor) {
  return String(valor ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function validarArticulo(form, articulos = []) {
  const errores = {}
  const nombre = String(form.nombre ?? '').trim()
  const marca = String(form.marca ?? '').trim()
  const tipo = String(form.tipo ?? '').trim()

  if (nombre.length < LARGO_MIN || nombre.length > LARGO_MAX) {
    errores.nombre = 'Ingresa un nombre de 2 a 60 caracteres.'
  } else if (!TEXTO_PERMITIDO.test(nombre) || !TIENE_LETRA.test(nombre)) {
    errores.nombre = 'El nombre debe contener al menos una letra y caracteres válidos.'
  }

  if (marca.length < LARGO_MIN || marca.length > LARGO_MAX) {
    errores.marca = 'Ingresa una marca de 2 a 60 caracteres.'
  } else if (!TEXTO_PERMITIDO.test(marca) || !TIENE_LETRA.test(marca)) {
    errores.marca = 'La marca debe contener al menos una letra y caracteres válidos.'
  }

  if (!TIPOS_ARTICULO.includes(tipo)) {
    errores.tipo = 'Selecciona un tipo de artículo válido.'
  }

  const stockTexto = String(form.stock ?? '').trim()
  const stock = Number(stockTexto)

  if (
    stockTexto === '' ||
    !Number.isInteger(stock) ||
    stock < 0 ||
    stock > 9999
  ) {
    errores.stock = 'Ingresa una cantidad entera entre 0 y 9999.'
  }

  const precioTexto = String(form.precio ?? '').trim()
  const precio = Number(precioTexto)

  if (
    precioTexto === '' ||
    !Number.isInteger(precio) ||
    precio < 1 ||
    precio > PRECIO_MAX
  ) {
    errores.precio = 'Ingresa un precio entero en pesos, entre 1 y 9.999.999.'
  }

  if (!errores.nombre && !errores.marca) {
    const nombreNormalizado = normalizarTexto(nombre)
    const marcaNormalizada = normalizarTexto(marca)
    const existe = articulos.some(
      (articulo) =>
        normalizarTexto(articulo.nombre) === nombreNormalizado &&
        normalizarTexto(articulo.marca) === marcaNormalizada,
    )

    if (existe) {
      errores.duplicado = 'Ya existe un artículo con ese nombre y marca.'
    }
  }

  return errores
}
