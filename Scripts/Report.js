import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { ImageWMS, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';


var csv = require('jquery-csv');
const map = $('#map').data('map');
const reportForm = document.getElementById("reportForm");
const csvForm = document.getElementById("csvForm");
const csvFile = document.getElementById("reportCsvFile");
const viewResolution = $('#map').data('view').getResolution();
const overlays = $('#map').data('layergroup')
    //document.getElementById("reporte").innerHTML += "<h1>Reporte PICGG</h1>";
var pointsCoordinates = [];
const repo = document.getElementById('reporte');

var respHtml = [];
csvForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const source = new VectorSource();
    const features = [];
    var reader = new FileReader();
    reader.readAsText(input);
    reader.onload = function(event) {
        var csv = event.target.result;
        var data = $.csv.toArrays(csv);


        let fetches = [];
        data.forEach(element => {

            var coords = fromLonLat([(element[0]), (element[1])], 'EPSG:4326');
            pointsCoordinates.push(coords)
            overlays.getLayers().forEach(item => {
                fetches.push(fetch((item.getSource().getFeatureInfoUrl(coords, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'text/html' }))).then((response) => response.text())
                    .then((html) => {
                        if (html != 'undefined') {
                            //$("#reporte").append(html)
                            respHtml.push(html);
                        }

                    }))
                Promise.all(fetches).then((responses) => {
                    responses.forEach((response) => {

                    });
                })
            })
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

reportForm.addEventListener("submit", function(e) {
    var i = 0;
    var coords;
    console.log(respHtml.length, pointsCoordinates.length)
        //$("#reporte").empty()
    $("#reporte").append('<h2>Reporte PICGG</h2>')
    pointsCoordinates.forEach(element => {
        $("#reporte").append("Lon: ", element[0], " - Lat: ", element[1]);
        overlays.getLayers().forEach(element => {
            $("#reporte").append(respHtml[i])
            i++;
        })

    })

    reporte()
    closer.click()
});


function abrirEnPestana(codigo) {
    // var reporte = document.getElementById("reporte");
    //var informe = document.createElement("div");
    var reportwindow = window.open("", "Reporte PIGCC")
    reportwindow.document.write(codigo)
}
const closer = $('#reportDrag-closer');


$('#report').click(function() {
    const dropDrag = $('#reportDrag');
    dropDrag.css('display', 'block')
})

function reporte() {
    const repoDiv = $('#reporte');
    repoDiv.css('display', 'block')
    reportOption()
}

function reportOption() {
    var resultado = window.confirm('Su informe esta listo pulse aceptar para abrirlo en una nueva pestaña o cancelar para descargarlo');
    if (resultado === true) {
        var codigo = document.getElementById("reporte").innerHTML
        abrirEnPestana(codigo);
    } else {
        var printDoc = new jsPDF('p', 'pt', 'a4');
        printDoc.fromHTML($('#reporte').get(0), 10, 10, { 'width': 180 });
        printDoc.save('html.pdf')
    }
}

closer.click(function() {
    $('#reportDrag').css('display', 'none')
});