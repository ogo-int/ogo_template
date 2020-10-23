// Промоблок 1
$(function () {
  $(".b-promo-block3").livequery(function () {
    var $context = $(this);
    var $timer = $(".b-promo-block3__time", $context);
    var $dateTo = $timer.data("date");
    var $timerDays = $(".b-promo-block3__time-days", $context);
    var $timerHrs = $(".b-promo-block3__time-hrs", $context);
    var $timerMin = $(".b-promo-block3__time-min", $context);
    var $timerSec = $(".b-promo-block3__time-sec", $context);


    function runTimer() {
      window.setInterval(function () {
        requestAnimFrame(function () {
          var c = new Date();
          var d = new Date($dateTo);
          var diff = new Date(d - c);
          var timeDiff = Math.abs(d.getTime() - c.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          var hrs = parseInt(diff.getHours());
          var min = diff.getMinutes();
          var sec = diff.getSeconds();

          if (hrs < 10) hrs = "0" + hrs;
          if (min < 10) min = "0" + min;
          if (sec < 10) sec = "0" + sec;

          if (diffDays > 0)
            $timerDays.html("<span>" + diffDays + "</span><br>" + GetNoun(diffDays, "день", "дня", "дней"));
          else
            $timerDays.hide();
          $timerHrs.html("<span>" + hrs + "</span><br>" + GetNoun(diffDays, "час", "часа", "часов"));
          $timerMin.html("<span>" + min + "</span><br>мин");
          $timerSec.html("<span>" + sec + "</span><br>сек");
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