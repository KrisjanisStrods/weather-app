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
      <div className="temperature-spacer"/>  
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

  const adjustedDayTemp = dayTemp ? `${dayTemp}°C` : '-';
  const adjustedNighTemp = dayTemp ? `${nightTemp}°C` : '-';
  const adjustedAvgHumidity = avgHumidity ? `${avgHumidity}%` : '-';

  return (
    <div className={isShown ? "collapsible-card show" : "collapsible-card"}>
      <div className="card-row light" onClick={() => setIsShown(prev => !prev)}>
        <div className="row-title">{day}</div>
        <div className="row-body">
          <div className="general-info">
            <div>
              <span className="day-temperature">{adjustedDayTemp}</span>
              <span className="night-temperature"> / {adjustedNighTemp}</span>
            </div>
            <div className="humidity" >Avg. Humidity: {adjustedAvgHumidity}</div>
          </div>
        </div>
        <div className="row-body-spacer"/>
        <div className="row-misc">
          <span className={isShown ? "collapse-icon up" : "collapse-icon"}>▼</span>
        </div>
      </div>
      <div className="card-row">
        <div className="row-title" />
          { tempByHour.map(({ temp, hour }) => <HourlyTemp key={day+hour} temp={temp} hour={hour} /> ) }
        <div className="temperature-spacer-end"/>
      </div>
    </div>
  )
}

export default Collapsible;