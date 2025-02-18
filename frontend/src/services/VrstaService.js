import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Vrsta')
    .then((odgovor)=>{
       // console.table(odgovor.data)
       return odgovor.data;
    })
    .catch((e)=>{})

}


async function getBySifra(sifra){
    return await HttpService.get('/Vrsta/' + sifra)
    .then((odgovor)=>{
       // console.table(odgovor.data)
       return odgovor.data;
    })
    .catch((e)=>{})

}


async function dodaj(vrsta){
    return HttpService.post('/Vrsta',vrsta)
    .then(()=>{return {greska: false, poruka: 'Dodano'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod dodavanja'}})

}


async function promjena(sifra,vrsta){
    return HttpService.put('/Vrsta/'+sifra,vrsta)
    .then(()=>{return {greska: false, poruka: 'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod promjene'}})

}


async function obrisi(sifra){
    return HttpService.delete('/Vrsta/'+sifra)
    .then(()=>{return {greska: false, poruka: 'Obrisano'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod brisanja'}})

}



export default{
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi
}
    
