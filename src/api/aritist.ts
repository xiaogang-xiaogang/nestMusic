import api from '@/utils/ajax'

let cancelTokenSource:any
export async function getArtist(area:string,type:string,init:string,offset:string){
    cancelTokenSource = api.cancelToken.source()
    const res = await <Promise<any>>api.get(
        '/api/artist/list',{
            params:{
                area:area,
                type:type,
                initial:init,
                offset:offset,
                limit:'30'
            },
            cancelToken:cancelTokenSource.token
        }
    )
    return res
}

export async function cancelgetArtist(message:string) {
    cancelTokenSource.cancel(message)
}

export async function getArtistDetail(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/artist/detail',{
            params:{
                id:id
            },
        }
    )
    return res.data
}

export async function getIntroduce(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/artist/desc',{
            params:{
                id:id
            }
        }
    )
    return res.introduction as Array
}

export async function getArtistMv(id:string,offset:number) {
    const res = await <Promise<any>>api.get(
        '/api/artist/mv',{
            params:{
                id:id,
                limit:'20',
                offset:offset
            }
        }
    )
    return res
}

export async function getHotFivity(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/artist/songs',{
            params:{
                id:id,
                limit:'50'
            }
        }
    )
    return res.songs
}

export async function getHotAlbum(id:string,offset:number) {
    const res = await <Promise<any>>api.get(
        '/api/artist/album',{
            params:{
                id:id,
                limit:'20',
                offset:offset
            }
        }
    )
    return res
}