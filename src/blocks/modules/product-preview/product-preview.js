// Быстрый просмотр
$(function () {
  $(".b-product-preview").livequery(function() {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        1100: "_mx1100",
        850: "_mx850",
        600: "_mx600"
      }
    });
  });
});
