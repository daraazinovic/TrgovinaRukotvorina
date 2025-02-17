import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Proizvod')
    .then((odgovor)=>{
       // console.table(odgovor.data)
       return odgovor.data;
    })
    .catch((e)=>{})

}


async function getBySifra(sifra){
    return await HttpService.get('/Proizvod/' + sifra)
    .then((odgovor)=>{
       // console.table(odgovor.data)
       return odgovor.data;
    })
    .catch((e)=>{})

}


async function dodaj(proizvod){
    return HttpService.post('/Proizvod',proizvod)
    .then(()=>{return {greska: false, poruka: 'Dodano'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod dodavanja'}})

}


async function promjena(sifra,proizvod){
    return HttpService.put('/Proizvod/'+sifra,proizvod)
    .then(()=>{return {greska: false, poruka: 'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod promjene'}})

}


async function obrisi(sifra){
    return HttpService.delete('/Proizvod/'+sifra)
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
    
