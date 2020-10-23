// Алфавитный список брендов
$(function () {
  $(".b-alphabetic-cols").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        790: "_mx790",
        560: "_mx560",
        480: "_mx480",
        320: "_mx320"
      }
    });
  });
});
