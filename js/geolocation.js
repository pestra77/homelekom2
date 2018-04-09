var prettyNumber = function(value) {
  return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
}
window.onload = function () {
  var location = ymaps.geolocation;
  for (var i = 0; i < regions.length; i++) {
    if (regions[i].center == location.city) {
      $('.navigation__city_right').text(regions[i].center);
      $('#price').text(prettyNumber(regions[i].meterPrice));
      $('#total').text(prettyNumber(regions[i].meterPrice * 115));
    }
  }
  for (var i = 0; i < regions.length; i++) {
    if (regions[i].name == location.region) {
      $('.navigation__city_right').text(regions[i].center);
      $('#price').text(prettyNumber(regions[i].meterPrice));
      $('#total').text(prettyNumber(regions[i].meterPrice * 115));
    }
  }
  jQuery("#user-city").text(ymaps.geolocation.city);
}
