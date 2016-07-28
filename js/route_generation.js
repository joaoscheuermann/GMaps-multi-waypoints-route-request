function multiRouteRequest() {

    function logger(toLog) {
      console.log(`[MWRQ]: ${toLog}`);
    }
    //Agroup the array to a max given number.
    function agroupArray(data, max_gs) {
        let max_group_size = max_gs;
        let lastPos = 0;
        let returnData = [];
        if (data != undefined && data.length > 0) {
            for (let i = 0; i < data.length + max_group_size; i += max_group_size) {
                if (i > 0) {
                    let arrayCoords = []
                    for (let j = lastPos; j < i; j++) {
                        if (data[j] !== undefined) {
                            arrayCoords.push(data[j]);
                        }
                    }
                    returnData.push(arrayCoords);
                    lastPos = i;
                }
            }
        }
        return returnData;
    };

    //Format the data to send the request;
    function formatData(data) {
        let returnData = []
        for (let i in data) {
            let start = data[i].shift();
            let end = data[i].pop();
            let wp = []; //Waypoints
            for (let j in data[i]) {
                wp.push({
                    location: data[i][j],
                    stopover: false
                })
            }
            returnData.push({
                start: start,
                end: end,
                wp: wp
            });
        }
        return returnData;
    }

    //Faz as solicitaçoes e organiza os resultados em ordem crescente.
    function calcRoute(data, callback) {

        let recived_data = [];

        for (let i in data) {
            let request = {
                origin: data[i].start,
                destination: data[i].end,
                waypoints: data[i].wp,
                travelMode: google.maps.TravelMode.WALKING
            };
            directionsService.route(request, (result, status) => {
                if (status == google.maps.DirectionsStatus.OK) {
                    recived_data.push({
                        result: result,
                        id: i
                    });
                    passResult();
                } else {
                    console.log(status);
                    return
                }
            });
        }

        function passResult() {
            if (recived_data.length === data.length) {
                let return_data = [];
                let ordened_data = recived_data.sort((a, b) => {
                    return a.id - b.id
                });
                for (let l in ordened_data) {
                  return_data.push(ordened_data[l].result)
                }
                callback(return_data, 'READY');
            } else {
                callback(null, 'WAIT');
            }
        }
    }


    //COORDS INPUT =>  {lat: xxx, lng: xxx}
    this.calcRoute = (wp, max_gs, callback) => {
      let formated_data = formatData(agroupArray(wp, max_gs))
      calcRoute(formated_data, (data, status) => {
          callback(data, status);
      });
    }
}



/*
function onDone() {
    let marker_pos = getAllMarkerPos();
    let agrouped_array = agroupArray(marker_pos, 10);
    let formated_data = formatData(agrouped_array);
    calcRoute(formated_data, (data, status) => {
        if (status == 'OK') {
            let route = {
                id: '',
                name: bar_center.name,
                settings: false,
                data: {
                    coords: data
                }
            }
            routes_cache.push(route);
            bar_center.cancel();
        }
    });
}

//Estrair apenas as coordenadas da rota.
let path = result.routes[0].legs[0].steps;

let coords_cache = [];
for (let j in path) {
    let rr = path[j].lat_lngs //google.maps.geometry.encoding.decodePath(path[j].encoded_lat_lngs);
    for (var k in rr) {
        coords_cache.push({
            lat: rr[k].lat(),
            lng: rr[k].lng()
        });
    }
}
*/
