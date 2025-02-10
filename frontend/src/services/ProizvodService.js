import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Proizvod')
    .then((odgovor)=>{
       // console.table(odgovor.data)
       return odgovor.data;
    })
    .catch((e)=>{})

}


export default{
    get
}
    
