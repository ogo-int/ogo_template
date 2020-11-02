// Слайдер сертификатов
$(function () {
  $(".b-cert-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-cert-slider__slider", $context);

    // $slider.slick({
    // 	slidesToShow: 1,
    // 	slidesToScroll: 1,
    // 	centerMode: true,
    // 	arrows: false,
    // 	autoplay: true,
    // 	autoplaySpeed: 0,
    // 	infinite: true,
    // 	centerMode: true,
    // 	speed: 4000,
    // 	centerPadding: '70px',
    // 	easing: 'linear'
    // });

    // $context.on('resize.block', function () {
    // 	$slider.slick('checkResponsive');
    // 	$slider.slick('setPosition');
    // });

    $slider.smoothDivScroll({
      mousewheelScrolling: "allDirections",
      manualContinuousScrolling: true,
      autoScrollingMode: "onStart",
      autoScrollingStep: 1,
      autoScrollingInterval: 20
    });
  });
});
