$(document).ready(function(){

var APIkey = "d300f17f8bab205d6054cbbe99297b24";
//Search button
$("#search-button").on("click", function (){
    var searchValue = $("#search-value").val()
console.log(searchValue);
$("#search-value").val("")

searchWeather(searchValue)
searchForecast(searchValue)
})
// Ajax call to pull weather data for current day 
function searchWeather(searchValue){
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIkey + "&units=imperial",
        dataType: "json",
        success: function(data){
            console.log(data);
            $("#current-weather").append(data.name);
        }
    })
}
// Ajax call to pull weather for 5 day forecast 
function searchForecast(searchValue){
    $.ajax({
        method:"GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIkey + "&units=imperial",
        dataType: "json", 
        success: function(data){
            console.log(data);
            $("#forecast-weather").append(JSON.stringify(data));
        }
    })
}












})