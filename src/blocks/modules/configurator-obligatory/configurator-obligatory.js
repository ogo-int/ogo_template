// Конфигуратор - прогрессбар
function configuratorProgress() {
  const $statsProgress = $('.b-configurator-obligatory__progress-bar');
  $statsProgress.each(function () {
    progressValue = $(this).data('value');
    $(this).css('width', progressValue + '%');
  })
}
$(document).ready(function(){
  configuratorProgress();
});
