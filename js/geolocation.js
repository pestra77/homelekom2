var regions = [
  {
    id: 1,
    name: 'Москва',
    center: 'Москва',
    priceStandart: 70000,
    pricePremium: 80000
  },
  {
    id: 2,
    name: 'Ленинградская область',
    center: 'Санкт-Петербург',
    priceStandart: 70000,
    pricePremium: 80000
  },
  {
    id: 3,
    name: 'Республика Татарстан',
    center: 'Казань',
    priceStandart: 67000,
    pricePremium: 77000
  },
  {
    id: 4,
    name: 'Кировская область',
    center: 'Киров',
    priceStandart: 43000,
    pricePremium: 53000
  },
  {
    id: 5,
    name: 'Нижегородская область',
    center: 'Нижний Новгород',
    priceStandart: 64000,
    pricePremium: 77000
  },
  {
    id: 6,
    name: 'Тюменская область',
    center: 'Тюмень',
    priceStandart: 59000,
    pricePremium: 71000
  },
];
var prettyNumber = function(value) {
  return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
}
var complectationType = function () {
  return $('input[name=complectation-type-radio]:checked').val();
};
window.onload = function () {
  for (var i = 0; i < regions.length; i++) {
    $('.city__dropdown').append('<li class="city__item" region="' + regions[i].id + '">'+ regions[i].center +'</li>');
  }
  $('.city__dropdown').append('<li class="city__item" region="' + 0 + '">Другой</li>')

  var location = ymaps.geolocation;
  var city;
  for (var i = 0; i < regions.length; i++) {
    if (regions[i].center == location.city) {
      city = regions[i].id;
      $('.navigation__city_right').text(regions[i].center);
      $(".navigation__city_right").attr('active_region', regions[i].id);
      $('#price').text(prettyNumber(regions[i][complectationType()]));
      $('#total').text(prettyNumber(regions[i][complectationType()] * 115));
      $('#modal-city-name-refine').text(regions[i].center);
      $('#modal-city-name-refine').attr('region_id', regions[i].id);
      $('#cityRefinement').modal('show' );
      break;
    } else {
      $('#modal-city-name-refine').text(regions[0].center);
      $('#modal-city-name-refine').attr('region_id', regions[0].id);
      $('#cityRefinement').modal('show' );
    }
  }
  // for (var i = 0; i < regions.length; i++) {
  //   if (regions[i].name == location.region) {
  //     $('.navigation__city_right').text(regions[i].center);
  //     $(".navigation__city_right").attr('active_region', regions[i].id);
  //     $('#price').text(prettyNumber(regions[i][complectationType()]));
  //     $('#total').text(prettyNumber(regions[i][complectationType()] * 115));
  //   }
  // }

  $('#confirmMyCity').on('click', function() {
    var val = $('#modal-city-name-refine').text();
    var region = $('#modal-city-name-refine').attr('region');

    $(".city__item").each(function(index, el) {
      $(this).removeClass("active");
    });
    $(this).addClass('active');
    $(".navigation__city_right").text(val);
    $(".navigation__city_right").attr('active_region', region);

    for (var i = 0; i < regions.length; i++) {
      if (regions[i].id == region) {
        $('#price').text(prettyNumber(regions[i][complectationType()]));
        $('#total').text(prettyNumber(regions[i][complectationType()] * 115));
      }
    }
    $('#cityRefinement').modal('hide' );
  });

  $('#chooseMyCity').on('click', function() {
    var buttonsContainer = $('.city-buttons-modal');
    buttonsContainer.html('')
    for (var i = 0; i < regions.length; i++) {
      buttonsContainer.append('<button class="button choose-modal-my-city" region="' + regions[i].id + '">'+ regions[i].center +'</button>')
    }
  });

  $(document).on('click', '.choose-modal-my-city', function() {
    var val = $(this).text();
    var region = $(this).attr('region');
    $(".city__item").each(function(index, el) {
      $(this).removeClass("active");
    });
    $(this).addClass('active');
    $(".navigation__city_right").text(val);
    $(".navigation__city_right").attr('active_region', region);
    if (region == 0) {
      $('#price').text(0);
      $('#total').text(0);
      $('#cityRefinement').modal('hide' );
      $('#anotherCityModal').modal('show');
    } else {
      for (var i = 0; i < regions.length; i++) {
        if (regions[i].id == region) {
          $('#price').text(prettyNumber(regions[i][complectationType()]));
          $('#total').text(prettyNumber(regions[i][complectationType()] * 115));
        }
      }
      $('#cityRefinement').modal('hide' );
    }
  });

  $(".city__item").click(function(event) {
    var val = $(this).text();
    var region = $(this).attr('region');
    $(".city__item").each(function(index, el) {
      $(this).removeClass("active");
    });
    $(this).addClass('active');
    $(".navigation__city_right").text(val);
    $(".navigation__city_right").attr('active_region', region);
    if (region == 0) {
      $('#price').text(0);
      $('#total').text(0);
      $('#anotherCityModal').modal('show');
      return;
    }
    for (var i = 0; i < regions.length; i++) {
      if (regions[i].id == region) {
        $('#price').text(prettyNumber(regions[i][complectationType()]));
        $('#total').text(prettyNumber(regions[i][complectationType()] * 115));
      }
    }
  });

  $('input[name=complectation-type-radio]').on('change', function() {
    for (var i = 0; i < regions.length; i++) {
      if (regions[i].id == $(".navigation__city_right").attr('active_region')) {
        $('#price').text(prettyNumber(regions[i][complectationType()]));
        $('#total').text(prettyNumber(regions[i][complectationType()] * 115));
      }
    }

    if ($('input[name=complectation-type-radio]').prop('checked')) {
      $('p#6').addClass('disabled');
      $('p#8').addClass('disabled');
    } else {
      $('p#6').removeClass('disabled');
      $('p#8').removeClass('disabled');
    }
  })
}
