import { SMALL_IMG_COVER_URL } from "../../config";
import s from "./style.module.css"


//usaremos una imagen modificada, de max 300 px
//props recibidos = tvShow
export function TVShowListItem(props){
    //recordar que tvShow es una coleccion, no podemos pasar {props.tvShow} solo porque daria error
    //en cambio si enviamos todo el tvShow en el onclick, que finalmente va a
    //llamar a la funcion setCurrentTVShowFromRecommendation(tvShow) que toma
    //finalmente el current tv show que clickamos 

    //props.onClick(props.tvShow) al declancher onClick enviamos el tvShow courant, primero hacia el componente padre
    //TVShowList, que a su vez que es a su vez un onClickItem que toma ese tvShow courant y lo pasa a App, que al recibirlo lo pasa
    //por su funcion, realizando el set

    return (<>
        <div onClick={()=> props.onClick(props.tvShow)} className={s.container}>
            <img alt={props.tvShow.name} 
            src={SMALL_IMG_COVER_URL+ props.tvShow.backdrop_path} 
            className={s.image}/>

            <div className={s.title}>
                {props.tvShow.name}
            </div>
            
        </div>
       </>
    );


}