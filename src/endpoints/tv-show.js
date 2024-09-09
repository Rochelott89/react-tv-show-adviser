import axios from "axios"
import { BASE_URL, API_KEY_PARAM, BACKDROP_BASE_URL } from "../config";



export class TVShowAPI{

    //get list Popular series
    //fetchPopulars() pero vamos a usar axios
    static async fetchPopulars()  { 
        const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`)
        return response.data.results; //results porque en el json la lista esta guardada en la variable results
    }
    


}