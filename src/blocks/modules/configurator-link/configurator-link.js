// Ссылка на конфигуратор
$(function () {
  $(".b-configurator-link").livequery(function () {
    var $context = $(this);

    $context.adaptBlock({
      maxWidth: {
        320: "_mx320"
      },
      minWidth: {

      }
    });
  });

  $(".b-configurator-link__btn").each(function (i, el) {
    var $el = $(el);
    var $parent = $el.closest(".b-configurator-link");

    $el.on("click", function (e) {
      e.preventDefault();
    });

    var clipboard = new Clipboard($el[0], {
      target: function () {
        return $parent.find(".b-configurator-link__text")[0];
      }
    });

    clipboard.on("success", function (e) {
      $parent.find(".b-configurator-link__report").remove();
      $parent.find(".b-configurator-link__inputs").after("<p class=\"b-configurator-link__report b-configurator-link__report_success\">Ссылка скопирована в буфер обмена!</p>");
      console.log("success");
    });

    clipboard.on("error", function (e) {
      $parent.find(".b-configurator-link__report").remove();
      $parent.find(".b-configurator-link__inputs").after("<p class=\"b-configurator-link__report b-configurator-link__report_error\">Во время копирования произошла ошибка!</p>");
      console.log("error");
    });
  });
});