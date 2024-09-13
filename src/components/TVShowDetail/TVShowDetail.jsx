import { FiveStarRating } from "../FiveStarRating/FiveStarRating";
import s from "./style.module.css"
export function TVShowDetail(props){

    //Este será un DOM component = recibe données y los affiche
    //3 div : note titre et description

    const rating = (props.tvShow.vote_average/2).toFixed(2);

    //cuando a FiveStarRating le damos un rating, significa que le pasamos en props la const rating declarada en componente TVShowDetail
    return (
    <div> 
        <div className={s.title}>{props.tvShow.name}</div>
        <div className={s.rating_container}>
            <FiveStarRating rating= {rating}/>
            <div className={s.rating}>{rating}</div>
        </div>
        <div className={s.overview}>{props.tvShow.overview}</div>
    </div>
    );
}