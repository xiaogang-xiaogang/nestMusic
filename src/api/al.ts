
import api from '@/utils/ajax'

export async function getNewAl(offset:string,area:string,limit?:string) {
    const res = await <Promise<any>>api.get(
        '/api/album/new',{
            params:{
                offset:offset,
                area:area,
                limit:limit?limit:10
            }
        }
    )
    return res
}

export async function getAlDetail(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/album',{
            params:{
                id:id
            }
        }
    )
    return res
}