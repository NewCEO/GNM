jQuery(function ($) {
  'use strict'
  $('#status').fadeOut()
  $('#preloader')
    .delay(200)
    .fadeOut('slow')
  $(window).scroll(function () {
    if ($('.navbar').offset().top > 50) {
      $('.navbar-fixed-top').addClass('sticky')
    } else {
      $('.navbar-fixed-top').removeClass('sticky')
    }
  })
  $(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
      $(this).collapse('hide')
    }
  })
  $('a.page-scroll').on('click', function (event) {
    var $anchor = $(this)
    $('html, body')
      .stop()
      .animate(
        { scrollTop: $($anchor.attr('href')).offset().top },
        1500,
        'easeInOutExpo'
      )
    event.preventDefault()
  })
  $('.tt-fullHeight').height($(window).height())
  $(window).resize(function () {
    $('.tt-fullHeight').height($(window).height())
  })
  if ($('#slides').length > 0) {
    $('#slides').superslides({ play: 7000, animation: 'fade' })
  }
  if ($('.rotate').length > 0) {
    $('.rotate').textrotator({
      animation: 'dissolve',
      separator: '|',
      speed: 3000
    })
  }
  $('.fact-section').on('inview', function (
    event,
    visible,
    visiblePartX,
    visiblePartY
  ) {
    if (visible) {
      $(this)
        .find('.timer')
        .each(function () {
          var $this = $(this)
          $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
              duration: 2000,
              easing: 'swing',
              step: function () {
                $this.text(Math.ceil(this.Counter))
              }
            }
          )
        })
      $(this).off('inview')
    }
  })
  $('.social-counter').on('inview', function (
    event,
    visible,
    visiblePartX,
    visiblePartY
  ) {
    if (visible) {
      $(this)
        .find('.timer')
        .each(function () {
          var $this = $(this)
          $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
              duration: 2000,
              easing: 'swing',
              step: function () {
                $this.text(Math.ceil(this.Counter))
              }
            }
          )
        })
      $(this).off('inview')
    }
  })
  $('.tab-content').on('inview', function (
    event,
    visible,
    visiblePartX,
    visiblePartY
  ) {
    if (visible) {
      $.each($('div.progress-bar'), function () {
        $(this).css('width', $(this).attr('aria-valuenow') + '%')
      })
      $(this).off('inview')
    }
  })
  if ($('#abilitiesTab').length > 0) {
    $('#abilitiesTab').tabCollapse()
  }
  ;(function () {
    var configList = {
      profile: { screenName: 'GNMovement_' },
      domId: 'GNMovement_TwitterFeed',
      maxTweets: 5,
      enableLinks: true,
      showUser: false,
      showTime: true,
      showInteraction: false,
      lang: 'en',
      customCallback: handleTweets
    }
    twitterFetcher.fetch(configList)
    function handleTweets (tweets) {
      var x = tweets.length
      var n = 0
      var html = ''
      while (n < x) {
        html += '<div class="item">' + tweets[n] + '</div>'
        n++
      }
      $('.twitter-widget').html(html)
      $('.twitter_retweet_icon').html('<i class="fa fa-retweet"></i>')
      $('.twitter_reply_icon').html('<i class="fa fa-reply"></i>')
      $('.twitter_fav_icon').html('<i class="fa fa-star"></i>')
      $('.twitter-widget').owlCarousel({ items: 1, loop: true, autoplay: true })
    }
  })()
  $('.image-link').magnificPopup({
    gallery: { enabled: true },
    removalDelay: 300,
    mainClass: 'mfp-with-zoom',
    type: 'image'
  })
  if ($('.team-carousel').length > 0) {
    $('.team-carousel').owlCarousel({
      loop: true,
      margin: 30,
      responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 4 } }
    })
  }
  if ($('.client-carousel').length > 0) {
    $('.client-carousel').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 30,
      dots: false,
      responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 6 } }
    })
  }
  if ($('.countdown').length > 0) {
    var ttCountdown = $(this).find('.countdown')
    var ttDate = ttCountdown.attr('data-date')
    ttCountdown.countdown({ date: ttDate, format: 'on' })
  }
  ;(function () {
    function getIEVersion () {
      var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/)
      return match ? parseInt(match[1], 10) : false
    }
    if (getIEVersion()) {
      $('html').addClass('ie' + getIEVersion())
    }
  })()
  ;(function () {
    $('.mailchimp').ajaxChimp({
      callback: mailchimpCallback,
      url:
        'http://trendytheme.us9.list-manage.com/subscribe/post?u=85ba3666ffb519396fbe64dc5&amp;id=c335e5ec53'
    })
    function mailchimpCallback (resp) {
      if (resp.result === 'success') {
        $('.subscription-success')
          .html('<i class="fa fa-check"></i>' + resp.msg)
          .fadeIn(1000)
        $('.subscription-error').fadeOut(500)
      } else if (resp.result === 'error') {
        $('.subscription-error')
          .html('<i class="fa fa-times"></i>' + resp.msg)
          .fadeIn(1000)
      }
    }
  })()
  ;(function () {
    $('body').append('<div id="toTop"><i class="fa fa-angle-up"></i></div>')
    $(window).scroll(function () {
      if ($(this).scrollTop() !== 0) {
        $('#toTop').fadeIn()
      } else {
        $('#toTop').fadeOut()
      }
    })
    $('#toTop').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 600)
      return false
    })
  })()
  if ($('#contactForm').length > 0) {
    $('#contactForm').on('submit', function (e) {
      e.preventDefault()
      var $action = $(this).prop('action')
      var $data = $(this).serialize()
      var $this = $(this)
      $this.prevAll('.alert').remove()
      $.post(
        $action,
        $data,
        function (data) {
          if (data.response == 'error') {
            $this.before(
              '<div class="alert alert-danger">' + data.message + '</div>'
            )
          }
          if (data.response == 'success') {
            $this.before(
              '<div class="alert alert-success">' + data.message + '</div>'
            )
            $this.find('input, textarea').val('')
          }
        },
        'json'
      )
    })
  }
  ;(function () {
    var $latitude = 9.066474831017983,
      $longitude = 7.493844843802836,
      $map_zoom = 16
    var $marker_url = 'assets/images/map-marker.png'
    var style = [
      {
        stylers: [
          { hue: '#000' },
          { saturation: -100 },
          { gamma: 2.15 },
          { lightness: 12 }
        ]
      }
    ]
    var map_options = {
      center: new google.maps.LatLng($latitude, $longitude),
      zoom: $map_zoom,
      panControl: true,
      zoomControl: true,
      mapTypeControl: true,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: style
    }
    var map = new google.maps.Map(document.getElementById('myMap'), map_options)
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng($latitude, $longitude),
      map: map,
      visible: true,
      icon: $marker_url
    })
    var contentString =
      '<div id="mapcontent">' +
      '<p>B04 Office, Statement Hotel Complex Beside Federal High Court.</p></div>'
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 320,
      content: contentString
    })
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker)
    })
  })()
})
$(window).load(function () {
  'use strict'
  ;(function () {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
    } else {
      $(window).stellar({ horizontalScrolling: false, responsive: true })
    }
  })()
  if ($('#gridWrapper').length > 0) {
    var $grid = $('#gridWrapper')
    $grid.shuffle({ itemSelector: '.portfolio-wrapper' })
    $('#filter a').on('click', function (e) {
      e.preventDefault()
      $('#filter a').removeClass('active')
      $(this).addClass('active')
      var groupName = $(this).attr('data-group')
      $grid.shuffle('shuffle', groupName)
    })
  }
})
