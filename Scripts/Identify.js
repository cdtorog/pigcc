import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import ImageWMS from 'ol/source/ImageWMS';

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
    element: container,
    autoPan: {
        animation: {
            duration: 250,
        },
    },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

const map = $('#map').data('map')
const viewResolution = $('#map').data('view').getResolution();
const overlays = $('#map').data('layergroup')
map.addOverlay(overlay);



/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function(evt) {
    if ($('#draggable-title').text() !== "Herramienta Medida") {
        const coordinate = evt.coordinate;

        //alert(coordinate1);
        $("#popup-content").empty();

        //document.getElementById('info').innerHTML = '';
        var no_layers = overlays.getLayers().get('length');
        // alert(no_layers);
        var url = new Array();
        var wmsSource = new Array();
        var layer_title = new Array();


        var i;
        for (i = 0; i < no_layers; i++) {
            //get visibility properti for echa item
            var visibility = overlays.getLayers().item(i).getVisible();
            //check visibility
            if (visibility == true) {
                //get name from each layer
                layer_title[i] = overlays.getLayers().item(i).get('name');
                // define wms query
                wmsSource[i] = new ImageWMS({
                    url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                    params: { 'LAYERS': layer_title[i] },
                    serverType: 'geoserver',
                    crossOrigin: 'anonymous'
                });

                url[i] = wmsSource[i].getFeatureInfoUrl(
                    evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'text/html' });


                //get data from result
                $.get(url[i], function(data) {
                    //add data to popup
                    $("#popup-content").append(data);
                    overlay.setPosition(coordinate);

                });
            }
        }
    }
});