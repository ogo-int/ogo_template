// Инпут выбора города с автокомплитом
$(function () {
  $(".b-autocomplete-address").each(function () {
    var $context = $(this);
    var $input = $(".b-autocomplete-address__input", $context);
    var $codeInput = $(".b-autocomplete-address__code", $context);
    var $arrow = $(".b-autocomplete-address__arrow", $context);

    function getKladrData(request, response) {
      $.ajax({
        url: "/ajax/new/getCities.php",
        dataType: "json",
        type: "GET",
        data: {
          query: {
            term: request.term
          }
        },
        success: function (data) {
          var results = $.map(data.results, function (item) {
            return {
              city: item.city,
              parent: item.parent,
              value: item.id
            };
          });

          response(results);
        }
      });
    }

    $input.autocomplete({
      minLength: 0,
      appendTo: $context,
      source: getKladrData,
      select: function (event, ui) {
        if (ui.item != undefined) {
          $input.val(ui.item.city);
          preloader();
          $.post("/ajax/new/setCity.php", {
            city_id: ui.item.value
          }, function (data) {
            if (data.status == "success")
              window.location.reload();
          }, "json");
        }
        return false;
      },
      open: function (event, ui) {
        $input.addClass("_opened");
      },
      close: function (event, ui) {
        $input.removeClass("_opened");
      }
    });

    $input.autocomplete("instance")._renderMenu = function (ul, items) {
      var that = this;
      $.each(items, function (index, item) {
        that._renderItemData(ul, item);
      });
    };

    $input.autocomplete("instance")._renderItem = function (ul, item) {

      var itemTemplate =
        "<li class=\"b-autocomplete-address__item\">" +
        "<div class=\"b-autocomplete-address__item-wrap\">" +
        "<div class=\"b-autocomplete-address__item-title\">" + item.city + "</div>" +
        "<div class=\"b-autocomplete-address__item-area\">" + item.parent + "</div>" +
        "</div>" +
        "</li>";

      ul.addClass("b-autocomplete-address__items-list");
      return $(itemTemplate).appendTo(ul);
    };
  });

  $(".js-change_city").on("click", function () {
    var $context = $(this),
      city = $context.data("city");

    if (typeof city != "undefined" && parseInt(city) > 0) {
      preloader();
      $.post("/ajax/new/setCity.php", {
        city_id: city
      }, function (data) {
        if (data.status == "success")
          window.location.reload();
        else
          preloader();
      }, "json");
    }
  });
});