window.MockData = (() => {
  const areas = {
  "TEC": {
    "name": "Tecnología e Informática",
    "icon": "⌘",
    "color": "#3D5AFE"
  },
  "ING": {
    "name": "Ingeniería y Ciencias Exactas",
    "icon": "◇",
    "color": "#7C4DFF"
  },
  "CRE": {
    "name": "Diseño, Arte y Creatividad",
    "icon": "✦",
    "color": "#F59E0B"
  },
  "COM": {
    "name": "Comunicación y Letras",
    "icon": "◌",
    "color": "#2E9D62"
  },
  "SOC": {
    "name": "Ciencias Sociales y Humanas",
    "icon": "♡",
    "color": "#D64545"
  },
  "EDU": {
    "name": "Educación y Orientación",
    "icon": "♡",
    "color": "#2E9D62"
  },
  "ADM": {
    "name": "Administración, Negocios y Finanzas",
    "icon": "▦",
    "color": "#252A33"
  },
  "SAL": {
    "name": "Salud y apoyo a personas",
    "icon": "♡",
    "color": "#D64545"
  }
};
  const answerWeights = {
  "1": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "ADM": 1
    },
    "d": {
      "ING": 2,
      "ADM": 1
    }
  },
  "2": {
    "a": {
      "TEC": 3
    },
    "b": {
      "ING": 2,
      "SOC": 1
    },
    "c": {
      "CRE": 2,
      "COM": 1
    },
    "d": {
      "SOC": 2,
      "ADM": 1
    }
  },
  "3": {
    "a": {
      "ING": 3
    },
    "b": {
      "COM": 2,
      "EDU": 1
    },
    "c": {
      "CRE": 3
    },
    "d": {
      "ADM": 3
    }
  },
  "4": {
    "a": {
      "TEC": 3
    },
    "b": {
      "COM": 2,
      "CRE": 1
    },
    "c": {
      "SOC": 3
    },
    "d": {
      "ING": 3
    }
  },
  "5": {
    "a": {
      "ING": 2,
      "ADM": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "COM": 1
    },
    "d": {
      "TEC": 3
    }
  },
  "6": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "COM": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "7": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 2,
      "COM": 1
    },
    "c": {
      "SOC": 2,
      "SAL": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "8": {
    "a": {
      "TEC": 2,
      "ING": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "COM": 2,
      "ADM": 1
    },
    "d": {
      "SAL": 2,
      "SOC": 1
    }
  },
  "9": {
    "a": {
      "ING": 3
    },
    "b": {
      "CRE": 2,
      "TEC": 1
    },
    "c": {
      "SOC": 2,
      "SAL": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "10": {
    "a": {
      "TEC": 3
    },
    "b": {
      "ING": 3
    },
    "c": {
      "COM": 3
    },
    "d": {
      "ADM": 3
    }
  },
  "11": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "COM": 2,
      "EDU": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "12": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 2,
      "COM": 1
    },
    "c": {
      "COM": 2,
      "SOC": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "13": {
    "a": {
      "TEC": 3
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "SAL": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "14": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "COM": 2,
      "SOC": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "15": {
    "a": {
      "TEC": 2,
      "ING": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 3
    },
    "d": {
      "ADM": 3
    }
  },
  "16": {
    "a": {
      "TEC": 2,
      "ING": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "COM": 2,
      "ADM": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "17": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "COM": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "18": {
    "a": {
      "TEC": 2,
      "ING": 1
    },
    "b": {
      "CRE": 2,
      "COM": 1
    },
    "c": {
      "EDU": 1,
      "SAL": 1,
      "SOC": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "19": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "EDU": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "20": {
    "a": {
      "ING": 3
    },
    "b": {
      "CRE": 1,
      "COM": 1,
      "SOC": 1
    },
    "c": {
      "SOC": 2,
      "COM": 1
    },
    "d": {
      "ADM": 2,
      "ING": 1
    }
  },
  "21": {
    "a": {
      "TEC": 2,
      "ING": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "ADM": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "22": {
    "a": {
      "ING": 3
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "COM": 2,
      "SOC": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "23": {
    "a": {
      "TEC": 2,
      "ING": 1
    },
    "b": {
      "CRE": 2,
      "COM": 1
    },
    "c": {
      "SOC": 2,
      "COM": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "24": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "COM": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "25": {
    "a": {
      "TEC": 3
    },
    "b": {
      "CRE": 2,
      "COM": 1
    },
    "c": {
      "SOC": 2,
      "SAL": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "26": {
    "a": {
      "ING": 3
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 1,
      "EDU": 1,
      "SAL": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "27": {
    "a": {
      "ING": 2,
      "ADM": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "COM": 2,
      "SOC": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "28": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 2,
      "SAL": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "29": {
    "a": {
      "TEC": 2,
      "ING": 1
    },
    "b": {
      "CRE": 2,
      "COM": 1
    },
    "c": {
      "EDU": 2,
      "SOC": 1
    },
    "d": {
      "ADM": 3
    }
  },
  "30": {
    "a": {
      "ING": 2,
      "TEC": 1
    },
    "b": {
      "CRE": 3
    },
    "c": {
      "SOC": 1,
      "SAL": 1,
      "EDU": 1
    },
    "d": {
      "ADM": 3
    }
  }
};
  const questions = [
  {
    "id": 1,
    "text": "Cuando enfrentas un reto nuevo, ¿qué actividad disfrutas más?",
    "options": [
      {
        "id": "a",
        "text": "Comprender cómo funciona y probar soluciones"
      },
      {
        "id": "b",
        "text": "Imaginar una propuesta original"
      },
      {
        "id": "c",
        "text": "Conversar y ayudar a organizar al grupo"
      },
      {
        "id": "d",
        "text": "Comparar datos antes de decidir"
      }
    ]
  },
  {
    "id": 2,
    "text": "¿Qué tipo de proyecto escolar elegirías primero?",
    "options": [
      {
        "id": "a",
        "text": "Crear una aplicación sencilla"
      },
      {
        "id": "b",
        "text": "Investigar las causas de un problema"
      },
      {
        "id": "c",
        "text": "Diseñar una campaña visual"
      },
      {
        "id": "d",
        "text": "Coordinar una iniciativa comunitaria"
      }
    ]
  },
  {
    "id": 3,
    "text": "¿Qué reconocimiento te representa mejor?",
    "options": [
      {
        "id": "a",
        "text": "Encuentro patrones que otros no ven"
      },
      {
        "id": "b",
        "text": "Explico ideas de forma clara"
      },
      {
        "id": "c",
        "text": "Propongo maneras diferentes de hacer las cosas"
      },
      {
        "id": "d",
        "text": "Cumplo plazos y ordeno prioridades"
      }
    ]
  },
  {
    "id": 4,
    "text": "En tu tiempo libre, ¿qué te atrae más?",
    "options": [
      {
        "id": "a",
        "text": "Explorar herramientas digitales"
      },
      {
        "id": "b",
        "text": "Leer, escribir o crear contenido"
      },
      {
        "id": "c",
        "text": "Participar en actividades con otras personas"
      },
      {
        "id": "d",
        "text": "Resolver acertijos o juegos de estrategia"
      }
    ]
  },
  {
    "id": 5,
    "text": "Si un equipo se atasca, ¿qué aporte harías?",
    "options": [
      {
        "id": "a",
        "text": "Revisar el proceso paso a paso"
      },
      {
        "id": "b",
        "text": "Proponer otra forma de abordar el reto"
      },
      {
        "id": "c",
        "text": "Escuchar y facilitar acuerdos"
      },
      {
        "id": "d",
        "text": "Buscar una herramienta que automatice una parte"
      }
    ]
  },
  {
    "id": 6,
    "text": "¿Qué entorno de aprendizaje prefieres?",
    "options": [
      {
        "id": "a",
        "text": "Laboratorio con retos prácticos"
      },
      {
        "id": "b",
        "text": "Taller creativo y abierto"
      },
      {
        "id": "c",
        "text": "Debate y trabajo colaborativo"
      },
      {
        "id": "d",
        "text": "Plan estructurado con metas claras"
      }
    ]
  },
  {
    "id": 7,
    "text": "¿Qué resultado te daría mayor satisfacción?",
    "options": [
      {
        "id": "a",
        "text": "Una solución precisa y comprobable"
      },
      {
        "id": "b",
        "text": "Una experiencia que emocione"
      },
      {
        "id": "c",
        "text": "Una mejora concreta para otras personas"
      },
      {
        "id": "d",
        "text": "Un proyecto bien coordinado y sostenible"
      }
    ]
  },
  {
    "id": 8,
    "text": "¿Qué habilidad te gustaría fortalecer?",
    "options": [
      {
        "id": "a",
        "text": "Programación y manejo de datos"
      },
      {
        "id": "b",
        "text": "Diseño y expresión visual"
      },
      {
        "id": "c",
        "text": "Comunicación y liderazgo"
      },
      {
        "id": "d",
        "text": "Escucha y acompañamiento"
      }
    ]
  },
  {
    "id": 9,
    "text": "Al tomar una decisión importante, ¿qué pesa más?",
    "options": [
      {
        "id": "a",
        "text": "La evidencia disponible"
      },
      {
        "id": "b",
        "text": "La posibilidad de innovar"
      },
      {
        "id": "c",
        "text": "El impacto en las personas"
      },
      {
        "id": "d",
        "text": "La viabilidad y el orden del plan"
      }
    ]
  },
  {
    "id": 10,
    "text": "¿Cuál de estas tareas mantendría mejor tu atención?",
    "options": [
      {
        "id": "a",
        "text": "Configurar y mejorar un sistema"
      },
      {
        "id": "b",
        "text": "Interpretar información compleja"
      },
      {
        "id": "c",
        "text": "Presentar una idea ante un público"
      },
      {
        "id": "d",
        "text": "Planificar recursos y actividades"
      }
    ]
  },
  {
    "id": 11,
    "text": "¿Qué actividad escogerías para participar en una feria escolar?",
    "options": [
      {
        "id": "a",
        "text": "Presentar un experimento o prototipo tecnológico"
      },
      {
        "id": "b",
        "text": "Crear el diseño visual del stand"
      },
      {
        "id": "c",
        "text": "Explicar el proyecto a los visitantes"
      },
      {
        "id": "d",
        "text": "Organizar los materiales y el cronograma"
      }
    ]
  },
  {
    "id": 12,
    "text": "Cuando tienes mucha información, ¿qué prefieres hacer?",
    "options": [
      {
        "id": "a",
        "text": "Clasificarla y buscar relaciones entre los datos"
      },
      {
        "id": "b",
        "text": "Convertirla en una presentación creativa"
      },
      {
        "id": "c",
        "text": "Compartirla y discutirla con otras personas"
      },
      {
        "id": "d",
        "text": "Resumirla y organizarla en un plan"
      }
    ]
  },
  {
    "id": 13,
    "text": "¿Qué tipo de problema te interesa resolver más?",
    "options": [
      {
        "id": "a",
        "text": "Uno relacionado con tecnología o funcionamiento de sistemas"
      },
      {
        "id": "b",
        "text": "Uno que requiera creatividad y nuevas ideas"
      },
      {
        "id": "c",
        "text": "Uno que afecte el bienestar de un grupo de personas"
      },
      {
        "id": "d",
        "text": "Uno relacionado con organización y uso de recursos"
      }
    ]
  },
  {
    "id": 14,
    "text": "¿Qué papel asumirías con mayor comodidad en un proyecto grupal?",
    "options": [
      {
        "id": "a",
        "text": "Analizar los aspectos técnicos"
      },
      {
        "id": "b",
        "text": "Desarrollar las ideas creativas"
      },
      {
        "id": "c",
        "text": "Motivar y comunicar al equipo"
      },
      {
        "id": "d",
        "text": "Coordinar las tareas y los tiempos"
      }
    ]
  },
  {
    "id": 15,
    "text": "¿Qué tipo de contenido despierta más tu curiosidad?",
    "options": [
      {
        "id": "a",
        "text": "Tecnología, ciencia y descubrimientos"
      },
      {
        "id": "b",
        "text": "Arte, diseño y nuevas tendencias"
      },
      {
        "id": "c",
        "text": "Sociedad, cultura y comportamiento humano"
      },
      {
        "id": "d",
        "text": "Negocios, organización y emprendimiento"
      }
    ]
  },
  {
    "id": 16,
    "text": "Si pudieras asistir a un taller, ¿cuál escogerías?",
    "options": [
      {
        "id": "a",
        "text": "Programación y robótica"
      },
      {
        "id": "b",
        "text": "Fotografía, dibujo o diseño"
      },
      {
        "id": "c",
        "text": "Liderazgo y comunicación"
      },
      {
        "id": "d",
        "text": "Administración y planificación de proyectos"
      }
    ]
  },
  {
    "id": 17,
    "text": "Cuando algo no funciona como esperabas, ¿qué haces primero?",
    "options": [
      {
        "id": "a",
        "text": "Revisar qué parte del proceso falló"
      },
      {
        "id": "b",
        "text": "Probar una solución diferente y creativa"
      },
      {
        "id": "c",
        "text": "Consultar con otras personas"
      },
      {
        "id": "d",
        "text": "Reorganizar las tareas y prioridades"
      }
    ]
  },
  {
    "id": 18,
    "text": "¿Qué actividad laboral te parecería más interesante?",
    "options": [
      {
        "id": "a",
        "text": "Diseñar o mejorar sistemas tecnológicos"
      },
      {
        "id": "b",
        "text": "Crear contenido visual o audiovisual"
      },
      {
        "id": "c",
        "text": "Orientar o atender a personas"
      },
      {
        "id": "d",
        "text": "Gestionar proyectos, recursos y equipos"
      }
    ]
  },
  {
    "id": 19,
    "text": "¿Qué aspecto valoras más al desarrollar un proyecto?",
    "options": [
      {
        "id": "a",
        "text": "Que funcione correctamente"
      },
      {
        "id": "b",
        "text": "Que sea original y atractivo"
      },
      {
        "id": "c",
        "text": "Que sea útil para otras personas"
      },
      {
        "id": "d",
        "text": "Que esté bien organizado y sea viable"
      }
    ]
  },
  {
    "id": 20,
    "text": "Si recibieras información contradictoria, ¿qué harías?",
    "options": [
      {
        "id": "a",
        "text": "Buscar datos y comprobar cuál es correcta"
      },
      {
        "id": "b",
        "text": "Explorar diferentes interpretaciones"
      },
      {
        "id": "c",
        "text": "Conversar con personas involucradas"
      },
      {
        "id": "d",
        "text": "Comparar ventajas y riesgos antes de decidir"
      }
    ]
  },
  {
    "id": 21,
    "text": "¿Qué desafío te gustaría asumir durante tus estudios?",
    "options": [
      {
        "id": "a",
        "text": "Construir una solución tecnológica"
      },
      {
        "id": "b",
        "text": "Crear un proyecto artístico original"
      },
      {
        "id": "c",
        "text": "Liderar una actividad para beneficiar a la comunidad"
      },
      {
        "id": "d",
        "text": "Administrar un proyecto con presupuesto y metas"
      }
    ]
  },
  {
    "id": 22,
    "text": "¿En qué situación sientes que aprovechas mejor tus capacidades?",
    "options": [
      {
        "id": "a",
        "text": "Cuando debo analizar y resolver problemas"
      },
      {
        "id": "b",
        "text": "Cuando puedo imaginar y crear algo nuevo"
      },
      {
        "id": "c",
        "text": "Cuando puedo comunicarme y colaborar con otros"
      },
      {
        "id": "d",
        "text": "Cuando puedo organizar y tomar decisiones"
      }
    ]
  },
  {
    "id": 23,
    "text": "¿Qué te gustaría aprender mediante un curso adicional?",
    "options": [
      {
        "id": "a",
        "text": "Análisis de datos o desarrollo de software"
      },
      {
        "id": "b",
        "text": "Diseño gráfico o producción audiovisual"
      },
      {
        "id": "c",
        "text": "Psicología, comunicación o relaciones humanas"
      },
      {
        "id": "d",
        "text": "Finanzas, gestión o emprendimiento"
      }
    ]
  },
  {
    "id": 24,
    "text": "¿Qué actividad realizarías con más entusiasmo durante varias horas?",
    "options": [
      {
        "id": "a",
        "text": "Resolver un problema lógico o técnico"
      },
      {
        "id": "b",
        "text": "Diseñar y perfeccionar una creación"
      },
      {
        "id": "c",
        "text": "Participar en una actividad con otras personas"
      },
      {
        "id": "d",
        "text": "Organizar información, tareas y recursos"
      }
    ]
  },
  {
    "id": 25,
    "text": "Si pudieras mejorar algo de tu comunidad, ¿cómo preferirías hacerlo?",
    "options": [
      {
        "id": "a",
        "text": "Desarrollando una solución tecnológica"
      },
      {
        "id": "b",
        "text": "Creando una campaña innovadora y atractiva"
      },
      {
        "id": "c",
        "text": "Trabajando directamente con las personas afectadas"
      },
      {
        "id": "d",
        "text": "Elaborando y coordinando un plan de acción"
      }
    ]
  },
  {
    "id": 26,
    "text": "¿Qué tipo de logro te haría sentir más orgulloso?",
    "options": [
      {
        "id": "a",
        "text": "Resolver un problema que parecía muy difícil"
      },
      {
        "id": "b",
        "text": "Crear algo original que llame la atención"
      },
      {
        "id": "c",
        "text": "Ayudar a alguien a superar una dificultad"
      },
      {
        "id": "d",
        "text": "Conseguir que un proyecto alcance sus objetivos"
      }
    ]
  },
  {
    "id": 27,
    "text": "¿Qué característica describe mejor tu forma de trabajar?",
    "options": [
      {
        "id": "a",
        "text": "Analítica y detallista"
      },
      {
        "id": "b",
        "text": "Creativa y flexible"
      },
      {
        "id": "c",
        "text": "Comunicativa y colaborativa"
      },
      {
        "id": "d",
        "text": "Organizada y orientada a resultados"
      }
    ]
  },
  {
    "id": 28,
    "text": "¿Qué tipo de decisión disfrutas tomar?",
    "options": [
      {
        "id": "a",
        "text": "Elegir la solución técnicamente más adecuada"
      },
      {
        "id": "b",
        "text": "Seleccionar la propuesta más original"
      },
      {
        "id": "c",
        "text": "Escoger la alternativa que beneficie a más personas"
      },
      {
        "id": "d",
        "text": "Determinar la opción más práctica y sostenible"
      }
    ]
  },
  {
    "id": 29,
    "text": "¿En qué espacio profesional te imaginarías trabajando?",
    "options": [
      {
        "id": "a",
        "text": "Una empresa tecnológica o centro de investigación"
      },
      {
        "id": "b",
        "text": "Un estudio creativo o agencia de comunicación"
      },
      {
        "id": "c",
        "text": "Una institución educativa, social o comunitaria"
      },
      {
        "id": "d",
        "text": "Una empresa, organización o área administrativa"
      }
    ]
  },
  {
    "id": 30,
    "text": "Al pensar en tu futuro profesional, ¿qué te gustaría que destacara más de tu trabajo?",
    "options": [
      {
        "id": "a",
        "text": "Mi capacidad para analizar y solucionar problemas"
      },
      {
        "id": "b",
        "text": "Mi creatividad y capacidad de innovación"
      },
      {
        "id": "c",
        "text": "Mi contribución al bienestar de otras personas"
      },
      {
        "id": "d",
        "text": "Mi capacidad para organizar, dirigir y obtener resultados"
      }
    ]
  }
];

  const careers = [
    { id: 'sistemas', name: 'Ingeniería de Sistemas', area: 'tecnologia', base: 78, description: 'Diseña y mejora soluciones de software, información y procesos tecnológicos.', skills: ['Pensamiento lógico', 'Resolución de problemas', 'Aprendizaje continuo'], fields: ['Desarrollo de software', 'Análisis de sistemas', 'Gestión de tecnología'], profile: { creativity: 'Media', analysis: 'Alta', communication: 'Media' } },
    { id: 'datos', name: 'Ciencia de Datos', area: 'analisis', base: 76, description: 'Transforma datos en conocimiento mediante estadística, programación y comunicación visual.', skills: ['Análisis cuantitativo', 'Programación', 'Curiosidad'], fields: ['Analítica', 'Inteligencia de negocios', 'Investigación aplicada'], profile: { creativity: 'Media', analysis: 'Alta', communication: 'Media' } },
    { id: 'industrial', name: 'Ingeniería Industrial', area: 'organizacion', base: 73, description: 'Optimiza procesos, recursos y equipos dentro de organizaciones productivas y de servicios.', skills: ['Planificación', 'Análisis de procesos', 'Liderazgo'], fields: ['Operaciones', 'Calidad', 'Logística'], profile: { creativity: 'Media', analysis: 'Alta', communication: 'Alta' } },
    { id: 'grafico', name: 'Diseño Gráfico', area: 'creatividad', base: 72, description: 'Comunica ideas y experiencias por medio de recursos visuales y digitales.', skills: ['Creatividad', 'Comunicación visual', 'Atención al detalle'], fields: ['Identidad visual', 'Diseño editorial', 'Productos digitales'], profile: { creativity: 'Alta', analysis: 'Media', communication: 'Alta' } },
    { id: 'psicologia', name: 'Psicología', area: 'social', base: 71, description: 'Estudia el comportamiento y acompaña procesos de bienestar, aprendizaje y desarrollo humano.', skills: ['Escucha activa', 'Empatía', 'Análisis cualitativo'], fields: ['Educativa', 'Organizacional', 'Comunitaria'], profile: { creativity: 'Media', analysis: 'Alta', communication: 'Alta' } },
    { id: 'comunicacion', name: 'Comunicación', area: 'comunicacion', base: 70, description: 'Crea estrategias y contenidos para informar, conectar audiencias y construir significado.', skills: ['Expresión oral y escrita', 'Investigación', 'Narrativa'], fields: ['Comunicación digital', 'Audiovisual', 'Relaciones públicas'], profile: { creativity: 'Alta', analysis: 'Media', communication: 'Alta' } },
    { id: 'administracion', name: 'Administración', area: 'organizacion', base: 69, description: 'Gestiona personas, recursos y estrategias para alcanzar objetivos organizacionales.', skills: ['Organización', 'Toma de decisiones', 'Negociación'], fields: ['Gestión empresarial', 'Emprendimiento', 'Talento humano'], profile: { creativity: 'Media', analysis: 'Media', communication: 'Alta' } },
    { id: 'arquitectura', name: 'Arquitectura', area: 'creatividad', base: 68, description: 'Proyecta espacios funcionales y sensibles al contexto, integrando técnica y creatividad.', skills: ['Visión espacial', 'Diseño', 'Planificación'], fields: ['Diseño arquitectónico', 'Urbanismo', 'Construcción'], profile: { creativity: 'Alta', analysis: 'Alta', communication: 'Media' } },
    { id: 'medicina', name: 'Medicina', area: 'social', base: 70, description: 'Integra ciencias de la salud, análisis y servicio para prevenir, diagnosticar y acompañar el bienestar humano.', skills: ['Empatía', 'Razonamiento científico', 'Responsabilidad'], fields: ['Atención clínica', 'Salud pública', 'Investigación'], profile: { creativity: 'Media', analysis: 'Alta', communication: 'Alta' } },
    { id: 'derecho', name: 'Derecho', area: 'comunicacion', base: 68, description: 'Analiza normas y situaciones sociales para argumentar, mediar y contribuir a la justicia.', skills: ['Argumentación', 'Lectura crítica', 'Negociación'], fields: ['Asesoría jurídica', 'Gestión pública', 'Mediación'], profile: { creativity: 'Media', analysis: 'Alta', communication: 'Alta' } },
    { id: 'marketing', name: 'Marketing', area: 'comunicacion', base: 69, description: 'Investiga audiencias y crea estrategias para conectar productos, servicios e ideas con las personas.', skills: ['Comunicación', 'Creatividad', 'Análisis de mercado'], fields: ['Marketing digital', 'Investigación de mercados', 'Gestión de marca'], profile: { creativity: 'Alta', analysis: 'Media', communication: 'Alta' } },
    { id: 'contabilidad', name: 'Contabilidad y Finanzas', area: 'analisis', base: 67, description: 'Organiza e interpreta información financiera para apoyar decisiones responsables en organizaciones.', skills: ['Precisión', 'Análisis numérico', 'Organización'], fields: ['Auditoría', 'Finanzas corporativas', 'Tributación'], profile: { creativity: 'Baja', analysis: 'Alta', communication: 'Media' } },
    { id: 'educacion', name: 'Educación', area: 'social', base: 70, description: 'Diseña experiencias de aprendizaje y acompaña el desarrollo de personas y comunidades.', skills: ['Comunicación', 'Empatía', 'Planificación'], fields: ['Docencia', 'Gestión educativa', 'Innovación pedagógica'], profile: { creativity: 'Alta', analysis: 'Media', communication: 'Alta' } },
    { id: 'ambiental', name: 'Ingeniería Ambiental', area: 'tecnologia', base: 69, description: 'Aplica ciencia y tecnología para prevenir impactos y desarrollar soluciones ambientales sostenibles.', skills: ['Pensamiento sistémico', 'Análisis científico', 'Compromiso social'], fields: ['Gestión ambiental', 'Tratamiento de recursos', 'Sostenibilidad'], profile: { creativity: 'Media', analysis: 'Alta', communication: 'Media' } },
    { id: 'enfermeria', name: 'Enfermería', area: 'social', base: 69, description: 'Brinda cuidado integral y educación en salud mediante conocimiento científico, organización y empatía.', skills: ['Cuidado humano', 'Trabajo en equipo', 'Atención al detalle'], fields: ['Cuidado clínico', 'Salud comunitaria', 'Gestión sanitaria'], profile: { creativity: 'Media', analysis: 'Media', communication: 'Alta' } },
    { id: 'economia', name: 'Economía', area: 'analisis', base: 68, description: 'Estudia cómo personas y organizaciones toman decisiones y utilizan recursos en distintos contextos.', skills: ['Análisis cuantitativo', 'Pensamiento crítico', 'Investigación'], fields: ['Política económica', 'Consultoría', 'Análisis financiero'], profile: { creativity: 'Media', analysis: 'Alta', communication: 'Media' } }
  ];

  const careerWeights = {
  "sistemas": {
    "TEC": 5,
    "ING": 3,
    "ADM": 1
  },
  "datos": {
    "ING": 5,
    "TEC": 4,
    "COM": 1
  },
  "industrial": {
    "ADM": 4,
    "ING": 4,
    "TEC": 1
  },
  "grafico": {
    "CRE": 5,
    "COM": 3,
    "TEC": 1
  },
  "psicologia": {
    "SOC": 5,
    "SAL": 3,
    "EDU": 2
  },
  "comunicacion": {
    "COM": 5,
    "CRE": 3,
    "SOC": 1
  },
  "administracion": {
    "ADM": 5,
    "COM": 2,
    "SOC": 1
  },
  "arquitectura": {
    "CRE": 4,
    "ING": 4,
    "ADM": 2
  },
  "medicina": {
    "SAL": 5,
    "ING": 3,
    "SOC": 2
  },
  "derecho": {
    "COM": 4,
    "SOC": 4,
    "ADM": 1
  },
  "marketing": {
    "COM": 4,
    "CRE": 4,
    "ADM": 3
  },
  "contabilidad": {
    "ADM": 5,
    "ING": 3
  },
  "educacion": {
    "EDU": 5,
    "SOC": 3,
    "COM": 3
  },
  "ambiental": {
    "ING": 5,
    "TEC": 2,
    "SOC": 2
  },
  "enfermeria": {
    "SAL": 5,
    "SOC": 3,
    "EDU": 1
  },
  "economia": {
    "ADM": 5,
    "ING": 4,
    "SOC": 1
  }
};
  careers.forEach(career => {
    career.weights = careerWeights[career.id];
    career.area = Object.keys(career.weights).sort((a,b)=>career.weights[b]-career.weights[a])[0];
  });

  const faqs = [
    ['¿Es una prueba vocacional oficial?', 'No. Es una maqueta académica para evaluar la experiencia de uso. Sus resultados son demostrativos.'],
    ['¿Cómo se generan los resultados?', 'Las opciones suman puntos a ocho áreas y una regla sencilla los normaliza. No interviene Machine Learning real.'],
    ['¿Una carrera con mayor afinidad es mi carrera ideal?', 'No. La afinidad simulada solo ayuda a ordenar alternativas para explorar y conversar con un orientador.'],
    ['¿Qué datos se almacenan?', 'Solo los datos ficticios que ingreses, respuestas, resultados y favoritos en el almacenamiento local de este navegador.'],
    ['¿Puedo cambiar mis respuestas?', 'Sí. Antes de confirmar puedes editar cualquier pregunta; también puedes reiniciar toda la experiencia.']
  ];
  return { areas, questions, answerWeights, careers, careerWeights, faqs };
})();
