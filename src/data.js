const {
  REACT_APP_API_KEY,
  REACT_APP_DEFAULT_LAT,
  REACT_APP_DEFAULT_LON,
} = process.env

const DISPLAYED_HOURS = [0, 5, 6, 11, 12, 17, 18, 23];

function contstructReoccuringItem(entry) {
  return {
    hour: new Date(entry.dt * 1000).getHours(),
    temp: Math.round(entry.main.temp),
    humidity: entry.main.humidity,
  }
}

function constructNewDay(entry) {
  const dayMapping = {
    0: "SUNDAY",
    1: "MONDAY",
    2: "TUESDAY",
    3: "WEDNESDAY",
    4: "THURSDAY",
    5: "FRIDAY",
    6: "SATURDAY",
  }
  
  return {
    day: dayMapping[new Date(entry.dt * 1000).getDay()],
    recurring: [ contstructReoccuringItem(entry) ],
  }
}

/**
* Function that sorts given list data by days
*/
function sortDataByDays(list = []) {
  let currentDay;
  const sortedList = [];

  for(let i = 0; i < list.length; i++) {
    const entry = list[i];
    const entryDay = new Date(entry.dt * 1000).getDay();

    if (entryDay === currentDay) {
      sortedList[sortedList.length-1].recurring.push(contstructReoccuringItem(entry))
    } else {
      sortedList.push(constructNewDay(entry))
      currentDay = entryDay;
    }
  }

  // Return only 5 days
  return sortedList.slice(0, 5);
}

function getAverage(tempList) {
  if (tempList.length > 0) {
    return Math.round(tempList.reduce((a, b) => a + b, 0) / tempList.length)
  }
}

/**
* @param {Array} sortedList Array of object with keys: day, recurring
* @returns {Array} Array of object with keys: day, recurring, avgDayTemp, avgNightTemp, avgHumidity
*/
function parseData(sortedList) {
  return sortedList.map(entry => {
    const { dayTemperatures, nightTemperatures, humidity } = entry.recurring
      .reduce((acc, { hour, temp, humidity } ) =>  {
        if (hour >= 8 && hour <= 18) {
          acc.dayTemperatures.push(temp)
        } else {
          acc.nightTemperatures.push(temp)
        }
        acc.humidity.push(humidity);

        return acc;
      }, { dayTemperatures: [], nightTemperatures: [], humidity: [] });

    return {
      ...entry,
      avgDayTemp: getAverage(dayTemperatures),
      avgNightTemp: getAverage(nightTemperatures),
      avgHumidity: getAverage(humidity),
      recurring: entry.recurring.filter(item => DISPLAYED_HOURS.includes(item.hour))
    }
  })
}

export async function getLocationData(cb) {
  // Get location
  let location;
  try {
    const position = await new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    location = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }
  } catch (err) {
    console.error(err.message);
    location = {
      lat: REACT_APP_DEFAULT_LAT,
      lon: REACT_APP_DEFAULT_LON,
    }
  }

  // Get location based data
  window
    .fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${REACT_APP_API_KEY}&units=metric`,
    )
    .then((res) => res.json())
    .then(data => {
      const sortedData = sortDataByDays(data.list);
      const parsedData = parseData(sortedData);
      cb(parsedData)
    })
}