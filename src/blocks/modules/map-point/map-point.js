// Точки получения заказа на отдельной карте
$(function () {
  $(".b-map-point").livequery(function () {
    var $context = $(this);
    var $points = $(".b-map-point__option", $context);
    var $map = $(".b-ymap", $context);
    var $mapHolder = $(".b-map-point__map-section", $context);
    var $select = $(".b-map-point__select select", $context);
    var $chooseHolder = $(".b-map-point__choose-holder", $context);
    var $chooseBtn = $(".b-map-point__choose-btn", $context);

    function setPlacemarks() {
      $points.each(function () {
        var $point = $(this);
        var $address = $(".b-map-point__address", $point);
        var $time = $(".b-map-point__time", $point);
        var $metro = $(".b-map-point__metro", $point);
        var metroList = [];

        $metro.each(function () {
          metroList.push($(this).html());
        });

        $map.trigger("setPlacemark.block", [{
          coords: $point.data("coords").split(","),
          address: $address.html(),
          hours: $time.html(),
          type: $address.html(),
          data: {
            metro: metroList,
            index: $points.index($point)
          },

          // Шаблонизация https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Template-docpage
          // Если будут использоваться внешние данные, то необходимо обойти использование |raw, иначе возможен XSS. Используется в основном для типографики.
          balloonTemplate:
              "<div class=\"b-ymap__balloon-inner _qiwi\">" +
                "<div class=\"b-ymap__balloon-header\">" +
                  "<div class=\"b-ymap__balloon__close\"></div>" +
                  "<div class=\"b-ymap__balloon-address\">{{properties.address|raw}}</div>" +
                "</div>" +
                "<div class=\"b-ymap__balloon-content\">" +
                  "{% if properties.metro.length != 0 %}" +
                  "<ul class=\"b-ymap__metro-items\">" +
                    "{% for metro in properties.metro %}" +
                      "<li class=\"b-ymap__metro-item\">{{metro|raw}}</li>"+
                    "{% endfor %}" +
                  "</ul>" +
                  "{% endif %}" +
                  "<div class=\"b-ymap__balloon-hours\">{{properties.hours|raw}}</div>" +
                  "<a href=\"#\" class=\"b-ymap__balloon-apply button\" data-index=\"{{properties.index}}\"\">Заберу отсюда</a>" +
                "</div>" +
              "</div>",

          markTemplate:
              "<div class=\"b-ymap__placemark _qiwi\">" +
                "<div class=\"b-ymap__placemark-round\"></div>" +
                "<div class=\"b-ymap__placemark-text\">" +
                  "{{ properties.iconContent }}" +
                "</div>" +
              "</div>",

          buildCallback: balloonBehavior
        }]);
      });

      $map.off("mapReady.block", setPlacemarks);
    }

    // Тут можно определить поведение балуна
    function balloonBehavior () {
      var template = this;
      var placemark = template.getParentElement();
      var $balloon = $(placemark).find(".b-ymap__balloon-inner");
      var $applyBtn = $(".b-ymap__balloon-apply", $balloon);

      $applyBtn.on("click", function (e) {
        var index = $(this).data("index");
        $select.get(0).selectedIndex = index;
        $select.change();
        setMode("save");
        template.onCloseClick(e);
      });
    }

    function changeBySelect(e) {
      var index = this.selectedIndex;
      var mapTarget = $points.eq(index).data("coords");
      $points.removeClass("_active");
      $points.eq(index).addClass("_active");
      $map.trigger("setCenter.block", [mapTarget.split(","), 14]);
    }

    function setMode(mode) {
      if(mode == "edit") {
        $chooseHolder.removeClass("_active");
        $mapHolder.addClass("_active");
      } else {
        $chooseHolder.addClass("_active");
        $mapHolder.removeClass("_active");
      }
    }

    $map.on("mapReady.block", setPlacemarks);

    $chooseBtn.on("click", function (e) {
      setMode("edit");
      e.preventDefault();
    });

    $select.on("change", changeBySelect);
  });
});

$(".b-shops-list__shop").on("click",function () {
  var w = screen.width;
  var mapContent = document.getElementsByClassName("b-map-contacts__cols");
  var mapContentHeight = parseInt(window.getComputedStyle(mapContent[0]).height);
  var scroll = mapContentHeight/2;  

  if(w > 768) {
    window.scrollTo(0,scroll);
  } else {
    mapContent[0].scrollIntoView(top);
  }
});
