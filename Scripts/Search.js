import { Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { GeoJSON } from "ol/format";

const map = $('#map').data('map');

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

    var url = "http://gisserviciosclimaticos.uniquindio.edu.co:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pigcc:predios&CQL_FILTER=codigo='" + codigoCatastral + "'&outputFormat=application/json"

    const vectorSource = new VectorSource({
        url: url,
        format: new GeoJSON()
    });
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

    console.log(vectorSource.getFeatures());


    map.addLayer(vector);
    vector.getSource().on('addfeature', function() {
        map.getView().fit(
            vectorSource.getExtent(), { duration: 1590, size: map.getSize(), padding: [100, 100, 100, 100] }
        );
    });
});