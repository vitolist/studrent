import React, { useContext, useEffect, useRef, useState } from 'react';
import { fromLonLat, toLonLat, transform } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { NajmoviContext } from '../App';
import marker from '../images/marker.svg';
import Control from 'ol/control/Control';

const MapPrijava = ({ onMapClick }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(0);
    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);

    // izraduje mapu koja se koristi kod izrade najma, opcija dodavanja koordinata prilikom pritiska na mapu
    const napraviMapu = () => {

    };

    useEffect(() => {
        if (!map) {
            const vectorSource = new VectorSource();
            const newMap = new Map({
                target: mapRef.current,
                view: new View({
                    center: new transform([16.596103319251636, 45.4125930612085], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 7,
                }),
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    new VectorLayer({
                        source: vectorSource,
                        style: new Style({
                            image: new Icon({
                                anchor: [0.5, 1],
                                src: marker,
                                scale: 0.1,
                            }),
                        }),
                    }),
                ],
                controls: [
                    new Control({
                        element: document.createElement('div'),
                    }),
                ],
            });

            newMap.on('click', (evt) => {
                const coordinate = evt.coordinate;
                const lonLat = toLonLat(coordinate);
                const longitude = lonLat[0];
                const latitude = lonLat[1];
                // console.log(longitude, latitude);
                onMapClick(longitude, latitude);
                console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);

                const feature = new Feature({
                    geometry: new Point(coordinate),
                });
                vectorSource.clear();
                vectorSource.addFeature(feature);

                setLon(longitude);
                setLat(latitude);

            });

            setMap(newMap);
        }
    }, [map]);

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default MapPrijava;
