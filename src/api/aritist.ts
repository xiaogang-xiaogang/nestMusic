import api from '@/utils/ajax'

export async function getArtist(area:string,type:string,init:string,offset:string){
    const res = await <Promise<any>>api.get(
        '/api/artist/list',{
            params:{
                area:area,
                type:type,
                init:init,
                offset:offset,
                limit:'30'
            }
        }
    )
    return res
}