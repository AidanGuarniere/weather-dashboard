let urlCurrentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=+downey+&appid=951ac77f9019903879e8df930449019e'
let urlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&daily&exclude=hourly,minutely&units=imperial&appid=951ac77f9019903879e8df930449019e"



// send user searchInput to fetch request
function searchUserInput(){
    let searchInput = document.querySelector("#userSearch").value
    fetchRequest(searchInput);
}

// run searchUserInput on click
document.querySelector("#search-button").addEventListener('click', searchUserInput)

// fetch from open weather API and  
function fetchRequest(searchInput) {
fetch('https://api.openweathermap.org/data/2.5/weather?q='
    + searchInput +
    '&units=imperial&appid=951ac77f9019903879e8df930449019e')
  .then(function (response) {
    if (!response.ok) { // Request failed, go to catch
      throw Error(response.statusText); // throw will stop execution of the promise chain and jump to catch
    }
    return response.json()
  })
  
  .then(function (data) {
    let coordinates = {
        longitude:data.coord.lon,
        latitude:data.coord.lat
    };
    
  
    return coordinates;
    
  })
  // pass coordinate object along
  .then(function(response){
      console.log(response)
      return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='
            + response.latitude + '&lon=' + response.longitude + '&daily&exclude=hourly,minutely&units=imperial&appid=951ac77f9019903879e8df930449019e')
  })
  // return response in JSON
  .then (function(response){  
    return response.json()
  })
  //consoloe log JSON response
  .then (function(data){
    displayRequest(data)
    //createListItem(data)
  })
  .catch(function (error) {
    alert(error);
  });
}


//create list items in search card
function createListItem(data){
   
    
    //create a button when function is called
    var buttonEl = document.createElement('button')
    //give created button an id of idCounter
    buttonEl.setAttribute('id',data.name);
    //give button a bootstrap class of list-group-item
    buttonEl.setAttribute('class', 'list-group-item');
    //set ulEl to the ul with id of #location from index.html
    var ulEl = document.querySelector('#location');
    //append buttonEl to ulEl
    ulEl.appendChild(buttonEl);
    //set text content of buttonEl to be the name of the location
    buttonEl.textContent = data.name;
    
    document.getElementById(data.name).addEventListener('click', fetchRequest(data.name) );
     
}

function displayRequest(data){
    console.log(data);
    
    let cardContainerEl = document.querySelector("#cardContainer")
    // clear old content
    cardContainerEl.innerHTML = " ";
    // create card 
    let cardEl = document.createElement("div");
    cardEl.classList = "card-body"

    // create card content 
   
    // weather icon
    let imgEl = document.createElement("img");
    imgEl.setAttribute('src', 'http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png')
    //temperature 
    let tempEl = document.createElement('p');
    tempEl.textContent = data.current.temp + " °F"
    // humidity
    let humidityEl = document.createElement('p')
    humidityEl.textContent = data.current.humidity + "%"
    // wind speed
    let windEl = document.createElement('p')
    windEl.textContent = data.current.wind_speed + " mph"
    // uv index
    let uvEl = document.createElement('p')
    uvEl.textContent = data.current.uvi

    // append content to card
    //cardEl.append(h1El);
    cardEl.append(imgEl);
    cardEl.append(tempEl);
    cardEl.append(humidityEl)
    cardEl.append(windEl);
    

    // append card to container
    cardContainerEl.appendChild(cardEl);
   
}
