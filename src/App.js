import React, { useState, useEffect } from 'react';
import Collapsible from './Collapsible';
import { getLocationData } from './data';
import './App.scss';

function DataLayer({ data }) {
  console.log(data)
  return data.length > 0 
    ? data.map(({ day, averageDayTemp, averageNightTemp, averageHumidity, recurring }) => (
      <Collapsible
        day={day}
        dayTemp={averageDayTemp}
        nightTemp={averageNightTemp}
        avgHumidity={averageHumidity}
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
