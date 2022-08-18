import React, { useState,useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import {weatherapi} from "../Redux/Data/weather.api"
import { useDispatch } from "react-redux";

const SearchCity = ({ data,handleSearch }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [cityname,setCityName] = useState("");
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    const searchWord = e.target.value;
     setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(data);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleClick = (id) => {
    console.log(id);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        setWordEntered(data[i].name);
        console.log(data[i].name,"consolename");
        setCityName(data[i].name)
      }
    }
    setFilteredData([])
   // console.log(cityname,"wordenter cityname")
  };

  useEffect(()=>{
    dispatch(weatherapi("bhubaneswar"))
  },[cityname,dispatch])

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Enter your city name..."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          <SearchIcon onClick={()=>handleSearch(wordEntered)}/>
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value) => {
            return (
              <div
                key={value.id}
                className="results"
                onClick={() => handleClick(value.id)}
              >
                <h5>{value.name} </h5>
                <div style={{ display: "flex", alignItems: "center" }}>
                 
                  <img
                    style={{ height: "40px", width: "40px" }}
                    src={"https://www.transparentpng.com/thumb/weather-report/status-weather-showers-day-icon-png-20.png"}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchCity;
