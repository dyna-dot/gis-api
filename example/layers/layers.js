import map from '../../src';
import '../../scss/dhis2-gis.scss';

map('map', {
    layers: [{
        type: 'mapQuest',
        name: 'OpenStreetMap',
        baseLayer: true,
        visible: true,
    }, {
        type: 'google',
        name: 'Google Streets',
        baseLayer: true,
        visible: false,
    }, {
        type: 'google',
        name: 'Google Terrain',
        style: 'TERRAIN',
        baseLayer: true,
        visible: false,
    }, {
        type: 'google',
        name: 'Google Satellite',
        style: 'SATELLITE',
        baseLayer: true,
        visible: false,
    }, {
        type: 'google',
        name: 'Google Hybrid',
        style: 'HYBRID',
        baseLayer: true,
        visible: false,
    }, {
        type: 'earthEngine',
        name: 'Landcover',
        overlay: true,
        visible: false,
        mapId: 'dee79d266742c143cae42c376483acf8',
        token: 'ef067f8e3e931a5e97a7880f20b5ea7e',
        opacity: 0.5,
    }, {
        type: 'earthEngine',
        name: 'Elevation',
        overlay: true,
        visible: false,
        mapId: '0f129e4e9edd5e503dc63bbef38fbcf7',
        token: '3fbfb376d0a18ba4b4a4848cb0396f34',
        opacity: 0.5,
    }, {
        type: 'choropleth',
        name: 'Choropleth',
        overlay: true,
        visible: false,
        features: '/data/districts-features.json',
        data: '/data/districts-data.json',
        popup(feature) {
            return 'Popup content for ' + feature.properties.na;
        },
    }, {
        type: 'features',
        name: 'Districts',
        overlay: true,
        visible: false,
        features: '/data/districts-features.json',
        popup(feature) {
            return 'Popup content for ' + feature.properties.na;
        },
    }, {
        type: 'features',
        name: 'Facilities',
        overlay: true,
        visible: false,
        features: '/data/facilities-features.json',
        popup(feature) {
            return 'Popup content for ' + feature.properties.na;
        },
    }, {
        type: 'cluster',
        name: 'Cluster',
        overlay: true,
        visible: false,
        data: '/data/facilities-features.json',
    }, {
        type: 'circleMarkers',
        name: 'Proportional symbols',
        overlay: true,
        visible: true,
        features: '/data/facilities-features.json',
        data: '/data/facilities-data.json',
    },
    ],
    bounds: [[6.9679, -13.29096], [9.9432, -10.4887]],
});