import React, { useEffect, useRef } from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

        // 有些瀏覽器navigator不支持html5 geolocation對象
        if ("geolocation" in navigator) {
            // 有些瀏覽器geolocation不支持getCurrentPosition屬性
            // 傳入兩個參數 success 函數 & reject 函數
            window.navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                drawMap(latitude, longitude);
            }, () => drawMap());
        } else {
            alert("Your Browser does not support HTML5 Geolocation");
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