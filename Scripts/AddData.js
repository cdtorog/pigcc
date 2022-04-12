import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

var csv = require('jquery-csv');
const map = $('#map').data('map');
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function(e) {
    console.log("hola")
    e.preventDefault();
    const input = csvFile.files[0];
    console.log(typeof(input))
    const source = new VectorSource();
    const features = [];
    var reader = new FileReader();
    reader.readAsText(input);
    reader.onload = function(event) {
        var csv = event.target.result;
        var data = $.csv.toArrays(csv);

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
    }
});


const closer = $('#dropDrag-closer');


$('#addData').click(function() {
    const dropDrag = $('#dropDrag');
    dropDrag.css('display', 'block')
})

closer.click(function() {
    $('#dropDrag').css('display', 'none')
});