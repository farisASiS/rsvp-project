import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Utama from './pages/Utama'
import Aturcara from './pages/Aturcara'
import Lokasi from './pages/Lokasi'
import Rsvp from './pages/Rsvp'
import SedangDiselenggara from './pages/SedangDiselenggara'
import DaftarMasuk from './pages/DaftarMasuk'
import Header from './components/Header'
import DaftarAkaun from './pages/DaftarAkaun'
import PrivateRoute from './components/PrivateRoute'
import Akaun from './pages/Akaun'
import KemaskiniAcara from './pages/KemaskiniAcara'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Utama />} />
        <Route path="/aturcara" element={<Aturcara />} />
        <Route path="/lokasi" element={<Lokasi />} />
        <Route path="/rsvp" element={<Rsvp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/akaun" element={<Akaun />} />
          <Route path="/kemaskini-acara" element={<KemaskiniAcara />} />
        </Route>
        <Route path="/daftar-masuk" element={<DaftarMasuk />} />
        <Route path="/daftar-akaun" element={<DaftarAkaun />} />
        <Route path="/sedang-diselenggara" element={<SedangDiselenggara />} />
      </Routes>
    </BrowserRouter>
  )
}
