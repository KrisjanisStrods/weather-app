import React, { useState, useEffect } from 'react';
import Collapsible from './Collapsible';
import { getLocationData } from './data';
import './App.scss';

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
    : <h1>Oops. Something went wrong.</h1>
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    getLocationData((receivedData) => setData(receivedData));
  }, []);
  
  return (
    <div className="main-wrapper">
      {
        data
        ? <DataLayer data={data} />	
        :  <div className="loading">...acquiring location</div>
      }
    </div>
  );
}

export default App;
