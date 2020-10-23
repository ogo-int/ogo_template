// Чек-бокс
$(function () {
  $(".b-checkbox").livequery(function () {
    var $context = $(this);
    var $input = $("input[type=\"checkbox\"]", $context);

    function changeState () {
      if($input.prop("checked")) {
        $context.addClass("_checked");
      } else {
        $context.removeClass("_checked");
      }
    }

    changeState();
    $input.on("change", changeState);
  });
});
