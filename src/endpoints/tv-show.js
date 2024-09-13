import axios from "axios"
import { BASE_URL, API_KEY_PARAM, BACKDROP_BASE_URL } from "../config";


//ENDPOINTS class
export class TVShowAPI{

    //GET list Popular series
    //fetchPopulars() pero vamos a usar axios
    static async fetchPopulars()  { 
        try{
            const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`)
            return response.data.results; //results porque en el json la lista esta guardada en la variable results
        }catch(error){
            alert("Erreur durant la recherche des séries populaires " + error.message)
        }
    }

    //GET recommendations
    //return lista recomendaciones en base a el id de una serie
    //https://developer.themoviedb.org/reference/tv-series-recommendations
    static async fetchRecommendations(tvShowId)  { 
        const response = await axios.get(`${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`)
        return response.data.results; //results porque en el json la lista esta guardada en la variable results
    }

    //GET a utilisar por la barra de busquedas
    //return una lista con resultado / s  porque por ejemplo si busco star, van a salir no sé series de star wars
    //https://developer.themoviedb.org/reference/search-tv
    static async fetchByTitle(tvShowTitle)  { 
        const response = await axios.get(`${BASE_URL}search/tv${API_KEY_PARAM}&query=${tvShowTitle}`)
        return response.data.results; 
    
    }

}