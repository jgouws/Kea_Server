window.initMap = function() {
  var heatmapData = [
    new google.maps.LatLng(-41.270740, 174.719501),
    new google.maps.LatLng(-41.27, 174.71),
    new google.maps.LatLng(-41.28, 174.72),
    new google.maps.LatLng(-41.29, 174.73),
    new google.maps.LatLng(-41.31, 174.74)
  ];
  var wellington = new google.maps.LatLng(-41.2865,174.7762);
  map = new google.maps.Map(document.getElementById('map'), {
    center: wellington,
    zoom: 5,
    mapTypeId: 'satellite'
  });
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    radius: 7
  });
  heatmap.setMap(map);
  heatmap.dissipating = false;
};
