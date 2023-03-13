import React, { useContext, useEffect, useRef, useState } from 'react';
import { fromLonLat, Projection, toLonLat, transform } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import { Fill, Stroke, Style } from 'ol/style';
import { GeoJSON } from 'ol/format';
import { NajmoviContext } from '../App';
import Control from 'ol/control/Control';
import marker from '../images/marker.svg';
import styles from './mapa.module.css'

const MapComponent = () => {
    const mapRef = useRef(null);
    const [najmovi, setNajmovi] = useContext(NajmoviContext);
    const [markeri, serMarkeri] = useState([]);

    // dohvaca sve adrese iz baze te ih prikazuje na karti kao pinove
    const dobiAdrese = async () => {
        const adrese_json = await (await fetch("/koordinate")).json();
        serMarkeri(adrese_json.map(adresa => new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point(fromLonLat([adresa["lat"], adresa["lon"]])),
                    }),
                ],
            }),
            style: new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: marker,
                    scale: 0.1
                }),
            })
        })));
    }

    useEffect(() => {
        dobiAdrese();
    }, []);

    useEffect(() => {
        if (najmovi.length > 0) {
            const map = new Map({
                // target: mapRef.current,
                target: "map",
                view: new View({
                    center: new transform([16.596103319251636, 45.4125930612085], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 7,
                }),
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    ...markeri,
                    // new VectorLayer({
                    //     source: new VectorSource({
                    //         format: new GeoJSON(),
                    //         // url: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
                    //         url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
                    //     }),
                    //     style: function (feature) {
                    //         if (feature.get('ADMIN') === 'Croatia') {
                    //             return new Style({
                    //                 stroke: new Stroke({
                    //                     color: '#f00',
                    //                     width: 2,
                    //                 }),
                    //             });
                    //         } else {
                    //             return null;
                    //         }
                    //     },
                    // }),
                ],
                controls: [
                    new Control({
                        element: document.createElement('div'),
                    }),
                ],
            });
        }
    }, [najmovi]);

    return <div id='map' className={styles.map} style={{ width: '40%', height: '100%' }} />;
};

export default MapComponent;
