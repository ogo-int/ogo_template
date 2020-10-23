// Блок вопрос-ответ
$(function () {
  $(".b-faq-block").livequery(function () {
    var $context = $(this);
    var $sendBtn = $(".b-faq-block__send", $context);
    var $replyBtn = $(".b-faq-block__answer", $context);
    var $replyArea = $(".b-faq-block__text-area", $context);
    var $replyInput = $(".b-faq-block__text-area textarea", $context);
    var $feedbackLinks = $(".b-faq-block__feedback-link", $context);
    var $resultTextContainer = $("#question-vote-result .b-form-success-modal__content-holder");

    function showReplyArea () {
      $replyBtn.removeClass("b-faq-block__answer_active");
      $replyArea.addClass("b-faq-block__text-area_active");
      $sendBtn.addClass("b-faq-block__send_active");
      return false;
    }

    function sendMessage () {
      return false;
    }

    function sendFeedback () {
      var $this = $(this),
        $parent = $this.parent(),
        $up = $(".link-thumbup", $parent),
        $down = $(".link-thumbdown", $parent);
      preloader();
      $.ajax({
        url: "/ajax/new/voteQuestion.php",
        data: {"ID" : $this.data("element"), "INCREMENT": $this.data("increment")},
        method: "post",
        dataType: "json",
        success: function (result) {
          if(result.status == "success") {
            $resultTextContainer.html("<p>Ваш голос принят, спасибо!</p>");
            $up.html("<span>Помогло ("+result.for+")</span>");
            $down.html("<span>Не помогло ("+result.contra+")</span>");
          } else {
            $resultTextContainer.html("<p>"+result.message+"</p>");
          }
          $.fancybox.open(
            $("#question-vote-result"),
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

    $feedbackLinks.on("click", sendFeedback);
    $replyBtn.on("click", showReplyArea);
    $sendBtn.on("click", sendMessage);

    $context.adaptBlock({
      maxWidth: {
        550: "_mx550",
        400: "_mx400"
      }
    });
  });
});
