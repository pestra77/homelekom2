var prettyNumber = function(value) {
  return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
}
window.onload = function () {
  for (var i = 0; i < regions.length; i++) {
    $('.city__dropdown').append('<li class="city__item" region="' + regions[i].id + '">'+ regions[i].center +'</li>');
  }
  $('.city__dropdown').append('<li class="city__item" region="' + 0 + '">Другой</li>')

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

  $(".city__item").click(function(event) {
    var val = $(this).text();
    var region = $(this).attr('region');
    $(".city__item").each(function(index, el) {
      $(this).removeClass("active");
    });
    $(this).addClass('active');
    $(".navigation__city_right").text(val);
    if (region == 0) {
      $('#price').text(0);
      $('#total').text(0);
      $('#anotherCityModal').modal('show');
      return;
    }
    for (var i = 0; i < regions.length; i++) {
      if (regions[i].id == region) {
        $('#price').text(prettyNumber(regions[i].meterPrice));
        $('#total').text(prettyNumber(regions[i].meterPrice * 115));
      }
    }
  });
}
