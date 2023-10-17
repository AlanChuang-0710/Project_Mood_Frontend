import React, { useEffect, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {
    const mapContainer = useRef(null);

    useEffect(() => {
        const container = L.DomUtil.get(mapContainer.current);
        if (container != null) {
            container._leaflet_id = null;
        };
        if (container) {
            const mymap = L.map(mapContainer.current).setView([25.03418, 121.564517], 17);
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

            const marker = L.marker([25.03418, 121.564517], { icon: greenIcon }).addTo(
                mymap
            );

            marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

            L.circle([25.03418, 121.564517], {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.5,
                radius: 10
            }).addTo(mymap);
        }
    });


    return (
        <div>
            <div ref={mapContainer} style={{ height: "500px", width: "100%" }}></div>
        </div>
    );
};

export default Map;