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



function weatherDisplay(event){
    event.preventDefault();
    if(cityInput.val()!==""){
        city=cityInput.val()
        currentWeather(city);
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
        //sets up local storage
        forecast(city)
        if (response.cod==200){
            cityArray=JSON.parse(localStorage.getItem("cityList"))
            if (cityArray=[]){
                cityArray=[]
                cityArray.push(city)
                localStorage.setItem('cityname', JSON.stringify(cityArray));
                
            }
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
            var tempKel = response.list[i].main.temp;
            var tempC =(tempKel-273.5);
            var tempF =(parseFloat(tempC)* + 32)
            var humidityFore = response.list[i].main.humidity;
            var fDays= parseInt(day + i)

            $('#date'+i).html('' + month + '/' + fDays);
            $('#temp'+i).html(tempF.toFixed(2));
            $('#hum'+i).html(humidityFore)





        }
        //for (i=0; i<6; i++) {
       // var cityTempTwoOut = response.list[i].main.temp
        //var cityHumTwoOut = response.list[i].main.humidity
    
        }
    //})}
    )}

/*function uvIndex() {
    var uvUrl: "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey
    $.ajax ({
    url: uvUrl,
    method: "GET",
    }).then(function(response){



    })
}*/