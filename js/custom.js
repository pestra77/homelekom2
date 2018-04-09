$(function(){
  $('.complectation-pane').click(function(event) {
    var indexOfActive = $(this).attr('id');
    $('.complectation-pane').each(function(index, el) {
      $(this).removeClass('complectation__list_active');
    });
    $('.complectation__tab').each(function(index, el) {
      $(this).removeClass('complectation__info_active')
    });
    $(this).addClass('complectation__list_active');
    $('.complectation__tab').eq(indexOfActive).addClass('complectation__info_active');
  });

  // $('.option__title').click(function(event) {
  //   $('.option__list').toggleClass('option__list_active');
  // });

  $(".menu__link").click(function (e) {
    e.preventDefault();
    var elementClick = $(this).attr("href");
    var destination = $('#' + elementClick).offset().top;
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      $('body').animate({ scrollTop: destination }, 1100);
    } else {
      $('html').animate({ scrollTop: destination }, 800);
    }
    return false;
  });

  $(".navigation__city").click(function(event) {
    $('.city__dropdown').toggleClass('city__dropdown_active');
  });

  $(".city__item").click(function(event) {
    var val = $(this).text();
    $(".city__item").each(function(index, el) {
      $(this).removeClass("active");
    });
    $(this).addClass('active');
    $(".navigation__city_right").text(val);
  });

  $('.checkbox__input').change(function(event) {
    var val = $(this).val();
    var currentSum = $('#total').html()
    currentSum = currentSum.replace(/\s/g,'');
    console.log(currentSum)
    currentSum = +currentSum;
    val = +val;
    if ($(this).prop('checked')) {
      var sum = currentSum + val;
      var byS = Math.ceil(sum / 115);
      $('#total').html(String(sum).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
      // $('#price').html(String(byS).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
    } else {
      var min = currentSum - val;
      var byM = Math.ceil(min / 115);
      $('#total').html(String(min).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
      // $('#price').html(String(byM).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
    }
    // console.log()
  });

  $(".navigation__mobile").click(function() {
  	$(this).toggleClass("active");
    $(".navigation__menu").toggleClass('active');
  });

  $('.navigation__menu').click(function(event) {
    $('.navigation__mobile').toggleClass("active");
    $(".navigation__menu").toggleClass('active');
  });

  if (document.width <= 768) {
    $(".navigation__menu").prependTo('.wrapper');
  }

  $('#send').click(function(event) {
    $('#confirmModal').modal('show')
  });
});
