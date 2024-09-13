import s from "./style.module.css"
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons";

//componente para mostrar rating, usando libreria icons (rating con estrellas)
export function FiveStarRating(props){

    //PASO 1 : declarar array Stars
    const starList = [];

    //PASO 2 : en una variable guardar el numero de estrellas completas = StarFill
    //con math floor vamos a tomar parte entera, por ejemplo si rating es 2.90 va a dar 2
    const fullStar = Math.floor(props.rating); //2
    //en otra si hay o no estrellas a medio llenar = StarHalf  es un bolean 
    //por ejemplo 2.90 - 2 = 0.90 >= 0.5?
    //en este caso si, entonces si tenemos una media estrella
    const halfStar = props.rating - fullStar >= 0.5; //true
    //y en otra las estrellas vacias
    //en este caso seria 5 - 2 - 1 = 2  retirandole 1 porque si tenemos una estrella vacia
    const emptyStar = 5 - fullStar - (halfStar? 1 : 0); //2 estrellas vacias

    //entonces 2 fullStar, 2  emptyStar, 1 halfStar

    //PASO 3, hacer un push en el array de las fullStar
    //por cada fullStar vamos a meter un StarFill, recordar que hay que darle un key
    for(let i =0; i<fullStar;i++){
        starList.push(<StarFill key={"star-fill" + i}/>)
    }

    //PASO 4, hacer un push si existen medias estrellas
    if(halfStar){
        starList.push(<StarHalf key={"star-half"}/>)
    }

    //PASO 5, finalmente hacer un push de las estrellas vacias
    for(let i =0; i<emptyStar;i++){
        starList.push(<StarEmpty key={"star-empty" + i}/>)
    }



   return (
   
    <div>
        {starList}
    </div>

);

}