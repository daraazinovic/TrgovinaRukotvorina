import { useEffect, useState } from "react"
import ProizvodService from "../../services/ProizvodService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constant";

export default function ProizvodiPregled(){

    const[proizvodi, setProizvodi] = useState();
    const navigate = useNavigate();

    async function dohvatiProizvode(){
        const odgovor = await ProizvodService.get()
        setProizvodi(odgovor)


    
        
    }


    //hooks (kuka) se izvodi prilikom dolaska na stranicu Proizvodi
    useEffect(()=>{
        dohvatiProizvode()
    },[])

function obrisi(sifra){
    if(!confirm('Sigurno obrisati')){
        return;
    }
    brisanjeProizvoda(sifra);
}

async function brisanjeProizvoda(sifra) {
    const odgovor =await ProizvodService.obrisi(sifra);
    if(odgovor.greska){
        alert(odgovor.poruka)
        return
    }
    dohvatiProizvode()
}
    

    return(
        <>
        <Link
        to={RouteNames.PROIZVOD_NOVI}
        className="btn btn-success"
        >Dodaj novi proizvod</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Izrađuje se od</th>
                    <th>Cijena</th>
                    <th>Namjena</th>
                    <th>Akcija</th>
                
                </tr>

            </thead>
            <tbody>
                {proizvodi && proizvodi.map((proizvod,index)=>(
                    <tr key={index}>
                        <td>
                            {proizvod.naziv}
                        </td>
                        <td>
                            {proizvod.izradujeSeOd}
                        </td>
                        
                            
                            
                        
                        <td className={proizvod.cijena==null ? 'sredina' : 'desno'}>
                            
                            {proizvod.cijena==null ? 'Nije definirano ' :

                            <NumericFormat
                            value={proizvod.cijena}
                            displayType={'text'}
                            thousandSeparator=','
                            prefix="€"
                            decimalScale={2}
                            fixedDecimalScale
                        />

                            }
</td>
                        <td>
                            {proizvod.namjena}
                        </td>
                        <td>
                            <Button
                            onClick={()=>navigate(`/proizvodi/${proizvod.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(proizvod.sifra)}
                            >Obrisi</Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}