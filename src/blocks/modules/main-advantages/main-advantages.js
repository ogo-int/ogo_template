// Ключевые преимущества
$(function () {
  $(".b-main-advantages").livequery(function() {
    var $context = $(this);
    var $itemsHolder = $(".b-main-advantages__items", $context);

    $context.adaptBlock({
      maxWidth: {
        1000: "_mx1000",
        480: "_mx480"
      }
    });
  });
});
