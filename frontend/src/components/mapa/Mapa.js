// import { React, useRef, useState, useEffect } from 'react';
// import "./Map.css";
// import * as ol from "ol";
// import MapContext from "./MapContext";

// const Mapa = ({ children, zoom, center }) => {
//     const mapRef = useRef();
//     const [map, setMap] = useState(null);
//     // on component mount
//     useEffect(() => {
//         let options = {
//             view: new ol.View({ zoom, center }),
//             layers: [],
//             controls: [],
//             overlays: []
//         };
//         let mapObject = new ol.Map(options);
//         mapObject.setTarget(mapRef.current);
//         setMap(mapObject);
//         return () => mapObject.setTarget(undefined);
//     }, []);
//     // zoom change handler
//     useEffect(() => {
//         if (!map) return;
//         map.getView().setZoom(zoom);
//     }, [zoom]);
//     // center change handler
//     useEffect(() => {
//         if (!map) return;
//         map.getView().setCenter(center)
//     }, [center])
//     return (
//         <MapContext.Provider value={{ map }}>
//             <div ref={mapRef} className="ol-map">
//                 {children}
//             </div>
//         </MapContext.Provider>
//     )
// }

// export default Mapa;

import { React, useEffect } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';

const Mapa = () => {

    setTimeout(() => {
        const map = new Map({
            layers: [
                new TileLayer({ source: new OSM() }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 1,
            }),
            target: 'map',
        });
    }, 1000);

    return (
        <div id='map'
            style={{ width: "40%", height: "100%", backgroundColor: "#e9e9e9" }}></div>
    )// TODO id map
}

export default Mapa;