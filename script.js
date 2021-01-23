$(document).ready(function() {
    $("#submitWeather").click(function() {
        var city = $("#city").val();
        if (city !="") {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0b7c31e0bedb2fd1fc8c4f4b99e83532&units=imperial",
                type: "GET",
                dataType:"jsonp",
                success: function(data){
                    console.log(data);
                    var widget = show(data);
                    $("#show").html(widget);
                }
            });
        }else{
            $("#error").html("Input a city")
        }
    });
});

function show(data) {
    return "<h2 style='font-size:40px; font-weight: bold;'>Current weather for " + data.name +
        "<h3>Temperature: " + data.main.temp + " F" +
        "<h3>Humidity: " + data.main.humidity + "%" +
        "<h3>Wind Speed: " + data.wind.speed + " MPH" +
        "<h3>UV Index: ";

}