const browserSupportsAllFeatures = () => !!window.Intl;

const loadPolyFills = callback => {
  const js = document.createElement('script');
  js.src = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${process.env.NODE_LOCALE}`;
  js.onload = function () {
    callback();
  };
  document.head.appendChild(js);
};

module.exports.loadPolyFills = loadPolyFills;
module.exports.browserSupportsAllFeatures = browserSupportsAllFeatures;
