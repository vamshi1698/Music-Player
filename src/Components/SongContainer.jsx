import { useEffect, useState } from "react"
import styles from "../Styles/SongContainer.module.css"
export const SongContainer = ({handleShowMessage,song,updateUrl,playlist,setPlaylist})=>{

    const [isStored , setIsStored] = useState(()=>{
      return playlist.some((savedSong)=>savedSong.id === song.id)
    })
    const toggeIsStored = (e)=>{
      e.stopPropagation();
      setIsStored((prevIsStored)=>{
        const newIsStored = !prevIsStored
        if(newIsStored){         
          saveSongs();
          handleShowMessage("added to playlist")
        }
        else{
          removeSong();
          handleShowMessage("removed from playlist")
        }
        return newIsStored;
      }
    );      
    }
    const removeSong = ()=>{
      setPlaylist((prevPlaylist)=>{
        return prevPlaylist.filter((s)=>s.id!==song.id)         
      })
    }

    const saveSongs = ()=>{
      setPlaylist((prevPlaylist)=>{
        return [song,...prevPlaylist]
      })
    }
    useEffect(()=>{            
      localStorage.setItem('playlist', JSON.stringify(playlist));
    },[playlist])
    return(
          <div className={styles.mainDiv} onClick={()=>updateUrl(song)} >
            <img className={styles.songImage} src={song.album.images[0].url} />             
            <div className={styles.innerDiv} >
                <p>Song : {song.name}</p>
                <p>Artist : {song.artists[0].name}</p>
            </div>
            <i className={ `fa-solid ${isStored?"fa-minus":"fa-plus"}  ${styles.icon}`} onClick={toggeIsStored}  ></i>
          </div>          
    )
}