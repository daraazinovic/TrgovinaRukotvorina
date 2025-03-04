import { useEffect, useState } from "react"
import VrstaService from "../../services/VrstaService"
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constant";
import MaterijalService from "../../services/MaterijalService";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";
import { FaEdit } from "react-icons/fa";

export default function MaterijaliPregled(){

    const[materijali, setMaterijali] = useState();
    let navigate = useNavigate();
    
    const {prikaziError }  = useError;

    async function dohvatiMaterijale(){
      
       await MaterijalService.get()
       .then((odgovor)=>{
        setMaterijali(odgovor);
       })
       .catch((e)=>{console.log(e)});


    }
    
        

       

    


        async function obrisiMaterijal(sifra) {
            
            const odgovor = await Service.obrisi(sifra);
           
            //console.log(odgovor);
            if(odgovor.greska){
                prikaziError(odgovor.poruka);
                return;
            }
            dohvatiMaterijale();
        }
    
      
      
        useEffect(()=>{
            dohvatiMaterijale()
        },[])
    


    //hooks (kuka) se izvodi prilikom dolaska na stranicu Proizvodi
    


        return (
        <Container>
        <Link to={RouteNames.MATERIJAL_NOVI} className="btn btn-success siroko"
            
            size={25}
            > Dodaj materijal </Link>
      
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Vrsta</th>    
                </tr>
            </thead>
            <tbody>
                {materijali && materijali.map((entitet,index)=>(
                    <tr key={index}>
                        <td>{entitet.naziv}</td>
                        <td>{entitet.sastavNaziv}</td>
                        
                        <td className="sredina">
                                <Button
                                    variant='primary'
                                    onClick={()=>{navigate(`/materijali/${entitet.sifra}`)}}
                                >
                                   <FaEdit
                                size={25}
                                />
                                </Button>
                           
                            
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant='danger'
                                    onClick={() => obrisiMaterijal(entitet.sifra)}
                                >
                                    <FaEdit
                                    size={25}
                                    />
                                </Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </Container>


   );

}

