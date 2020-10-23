// Шкала в фильтре
$(function () {
  $(".b-filter-scale").livequery(function () {

    var $context = $(this);
    var $scale = $(".b-filter-scale__scale", $context);
    var $minInput = $(".js-min", $context);
    var $maxInput = $(".js-max", $context);
    var scaleMin = parseFloat($scale.data("min")) || 0;
    var scaleMax = parseFloat($scale.data("max")) || 10000;
    var currMin = scaleMin;
    var currMax = scaleMax;
    var scaleStep = parseFloat($scale.data("step"));

    if(scaleMax < scaleMin) scaleMax = scaleMin;
    if($minInput.length > 0) currMin = parseFloat($minInput.val());
    if($maxInput.length > 0) currMax = parseFloat($maxInput.val());

    function changeMaxVal() {
      var value = parseFloat($(this).val());
      if(isNaN(value)) value = scaleMax;
      if(value < currMin) value = currMin;
      if(value > scaleMax) value = scaleMax;
      currMax = value;

      $maxInput.val(value);
      $scale.slider("values", 1, value);
    }

    function changeMinVal() {
      var value = parseFloat($(this).val());
      if(isNaN(value)) value = scaleMin;
      if(value < scaleMin) value = scaleMin;
      if(value > currMax) value = currMax;
      currMin = value;

      $minInput.val(value);
      $scale.slider("values", 0, value);
    }

    function scaleChanges (event, ui) {
      var values = ui.values;

      $minInput.val(values[0]).trigger("change");
      $maxInput.val(values[1]).trigger("change");

      currMin = values[0];
      currMax =values[1];
    }

    $scale.slider({
      range: true,
      min: scaleMin,
      max: scaleMax,
      values: [currMin, currMax],
      slide: scaleChanges,
      step: scaleStep
    });

    $maxInput.on("change", changeMaxVal);
    $minInput.on("change", changeMinVal);
  });
});
