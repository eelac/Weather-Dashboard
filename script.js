$(document).ready(function() {
    $("#submitWeather").click(function() {
        var city = $("#city").val();
        if (city !="") {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=0b7c31e0bedb2fd1fc8c4f4b99e83532&units=imperial",
                type: "GET",
                dataType:"jsonp",
                success: function(data){
                    console.log(data);
                }
            });
        } else{
            $("#error").html("Input a city")
        }
    })
});