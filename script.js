var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='
var apiKey = '&appid=27d5701c8ffececd64c7ed1f0876ec1a'
var city = 'Chicago'
var cityInputId = $('#citysearch')
var cityName= $('#city-name')
var cityTemp= $('#city-temp')
var humidity= $('#humidity')
var windSpeed= $('#windSpeed')
var uv = $('#uv')



$.ajax({
    url: queryUrl+ city +apiKey,
    method: 'GET',
}).then(function(response){
    console.log(response)
    var cityNameOut = (response.city.name)
    var cityTempOut= response.list[0].main.temp
    var cityHumidityOut = response.list[0].main.humidity
    var cityWindOut = response.list[0].wind.speed
    
   cityName.append(cityNameOut)
    cityTemp.append(cityTempOut)
    humidity.append(cityHumidityOut)
    windSpeed.append(cityWindOut)

})