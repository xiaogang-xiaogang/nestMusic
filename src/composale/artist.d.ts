export interface Artist{
    id:String,
    name:String,
    imgUrl:String
}

export interface ArtistDetail{
    id:String,
    name:String,
    imgUrl:String,
    mvSize:Number,
    musicSize:Number,
    albumSize:Number,
    alias:Array<String>
}

