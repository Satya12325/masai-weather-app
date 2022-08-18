import {combineReducers} from "redux";
import {weather_reducer} from "./Data/weather.reducer"

export const rootReducer = combineReducers({
        weather:  weather_reducer, 
})