import { useEffect, useState  } from "react"
import styles from "../Styles/Search.module.css"
import { SongContainer } from "./SongContainer";
export const Search = ({handleShowMessage , setCurrSong,updateUrl})=>{
    const [inputValue,setInputValue] = useState("");
    const [searchList,setSearchList] = useState([]);
    const [token,SetToken] = useState("")
    const [playlist,setPlaylist] = useState(()=>{
      const savedSongs = (localStorage.getItem('playlist'))
      return savedSongs ? JSON.parse(savedSongs): [];
    })
    const fetchToken = async () => {
        console.log(import.meta.env.REACT_APP_CLIENT_ID)
        const authOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(import.meta.env.REACT_APP_CLIENT_ID + ':' + import.meta.env.REACT_APP_CLIENT_SECRET)
          },
          body: 'grant_type=client_credentials'
        };      
        try {
          const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
          const data = await response.json();
          SetToken(data.access_token);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      useEffect(()=>{
        fetchToken();
      },[])

      const searchTrack = async () => {
        try {
          if (!token) throw new Error('Failed to retrieve access token');
          if(!inputValue) return ;
          const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(inputValue)}&type=track`;      
          const options = {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
        const response = await fetch(url,options);
        
        const data = await response.json();        
        
        setSearchList(data.tracks.items)
      }catch(error){
          console.error(error);
        } 
        setInputValue("")
      }  
      
    return(
      <div  className={styles.searchContainer}>
        <form className={styles.searchDiv} onSubmit={(e)=>e.preventDefault()} >
          <input name="input"  placeholder="Search for a Song" type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className={styles.input} />
          <button className={styles.searchButton} onClick={searchTrack} >Search</button>
        </form>
        
        <div className={styles.songList} >
        {
          searchList.map((search)=>(
            <SongContainer className={styles.fetchedSong} handleShowMessage={handleShowMessage} setPlaylist={setPlaylist} playlist={playlist}  onClick={()=>setCurrSong(search)} key={search.id} updateUrl={updateUrl} song={search} />
          ))
        }        
        </div>        
      </div>
    )
  }