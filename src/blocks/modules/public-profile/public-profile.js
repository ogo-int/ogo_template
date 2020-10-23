// Публичный профиль
$(function () {
  $(".b-public-profile").livequery(function () {
    var $context = $(this);
    var $photoChanger = $(".b-public-profile__change-input", $context);
    var $photoImg = $(".b-public-profile__photo-img", $context);

    function changePhoto() {
      if ($(this).val() == "") return;

      var FR = new FileReader();

      FR.onload = function (event) {
        var contents = event.target.result;
        $photoImg.attr("src", contents);
      };

      FR.readAsDataURL($photoChanger.get(0).files[0]);
    }

    $photoChanger.on("change", changePhoto);
  });
});

$(function () {
  $(".b-public-profile").livequery(function () {
    var $context = $(this);
    var $saveBtn = $(".b-public-profile__save", $context);
    var $inputs = $("input", $context);
    var $status = $(".b-public-profile__status", $context);
    var $form = $("form", $context);

    function saveChanges() {
      sendChangesToServer();
      $saveBtn.removeClass("_active");
      return false;
    }

    function sendChangesToServer() {
      $form.ajaxSubmit({
        success: function () {
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
    $context.adaptBlock({
      maxWidth: {
        890: "_mx890",
        630: "_mx630"
      }
    });
  });
});