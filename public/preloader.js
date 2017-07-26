function loadPleaseWait(url, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange === null;
        callback();
      }
    };
  } else {
    script.onload = () => {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

loadPleaseWait('/static/js/please-wait.min.js', () => {
  if (window.loading_screen === undefined) {
    window.loading_screen = window.pleaseWait({
      logo: '/static/media/logo.png',
      backgroundColor: '#35342f',
      loadingHtml: '<p class="loading-message">Amazing things come to those who wait</p>' +
      '<div class="sk-cube-grid">' +
      '<div class="sk-cube sk-cube1"></div>' +
      '<div class="sk-cube sk-cube2"></div>' +
      '<div class="sk-cube sk-cube3"></div>' +
      '<div class="sk-cube sk-cube4"></div>' +
      '<div class="sk-cube sk-cube5"></div>' +
      '<div class="sk-cube sk-cube6"></div>' +
      '<div class="sk-cube sk-cube7"></div>' +
      '<div class="sk-cube sk-cube8"></div>' +
      '<div class="sk-cube sk-cube9"></div>' +
      '</div>'
    });
  }
});
