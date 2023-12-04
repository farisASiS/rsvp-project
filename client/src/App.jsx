import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Utama from './pages/Utama'
import SedangDiselenggara from './pages/SedangDiselenggara'
import DaftarMasuk from './pages/DaftarMasuk'
import Header from './components/Header'
import DaftarAkaun from './pages/DaftarAkaun'
import PrivateRoute from './components/PrivateRoute'
import Akaun from './pages/Akaun'
import CiptaAcara from './pages/CiptaAcara'
import KemaskiniAcara from './pages/KemaskiniAcara'
import Acara from './pages/Acara'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Utama />} />
        <Route path='/acara/:listingId' element={<Acara/>} />
        <Route element={<PrivateRoute />}>
          <Route path="/akaun" element={<Akaun />} />
          <Route path="/cipta-acara" element={<CiptaAcara />} />
          <Route path="/kemaskini-acara/:listingId" element={<KemaskiniAcara />} />
        </Route>
        <Route path="/daftar-masuk" element={<DaftarMasuk />} />
        <Route path="/daftar-akaun" element={<DaftarAkaun />} />
        <Route path="/sedang-diselenggara" element={<SedangDiselenggara />} />
      </Routes>
    </BrowserRouter>
  )
}
