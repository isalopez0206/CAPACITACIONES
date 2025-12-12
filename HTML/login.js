// login.js — muestra solo el formulario correspondiente según ?area=tat|tym
(function () {
  // Esperar a que el DOM esté listo
  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  onReady(function () {
    const params = new URLSearchParams(window.location.search);
    const area = (params.get('area') || '').toLowerCase();
    const formTat = document.getElementById('login-tat');
    const formTym = document.getElementById('login-tym');
    if (!formTat || !formTym) return;

    // Ocultar ambos por defecto (CSS ya lo hace, esto es por seguridad)
    formTat.style.display = 'none';
    formTym.style.display = 'none';

    if (area === 'tat') {
      formTat.style.display = 'block';
      document.title = 'Login TAT';
    } else if (area === 'tym') {
      formTym.style.display = 'block';
      document.title = 'Login TYM';
    } else {
      // Si no se especifica, mostrar TAT por defecto
      formTat.style.display = 'block';
      document.title = 'Login TAT';
    }
  });
})();
