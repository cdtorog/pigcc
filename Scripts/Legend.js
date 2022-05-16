/**
 * Create legend function to get map legend from wms service
 * the content it's show at draggable div
 */
function legend(overlays) {
    let no_layers = parseInt(overlays.getLayers().get('length'));
    var head = document.createElement("h4");
    var txt = document.createTextNode("");
    head.appendChild(txt);
    var element = document.getElementById("legend-content");
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
        var element = document.getElementById("legend-content");
        element.appendChild(head);
        var img = new Image();
        img.src = ar[i];
        var src = document.getElementById("legend-content");
        src.appendChild(img);
    }
}

const overlays = $('#map').data('layergroup')
const closer = $('#legend-closer');

$('#legend').click(function() {
    const legendDiv = $('#legendDrag');
    const legendDivTitle = $('#legend-title');
    legendDivTitle.html('Convenciones');
    legendDiv.css('display', 'block')
    legend(overlays);
})

closer.click(function() {
    $('#legendDrag').css('display', 'none')
});

// Make the DIV element draggable:
dragElement(document.getElementById("legendDrag"));

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}