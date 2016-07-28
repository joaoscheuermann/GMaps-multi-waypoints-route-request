const teste = new multiRouteRequest();

let map;
let directionsService;
let directionsDisplay;

function init() {
    let mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 3
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

window.onload = () => {

    init();
    directionsService = new google.maps.DirectionsService();

    let wp = []

    console.log("A click adds a wp in the array!");
    map.addListener('click', (e) => {
        console.log({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        }, wp.length);

        wp.push({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });


    })

    console.log("A double click calls the calcRoute method, process the data and return a array with all the ordened results");
    map.addListener('dblclick', (e) => {
        teste.calcRoute(wp, 10, (result, status) => {
            if (status == 'READY') {
              console.log(result);
            }
        })
        wp = [];
    });






}
