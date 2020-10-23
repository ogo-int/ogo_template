// Список чекбоксов
$(function () {
  $(".b-checkbox-cols").livequery(function () {
    var $context = $(this);
    var $moreBtn = $(".b-checkbox-cols__btn", $context);
    var $moreContainer = $(".b-checkbox-cols__more-container", $context);

    function toggleMoreContainer() {
      $moreBtn.toggleClass("b-checkbox-cols__btn_opened");
      $moreContainer.toggleClass("b-checkbox-cols__more-container_opened");
      return false;
    }

    $moreBtn.on("click", toggleMoreContainer);
  });
});
