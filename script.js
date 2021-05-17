$(document).ready(function(){

  $(".btn").click(function(e){
      e.preventDefault();
      var value = $(".search-bar").val().trim();
      $(".search-bar").val("");
      searchWeather(value);
  })

  $(".clear-button").click(function() {
      localStorage.clear();
      $(".searched-city-append").text("");
      $(".card-display-today").text("");
      $(".card-display-days").text("");
      $(".card-display-forecast").text("");
  })

  $(".searched-city-append").on("click", "li", function() {
      searchWeather($(this).text());
  })

  function searchWeather(value) {
      var apiKEY = "&appid=ad96fe71ad197203ee33297f1ed0f2b1";
      var apiURL = "https://api.openweathermap.org/data/2.5/weather";
      var apiUNITS = "&units=imperial";
      var apiSEARCH = "?q=" + value;
      var apiCALL = apiURL + apiSEARCH + apiUNITS + apiKEY;
      $.ajax({
          type: "GET",
          url: apiCALL,
          success: function(data) {
              if(history.indexOf(value) === -1) {
                  history.push(value);
                  window.localStorage.setItem("history", JSON.stringify(history));
              }

              makeRow(value);

              $(".card-display-today").empty();

              var card = $(".card-display-today");

              var title = $("<h3>").text(data.name + " today on " + moment().format("MMMM DD, YYYY"));

              var wind = $("<p>").text("Wind Speed: " + data.wind.speed + " MPH");
              var humid = $("<p>").text("Humidity: " + data.main.humidity + "%");
              var temp = $("<p>").text("Temperature: " + data.main.temp + " °F");

              var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

              card.append(img, title, wind, humid, temp);

              forecast(value);
              uvIndex(data.coord.lat, data.coord.lon);
          }
      })
  }

  function forecast(searchWeather) {

      var apiCALL = "https://api.openweathermap.org/data/2.5/forecast?appid=ad96fe71ad197203ee33297f1ed0f2b1&units=imperial&q=" + searchWeather;
      $.ajax({
          type: "GET",
          url: apiCALL,
          success: function(data) {
              $(".card-display-forecast").html("<h4>5-Day Forecast:</h4>");
              $(".card-display-days").text("");
              for(var i = 0; i < data.list.length; i++) {
                  if(data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                      var col = $("<div>").addClass("col");
                      var title = $("<h4>").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                      var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[1].weather[0].icon + ".png");

                      var pg1 = $("<p>").text("Temp: " + data.list[i].main.temp_max);
                      var pg2 = $("<p>").text("Humidity: " + data.list[i].main.humidity + "%");
                      var body = $("<div>").addClass("card-body-forecast");
                      var card = $(".card-display-days");

                      col.append(card.append(body.append(title, img, pg1,pg2)));

                      $(".card-display-body").append(col);
                  }
              }
          }  
      })
  }

  function uvIndex(lat, lon) {
      $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/uvi?appid=ad96fe71ad197203ee33297f1ed0f2b1&lat=" + lat + "&lon=" + lon,
          dataType: "json",
          success: function(data) {
              var uv = $("<p>").text("UV Index: ");
              var btn = $("<span>").addClass("other-btn").text(data.value);

              if (data.value < 3) {
                  btn.addClass("blue-btn");
              } else if(data.value < 7) {
                  btn.addClass("yellow-btn");
              } else {
                  btn.addClass("red-btn");
              }

              $(".card-display-today").append(uv.append(btn));
          }
      })
  }

  var history = JSON.parse(window.localStorage.getItem("history")) || [];
  if(history.length > 0) {
      searchWeather(history[history.length - 1]);
  }
  for(var i = 0; i < history.length; i++) {
      makeRow(history[i]);
  }

  function makeRow(text) {
      var li = $("<li>").text(text);
      $(".searched-city-append").append(li);
  }
})