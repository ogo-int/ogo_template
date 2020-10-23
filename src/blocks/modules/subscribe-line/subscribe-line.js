// Строка поиска
$(function () {
  $(".b-search-line").livequery(function () {
    var $context = $(this);
    var $placeholder = $(".b-search-line__placeholder", $context);
    var $field = $(".b-search-line__field", $context);
    var $input = $("input[type=\"text\"]", $context);

    $placeholder.on("click", function () {
      $(this)
        .closest(".b-search-line__field")
        .find("input[type=\"text\"]")
        .focus();
    });

    $input.blur(function () {
      if($(this).val() != "") {
        $(this).closest(".b-search-line__field").addClass("_filled");
      } else {
        $(this).closest(".b-search-line__field").removeClass("_filled");

      }
    });
  });
});
