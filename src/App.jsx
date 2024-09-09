import { useEffect, useState } from "react";
import "./global.css"
import s from "./style.module.css"
import { TVShowAPI } from "./endpoints/tv-show";
import { BACKDROP_BASE_URL } from "./config";
export function App(){

    const [currentTVShow, setCurrentTVShow] = useState();

    //es necesario pasar por esta funcion intermediaria, de otra manera el async no funcionaría
    //nos aseguramos de que al menos hay una serie en la lista, y hacemos un set de la primera en la lista, la mas popular
    async function fetchPopulars(){
        const populars = await TVShowAPI.fetchPopulars();
        if(populars.length>0){setCurrentTVShow(populars[0])}
    }

    
    useEffect(() =>{
        fetchPopulars(); 
    },[]);

    //es una imagen con una gradiente, la imagen viene de current tv show de la variable backdrop path que contiene el jpg
    //usamos la operacion ternaria porque el useEffect puede no 
    return <>
    <div className={s.main_container} style={{background: currentTVShow? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`: "black"}}>
        <div className={s.header}>
            <div className="row">
                <div className="col-4">
                    <div>Logo</div>
                    <div>Subtitle</div>
                </div> {/*sera el logo */}
                <div className="col-sm-12 col-md-4">
                    <input style={{width:"100%"}} type="text"/>
                </div>{/*en pantallas md tomara todo el espacio, en pantallas lg o > sera 4 */}
            </div>
        </div>
        <div className={s.tv_show_detail}>Detail</div>
        <div className={s.recommendations}>Recommendations</div>
    </div>
    
    </>
}