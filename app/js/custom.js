(function ($) {
  // Stick menu.
  $(window).load(function () {
    $('#navigation').sticky({topSpacing: 0});
  });

  // Initialize WOW animations.
  wow = new WOW({
    animateClass: 'animated',
    offset: 0
  });
  wow.init();

  // Page scrolling feature.
  $(function () {
    $('.navbar-nav li a').bind('click', function (event) {
      var $anchor = $(this);
      var nav = $($anchor.attr('href'));

      if (nav.length) {
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');

        event.preventDefault();
      }
    });
    $('a.totop, a#btn-scroll').bind('click', function (event) {
      var $anchor = $(this);

      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');

      event.preventDefault();
    });
  });

  // Testimonial slide.
  $('.testimonialslide').flexslider({
    animation: 'slide',
    slideshow: true,
    directionNav: false,
    controlNav: true
  });

  // OwlCarousel.
  $('#owl-portfolio').owlCarousel({
    items: 4,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [980, 2],
    itemsTablet: [768, 2],
    itemsTabletSmall: [550, 1],
    itemsMobile: [480, 1]
  });

  // Nivo Lightbox.
  $('.owl-carousel .item a').nivoLightbox({
    effect: 'fadeScale',
    theme: 'default',
    keyboardNav: true,
    clickOverlayToClose: true
  });

  // Counter.
  jQuery('.appear').appear();
  jQuery('.appear').on('appear', function (data) {
    var id = $(this).attr('id');

    jQuery('.nav li').removeClass('active');
    jQuery(".nav a[href='#]" + id + "']").parent().addClass('active');
  });

  var runOnce = true;

  jQuery('.stats').on('appear', function (data) {
    var counters = {};
    var i = 0;

    if (runOnce) {
      jQuery('.number').each(function () {
        counters[this.id] = $(this).html();
        i++;
      });
      jQuery.each(counters, function (i, val) {
        jQuery({countNum: 0}).animate({countNum: val}, {
          duration: 3000,
          easing: 'linear',
          step: function () {
            jQuery('#' + i).text(Math.floor(this.countNum));
          }
        });
      });
      runOnce = false;
    }
  });

  // Parallax.
  if ($('#parallax1').length || $('#parallax2').length) {
    $(window).stellar({
      responsive: true,
      scrollProperty: 'scroll',
      parallaxElements: false,
      horizontalScrolling: false,
      horizontalOffset: 0,
      verticalOffset: 0
    });
  }

  // Video background.
  $('.bg-player').mb_YTPlayer();

  // Morphtext.
  $('#js-rotating').Morphext({
    animation: 'fadeInDown',
    separator: ",",
    speed: 3000
  });

  // niceScroll.
  $('html').niceScroll({zindex: 999, cursorborder: '', cursorborderradius: '0px', cursorwidth: '10px', cursorcolor: '#555', cursoropacitymin: .5});
  function initNice() {
    if ($(window).innerWidth() <= 960) {
      $('html').niceScroll().remove();
    } else {
      $('html').niceScroll({zindex: 999, cursorborder: '', cursorborderradius: '2px', cursorcolor: '#555555', cursoropacitymin: .1});
    }
  }
  $(window).load(initNice);
  $(window).resize(initNice);

  // Contact form.
  $("#contact-form").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
      // Handle the invalid form.
      formError();
      submitMSG(false, "Please fill form properly.");
    } else {
      // Everything looks good.
      event.preventDefault();
      submitForm();
    }
  });

  function submitForm() {
    // Initialize variables with form content.
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    $.ajax({
      type: "POST",
      url: "php/form-process.php",
      data: "name=" + name + "&email=" + email + "&subject=" + subject + "&message=" + message,
      success: function (text) {
        if (text === "success") {
          formSuccess();
        } else {
          formError();
          submitMSG(false, text);
        }
      }
    });
  }

  function formSuccess() {
    $("#contact-form")[0].reset();
    submitMSG(true, "Message has been sent.")
  }

  function formError() {
    $("#contact-form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass();
    });
  }

  function submitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center tada animated text-success";
    } else {
      var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

  // Copyright.
  $('#copyright').html(new Date().getFullYear());

  // Google Maps.
  $('.gmaps-btn').click(function () {
    $('#map-btn1').toggleClass('btn-show', 'btn-hide', 1000);
    $('#map-btn1').toggleClass('btn-hide', 'btn-show', 1000);
    $('#map-btn2').toggleClass('btn-show', 'btn-hide', 1000);
    $('#map-btn2').toggleClass('btn-hide', 'btn-show', 1000);
    $('#map-btn2').toggleClass('close-maps', 'open-maps', 1000);
    $('#map-btn2').toggleClass('open-maps', 'close-maps', 1000);
    $('#maps').toggleClass('close-maps', 'open-maps', 1000);
    $('#maps').toggleClass('open-maps', 'close-maps', 1000);

    return false;
  });
})(jQuery);

// Initialize Google Maps.
function initMap() {
  // var uluru = [[lat: 51.0380026, lng: 17.3334617], [lat: 52.2432409, lng: 6.8519193]];
  var locations = [
      ['Financial office', 51.0380026, 17.3334617],
      ['Operational office', 52.3420478, 4.8457738]
    ];
  // var uluru2 = {lat: 52.2432409, lng: 6.8519193};
  var map = new google.maps.Map(document.getElementById('google-maps'), {
    zoom: 15,
    center: new google.maps.LatLng(52.3420478, 4.8457738)
  });
  for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
  }
}

$(window).load(function () {
  $('.loader').delay(300).fadeOut();
  $('#page-loader').delay(500).fadeOut('slow');
});
