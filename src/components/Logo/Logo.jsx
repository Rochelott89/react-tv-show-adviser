import s from "./style.module.css"

//props a usar = image, title, subtitle
export function Logo(props){
    return (<>
    <div className={s.container}>
        <img src={props.image} className={s.image}/>
        <span className={s.title}>{props.title}</span>
    </div>
    <span className={s.subtitle}>{props.subtitle}</span>
    </>
    );

}