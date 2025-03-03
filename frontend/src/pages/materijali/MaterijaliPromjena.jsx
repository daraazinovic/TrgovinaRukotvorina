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





    async function dohvatiVrste() {
        const odgovor = await VrstaService.get();
       setVrste(odgovor.poruka);
        }

        async function dohvatiMaterijale() {
            const odgovor = await Service.getBySifra(routeParams.sifra)
            if(odgovor.greska){
               
                return;
            }
        }


       
    

       
      
       setVrstaSifra(materijal.vrstaSifra);
        
}


    async function promjena(e){
        showLoading();
         const odgovor = await Service.promjena(routeParams.sifra,e);
        hideLoading();
        if(odgovor.greska){
          
        
            return;
        }
        navigate(RouteNames.MATERIJAL_PREGLED)
    }

    function odradiSubmit(e){ // e je event
         e.preventDefault();  // nemoj odraditi zahtjev na server po standardnom načinu

         const podaci = new FormData(e.target);

         promjena(
             {
            naziv: podaci.get('naziv'),    
            vrstaSifra: parseInt(vrstaSifra)
           
            }


         
    );

         

           
    


        return (
            <>
                <div>
                    Promjena materijala
                </div>
                <div>
                    <Form onSubmit={odradiSubmit}>
                        <Form.Group controlId="naziv">
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control type="text" name="naziv" required defaultValue={materijal?.naziv || ''} onChange={(e) => setMaterijal({ ...materijal, naziv: e.target.value })} />
                        </Form.Group>
    
                        <Form.Group className='mb-3' controlId='smjer'>
                            <Form.Label>Vrsta</Form.Label>
                            <Form.Select
                                value={vrstaSifra}
                                onChange={(e) => { getVrstaSifra(e.target.value); }}
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
    