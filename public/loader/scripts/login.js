jQuery.fn.shake = function() {
  this.each(function(i) {
    $(this).css({
      position: "relative"
    });

    for (var x = 1; x <= 3; x++) {
      $(this)
        .animate(
          {
            left: -10
          },
          25
        )
        .animate(
          {
            left: 10
          },
          50
        )
        .animate(
          {
            left: 0
          },
          25
        );
    }
  });
  return this;
};

$(document).on("keyup", event => {
  if (event.originalEvent.getModifierState("CapsLock")) {
    $("#capsindicator").css('display', 'inline-block');
  } else {
    $("#capsindicator").css('display', 'none');
  }
});
