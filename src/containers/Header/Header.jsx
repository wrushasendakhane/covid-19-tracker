import React, { useState } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./Header.css";
function Header({ countries, onCountryChange }) {
  const [country, setCountry] = useState("worldwide");

  const handleChange = (e) => {
    setCountry(e.target.value);
    onCountryChange(e.target.value);
  };

  return (
    <div className="header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="header__dropdown">
        <Select variant="outlined" value={country} onChange={handleChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
