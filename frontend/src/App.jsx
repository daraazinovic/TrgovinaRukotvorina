import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constant'
import Pocetna from './pages/Pocetna'
import ProizvodiPregled from './pages/proizvodi/ProizvodiPregled'
import ProizvodiDodaj from './pages/proizvodi/ProizvodiDodaj'
import ProivodiPromjena from './pages/proizvodi/ProizvodiPromjena'
import VrstaPregled from './pages/vrste/VrstePregled'
import VrsteDodaj from './pages/vrste/VrsteDodaj'
import VrstePromjena from './pages/vrste/VrstePromjena'

function App() {


  return (
    <>
      <Container>
        <NavBarEdunova />
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.PROIZVOD_PREGLED} element={<ProizvodiPregled />} />
          <Route path={RouteNames.PROIZVOD_NOVI} element={<ProizvodiDodaj />} />
          <Route path={RouteNames.PROIZVOD_PROMJENA} element={<ProivodiPromjena />} />

          <Route path={RouteNames.VRSTA_PREGLED} element={<VrstaPregled />} />
          <Route path={RouteNames.VRSTA_NOVI} element={<VrsteDodaj />} />
          <Route path={RouteNames.VRSTA_PROMJENA} element={<VrstePromjena />} />
        </Routes>

        <hr />
        &copy; Darko Azinović
      </Container>
      
    </>
  )
}

export default App
