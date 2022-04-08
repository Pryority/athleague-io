// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: -25.363882, lng: 131.044922 },
    });
    const bounds = {
        north: -25.363882,
        south: -31.203405,
        east: 131.044922,
        west: 125.244141,
    };

    // Display the area between the location southWest and northEast.
    map.fitBounds(bounds);
    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);
    });
    // Add 5 markers to map at random locations.
    // For each of these markers, give them a title with their index, and when
    // they are clicked they should open an infowindow with text from a secret
    // message.
    const checkpoints =
        [
            {
                kind: "ADVENTURE",
                type: "adventure",
                icon: "assets/images/cp-images/adventure.png",
            },
            {
                kind: "SPRINT",
                type: "sprint",
                icon: "assets/images/cp-images/sprint.png",

            },
            {
                kind: "TACTICAL,",
                type: "tactical,",
                icon: "assets/images/cp-images/tactical.png",
            },
            {
                kind: "ROGAIN,",
                type: "rogain,",
                icon: "assets/images/cp-images/rogain.png",
            },
            {
                kind: "LOCKED - ADVENTURE",
                type: "lockedAdventure",
                icon: "assets/images/cp-images/locked-adventure.png",
            },
            {
                kind: "LOCKED - SPRINT",
                type: "lockedSprint",
                icon: "assets/images/cp-images/locked-sprint.png",
            },
            {
                kind: "LOCKED - TACTICAL,",
                type: "lockedTactical,",
                icon: "assets/images/cp-images/locked-tactical.png",
            },
            {
                kind: "LOCKED - ROGAIN,",
                type: "lockedRogain,",
                icon: "assets/images/cp-images/locked-rogain.png",
            },
        ];
    const lngSpan = bounds.east - bounds.west;
    const latSpan = bounds.north - bounds.south;
    console.log(checkpoints)
    console.log(checkpoints.length)
    for (let i = 0; i < checkpoints.length; ++i) {
        console.log(checkpoints[i].latLng)
        console.log(checkpoints[i].type)
        const marker = new google.maps.Marker({
            position: {
                lat: bounds.south + latSpan * Math.random(),
                lng: bounds.west + lngSpan * Math.random(),
            },
            icon: checkpoints[i].icon,
            map: map,
        });

        attachSecretMessage(marker, checkpoints[i].kind);
    }
}

function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
        position: latLng,
        map: map,
        icon: 'assets/images/cp-images/tactical.png',
    });
    map.panTo(latLng);
}

// Attaches an info window to a marker with the provided message. When the
// marker is clicked, the info window will open with the secret message.
function attachSecretMessage(marker, secretMessage) {
    const infowindow = new google.maps.InfoWindow({
        content: secretMessage,
    });

    marker.addListener("click", () => {
        infowindow.open(marker.get("map"), marker);
        map.setCenter(marker.getPosition());
    });
}
// const course = [Checkpoint];

// Display the area between the checkpoints.
// map.fitBounds(course);
