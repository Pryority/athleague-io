function initMap() {
    const myLatlng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
    });

    // Create the DIV to hold the control and call the makeInfoBox() constructor
    // passing in this DIV.
    var infoBoxDiv = document.createElement('div');
    infoBoxDiv.style.border = '1.62px solid #00ff0062';
    infoBoxDiv.style.borderRadius = '8px';
    infoBoxDiv.style.backgroundColor = '#ffffff';
    // infoBoxDiv.style.boxShadow = '0px 6px 32px 4px #000000';
    infoBoxDiv.style.padding = '16px';

    makeInfoBox(infoBoxDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

    infoWindow.open(map);

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });

    function makeInfoBox(controlDiv, map) {
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        // controlUI.style.borderRadius = '2px';
        // controlUI.style.marginBottom = '22px';
        // controlUI.style.marginTop = '10px';
        controlUI.style.textAlign = 'center';
        controlUI.placeholder = 'Enter a location';
        controlDiv.appendChild(controlUI);

        var locationInput = document.createElement('input');
        var locationInputVal = document.createElement('input').val;
        locationInput.style.backgroundColor = '#fff';
        locationInput.style.border = '0.62px solid #00000034';
        locationInput.style.width = '100%';
        locationInput.style.padding = '4px';
        // locationInput.style.borderRadius = '2px';
        // locationInput.style.marginBottom = '22px';
        locationInput.style.marginTop = '10px';
        locationInput.style.textAlign = 'center';
        locationInput.placeholder = 'Enter a location';
        controlDiv.appendChild(locationInput);

        var locationInput = document.createElement('button');
        locationInput.style.backgroundColor = '#004f0034';
        locationInput.style.border = '0.62px solid #00000034';
        locationInput.style.width = '100%';
        locationInput.style.padding = '4px';
        // locationInput.style.borderRadius = '2px';
        // locationInput.style.marginBottom = '22px';
        locationInput.style.marginTop = '10px';
        locationInput.style.textAlign = 'center';
        locationInput.textContent = 'Search';
        controlDiv.appendChild(locationInput);

        // Set CSS for the control interior.
        var controlText = document.createElement('h1');
        controlText.style.color = 'rgb(25,25,25)';
        // controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '100%';
        controlText.style.padding = '6px';
        controlText.style.fontSize = '24px';
        controlText.style.fontWeight = 'bold';
        controlText.textContent =
            'Trail Finder';
        controlUI.appendChild(controlText);
    }

    locationInput.addListener('click', getLocation(locationInputVal));

}

function getLocation(locationInputVal) {
    var request =
    {
        query: 'trails',
        location: locationInputVal,
        radius: '5000'
    }
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, function placeMarkerAndPanTo(locationInputVal, map) {
        new google.maps.Marker({
            position: locationInputVal,
            map: map,
            icon: 'assets/images/cp-images/tactical.png',
        });
        console.log(request);
        console.log(locationInputVal);
        map.panTo(locationInputVal);
    });
}