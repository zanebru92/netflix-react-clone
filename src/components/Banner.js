import categories, {getMovies} from '../api'; 
import React, { useEffect, useState } from "react";
import './Banner.css'

function Banner(){
    const [movie, setMovie] = useState({});
    const fetchRandomMovie = async (_path) =>{
        try {
         const netflixOriginalsCategory = categories.find(category => category.name === "netflixOriginals");
         const data = await getMovies(netflixOriginalsCategory.path)
         const movies = data.results;
         const randomIndex = Math.floor(Math.random() * data.results.length);
         setMovie(movies[randomIndex]);
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchRandomMovie();
    },[])

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return(
       <header className="banner-container" style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        roundPosition: "center-center"
        }}>
            <div className="banner-content">
                <h1 className="banner-title">
                   {movie?.title || movie?.name || movie?.original_name} 
                </h1>
                <div className="banner-button-container">
                    <button className="banner-button">Assistr</button>
                    <button className="banner-button">Minha lista</button>
                </div>
                <div className="banner-description">
                    {truncate(movie?.overview, 150)}
                </div>
            </div>
       </header>
    )
}

export default Banner;