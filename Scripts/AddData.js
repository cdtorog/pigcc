import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { Map, View } from 'ol';
import { Stamen, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { data } from 'jquery';

var csv = require('jquery-csv');
const map = $('#map').data('map');
const view = $('#map').data('view');

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function(e) {
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
        map.addLayer(meteorites);
    }
});


const closer = $('#dropDrag-closer');


$('#addData').click(function() {
    const dropDrag = $('#dropDrag');
    const ev = $('drop_zone').even();
    dropDrag.css('display', 'block')
})

closer.click(function() {
    $('#dropDrag').css('display', 'none')
});