# Súper Fresco 🛒

SPA de supermercado desarrollada para **Desarrollo Frontend II (PFY2202)**. La Semana 1 construyó
la navegación y las páginas institucionales; la Semana 2 agregó inventario global y Tailwind; la
Semana 3 incorpora filtro por categoría, detalle de artículos y carrito con actualización de stock.
Sobre esa base se agregaron precios con subtotales, edición de artículos y confirmación de borrado.

## Sitio publicado

[Ver la aplicación en GitHub Pages](https://cristianjtm.github.io/supermercado-cristian-torres-pfy2202/)

## Stack

- React 18.3.1
- React Router 7.18.4 (`react-router`, sin `react-router-dom`)
- Vite 5
- Tailwind CSS 3.4.17 en las páginas nuevas
- CSS Modules en los componentes de Semana 1
- Sin backend ni APIs externas

## Requisitos

- Node.js 20 o superior
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

Para generar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

Para ejecutar las pruebas automatizadas:

```bash
npm test
```

## Rutas

| Ruta | Vista | Etiqueta del navbar |
| --- | --- | --- |
| `/` | Home | Inicio |
| `/quienes-somos` | QuienesSomos | Nosotros |
| `/contacto` | Contacto | Contacto |
| `/inventario/agregar` | AgregarArticulo | Agregar |
| `/inventario/lista` | ListaInventario | Lista |
| `/inventario/detalle/:id` | DetalleArticulo | — |
| `/inventario/editar/:id` | EditarArticulo | — |
| `/carrito` | Carrito | Carrito |
| `*` | NotFound | — |

Toda la navegación interna usa `Link` y `NavLink` importados desde `react-router`. El navbar se
renderiza dentro de `AppLayout` mediante `<Outlet />`, por lo que permanece visible en todas las
vistas.

## Estado global de inventario

`InventarioContext` usa `useReducer` y `useContext`. El Provider envuelve toda la aplicación en
`App.jsx`.

El estado global es un objeto con inventario y carrito:

```js
{
  articulos: [
    {
      id: 'uuid',
      nombre: 'Leche entera',
      marca: 'Colún',
      tipo: 'Lácteos',
      stock: 8,
      precio: 1290,
    },
  ],
  carrito: [
    {
      articuloId: 'uuid',
      cantidad: 2,
    },
  ],
}
```

`stock` es la cantidad disponible en inventario, `precio` está expresado en pesos chilenos (CLP,
entero) y `cantidad` es la cantidad en el carrito. El carrito referencia artículos por
`articuloId`, por lo que nombre, marca y precio no se duplican.

Los 6 artículos de ejemplo viven en `src/data/inventarioInicial.js`. La función
`crearInventarioInicial()` devuelve una copia nueva de los datos para que el reducer nunca comparta
objetos con el seed.

Acciones del reducer:

- `ADD_ARTICULO`: agrega un artículo con stock y precio.
- `EDIT_ARTICULO`: actualiza nombre, marca, tipo, stock y precio conservando el `id` y el carrito.
- `DELETE_ARTICULO`: elimina el artículo y su referencia del carrito.
- `ADD_TO_CART`: agrega unidades y descuenta stock. Acepta `{ articuloId, cantidad }`; el detalle
  envía una unidad y el carrito usa la misma acción para reponer. Si la cantidad supera el stock,
  no hay cambios.
- `DECREMENT_CART`: disminuye la cantidad y devuelve stock; al llegar a 1 elimina la fila.
- `REMOVE_FROM_CART`: quita el artículo y restaura toda su cantidad al stock.

El estado vive en memoria: al recargar la página se reinicia. La persistencia no forma parte de los
requerimientos de esta actividad.

## Filtro, detalle y carrito

- La lista permite filtrar por categoría con estado local. El array `articulos` del contexto no se
  modifica: se deriva con `filtrarArticulos`.
- Al hacer clic en un artículo se abre `/inventario/detalle/:id`.
- El detalle muestra nombre, marca, tipo, precio y stock; permite agregar al carrito y deshabilita
  la acción cuando no hay stock.
- El carrito lista los artículos agregados, permite aumentar/disminuir cantidades y quitar filas.
- Cada fila del carrito muestra precio unitario, subtotal y stock restante; el total de la compra
  se calcula con `calcularTotalCarrito`.
- Cada operación de carrito actualiza stock y carrito en una sola transición del reducer.
- Eliminar un artículo del inventario pide confirmación en un diálogo accesible antes de borrarlo.
- La pantalla `/inventario/editar/:id` reutiliza el formulario y permite corregir los datos sin
  perder el carrito.
- El navbar incluye Carrito con un badge que muestra la cantidad total de unidades.
- Las tablas se convierten en tarjetas en móvil para evitar cortes horizontales.

## Validación del inventario

Las reglas viven en `src/utils/validacion.js` y se prueban en `src/utils/validacion.test.js`.

- `nombre` y `marca`: entre 2 y 60 caracteres, con al menos una letra y caracteres permitidos.
- `stock`: entero entre 0 y 9999.
- `precio`: entero en pesos chilenos entre 1 y 9.999.999.
- Se rechazan cadenas vacías, solo espacios, solo números o solo signos.
- Se permiten números dentro del texto: `3 cereales`, `Leche 1 L`, `Coca-Cola`.
- `tipo` debe pertenecer a `TIPOS_ARTICULO`.
- Duplicado: mismo `nombre` + misma `marca`, normalizados a minúsculas, sin tildes y con espacios
  colapsados. El tipo no se considera para la duplicidad.

Ejemplos válidos: `Leche entera`, `Coca-Cola`, `3 cereales`, `Pan de molde`, `Colún`.

Ejemplos inválidos: `""`, `"   "`, `"12345"`, `"!!!"`, `"Leche @"`, `"A"`, tipo `"Otros"`.

## Arquitectura

| Capa | Responsabilidad |
| --- | --- |
| `src/context/` | Contexto, Provider, hook `useInventario`, reducer y acciones |
| `src/pages/` | Composición de vistas |
| `src/components/layout/` | Navbar, Footer, AppLayout y ScrollToTop |
| `src/components/ui/` | Componentes compartidos: PageHero, SectionHead, CtaBand, StatList, FormField, Button, StockBadge, QuantityStepper y ConfirmDialog |
| `src/components/home`, `about`, `contact`, `products` | Secciones de dominio de Semana 1 |
| `src/components/inventario/` | Cabecera y tabla de inventario |
| `src/components/carrito/` | Tabla/cards del carrito |
| `src/data/` | Contenido estático, navegación, tipos, seed y estado inicial del formulario |
| `src/hooks/` | `useContactForm` y `useFormArticulo` |
| `src/utils/` | Validación, filtro, selectores de carrito, pruebas y formato de moneda |
| `src/styles/` | Tokens, reset, layout, utilidades globales y entrada de Tailwind |

## Estructura

```text
src/
├─ context/
│  ├─ InventarioContext.jsx
│  ├─ inventarioReducer.js
│  └─ inventarioReducer.test.js
│
├─ pages/
│  ├─ Home.jsx
│  ├─ QuienesSomos.jsx
│  ├─ Contacto.jsx
│  ├─ AgregarArticulo.jsx
│  ├─ ListaInventario.jsx
│  ├─ DetalleArticulo.jsx
│  ├─ EditarArticulo.jsx
│  ├─ Carrito.jsx
│  └─ NotFound.jsx
│
├─ components/
│  ├─ layout/
│  │  ├─ AppLayout.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Footer.jsx
│  │  └─ ScrollToTop.jsx
│  ├─ ui/
│  │  ├─ PageHero.jsx
│  │  ├─ SectionHead.jsx
│  │  ├─ CtaBand.jsx
│  │  ├─ StatList.jsx
│  │  ├─ FormField.jsx
│  │  ├─ FormField.module.css
│  │  ├─ Button.jsx
│  │  ├─ StockBadge.jsx
│  │  ├─ QuantityStepper.jsx
│  │  └─ ConfirmDialog.jsx
│  ├─ home/
│  ├─ about/
│  ├─ contact/
│  ├─ products/
│  ├─ inventario/
│  │  ├─ InventarioHeader.jsx
│  │  └─ TablaInventario.jsx
│  └─ carrito/
│     └─ TablaCarrito.jsx
│
├─ data/
│  ├─ navegacion.js
│  ├─ sitio.js
│  ├─ home.js
│  ├─ quienesSomos.js
│  ├─ contacto.js
│  ├─ productos.js
│  ├─ equipo.js
│  ├─ inventario.js
│  └─ inventarioInicial.js
│
├─ hooks/
│  ├─ useContactForm.js
│  └─ useFormArticulo.js
│
├─ utils/
│  ├─ validacion.js
│  ├─ validacion.test.js
│  ├─ inventario.js
│  ├─ inventario.test.js
│  └─ formatoMoneda.js
│
├─ styles/
│  ├─ tokens.css
│  ├─ base.css
│  ├─ layout.css
│  ├─ utilities.css
│  └─ tailwind.css
│
├─ App.jsx
└─ main.jsx
```

## Tailwind CSS

Tailwind v3 se integra con Vite mediante PostCSS:

- `tailwind.config.js`: `content` apunta a `index.html` y `src/**/*.{js,jsx}`.
- `postcss.config.js`: plugins `tailwindcss` y `autoprefixer`.
- `src/styles/tailwind.css`: directivas `@tailwind base`, `@tailwind components` y
  `@tailwind utilities`.
- `src/main.jsx` importa Tailwind después de los estilos globales de Semana 1.

Para proteger la interfaz existente:

- `preflight: false`: Tailwind no reemplaza el reset de `styles/base.css`.
- `container: false`: evita la colisión con la clase global `.container` de Semana 1.
- Los CSS Modules de Semana 1 no se modificaron.
- Las páginas de inventario usan utilidades Tailwind y el tema `sf`.
- La paleta `sf` se define una sola vez en `src/styles/tokens.css` mediante canales RGB
  (`--color-primary-rgb`, etc.). Tailwind la consume con
  `rgb(var(--color-...-rgb) / <alpha-value>)`, por lo que no hay hexadecimales duplicados.
- `FormField` admite `variant="default"` (CSS Modules de Contacto) y `variant="tailwind"`
  (formulario de inventario), manteniendo labels, errores y ARIA en un solo componente.
- `Button`, `StockBadge` y `QuantityStepper` centralizan botones, estado de stock y controles de
  cantidad para evitar duplicaciones entre las tablas de inventario y carrito.

## Despliegue en GitHub Pages

```bash
npm run deploy
```

`predeploy` ejecuta el build, `postbuild` genera `dist/404.html` para el fallback de
`BrowserRouter` y `gh-pages` publica `dist/` en la rama `gh-pages` con `.nojekyll`.

URL del sitio:

```text
https://cristianjtm.github.io/supermercado-cristian-torres-pfy2202/
```

## Notas

- No hay backend ni llamadas a APIs.
- El formulario de contacto no envía datos a ningún servidor.
- El navbar inferior tiene seis ítems: Inicio, Nosotros, Contacto, Agregar, Lista y Carrito.
- El carrito muestra un badge con las unidades agregadas.
- El estado de inventario y carrito se conserva al navegar entre rutas, pero se reinicia al recargar.
- El proyecto usa `BrowserRouter` con `basename` y fallback `404.html` para GitHub Pages.
- React Router 7 se importa siempre desde `react-router`; no se usa `react-router-dom`.
- Las pruebas de reducer, filtro, carrito y validación se ejecutan con `npm test`.

## Autor

Cristian Torres — Proyecto académico PFY2202.
