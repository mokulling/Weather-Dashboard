//variable definitions
var apiKey = '&appid=27d5701c8ffececd64c7ed1f0876ec1a'
var city = 'chicago'
var cityInputId = $('#searchbox')
var cityName= $('#city-name')
var cityTemp= $('#city-temp')
var humidityDiv= $('#humidity')
var windSpeedDiv= $('#wind-speed')
var uv = $('#uv')
var cityInput = cityInputId.val()
var newcitystore = $('#newcity')
var newCity = ""
var cityArray=[]
var d = new Date()
var day = d.getDate()
var dayOneDate = $('#date')
var dayOneTemp = $('#temp')
var dayOneHum = $('#hum')
var month= d.getMonth()+1
var fCalc = -273.15* (9/5) + 32
var cityImg = $('#city-img')
var clickArray = []






//search button listener

    $('input').on('search',(function(event) {
        event.preventDefault();
        value = $(this).val();
        //console.log(value);
        newcitystore.prepend('<p>' + value)
        city=value
        currentWeather(city)
        
    
    }))  


//Ajax call for current weather in inputted city
  function currentWeather (city) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey
    $.ajax({
        url:queryUrl,
        method:"GET",

    }).then(function(response){
        var cityNameOut = (response.city.name)
        var cityTempOut= response.list[0].main.temp
        var cityHumidityOut = response.list[0].main.humidity
        var cityWindOut = response.list[0].wind.speed
        var icon = response.list[0].weather[0].icon;
        var iconadd= "https://openweathermap.org/img/wn/"+icon + "@2x.png"


        cityName.html("City: " + cityNameOut)
        cityTemp.html("Current Temperature: " + cityTempOut)
        humidityDiv.html("Humidity: " + cityHumidityOut + "%")
        windSpeedDiv.html("Wind Speed: " + cityWindOut)
        cityImg.html('<img src='+iconadd+'>')
        uvIndex(response.city.coord.lon, response.city.coord.lat)
        //sets up local storage
        forecast(city)
        if(response.cod==200){
            cityArray=JSON.parse(localStorage.getItem('cityname'));
                cityArray.push(city)
                localStorage.setItem('cityname', JSON.stringify(cityArray))
            }

    })

  }




//ajax call to weather api for forecast

function forecast(city) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey

    $.ajax({
    url: queryUrl,
    method: 'GET',
   
    
    }).then(function(response){
        console.log(response)
        for (i=0; i<6; i++){
            var icon = response.list[i].weather[0].icon;
            var iconadd= "https://openweathermap.org/img/wn/"+icon + "@2x.png"
            var tempKel = response.list[i].main.temp;
            var tempC =(tempKel-273.5);
            var humidityFore = response.list[i].main.humidity;
            var fDays= parseInt(day + i)

            $('#date'+i).html('' + month + '/' + fDays);
            $('#temp'+i).html(tempC.toFixed(2) + '\u00B0 C');
            $('#hum'+i).html(humidityFore + '%')
            $('#img'+i).html('<img src='+iconadd+ '>')
            
            

        }
       
        }
    //})}
    )}

    //get uv index function
    function uvIndex(ln,lat){
        var uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' +lat + '&lon='+ ln;
        $.ajax({
            url: uvUrl,
            method: 'GET',



        }).then (function(response){
            if (response.value <2){
                uv.html("" +response.value)
                uv.css('background-color', 'green')

            }else if (response.value <5){
                uv.html('' +response.value)
                uv.css('background-color', 'yellow')
            }else if (response.value <7) {
                uv.html(''+response.value)
                uv.css('background-color', 'orange')
            } else {
                uv.html (''+ response.value);
                uv.css ('background-color', 'red')
            }


        })
    }


//gets previously searched item and displays it as current city
    function reload () {
        newcitystore.empty()
        var cityArray = JSON.parse(localStorage.getItem('cityname'));
        if (cityArray !==null) {
            var cityArray = JSON.parse(localStorage.getItem('cityname'));
           for (i=0; i<cityArray.length; i++)
        {
            city=cityArray[i];
            //newcitystore.prepend('<p>' + cityArray[i])
        }
        
        currentWeather(city)

        }


    }

    reload()

   function pastSearch (event) {
       console.log(event.target)
       var target=event.target;
       if(event.target.matches('p')){
           city=target.textContent.trim();
           currentWeather(city)
       }
   }
    

$(document).on('click', pastSearch)