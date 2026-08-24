window.MockData = (() => {
  const areas = {
    tecnologia: { name: 'Tecnología', icon: '⌘', color: '#5b5bd6' },
    analisis: { name: 'Análisis', icon: '◇', color: '#247f78' },
    creatividad: { name: 'Creatividad', icon: '✦', color: '#d56a42' },
    comunicacion: { name: 'Comunicación', icon: '◌', color: '#3876b9' },
    organizacion: { name: 'Organización', icon: '▦', color: '#8260a8' },
    social: { name: 'Interés social', icon: '♡', color: '#c14b70' }
  };

  const option = (id, text, weights) => ({ id, text, weights });
  const questions = [
    { id: 1, text: 'Cuando enfrentas un reto nuevo, ¿qué actividad disfrutas más?', options: [option('a','Comprender cómo funciona y probar soluciones',{tecnologia:2,analisis:1}),option('b','Imaginar una propuesta original',{creatividad:2,comunicacion:1}),option('c','Conversar y ayudar a organizar al grupo',{social:2,organizacion:1}),option('d','Comparar datos antes de decidir',{analisis:2,organizacion:1})] },
    { id: 2, text: '¿Qué tipo de proyecto escolar elegirías primero?', options: [option('a','Crear una aplicación sencilla',{tecnologia:2,creatividad:1}),option('b','Investigar las causas de un problema',{analisis:2}),option('c','Diseñar una campaña visual',{creatividad:2,comunicacion:1}),option('d','Coordinar una iniciativa comunitaria',{social:2,organizacion:1})] },
    { id: 3, text: '¿Qué reconocimiento te representa mejor?', options: [option('a','Encuentro patrones que otros no ven',{analisis:2}),option('b','Explico ideas de forma clara',{comunicacion:2}),option('c','Propongo maneras diferentes de hacer las cosas',{creatividad:2}),option('d','Cumplo plazos y ordeno prioridades',{organizacion:2})] },
    { id: 4, text: 'En tu tiempo libre, ¿qué te atrae más?', options: [option('a','Explorar herramientas digitales',{tecnologia:2}),option('b','Leer, escribir o crear contenido',{creatividad:1,comunicacion:2}),option('c','Participar en actividades con otras personas',{social:2}),option('d','Resolver acertijos o juegos de estrategia',{analisis:2})] },
    { id: 5, text: 'Si un equipo se atasca, ¿qué aporte harías?', options: [option('a','Revisar el proceso paso a paso',{analisis:2,organizacion:1}),option('b','Proponer otra forma de abordar el reto',{creatividad:2}),option('c','Escuchar y facilitar acuerdos',{social:2,comunicacion:1}),option('d','Buscar una herramienta que automatice una parte',{tecnologia:2})] },
    { id: 6, text: '¿Qué entorno de aprendizaje prefieres?', options: [option('a','Laboratorio con retos prácticos',{tecnologia:2}),option('b','Taller creativo y abierto',{creatividad:2}),option('c','Debate y trabajo colaborativo',{comunicacion:1,social:2}),option('d','Plan estructurado con metas claras',{organizacion:2})] },
    { id: 7, text: '¿Qué resultado te daría mayor satisfacción?', options: [option('a','Una solución precisa y comprobable',{analisis:2,tecnologia:1}),option('b','Una experiencia que emocione',{creatividad:2,comunicacion:1}),option('c','Una mejora concreta para otras personas',{social:2}),option('d','Un proyecto bien coordinado y sostenible',{organizacion:2})] },
    { id: 8, text: '¿Qué habilidad te gustaría fortalecer?', options: [option('a','Programación y manejo de datos',{tecnologia:2,analisis:1}),option('b','Diseño y expresión visual',{creatividad:2}),option('c','Comunicación y liderazgo',{comunicacion:2,organizacion:1}),option('d','Escucha y acompañamiento',{social:2})] },
    { id: 9, text: 'Al tomar una decisión importante, ¿qué pesa más?', options: [option('a','La evidencia disponible',{analisis:2}),option('b','La posibilidad de innovar',{creatividad:2}),option('c','El impacto en las personas',{social:2}),option('d','La viabilidad y el orden del plan',{organizacion:2})] },
    { id: 10, text: '¿Cuál de estas tareas mantendría mejor tu atención?', options: [option('a','Configurar y mejorar un sistema',{tecnologia:2}),option('b','Interpretar información compleja',{analisis:2}),option('c','Presentar una idea ante un público',{comunicacion:2}),option('d','Planificar recursos y actividades',{organizacion:2})] }
  ];

  const careers = [
    { id:'sistemas', name:'Ingeniería de Sistemas', area:'tecnologia', base:78, description:'Diseña y mejora soluciones de software, información y procesos tecnológicos.', skills:['Pensamiento lógico','Resolución de problemas','Aprendizaje continuo'], fields:['Desarrollo de software','Análisis de sistemas','Gestión de tecnología'], profile:{creativity:'Media',analysis:'Alta',communication:'Media'} },
    { id:'datos', name:'Ciencia de Datos', area:'analisis', base:76, description:'Transforma datos en conocimiento mediante estadística, programación y comunicación visual.', skills:['Análisis cuantitativo','Programación','Curiosidad'], fields:['Analítica','Inteligencia de negocios','Investigación aplicada'], profile:{creativity:'Media',analysis:'Alta',communication:'Media'} },
    { id:'industrial', name:'Ingeniería Industrial', area:'organizacion', base:73, description:'Optimiza procesos, recursos y equipos dentro de organizaciones productivas y de servicios.', skills:['Planificación','Análisis de procesos','Liderazgo'], fields:['Operaciones','Calidad','Logística'], profile:{creativity:'Media',analysis:'Alta',communication:'Alta'} },
    { id:'grafico', name:'Diseño Gráfico', area:'creatividad', base:72, description:'Comunica ideas y experiencias por medio de recursos visuales y digitales.', skills:['Creatividad','Comunicación visual','Atención al detalle'], fields:['Identidad visual','Diseño editorial','Productos digitales'], profile:{creativity:'Alta',analysis:'Media',communication:'Alta'} },
    { id:'psicologia', name:'Psicología', area:'social', base:71, description:'Estudia el comportamiento y acompaña procesos de bienestar, aprendizaje y desarrollo humano.', skills:['Escucha activa','Empatía','Análisis cualitativo'], fields:['Educativa','Organizacional','Comunitaria'], profile:{creativity:'Media',analysis:'Alta',communication:'Alta'} },
    { id:'comunicacion', name:'Comunicación', area:'comunicacion', base:70, description:'Crea estrategias y contenidos para informar, conectar audiencias y construir significado.', skills:['Expresión oral y escrita','Investigación','Narrativa'], fields:['Comunicación digital','Audiovisual','Relaciones públicas'], profile:{creativity:'Alta',analysis:'Media',communication:'Alta'} },
    { id:'administracion', name:'Administración', area:'organizacion', base:69, description:'Gestiona personas, recursos y estrategias para alcanzar objetivos organizacionales.', skills:['Organización','Toma de decisiones','Negociación'], fields:['Gestión empresarial','Emprendimiento','Talento humano'], profile:{creativity:'Media',analysis:'Media',communication:'Alta'} },
    { id:'arquitectura', name:'Arquitectura', area:'creatividad', base:68, description:'Proyecta espacios funcionales y sensibles al contexto, integrando técnica y creatividad.', skills:['Visión espacial','Diseño','Planificación'], fields:['Diseño arquitectónico','Urbanismo','Construcción'], profile:{creativity:'Alta',analysis:'Alta',communication:'Media'} },
    { id:'medicina', name:'Medicina', area:'social', base:70, description:'Integra ciencias de la salud, análisis y servicio para prevenir, diagnosticar y acompañar el bienestar humano.', skills:['Empatía','Razonamiento científico','Responsabilidad'], fields:['Atención clínica','Salud pública','Investigación'], profile:{creativity:'Media',analysis:'Alta',communication:'Alta'} },
    { id:'derecho', name:'Derecho', area:'comunicacion', base:68, description:'Analiza normas y situaciones sociales para argumentar, mediar y contribuir a la justicia.', skills:['Argumentación','Lectura crítica','Negociación'], fields:['Asesoría jurídica','Gestión pública','Mediación'], profile:{creativity:'Media',analysis:'Alta',communication:'Alta'} },
    { id:'marketing', name:'Marketing', area:'comunicacion', base:69, description:'Investiga audiencias y crea estrategias para conectar productos, servicios e ideas con las personas.', skills:['Comunicación','Creatividad','Análisis de mercado'], fields:['Marketing digital','Investigación de mercados','Gestión de marca'], profile:{creativity:'Alta',analysis:'Media',communication:'Alta'} },
    { id:'contabilidad', name:'Contabilidad y Finanzas', area:'analisis', base:67, description:'Organiza e interpreta información financiera para apoyar decisiones responsables en organizaciones.', skills:['Precisión','Análisis numérico','Organización'], fields:['Auditoría','Finanzas corporativas','Tributación'], profile:{creativity:'Baja',analysis:'Alta',communication:'Media'} },
    { id:'educacion', name:'Educación', area:'social', base:70, description:'Diseña experiencias de aprendizaje y acompaña el desarrollo de personas y comunidades.', skills:['Comunicación','Empatía','Planificación'], fields:['Docencia','Gestión educativa','Innovación pedagógica'], profile:{creativity:'Alta',analysis:'Media',communication:'Alta'} },
    { id:'ambiental', name:'Ingeniería Ambiental', area:'tecnologia', base:69, description:'Aplica ciencia y tecnología para prevenir impactos y desarrollar soluciones ambientales sostenibles.', skills:['Pensamiento sistémico','Análisis científico','Compromiso social'], fields:['Gestión ambiental','Tratamiento de recursos','Sostenibilidad'], profile:{creativity:'Media',analysis:'Alta',communication:'Media'} },
    { id:'enfermeria', name:'Enfermería', area:'social', base:69, description:'Brinda cuidado integral y educación en salud mediante conocimiento científico, organización y empatía.', skills:['Cuidado humano','Trabajo en equipo','Atención al detalle'], fields:['Cuidado clínico','Salud comunitaria','Gestión sanitaria'], profile:{creativity:'Media',analysis:'Media',communication:'Alta'} },
    { id:'economia', name:'Economía', area:'analisis', base:68, description:'Estudia cómo personas y organizaciones toman decisiones y utilizan recursos en distintos contextos.', skills:['Análisis cuantitativo','Pensamiento crítico','Investigación'], fields:['Política económica','Consultoría','Análisis financiero'], profile:{creativity:'Media',analysis:'Alta',communication:'Media'} }
  ];

  const careerWeights = {
    sistemas:{tecnologia:5,analisis:3,creatividad:1}, datos:{analisis:5,tecnologia:3,comunicacion:1}, industrial:{organizacion:4,analisis:3,comunicacion:1},
    grafico:{creatividad:5,comunicacion:3,tecnologia:1}, psicologia:{social:5,comunicacion:3,analisis:2}, comunicacion:{comunicacion:5,creatividad:3,social:1},
    administracion:{organizacion:4,comunicacion:3,analisis:2}, arquitectura:{creatividad:4,analisis:3,organizacion:2}, medicina:{social:4,analisis:4,organizacion:1},
    derecho:{comunicacion:4,analisis:3,social:2}, marketing:{comunicacion:4,creatividad:4,analisis:1}, contabilidad:{analisis:5,organizacion:4},
    educacion:{social:5,comunicacion:4,creatividad:1}, ambiental:{analisis:4,tecnologia:3,social:2}, enfermeria:{social:5,organizacion:2,comunicacion:2},
    economia:{analisis:5,organizacion:2,comunicacion:1}
  };
  careers.forEach(career => { career.weights = careerWeights[career.id]; });

  const faqs = [
    ['¿Es una prueba vocacional oficial?','No. Es una maqueta académica para evaluar la experiencia de uso. Sus resultados son demostrativos.'],
    ['¿Cómo se generan los resultados?','Las opciones suman puntos a seis áreas y una regla sencilla los normaliza. No interviene Machine Learning real.'],
    ['¿Una carrera con mayor afinidad es mi carrera ideal?','No. La afinidad simulada solo ayuda a ordenar alternativas para explorar y conversar con un orientador.'],
    ['¿Qué datos se almacenan?','Solo los datos ficticios que ingreses, respuestas, resultados y favoritos en el almacenamiento local de este navegador.'],
    ['¿Puedo cambiar mis respuestas?','Sí. Antes de confirmar puedes editar cualquier pregunta; también puedes reiniciar toda la experiencia.']
  ];
  return { areas, questions, careers, faqs };
})();
