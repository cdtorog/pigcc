import 'ol/ol.css';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Feature } from 'ol/index';
import { Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';


const map = $('#map').data('map');
const view = $('#map').data('view');

//create geolocate form in tool div.
$('#locate').click(function() {
    $('#draggable-title').html('Coordenadas Decimales');
    $('#draggable-content').html(`<form>
    <div class="form-group row">
      <div class="col-sm-10">
        <input class="form-control" id="lat" placeholder="Latitud (Ej: 4.1111)">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-10">
        <input class="form-control" id="lon" placeholder="Longitud (Ej: -75.1111">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-10">
        <button type="submit" class="btn btn-primary" id="goto">Localizar</button>
      </div>
    </div>
  </form>`);

    $('#draggable').css('display', 'block')

    //creates the geometry of the found point
    $('#goto').click(function() {
        const lat = $('#lat').val();
        const lon = $('#lon').val();
        const point = new Point(fromLonLat([lon, lat], 'EPSG:4326'), );
        var layer = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: point
                    })
                ]
            })
        });

        //create geometry style
        layer.getSource().getFeatures()[0].setStyle(new Style({
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
        }));

        //add layer and ajust zoom to fit
        map.addLayer(layer);
        view.fit(point, { padding: [170, 50, 30, 150], maxZoom: 17 });

        //close tool and remove interactions
        $('#draggable-closer').click(function() {
            $('#draggable').css('display', 'none');
            $('#draggable-title').html('none');
            layer.getSource().clear(true);
            map.removeLayer(layer);
            map.getInteractions().pop();
        });
    });
});