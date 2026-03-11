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

/* SUBMIT FORMULARIO*/


const form = document.getElementById("evalForm");

if (form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const formData = new FormData(this);

        let resultadosModulo = [0,0,0,0,0,0];
        let totalCorrectas = 0;

        for(let pregunta in respuestasCorrectas) {
            const respuestaUsuario = formData.get(pregunta);

            if(!respuestaUsuario) {
                alert("Debes responder todas las preguntas.");
                return;
            }

            if (respuestaUsuario === respuestasCorrectas[pregunta]) {
                totalCorrectas++;

                const numeroPregunta = parseInt(pregunta.replace("q", ""));
                const indiceModulo = Math.floor((numeroPregunta - 1)/ 3);

                resultadosModulo[indiceModulo]++;
            }
        }

        /* PORCENTAJE POR MODULO */

        const porcentajesModulo = resultadosModulo.map(correctas => 
            Math.round((correctas/3)*100)
        );

        /* PORCENTAJE TOTAL */
        
        const porcentajeTotal = Math.round((totalCorrectas / 18) * 100);

        /* GUARDA RESULTADOS */

        localStorage.setItem("porcentajeTotal", porcentajeTotal);
        localStorage.setItem("porcentajesModulo", JSON.stringify(porcentajesModulo));

        /* IR AL RESULTADO */

        window.location.href = "resultado1.html";

    });
}

/* GRAFICO */


let chartInstance = null;

function generarGrafico(datos) {

    const canvas = document.getElementById("graficoResultados");

    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");

    if(chartInstance){
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx,{
        type: "bar",

        data:{
            labels:[
                "Módulo 1",
                "Módulo 2",
                "Módulo 3",
                "Módulo 4",
                "Módulo 5",
                "Módulo 6"
            ],

            datasets:[{

                data: datos,

                backgroudColor: [
                    "#0B4FA1",
                    "#2563EB",
                    "#3B82F6",
                    "#60A5FA",
                    "#93C5FD",
                    "#BFD8FE"
                ],

                borderRadius: 8,
                barThickness: 50
            }]
        },

        options: {
            responsive: true,

            Plugins:{
                legend:{
                    display:false
                }
            },

            tooltip: {
                callbacks: {
                    label: (context) => context.raw + "%"
                }
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                }
            },

            y: {
                beginAtZero: true,
                max: 100,

                ticks: {
                    callbacks: (value) => value + "%"
                }
            }
        }

    });
}    

/* RESULTADOS */

if (document.getElementById("graficoResultados")) {

    const porcentajeTotal = localStorage.getItem("porcentajeTotal");

    const porcentajesModulo = JSON.parse(localStorage.getItem("porcentajesModulo"));



    const porcentajeEl = document.getElementById("porcentajeFinal");

    if(porcentajeEl) {

        porcentajeEl.innerText = porcentajeTotal + "%";
    }

    generarGrafico(porcentajesModulo);
    }