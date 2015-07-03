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


