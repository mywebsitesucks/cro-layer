/*! CRO Layer MVP - v0.1 */
(function() {
  try {
    var scriptEl = document.currentScript || (function() {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
    var enabled = (scriptEl.getAttribute('data-enabled') || 'true') === 'true';
    if (!enabled) return;
    var optimizedUrl = window.__CRO_LAYER_URL__ || scriptEl.getAttribute('data-url');
    if (!optimizedUrl) {
      console.warn('[CRO Layer] No optimized URL provided.');
      return;
    }
    var keepScripts = (scriptEl.getAttribute('data-keep-scripts') || 'true') === 'true';
    function swapDocument(htmlText) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlText, 'text/html');
      try { document.head.innerHTML = doc.head.innerHTML; } catch(e) {}
      var newBody = doc.body;
      if (!keepScripts) {
        Array.from(newBody.querySelectorAll('script')).forEach(function(s){ s.remove(); });
      }
      document.body.replaceWith(newBody);
    }
    fetch(optimizedUrl)
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(html => swapDocument(html))
      .catch(err => console.warn('[CRO Layer] Failed:', err));
  } catch (err) {
    console.warn('[CRO Layer] Fatal error:', err);
  }
})();