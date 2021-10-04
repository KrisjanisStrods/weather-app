import React, { useState, useEffect } from 'react';
import { Collapsible, Loader, NoData } from './Components';
import { getLocationData } from './data';
import './App.scss';

// In case of wrong api credentials or OpenWeatherMap being down, fallback to <NoData />
function DataLayer({ data }) {
  return data.length > 0 
    ? data.map(({ day, avgDayTemp, avgNightTemp, avgHumidity, recurring }) => (
      <Collapsible
        key={day}
        day={day}
        dayTemp={avgDayTemp}
        nightTemp={avgNightTemp}
        avgHumidity={avgHumidity}
        tempByHour={recurring}
      />
    ))
    : <NoData />
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {

    // Initial data fetch on page mount
    getLocationData((receivedData) => setData(receivedData));

    // Add interval for data fetch, to keep data current
    const locationDataFetchInterval = setInterval(() => {
      getLocationData((receivedData) => setData(receivedData));
    }, 30 * 60 * 1000)

    // Clear data fetch interval on page un-mount
    return () => clearInterval(locationDataFetchInterval);

  }, []);
  
  return (
    <div className="main-wrapper">
      { data ? <DataLayer data={data} /> :  <Loader /> }
    </div>
  );
}

export default App;
