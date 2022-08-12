import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

const SearchCity = ({ data,handleSearch }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.city.toLowerCase().includes(searchWord.toLowerCase());
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
        setWordEntered(data[i].city);
      }
    }
    setFilteredData([])
  };

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
                <h5>{value.city} </h5>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h6>{value.temp}°C</h6>
                  <img
                    style={{ height: "40px", width: "40px" }}
                    src={value.img}
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
