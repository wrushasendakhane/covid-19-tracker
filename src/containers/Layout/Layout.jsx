import React, { useState, useEffect } from "react";

import { Card, CardContent } from "@material-ui/core";
import SummaryTable from "../../components/SummaryTable/SummaryTable";
import LineGraph from "../../components/LineGraph/LineGraph";
import Map from "../../components/Map/Map";
import Header from "../Header/Header";

import InfoBox from "../../components/InfoBox/InfoBox";
import "./Layout.css";
import "leaflet/dist/leaflet.css";

function Layout() {
  const [country, setCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [countryInfo, setCountryInfo] = useState({});

  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          let countries = [];
          data.map((item) => {
            return (
              item.countryInfo.iso3 &&
              countries.push({
                name: item.country,
                value: item.countryInfo.iso3,
              })
            );
          });
          setSummaryData(data.sort((a, b) => (a.cases > b.cases ? -1 : 1)));
          setCountries(countries);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://disease.sh/v3/covid-19/all";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };
    fetchData();
  }, []);

  const handleCountryChange = (country) => {
    const url =
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(country);
        setCountryInfo(data);
        if (country === "worldwide") {
          setMapCenter({ lat: 34.80746, lng: -40.4796 });
          setMapZoom(3);
        } else {
          setMapCenter({
            lat: data.countryInfo.lat,
            lng: data.countryInfo.long,
          });
          setMapZoom(4);
        }
      });
  };

  return (
    <div className="layout">
      <div className="layout__left">
        <Header countries={countries} onCountryChange={handleCountryChange} />
        <div className="layout__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            active={casesType === "cases"}
            isRed
            onSelect={(e) => setCasesType("cases")}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            active={casesType === "recovered"}
            onSelect={(e) => setCasesType("recovered")}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            active={casesType === "deaths"}
            isRed
            onSelect={(e) => setCasesType("deaths")}
          />
        </div>
        <Map
          countries={summaryData}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="layout__right">
        <CardContent>
          <div className="layout__information">
            <h3>Live Cases by Country</h3>
            <SummaryTable data={summaryData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Layout;
