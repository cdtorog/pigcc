import 'ol/ol.css';
import { Map, View } from 'ol/';
import TileWMS from 'ol/source/TileWMS';
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import * as Control from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

var view = new View({
    projection: 'EPSG:4326',
    center: [-75.66612430009317, 4.418912598262188], //Coordinates of center
    zoom: 10 //zoom level of map

})

/**
 * Create layersgroup from wms service, this layers will be show at layerswitcher elemet
 */
var layergroup = new LayerGroup({
    'title': 'Capas',
    layers: [
        new TileLayer({
            title: 'Departamento',
            opacity: 0.25,
            name: 'departamento',
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:departamento' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Municipios',
            name: 'municipios',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:municipios' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Microcuencas',
            name: 'microcuencas',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:microcuencas' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Zonas Protegidas',
            name: 'zonas_protegidas',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:zonas_protegidas' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Cobertura',
            name: 'cobertura',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:cobertura' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),

        new TileLayer({
            title: 'Amenaza Inundacion',
            name: 'amenaza_inundacion',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:amenaza_inundacion' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Amenaza Remocion en masa',
            name: 'amenaza_remocion',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:amenaza_remocion' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Amenaza Torrencial',
            name: 'amenaza_torrencial',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:amenaza_torrencial' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Amenaza Vendaval',
            name: 'amenaza_vendaval',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:amenaza_vendaval' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Vulnerabilidad Cambio Temperatura',
            name: 'vulnerabilidad_temperatura',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:vulnerabilidad_temperatura' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Vulnerabilidad Cambio Precipitacion',
            name: 'vulnerabilidad_precipitacion',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:vulnerabilidad_precipitacion' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Veredas',
            name: 'veredas',
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:veredas' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Predios',
            name: 'predios',
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:predios' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Rios',
            name: 'rios',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:rios' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Vias',
            name: 'vias',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:vias' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new TileLayer({
            title: 'Altimetria',
            name: 'altimetria',
            visible: false,
            source: new TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:altimetria' },
                ratio: 1,
                serverType: 'geoserver'
            })
        })
    ]
});

/**
 * add basemap to layerswitcher elemets
 */
var base_maps = new LayerGroup({
    'title': 'Mapas Base',
    layers: [
        new TileLayer({
            title: 'Open Street Map',
            type: 'base',
            visible: true,
            source: new OSM()
        }), new TileLayer({
            title: 'Open Topographic Map',
            type: 'base',
            visible: false,
            source: new XYZ({
                url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
            })
        }),
        new TileLayer({
            title: 'Carto',
            type: 'base',
            visible: false,
            source: new XYZ({
                url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',

            })
        })
    ]
});

//Define LayerSwitcher Element
var layerSwitcher = new LayerSwitcher({});

//Define mouse position element
var mouse_position = new Control.MousePosition({
    coordinateFormat: createStringXY(5)
});

//Define Full Screen Function
var full_sc = new Control.FullScreen({ label: 'F' });


//Define Zoom Control
var zoom = new Control.Zoom();

const scaleLine = new ScaleLine({ bar: true, text: true, minWidth: 125 });



//Define Zoom Slider Control
var slider = new Control.ZoomSlider();


//Deine zoom to extend element
var zoom_ex = new Control.ZoomToExtent({
    extent: [-76.20994754228067, 3.972593018184063, -75.12230105790567, 4.865232178340313]
});

// Define our map  
const map = new Map({
    controls: defaultControls({
        attributionOptions: { collapsible: false },
    }),
    target: "map",
    view: view
})

//add controls to webmapy
map.addControl(slider);
map.addControl(zoom);
map.addControl(full_sc);
map.addControl(zoom_ex);
map.addControl(mouse_position);
map.addControl(layerSwitcher);
map.addLayer(base_maps);
map.addLayer(layergroup);
map.addControl(scaleLine);
//layerSwitcher.showPanel();

$('#map').data('map', map);
$('#map').data('view', view)
$('#map').data('layergroup', layergroup)
$('#map').data('basemaps', base_maps)