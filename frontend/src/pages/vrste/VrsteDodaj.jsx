import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constant";
import VrstaService from "../../services/VrstaService";


export default function VrsteDodaj(){

    const navigate = useNavigate();


    async function dodaj(vrsta){
        const odgovor =await VrstaService.dodaj(vrsta);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.VRSTA_PREGLED)
    }

    function odradiSubmit(e){ // e je event
         e.preventDefault();  // nemoj odraditi zahtjev na server po standardnom načinu

         let podaci = new FormData(e.target);

         dodaj(
             {
            sastav: podaci.get('sastav'),
            
            }


         
         );

         

        }    
    


    return(
        <>
        Dodavanje vrsta
        <Form onSubmit={odradiSubmit}>

        <Form.Group controlid="sastav">
                <Form.Label>Sastav</Form.Label>
                <Form.Control type="text" name="sastav" required />
            </Form.Group>

           


            <hr/>


            <Row>
                <Col xs={6} sm={12} md={3} lg={2} xl={6} xxl={6}>
                    <Link
                    to={RouteNames.VRSTA_PREGLED}
                    className="btn btn-danger siroko"
                    >Odustani</Link>
                </Col>
                <Col xs={6} sm={12} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit" className="siroko">
                        Dodaj vrstu
                    </Button>
                    
                </Col>
        </Row>



        </Form>



       
        </>
    )

}

