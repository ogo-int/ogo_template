// comments
$(function () {
  $(".b-password-input").livequery(function () {
    var $context = $(this);
    var $eye = $(".b-password-input__eye", $context);
    var $input = $("input", $context);

    function changeInputType () {
      var $link = $(this);

      if($input.attr("type") == "text") {
        $input.attr("type", "password");
        $link.removeClass("_open");
      } else {
        $input.attr("type", "text");
        $link.addClass("_open");
      }
    }

    $eye.on("click", changeInputType);
  });
});
