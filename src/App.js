import logo from './logo.svg';
import './App.css';
import SearchCity from './Components/SearchCity';
import TempCard from './Components/TempCard';
import { useState, useEffect } from "react";
import Chart from './Components/Chart';
import cityList from "./Data";
import { weatherapi } from "./Redux/Data/weather.api"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SmallCard from './Components/SmallCard';

function App() {
  const [curetWeather, setCurrentWeather] = useState({}) 
  const [load, setLoad] = useState(true)
  const [temp, setTemp] = useState();
  const [allData, setAllData] = useState([])

  const dispatch = useDispatch();
  const { isLooding, weather } = useSelector((state) => state.weather)
  const handleSearch = async (cityname) => {
    console.log(cityname)
    setLoad(true)
    dispatch(weatherapi(cityname))
    if (weather && weather.cord) {
      getAllWeatherData(weather.cord.lat, weather.cord.lon)
    }
    setCurrentWeather(weather)
    
    setLoad(false)

    console.log(weather, "weather")
  }
  useEffect(() => {
    if (weather && weather.coord) {
      getAllWeatherData(weather.coord.lat, weather.coord.lon)
    }
  }, [curetWeather])
  const getAllWeatherData = async (lat, lon) => {
    var data = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=464b8ad26080a86663b083a95e5d7e41`)
    const result = data;
    setTemp(result.data)
    setAllData(result.data.daily)
    console.log(result, "result");
    console.log(temp, "temp")
  }

  let arr = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ];
  let date = new Date();
  let day = date.getDay();
  var currDay;
  currDay = arr.slice(day, day + 8);



  return (
    <div className="App">
      <div>
        <SearchCity data={cityList}
          handleSearch={handleSearch}
        />
        {
          load ? <div></div> : <div><TempCard
            city={weather.name}
            temp={weather.main.temp}
            pressure={Math.floor(weather.main.pressure * 1 / 100)}
            humidity={weather.main.humidity}
          />
          <div className="weakTemp">

{

            allData && allData?.map((item,id)=>(
              <SmallCard
              key ={id}
              day={currDay[id]}
              temp={item.temp.day}
              />
            ))
          }
          </div>
             {temp && <Chart
          temp={temp.hourly}
        />}
        <div style={{ Width: "100%",display:"flex",alignItems: "center",justifyContent: "center"}}>
        <img
          style={{ Width: "100%"}}
          src="https://i.ibb.co/KX3jkQp/sunriseandset.png"
          alt="sunriseandset"
        />
        </div>
       
          </div>
        }
          
       

      </div>
    </div>
  );
}

export default App;
