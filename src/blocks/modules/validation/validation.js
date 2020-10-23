$(function() {
  $.validator.addMethod("email", function(value, element) { 
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }, "Пожалуйста, введите корректный адрес электронной почты");

  $.validator.addMethod("phone", function(value, element) {
    var phoneNumber = value.replace(/\s+/g, "");
    return this.optional(element) || phoneNumber.length > 9 &&
            phoneNumber.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
  }, "Пожалуйста, укажите правильный номер телефона");

  $.validator.addMethod("coupon", function(value, element) {
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }, "Ошибка! Купон не найден или истек его срок использования"); 

  $.validator.addMethod("bic", function(value, element) {
    return this.optional( element ) || (/^\d{9}$/.test(value ));
  }, "БИК состоит из 9 цифровых символов");    

  $.validator.addMethod("inn", function(value, element) {
    return this.optional(element) ||(/^\d{10,12}$/.test(value));
  }, "ИНН не менее 10 символов"); 

  $.validator.addMethod("kpp", function(value, element) {
    return this.optional(element) ||(/^\d{9}$/.test(value));
  }, "КПП 9 символов");

  $.validator.addMethod("rs", function(value, element) {
    return this.optional( element ) || (/^\d{20}$/.test(value));
  }, "Номер счета состоит из 20 цифровых символов"); 

  $("form[data-validate=\"Y\"]").each(function (index, el) {
    if ($(el).data("is-custom-valid") !== "Y") {
      $(el).validate({
        ignore: "hidden",
        // rules: {
        // },
        highlight: function (element) {
          if($(element).parent().hasClass("datepicker")) {
            $(element).parent().removeClass("success").addClass("error");
            $(element).removeClass("success").addClass("error");
          } else {
            $(element).removeClass("success").addClass("error");
          }

          if ($(element).hasClass("coupon")) {
            $(element).parent().find("#coupon-success").detach();
          } 
                  
          //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
        },
        unhighlight: function (element) {
          if($(element).parent().hasClass("datepicker")) {
            $(element).parent().removeClass("error").addClass("success");
            $(element).removeClass("error").addClass("success");
          } else {
            $(element).removeClass("error").addClass("success");
          }

          if ($(element).hasClass("coupon")) {
            if(!$(element).parent().find("#coupon-success").length) {
              $(element).parent().append("<label style= \"display: block; margin-top: color: #61a616\" id=\"coupon-success\">Спасибо, купон применен! </label>");
            }
          } 
        },
        onclick: function (element) {
          // click on selects, radiobuttons and checkboxes
          if (element.name in this.submitted) {
            this.element(element);

            // or option elements, check parent select in that case
          } else if (element.parentNode.name in this.submitted) {
            this.element(element.parentNode);
          }
        },
      });
    }
  });

  $("form.b-feedback-vacancy-form").validate({
    ignore: "hidden",
    // rules: {
    // },
    highlight: function (element) {
      if($(element).parent().hasClass("datepicker")) {
        $(element).parent().removeClass("success").addClass("error");
        $(element).removeClass("success").addClass("error");
      } else {
        $(element).removeClass("success").addClass("error");
      }
      //     $(element).closest('.form__field-row').removeClass('is-ok').addClass('has-error');
    },
    unhighlight: function (element) {
      if($(element).parent().hasClass("datepicker")) {
        $(element).parent().removeClass("error").addClass("success");
        $(element).removeClass("error").addClass("success");
      } else {
        $(element).removeClass("error").addClass("success");
      }
    },
    onkeyup: function( element, event ) {
      const isValid = this.checkForm();

      if (isValid) { // checks form for validity
        $("form.b-feedback-vacancy-form").find("[type=\"submit\"]").prop("disabled", false);
        $("form.b-feedback-vacancy-form").find("[name=\"save\"]").prop("disabled", false);
      } else {
        $("form.b-feedback-vacancy-form").find("[type=\"submit\"]").prop("disabled", true);
        $("form.b-feedback-vacancy-form").find("[name=\"save\"]").prop("disabled", true);
      }
    },
    onclick: function( element ) {
      // click on selects, radiobuttons and checkboxes
      if (element.name in this.submitted) {
        this.element(element);

        // or option elements, check parent select in that case
      } else if (element.parentNode.name in this.submitted) {
        this.element(element.parentNode);
      }

      const isValid = this.checkForm();

      if (isValid) { // checks form for validity
        $("form.b-feedback-vacancy-form").find("[type=\"submit\"]").prop("disabled", false);
        $("form.b-feedback-vacancy-form").find("[name=\"save\"]").prop("disabled", false);
      } else {
        $("form.b-feedback-vacancy-form").find("[type=\"submit\"]").prop("disabled", true);
        $("form.b-feedback-vacancy-form").find("[name=\"save\"]").prop("disabled", true);
      }
    }
  });
});

//для валидации чекбоксов (сделано через input[type=text])
$(".js-modal").on("click", function(){
  var a = $(".b-checkbox");
  var b = $(".checkbox-vadidator");

  if(a.hasClass("_checked")) {
    b.val("true");
  } else {
    b.val("");
  }
}); 

$(".b-checkbox").on("click", function(){
  var a = $(".b-checkbox");
  var b = $(".checkbox-vadidator");

  if(a.hasClass("_checked")) {
    b.val("");
  } else {
    b.val("true");
  }
});