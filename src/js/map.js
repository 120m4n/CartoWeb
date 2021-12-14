const attribution = new ol.control.Attribution({
    collapsible: false,
});

const controlesMapaBase = [
    new ol.control.Zoom({  
      delta: 0.5  
    })  
  ];

const mapaBase = new ol.layer.Tile({ 
    source: new ol.source.OSM() 
    })

const vistaMapaBase = new ol.View({ 
    projection: 'EPSG:3857',
    center: [0,0],
    zoom: 1 
  });

const map = new ol.Map({
    target: 'map',
    layers: [mapaBase],
    view : vistaMapaBase,
    controls: controlesMapaBase
    /**
    controls: ol.control.defaults({
        attribution: false
    }).extend([attribution])
     */
});

var sidebar = new ol.control.Sidebar({
    element: 'sidebar',
    position: 'left'
});

map.addControl(sidebar);
    
// Button Control
// Add a custom push button with onToggle function
var hello = new ol.control.Button({
    html: '<i class="fa fa-smile-o"></i>',
    className: "hello",
    title: "Hello world!",
    handleClick: function () {
        info("hello World!");
    }
});
map.addControl(hello);

// Show info
function info(i) {
    console.log(i);
}