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
    return await HttpService.get('Proizvod/' + sifra)
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


export default{
    get,
    getBySifra,
    dodaj
}
    
