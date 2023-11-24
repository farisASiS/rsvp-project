import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Utama from './pages/Utama'
import Aturcara from './pages/Aturcara'
import Lokasi from './pages/Lokasi'
import Rsvp from './pages/Rsvp'
import SedangDiselenggara from './pages/SedangDiselenggara'
import LogIn from './pages/LogIn'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Utama />} />
        <Route path="/aturcara" element={<Aturcara />} />
        <Route path="/lokasi" element={<Lokasi />} />
        <Route path="/rsvp" element={<Rsvp />} />
        <Route path="/log-in" element={<LogIn />} />

        <Route path="/sedang-diselenggara" element={<SedangDiselenggara />} />
      </Routes>
    </BrowserRouter>
  )
}
