import logo from './logo.svg';
import './App.css';
import SearchCity from './Components/SearchCity';
import TempCard from './Components/TempCard';
import {useState,useEffect} from "react";
import Chart from './Components/Chart';



function App() {
  const [curetWeather,setCurrentWeather] = useState({})
  const [fourDayWeather,setCurrentFourWeather] = useState();
  const [load,setLoad] = useState(true)
  const [temp,setTemp] = useState([]);
  const [allData,setAllData] = useState([])
  const handleSearch = async (cityname) => {
      console.log(cityname)
      setLoad(true)
      
      const getWeather = async () => {
        setTemp([])
        try{
          const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=464b8ad26080a86663b083a95e5d7e41`)
          const res = await data.json();
          setCurrentWeather(res)
          console.log(res,"res");
          
          
        }
        catch(err){
          console.log(err);
        }
         
        }
        
       
        console.log(curetWeather,"cur")

        const getFourWeather = async () => {
          try{
            const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=464b8ad26080a86663b083a95e5d7e41`)
            const res = await data.json();
            setCurrentFourWeather(res.list)
            console.log(res.list,"resfour");
            
            
          }
          catch(err){
            console.log(err);
          }
           
          }

          await getWeather();
          await getFourWeather();
          await fetchTemp();
          await findWeakweather();
        
          console.log(temp)
          console.log(allData.at,"alldata")
          setLoad(false)
  }

  const fetchTemp = async () => {
    const  udateTemp =[];
   for(let i=0; i<6; i++){
     udateTemp.push(Math.floor((fourDayWeather[i].main.temp - 32) * 5/9)-69)
     
   }

     
   setTemp(udateTemp)  
  
 }   
 
 const findWeakweather = async () =>{
  const weak=[] 
  for (let i=0; i<fourDayWeather.length; i+=8){
    weak.push(fourDayWeather[i])
  }
  setAllData(weak)
 }
 useEffect(()=>{
  //  fetchTemp();
 },[fourDayWeather])
  return (
    <div className="App">
      <div>
      <SearchCity data={data}
        handleSearch={handleSearch}
      />
      {
        load ? <div></div> : <div><TempCard
          city={curetWeather.name}
          temp={Math.floor((curetWeather.main.temp - 32) * 5/9)-69}
          pressure={Math.floor(curetWeather.main.pressure*1/100)}
          humidity = {curetWeather.main.humidity}
        />
        <Chart
      temp={temp}
      />
        </div>
      }
      
      </div>
    </div>
  );
}
const data = [
  {
    id:1,
    city: 'Pune',
    temp: 24,
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEmUlEQVRoge2YTWhcVRiG33NnkkySmaQMESVJq6VpEhMQK1OtVLMJihubZqEgolYFpSgoY2gRFNxUNMW6KXQjrsSFf0yqdOPCjYQiVYoQi/RnoKaNglUnTZN25p7vdZHMvXfu3L/JzOhmPrjMe38O93nv+b7vHAZoRSta0YpW1BGqloc5j3TpBvaLYB80RqkxSA1AsEgT52jipEnktjyNv5vEWxWRDHAenWYJWSnhEDV6oAE6DmiApnVegMZsqoAPVRZrTeYPN8Dv0V8ykaOJ3RasP7x9X9RZucWp9Gu4/L8Z4HcYNBVOi4mBmuC1Kp8vas09fVlcaZYBwxd+Hp0lhbk64EETg8pUufw7SPznBswiZmjivjrgy/czqTheb5YBzxTiPNLFVeQjFGwYfPl+oW2N27e81/ju5DkDpVVMNxAe1OgtGphqNLyvAdF4vIHw5a60rxkGPFPo5imcp8ZQrfBGzzDiO6YRG5yAkR6B6uoDEQPXrkGuXVyN3fnwu6T+IpFI/NpUA2tf4zo1klHhVc8Y2h88gvj2xwBlgAQAYuPH1pbkKdMwDqc6OhaaYmA1t24gHF4hfs8baHvgbSDWAdCB6qNpuyoJ+Vaqu/uoUopVEBEj7nVRNK4qjeFAeIkhPnEc8dEDEBAQ8QPd0OvntDyxDcT7hes3Rki+pJTSDTOgNH6hieGgtDHuPwJj5FmISBnTE9QFDceklJ298M/ycgFAdjMGPFNo5VM8T42PfXN+637EHv2kVlBL20MqaqNIsARgEcBPBHO3pdM5pVSxZgOFz5BWq7gEjV43PNAJ44kzQHLrBkMlXDh0aG049UWhOtR/e99XfgY814HeJ/EXNGY9+/zOZyBdAxARaBGI67CvsUK7n7Ofdd6r1FpkB0V/eWXpj6MkPVk9awAAUgaOFYpqmhoZZzfC0FOgEM42Ga3zrF/0TTlrjC0ctTVz+ervAuCwmzNwO/3nCQzEiuo0U3cPys7ngDv2gumxDSi78/n2/QDtBeqCrjZKNb19W38usoF8Pp/obpcTbO85oBwLVC3Q0UHdH6VaE7hwc2V5fHx83Cps3xTK5/OJrmTqGyEmQUIoHqB2xwkDdTSmKKCuJmC9aai9MzkF4PNQA4mu5DEtMukGjQ4dFdT9Ufxmcn2MEoYbWFpaGhORl/1BUdEaw0A3Hq8JNCDlMk5WTwOm4CAhhhvUH9oiaVhtBNRJf6gBoUzalV8fqHVWT8q5x4QZ0Jrb3KBV0Nb7WaV9VlWfrUaw9pj9in84fGZAS+XgzYE6p98ftAIuNGUVcCbcgOZvAMY2varWAVoJbY10zL6aCzdA/S2pxuoBDYeOOpMV9XSpu12dDDcAfkThqwBildDVcI0DjfCBDJV1rsJAwFbi53PnjyvwlWBQ79oIho4A6tCOGpjdu3tX1WbOdyWOSTFrIjZKYLK5oEEfaF1TqdmHMve+6cUZuJlbWFhov0V8AFEHCcb84Kq0p1FbMGy8PewCaMxM7NlVUbiRDZTjh7ML4wp8EeAjAtyliGT9oHZrdMQKiEUq/AiqXFdc5jKZTCkKYyta0YpWtGJT8S9bZpM5N52/0QAAAABJRU5ErkJggg=='
  },
  {
    id:2,
    city: 'Bengaluru',
    temp: 22,
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEmUlEQVRoge2YTWhcVRiG33NnkkySmaQMESVJq6VpEhMQK1OtVLMJihubZqEgolYFpSgoY2gRFNxUNMW6KXQjrsSFf0yqdOPCjYQiVYoQi/RnoKaNglUnTZN25p7vdZHMvXfu3L/JzOhmPrjMe38O93nv+b7vHAZoRSta0YpW1BGqloc5j3TpBvaLYB80RqkxSA1AsEgT52jipEnktjyNv5vEWxWRDHAenWYJWSnhEDV6oAE6DmiApnVegMZsqoAPVRZrTeYPN8Dv0V8ykaOJ3RasP7x9X9RZucWp9Gu4/L8Z4HcYNBVOi4mBmuC1Kp8vas09fVlcaZYBwxd+Hp0lhbk64EETg8pUufw7SPznBswiZmjivjrgy/czqTheb5YBzxTiPNLFVeQjFGwYfPl+oW2N27e81/ju5DkDpVVMNxAe1OgtGphqNLyvAdF4vIHw5a60rxkGPFPo5imcp8ZQrfBGzzDiO6YRG5yAkR6B6uoDEQPXrkGuXVyN3fnwu6T+IpFI/NpUA2tf4zo1klHhVc8Y2h88gvj2xwBlgAQAYuPH1pbkKdMwDqc6OhaaYmA1t24gHF4hfs8baHvgbSDWAdCB6qNpuyoJ+Vaqu/uoUopVEBEj7nVRNK4qjeFAeIkhPnEc8dEDEBAQ8QPd0OvntDyxDcT7hes3Rki+pJTSDTOgNH6hieGgtDHuPwJj5FmISBnTE9QFDceklJ298M/ycgFAdjMGPFNo5VM8T42PfXN+637EHv2kVlBL20MqaqNIsARgEcBPBHO3pdM5pVSxZgOFz5BWq7gEjV43PNAJ44kzQHLrBkMlXDh0aG049UWhOtR/e99XfgY814HeJ/EXNGY9+/zOZyBdAxARaBGI67CvsUK7n7Ofdd6r1FpkB0V/eWXpj6MkPVk9awAAUgaOFYpqmhoZZzfC0FOgEM42Ga3zrF/0TTlrjC0ctTVz+ervAuCwmzNwO/3nCQzEiuo0U3cPys7ngDv2gumxDSi78/n2/QDtBeqCrjZKNb19W38usoF8Pp/obpcTbO85oBwLVC3Q0UHdH6VaE7hwc2V5fHx83Cps3xTK5/OJrmTqGyEmQUIoHqB2xwkDdTSmKKCuJmC9aai9MzkF4PNQA4mu5DEtMukGjQ4dFdT9Ufxmcn2MEoYbWFpaGhORl/1BUdEaw0A3Hq8JNCDlMk5WTwOm4CAhhhvUH9oiaVhtBNRJf6gBoUzalV8fqHVWT8q5x4QZ0Jrb3KBV0Nb7WaV9VlWfrUaw9pj9in84fGZAS+XgzYE6p98ftAIuNGUVcCbcgOZvAMY2varWAVoJbY10zL6aCzdA/S2pxuoBDYeOOpMV9XSpu12dDDcAfkThqwBildDVcI0DjfCBDJV1rsJAwFbi53PnjyvwlWBQ79oIho4A6tCOGpjdu3tX1WbOdyWOSTFrIjZKYLK5oEEfaF1TqdmHMve+6cUZuJlbWFhov0V8AFEHCcb84Kq0p1FbMGy8PewCaMxM7NlVUbiRDZTjh7ML4wp8EeAjAtyliGT9oHZrdMQKiEUq/AiqXFdc5jKZTCkKYyta0YpWtGJT8S9bZpM5N52/0QAAAABJRU5ErkJggg=='
  },
  {
    id:3,
    city: 'Bhubaneswar',
    temp: 26,
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEmUlEQVRoge2YTWhcVRiG33NnkkySmaQMESVJq6VpEhMQK1OtVLMJihubZqEgolYFpSgoY2gRFNxUNMW6KXQjrsSFf0yqdOPCjYQiVYoQi/RnoKaNglUnTZN25p7vdZHMvXfu3L/JzOhmPrjMe38O93nv+b7vHAZoRSta0YpW1BGqloc5j3TpBvaLYB80RqkxSA1AsEgT52jipEnktjyNv5vEWxWRDHAenWYJWSnhEDV6oAE6DmiApnVegMZsqoAPVRZrTeYPN8Dv0V8ykaOJ3RasP7x9X9RZucWp9Gu4/L8Z4HcYNBVOi4mBmuC1Kp8vas09fVlcaZYBwxd+Hp0lhbk64EETg8pUufw7SPznBswiZmjivjrgy/czqTheb5YBzxTiPNLFVeQjFGwYfPl+oW2N27e81/ju5DkDpVVMNxAe1OgtGphqNLyvAdF4vIHw5a60rxkGPFPo5imcp8ZQrfBGzzDiO6YRG5yAkR6B6uoDEQPXrkGuXVyN3fnwu6T+IpFI/NpUA2tf4zo1klHhVc8Y2h88gvj2xwBlgAQAYuPH1pbkKdMwDqc6OhaaYmA1t24gHF4hfs8baHvgbSDWAdCB6qNpuyoJ+Vaqu/uoUopVEBEj7nVRNK4qjeFAeIkhPnEc8dEDEBAQ8QPd0OvntDyxDcT7hes3Rki+pJTSDTOgNH6hieGgtDHuPwJj5FmISBnTE9QFDceklJ298M/ycgFAdjMGPFNo5VM8T42PfXN+637EHv2kVlBL20MqaqNIsARgEcBPBHO3pdM5pVSxZgOFz5BWq7gEjV43PNAJ44kzQHLrBkMlXDh0aG049UWhOtR/e99XfgY814HeJ/EXNGY9+/zOZyBdAxARaBGI67CvsUK7n7Ofdd6r1FpkB0V/eWXpj6MkPVk9awAAUgaOFYpqmhoZZzfC0FOgEM42Ga3zrF/0TTlrjC0ctTVz+ervAuCwmzNwO/3nCQzEiuo0U3cPys7ngDv2gumxDSi78/n2/QDtBeqCrjZKNb19W38usoF8Pp/obpcTbO85oBwLVC3Q0UHdH6VaE7hwc2V5fHx83Cps3xTK5/OJrmTqGyEmQUIoHqB2xwkDdTSmKKCuJmC9aai9MzkF4PNQA4mu5DEtMukGjQ4dFdT9Ufxmcn2MEoYbWFpaGhORl/1BUdEaw0A3Hq8JNCDlMk5WTwOm4CAhhhvUH9oiaVhtBNRJf6gBoUzalV8fqHVWT8q5x4QZ0Jrb3KBV0Nb7WaV9VlWfrUaw9pj9in84fGZAS+XgzYE6p98ftAIuNGUVcCbcgOZvAMY2varWAVoJbY10zL6aCzdA/S2pxuoBDYeOOpMV9XSpu12dDDcAfkThqwBildDVcI0DjfCBDJV1rsJAwFbi53PnjyvwlWBQ79oIho4A6tCOGpjdu3tX1WbOdyWOSTFrIjZKYLK5oEEfaF1TqdmHMve+6cUZuJlbWFhov0V8AFEHCcb84Kq0p1FbMGy8PewCaMxM7NlVUbiRDZTjh7ML4wp8EeAjAtyliGT9oHZrdMQKiEUq/AiqXFdc5jKZTCkKYyta0YpWtGJT8S9bZpM5N52/0QAAAABJRU5ErkJggg=='
  }
 ]
export default App;
