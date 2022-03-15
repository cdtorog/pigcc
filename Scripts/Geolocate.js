import 'ol/ol.css';
import { Circle, Fill, Style } from 'ol/style';
import { Feature, Map, Overlay, View } from 'ol/index';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';


const map = $('#map').data('map');
const view = $('#map').data('view');

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
    $('#goto').click(function() {
        const lat = $('#lat').val();
        const lon = $('#lon').val();
        console.log(lat, lon)
        const point = new Point(fromLonLat([lon, lat], 'EPSG:4326'));
        var layer = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: point
                    })
                ]
            })
        });
        map.addLayer(layer);
        view.fit(point, { padding: [170, 50, 30, 150], maxZoom: 17 });

        $('#draggable-closer').click(function() {
            $('#draggable').css('display', 'none');
            $('#draggable-title').html('none');
            layer.getSource().clear(true);
            map.removeLayer(layer);
            map.getInteractions().pop();
        });
    });



});