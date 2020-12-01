$(function () {
  $('.b-ymap').livequery(function () {
    var $context = $(this);
    var $mapHolder = $('.b-ymap__map', $context);
    var $marks = $('.b-ymap__point', $context);
    var map;
    window.shopPlacemarksList = [];
    var placemarks = window.shopPlacemarksList;

    // Шаблонизация https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Template-docpage
    // Если будут использоваться внешние данные, то необходимо обойти использование |raw, иначе возможен XSS. Нужен в основном для типографики.
    var defaultBalloonTemplate =
      "<div class=\"b-ymap__balloon-inner\">" +
        "<div class=\"b-ymap__balloon-header\">" +
          "<div class=\"b-ymap__balloon__close\"></div>" +
          "<div class=\"b-ymap__balloon-type\">{{properties.type|raw}}</div>" +
          "<div class=\"b-ymap__balloon-address\">{{properties.address|raw}}</div>" +
          "<div class=\"b-ymap__balloon-metro\">{{properties.metro|raw}}</div>" +
        "</div>" +
        "<div class=\"b-ymap__balloon-content\">" +
          "<div class=\"b-ymap__balloon-phone\">{{properties.phone|raw}}</div>" +
          "<div class=\"b-ymap__balloon-hours\">{{properties.hours|raw}}</div>" +
          "{% if !properties.details %}" +
            "<a href=\"{{properties.link|raw}}\" class=\"b-ymap__balloon-details button js-shop-info\">Подробнее</a>" +
          "{% endif %}" +
        "</div>" +
      "</div>";

    var defaultLayoutTemplate =
      '<div class="b-ymap__balloon-outer">' +
        '<div class="b-ymap__balloon-outer-holder">' +
        '$[[options.contentLayout]]' +
        '</div>' +
      '</div>';

    var defaultMarkTemplate =
      '<div class="b-ymap__placemark">' +
        '<div class="b-ymap__placemark-round"></div>' +
        '<div class="b-ymap__placemark-text">' +
        '{{ properties.iconContent }}' +
        '</div>' +
      '</div>';

    // Основные функции
    function createMap() {
      map = new ymaps.Map($mapHolder.get(0), {
        center: $mapHolder.data('center').split(','),
        zoom: 10,
        controls: ['default']
      });

      map.behaviors.enable('scrollZoom');
    }

    function setPlacemark(mark) {
      var placemark, hint;

      if (mark.type == 'Гипермаркет ОГО!') {
        hint = 'Гипермаркет ОГО!';
      } else {
        hint = 'Точка выдачи ОГО!';
      }

      placemark = new ymaps.Placemark(
        [parseFloat(mark.coords[0]), parseFloat(mark.coords[1])],
        $.extend({
          type: mark.type,
          metro: mark.metro,
          hintContent: hint,
          address: mark.address,
          phone: mark.phone,
          hours: mark.hours,
          link: mark.link,
          iconContent: mark.type,
          details: mark.details,
          pickup: mark.pickup
        }, mark.data), {
          // Изображение метки
          iconLayout: 'default#image',
          iconImageHref: 'assets/img/icons/pin-red.svg',
          iconImageSize: [32, 32],
          iconShape: {
            type: 'Rectangle',
            coordinates: [
              [0, -32],
              [32, 0]
            ]
          },
          hideIconOnBalloonOpen: true,
          // Свойства балуна
          balloonShadow: false,
          balloonContentLayout: balloonInnerTemplating(mark.balloonTemplate),
          balloonLayout: balloonLayoutTemplating(mark.balloonLayout, mark.buildCallback),
          balloonPanelMaxMapArea: 0
        }
      );
      placemark.key = mark.key;
      placemarks.push(placemark);
      map.geoObjects.add(placemark);
      if (placemarks.length <= 1) {
        placemark.balloon.open();
      }
    }

    function resetPlacemarks() {
      for (var i = 0; i < placemarks.length; i++) {
        map.geoObjects.remove(placemarks[i]);
      }
    }

    function defaultPlacemarking($marks) {
      $marks.each(function () {
        var $this = $(this);

        setPlacemark({
          metro: $this.children('.b-ymap__point-title').html(),
          address: $('.b-ymap__point-address', $this).html(),
          phone: $('.b-ymap__point-phone', $this).html(),
          hours: $('.b-ymap__point-hours', $this).html(),
          type: $('.b-ymap__point-type', $this).html(),
          coords: $this.data('coords').split(','),
          details: ($this.data('no-detail') !== undefined),
          link: $this.data('link') || '/',
          key: $this.data('coords'),
        });
      });
    }

    function mappingInit() {
      createMap();
      if ($marks.length > 0) defaultPlacemarking($marks);
      $context.triggerHandler('mapReady.block'); // without bubble up
    }

    // Шаблонизаторы
    function balloonInnerTemplating(balloonTemplate) {
      var _balloonTemplate = balloonTemplate || defaultBalloonTemplate;
      return ymaps.templateLayoutFactory.createClass(_balloonTemplate);
    }

    function markTemplateing(markTemplate) {
      var _markTemplate = markTemplate || defaultMarkTemplate;
      return ymaps.templateLayoutFactory.createClass(_markTemplate);
    }

    function balloonLayoutTemplating(layoutTemplate, buildCallback) {
      var _layoutTemplate = layoutTemplate || defaultLayoutTemplate

      var balloonHolder = ymaps.templateLayoutFactory.createClass(_layoutTemplate, {
        build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = $('.b-ymap__balloon-outer', this.getParentElement());

          // $('body').on('click', $.proxy(this.closeOnBlur, this));

          if (buildCallback !== undefined) buildCallback.apply(this);

          this.applyElementOffset();

          this._$element.find('.b-ymap__balloon__close')
            .on('click', $.proxy(this.onCloseClick, this));
        },

        clear: function () {
          $('body').off('click', this.closeOnBlur);
          this.constructor.superclass.clear.call(this);
        },

        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();

          this.events.fire('shapechange');
        },

        applyElementOffset: function () {
          this._$element.css({
            left: -(this._$element[0].offsetWidth / 2),
            top: -(this._$element[0].offsetHeight)
          });
        },

        closeOnBlur: function (e) {
          var $target = $(e.target);
          if ($target.is(this._$element) || $target.closest(this._$element).length) {
            return true;
          } else {
            this.events.fire('userclose');
          }
        },

        getShape: function () {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          var position = this._$element.position();

          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
            [position.left, position.top],
            [
              position.left + this._$element[0].offsetWidth,
              position.top + this._$element[0].offsetHeight
            ]
          ]));
        },

        onCloseClick: function (e) {
          e.preventDefault();
          this.events.fire('userclose');
        },

        _isElement: function (element) {
          return element && element[0];
        }
      });

      return balloonHolder;
    }

    // ymapAPIready глобальная переменная, true если был загужен api карт, иначе ждем события загрузки апи.
    if (ymapAPIready) {
      mappingInit();
    } else {
      $(document).on('ymapAPIready', mappingInit);
    }

    // API блока
    $context.on('resize.block', function (event) {
      setTimeout(function () {
        if (map != undefined) map.container.fitToViewport(true);
      }, 200);
      event.stopPropagation();
    });

    $context.on('setPlacemark.block', function (event, mark) {
      setPlacemark(mark);
      event.stopPropagation();
    });

    $context.on('resetPlacemarks.block', function (event, mark) {
      resetPlacemarks();
      event.stopPropagation();
    });
    
    $context.on('setCenter.block', function (event, center, zoom, coordsKey) {
      map.setCenter(center, zoom, {
        duration: 600,
      }).then(function () {
        var placemark  = window.shopPlacemarksList.filter(function (el) {
          return el.key === coordsKey;
        })[0];
        if (placemark) {
          placemark.balloon.open();
        }
      }, function (err) {
        
      });
      event.stopPropagation();
    });
    
    $context.on('destroy.block', function () {
      if (map !== undefined) map.destroy();
      event.stopPropagation();
    });
  });
});