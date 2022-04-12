import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { ImageWMS, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

var csv = require('jquery-csv');
const map = $('#map').data('map');
const myForm = document.getElementById("reportForm");
const csvFile = document.getElementById("reportCsvFile");
const viewResolution = $('#map').data('view').getResolution();
const overlays = $('#map').data('layergroup')
$("report").empty();
var pointsCoordinates;

myForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const source = new VectorSource();
    const features = [];
    var reader = new FileReader();
    reader.readAsText(input);
    reader.onload = function(event) {
        var csv = event.target.result;
        var data = $.csv.toArrays(csv);
        pointsCoordinates = data;

        data.forEach(element => {

            const coords = fromLonLat([(element[0]), (element[1])], 'EPSG:4326');

            console.log(coords)

            features.push(
                new Feature({
                    geometry: new Point(coords),
                })
            );

        });
        source.addFeatures(features);
        const meteorites = new VectorLayer({
            source: source,
        });

        var stylePoint = new Style({
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: [255, 128, 0, 1],
                }),
                stroke: new Stroke({
                    color: [255, 255, 255, 0.75],
                    width: 1.5,
                }),
            }),
            zIndex: 100000,
        });
        meteorites.getSource().getFeatures().forEach(function(e) {
            e.setStyle(stylePoint)
        })
        map.addLayer(meteorites);
        return data;
    }
});

myForm.addEventListener("submit", function(e) {
    var no_layers = overlays.getLayers().get('length');
    var url = new Array();
    var wmsSource = new Array();
    var layer_title = new Array();
    var i;
    for (i = 0; i < no_layers; i++) {
        var visibility = overlays.getLayers().item(i).getVisible();
        if (visibility == true) {
            layer_title[i] = overlays.getLayers().item(i).get('name');
            wmsSource[i] = new ImageWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': layer_title[i] },
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            });
            pointsCoordinates.forEach(element => {

                const coords = fromLonLat([(element[0] * 1), (element[1] * 1)], 'EPSG:4326');
                url[i] = wmsSource[i].getFeatureInfoUrl(
                    coords, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'text/html' });
                var linea = "<h2>Punto: " + i + " Coordenadas: " + coords + "</h2>";
                $("report").append(linea);

                $.get(url[i], function(data) {
                    $("report").append(data);
                    console.log(data)
                });

            });
        }
    }
    console.log("fin")
    console.log($("report"))
});



const closer = $('#reportDrag-closer');


$('#report').click(function() {
    const dropDrag = $('#reportDrag');
    dropDrag.css('display', 'block')
})

closer.click(function() {
    $('#reportDrag').css('display', 'none')
});