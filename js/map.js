var maps;

// Function to draw your map
var drawMap = function() {
  // Create map and set view
  var map = L.map('container');
  map.setView([37.892,-101.689], 4);
  // Create an tile layer variable using the appropriate url
  /*var beginningLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'tishat.mk86k05g',
    accessToken: 'pk.eyJ1IjoidGlzaGF0IiwiYSI6ImYyNTgxNTRlOTExMGQ1Y2QxNjYxMjAwZjFhYWFjZTM5In0.bmOXsyE0G3gZsQrlPUesRA'
  });*/
  var lightLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'tishat.mk8ll0eh',
    accessToken: 'pk.eyJ1IjoidGlzaGF0IiwiYSI6ImYyNTgxNTRlOTExMGQ1Y2QxNjYxMjAwZjFhYWFjZTM5In0.bmOXsyE0G3gZsQrlPUesRA'
  });
  var darkLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'tishat.mk8m662m',
    accessToken: 'pk.eyJ1IjoidGlzaGF0IiwiYSI6ImYyNTgxNTRlOTExMGQ1Y2QxNjYxMjAwZjFhYWFjZTM5In0.bmOXsyE0G3gZsQrlPUesRA'
  });
  // Add the layer to your map
  lightLayer.addTo(map);
  var maps = {
    "Daytime": lightLayer,
    "Nighttime": darkLayer,
    //"Normal": beginningLayer
  };
  L.control.layers(maps).addTo(map);
  // Execute your function to get data
  getData(map);
}

// Execute your function to get data
var getData = function(map) {
  // Execute an AJAX request to get the data in data/response.js
  $.ajax({
    url:'data/response.json',
    type: "get",
    // When your request is successful, call your customBuild function
    success:function(data) {
      customBuild(data, map);
    },
    dataType:"json"
  });
}

var customBuild = function(data, map) {
  //var yearArray = [];
  var fifteenArray = [];
  data.map(function(d){
    var name = d["Victim Name"];
    var summary = d["Summary"];
    var age = d["Victim's Age"];
    var gender = d["Victim's Gender"];
    var color;
    var year = (new Date(d["Timestamp"])).getFullYear();
    /*if (yearArray.indexOf(year) == -1) {
      yearArray.push(year);
    } */
    if (gender == "Female") {
      color = 'red';
    } else if (gender == "Male") {
      color = 'blue';
    } else { //gender == "Unknown"
      color = 'yellow';
    } 
    var marker = new L.circleMarker([d.lat, d.lng], {
      radius: age/10,
      color: color
    });
    //yearArray.indexOf(year).push(marker);
    if (year == 2015) {
      fifteenArray.push(marker);
    }
    marker.addTo(map);
    //marker.bindPopup(text);
    marker.on('mouseover', function(evt) {
      evt.target.bindPopup(summary).openPopup();
    });
    marker.on('click', function(evt) {
      evt.target.bindPopup(summary);
    });
  });
  var fifteens = L.layerGroup(fifteenArray);
  var fifteenMap = {
    "2015": fifteens
  }
  maps.addLayer(fifteens);
}

// Do something creative with the data here!  
/*var customBuild = function(data, map) {
  data.map(function(d) {
    var marker = new L.marker([d.lat, d.lng]);
  });*/
/*
  var year = d.year;
  var fifteen = L.layerGroup(year == 2015);
  var fourteen = L.layerGroup(year == 2014);

  var color = d.offense_type.indexOf('THEFT') != -1 ? 'red' : 'blue';
  var marker = new L.circleMarker([d.latitude, d.longitude], {color: color, radius: 4});  
  var marker = new L.marker([d.latitude, d.longitude]);
  marker.addTo(map);
  var text = d.offense_type;
  marker.bindPopup(text); */
//}

