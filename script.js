$(document).ready(function() {
    $("#submitWeather").click(function() {
        var city = $("#city").val();
        if (city !="") {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0b7c31e0bedb2fd1fc8c4f4b99e83532&units=imperial",
                type: "GET",
                dataType: "json",
                success: function(data){
                    console.log(data);
                    var widget = show(data);
                    $("#show").html(widget);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    getUVIndex(lat, lon);
                }
            })
        }else{
            $("#error").html("Input a city")
        }
    });
});

function getUVIndex(lat, lon) {
$.ajax({
    url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0b7c31e0bedb2fd1fc8c4f4b99e83532",
    type: "GET",
    dataType: "json",
    success:function(data){
        console.log(data.value);
    }
})
}
            
function show(data) {
    return "<h2 style='font-size:40px; font-weight: bold;'>Current weather for " + data.name +
        "<h3>Temperature: " + data.main.temp + " &deg;F" +
        "<h3>Humidity: " + data.main.humidity + "%" +
        "<h3>Wind Speed: " + data.wind.speed + " MPH" +
        "<h3>UV Index: " + data.value;
}