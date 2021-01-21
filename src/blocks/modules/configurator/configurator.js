// Компоненты конфигуратора
function configurator() {
  const $configurator = $('.c-configurator'),
    // ось и сборка не учитываются
    $items = $configurator.find('.b-configurator-items__item').not('.b-configurator-items__item._custom'),
    //$progressText = $configurator.find('.b-configurator-mandatory__status'),
    $progressBar = $configurator.find('.b-configurator-mandatory__progress'),
    $expertButton = $configurator.find('#expert-request');

  let compatible = false,
    required = true,
    complete = false;

  // количество заполненных элементов  * 100 / всего элементов = прогресс в %
  function setProgressValue() {
    let itemsSelected = 0;
    $items.each(function () {
      if ($(this).find('.b-configurator-product').length) itemsSelected++
    })
    $progressBar.val(Math.round(itemsSelected * 100 / $items.length));
  }

  // если есть элементы с data-compatible=false, то класс прогрессбара = _incompatible
  // оверкилл: считаем количество несовместимых элементов, может быть пригодится
  function checkCompatible() {
    let itemsIncompatible = 0;
    $items.each(function () {
      if ($(this).data('compatible') == false) {
        if ($(this).find('.b-configurator-product').length != 0) {
          itemsIncompatible++
          console.log('Несовместимо: ' + itemsIncompatible);
        }
      }
    })

    if (itemsIncompatible > 0) {
      compatible = false;
      $progressBar.addClass('_incompatible');
    } else {
      compatible = true;
      $progressBar.removeClass('_incompatible');
    }

  }

  // проверим обязательные элементы
  function checkRequired() {
    let itemsRequired = 0;
    $items.each(function () {
      if ($(this).data('mandatory') == true) {
        if ($(this).find('.b-configurator-product').length == 0) {
          itemsRequired++
          console.log('Обязательно еще: ' + itemsRequired);
        }
      }
    })

    if (itemsRequired > 0) {
      required = true;
      $progressBar.addClass('_required');
    } else {
      required = false;
      $progressBar.removeClass('_required');
    }
    //console.log(itemsRequired)
  }

  // проверим полное заполнение
  function checkComplete(compatible, required) {
    if (compatible == true) {
      $progressBar.removeClass('_incompatible');
    }
    if (required == false) {
      $progressBar.removeClass('_required');
    }
    if ((compatible == true) && (required == false)) {
      $progressBar.addClass('_complete');
      $expertButton.attr('disabled', false).removeClass('_disabled');
    }
  }

  setProgressValue();
  checkCompatible();
  checkRequired();
  checkComplete(compatible, required);
}
// Определяем тултипы
function popover() {
  tippy('.js-tippy', {
    trigger: 'click',
    allowHTML: true,
    interactive: true,
    content(reference) {
      var content = ($(reference).data('popover-title') ? '<div class="tippy-title">' + $(reference).data('popover-title') + '</div>' : '') +
                    ($(reference).data('popover-content') ? '<div class="tippy-content">' + $(reference).data('popover-content') + '</div>' : '')
      const id = reference.getAttribute('data-popover-template');
      const template = document.getElementById(id);
      return template ? template.innerHTML : content;
    },
    appendTo: function(reference) {
      var wrapper = $(reference).parent()[0];
      if ($(reference).data('popover-appendto') && $(reference).closest($(reference).data('popover-appendto')).length) {
        wrapper = $(reference).closest($(reference).data('popover-appendto'))[0];
      }
      return wrapper;
    },
    maxWidth: 400,
    offset: [0, 15]
  });
  tippy('.js-tooltip', {
    allowHTML: true,
    theme: 'tooltip',
    delay: 250,
    inlinePositioning: true,
    interactive: false,
    hideOnClick: true,
    maxWidth: 400,
    offset: [0, 15],
    trigger: 'mouseenter click',
    content: function(reference) {
      var content = ($(reference).data('popover-title') ? '<div class="tippy-title">' + $(reference).data('popover-title') + '</div>' : '') +
                    ($(reference).data('popover-content') ? '<div class="tippy-content">' + $(reference).data('popover-content') + '</div>' : '')
      return content;
    },
    appendTo: function (reference) {
      var wrapper = $(reference).parent()[0];
      if ($(reference).data('popover-appendto') && $(reference).closest($(reference).data('popover-appendto')).length) {
        wrapper = $(reference).closest($(reference).data('popover-appendto'))[0];
      }
      return wrapper;
    }
  });
  $(document).on('click', '.js-tippy-close', function(e) {
    tippy.hideAll();
    e.preventDefault();
  });
}
$(document).ready(function () {
  configurator();
  popover();
});