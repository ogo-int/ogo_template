// Реквизиты в личном кабинете
$(function () {
  $(".b-details-item").livequery(function () {
    var $context = $(this);
    var $staticState = $(".b-details-item__static-state", $context);
    var $editState = $(".b-details-item__edit-state", $context);
    var $formHolder = $(".b-details-form", $context);
    var $title = $(".b-details-item__title", $context);
    var $form = $("form", $context);

    // Btns
    var $editBtn = $(".b-details-item__edit-btn", $context);
    var $editBtnHolder = $(".b-details-item__ui-edit", $context);
    var $saveBtn = $(".b-details-item__save-btn", $context);
    var $saveBtnHolder = $(".b-details-item__ui-save", $context);
    var $recognizerBtn = $(".b-details-item__recognize", $context);
    var $recognizerSubmitBtn = $(".b-details-form__recognize", $context);
    var $manualBtn = $(".b-details-item__manual", $context);
    var $removeBtn = $(".b-details-item__remove-btn",$context);
    var $uploadBtn = $(".b-details-item__upload", $context);
    var $uploadInput = $("#legal-upload-file", $context);

    var $inputs = {
      companyName: $("[name=\"NAME\"]", $context),
      legalAddress: $(".input-company-legal-address", $context),
      realAddress: $(".input-company-real-address", $context),
      companyPhone: $(".input-company-phone", $context),
      inn: $(".input-inn", $context),
      kpp: $(".input-kpp", $context),
      bank: $(".input-bank", $context),
      rs: $(".input-rs", $context),
      ks: $(".input-ks", $context),
      bic: $(".input-bic", $context),
      recognize: $(".input-recognize", $context)
    };

    var $staticItems = {
      companyName: $(".b-details-item__field-content_company-name", $context),
      legalAddress: $(".b-details-item__field-content_company-legal-address", $context),
      realAddress: $(".b-details-item__field-content_company-real-address", $context),
      companyPhone: $(".b-details-item__field-content_company-phone", $context),
      inn: $(".b-details-item__field-content_inn", $context),
      kpp: $(".b-details-item__field-content_kpp", $context),
      bank: $(".b-details-item__field-content_bank", $context),
      rs: $(".b-details-item__field-content_rs", $context),
      ks: $(".b-details-item__field-content_ks", $context),
      bic: $(".b-details-item__field-content_bic", $context)
    };

    function setEditState () {
      $context.addClass("_edit-state");
      $saveBtnHolder.addClass("b-details-item__ui-save_active");
      $editState.addClass("b-details-item__edit-state_active");
      $editBtnHolder.removeClass("b-details-item__ui-edit_active");
      $staticState.removeClass("b-details-item__static-state_active");
      $formHolder.trigger("resize.block");
      return false;
    }

    function openDetailsRecognizer () {
      openRecognizer();
      $manualBtn.addClass("b-details-item__manual_active");
      $recognizerBtn.removeClass("b-details-item__recognize_active");

      $("body").animate({
        scrollTop: ($formHolder.find(".b-details-form__textarea").offset().top - 90)
      });
      return false;
    }

    function uploadFileAndRecognize(event)
    {
      var fd = new FormData();

      fd.append("recognizeFile", event.target.files[0]);

      preloader();
      $.ajax({
        url: "/ajax/new/readWordFile.php",
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
          openDetailsRecognizer();
          $inputs.recognize.val(data);
          preloader();
        }
      });
    }

    function submitRecognizer()
    {
      var text = $inputs.recognize.val();
      var textSplit = text.split(";");

      $.each(textSplit, function (index, val) {
        var valParts, input;
        if(val.indexOf("ИНН") >= 0)
          input = $inputs.inn;
        else if(val.indexOf("КПП") >= 0)
          input = $inputs.kpp;
        else if(val.indexOf("Наименование банка") >= 0)
          input = $inputs.bank;
        else if(val.indexOf("Р/С") >= 0)
          input = $inputs.rs;
        else if(val.indexOf("К/С") >= 0)
          input = $inputs.ks;
        else if(val.indexOf("БИК") >= 0)
          input = $inputs.bic;


        valParts = val.split(":");
        input.val(valParts[1].trim());
      });

      openManualEnter();

      saveChanges();
    }

    function openManualEnter () {
      openManual();
      $manualBtn.removeClass("b-details-item__manual_active");
      $recognizerBtn.addClass("b-details-item__recognize_active");
      return false;
    }

    function saveChanges () {
      if(validateChanges()) {
        preloader();
        applyChanges();
        sendChangesToServer();
      }

      return false;
    }

    function validateChanges () {
      var $requiredFields = $("[required]", $form);
      var condition = true;
      var scrollTarget;

      $requiredFields.each(function () {
        var $input = $(this);
        var isEmpty = $input.val()=="";

        if(isEmpty) {
          $input.closest(".b-details-form__input").addClass("_none");
        } else {
          $input.closest(".b-details-form__input").removeClass("_none");
        }

        if(condition && isEmpty) {
          scrollTarget = $input.offset().top;
        }

        condition = condition && !isEmpty;
      });

      if(!isNaN(scrollTarget)) {
        $("body").animate({scrollTop: (scrollTarget - 100)}, 500);
      }

      return condition;
    }

    function applyChanges (preventRender) {
      var itemsList = [
        "companyName",
        "legalAddress",
        "realAddress",
        "companyPhone",
        "inn",
        "kpp",
        "bank",
        "rs",
        "ks",
        "bic"
      ];

      var itemsVal = {};

      $.each(itemsList, function (index, val) {
        itemsVal[val] = $inputs[val].val();
      });

      if(!preventRender) {
        $.each(itemsVal, function(name, value) {
          if(value == "") {
            $staticItems[name].closest(".b-details-item__static-field").addClass("_empty");
          } else {
            $staticItems[name].closest(".b-details-item__static-field").removeClass("_empty");
          }
          $staticItems[name].text(value);
        });

        $title.text(itemsVal["companyName"]);
      }

      return itemsVal;
    }

    function sendChangesToServer() {
      // accept any $.ajax options
      $form.ajaxSubmit({
        dataType: "json",
        success: function (result) {
          if(result.status == "success")
            setStaticState();
          else if(result.status == "error")
          {
            var modal = $("#legal-entities-error-modal"),
              errorContainer = $(".errors-container", modal);

            errorContainer.html(result.message);
            $.fancybox.open(
              modal,
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
                  preloader();
                }
              }
            );

          }
        },

        error: function () {
          console.log("bad");
        }
      });
    }

    function setStaticState () {
      $context.removeClass("_edit-state");
      $saveBtnHolder.removeClass("b-details-item__ui-save_active");
      $editState.removeClass("b-details-item__edit-state_active");
      $editBtnHolder.addClass("b-details-item__ui-edit_active");
      $staticState.addClass("b-details-item__static-state_active");
      preloader();
      return false;
    }

    function removeItem () {
      $.ajax({
        url: $(this).attr("href"),
        success: function () {
          var $componentItem = $context.closest(".c-lk__details-item");

          if($componentItem.length > 0) {
            $componentItem.remove();
          } else {
            $context.remove();
          }
        }
      });

      return false;
    }

    $removeBtn.on("click", removeItem);
    $editBtn.on("click", setEditState);
    $saveBtn.on("click", saveChanges);
    $recognizerBtn.on("click", openDetailsRecognizer);
    $recognizerSubmitBtn.on("click", submitRecognizer);
    $manualBtn.on("click", openManualEnter);
    $uploadInput.on("change", uploadFileAndRecognize);

    $context.adaptBlock({
      maxWidth: {
        730: "_mx730",
        480: "_mx480"
      }
    });
  });
});
