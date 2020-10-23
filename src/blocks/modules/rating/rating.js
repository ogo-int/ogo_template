// Рейтинг отображаемый
$(function () {
  $(".b-rating").livequery(function () {
    var $context = $(this);
    var $items = $(".b-rating__item", $context);

    function changeState(val) {
      $items.removeClass("b-rating__item_active");
      $items.slice(0, val).addClass("b-rating__item_active");
    }

    $context.on("change-val.block", function (event, val) {
      changeState(val);
    });
  });
});
