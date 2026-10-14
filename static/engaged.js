// Sends one Umami "engaged" event per page load, once the page has been visible for 10 s
// and the visitor has used a pointer, touch, wheel or key. Renderers that only execute
// the page rarely do both, so engaged visitors are the number to trust over raw pageviews.
// Scroll isn't counted (scripted scrolling fires it too), and neither are events a script
// dispatches itself (isTrusted is false for those).
(function () {
  // Once per page, even if a single-page app re-inserts the script tag.
  if (window.__engagedTimer) return;
  window.__engagedTimer = true;

  var NEED_MS = 10000;
  var STEP_MS = 1000;
  var visibleMs = 0;
  var input = false;
  var INPUTS = ["pointerdown", "pointermove", "touchstart", "wheel", "keydown"];

  function onInput(e) {
    if (!e.isTrusted) return;
    input = true;
    INPUTS.forEach(function (t) { removeEventListener(t, onInput, true); });
  }
  INPUTS.forEach(function (t) { addEventListener(t, onInput, { capture: true, passive: true }); });

  var timer = setInterval(function () {
    if (document.visibilityState === "visible") visibleMs += STEP_MS;
    if (visibleMs < NEED_MS || !input || !window.umami) return;
    clearInterval(timer);
    window.umami.track("engaged");
  }, STEP_MS);
})();
