import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Polygon } from 'ol/geom';
import { always as conditionAlways } from 'ol/events/condition';
import TransformInteraction from 'ol-ext/interaction/Transform';
import { fromLonLat, toLonLat } from "ol/proj";
import { getDistance } from "ol/sphere";
import { downloadBlob, print } from "@camptocamp/inkmap";
import { jsPDF } from "jspdf";

const map = $('#map').data('map');

$('#printMap').click(function() {
    $('#draggable-title').html('Imprimir Mapa');
    $('#draggable-content').html(`<p class="h6">Utilice el rectangulo para</p><p class="h6">seleccionar el area a imprimir</p><p class="h6">luego pulse el boton para generar la impresion</p>
    <button type="button" id="print-btn">Print</button>
    `);
    $('#draggable').css('display', 'block')

    const layers = $('#map').data('layergroup').getLayers()

    //layers.push($('#map').data('basemaps').getLayers());
    const visibleLayers = [];
    const mapCenter = map.getView().getCenter();

    layers.forEach(element => {
        if (element.getVisible()) {
            var layerName = "picgcc:" + element.get("name");
            var opacity = element.get("opacity");
            console.log(layerName)
            visibleLayers.push({
                "type": "WMS",
                "url": "http://189.50.208.110:8080/geoserver/pigcc/wms",
                layer: layerName,
                "tiled": true,
                "opacity": opacity,
                "attribution": "© OpenStreetMap (www.openstreetmap.org), Terrestris GmbH"
            });
        }

    })
    console.log(visibleLayers);

    // our rectangle (width to height ratio is √2 as per DIN paper formats)
    const rectWidth = 0.1;
    const rectHeight = rectWidth / Math.sqrt(2);
    const rectangle = new Feature({
        geometry: new Polygon([
            [
                [mapCenter[0] - rectWidth, mapCenter[1] + rectHeight],
                [mapCenter[0] + rectWidth, mapCenter[1] + rectHeight],
                [mapCenter[0] + rectWidth, mapCenter[1] - rectHeight],
                [mapCenter[0] - rectWidth, mapCenter[1] - rectHeight],
            ]
        ])
    });

    // this vector layer will contain our rectangle
    const vectorLayer = new VectorLayer({
        source: new VectorSource({
            features: [rectangle]
        })
    });

    // this will give the user the possibility to move the
    // rectangle around and resize it by dragging its corners
    const transform = new TransformInteraction({
        layers: vectorLayer,
        stretch: false,
        keepAspectRatio: conditionAlways,
        rotate: false
    });

    map.addLayer(vectorLayer);
    map.addInteraction(transform);

    // bind the print button click handler
    document.getElementById('print-btn')
        .addEventListener('click', () => {
            printAndDownload(rectangle.getGeometry());
        });

    /**
     * Requests a print from inkmap, download the resulting image
     * @param {Polygon} rectangleGeometry
     */
    function printAndDownload(rectangleGeometry) {
        // first get the geometry center in longitude/latitude
        const geomExtent = rectangleGeometry.getExtent();
        console.log(geomExtent)
        const center = rectangleGeometry.getInteriorPoint().getCoordinates();
        console.log(center);
        center.pop();
        console.log(center);


        // let's target a final format of A4:
        // the map will be 277 x 170 millimeters
        const size = [277, 170, 'mm'];

        // now the hard part: compute the scale denominator, which
        // is the ratio between the rectangle size in real world units
        // and the final printed size in the same units;
        // to do this we measure the width of the rectangle in
        // meters and compare it to the desired paper size
        const lowerLeft = [geomExtent[0], geomExtent[1]];
        const lowerRight = [geomExtent[2], geomExtent[1]];
        const geomWidthMeters = getDistance(lowerLeft, lowerRight);
        // paper size is in mm so we need to multiply by 1000!
        const scale = geomWidthMeters * 1000 / size[0];

        console.log(visibleLayers, size, center, scale)
            // let's print!
        print({
            layers: visibleLayers,
            dpi: 150,
            size: size,
            center: center,
            scale: scale,
            projection: 'EPSG:4326',
            scaleBar: true,
            northArrow: true
        }).then(imageBlob => {
            // initializes the PDF document
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true,
            });

            // create an Object URL from the map image blob
            // and add it to the PDF
            const imgUrl = URL.createObjectURL(imageBlob);
            doc.addImage(imgUrl, 'JPEG', 10, 30, size[0], size[1]);

            // add a title
            doc.setFont('times', 'bold');
            doc.setFontSize(20);
            doc.text('Plan Integral para la Gestion del Cambio Climatico', 148.5, 15, null, null, 'left');

            // download the result
            doc.save('Mapa.pdf');
        });
    }

});