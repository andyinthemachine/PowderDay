

var ski_areas = [];

function initMap() {

    function Ski_area(name, lat, lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

    var co_ski_area_names =
        ["Loveland Ski Area",
            "Arapahoe Basin Ski Area",
            "Aspen Mountain",
            "Breckenridge Resort",
            "Keystone Resort",
            "Copper Mountain",
            "Vail Ski Resort",
            "Echo Mountain",
            "Winter Park Resort",
            "Buttermilk Ski Area",
            "Eldora Ski Resort",
            "Wolf Creek Ski Area",
            "Ski Cooper",
            "Steamboat Ski Resort",
            "Monarch Mountain",
            "Snowmass Resort",
            "Beaver Creek Resort",
            "Howelsen Hill Ski Area",
            "Silverton Mountain Ski Area",
            "Aspen Mountain Ski Resort",
            "Wolf Creek",
            "Crested Butte",
            "Telluride Ski Resort"];

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

    var copper = new google.maps.LatLng(39.5021, -106.1510);
    var infowindow = new google.maps.InfoWindow({});

    var map = new google.maps.Map(document.getElementById('map'), { center: copper, zoom: 8 });

    var service = new google.maps.places.PlacesService(map);

    co_ski_area_names.forEach(function (area) {
        var request = {
            query: area,
            fields: ['name', 'geometry']
        };
        var service = new google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                ski_areas.push(new Ski_area(area, results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                createMarker(results[0]);
            }
            // else
                // console.log(area + " not found");
        });
    })
}

$("#map").on("click", "#select-button", function () {

    var resort_name = $(this).attr("data-name");
    found = false;
    i = 0;
    while (!found && i < ski_areas.length)
        if (ski_areas[i++].name === resort_name)
            found = true;

    if (found) {

        // var lat_lng = {
        //     lat: ski_areas[i].lat,
        //     lng: ski_areas[i].lng
        // };

        // API.getWeather(lat_lng).then(function (data) {
        //     console.log(data);
        // });

        var resort = {
            name: resort_name,
            lat: ski_areas[i].lat,
            lng: ski_areas[i].lng
            // weather: "",
            // snowfall: 12,
            // snowfall_pred: 6
        };
        console.log(resort);
        API.saveResort(resort).then(function() {refreshResorts()});
    } else
        console.log("resort not found");
});

initMap();





