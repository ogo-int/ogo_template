// Преимущества в цифрах
$(function () {
  $(".b-nums-features").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        650: "_mx650",
        380: "_mx380"
      }
    });
  });
});
