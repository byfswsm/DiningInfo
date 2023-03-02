import React, { useEffect, useState } from 'react';


/*
{
  "Dining Hall Id": string,
  Timestamp: Date,
  "Wait Time": number,
}
*/
export const getAverageWaitTimeForHalls = (diningHalls) => {
  var result = [];
  const date = new Date();
  var hallTimes = {
    "Sargent": 0,
    "Plex West": 0,
    "Elder": 0,
    "Allison": 0,
  }
  var hallCounts = {
    "Sargent": 0,
    "Plex West": 0,
    "Elder": 0,
    "Allison": 0,
  }
  var hallAverageTimes = {
    "Sargent": 5,
    "Plex West": 5,
    "Elder": 5,
    "Allison": 5,
  }
  
  diningHalls.forEach((diningHall) => {
    const id = diningHall['Dining Hall Id'];
    const timestamp = diningHall['Timestamp'];
    const waitTime = diningHall['Wait Time'];
    // console.log(timestamp.seconds);
    // console.log({date});
    const secondsSinceEpoch = Math.round(date.getTime() / 1000);
    // console.log({secondsSinceEpoch});
    if(secondsSinceEpoch - timestamp.seconds < 3600) {
      // console.log("working");
      hallTimes[id] += waitTime;
      hallCounts[id] += 1;
    }
    
  
    // if (!seenHalls.has(id) && result.length < 4) {
    //   result.push(diningHall);
    //   seenHalls.add(id);
    // }
  });

  for (const hall in hallAverageTimes) {
    // console.log("here");
    if (hallCounts[hall] > 0){
      hallAverageTimes[hall] = Math.round(hallTimes[hall] / hallCounts[hall]);
      // console.log("also here");
    }
    result.push({
      "Dining Hall Id": hall,
      'Wait Time': hallAverageTimes[hall],
    })
  }

  return result;
};

function getMealFromHour(hour) {
  var meal = 0;
  if(hour < 11) {
    meal = 0;
  } else if(hour < 16) {
    meal = 1;
  } else {
    meal = 2;
  }
  return meal;
}

//will change into an average ratings function, takes the ratings for a certain dining halls for last 15 minutes
export const getAverageRatings = (diningHalls) => {
  var seenHalls = new Set();
  var result = {};
  diningHalls.reverse();

  var hallStars = {
    "Sargent": 0,
    "Plex West": 0,
    "Elder": 0,
    "Allison": 0,
  }
  var hallCounts = {
    "Sargent": 0,
    "Plex West": 0,
    "Elder": 0,
    "Allison": 0,
  }
  var hallAverageStars = {
    "Sargent": 3,
    "Plex West": 3,
    "Elder": 3,
    "Allison": 3,
  }

  /*
  Checking what meal it is

  if(waitTimeHour < 11){
    //breakfast
  } else if(waitTimeHour < 16) {
    //lunch
  } else {
    //dinner
  }
  */

  /* 
    Get date object from epoch seconds -- stackoverflow
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);

    d.getHours();
    */

  diningHalls.forEach((diningHall) => {
    const id = diningHall['Dining Hall Id'];
    const waitTime = diningHall['Wait Time'];
    const timestamp = diningHall['Timestamp']
    const stars = Number(diningHall['Stars']);

    //find out what meal it is
    const date = new Date();
    const hour = date.getHours();
    const secondsSinceEpoch = Math.round(date.getTime() / 1000);
    const currentMeal = getMealFromHour(hour);

    //count stars for that meal

    
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(timestamp.seconds);

    if(d.getDate() == date.getDate()) {
      if(getMealFromHour(d.getHours())==currentMeal) {
        hallStars[id] += stars;
        hallCounts[id] += 1;
      }
    }

    // if(secondsSinceEpoch - timestamp.seconds < 3600) {
      
    //   hallStars[id] += stars;
    //   hallCounts[id] += 1;
    // }
  });

  for (const hall in hallAverageStars) {
    if (hallCounts[hall] > 0){
      hallAverageStars[hall] = hallStars[hall] / hallCounts[hall];
    }
    // result.push({
    //   "Dining Hall Id": hall,
    //   'Stars': hallAverageStars[hall],
    // })
  }

  return hallAverageStars;
};

/*
return type
{
  Sargent: rating,
  Allison: rating,
  ...
}
*/
export const menusToDictionary = (halls) => {
  const menus = {};
  halls.forEach((hall) => {
    menus[hall['Dining Hall Id']] = hall['menu'];
  });
  return menus;
};

const getMenu = (menuObj) => {
  return menuObj['menu']['periods']['categories'];
}

export const useDiningHallData = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const locationDict = {
    Allison: '5b33ae291178e909d807593d',
    Sargent: '5b33ae291178e909d807593e',
    Elder: '5d113c924198d409c34fdf5c',
    'Plex West': '5bae7de3f3eeb60c7d3854ba'
  };
  const diningHalls = ['Allison','Sargent','Elder','Plex West'];


  const fetchMenus = async () => {
    var currentDate = new Date();
    var day = String(currentDate.getDate());
    var month = String(currentDate.getMonth()+1);
    var year = currentDate.getFullYear();

    // console.log(day);
    // console.log(month);
    // console.log(year);

  //TODO: Change hard coded date to current date on load
  var breakfastPromises = diningHalls.map((key) => {
    var url = `https://api.dineoncampus.com/v1/location/${locationDict[key]}/periods?platform=0&date=${year}-${month}-${day}`;
    // console.log(url);
    return fetch(url);
  });
  const breakfast = await Promise.all(breakfastPromises)

  var rawBreakfastData = await Promise.all(breakfast.map((hall) => hall.json()))
  const breakfastData = rawBreakfastData.map((menu) => getMenu(menu))
  //console.log({breakfastData})

  var lunchPromises = diningHalls.map((key, index) => {
    var id = rawBreakfastData[index]['periods'][1]['id']
    var url = `https://api.dineoncampus.com/v1/location/${locationDict[key]}/periods/${id}?platform=0&date=${year}-${month}-${day}`;
    return fetch(url);
  });
  var dinnerPromises = diningHalls.map((key, index) => {
    var id = rawBreakfastData[index]['periods'][2]['id']
    var url = `https://api.dineoncampus.com/v1/location/${locationDict[key]}/periods/${id}?platform=0&date=${year}-${month}-${day}`;
    return fetch(url);
  });

  const lunch = await Promise.all(lunchPromises)
  var lunchData = await Promise.all(lunch.map((hall) => hall.json()))
  lunchData = lunchData.map((menu) => getMenu(menu))
  //console.log({lunchData});

  const dinner = await Promise.all(dinnerPromises)
  var dinnerData = await Promise.all(dinner.map((hall) => hall.json()))
  dinnerData = dinnerData.map((menu) => getMenu(menu))

  //console.log({dinnerData})

  const result = {};

  diningHalls.forEach((key,index) => {
    result[key] = [breakfastData[index],lunchData[index],dinnerData[index]];
  })

  setData(result)
  setLoading(false);
}

useEffect(() => {
  fetchMenus();
}, [])

return [data, loading, error]
}