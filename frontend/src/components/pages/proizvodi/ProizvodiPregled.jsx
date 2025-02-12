import { useEffect, useState } from "react"
import ProizvodService from "../../../services/ProizvodService"
import { Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../constant";

export default function ProizvodiPregled(){

    const[proizvodi, setProizvodi] = useState();

    async function dohvatiProizvode(){
        const odgovor = await ProizvodService.get()
        setProizvodi(odgovor)


    
        
    }


    //hooks (kuka) se izvodi prilikom dolaska na stranicu Proizvodi
    useEffect(()=>{
        dohvatiProizvode()
    },[])


    

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
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}