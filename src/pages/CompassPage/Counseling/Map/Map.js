import React, { useEffect, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {
    const mapContainer = useRef(null);

    useEffect(() => {
        let mymap = "";

        function drawMap(latitude = 24.77624184, longitude = 120.97160238) {
            mymap = L.map(mapContainer.current, { maxZoom: 18, minZoom: 7 }).setView([latitude, longitude], 17);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mymap);
            const greenIcon = new L.Icon({
                iconUrl:
                    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            L.marker([latitude, longitude], { icon: greenIcon }).bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup().addTo(mymap);

            L.circle([25.03418, 121.564517], {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.5,
                radius: 10
            }).addTo(mymap);
        }

        if ("geolocation" in navigator) {
            window.navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                // const container = L.DomUtil.get(mapContainer.current);
                drawMap(latitude, longitude);
            });
        } else {
            alert("Your Geolocation is not available");
            drawMap();
        }


        return () => {
            mymap.remove();
        };
    });


    return (
        <div>
            <div ref={mapContainer} style={{ height: "500px", width: "100%", borderRadius: "10px" }}></div>
        </div>
    );
};

export default Map;