import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constant";
import VrstaService from "../../services/VrstaService";
import MaterijalService from "../../services/MaterijalService";
import { useState } from "react";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";


export default function MaterijaliDodaj() {
    const navigate = useNavigate();
   
    
  
    const [vrste, setVrste] = useState([]);
    const [vrstaSifra, setVrstaSifra] = useState(0);

    const {prikaziError } = useError
  
    
  
    async function dohvatiVrste(){
    
      const odgovor = await VrstaService.get();
  
      setVrste(odgovor.poruka);
      setVrstaSifra(odgovor.poruka.vrstaSifra);
    }



    dohvatiVrste({
        vrstaSifra: parseInt(vrstaSifra)

    });


    



   
        // eslint-disable-next-line react-hooks/exhaustive-deps
  
    
      async function dodaj(e) {
       
        const odgovor = await MaterijalService.dodaj(e);
      
        if(odgovor.greska){
          prikaziError(odgovor.poruka);
          return;
        }
        navigate(RouteNames.MATERIJAL_PREGLED);
      }
    
      function odradiSubmit(e) {
        e.preventDefault();
    
        const podaci = new FormData(e.target);
    
    
        dodaj({
          naziv: podaci.get('naziv'),
          vrstaSifra: parseInt(vrstaSifra)
         
        });
      }


    return(
        <>
        Dodavanje materijala
        <Form onSubmit={odradiSubmit}>

        <Form.Group controlid="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>


            <Form.Group className='mb-3' controlId='vrsta'>
            <Form.Label>Vrsta</Form.Label>
            <Form.Select 
            onChange={(e)=>{setVrstaSifra(e.target.value)}}
            >
            {vrste && vrste.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.sastav}
              </option>
            ))}
            </Form.Select>
          </Form.Group>


        

           


            <hr/>


            <Row>
                <Col xs={6} sm={12} md={3} lg={2} xl={6} xxl={6}>
                    <Link
                    to={RouteNames.MATERIJAL_PREGLED}
                    className="btn btn-danger siroko"
                    >Odustani</Link>
                </Col>
                <Col xs={6} sm={12} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit" className="siroko">
                        Dodaj materijal
                    </Button>
                    
                </Col>
        </Row>



        </Form>



       
        </>
    )

}

