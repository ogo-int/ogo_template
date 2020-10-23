// ЛК, бонусная карта
$(function () {
  $(".b-bonus-card").livequery(function () {
    var $context = $(this);
    var $form = $(".c-lk__card-activation");
    var $saveBtn = $(".b-bonus-card__activation", $context);
    var $birthdayInput = $(".js-order-info-birthday", $context);
    var $birthdayDay = $(".js-birthday-day", $context);
    var $birthdayMonth = $(".js-birthday-mon", $context);
    var $birthdayYear = $(".js-birthday-year", $context);
    var resultModal = $("#bonuscard-activation-result");
    var modalTitle = $(".js-modal-title", resultModal);
    var modalContent = $(".js-modal-content", resultModal);

    function saveChanges() {
      setBirthday();
      sendChangesToServer();
      return false;
    }

    function setBirthday() {
      var day = parseInt($birthdayDay.val());
      var mon = parseInt($("option:selected", $birthdayMonth).val());
      var year = parseInt($birthdayYear.val());

      mon = mon > 9 ? mon : "0" + mon;

      if (day && mon && year)
        $birthdayInput.val(day + "." + mon + "." + year);
    }

    function parseBirthday() {
      var dayParts = $birthdayInput.val().split(".");
      $birthdayDay.val(dayParts[0]);
      $birthdayMonth.val(parseInt(dayParts[1]));
      $birthdayYear.val(dayParts[2]);
    }

    function sendChangesToServer() {
      preloader();
      $form.ajaxSubmit({
        dataType: "json",
        success: function (result) {
          preloader();

          if (result.status == "success") {
            modalTitle.html("Карта активирована!");
            modalContent.html("<p>Бонусная карта успешно активирована!</p>");
            window.location.href = "/personal/bonus/transactions/";
          } else {
            modalTitle.html("Произошла ошибка!");
            modalContent.html("<p>" + result.message + "</p>");
          }

          $.fancybox.open(
            resultModal, {
              padding: 0,
              margin: 20,
              closeEffect: "none",
              closeSpeed: 0,
              openSpeed: 0,
              openEffect: "none",
              openOpacity: false,
              closeOpacity: false,
              fitToView: true,
              scrolling: "visible",
              beforeShow: function () {
                $("html").addClass("fancybox-margin fancybox-lock");
              }
            }
          );
        },
        error: function () {
          console.log("bad");
        }
      });
    }


    $saveBtn.on("click", saveChanges);

    parseBirthday();

    $context.adaptBlock({
      maxWidth: {
        820: "_mx820",
        530: "_mx530"
      }
    });
  });
});