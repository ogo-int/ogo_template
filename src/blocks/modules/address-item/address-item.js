// Адрес в лк
$(function () {
  $(".b-address-item").livequery(function () {
    var $context = $(this);
    var $address = $(".b-address-item__address", $context);
    var $comment = $(".b-address-item__comment", $context);
    var $town = $(".b-address-item__town", $context);
    var $title = $(".b-address-item__title", $context);
    var $form = $("form", $context);

    // Btns
    var $editBtn= $(".b-address-item__edit-btn",$context);
    var $editBtnHolder = $(".b-address-item__ui-edit",$context);
    var $saveBtn = $(".b-address-item__save-btn",$context);
    var $saveBtnHolder = $(".b-address-item__ui-save",$context);
    var $mainBtn = $(".b-address-item__primary-btn",$context);
    var $mainBtnHolder = $(".b-address-item__ui-primary",$context);
    var $secondaryBtn = $(".b-address-item__secondary-btn",$context);
    var $secondaryBtnHolder = $(".b-address-item__ui-secondary",$context);
    var $removeBtn = $(".b-address-item__remove-btn",$context);

    //Inputs
    var $inputs = $("[name]", $context);
    var $inputName = $("[name=\"NAME\"]", $context);
    var $inputTown = $("[name=\"CITY\"]", $context);
    var $inputStreet = $("[name=\"STREET\"]", $context);
    var $inputBuilding = $("[name=\"HOUSE\"]", $context);
    var $inputBlock = $("[name=\"BUILDING\"]", $context);
    var $inputFlat = $("[name=\"APPARTMENT\"]", $context);
    var $inputComment = $("[name=\"COMMENT\"]", $context);

    function setEditState () {
      $saveBtnHolder.addClass("b-address-item__ui-save_active");
      $editBtnHolder.removeClass("b-address-item__ui-edit_active");
      $context.addClass("_edit-state");
      $(".b-address-form", $context).trigger("resize.block");
      return false;
    }

    function setSaveState () {
      $saveBtnHolder.removeClass("b-address-item__ui-save_active");
      $editBtnHolder.addClass("b-address-item__ui-edit_active");
      $context.removeClass("_edit-state");
      preloader();
      $("body").animate({scrollTop: ($context.offset().top - 100)}, 500);
      return false;
    }

    function setAddressAsMain () {
      var $idHolder = $("[name=\"ADDRESS_ID\"]", $form);
      var $id = $idHolder.val();
      $.ajax({
        url: $(this).attr("href"),
        data: {action: "makeMain", id: $id},
        success: function () {
          $(".b-address-item").trigger("reset-main.block");
          $secondaryBtnHolder.removeClass("b-address-item__ui-secondary_active");
          $mainBtnHolder.addClass("b-address-item__ui-primary_active");
        }
      });

      return false;
    }

    function deleteAddressMain()
    {
      var $idHolder = $("[name=\"ADDRESS_ID\"]", $form);
      var $id = $idHolder.val();
      $.ajax({
        url: $(this).attr("href"),
        data: {action: "deleteMain", id: $id},
        success: function () {
          $(".b-address-item").trigger("reset-main.block");
          $mainBtnHolder.removeClass("b-address-item__ui-primary_active");
          $secondaryBtnHolder.addClass("b-address-item__ui-secondary_active");
        }
      });

      return false;
    }

    function resetMainAddress () {
      $secondaryBtnHolder.addClass("b-address-item__ui-secondary_active");
      $mainBtnHolder.removeClass("b-address-item__ui-primary_active");
    }

    function saveChanges () {
      if(validateChanges()) {
        preloader();
        applyChanges();
        sendChangesToServer();
        setSaveState();
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
          $input.closest(".b-address-form__input").addClass("_none");
        } else {
          $input.closest(".b-address-form__input").removeClass("_none");
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
      var name = $inputName.val();
      var town = $inputTown.val();
      var comment = $inputComment.val();
      var addressInputs = [$inputTown,  $inputStreet, $inputBuilding, $inputBlock, $inputFlat];
      var address =  [];

      for(i = 0; i < addressInputs.length; i++) {
        if(addressInputs[i].val() != "") {
          if(addressInputs[i].attr("name") == "STREET") {
            address.push("улица " + addressInputs[i].val());
            continue;
          }

          if(addressInputs[i].attr("name") == "HOUSE") {
            address.push("дом " + addressInputs[i].val());
            continue;
          }

          if(addressInputs[i].attr("name") == "BUILDING") {
            address.push("корпус " + addressInputs[i].val());
            continue;
          }

          if(addressInputs[i].attr("name") == "APPARTMENT") {
            address.push("квартира " + addressInputs[i].val());
            continue;
          }

          address.push(addressInputs[i].val());
        }
      }

      if(!preventRender) {
        $address.text(address.join(", "));
        $town.text(town);
        $title.text(name);

        if(comment == "") {
          $comment.closest(".b-address-item__save-field").addClass("_hide");
          $comment.text(comment);
        } else {
          $comment.closest(".b-address-item__save-field").removeClass("_hide");
          $comment.text(comment);
        }
      }

      return [name, town, address.join(", "), comment];
    }

    function sendChangesToServer() {
      // accept any $.ajax options
      $form.ajaxSubmit({
        success: function (result) {
          var $result = JSON.parse(result);
          var $id = $("[name=\"ADDRESS_ID\"]", $form);

          if($result.status == "success")
          {
            if($id.length == 0)
            {
              $form.append("<input type=\"hidden\" name=\"ADDRESS_ID\" value=\""+$result.id+"\"/>");
            }
          }

          console.log("good");
        },

        error: function () {
          console.log("bad");
        }
      });
    }

    function removeItem () {
      var $idHolder = $("[name=\"ADDRESS_ID\"]", $form);
      var $id = $idHolder.val();
      $.ajax({
        url: $(this).attr("href"),
        data: {action: "remove", id: $id},
        success: function () {
          $context.remove();
        }
      });

      return false;
    }

    $removeBtn.on("click", removeItem);
    $editBtn.on("click", setEditState);
    $saveBtn.on("click", saveChanges);
    $secondaryBtn.on("click", setAddressAsMain);
    $mainBtn.on("click", deleteAddressMain);

    $context.adaptBlock({
      maxWidth: {
        540: "_mx540",
        400: "_mx400"
      }
    });

    $context.on("reset-main.block", resetMainAddress);

  });
});
