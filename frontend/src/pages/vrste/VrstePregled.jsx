import { useEffect, useState } from "react"
import VrstaService from "../../services/VrstaService"
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constant";

export default function VrstaPregled(){

    const[vrste, setVrste] = useState();
    const navigate = useNavigate();

    async function dohvatiVrste(){
        const odgovor = await VrstaService.get()
        setVrste(odgovor)


    
        
    }


    
    useEffect(()=>{
        dohvatiVrste()
    },[])

function obrisi(sifra){
    if(!confirm('Sigurno obrisati')){
        return;
    }
    brisanjeVrste(sifra);
}

async function brisanjeVrste(sifra) {
    const odgovor =await VrstaService.obrisi(sifra);
    if(odgovor.greska){
        alert(odgovor.poruka)
        return
    }
    dohvatiVrste()
}
    

    return(
        <>
        <Link
        to={RouteNames.VRSTA_NOVI}
        className="btn btn-success"
        >Dodaj novu vrstu</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Sastav</th>
                    <th>Akcija</th>
                   
                
                </tr>

            </thead>
            <tbody>
                {vrste && vrste.map((vrsta,index)=>(
                    <tr key={index}>
                        <td>
                            {vrsta.sastav}
                            
                            
                            
                        </td>
                      
                
                            

                       
                        <td>
                            <Button
                            onClick={()=>navigate(`/vrste/${vrsta.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(vrsta.sifra)}
                            >Obrisi</Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}