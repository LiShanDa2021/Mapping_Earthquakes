// add console.log to check to see if the code works
console.log("Feelin' fine.");

// create tile layer for the background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey,
});

// create dark layer
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
});

// create base layer to hold both maps
let baseMaps = {
    Streets: streets,
    Satellite: satellite
}

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// define object that contains overlays
let overlays = {
    Earthquakes: earthquakes
}

// create map object with a center and zoom level
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// pass map layers into layers control and add layers control
L.control.layers(baseMaps, overlays).addTo(map);

// accessing Toronto airline routes with GeoJSON url
//let quakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//grab geojson data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

    // create geojson layer with retrieved data
    L.geoJson(data, {
        // turn each feature into a circle marker on the map
        pointToLayer: function(feature, latlng) {
            //console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
      // We set the style for each circleMarker using our styleInfo function.
    }).addTo(earthquakes);

    function styleInfo(feature) {
        return {
            opacity: 1, 
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: .5,
        }
    }

    function getRadius(mag) {
        if (mag === 0) {
            return 1;
        }
        return mag * 4;
    }

    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }

    earthquakes.addTo(map);

    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i +1] ? "&ndash;" + magnitudes[i +1] + "<br>" : "+");
    }
    return div;
    };

    legend.addTo(map);
});


// We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    // onEachFeature: function(feature, layer) {
    //     layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    //   }
    // }).addTo(map);


//code i don't seem to need

// // add graymap tile layer to map
// streets.addTo(map);

// // add GeoJSON data to map
// L.geoJSON(sanFranAirport).addTo(map);










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

// add GeoJson data
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
    //"type":"Feature",
    //"properties":{
    //   "id":"3469",
    //    "name":"San Francisco International Airport",
    //    "city":"San Francisco",
    //    "country":"United States",
    //    "faa":"SFO",
    //    "icao":"KSFO",
    //    "alt":"13",
    //    "tz-offset":"-8",
    //    "dst":"A",
    //    "tz":"America/Los_Angeles"},
    //    "geometry":{
    //        "type":"Point",
    //        "coordinates":[-122.375,37.61899948120117]}}
//]};

// add GeoJSON data to map
//L.geoJSON(sanFranAirport, {
//    onEachFeature: function(feature, layer) {
//        console.log(layer);
//        layer.bindPopup("<h2>" + feature.properties.city + "</h2>" + "<hr>" + "<h3>" + "Airport Name: " + feature.properties.name + "</h3>");
//    }
//    }).addTo(map);

// onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2>" + "<hr>" + "<h3>" + "Airport Name: " + feature.properties.name + "</h3>");
// }
// }).addTo(map);

// // accesss airport geojson url
// let airportData = "https://raw.githubusercontent.com/LiShanDa2021/Mapping_Earthquakes/mapping_geojson_points/majorAirports.json"

// L.geoJson(data, {
    //     style: myStyle,
    //     onEachFeature: function(feature, layer) {
    //         layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME);
    //     }
    // })


// // create an object to hold the style
// let myStyle = {
//     color: "blue",
//     fillColor: "yellow",
//     weight: 1
// }