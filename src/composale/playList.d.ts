export interface PlayList{
    listId:String,
    url:String,
    title:String
}

export interface PlayListDetail{
    id:String,
    name:String,
    imgUrl:String,
    count:Number,
    playCount:Number,
    description:String,
    creator:String,
    createTime:Date,
    creatorUrl:String
}


// al表示专辑
export interface SongDetail{
    isLove:Boolean,
    title:String,
    songer:String,
    alName:String,
    alId:String,
    timeLong:Number,
    id:String
}

