import DragAndDrop from 'ol/interaction/DragAndDrop';
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

const map = $('#map').data('map');


$('#dragAndDrop').click(function() {

    $('#draggable-title').html('Arrastrar y Soltar');
    $('#draggable-content').html(`<p class="h6">Esta herramienta le permite arrastrar</p><p class="h6"> y soltar en el mapa diferentes archivos</p><p class="h6">para su visualizacion</p>
    <p class="h6">Los formatos de archivo aceptados son:<p class="h6">GPX   GeoJSON   IGC   KML   TopoJSON  Shp(.zip)</p>
    `);
    $('#draggable').css('display', 'block')
    let dragAndDropInteraction;

    const featureStyle = new Style({
        stroke: new Stroke({
            color: 'red',
            width: 1
        })
    });

    function setInteraction() {
        if (dragAndDropInteraction) {
            map.removeInteraction(dragAndDropInteraction);
        }
        dragAndDropInteraction = new DragAndDrop({
            formatConstructors: [
                // files extensions
                GPX,
                GeoJSON,
                IGC,
                new KML({ extractStyles: true }),
                TopoJSON,
            ],
        });

        dragAndDropInteraction.on('addfeatures', function(event) {
            const vectorSource = new VectorSource({
                features: event.features,
            });
            map.addLayer(
                new VectorLayer({
                    source: vectorSource,
                })
            );
            map.getView().fit(vectorSource.getExtent());
        });

        map.addInteraction(dragAndDropInteraction);
    }

    setInteraction();

    const displayFeatureInfo = function(pixel) {
        const features = [];
        map.forEachFeatureAtPixel(pixel, function(feature) {
            features.push(feature);
        });
        if (features.length > 0) {
            const info = [];
            let i, ii;
            for (i = 0, ii = features.length; i < ii; ++i) {
                info.push(features[i].get('name'));
            }
            document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
        } else {
            document.getElementById('info').innerHTML = '&nbsp;';
        }
    };

    map.getViewport().addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    map.getViewport().addEventListener('drop', function(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        for (let i = 0, ii = files.length; i < ii; ++i) {
            const file = files.item(i);
            loadshp({ url: file, encoding: 'utf-8', EPSG: 4686 }, function(geojson) {
                const features = new GeoJSON().readFeatures(
                    geojson, { featureProjection: map.getView().getProjection() }
                );
                const vectorSource = new VectorSource({
                    features: features
                });
                map.addLayer(
                    new VectorLayer({
                        source: vectorSource,
                        style: featureStyle
                    })
                );
                map.getView().fit(vectorSource.getExtent());
            });
        }
    });

    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });

    map.on('click', function(evt) {
        displayFeatureInfo(evt.pixel);
    });

    $('#draggable-closer').click(function() {
        $('#draggable').css('display', 'none');
        $('#draggable-title').html('none');
        map.removeInteraction(dragAndDropInteraction);
        map.getView().set({
            projection: 'EPSG:4326',
            center: [-75.66612430009317, 4.418912598262188], //Coordinates of center
            zoom: 10 //zoom level of map
        })
    });

});