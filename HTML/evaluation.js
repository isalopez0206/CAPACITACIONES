/* SCROLL AL FROM */

document.getElementById('startBtn')?.addEventListener('click', () => {
    document.getElementById('evalForm')?.scrollIntoView({
        behavior: 'smooth', 
        block: 'start'
    });
});

/* RESPUESTAS CORRECTAS */


const respuestasCorrectas = {
    q1: "B",
    q2: "B",
    q3: "D",
    q4: "C",
    q5: "C",
    q6: "B",
    q7: "B",
    q8: "C",
    q9: "A",
    q10: "C",
    q11: "C",
    q12: "C",
    q13: "B",
    q14: "B",
    q15: "B",
    q16: "B",
    q17: "B",
    q18: "B"
};

/* SUBMIT */


document.getElementById("evalForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    let resultadosModulo = [0,0,0,0,0,0];
    let totalCorrectas = 0;
    
    for (let pregunta in respuestasCorrectas) {
        const respuestasUsuario = formData.get(pregunta);

        if (!respuestasUsuario) {
            alert("Debes responder todas las pregunatas.");
            return;
        }

        if(respuestasUsuario === respuestasCorrectas[pregunta]) {
            totalCorrectas++;

            const numeroPregunta = parseInt(pregunta.replace("q", ""));
            const indiceModulo = Math.floor((numeroPregunta - 1) / 3);

            resultadosModulo[indiceModulo]++;
        }

    }

    const porcentajesModulo = resultadosModulo.map(correctas => (correctas / 3) * 100);
    const porcentajeTotal = (totalCorrectas /18) * 100;

    loscalStorage.setItem("porcentajeTotal", porcentajeTotal);
    localStorage.setItem("porcentajesModulo", JSON.stringify(porcentajesModulo));

    window.location.href = "resultado.html";
});

/* GRAFICO */


let charInstance = null;

function generarGrafico(datos) {
    const ctx = document.getElementById("graficoResultados").getContext("2d");

    if (charInstance) {
        charInstance.destroy();
    }

    charInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Módulo 1",
                "Módulo 2",
                "Módulo 3",
                "Módulo 4",
                "Módulo 5",
                "Módulo 6"
            ],
            datasets: [{
                label: "Resultado por módulo (%)",
                data: datos,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

/* RESULTADOS */

if (window.location.pathname.includes("resultado.html")) {
    const porcentajeTotal = localStorage.getItem("porcentajeTotal");
    const porcentajesModulo = JSON.parse(localStorage.getItem("porcentajesModulo"));

    if (porcentajeTotal && porcentajesModulo) {
        const porcentajeEl = document.getElementById("porcentajeFinal");

        if(porcentajeEl) {
            porcentajeEl.innerText =
            parseFloat(porcentajeTotal).toFixed(2) + "%";
        }

        generarGrafico(porcentajesModulo);
    }
 }