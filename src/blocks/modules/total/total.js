// Стоимость набора конфигуратора
$(function () {
  $(".b-total").livequery(function() {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        540: "_mx540",
        440: "_mx440",
        375: "_mx375"
      },
      minWidth: {
        460: "_mn460"
      }
    });
  });
});
