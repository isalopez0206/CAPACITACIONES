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
    // Mostrar solo el formulario correspondiente según ?area=tat|tym
    try {
      const params = new URLSearchParams(location.search);
      const area = params.get('area');
      const formTat = document.getElementById('login-tat');
      const formTym = document.getElementById('login-tym');
      if (area === 'tat' || area === 'tym') {
        if (formTat) formTat.style.display = area === 'tat' ? 'block' : 'none';
        if (formTym) formTym.style.display = area === 'tym' ? 'block' : 'none';
      }
    } catch (e) {
      // silencioso si URLSearchParams falla en entornos raros
      console.warn('No se pudo leer area param:', e);
    }


    function filtrarNombre(input) {
      input.value = input.value.replace(/[^a-záéíóúñA-ZÁÉÍÓÚÑ\s]/g, '');
    }

    function filtrarNumeros(input) {
      input.value = input.value.replace(/[^0-9]/g, '');
    }

    const nombre1 = document.getElementById('nombre1');
    const nombre2 = document.getElementById('nombre2');
    const num_doc1 = document.getElementById('num_doc1');
    const num_doc2 = document.getElementById('num_doc2');

    if (nombre1) nombre1.addEventListener('input', function() {filtrarNombre(this); });
    if (nombre2) nombre2.addEventListener('input', function() {filtrarNombre(this); });
    if (num_doc1) num_doc1.addEventListener('input', function() {filtrarNumeros(this); });
    if (num_doc2) num_doc2.addEventListener('input', function() {filtrarNumeros(this); });

    function validarFormulario(form) {
      const nombre = form.querySelector('[id^="nombre"]');
      const tipo_doc = form.querySelector('[id^="tipo_doc"]');
      const num_doc = form.querySelector('[id^="num_doc"]');
      const cargo = form.querySelector('[id^="cargo"]');
      const errores = [];

      if (!nombre.value.trim()) {
        errores.push ('El nombre completo es obligatorio.');
      }else if (nombre.value.trim().length < 3 ) {
        errores.push('El nombre debe tener al menos 3 carácteres');
      }

      if (!tipo_doc.value.trim()){
        errores.push('Seleccione un tipo de documento');
      }

      if (!num_doc.value.trim()) {
        errores.push('El número de documento es obligatorio');
      } else if (num_doc.value.length < 6) {
        errores.push('El número de documento debe tener al menos 6 dígitos');
      }

      if (!cargo.value){
        errores.push('Selecciones el cargo');
      }

      return errores;
    }

    function recopilaDatos(form){
      const nombre = form.querySelector('[id^="nombre"]').value.trim();
      const tipo_doc = form.querySelector('[id^=tipo_doc]').value;
      const num_doc = form.querySelector('[id^=num_doc]').value;
      const cargo = form.querySelector('[id^=cargo]').value;
      const area = new URLSearchParams(location.search).get('area') || 'desconocido';

      return {
        nombre, 
        tipo_doc, 
        num_doc,
        cargo,
        area,
        fecha: new Date().toISOString()
      };
    }

  const botones = document.querySelectorAll('.login-button');
  botones.forEach(boton => {
    boton.addEventListener('click', function(e) {
      e.preventDefault();

      const form = this.closest('form');
      const errores = validarFormulario(form);
      
      if (errores.length > 0) {
        alert('Por favor corrige los siguientes errores: \n\n' + errores.join('\n'));
        return;
      }

      const datos = recopilaDatos(form);

      console.log('Daros a enviar a la BD', datos);

      localStorage.setItem('usuarioActual', JSON.stringify(datos));

      window.location.href = '../HTML/mode_capacitation.html';
      
    });
  });
});
})();
  
