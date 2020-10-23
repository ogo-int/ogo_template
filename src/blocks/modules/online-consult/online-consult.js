// Окно консультанта
$(function () {
  $(".b-online-consult").livequery(function () {
    var $context = $(this);
    var $focusBtn = $(".js-focus", $context);
    var $uiItems = $(".b-online-consult__ui-items", $context);
  });
});
