// Информация для заказов
$(function () {
  $(".b-order-info").livequery(function () {
    var $context = $(this);
    var $saveBtn = $(".b-order-info__save", $context);
    var $inputs = $("input", $context);
    var $status = $(".b-order-info__status", $context);
    var $form = $("form", $context);
    var $birthdayInput = $(".js-order-info-birthday", $context);
    var $birthdayDay = $(".js-birthday-day", $context);
    var $birthdayMonth = $(".js-birthday-mon", $context);
    var $birthdayYear = $(".js-birthday-year", $context);

    function saveChanges () {
      setBirthday();
      sendChangesToServer();
      $saveBtn.removeClass("_active");
      return false;
    }

    function setBirthday()
    {
      var day = parseInt($birthdayDay.val());
      var mon = parseInt($("option:selected",$birthdayMonth).val());
      var year = parseInt($birthdayYear.val());

      mon = mon > 9 ? mon : "0" + mon;

      if(day && mon && year)
        $birthdayInput.val(day+"."+mon+"."+year);
    }

    function parseBirthday()
    {
      var dayParts = $birthdayInput.val().split(".");
      $birthdayDay.val(dayParts[0]);
      $birthdayMonth.val(parseInt(dayParts[1]));
      $birthdayYear.val(dayParts[2]);
    }

    function sendChangesToServer() {
      $form.ajaxSubmit({
        success: function (res) {
          var statusText = $(".b-order-info__status", $(res));
          $status.html(statusText.html());
          $status.addClass("_active");
          setTimeout(function () {
            $status.removeClass("_active");
          }, 1500);
          console.log("good");
        },
        error: function () {
          console.log("bad");
        }
      });
    }


    $saveBtn.on("click", saveChanges);

    $inputs.on("change", function () {
      $saveBtn.addClass("_active");
    });

    parseBirthday();

    $context.adaptBlock({
      maxWidth: {
        890: "_mx890",
        630: "_mx630"
      }
    });
  });
});
