// Ссылки в футере
$(function () {
  $(".b-footer-links").livequery(function () {
    var $context = $(this);
    var $captions = $(".b-footer-links__caption", $context);
    var $holders = $(".b-footer-links__menu", $context);

    function expandLinks() {
      var $caption = $(this);
      $caption.toggleClass("b-footer-links__caption_open");

      $caption.next().toggleClass("b-footer-links__menu_open");
    }

    $captions.on("click", expandLinks);

    $context.adaptBlock({
      maxWidth: {
        670: "_mx670",
        450: "_mx450"
      }
    });
  });
});
