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

    const errores = []

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
    }else if (num_doc1.value.length < 6) {
      errores.push('El número de documento debe tener al menos 6 dígitos');
    }

    if (!cargo.value){
      errores.push('Selecciones el cargo');
    }

    return errores;

  }

  const botones = document.querySelectorAll('.login-button');
  botones.forEach(boton => {
    boton.addEventListener('click', function(e) {
      e.preventDefault();

      const form = this.closest('form');
      const errores = validarFormulario(form);
      
      if (errores. length > 0) {
        alert('Por favor corrige los siguientes errores: \n\n' + errores.join('\n'));
      } else {
        alert('¡Formulario enviado exitosamente!');
        console.log('Formulario envialo correctamente')
      }
    });
  });
});
})();
  
