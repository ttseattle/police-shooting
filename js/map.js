// Function to draw your map
var drawMap = function() {
  // Create map and set view
  var map = L.map('container');
  map.setView([47.6097,-122.3331], 10);
  // Create an tile layer variable using the appropriate url
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
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

