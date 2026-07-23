
$(document).ready(function () {
  document.querySelectorAll('.hover-cycle').forEach(function (container) {
    var frames = container.querySelectorAll('.hover-frame');
    if (frames.length < 2) return;

    var FADE_MS = 300; // keep in sync with the .hover-frame transition duration
    var index = 0;
    var zCounter = 1;
    var intervalId = null;
    var fadeOutTimeout = null;
    var trigger = container.closest('.publication-block') || container;

    frames[0].style.zIndex = zCounter;

    function reset() {
      clearInterval(intervalId);
      clearTimeout(fadeOutTimeout);
      frames.forEach(function (frame, i) {
        frame.classList.toggle('active', i === 0);
        frame.style.zIndex = i === 0 ? 1 : '';
      });
      zCounter = 1;
      index = 0;
    }

    trigger.addEventListener('mouseenter', function () {
      intervalId = setInterval(function () {
        var previous = index;
        index = (index + 1) % frames.length;
        zCounter++;

        // Every other frame is already fully hidden beneath the outgoing
        // one, so it's safe to reset them right away for their next turn.
        frames.forEach(function (frame, i) {
          if (i !== previous && i !== index) frame.classList.remove('active');
        });

        // Stack the incoming frame above the outgoing one and only fade
        // it in; the outgoing frame stays fully opaque underneath until
        // the fade completes, so the page background never shows through.
        frames[index].style.zIndex = zCounter;
        frames[index].classList.add('active');

        clearTimeout(fadeOutTimeout);
        fadeOutTimeout = setTimeout(function () {
          frames[previous].classList.remove('active');
        }, FADE_MS);
      }, 700);
    });

    trigger.addEventListener('mouseleave', reset);
  });
})