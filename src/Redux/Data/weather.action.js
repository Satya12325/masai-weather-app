import { GET_WEATHER_FAILURE, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS } from "./weather.actionType"


export const get_weather_request = ()=>{
    return{
        type :GET_WEATHER_REQUEST
    }
}

export const get_weather_success = (payload)=>{
    return{
        type : GET_WEATHER_SUCCESS,
        payload : payload
    }
}
export const get_weather_failure = ()=>{
    return{
        type : GET_WEATHER_FAILURE
    }
}
