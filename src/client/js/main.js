$(function() {
  console.log('sanity check!');

  function setAttribute() {
    //this.value = 'no';
    console.log('checkbox');
  }

  $('.date').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '-3d'
  });

});
