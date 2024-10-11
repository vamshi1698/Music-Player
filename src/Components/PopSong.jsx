import { useState , useRef , useEffect } from "react";
import styles from "../Styles/PopSong.module.css"
export const PopSong = ({song})=>{
    const audioRef = useRef(null)
    const [currentTime,setCurrentTime] = useState(0)
    const [duration,setDuration] = useState(0)
    const [isPlaying,setIsPlaying] = useState(true)
    const [isClicked,setIsClicked] = useState(false)
    const fullComponent = {

    }
    const setToFullScreen = ()=>{
      setIsClicked(prev=>!prev)
      if(isClicked){
        
      }
    }
    const toggleIcon = ()=>{
        if(isPlaying){
            audioRef.current.pause()
        }
        else{
            audioRef.current.play()
        }
    }

    const handleRange =(e)=>{
      const newTime = e.target.value;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);      
    }
    useEffect(()=>{
      const audio = audioRef.current;
      if(song){
        const onLoadedMetadata = ()=>{
        setDuration(audio.duration);
      }
      const onTimeUpdate = ()=>{
        setCurrentTime(audio.currentTime);
      }
      audio.addEventListener("loadedmetadata" , onLoadedMetadata);
      audio.addEventListener("timeupdate" , onTimeUpdate);
      return()=>{
        audio.removeEventListener("loadedmetadata" , onLoadedMetadata);
        audio.removeEventListener("timeupdate" , onTimeUpdate);
      }
    }
   },[song]);
    
    useEffect(()=>{
        if(audioRef.current && song){
          audioRef.current.play();
        }
      },[song])
    if(!song){
        return;
    }
    return(
        <div className={styles.fullComponent} onClick={setToFullScreen} >
        <div className={styles.container} >
            <img className={styles.songImage} src={song.album.images[0].url} />             
            <div className={styles.songName} >
            <div>
               <p className={isPlaying?styles.slideAnimation:""} >Song : {song.name}</p>
               <p className={isPlaying?styles.slideAnimation:""}>Artist : {song.artists[0].name}{song.artists[1]?","+song.artists[1].name:""}</p>
             </div>            
            </div>
            <div className={styles.icons}  >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} onClick={toggleIcon} /> 
            </div>
          <audio ref={audioRef} onPause={()=>setIsPlaying(false)} onPlay={()=>setIsPlaying(true)} src={song.preview_url} />
        </div>
        <div className={styles.range}  >
           <input type="range" name="song" step="0.01" value={currentTime} min="0" max={duration || 1} onChange={handleRange} />
        </div>  
              
        </div>        
    )
}