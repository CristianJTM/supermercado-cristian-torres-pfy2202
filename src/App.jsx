import { BrowserRouter, Route, Routes } from 'react-router'
import AppLayout from './components/layout/AppLayout.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import { InventarioProvider } from './context/InventarioContext.jsx'
import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Contacto from './pages/Contacto.jsx'
import AgregarArticulo from './pages/AgregarArticulo.jsx'
import ListaInventario from './pages/ListaInventario.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import EditarArticulo from './pages/EditarArticulo.jsx'
import Carrito from './pages/Carrito.jsx'
import NotFound from './pages/NotFound.jsx'

// En desarrollo BASE_URL es "/"; en GitHub Pages es "/<repositorio>/".
// React Router necesita el basename sin la barra final.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <InventarioProvider>
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="quienes-somos" element={<QuienesSomos />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="inventario/agregar" element={<AgregarArticulo />} />
            <Route path="inventario/lista" element={<ListaInventario />} />
            <Route path="inventario/detalle/:id" element={<DetalleArticulo />} />
            <Route path="inventario/editar/:id" element={<EditarArticulo />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </InventarioProvider>
  )
}
