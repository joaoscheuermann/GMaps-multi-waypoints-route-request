const teste = new multiRouteRequest();

let map;

function init() {
    let mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 3
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

let wp = [
  
]

teste.calcRoute(wp, 10, 500, (data, status) => {
  console.log(data);
  console.log(status);
})
