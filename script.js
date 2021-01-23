$(document).ready(function() {
    $("#submitWeather").click(function() {
        var city = $("#city").val();
        if (city !="") {

        } else{
            $("#error").html("Input a city")
        }
    })
});