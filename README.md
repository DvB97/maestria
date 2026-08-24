# Brújula Vocacional 2026

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

Inicio → privacidad y consentimiento → identificación simulada → perfil → instrucciones → evaluación de diez preguntas → revisión y edición → procesamiento visual → resultados → catálogo → detalle → comparación/favoritos.

También incluye una guía de uso de siete pasos accesible desde el menú y desde Ayuda, FAQ, estados vacíos, validaciones, mensajes de confirmación y reinicio completo.

## Evaluación y resultados simulados

Cada opción suma pesos simples a una o más de seis áreas: tecnología, análisis, creatividad, comunicación, organización e interés social. Al confirmar, JavaScript totaliza y normaliza esos pesos para crear porcentajes demostrativos. Las 16 carreras tienen combinaciones distintas de esas áreas; su afinidad pondera varias dimensiones, considera de forma leve el interés inicial escrito y muestra las dos coincidencias principales como explicación.

Este mecanismo no es Machine Learning, no entrena modelos y no realiza inferencias científicas. La pantalla de procesamiento representa conceptualmente cómo una eventual solución futura podría comunicar un proceso de análisis. Todos los resultados, porcentajes y recomendaciones están identificados como simulados y orientativos.

## Persistencia

`localStorage` conserva en el navegador: consentimiento, alias, perfil mínimo, respuestas, pregunta actual, resultados, favoritos y selección para comparación. La acción **Reiniciar experiencia** elimina esos datos.

## Estructura

```text
index.html
css/
  styles.css
js/
  app.js
  mock-data.js
  storage.js
assets/
```

## Funcionalidades simuladas o no implementadas

- Son simulados: identificación, procesamiento, resultados, afinidades, catálogo de carreras y canal de orientación.
- No se implementan: autenticación real, backend, base de datos, ML/IA, entrenamiento o validación de modelos, APIs, contacto real, historial multisesión, datos oficiales de universidades ni análisis estadístico de usabilidad.
- La información de carreras debe validarse con fuentes institucionales antes de cualquier publicación real.

> Este proyecto corresponde a un prototipo interactivo de alta fidelidad. Sus resultados, afinidades y recomendaciones no representan predicciones generadas por un modelo de Machine Learning ni sustituyen la decisión personal o el acompañamiento vocacional profesional.
"# maestria" 
