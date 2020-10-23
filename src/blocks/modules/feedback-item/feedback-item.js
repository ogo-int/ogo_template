// Адрес в лк
$(function () {
  $(".b-feedback-item").livequery(function () {
    var $context = $(this);
    var $plusField = $(".b-feedback-item__save-field_plus", $context);
    var $minusField = $(".b-feedback-item__save-field_minus", $context);
    var $commentField = $(".b-feedback-item__save-field_comment", $context);
    var $ratingField = $(".b-feedback-item__rating .b-rating", $context);
    var $form = $("form", $context);

    // Btns
    var $editBtn= $(".b-feedback-item__edit-btn",$context);
    var $editBtnHolder = $(".b-feedback-item__ui-edit",$context);
    var $saveBtn = $(".b-feedback-item__save-btn",$context);
    var $saveBtnHolder = $(".b-feedback-item__ui-save",$context);
    var $removeBtn = $(".b-feedback-item__remove-btn",$context);
    var $removeBtnHolder = $(".b-feedback-item__ui-remove",$context);

    // Inputs
    var $inputPlus = $("[name=\"PROPERTY_VALUES[PROS]\"]", $context);
    var $inputMinus = $("[name=\"PROPERTY_VALUES[CONS]\"]", $context);
    var $inputComment = $("[name=\"PROPERTY_VALUES[COMMENTS]\"]", $context);
    var $ratingInput = $("[name=\"PROPERTY_VALUES[RATING]\"]", $context);

    function setEditState () {
      $saveBtnHolder.addClass("b-feedback-item__ui-save_active");
      $editBtnHolder.removeClass("b-feedback-item__ui-edit_active");
      $context.addClass("_edit-state");
      $(".b-address-form", $context).trigger("block.resize");
      return false;
    }

    function saveChanges () {
      preloader();
      applyChanges();
      sendChangesToServer();
      if(!$context.hasClass("b-comments-modal"))
        setSaveState();
      return false;
    }

    function applyChanges (isPreventRender) {
      var plus = $inputPlus.val();
      var minus = $inputMinus.val();
      var comment = $inputComment.val();
      var rating = parseInt($ratingInput.val());

      if(!isPreventRender) {
        $plusField.find(".b-feedback-item__field-content").text(plus);
        plus == "" ? $plusField.addClass("_hide") : $plusField.removeClass("_hide");

        $minusField.find(".b-feedback-item__field-content").text(minus);
        minus == "" ? $minusField.addClass("_hide") : $minusField.removeClass("_hide");

        $commentField.find(".b-feedback-item__field-content").text(comment);
        comment == "" ? $commentField.addClass("_hide") : $commentField.removeClass("_hide");

        $ratingField.trigger("change-val.block", [rating]);
        return true;
      }

      return [plus, minus, comment, rating];
    }

    function sendChangesToServer() {
      // accept any $.ajax options
      $form.ajaxSubmit({
        method: "post",
        success: function () {
          console.log("good");
          $.fancybox.open(
            $("#feedback-result"),
            {
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
              },
              afterShow: function () {
                $(".iblock", this.inner).trigger("resize.block");
              }
            }
          );
          preloader();
        },

        error: function () {
          console.log("bad");
        }
      });
    }

    function setSaveState () {
      $saveBtnHolder.removeClass("b-feedback-item__ui-save_active");
      $editBtnHolder.addClass("b-feedback-item__ui-edit_active");
      $context.removeClass("_edit-state");
      return false;
    }

    function removeItem () {
      preloader();
      $.ajax({
        url: $(this).attr("href"),
        data: {"ID": $(this).data("item")},
        method: "post",
        success: function () {
          $context.remove();
          preloader();
        }
      });

      return false;
    }

    $editBtn.on("click", setEditState);
    $saveBtn.on("click", saveChanges);
    $removeBtn.on("click", removeItem);

    $context.adaptBlock({
      maxWidth: {
        610: "_mx610",
        480: "_mx480"
      }
    });
  });
});
