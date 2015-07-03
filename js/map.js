// Function to draw your map
var drawMap = function() {
  // Create map and set view
  var map = L.map('container');
  map.setView([47.6097,-122.3331], 10);
  // Create an tile layer variable using the appropriate url
  var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'tishat.mk86k05g',
    accessToken: 'pk.eyJ1IjoidGlzaGF0IiwiYSI6ImYyNTgxNTRlOTExMGQ1Y2QxNjYxMjAwZjFhYWFjZTM5In0.bmOXsyE0G3gZsQrlPUesRA'
}
  // Add the layer to your map
  layer.addTo(map);
  // Execute your function to get data
  getData(map);
}

// Execute your function to get data
var getData = function(map) {
  var data;
  // Execute an AJAX request to get the data in data/response.js
  $.ajax({
    url:'https://data.seattle.gov/resource/7ais-f98f.json?year=2015&$limit=500',
    type: "get",
    // When your request is successful, call your customBuild function
    success:function(dat) {
      data = dat;
      // Loop through your data array
      // d represents each data element in data array
      data.map(function(d) { 
        customBuild(d, map); 
      });
    },
    dataType:"json"
  });
}

// Do something creative with the data here!  
var customBuild = function(d, map) {
  var color = d.offense_type.indexOf('THEFT') != -1 ? 'red' : 'blue';
  var marker = new L.circleMarker([d.latitude, d.longitude], {color: color, radius: 4});
  marker.addTo(map);
}

