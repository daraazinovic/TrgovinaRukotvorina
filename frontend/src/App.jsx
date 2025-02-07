import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constant'
import Pocetna from './components/pages/Pocetna'
import ProizvodiPregled from './components/pages/Proizvodi/ProizvodiPregled'

function App() {


  return (
    <>
      <Container>
        <NavBarEdunova />
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.PROIZVOD_PREGLED} element={<ProizvodiPregled />} />
        </Routes>

        <hr />
        &copy; Darko Azinović
      </Container>
      
    </>
  )
}

export default App
