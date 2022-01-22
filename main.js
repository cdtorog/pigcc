// Define a view
var view = new ol.View({
    projection: 'EPSG:4326',
    center: [-75.66612430009317, 4.418912598262188], //Coordinates of center
    zoom: 10 //zoom level of map
})


//Define layers to layerswitcher
var layergroup = new ol.layer.Group({
    'title': 'Capas',
    layers: [
        new ol.layer.Tile({
            title: 'Departamento',
            opacity: 0.25,
            name: 'departamento',
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:departamento' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Municipios',
            name: 'municipios',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:municipios' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Microcuencas',
            name: 'microcuencas',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:microcuencas' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Zonas Protegidas',
            name: 'zonas_protegidas',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:zonas_protegidas' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Cobertura',
            name: 'cobertura',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:cobertura' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),

        new ol.layer.Tile({
            title: 'Amenaza Inundacion',
            name: 'amenaza_inundacion',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:amenaza_inundacion' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Amenaza Remocion en masa',
            name: 'amenaza_remocion',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:amenaza_remocion' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Amenaza Torrencial',
            name: 'amenaza_torrencial',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:amenaza_torrencial' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Amenaza Vendaval',
            name: 'amenaza_vendaval',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:amenaza_vendaval' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Vulnerabilidad Cambio Temperatura',
            name: 'vulnerabilidad_temperatura',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:vulnerabilidad_temperatura' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Vulnerabilidad Cambio Precipitacion',
            name: 'vulnerabilidad_precipitacion',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:vulnerabilidad_precipitacion' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Veredas',
            name: 'veredas',
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:veredas' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Predios',
            name: 'predios',
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:predios' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Rios',
            name: 'rios',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:rios' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Vias',
            name: 'vias',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:vias' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            title: 'Altimetria',
            name: 'altimetria',
            visible: false,
            source: new ol.source.TileWMS({
                url: 'http://189.50.208.110:8080/geoserver/pigcc/wms',
                params: { 'LAYERS': 'pigcc:altimetria' },
                ratio: 1,
                serverType: 'geoserver'
            })
        })
    ]
});

var base_maps = new ol.layer.Group({
    'title': 'Mapas Base',
    layers: [
        new ol.layer.Tile({
            title: 'Open Street Map',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        }), new ol.layer.Tile({
            title: 'Open Topographic Map',
            type: 'base',
            visible: false,
            source: new ol.source.XYZ({
                url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
            })
        }),
        new ol.layer.Tile({
            title: 'Carto',
            type: 'base',
            visible: false,
            source: new ol.source.XYZ({
                url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',

            })
        })
    ]
});

//Define LayerSwitcher Element
var layerSwitcher = new ol.control.LayerSwitcher({});


// Define our map   
var map = new ol.Map({
    target: 'map',
    view: view
})

//Define mouse position element
var mouse_position = new ol.control.MousePosition();

var full_sc = new ol.control.FullScreen({ label: 'F' });
map.addControl(full_sc);

var zoom = new ol.control.Zoom();
map.addControl(zoom);

var slider = new ol.control.ZoomSlider();
map.addControl(slider);

//Deine zoom to extend element
var zoom_ex = new ol.control.ZoomToExtent({
    extent: [-76.20994754228067, 3.972593018184063, -75.12230105790567, 4.865232178340313]
});


map.addControl(zoom_ex);
map.addControl(mouse_position);
map.addControl(layerSwitcher);
map.addLayer(base_maps);
map.addLayer(layergroup);
legend(layergroup);
layerSwitcher.showPanel();