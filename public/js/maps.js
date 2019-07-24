

var ski_areas = [];
var geocoder = new google.maps.Geocoder();

function initMap(location) {

    function Ski_area(name, lat, lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(`${place.name}<br>\<button id="select-button" data-name="${place.name}" class="btn-sm">Select</button>`);
            infowindow.open(map, this);
        });
    }


    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var lat_str = results[i].geometry.location.lat().toFixed(6);
                var lng_str = results[i].geometry.location.lng().toFixed(6);
                ski_areas.push(new Ski_area(results[i].name, Number(lat_str), Number(lng_str)));
                createMarker(results[i]);
            }
        }
    }

    ski_areas = [];

    var infowindow = new google.maps.InfoWindow({});

    var map = new google.maps.Map(document.getElementById('map'), { center: location, zoom: 10 });

    var request = {
        location: location,
        radius: 50000,
        keyword: ["ski", "area"]
    };
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

$("#map").on("click", "#select-button", function () {

    var resort_name = $(this).attr("data-name");

    console.log("click:", resort_name);

    // get index of resort clicked in ski-areas array
    found = false;
    i = 0;
    while (!found && i < ski_areas.length)
        if (ski_areas[i].name === resort_name)
            found = true;
        else
            i++;

    if (found) {
        console.log("found");
        console.log(ski_areas);
        var trunc_name = resort_name;
        if (resort_name.length > 32) trunc_name = resort_name.slice(0, 31);
        var resort = {
            name: trunc_name,
            lat: ski_areas[i].lat,
            lng: ski_areas[i].lng
        };
        console.log(resort);
        API.saveResort(resort).then(function (data) {
            if (data === "exists")
                alert("resort already in list");
            else
                refreshResorts();
        });
    } else
        console.log("resort not found");
});

var $loc = $("#loc");

var handleSubmitBtnClick = function () {

    var loc = $('#change-location').val().trim();
    geocoder.geocode({ 'address': loc }, function (results, status) {
        if (status == 'OK')
            initMap(results[0].geometry.location);
        else
            alert('Geocode was not successful: ' + status);

    });
};

$loc.on("click", "#submit-btn", handleSubmitBtnClick);




// start out at copper mtn colorado
var copper = new google.maps.LatLng(39.5021, -106.1510);
initMap(copper);










