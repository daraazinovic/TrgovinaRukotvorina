import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constant";
import ProizvodService from "../../services/ProizvodService";


export default function ProivodiDodaj(){

    const navigate = useNavigate();


    async function dodaj(proizvod){
        const odgovor =await ProizvodService.dodaj(proizvod);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.PROIZVOD_PREGLED)
    }

    function odradiSubmit(e){ // e je event
         e.preventDefault();  // nemoj odraditi zahtjev na server po standardnom načinu

         let podaci = new FormData(e.target);

         dodaj(
             {
            naziv: podaci.get('naziv'),
            izradujeSeOd: podaci.get('izradujeSeOd'),
            cijena: parseFloat(podaci.get('cijena')),
            namjena: podaci.get('namjena')
            }


         
         );

         

        }    
    


    return(
        <>
        Dodavanje proizvoda
        <Form onSubmit={odradiSubmit}>

        <Form.Group controlid="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlid="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" name="cijena" required />
            </Form.Group>

            <Form.Group controlid="izradujeSeOd">
                <Form.Label>Izrađuje se od</Form.Label>
                <Form.Control type="text" name="izradujeSeOd" required />
            </Form.Group>

            <Form.Group controlid="namjena">
                <Form.Label>Namjena</Form.Label>
                <Form.Control type="text" name="namjena" required />
            </Form.Group>


            <hr/>


            <Row>
                <Col xs={6} sm={12} md={3} lg={2} xl={6} xxl={6}>
                    <Link
                    to={RouteNames.PROIZVOD_PREGLED}
                    className="btn btn-danger siroko"
                    >Odustani</Link>
                </Col>
                <Col xs={6} sm={12} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit" className="siroko">
                        Dodaj proizvod
                    </Button>
                    
                </Col>
        </Row>



        </Form>



       
        </>
    )

}

