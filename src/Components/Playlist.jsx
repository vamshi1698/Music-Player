import { SongContainer } from "./SongContainer"
import { useState } from "react"
export const Playlist = ({handleShowMessage,setCurrSong,updateUrl})=>{
    const storedSongs = JSON.parse(localStorage.getItem('playlist'))   
    const [playlist,setPlaylist] = useState(()=>{
        const savedSongs = (localStorage.getItem('playlist'))
        return savedSongs ? JSON.parse(savedSongs): [];
      })
    return(
        <>
        {
        storedSongs ? storedSongs.map((search)=>(
            <SongContainer handleShowMessage={handleShowMessage} setPlaylist={setPlaylist} playlist={playlist}   onClick={()=>setCurrSong(e.target.value)} key={search.id} updateUrl={updateUrl} song={search} />
        )) : "no songs available"
        }
        </>
    )
}