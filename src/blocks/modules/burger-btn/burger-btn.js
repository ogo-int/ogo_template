// Кнопка мобильного меню
$(function () {
  $(".b-burger-btn").livequery(function () {
    var $context = $(this);

    $context.on("click", function () {
      if($context.hasClass("_opened")) {
        $context.removeClass("_opened");
      } else {
        $context.addClass("_opened");
      }
    });
  });
});
