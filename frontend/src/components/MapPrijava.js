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

const MapPrijava = ({ onMapClick }) => {
    const mapRef = useRef(null);
    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);

    const napraviMapu = () => {
        const vectorSource = new VectorSource();
        const map = new Map({
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
        });

        map.on('click', (evt) => {
            const coordinate = evt.coordinate;
            const lonLat = toLonLat(coordinate);
            const longitude = lonLat[0];
            const latitude = lonLat[1];
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
    };

    useEffect(() => {
        napraviMapu();
    }, []);

    return <div ref={mapRef} style={{ width: '40%', height: '100%' }} />;
};

export default MapPrijava;
