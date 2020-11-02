// Промоблок 1
$(function () {
  $(".c-promo__timer").livequery(function () {
    var $context = $(this);
    var $timer = $(".b-promo-timer__timer", $context);
    var $dateTo = $timer.data("date");
    var $timerHrs = $(".b-promo-timer__hours", $context);
    var $timerMin = $(".b-promo-timer__mins", $context);
    var $timerSec = $(".b-promo-timer__seconds", $context);


    function runTimer() {
      window.setInterval(function () {
        requestAnimFrame(function () {
          var c = new Date();
          var  d = new Date($dateTo);
          var diff = new Date(d - c);
          var timeDiff = Math.abs(d.getTime() - c.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          var hrs = parseInt(diff.getHours());
          var min = diff.getMinutes();
          var sec = diff.getSeconds();

          if(diffDays > 0)
            hrs = parseInt(hrs) + (parseInt(diffDays)*24);

          if(hrs < 10) hrs = "0" + hrs;
          if(min < 10) min = "0" + min;
          if(sec < 10) sec = "0" + sec;

          $timerHrs.html("<span class='b-promo-timer__value'>"+hrs+"</span><span class='b-promo-timer__label'>"+GetNoun(hrs, "час", "часа", "часов")+"</span>");
          $timerMin.html("<span class='b-promo-timer__value'>"+min+"</span><span class='b-promo-timer__label'>мин</span>");
          $timerSec.html("<span class='b-promo-timer__value'>"+sec+"</span><span class='b-promo-timer__label'>сек</span>");
        });
      }, 1000);
    }

    runTimer();
    $context.adaptBlock({
      maxWidth: {
        780: "_mx780",
        700: "_mx700"
      }
    });
  });
});