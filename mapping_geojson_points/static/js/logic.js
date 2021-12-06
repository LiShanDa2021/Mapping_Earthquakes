// add console.log to check to see if the code works
console.log("Feelin' fine.");

// create map object with a center and zoom level
let map = L.map('mapid').setView([37.5, -122.5], 10);

// add GeoJson data
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// add GeoJSON data to map
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h2>" + feature.properties.city + "</h2>" + "<hr>" + "<h3>" + "Airport Name: " + feature.properties.name + "</h3>");
    }
    }).addTo(map);

// create tile layer for the background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey,

});

// add graymap tile layer to map
streets.addTo(map);

// old code from other branches

//let line = [[33.9416, -118.4085], [37.6213, -122.3790], [47.4502, -122.3088], [40.7899, -111.9791], [30.1975, -97.6664], [43.6777, -79.6248], [40.6413, -73.7781]]
// create polyline using the line coordinates. make line red
//L.polyline(line, {
//    color: "blue",
//  weight: 4,
//    opacity: .5,
//    dashArray: 5
//}).addTo(map);

//L.circle([34.0522, -118.2437], {
//    color: 'black',
//    fillColor: 'yellow',
//    fillOpacity: .4,
//    radius: 300
//}).addTo(map);

// add a marker for Los Angeles CA
//let marker = L.marker([34.0522, -118.2437]).addTo(map);

//let cityData = cities;

//cityData.forEach(function(city) {
//    console.log(city);
//    L.circleMarker(city.location, {
//        radius: city.population/100000,
//        color: 'orange',
//        lineWeight: 4,
//        fillColor: 'orange',
//        fillOpacity: .4
//    })
//    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//    .addTo(map);
//});

//pointToLayer: function(feature, latlng) {
//    console.log(feature);
//    return L.marker(latlng)
//    .bindPopup("<h2>" + feature.properties.city + "</h2>")
//}