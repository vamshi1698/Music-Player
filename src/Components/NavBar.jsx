import { BrowserRouter as Router , Route , Link , Routes } from "react-router-dom"
import styles from "../Styles/NavBar.module.css"
import { PopSong } from "./PopSong";
import { Playlist } from "./Playlist.jsx";
import { Search } from "./Search.jsx";
import { useState } from "react"
const NavBar = ({handleShowMessage})=>{
    const [currSong,setCurrSong] = useState(null)
  
    const updateUrl = (song)=>{      
        if(song){
      setCurrSong(song);
    }
    else{
      console.log("not found")
    }
}
    return(
        <>
           <Router>
            <nav className={styles.nav} >
                <ul className={styles.ul}>
                    <li className={styles.li}>
                       <Link className={styles.link} to="/">Search</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.link} to="/Playlist">Playlist</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/"  element={<Search  handleShowMessage={handleShowMessage} updateUrl={updateUrl} setCurrSong={setCurrSong} />} />
                <Route path="/Playlist"  element={<Playlist handleShowMessage={handleShowMessage} updateUrl={updateUrl} setCurrSong={setCurrSong} />} />
            </Routes>
           </Router>
            <PopSong song={currSong} />
        </>
    )

}
export default NavBar