
function legend(overlays) {

  let no_layers = parseInt(overlays.getLayers().get('length'));
  var head = document.createElement("h4");
  var txt = document.createTextNode("Convenciones");
  head.appendChild(txt);
  var element = document.getElementById("legend");
  element.appendChild(head);
  var ar = [];
  var i;
  for (i = 0; i < no_layers; i++) {
    ar.push("http://189.50.208.110:8080/geoserver/pigcc/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + overlays.getLayers().item(i).get('name'));
  }
  for (i = 0; i < no_layers; i++) {
    var head = document.createElement("p");

    var txt = document.createTextNode(overlays.getLayers().item(i).get('title'));
    head.appendChild(txt);
    var element = document.getElementById("legend");
    element.appendChild(head);
    var img = new Image();
    img.src = ar[i];
    var src = document.getElementById("legend");
    src.appendChild(img);
  }
}
legend();