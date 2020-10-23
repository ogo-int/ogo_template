// Информация о наличии товара
$(function () {
  $(".b-stock-info").livequery(function () {
    var $context = $(this);
    var $titles = $(".b-stock-info__title", $context);
    var $containers = $(".b-stock-info__container", $context);

    function toggleContainer () {
      var $this = $(this);
      var $container = $this.siblings(".b-stock-info__container");

      $titles.not($this).removeClass("_open");
      $containers.not($container).slideUp(400);
      $this.toggleClass("_open");
      $container.slideToggle(400);
    }

    $(".b-stock-info__container:not(._open)", $context).slideUp(0);

    $titles.on("click", toggleContainer);

    $context.adaptBlock({
      maxWidth: {
        470: "_mx470"
      }
    });
  });
});
