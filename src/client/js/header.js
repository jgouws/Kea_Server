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
    disableDefaultUI: true,
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

/**
 * Customisation for file upload input
 *
 */
window.onload = function() {

  var uploadimage = document.getElementById('imageupload');

  console.log(uploadimage);

  var label = uploadimage.nextElementSibling,
  labelVal = label.innerHTML;

  uploadimage.addEventListener('change', function(e) {
    var fileName = '';
    if (this.files && this.files.length > 1)
    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
    else
    fileName = e.target.value.split('\\').pop();

    if (fileName)
    label.querySelector('span').innerHTML = fileName;
    else
    label.innerHTML = labelVal;
  });

  // Firefox bug fix
  uploadimage.addEventListener('focus', function() { uploadimage.classList.add('has-focus'); });
  uploadimage.addEventListener('blur', function() { uploadimage.classList.remove('has-focus'); });

};
