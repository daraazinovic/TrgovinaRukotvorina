import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constant";
import VrstaService from "../../services/VrstaService";
import { useEffect, useState } from "react";

export default function VrstePromjena(){

    const navigate = useNavigate();
    const [vrsta,setVrsta] =useState({});
    const routeParams = useParams();

    async function  dohvatiVrste(){
        const odgovor = await VrstaService.getBySifra(routeParams.sifra)
        setVrsta(odgovor)
    }

    useEffect(()=>{
        dohvatiVrste();
    },[])
        
    


    async function promjena(vrsta){
        const odgovor = await VrstaService.promjena(routeParams.sifra,vrsta);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.VRSTA_PREGLED)
    }

    function odradiSubmit(e){ // e je event
         e.preventDefault();  // nemoj odraditi zahtjev na server po standardnom načinu

         let podaci = new FormData(e.target);

         promjena(
             {
            sastav: podaci.get('sastav'),
           
            }


         
         );

         

        }    
    


    return(
        <>
        Promjena vrste
        <Form onSubmit={odradiSubmit}>

        <Form.Group controllid="sastav">
                <Form.Label>Sastav</Form.Label>
                <Form.Control type="text" name="sastav" required defaultValue={vrsta.sastav}/>
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
                        Promjeni vrstu
                    </Button>
                    
                </Col>
        </Row>



        </Form>



       
        </>
    )

}

