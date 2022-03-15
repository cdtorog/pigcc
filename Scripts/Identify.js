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

        document.getElementById('info').innerHTML = '';
        var no_layers = overlays.getLayers().get('length');
        // alert(no_layers);
        var url = new Array();
        var wmsSource = new Array();
        var layer_title = new Array();


        var i;
        for (i = 0; i < no_layers; i++) {
            //alert(overlays.getLayers().item(i).getVisible());
            var visibility = overlays.getLayers().item(i).getVisible();
            //alert(visibility);
            if (visibility == true) {
                //alert(i);
                layer_title[i] = overlays.getLayers().item(i).get('name');
                // alert(layer_title[i]);
                wmsSource[i] = new ImageWMS({
                    url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                    params: { 'LAYERS': layer_title[i] },
                    serverType: 'geoserver',
                    crossOrigin: 'anonymous'
                });
                //alert(wmsSource[i]);
                //var coordinate2 = evt.coordinate;
                // alert(coordinate);
                url[i] = wmsSource[i].getFeatureInfoUrl(
                    evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'text/html' });
                console.log(evt.coordinate)
                    //  alert(url[i]);
                console.log(url[i]);
                //assuming you use jquery
                $.get(url[i], function(data) {
                    //alert(i);
                    //append the returned html data


                    // $("#info").html(data);
                    //document.getElementById('info').innerHTML = data;
                    //document.getElementById('popup-content').innerHTML = '<p>Feature Info</p><code>' + data + '</code>';

                    //alert(dat[i]);
                    $("#popup-content").append(data);
                    //document.getElementById('popup-content').innerHTML = '<p>Feature Info</p><code>' + data + '</code>';

                    overlay.setPosition(coordinate);

                    //layerSwitcher.renderPanel();
                });
                //alert(layer_title[i]);
                //alert(fid1[0]);



            }
        }
    }
});