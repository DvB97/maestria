# Orientación Vocacional 2026

Prototipo web interactivo de alta fidelidad para representar una experiencia de orientación vocacional dirigida a estudiantes de Lima Metropolitana y Piura. El proyecto sigue la documentación integral de los seis sprints y está pensado para evaluar usabilidad, comprensión y satisfacción.

## Alcance y tecnologías

- HTML5, CSS3 y JavaScript ES6+ sin frameworks.
- SPA estática, responsive y accesible mediante teclado.
- Datos ficticios centralizados en `js/mock-data.js`.
- Persistencia local con `localStorage` mediante `js/storage.js`.
- Sin backend, base de datos, autenticación, APIs, servicios cloud o librerías externas.

## Cómo ejecutar

La opción recomendada es iniciar un servidor estático desde esta carpeta:

```powershell
npx serve .
```

Luego abre la dirección indicada por el comando, normalmente `http://localhost:3000`. También puede abrirse `index.html` directamente; el servidor local evita restricciones particulares de algunos navegadores.

## Recorrido implementado

Inicio → privacidad y consentimiento → identificación simulada → perfil → instrucciones → evaluación de treinta preguntas → revisión y edición → procesamiento visual → resultados → catálogo → detalle → comparación/favoritos.

También incluye una guía de uso de siete pasos accesible desde el menú y desde Ayuda, FAQ, estados vacíos, validaciones, mensajes de confirmación y reinicio completo.

## Evaluación y resultados simulados

Las 30 preguntas tienen cuatro opciones y cada opción distribuye tres puntos entre ocho áreas: TEC, ING, CRE, COM, SOC, EDU, ADM y SAL. Los pesos se editan en `answerWeights` dentro de `js/mock-data.js`; los pesos de las 16 carreras (0–5, con cero implícito para áreas omitidas), en `careerWeights` del mismo archivo.

`js/scoring.js` calcula cada área como `100 × puntos obtenidos / máximo alcanzable en esa área` y cada afinidad como el promedio ponderado de esas áreas, sin redondeos intermedios. No hay bonificaciones por el interés escrito, bases artificiales ni azar. Los porcentajes son índices orientativos independientes, no probabilidades ni partes de un total de 100. Los empates en el porcentaje mostrado se resuelven por la suma de pesos de la carrera en las tres áreas predominantes con puntuación positiva y después por identificador estable. Los empates entre áreas siguen el orden de configuración.

Se mantienen los componentes visuales, las dos áreas destacadas y el Top 3 actuales. Las explicaciones muestran las dos áreas con mayor contribución a cada carrera. Las respuestas anteriores se conservan y los resultados antiguos se invalidan hasta completar las 30 preguntas; editar una respuesta también invalida el resultado. La vista previa de Inicio sigue siendo un ejemplo ilustrativo fijo.

La matriz es demostrativa y no está validada psicométricamente. El cuestionario propuesto contiene pocas opciones específicas de educación y salud y varias preguntas similares; normalizar por máximo no corrige esa limitación de contenido.

Ejecuta `node tests/scoring.cjs` para verificar las 120 opciones, los rangos de pesos y porcentajes, perfiles simulados, determinismo, desempates y recuperación de respuestas antiguas.

Este mecanismo no es Machine Learning, no entrena modelos y no realiza inferencias científicas. La pantalla de procesamiento representa conceptualmente cómo una eventual solución futura podría comunicar un proceso de análisis. Todos los resultados, porcentajes y recomendaciones están identificados como simulados y orientativos.

## Persistencia

`localStorage` conserva en el navegador: consentimiento, alias, perfil mínimo, respuestas, pregunta actual, resultados, favoritos y selección para comparación. La acción **Reiniciar experiencia** elimina esos datos.

## Estructura del repositorio

```text
prototipo-orientacion-vocacional/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   ├── app.js
│   ├── mock-data.js
│   └── storage.js
├── assets/
│   ├── imagenes/
│   └── iconos/
└── README.md
```

## Funcionalidades simuladas o no implementadas

- Son simulados: identificación, procesamiento, resultados, afinidades, catálogo de carreras y canal de orientación.
- No se implementan: autenticación real, backend, base de datos, ML/IA, entrenamiento o validación de modelos, APIs, contacto real, historial multisesión, datos oficiales de universidades ni análisis estadístico de usabilidad.
- La información de carreras debe validarse con fuentes institucionales antes de cualquier publicación real.

> Este proyecto corresponde a un prototipo interactivo de alta fidelidad. Sus resultados, afinidades y recomendaciones no representan predicciones generadas por un modelo de Machine Learning ni sustituyen la decisión personal o el acompañamiento vocacional profesional.
