var maps;

// Function to draw your map
var drawMap = function() {
  // Create map and set view
  var map = L.map('container');
  map.setView([37.892,-101.689], 4);
  // Create an tile layer variable using the appropriate url
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
  var all = [];
  var jan = [];
  var feb = [];
  var mar = [];
  var apr = [];
  var may = [];
  var jun = [];
  var jul = [];
  var aug = [];
  var sep = [];
  var oct = [];
  var nov = [];
  var dec = [];
  var unknown = [];
  data.map(function(d){
    var name = d["Victim Name"];
    var summary = d["Summary"];
    var age = d["Victim's Age"];
    var gender = d["Victim's Gender"];
    var month = parseInt(d["Date Searched"]);

    var color;
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
    //marker.addTo(map);
    marker.on('mouseover', function(evt) {
      evt.target.bindPopup(name).openPopup();
    });
    marker.on('mouseout', function(evt) {
      evt.target.bindPopup(name).closePopup();
    });
    if (month == 1) {
      jan.push(marker);
    } else if (month == 2) {
      feb.push(marker);
    } else if (month == 3) {
      mar.push(marker);
    } else if (month == 4) {
      apr.push(marker);
    } else if (month == 5) {
      may.push(marker);
    } else if (month == 6) {
      jun.push(marker);
    } else if (month == 7) {
      jul.push(marker);
    } else if (month == 8) {
      aug.push(marker);
    } else if (month == 9) {
      sep.push(marker);
    } else if (month == 10) {
      oct.push(marker);
    } else if (month == 11) {
      nov.push(marker);
    } else if (month == 12) {
      dec.push(marker);
    } else {
      unknown.push(marker);
    }
    all.push(marker);
  });
  var allMap = L.layerGroup(all);
  var janMap = L.layerGroup(jan);
  var febMap = L.layerGroup(feb);
  var marMap = L.layerGroup(mar);
  var aprMap = L.layerGroup(apr);
  var mayMap = L.layerGroup(may);
  var junMap = L.layerGroup(jun);
  var julMap = L.layerGroup(jul);
  var augMap = L.layerGroup(aug);
  var sepMap = L.layerGroup(sep);
  var octMap = L.layerGroup(oct);
  var novMap = L.layerGroup(nov);
  var decMap = L.layerGroup(dec);
  var unknownMap = L.layerGroup(unknown);

  var monthMap = {
    "All months": allMap,
    "January": janMap,
    "February": febMap,
    "March": marMap,
    "April": aprMap,
    "May": mayMap,
    "June": junMap,
    "July": julMap,
    "August": augMap,
    "September": sepMap,
    "October": octMap,
    "November": novMap,
    "December": decMap,
    "Unknown": unknownMap
  }
  L.control.layers(null, monthMap).addTo(map);
}