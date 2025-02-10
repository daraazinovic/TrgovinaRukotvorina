import { useEffect, useState } from "react"
import ProizvodService from "../../../services/ProizvodService"
import { Table } from "react-bootstrap";

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
                        <td>
                            {proizvod.cijena}
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