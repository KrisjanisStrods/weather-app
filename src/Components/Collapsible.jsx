import React, { useState } from "react";

function HourlyTemp({
  temp="N/A",
  hour,
}) {
  const adjustedHour = hour >= 0 && hour <= 23 ? `${hour}:00` : "N/A";
  return (
    <>
      <div className="temperature-by-hour">
        <div>{temp}°C</div>
        <div className="hour">{adjustedHour}</div>
      </div>
      <div className="spacer"/>  
    </>
  )
}

function Collapsible ({
  day,
  dayTemp,
  nightTemp,
  avgHumidity,
  tempByHour = [],
}) {
  const [isShown, setIsShown] = useState(false)

  // In case of falsey value, replace parameter with -
  const adjustedDayTemp = dayTemp ? `${dayTemp}°C` : '-';
  const adjustedNighTemp = dayTemp ? `${nightTemp}°C` : '-';
  const adjustedAvgHumidity = avgHumidity ? `${avgHumidity}%` : '-';

  return (
    <div className={isShown ? "collapsible-card show" : "collapsible-card"}>
      <div className="row light" onClick={() => setIsShown(prev => !prev)}>
        <div className="title">{day}</div>
        <div className="general-info">
          <div>
            <span className="day-temperature">{adjustedDayTemp}</span>
            <span className="night-temperature"> / {adjustedNighTemp}</span>
          </div>
          <div className="humidity" >Avg. Humidity: {adjustedAvgHumidity}</div>
        </div>
        <div className="spacer"/>
        <div className="misc">
          <span className={isShown ? "icon up" : "icon"}>▼</span>
        </div>
      </div>
      <div className="row">
        <div className="title" />
        { tempByHour.map(({ temp, hour }) => <HourlyTemp key={day+hour} temp={temp} hour={hour} /> ) }
      </div>
    </div>
  )
}

export default Collapsible;