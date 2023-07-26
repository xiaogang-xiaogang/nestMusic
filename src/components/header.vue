<template>
  <div class="header-container">
    <div class="left-content">
      <img src="../assets/img/logo.png" alt="">
      <span class="title">小杨音乐馆</span>
    </div>
    <div class="right-content">
      <div class="search-container">
        <div class="search">
          <img src="../assets/img/搜索.png" alt="">
          <input 
          @focusin="canshowre"
          @keyup="showRe"
          @blur="unShow"
          v-model="inputValue"
          type="text">
        </div>
        <div class="search-result" v-if="showResult">
          <div class="go-result" @click="goResult(inputValue.trim())">搜“{{ inputValue.trim() }}”相关结果>></div>
          <div class="song one" v-if="songs.length!=0">
            <div class="title">单曲</div>
            <div v-for="(item, index) in songs" :key="index" @click="playMusic(index)">{{ item.name }}</div>
          </div>
          <div class="songer one" v-if="aritists.length!=0">
            <div class="title">歌手</div>
            <div @click="goArtistList(index)" v-for="(item, index) in aritists" :key="index">{{ item.name }}</div>
          </div>
          <div class="album one" v-if="albums.length!=0">
            <div class="title">专辑</div>
            <div @click="toAlList(index)" v-for="(item, index) in albums" :key="index">{{ item.name }}</div>
          </div>
          <div class="playlist one" v-if="playlists.length!=0">
            <div class="title">歌单</div>
            <div @click="toPlayList(index)" v-for="(item, index) in playlists" :key="index">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <span v-if="!isLogin" class="login">
        <!-- <div v-if="userId && cookieMap.get('MUSIC_A')">游客1</div> -->

          <div @click="showModal">登陆</div>
          <div @click="login">游客登录</div>
          <Teleport to="body">
            <transition v-if="showLogin">
              <div class="login-modal">
                请扫码登录
                <div style="float: right; margin-right: 10px;font-size: 20px; cursor: pointer;" @click="showLogin=false">X</div>
                <canvas ref="canvasRef" width="300" height="300"></canvas>
              </div>
            </transition>
          </Teleport>
      </span>
      <span class="login" v-else>
        <img style="width: 50px;border-radius: 50%;" :src="user?.avatarUrl" alt="">
        <div style="height: 50px;text-align: center;line-height: 50px;">{{ user?.name }}</div>
        <div @click="logout" style="height: 50px;text-align: center;line-height: 50px;">退出</div>
      </span>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { Al } from '@/composale/al';
import { Artist } from '@/composale/artist';
import { PlayList } from '@/composale/playList';
import { Song } from '@/composale/song';
import { nextTick, ref, watch } from 'vue';
import { search, cancelSearch } from '@/api/findMusic'
import _ from 'lodash-es'
import { useMusicPlayStore } from '@/store/playmusic';
import { useRouter } from 'vue-router';
import { getCookieMap } from '@/utils/cookie'
import { getKey, getImg, checkStatus, getLoginStatus, anonimousLogin } from '@/api/login';
import { User } from '@/composale/user';


let inputValue = ref('')
let showResult = ref(false)
let songs = ref<Array<Song>>([])
let albums = ref<Array<Al>>([])
let aritists = ref<Array<Artist>>([])
let playlists = ref<Array<PlayList>>([])
let userId = ref(localStorage.getItem('useId')) 
let showLogin = ref(false)
let canvasRef = ref<HTMLCanvasElement>()
const cookieMap:Map<string,string> = getCookieMap(document.cookie)
let isLogin = ref(false)
let user=ref<User>({} as User)
if(localStorage.getItem('cookie')){
  isLogin.value = true
  user.value.avatarUrl=localStorage.getItem('avatarUrl')
  user.value.name=localStorage.getItem('nickname')
  user.value.userId=localStorage.getItem('userId')
}

const debounceFn = _.debounce(async ()=>{
      await cancelSearch()
      getSongs(inputValue.value.trim())
      getAls(inputValue.value.trim())
      getArtists(inputValue.value.trim())
      getPlaylists(inputValue.value.trim())
    },1000)
function showRe(){
  let s = inputValue.value.trim()
  if(s!=''){
    showResult.value = true
    debounceFn()
  }else{
    showResult.value = false
  }
}
function canshowre(){
  let s = inputValue.value.trim()
  if(s!=''){
    showResult.value = true
    debounceFn()
  }else{
    showResult.value = false
  }
}
function unShow(){
  setTimeout(()=>{
    showResult.value = false
    let s = inputValue.value.trim()
    if(s==''){
      songs.value = []
      albums.value = []
      aritists.value = []
      playlists.value = []
    }
  },1000)
}


async function getSongs(keyword:string){
  let res = await search(keyword,1)
  songs.value = []
  for(let i=0;i<res.songs.length;i++){
    let song = {} as Song
    song.id = res.songs[i].id
    song.name = res.songs[i].name
    songs.value.push(song)
  }
}

async function getAls(keyword:string) {
  let res = await search(keyword,10)
  albums.value = []
  for(let i=0;i<res.albums.length;i++){
    let al = {} as Al
    al.id = res.albums[i].id
    al.name = res.albums[i].name
    albums.value.push(al)
  }
}

