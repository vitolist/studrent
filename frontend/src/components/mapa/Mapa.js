import { React, useEffect } from 'react';
// import Map from 'ol/Map.js';
// import View from 'ol/View.js';
// import OSM from 'ol/source/OSM.js';
// import TileLayer from 'ol/layer/Tile.js';
// import Layer from 'ol/layer/Layer';
// import Source from 'ol/source/Source';
// import Style from 'ol/style/Style';
// import Feature from 'ol/Feature';
// import { Geometry, Point } from 'ol/geom';
// import { fromLonLat, Projection, transform } from 'ol/proj';
// import Tile from 'ol/Tile';
// import UrlTile from 'ol/source/UrlTile';
// import VectorTile from 'ol/VectorTile';
// import TileSource from 'ol/source/Tile';
// import Icon from 'ol/style/Icon';

import Map, { Marker, NavigationControl } from 'react-map-gl';
import maplibregl from "maplibre-gl";
import MapComponent from '../MapComponent';

const Mapa = () => {

    // setTimeout(() => {
    //     const map = new Map({
    //         layers: [
    //             new TileLayer({ source: new OSM() }),
    //         ],
    //         view: new View({
    //             center: [0, 0],
    //             zoom: 2,
    //         }),
    //         target: 'map',
    //     });

    //     var markers = new Layer.Vector({
    //         source: new Source.Vector(),
    //         style: new Style.Style({
    //             image: new Style.Icon({
    //                 anchor: [0.5, 1],
    //                 src: './images/marker.png'
    //             })
    //         })
    //     });
    //     map.addLayer(markers);
    //     var marker = new Feature(new Geometry.Point(Projection.fromLonLat([0, 0])));
    //     markers.getSource().addFeature(marker);
    // }, 1000);

    return (
        // <div id='map'
        //     style={{ width: "40%", height: "100%", backgroundColor: "#e9e9e9" }}></div>

        // <div style={{ width: "40%", height: "100%", backgroundColor: "#e9e9e9" }}>
        //     <Map mapLib={maplibregl}
        //         initialViewState={{
        //             longitude: 0,
        //             latitude: 0,
        //             zoom: 1,
        //         }}
        //         style={{ width: "100%", height: "100%" }}
        //         mapStyle="https://api.maptiler.com/maps/streets/style.json?key=OW7GFhY54aDyuUcodnM6"
        //     >
        //         <Marker longitude={0}
        //             latitude={0}
        //             color="#0000FF" />
        //     </Map>
        // </div>

        <MapComponent />
    )
}

export default Mapa;