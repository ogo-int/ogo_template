// Список чекбоксов
$(function () {
  $(".b-radio-cols").livequery(function () {
    var $context = $(this);
    var $moreBtn = $(".b-radio-cols__btn", $context);
    var $moreContainer = $(".b-radio-cols__more-container", $context);

    function toggleMoreContainer() {
      $moreBtn.toggleClass("b-radio-cols__btn_opened");
      $moreContainer.toggleClass("b-radio-cols__more-container_opened");
      return false;
    }

    $moreBtn.on("click", toggleMoreContainer);
  });
});
