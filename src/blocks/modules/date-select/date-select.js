// Выбор даты
$(function () {
  $(".b-date-select").each(function () {
    var $context = $(this);
    var $monthInput = $("[name=\"month\"]", $context);
    var $dropdownArrow = $(".b-date-select__dropdown", $context);

    $monthInput.autocomplete({
      appendTo: $context,
      minLength: 0,
      source: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ]
    });

    $dropdownArrow.on("click", function () {
      $monthInput.autocomplete("search", "");
    });

  });
});