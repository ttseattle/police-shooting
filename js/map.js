var drawMap = function() {
      // Create a new leaflet map in the "container" div
      // syntax: var MAP_VARIABLE = L.map('CONTAINER_NAME')
      var map = L.map('container');

      // Use the setView method to set the lat/long and zoom of your map
      // syntax: VARIABLE.setView([LATITUDE, LONGITUDE], ZOOM)
      map.setView([47.6097, -122.3331], 10);

      // Create an OpenStreetMap tile layer variable using their url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      // syntax: var LAYER_VARIABLE = L.tileLayer('URL')
      var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

      // Add the layer to your map
      // Syntax: LAYER_VARIABLE.addTo(MAP_VARIABLE)
      layer.addTo(map);
	getData(map);
}

var getData = function(map) {
      // Get the data using an ajax request
      var data;
      $.ajax({
        url:'https://data.seattle.gov/resource/7ais-f98f.json?year=2015&$limit=500',
        type: "get",
        success:function(dat) {
            data = dat;
            // Loop through your data array
            // d represents each data element in data array
            data.map(customBuild(data));
        },
          
         dataType:"json"
      });
}

var customBuild = function(d) {
        var color = d.offense_type.indexOf('THEFT') != -1 ? 'red' : 'blue';
        var newCircle = new L.circleMarker([d.latitude, d.longitude], {color: color, radius: 4});
        newCircle.addTo(map);
}

/*// Function to draw your map
var drawMap = function() {
  	// Create map and set view
  	var map = L.map('container');
  	map.setView([47.6097,-122.3331], 15  );
  	// Create an tile layer variable using the appropriate url
  	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  	// Add the layer to your map
  	layer.addTo(map);
  	// Execute your function to get data
  	//getData(map);
    var data;
    // Execute an AJAX request to get the data in data/response.js
    $.ajax({
      url: 'data/response.json',
      type: "get", 
      // When your request is successful, call your customBuild function
      success: function(dat) {
          data = dat;
          data.map(function(d) { 
            var marker = new L.circleMarker([d.latitude, d.longitude], {
                color: 'red',
                radius: 4
            });
            marker.addTo(map);
          });
        },
      dataType: "json"
    });
}
/*
// Function for getting data
var getData = function(map) {
  var data;
    // Execute an AJAX request to get the data in data/response.js
    $.ajax({
      url: 'data/response.json',
      type: "get", 
      // When your request is successful, call your customBuild function
      success: function(dat) {
          data = dat;
          data.map(function(d) { 
            var marker = new L.circleMarker([d.latitude, d.longitude], {
                color: 'red',
                radius: 4
            });
            marker.addTo(map);
          });
        },
      dataType: "json"
    });
}*/
/*
// Do something creative with the data here!  
var customBuild = function(d) { 
	var marker = new L.circleMarker([d.latitude, d.longitude], {
		color: 'red',
		radius: 4
	});
	marker.addTo(map);
}*/


