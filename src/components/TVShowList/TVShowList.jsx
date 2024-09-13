import { TVShowListItem } from "../TVShowListItem/TVShowListItem";
import s from "./style.module.css"

//tenemos acceso a estas funciones que le pasamos props = tvShowList, onClickItem

//la idea es pasarselos a su componente hijo TVShowListItem

//el map es porque recibimos una lista tvShowList, y tenemos que pasar por cada tvShow
//recordar la key porque estamos en un boucle, normalmente como viene de 
//backend usamos el id porque nos garantiza que es unica
export function TVShowList(props){

    return (
    <>
        <div className={s.title}>   
            You may also like :
        </div>

        <div className={s.list}> 
            {props.tvShowList.map((tvShow)=>{
                return (
                <span key={tvShow.id} className={s.tv_show_list_item}>
                    <TVShowListItem onClick={props.onClickItem} tvShow={tvShow}/>
                </span>
            );
        })}
        </div>

    </>
    );


}