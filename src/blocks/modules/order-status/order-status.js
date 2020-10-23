// Статус заказа
$(function () {
  $(".b-order-status").livequery(function () {
    var $context = $(this);
    var $submit = $(".b-order-status__submit", $context);
    var $main = $(".b-order-status__main", $context);
    var $result = $(".b-order-status__result", $context);

    $submit.on("click", function (e) {
      $main.removeClass("_active");
      $result.addClass("_active");
      e.preventDefault();
    });
  });
});
