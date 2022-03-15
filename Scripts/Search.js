import { Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { GeoJSON } from "ol/format";

const map = $('#map').data('map');

const wfsUrl = 'http://gisserviciosclimaticos.uniquindio.edu.co:8080/geoserver/pigcc/wfs';
const vectorSource = new VectorSource();
const style = new Style({
    stroke: new Stroke({
        color: 'blue',
        width: 2
    })

})
const vector = new Vector({
    source: vectorSource,
    style: style
});

map.addLayer(vector);

document.getElementById("search").addEventListener("click", function(event) {
    event.preventDefault()
    const codigoCatastral = $('#codigoCatastral').val().toString();

    if (codigoCatastral.length == 0) {
        window.alert('Por favor ingrese un código catastral');
    }
    if (codigoCatastral.length > 0 && codigoCatastral.length < 30) {
        window.alert('Por favor ingrese un código catastral completo (30 Caracteres)');
    }
    console.log("hola")
    console.log(codigoCatastral)

    const CQL_FILTER = "codigo=" + codigoCatastral;
    console.log(CQL_FILTER)

    const featureRequest = {
        "service": "WFS",
        "request": "GetFeature",
        "typename": "pigcc:predios",
        "outputFormat": "application/json",
        "srsname": "EPSG:4326",
        "maxFeatures": 50,
        "CQL_FILTER": CQL_FILTER
    };

    console.log(featureRequest)

    fetch(wfsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(featureRequest)
    }).then(function(json) {
        if (json.status == !null) {
            var features = new GeoJSON().readFeatures(reponse);
            vectorSource.clear(true);
            vectorSource.addFeatures(features);
            //map.getView().fit(vectorSource.getExtent());
        } else {
            // window.alert('No se encontraron predios');
        }
    })
})