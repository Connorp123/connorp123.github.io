$(document).ready(function () {
  // Take photo button
  $('#btn-text').click(function() {
    console.log("recording gif...");

    html2canvas(document.querySelector("#main-camera"), {allowTaint: true}).then(function (canvass) {
      console.log(canvass);
      gifCanvas = canvass;

      CAPTURING = true;
      captureTimer = MAIN_FRAME_RATE * DURATION;
      capturer.start();
    });
    
  });

  //Click preview, change main to that filter
  $('.preview-camera').click(function() {
    var filter = $(this).data('filter');
    $('#main-camera').removeClass().addClass(filter);
    $('#main-camera').attr("filter", filter)
  });

  //click main, back to no-filter
  // $('#main-camera').hover(
  //   function() {
  //     var filter = 'no-filter';
  //     $('#main-camera').removeClass().addClass(filter);
  //   }, function() {
  //     var filter = $('#main-camera').attr("filter");
  //     $('#main-camera').removeClass().addClass(filter);
  //   }
  // );
});
