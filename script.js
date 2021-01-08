$(document).ready(function(){

var APIkey = "d300f17f8bab205d6054cbbe99297b24";
//Search button
$("#search-button").on("click", function (){
    var searchValue = $("#search-value").val()
console.log(searchValue);
$("#search-value").val("")

searchWeather(searchValue)
})
//Date Moment.JS 

var nowMoment = moment();

var displayMoment = $("<h3>");
$("#city-name").empty();
$("#city-name").append(
  displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
);

//City search list      
function createCityList(citySearchList){
    $("#city-list").empty();
    var keys = Object.keys(citySearchList);
    for (var i = 0; i < keys.length; i++){
        var cityListEntry = $("<button>");
        cityListEntry.addClass("list-group-item list-group-item-action");
        $("#city-list").append(cityListEntry);
    }
}
// Ajax call to pull weather data for current day 
function searchWeather(searchValue){

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIkey + "&units=imperial",
        dataType: "json",
        success: function(data){
            console.log(data);
            $("#current-weather").append("<h2>" + data.city.name + "</h2>");
            
            var latitude;
            var longitude;
        latitude = data.city.coord.lat;
        longitude = data.city.coord.lon;
       
        $.ajax({
            url:"https://api.openweathermap.org/data/2.5/onecall?" + "&units=imperial" + "&appid=" + APIkey +
            "&lat=" + latitude + "&lon=" + longitude, 
            method:"GET", 
            success: function(data){
                console.log(data);
                $("#current-weather").append("<p>" + "Temperature: " + data.current.temp + "</p>");
                $("#current-weather").append("<p>" + "Humidity: " + data.current.humidity + "</p>");
                $("#current-weather").append("<p>" + "UV Index: " + data.current.uvi + "</p>");

                //for loop for 5 day forecast
                for (var i = 0; i < 6; i++){
                    $("#forecast" + i).append(nowMoment.format("M/D/YYYY") + "<p>" + "Temperature: " + data.daily[i].temp.day + "</p>", "<p>" + "Humidity: " + data.daily[i].humidity + "</p>")

                }
            }
        
        })



        }
    })
}

})