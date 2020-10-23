document.addEventListener("DOMContentLoaded", function () {

    $(document).on("click", ".d-questions__block", function (e) {
        let $this = $(this);
        let questionId = $this.data("id");
        let questionHash = $this.data("hash");
        let questionAction = $this.data("action");
        let questionText = $("textarea#answerText").val();
        let questionName = $("input#answerName").val();
        $.ajax({
            url: "/ajax/new/element_questions.php",
            method: "post",
            dataType: "json",
            data: {
                ID: questionId,
                ACTION: questionAction,
                HASH: questionHash,
                TEXT: questionText,
                NAME: questionName
            },
            success: function (result) {
                if (result.status == "success") {
                    if (questionAction == "ANSWER") {
                        location.reload();
                    }
                    $this.parent().toggleClass("action");
                    if (questionAction == "BLOCK") {
                        $this.html("Разблокировать");
                        $this.data("action", "UNBLOCK");
                    } else if (questionAction == "UNBLOCK") {
                        $this.html("Блокировать");
                        $this.data("action", "BLOCK");
                    }
                } else if (result.status == "error") {
                    alert(result.message);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});