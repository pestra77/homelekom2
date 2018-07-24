$(function(){
  var prettyNumber = function(value) {
    return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
  }

  $('.complectation-pane').click(function(event) {
    if ($(this).hasClass('disabled')) return;
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

  $('.checkbox__input').change(function(event) {
    var val = $(this).val();
    var currentSum = $('#total').html()
    currentSum = currentSum.replace(/\s/g,'');
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

  // $('#send').click(function(event) {
  //
  // });

	$('.layout__scheme').on('click', function() {
		$('.imagepreview').attr('src', $(this).find('img').attr('src'));
		$('#imagemodal').modal('show');
	});

  $('.value__info_click').on('click', function() {
		$('#bankModal').modal('show');
	});

  $('.options-label').click(function(e) {
    var button = $(this);
    var input = $('#' + button.attr('for'));
    var desc = button.next().text();

    if (input.prop('checked')) {

    } else {
      var modal = $('#optionModal');
      modal.find('#optionModalTitle').text(input.prop('name'));
      modal.find('#optionModalPrice').text(prettyNumber(input.prop('value')));
      modal.find('#optionModalDesc').text(desc);
      modal.modal("show");
    }
  });

  $('.gallery__switcher').click(function(e) {
    $('.gallery__slider.gallery__slider_active').removeClass('gallery__slider_active');
    $('#gallery_' + $(this).attr('for')).addClass('gallery__slider_active');
    $('#gallery_' + $(this).attr('for')).slick({
      prevArrow: '<div class="arrow-left arrow"><i class="fas fa-caret-left"></i></div>',
      nextArrow: '<div class="arrow-right arrow"><i class="fas fa-caret-right"></i></div>',
      centerMode: false,
      centerPadding: '0px',
      slidesToShow: 5,
      infinite: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 576,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
      ]
    });
  });

  $('.pop').on('click', function() {
		$('.imagepreview').attr('src', $(this).find('img').attr('src'));
		$('#imageModal').modal('show');
	});

  $('#send').on('click', function() {
    var data = {
        name: $("#userName").val(),
        phone: $("#userPhone").val(),
        email: $("#userEmail").val(),
        city: $(".navigation__city_right").text()
    };
    console.log(data);
    if (data.name.trim() && data.phone.trim()) {
      $('#exampleModal').modal('hide');
      $.ajax({
          type: "POST",
          url: "http://homelekom.ru/mailer.php",
          data: data,
          success: function(){
            $('#confirmModal').modal('show');
          }
      });
    } else {
      $("#userName").addClass('error');
      $("#userPhone").addClass('error');
    }
  });

  $('#send-price').on('click', function() {
    var data = {
        name: $("#userNameP").val(),
        phone: $("#userPhoneP").val(),
        time: $("#userTime").val(),
        city: $(".navigation__city_right").text()
    };
    if (data.name.trim() && data.phone.trim()) {
      $('#valueModal').modal('hide');
      $.ajax({
          type: "POST",
          url: "http://homelekom.ru/mailer-price.php",
          data: data,
          success: function(){
            $('#confirmModal').modal('show');
          }
      });
    } else {
      $("#userNameP").addClass('error');
      $("#userPhoneP").addClass('error');
    }
  });

  $('#preview-1').on('click', function(ev) {
    $("#video-1")[0].src += "&autoplay=1";
    $('#preview-1').addClass('hidden');
    ev.preventDefault();
  });

  $('#preview-2').on('click', function(ev) {
    $("#video-2")[0].src += "&autoplay=1";
    $('#preview-2').addClass('hidden');
    ev.preventDefault();
  });

  $('#preview-3').on('click', function(ev) {
    $("#video-3")[0].src += "&autoplay=1";
    $('#preview-3').addClass('hidden');
    // $('#preview-3').hide();
    ev.preventDefault();
  });

});
