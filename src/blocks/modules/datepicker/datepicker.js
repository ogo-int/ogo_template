// Календарь
$(function () {
  $(".b-datepicker").livequery(function () {
    var $context = $(this);
    var $calendar = $(".b-datepicker__calendar", $context);
    var $input = $(".b-datepicker__input", $context);
    var minDate = $context.data("min") || 0; //http://api.jqueryui.com/datepicker/#option-minDate
    var maxDate = $context.data("max") || "+14d"; //http://api.jqueryui.com/datepicker/#option-maxDate

    function changeDate(date, calendar) {
      $input.val(date);
    }

    $calendar.datepicker({
      firstDay: 1,
      dayNames: [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота" ],
      dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
      dateFormat: "dd.mm.yy",
      showOtherMonths: true,
      minDate: minDate,
      maxDate: maxDate,
      onSelect: changeDate
    });
  });
});
