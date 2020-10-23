// Точка самовывоза
$(function () {
  $(".b-pickpoint").livequery(function () {
    var $context = $(this);
    var $input = $(".b-pickpoint__radio-input", $context);

    function checkState(event, isOther) {
      if($input.prop("checked")) {
        $context.addClass("_checked");
      } else {
        $context.removeClass("_checked");
      }
      if(!isOther) $("[name=\""+ $input.attr("name") +"\"]").not($input).trigger("change", true);
    }

    checkState();
    $input.on("change", checkState);

    $context.adaptBlock({
      maxWidth: {
        530: "_mx530"
      }
    });
  });
});
