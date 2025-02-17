import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constant";
import ProizvodService from "../../services/ProizvodService";
import { useEffect, useState } from "react";

export default function ProivodiPromjena(){

    const navigate = useNavigate();
    const [proizvod,setProizvod] =useState({});
    const routeParams = useParams();

    async function  dohvatiProizvod(){
        const odgovor = await ProizvodService.getBySifra(routeParams.sifra)
        setProizvod(odgovor)
    }

    useEffect(()=>{
        dohvatiProizvod();
    },[])
        
    


    async function promjena(proizvod){
        const odgovor = await ProizvodService.promjena(routeParams.sifra,proizvod);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.PROIZVOD_PREGLED)
    }

    function odradiSubmit(e){ // e je event
         e.preventDefault();  // nemoj odraditi zahtjev na server po standardnom načinu

         let podaci = new FormData(e.target);

         promjena(
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
        Promjena proizvoda
        <Form onSubmit={odradiSubmit}>

        <Form.Group controllid="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required defaultValue={proizvod.naziv}/>
            </Form.Group>

            <Form.Group controllid="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" name="cijena" required  defaultValue={proizvod.cijena}/>
            </Form.Group>

            <Form.Group controllid="izradujeSeOd">
                <Form.Label>Izrađuje se od</Form.Label>
                <Form.Control type="text" name="izradujeSeOd" required  defaultValue={proizvod.izradujeSeOd}/>
            </Form.Group>

            <Form.Group controllid="namjena">
                <Form.Label>Namjena</Form.Label>
                <Form.Control type="text" name="namjena" required defaultValue={proizvod.namjena}/>
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
                        Promjeni proizvod
                    </Button>
                    
                </Col>
        </Row>



        </Form>



       
        </>
    )

}

