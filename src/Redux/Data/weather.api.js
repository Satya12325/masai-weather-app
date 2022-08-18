import { get_weather_failure, get_weather_request, get_weather_success } from "./weather.action"
import axios from "axios";
export const weatherapi = (city)=>async(dispatch)=>{
    try{
    dispatch(get_weather_request())
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=464b8ad26080a86663b083a95e5d7e41`)
    .then((res)=>{
        console.log(res.data,"redux")
        dispatch(get_weather_success(res.data))
    })
}
    catch(err){
        dispatch(get_weather_failure())
        console.log(err)
    }

}
