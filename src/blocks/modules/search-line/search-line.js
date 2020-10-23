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
      if ($(this).val() != "") {
        $(this).closest(".b-search-line__field").addClass("_filled");
      } else {
        $(this).closest(".b-search-line__field").removeClass("_filled");

      }
    });
  });
});

$(function () {
  $(document).on("click", function (e) {
    var targ = $(e.target);
    var className = $(".b-search-line__field-drop");

    if (targ.is(".b-search-line__input")) {
      className.addClass("b-search-line__field-drop__active");
    } else if (targ.is(".b-search-line__ph-pre")) {
      className.addClass("b-search-line__field-drop__active");
    } else if (targ.is(".b-search-line__ph-main")) {
      className.addClass("b-search-line__field-drop__active");
    } else if (targ.is(".b-search-line__placeholder")) {
      className.addClass("b-search-line__field-drop__active");
    } else {
      className.removeClass("b-search-line__field-drop__active");
    }
  });
});