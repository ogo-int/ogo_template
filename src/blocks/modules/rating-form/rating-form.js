// Выбор рейтинга
$(function () {
  $(".b-rating-form").livequery(function () {
    var $context = $(this);
    var $items = $(".b-rating-form__item", $context);
    var $input = $(".b-rating-form__input input", $context);

    function changeValueByClick () {
      var $currItem = $(this);
      var index = $items.index($currItem);
      var value = 5 - index;

      $input.val(value);

      $items.removeClass("b-rating-form__item_active");
      $currItem.find("~ .b-rating-form__item").addClass("b-rating-form__item_active");
      $currItem.addClass("b-rating-form__item_active");
    }

    function changeValueByInput () {
      var value = parseFloat($input.val());
      changeValueByClick.apply($items.eq(5 - value));
    }

    changeValueByInput();

    $items.on("click", changeValueByClick);
    $input.on("change.block", changeValueByInput);
  });
});
