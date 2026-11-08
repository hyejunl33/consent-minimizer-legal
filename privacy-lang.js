// Keeps the privacy pages in the visitor's language.
//
// Loaded by privacy.html (Korean) and privacy-en.html (English). If the browser
// prefers a language that does not match the page, it swaps to the other file.
// The language switcher passes ?lang=ko or ?lang=en, which is remembered.
//
// This lives in an external file on purpose: Manifest V3 blocks inline scripts
// on extension pages, and these same pages ship inside the extension.
(function () {
  var isEnglishPage = /privacy-en\.html$/.test(location.pathname);
  var page = isEnglishPage ? 'en' : 'ko';
  var params = new URLSearchParams(location.search);
  var forced = params.get('lang');
  var stored = null;

  try {
    if (forced === 'ko' || forced === 'en') {
      localStorage.setItem('dtm-lang', forced);
      params.delete('lang');
      var query = params.toString();
      history.replaceState(null, '', location.pathname + (query ? '?' + query : '') + location.hash);
    }
    stored = localStorage.getItem('dtm-lang');
  } catch (error) {
    // Private mode or a blocked storage API: fall back to the browser language.
  }

  var languages =
    navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
  var prefersKo = languages.some(function (language) {
    return String(language).toLowerCase().indexOf('ko') === 0;
  });
  var preferred = stored === 'ko' || stored === 'en' ? stored : prefersKo ? 'ko' : 'en';

  if (preferred !== page) {
    location.replace((preferred === 'en' ? 'privacy-en.html' : 'privacy.html') + location.hash);
  }
})();
