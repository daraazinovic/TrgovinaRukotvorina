import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Materijal')
    .then((odgovor)=>{
       // console.table(odgovor.data)
       return odgovor.data;
    })
    .catch((e)=>{console.error(e)})

}


async function getBySifra(sifra){
    return await HttpService.get('/Materijal/' + sifra)
    .then((odgovor)=>{
       // console.table(odgovor.data)
       return {odgovor: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: "Ne postoji Materijal!"}

})

}


async function dodaj(Materijal) {
    return await HttpService.post('/Materijal',Materijal)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Materijal se ne može dodati!'}
            }
    })

}
    async function promjena(sifra,Materijal) {
        return await HttpService.put('/Materijal/' + sifra,Materijal)
        .then((odgovor)=>{
            return {greska: false, poruka: odgovor.data}
        })
        .catch((e)=>{
            switch (e.status) {
                case 400:
                    let poruke='';
                    for(const kljuc in e.response.data.errors){
                        poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                    }
                    console.log(poruke)
                    return {greska: true, poruka: poruke}
                default:
                    return {greska: true, poruka: 'Materijal se ne može promjeniti!'}
            }
        })
}


async function obrisi(sifra) {
    return await HttpService.delete('/Materijal/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Materijal se ne može obrisati!'}
    })
}






export default{
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi


    
}
    
