
/**
 * Add Drawing
 *
 * Adds drawing controls to the map
 **/
function add_drawing(map_id){

  window[map_id + 'googleDrawingOverlays'] = [];

  var drawingManager = new google.maps.drawing.DrawingManager({

    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,

    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    }
  });

  window[map_id + 'googleDrawingManager'] = drawingManager;
  drawingManager.setMap(window[map_id + 'map']);

  var drawingInfo;

  marker_complete(map_id, drawingManager, drawingInfo);
  circle_complete(map_id, drawingManager, drawingInfo);
  rectangle_complete(map_id, drawingManager, drawingInfo);
  polyline_complete(map_id, drawingManager, drawingInfo);
  polygon_complete(map_id, drawingManager, drawingInfo);
}

function clear_drawing(map_id){

  for(var i = 0; i < window[map_id + 'googleDrawingOverlays'].length; i++){
    window[map_id + 'googleDrawingOverlays'][i].setMap(null);
  }
  window[map_id + 'googleDrawingOverlays'] = [];
}

function marker_complete(map_id, drawingManager, drawingInfo){

  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
    window[map_id + 'googleDrawingOverlays'].push(marker);

    var eventInfo = $.extend(
      {
        place: marker.getPlace(),
        position: marker.getPosition(),
        shape: marker.getShape(),
        title: marker.getTitle(),
        randomValue: Math.random()
      },
      drawingInfo
    );
  Shiny.onInputChange(map_id + "_markercomplete", JSON.stringify(eventInfo));
  });

}


function circle_complete(map_id, drawingManager, drawingInfo){

  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
    window[map_id + 'googleDrawingOverlays'].push(circle);

    var eventInfo = $.extend(
      {
        center: circle.getCenter(),
        radius: circle.getRadius(),
        bounds: circle.getBounds(),
        randomValue: Math.random()
      },
      drawingInfo
    );
  Shiny.onInputChange(map_id + "_circlecomplete", JSON.stringify(eventInfo));
  });
}


function rectangle_complete(map_id, drawingManager, drawingInfo){

  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
    window[map_id + 'googleDrawingOverlays'].push(rectangle);

    var eventInfo = $.extend(
      {
        bounds: rectangle.getBounds(),
        randomValue: Math.random()
      },
      drawingInfo
    );
  Shiny.onInputChange(map_id + "_rectanglecomplete", JSON.stringify(eventInfo));
  });
}


function polyline_complete(map_id, drawingManager, drawingInfo){

  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(drawingManager, 'polylinecomplete', function(polyline) {
    window[map_id + 'googleDrawingOverlays'].push(polyline);

    var eventInfo = $.extend(
      {
        path: google.maps.geometry.encoding.encodePath(polyline.getPath()),
        randomValue: Math.random()
      },
      drawingInfo
    );
  Shiny.onInputChange(map_id + "_polylinecomplete", JSON.stringify(eventInfo));
  });
}


function polygon_complete(map_id, drawingManager, drawingInfo){

  if(!HTMLWidgets.shinyMode) return;

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    window[map_id + 'googleDrawingOverlays'].push(polygon);

    var eventInfo = $.extend(
      {
        path: google.maps.geometry.encoding.encodePath(polygon.getPath()),
        randomValue: Math.random()
      },
      drawingInfo
    );
  Shiny.onInputChange(map_id + "_polygoncomplete", JSON.stringify(eventInfo));
  });
}


//function marker_click(map_id, markerObject, marker_id, markerInfo){
//  if(!HTMLWidgets.shinyMode) return;
//
//  google.maps.event.addListener(markerObject, 'click', function(event){
//
//    var eventInfo = $.extend(
//      {
//        id: marker_id,
//        lat: event.latLng.lat().toFixed(4),
//        lon: event.latLng.lng().toFixed(4),
//        randomValue: Math.random()
//      },
//      markerInfo
//    );
//
//    Shiny.onInputChange(map_id + "_marker_click", eventInfo);
//  });
//}


function remove_drawing(map_id){
  // TODO:
  // clear all drawn objects
  window[map_id + 'googleDrawingManager'].setMap(null);
}
