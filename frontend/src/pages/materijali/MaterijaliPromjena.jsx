import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams, useRouteError } from "react-router-dom";
import { RouteNames } from "../../constant";
import VrstaService from "../../services/VrstaService";
import { useEffect, useRef, useState } from "react";
import MaterijalService from "../../services/MaterijalService";

export default function MaterijaliPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
  
    const [vrste, setVrste] = useState([]);
    const [vrstaSifra, setVrstaSifra] = useState(0);
  
    const [materijal, setMaterijal] = useState({});
  
  
      async function dohvatiVrste(){
      
        const odgovor = await VrstaService.get();
    
        setVrste(odgovor);
      }
  
 
  
    async function dohvatiMaterijale() {
      const odgovor = await MaterijalService.getBySifra(routeParams.sifra);
      if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
      let materijal = odgovor.poruka;
      setMaterijal(materijal);
      setVrstaSifra(materijal.vrstaSifra); 
    }
  
    async function dohvatiInicijalnePodatke() {
      await dohvatiVrste();
      await dohvatiMaterijale();
    }
  
  
    useEffect(()=>{
      dohvatiInicijalnePodatke();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    async function promjena(e){
      const odgovor = await MaterijalService.promjena(routeParams.sifra,e);
      if(odgovor.greska){
          alert(odgovor.poruka);
          return;
      }
      navigate(RouteNames.MATERIJAL_PREGLED);
  }
  
    function obradiSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
  
      promjena({
        naziv: podaci.get('naziv'),
        vrstaSifra: vrstaSifra
       
      });
    }
  

           
    


        return (
            <>
                <div>
                    Promjena materijala
                </div>
                <div>
                    <Form onSubmit={obradiSubmit}>
                        <Form.Group controlId="naziv">
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control type="text" name="naziv" required defaultValue={materijal.naziv  } />
                        </Form.Group>
    
                        <Form.Group className='mb-3' controlId='vrsta'>
                            <Form.Label>Vrsta</Form.Label>
                            <Form.Select
                                value={vrstaSifra}
                                onChange={(e) => { setVrstaSifra(e.target.value); }}
                            >
                                {vrste && vrste.map((s, index) => (
                                    <option key={index} value={s.sifra}>
                                        {s.sastav}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
    
                        <hr />
    
                        <Row>
                            <Col xs={6} sm={12} md={3} lg={2} xl={6} xxl={6}>
                                <Link
                                    to={RouteNames.MATERIJAL_PREGLED}
                                    className="btn btn-danger siroko"
                                >Odustani</Link>
                            </Col>
                            <Col xs={6} sm={12} md={9} lg={10} xl={6} xxl={6}>
                                <Button variant="success" type="submit" className="siroko">
                                    Promjeni Materijal
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </>
        );
    }
    