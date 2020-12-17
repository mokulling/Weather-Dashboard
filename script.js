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
var dayOneDate = $('#date-1')
var dayOneTemp = $('#temp-1')
var dayOneHum = $('#hum-1')



function weatherDisplay(event){
    event.preventDefault();
    if(cityInput.val()!==""){
        city=cityInput.val()
        presentWeather(city);
    }

}


//search button listener

    $('input').on('search',(function(event) {
        event.preventDefault();
        value = $(this).val();
        console.log(value);
        newcitystore.append('<p>' + value)
        city=value
        currentWeather(city)
       
    
    }))  



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

        cityName.html(cityNameOut)
        cityTemp.append(cityTempOut)
        cityName.append(cityNameOut)
        humidityDiv.append(cityHumidityOut)
        windSpeedDiv.append(cityWindOut)






    })

  }




//ajax call to weather api

function forecast(city) {
    
$.ajax({
    url: queryUrl+ city +apiKey,
    method: 'GET',
   
    
    }).then(function(response){
        console.log(response)
        //for (i=0; i<6; i++) {
       // var cityTempTwoOut = response.list[i].main.temp
        //var cityHumTwoOut = response.list[i].main.humidity
    
        }
    //})}
    )}