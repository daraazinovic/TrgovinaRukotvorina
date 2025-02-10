import { useEffect } from "react"
import ProizvodService from "../../../services/ProizvodService"

export default function ProizvodiPregled(){

    async function dohvatiProizvode(){
        const odgovor = ProizvodService.get()


    
        
    }


    //hooks (kuka) se izvodi prilikom dolaska na stranicu Proizvodi
    useEffect(()=>{
        dohvatiProizvode()
    },[])


    return(
        <>
        Ovdje će se vidjeti proizvodi iz baze
        </>
    )
}