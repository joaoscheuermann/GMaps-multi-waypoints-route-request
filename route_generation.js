global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}


function route_generation() {
    let markers_cache = [];

    function addMarker(location) {
        if (markers_cache.length <= 500) {
            let marker = new google.maps.Marker({
                position: location,
                map: map,
                draggable: true
            });
            markers_cache.push(marker);
            markers_cache[markers_cache.length-1].addListener('click', ()=> {
              console.log('teste');
            });
        }
    }

    function removeLastMarker() {
        if (markers_cache.length - 1 >= 0) {
            markers_cache[markers_cache.length - 1].setMap(null);
            markers_cache.splice(markers_cache.length - 1, 1);
        }
    }

    function removeAllMarkers() {
        if (markers_cache.length > 0) {
            for (i in markers_cache) {
                markers_cache[i].setMap(null);
            }
            markers_cache = [];
        }
        google.maps.event.clearListeners(markers_cache, 'click');
    }


    function getAllMarkerPos() {
        let returnData = [];
        if (markers_cache.length - 1 >= 0) {
            for (let i in markers_cache) {
                returnData.push({
                    lat: markers_cache[i].position.lat(),
                    lng: markers_cache[i].position.lng()
                })
            }
            console.log('[ALL M POS]: ', returnData);
            return returnData;
        } else { /*do something*/ }
    }

    function agroupArray(data, MWP) {
        let MAX_WAY_POINTS = MWP;
        let lastPos = 0;
        let returnData = [];
        if (data != undefined && data.length > 0) {
            for (let i = 0; i < data.length + MAX_WAY_POINTS; i += MAX_WAY_POINTS) {
                if (i > 0) {
                    let arrayTarget = i;
                    let arrayCoords = []
                    for (let j = lastPos; j < arrayTarget; j++) {
                        if (data[j] !== undefined) {
                            arrayCoords.push(data[j]);
                        }
                    }
                    returnData.push(arrayCoords);
                    lastPos = arrayTarget;
                }
            }
        }
        console.log('[AGROUPED ARRAY]: ', returnData);
        return returnData;
    };

    function formatData(data) {
        console.log(data);
        let returnData = []
        for (let i in data) {
            let start = data[i].shift();
            let end = data[i].pop();
            let wp = [];
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
        console.log('[FORMATED DATA]: ', returnData);
        return returnData;
    }


    function calcRoute(data, callback) {
        console.log(data);
        let recived_data = [];
        for (let i in data) {
            let request = {
                origin: data[i].start,
                destination: data[i].end,
                waypoints: data[i].wp,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.WALKING
            };

            directionsService.route(request, function(result, status) {
                console.log('STATUS :', status);
                if (status == google.maps.DirectionsStatus.OK) {
                    console.log('[R REQUEST RESPONSE]: ', result);
                    let path = result.routes[0].legs[0].steps;
                    console.log(path);
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
                    recived_data.push({
                        coords: coords_cache,
                        id: i
                    });
                    passResult();
                } else {
                    console.log('ROTA NAO CALCULADA');
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
                    for (let m in ordened_data[l].coords) {
                        return_data.push(ordened_data[l].coords[m]);
                    }
                }
                callback(return_data, 'OK');
            } else {
                callback(null, 'WAIT');
            }
        }
    }

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

    //EXPORT FUNCIONALITY
    this.addMarker = (e) => {
        addMarker(e);
    }

    this.removeLastMarker = () => {
        removeLastMarker();
    }

    this.removeAllMarkers = () => {
        removeAllMarkers();
    }

    this.onDone = () => {
        onDone();
    }

}

module.exports = new route_generation();
