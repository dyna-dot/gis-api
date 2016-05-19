// TODO: Load on demand

import L from 'leaflet';

// https://github.com/dhis2/dhis2-gis-api/issues/3
import eeApi from 'imports?this=>window!exports?goog&ee!../temp/ee_api_js_debug';  // https://github.com/webpack/docs/wiki/shimming-modules

const goog = eeApi.goog; // eslint-disable-line
const ee = eeApi.ee;

export const EarthEngine = L.TileLayer.extend({

    options: {
        url: 'https://earthengine.googleapis.com/map/{mapid}/{z}/{x}/{y}?token={token}',
        // view-source:http://server-auth-dot-ee-demos.appspot.com/
        tokenType: 'Bearer',
    },

    initialize(opts = {}) {
        const options = L.setOptions(this, opts);
        L.TileLayer.prototype.initialize.call(this, options.url, options);
    },

    onAdd() {
        const accessToken = this.options.accessToken;

        if (accessToken) {
            if (accessToken instanceof Function) {
                accessToken(this.onValidAccessToken.bind(this));
            } else {
                this.onValidAccessToken(accessToken);
            }
        }

        this._initContainer();
    },

    // TODO: Call on token expiry
    onValidAccessToken(token) {
        // https://github.com/google/earthengine-api/blob/07052aa5c168639f134501765df2a2a7ae2f1d6f/javascript/src/data.js#L174
        ee.data.setAuthToken(token.client_id, this.options.tokenType, token.access_token, token.expires_in, null, null, false); // (token.expiryDate - Date.now()) / 1000

        ee.initialize();
        this.createLayer();
    },

    createLayer() {
        const options = this.options;
        let eeImage;

        if (!options.filter) { // Single image
            eeImage = ee.Image(options.id); // eslint-disable-line
        } else { // Image collection
            let collection = ee.ImageCollection('WorldPop/POP'); // eslint-disable-line

            for (const filter of options.filter) {
                collection = collection.filter(ee.Filter[filter.type].apply(this, filter.arguments));  // eslint-disable-line
                eeImage = collection.mosaic();
            }
        }

        const eeMapConfig = eeImage.getMap(options.config || {});

        options.token = eeMapConfig.token;
        options.mapid = eeMapConfig.mapid;

        // console.log("mapid", options.mapid, options.token);


        L.TileLayer.prototype.onAdd.call(this);
        // this.fire('initialized');
    },

});

export default function earthEngine(options) {
    return new EarthEngine(options);
}

