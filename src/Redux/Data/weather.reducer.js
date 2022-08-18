import { Fab } from "@mui/material"
import { GET_WEATHER_FAILURE, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS} from "./weather.actionType"

const initState = {
    weather : [],
    isLooding : false,
    isError : false

}
export const weather_reducer = (state=initState,{type,payload})=>{
    switch(type){
        case GET_WEATHER_REQUEST :
            return {
                ...state,
                isLooding : true,
                isError : false
            }
        case GET_WEATHER_SUCCESS : 
            return {
                ...state,
                isLooding : false,
                isError : false,
                weather : payload
            }
        case GET_WEATHER_FAILURE :
            return {
                ...state,
                isLooding : false,
                isError : true
            }

            //DELETE
            
        default :
            return state
    }

}