async function getArtists(keyword:string) {
  let res = await search(keyword,100)
  aritists.value = []
  for(let i=0;i<res.artists.length;i++){
    let al = {} as Artist
    al.id = res.artists[i].id
    al.name = res.artists[i].name
    aritists.value.push(al)
  }
}

async function getPlaylists(keyword:string) {
  let res = await search(keyword,1000)
  playlists.value = []
  for(let i=0;i<res.playlists.length;i++){
    let al = {} as PlayList
    al.listId = res.playlists[i].id
    al.title = res.playlists[i].name
    playlists.value.push(al)
  }
}

const store = useMusicPlayStore()
function playMusic(index:number){
  store.id=songs.value[index].id.toString()
  inputValue.value = songs.value[index].name.toString()
}

const router = useRouter()
function toPlayList(index:number){
  router.push({
    name:'playList',
    query:{
      id:playlists.value[index].listId.toString(),
      page:'1'
    }
  })
}

function toAlList(index:number){
  router.push({
    name:'alList',
    query:{
      id:albums.value[index].id.toString(),
      page:'1'
    }
  })
}

function goArtistList(index:number){
    router.push({
        name:'artistList',
        query:{
            id:aritists.value[index].id.toString()
        }
    })
}

function goResult(keyword:string){
  router.push({
    name:'search',
    query:{
      keyword,
      type:'1',
      page:'1'
    }
  })
}

async function login(){
  let cookieRes = await anonimousLogin()
  localStorage.setItem('cookie', cookieRes)
  let res = await getLoginStatus(cookieRes)
  isLogin.value = true
}
async function showModal(){
  showLogin.value = true
  let key = await getKey()
  let base64 = await getImg(key)

  if(canvasRef.value){
    let ctx = canvasRef.value.getContext('2d')
    var img = new Image();
    img.src = base64;
    img.onload = function() {
      // 设置图片位置和大小
      var x = 0;
      var y = 0;
      var width = canvasRef.value.width;
      var height = canvasRef.value.height;

      // 在canvas上绘制图片
      ctx.drawImage(img, x, y, width, height);
    };
    let timer = setInterval(async () => {

      const statusRes = await checkStatus(key)
      if (statusRes.code == 800) {
        console.log('二维码已过期,请重新获取')
        clearInterval(timer)
      }
      console.log(statusRes)
      if (statusRes.code == 803) {
        // 这一步会返回cookie
        clearInterval(timer)
        console.log('授权登录成功')
        let res = await getLoginStatus(statusRes.cookie)
        console.log(res)
        localStorage.setItem('cookie', statusRes.cookie)
        showLogin.value = false
        user.value.avatarUrl=res.profile.avatarUrl
        localStorage.setItem('avatarUrl', user.value.avatarUrl)
        user.value.name=res.profile.nickname
        localStorage.setItem('nickname', user.value.name)
        user.value.userId=res.profile.userId
        localStorage.setItem('useId', user.value.userId)
        isLogin.value = true
      }
    }, 3000)
  }
}

function logout(){
  isLogin.value=false
  localStorage.clear()
}
</script>

<style lang="scss" scoped>
.login-modal{
    position: absolute;
    left: 50vw;
    top: 50vh;
    height: 400px;
    width: 400px;
    transform: translate(-50%,-50%);
    background-color: white;
    z-index: 20;
    canvas{
      margin: 30px 55px;
    }
  }
.header-container{
    background-color: #c62f2f;
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    padding: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .left-content{
      height: 100%;
      display: flex;
      align-items: center;
      img{
        height: 80%;
        border-radius: 50%;
      }
      .title{
        cursor: default;
        margin-left: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 30px;
        color: #fafafa;
        letter-spacing: 0;
        text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135 
      }
    }
    .right-content{
      position: absolute;
      right: 10px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      .login{
        font-size: 20px;
        display: flex;
        justify-content: center;
        div{
          margin: 0 5px;
        }
        div:hover{
          color: rgb(255, 255, 255);
          cursor: pointer;
        }
      }
      .search-container{
        margin-top: 5px;
        height: 50px;
        position: relative;
        .search{
          margin-right: 50px;
          border-radius: 10px;
          img{
            width: 30px;
            height: 30px;
            position: absolute;
            left: 0px;
            top: 0px;
            padding: 8px 10px;
            border-right: 1px solid black;
          }
          input{
            width: 200px;
            border-radius: 10px;
            padding-left: 55px;
            height: 40px;
            font-size: 16px;
            font-weight: lighter;
          }
        }
        .search-result{
          position: absolute;
          height: 500px;
          top:50px;
          left: 0;
          border: 1px solid rgba(0, 0, 0, 0.498);
          background-color: white;
          width: 300px;
          .go-result{
            cursor: pointer;
          }
          .one{
            margin: 10px ;
            div{
              height: 30px;
              margin-left: 20px;
              cursor: pointer;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .title{
              margin-left: 0px;
              color: rgba(128, 128, 128, 0.699);
              cursor: default;
            }
          }
        }
      }
    }
}
</style>