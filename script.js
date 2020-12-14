var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='
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
var newCity = ''
var dayOneDate = $('#date-1')
var dayOneTemp = $('#temp-1')
var dayOneHum = $('#hum-1')


//search button listener



    $('input').on('search',(function(event) {
        event.preventDefault();
        value = $(this).val();
        console.log(value);
        newcitystore.append('<p>' + value)
        city=value
       
    
    }))  

  




//ajax call to weather api

$.ajax({
    url: queryUrl+ city +apiKey,
    method: 'GET',
   
    
    }).then(function(response){
        console.log(response)
        var cityNameOut = (response.city.name)
        var cityTempOut= response.list[0].main.temp
        var cityHumidityOut = response.list[0].main.humidity
        var cityWindOut = response.list[0].wind.speed
        var cityTempTwoOut = response.list[1].main.temp
        var cityHumTwoOut = response.list[1].main.humidity
    
        cityName.append(cityNameOut)
        cityTemp.append(cityTempOut)
        humidityDiv.append(cityHumidityOut)
        windSpeedDiv.append(cityWindOut)
        dayOneTemp.append(cityTempTwoOut)
        dayOneHum.append(cityHumTwoOut)
    })
 