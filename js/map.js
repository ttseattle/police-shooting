// Function to draw your map
var drawMap = function() {
  // Create map and set view
  var map = L.map('container');
  map.setView([47.6097,-122.3331], 10);
  // Create an tile layer variable using the appropriate url
  var beginningLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'tishat.mk86k05g',
    accessToken: 'pk.eyJ1IjoidGlzaGF0IiwiYSI6ImYyNTgxNTRlOTExMGQ1Y2QxNjYxMjAwZjFhYWFjZTM5In0.bmOXsyE0G3gZsQrlPUesRA'
  });
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
  beginningLayer.addTo(map);
  var timeMaps = {
    "Daytime": lightLayer,
    "Nighttime": darkLayer
  };
  L.control.layers(timeMaps).addTo(map);
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
  var min = 2015;
  var max = 0;
  data.map(function(d){
    
    if (d["Date Searched"]) {
      var year = parseInt(d["Date Searched"].match("\\d{4}")[0]);
      if (year > max) max = year;
      if (year < min) min = year;
    }
    var circle = new L.circle([d.lat, d.lng], 200, {color:'blue', opacity:.5}).addTo(map);
    var info = document.createElement("p");
    info.innerHTML = "Agency Name: " + d["Agency Name"] + "<br />"
    + "Armed or Unarmed?: " + d["Armed or Unarmed?:"] + "<br />"
    + "Date Searched: " + d["Date Searched"] + "<br />"
    + "Hispanic or Latino Origin: " + d["Hispanic or Latino Origin"] + "<br />"
    + "Hit or Killed?: " + d["Hit or Killed?"] + "<br />"
    + "Race: " + d["Race"] + "<br />"
    + "Source Link: " + d["Source Link"] + "<br />"
    + "City: " + d["City"] + "<br />"
    + "State: " + d["State"] + "<br />"
    + "Summary: " + d["Summary"] + "<br />"
    + "Timestamp: " + d["Timestamp"] + "<br />"
    + "Victim Name: " + d["Victim Name"] + "<br />"
    + "Victim's Age: " + d["Victim's Age"] + "<br />"
    + "Victim's Gender: " + d["Victim's Gender"] + "<br />"
    + "Weapon: " + d["Weapon"];
    $("#info").replaceWith(info);
  });
  console.log("min " + min);
  console.log("max " + max);
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

