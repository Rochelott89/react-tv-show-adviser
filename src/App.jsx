import { useEffect, useState } from "react";
import "./global.css"
import s from "./style.module.css"
import { TVShowAPI } from "./endpoints/tv-show";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png" //le damos a la imagen el nombre que queramos, en este caso logo
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";


export function App(){

    const [currentTVShow, setCurrentTVShow] = useState();

    const [recommendationListe, setRecommedationListe] = useState([]);

    
    //es necesario pasar por esta funcion intermediaria, de otra manera el async no funcionaría
    //nos aseguramos de que al menos hay una serie en la lista, y hacemos un set de la primera en la lista, la mas popular
    async function fetchPopulars(){
        const populars = await TVShowAPI.fetchPopulars();
        if(populars.length>0){setCurrentTVShow(populars[0])}
    }

    async function fetchRecommendations(tvShowId){
        const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
        if(recommendations.length>0){
            setRecommedationListe(recommendations.slice(0,10))//usamos slice para recuperar 10 primeras recomendaciones
                                                 //pero es legítimo recurarlas todas
        
        }
    }

    //de la respuesta de search tv show hacemos un set en el primer elemento, al final es como una busqueda resumida
    //en el sentido de que al apretar enter no vamos a cambiar de pagina mostrando todos los resultados de búsqueda
    //obviamente no es necesario crear otro useEffect porque reusamos el de currentTVShow
    async function searchTVShow(tvShowTitle){
        const searchResult = await TVShowAPI.fetchByTitle(tvShowTitle);
        if(searchResult.length>0){
        setCurrentTVShow(searchResult[0])
        }
    }


    //los useEffect se lanzan por orden 
    useEffect(() =>{
        fetchPopulars(); 
    },[]); //solo se lanza 1 vez

    //luego del primer render por el anterior useEffect,
    //currentTVShow estará finalmente no undefined 
    useEffect(() =>{
        if(currentTVShow){
            fetchRecommendations(currentTVShow.id); 
        }
    },[currentTVShow]); //se lanza si hay un cambio




    //funcion que le enviaremos a TVShowListItem, bueno le enviaremos el onclick, pero
    //finalmente eso va a contener esta funcion
    function setCurrentTVShowFromRecommendation(tvShow){
        alert(JSON.stringify(tvShow))
    }

    //es una imagen con una gradiente, la imagen viene de current tv show de la variable backdrop path que contiene el jpg
    //usamos la operacion ternaria porque el useEffect puede no 

    //{currentTVShow && <TVShowDetail tvShow = {currentTVShow}/>} sin currentTVShow && puede dar undefined, con esto nos aseguramos que ha sido inicializado
    // onClickItem={(tvShow)=> setCurrentTVShow(tvShow)} //es una autofuncion que toma un tvShow y return setCurrentTVShow con ese tvShow
    //en vez de esa nomenclatura podemos simplemente usar un onClickItem={setCurrentTVShow}
   return <>
    <div className={s.main_container} style={{background: currentTVShow? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`: "black"}}>
        <div className={s.header}>
            <div className="row">
                <div className="col-4">
                    <Logo title="MovieWatcher" subtitle="Be the Watcher" image={logo}/>
                    
                </div> {/*sera el logo */}
                <div className="col-sm-12 col-md-4">
                    <SearchBar onSubmit={searchTVShow}/>
                </div>{/*en pantallas md tomara todo el espacio, en pantallas lg o > sera 4 */}
            </div>
        </div>
        <div className={s.tv_show_detail}>
            {currentTVShow && <TVShowDetail tvShow = {currentTVShow}/>}
        </div>
        <div className={s.recommendations}>
            {recommendationListe && recommendationListe.length > 0 && (
                <TVShowList tvShowList={recommendationListe} onClickItem={(tvShow)=> setCurrentTVShow(tvShow)} />
            )}
        </div>
    </div>
    
    </>
}