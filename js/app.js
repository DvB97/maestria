(() => {
  const { questions, careers, areas, faqs } = MockData;
  const app = document.querySelector('#app');
  let state = Store.load();
  let processingTimer;
  let guideIndex = 0;
  let guideReturnFocus = null;
  const guideSteps = [
    { icon:'1', title:'Conoce el propósito', text:'En Inicio encontrarás qué ofrece la herramienta, sus beneficios y el aviso de que todas las sugerencias son orientativas.' },
    { icon:'2', title:'Acepta y crea tu perfil', text:'Lee la privacidad, acepta el consentimiento y usa un nombre ficticio. Después completa únicamente los datos mínimos del perfil.' },
    { icon:'3', title:'Responde la evaluación', text:'Contesta diez preguntas, una por vez. Verás tu progreso y podrás avanzar o regresar sin perder las respuestas.' },
    { icon:'4', title:'Revisa antes de confirmar', text:'Al terminar podrás revisar todas las respuestas y usar Editar para volver directamente a cualquier pregunta.' },
    { icon:'5', title:'Comprende tus resultados', text:'Las barras muestran afinidades simuladas calculadas con reglas sencillas. No son predicciones ni un diagnóstico profesional.' },
    { icon:'6', title:'Explora, guarda y compara', text:'Busca carreras, filtra por área, abre sus detalles, guarda tus favoritas y selecciona entre dos y tres para compararlas.' },
    { icon:'✓', title:'Siempre puedes volver', text:'Usa el menú para consultar resultados, carreras, favoritos o ayuda. Desde Ayuda también puedes reiniciar completamente la experiencia.' }
  ];
  const $ = (selector) => document.querySelector(selector);
  const escapeHtml = (value='') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const routeName = () => location.hash.slice(1).split('/')[0] || 'inicio';
  const go = (route) => { location.hash = route; };
  const setState = patch => { state = Store.save(patch); updateCounts(); return state; };
  const toast = message => { const el=$('#toast'); el.textContent=message; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2200); };
  const disclaimer = () => `<div class="disclaimer"><span aria-hidden="true">ⓘ</span><div><strong>Representación orientativa</strong><br>Los porcentajes y sugerencias son datos simulados para este prototipo académico. No constituyen una predicción ni reemplazan tu decisión o el acompañamiento profesional.</div></div>`;
  const layout = (content, narrow=false) => `<section class="shell ${narrow?'narrow':''}">${content}</section>`;
  const areaName = id => areas[id]?.name || id;
  const answerFor = q => q.options.find(o => o.id === state.answers[q.id]);

  function paintGuide(){
    const step=guideSteps[guideIndex];
    $('#guideStep').textContent=`Paso ${guideIndex+1} de ${guideSteps.length}`;
    $('#guideIcon').textContent=step.icon;
    $('#guideTitle').textContent=step.title;
    $('#guideText').textContent=step.text;
    $('#guideDots').innerHTML=guideSteps.map((_,i)=>`<span class="${i===guideIndex?'active':''}"></span>`).join('');
    $('#guidePrevious').disabled=guideIndex===0;
    $('#guideNext').textContent=guideIndex===guideSteps.length-1?'Finalizar':'Siguiente →';
  }
  function openGuide(){
    guideIndex=0; guideReturnFocus=document.activeElement;
    $('#guideOverlay').hidden=false; document.body.classList.add('guide-open');
    paintGuide(); $('#closeGuide').focus();
  }
  function closeGuide(){
    $('#guideOverlay').hidden=true; document.body.classList.remove('guide-open');
    if(guideReturnFocus?.focus) guideReturnFocus.focus();
  }

  function updateCounts(){ $('#favoriteCount').textContent=state.favorites.length; }
  function calculateResults(){
    const scores = Object.fromEntries(Object.keys(areas).map(k=>[k,0]));
    questions.forEach(q => { const selected=answerFor(q); if(selected) Object.entries(selected.weights).forEach(([k,v])=>scores[k]+=v); });
    const max=Math.max(...Object.values(scores),1);
    const dimensions=Object.entries(scores).map(([id,score])=>({id,score,percent:Math.round(42+(score/max)*50)})).sort((a,b)=>b.percent-a.percent);
    return { dimensions, date:new Date().toISOString(), disclaimer:true };
  }
  function affinity(career){
    if(!state.results) return career.base;
    const dimensions=Object.fromEntries(state.results.dimensions.map(d=>[d.id,d.percent]));
    const weights=career.weights||{[career.area]:1};
    const totalWeight=Object.values(weights).reduce((sum,value)=>sum+value,0);
    const weightedScore=Object.entries(weights).reduce((sum,[area,weight])=>sum+(dimensions[area]||42)*weight,0)/totalWeight;
    const interest=(state.profile.interest||'').toLocaleLowerCase('es');
    const searchable=[career.name,areaName(career.area),...career.skills].join(' ').toLocaleLowerCase('es');
    const interestBoost=interest.length>2&&interest.split(/\s+/).some(word=>word.length>3&&searchable.includes(word))?3:0;
    return Math.min(95,Math.round(weightedScore*.88+career.base*.12+interestBoost));
  }
  function matchReasons(career){
    if(!state.results) return [areaName(career.area)];
    const dimensions=Object.fromEntries(state.results.dimensions.map(d=>[d.id,d.percent]));
    return Object.entries(career.weights||{[career.area]:1})
      .map(([id,weight])=>({id,value:(dimensions[id]||0)*weight}))
      .sort((a,b)=>b.value-a.value).slice(0,2).map(item=>areaName(item.id));
  }
  function routeGuard(route){
    const journey=['perfil','instrucciones','evaluacion','revision','procesamiento'];
    if(journey.includes(route) && !state.consent) return 'consentimiento';
    if(['resultados','carreras','detalle','comparacion'].includes(route) && !state.results) return 'instrucciones';
    return route;
  }

  const views = {
    inicio: () => layout(`<div class="hero"><div><div class="eyebrow">Explora con curiosidad. Decide con libertad.</div><h1>Tu futuro merece una <span>buena brújula.</span></h1><p class="lead">Una experiencia guiada para reconocer intereses, comprender tus áreas de afinidad y descubrir alternativas formativas en un espacio claro y sin juicios.</p><div class="hero-actions"><button class="btn btn-primary" data-route="consentimiento">Comenzar mi recorrido →</button><button class="btn btn-secondary" data-route="ayuda">¿Cómo funciona?</button></div><div class="benefit-grid" style="margin-top:34px"><div class="benefit"><span class="icon">✓</span><b>10 preguntas</b><br><span class="subtle">Recorrido breve y editable</span></div><div class="benefit"><span class="icon">◎</span><b>Perfil visual</b><br><span class="subtle">Seis áreas para explorar</span></div><div class="benefit"><span class="icon">↗</span><b>Alternativas</b><br><span class="subtle">Compara y guarda opciones</span></div></div></div><div class="visual-card" aria-label="Ejemplo visual de resultados simulados"><div class="eyebrow">Vista previa del perfil</div><h2>Conoce lo que te mueve</h2>${[['Tecnología',86],['Análisis',78],['Creatividad',69]].map(x=>`<div class="mini-result"><strong><span>${x[0]}</span><span>${x[1]}%</span></strong><div class="meter"><span style="width:${x[1]}%"></span></div></div>`).join('')}<small class="subtle">Ejemplo ilustrativo con valores simulados</small></div></div>${disclaimer()}`),

    consentimiento: () => layout(`<div class="page-head"><div><div class="eyebrow">Antes de comenzar</div><h1>Privacidad y consentimiento</h1><p>Queremos que sepas qué ocurre con la información de esta experiencia.</p></div><span class="simulated">Uso académico</span></div><div class="panel"><div class="step-list"><div class="step"><span class="step-num">1</span><div><b>Finalidad del prototipo</b><br><span class="subtle">Evaluar facilidad de uso, comprensión y satisfacción de una maqueta de orientación vocacional.</span></div></div><div class="step"><span class="step-num">2</span><div><b>Datos ficticios y locales</b><br><span class="subtle">No ingreses datos sensibles. Lo escrito se conserva únicamente en este navegador mediante localStorage.</span></div></div><div class="step"><span class="step-num">3</span><div><b>Sin diagnóstico ni predicción</b><br><span class="subtle">No hay inteligencia artificial ni Machine Learning real. Los resultados se producen con reglas demostrativas.</span></div></div></div><label class="check-row"><input id="consentCheck" type="checkbox" ${state.consent?'checked':''}><span>He leído la información y acepto continuar usando datos ficticios en este prototipo.</span></label><div class="actions"><button class="btn btn-secondary" data-route="inicio">Volver</button><button id="consentContinue" class="btn btn-primary" ${state.consent?'':'disabled'}>Continuar</button></div></div>`,true),

    acceso: () => layout(`<div class="panel"><div class="eyebrow">Identificación simulada</div><h1>¿Cómo te llamamos?</h1><p class="subtle">Puedes usar un nombre ficticio. No existe una cuenta ni un inicio de sesión real.</p><form id="identityForm"><div class="field"><label for="identity">Nombre o alias <span class="required">*</span></label><input id="identity" maxlength="40" autocomplete="off" value="${escapeHtml(state.identity)}" placeholder="Ejemplo: Alex"></div><p id="identityError" class="error" hidden>Escribe al menos dos caracteres.</p><div class="actions"><button type="button" class="btn btn-secondary" data-route="consentimiento">Volver</button><button class="btn btn-primary">Continuar →</button></div></form></div>`,true),

    perfil: () => layout(`<div class="page-head"><div><div class="eyebrow">Paso 1 de 3</div><h1>Cuéntanos un poco de ti</h1><p>Solo pedimos contexto mínimo para personalizar el recorrido.</p></div></div><form id="profileForm" class="panel"><div class="form-grid"><div class="field"><label for="name">Nombre o alias <span class="required">*</span></label><input id="name" value="${escapeHtml(state.profile.name||state.identity)}" maxlength="40"></div><div class="field"><label for="age">Rango de edad <span class="required">*</span></label><select id="age"><option value="">Selecciona</option>${['15–17 años','18–20 años','21–24 años','25 años o más'].map(x=>`<option ${state.profile.age===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label for="city">Contexto <span class="required">*</span></label><select id="city"><option value="">Selecciona</option>${['Lima Metropolitana','Piura'].map(x=>`<option ${state.profile.city===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label for="level">Nivel educativo <span class="required">*</span></label><select id="level"><option value="">Selecciona</option>${['Secundaria en curso','Secundaria finalizada','Estudios superiores en curso'].map(x=>`<option ${state.profile.level===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field full"><label for="interest">Interés inicial (opcional)</label><input id="interest" value="${escapeHtml(state.profile.interest)}" maxlength="80" placeholder="Ejemplo: tecnología, arte, salud o aún no lo sé"></div></div><p id="profileError" class="error" hidden>Completa nombre, rango de edad, contexto y nivel educativo.</p><div class="actions"><button type="button" class="btn btn-secondary" data-route="acceso">Volver</button><button class="btn btn-primary">Guardar y continuar →</button></div></form>`,true),

    instrucciones: () => layout(`<div class="page-head"><div><div class="eyebrow">Paso 2 de 3</div><h1>Evaluación de intereses</h1><p>Una actividad breve para construir una representación visual de tus afinidades.</p></div><span class="simulated">≈ 4 minutos</span></div><div class="panel"><div class="step-list"><div class="step"><span class="step-num">10</span><div><b>Diez situaciones cotidianas</b><br><span class="subtle">Elige la opción que más se acerque a ti en este momento.</span></div></div><div class="step"><span class="step-num">↔</span><div><b>Puedes volver y editar</b><br><span class="subtle">Tu avance se guarda localmente en este navegador.</span></div></div><div class="step"><span class="step-num">○</span><div><b>No hay respuestas buenas o malas</b><br><span class="subtle">Responde con espontaneidad; el resultado es una demostración orientativa.</span></div></div></div>${disclaimer()}<div class="actions"><button class="btn btn-secondary" data-route="perfil">Editar perfil</button><button id="startEvaluation" class="btn btn-primary">${Object.keys(state.answers).length?'Continuar evaluación':'Comenzar evaluación'} →</button></div></div>`,true),

    evaluacion: () => {
      const index=Math.min(state.currentQuestion,questions.length-1), q=questions[index], selected=state.answers[q.id];
      return layout(`<div class="progress-meta"><span>Pregunta ${index+1} de ${questions.length}</span><span>${Math.round((index/questions.length)*100)}% completado</span></div><div class="progress" role="progressbar" aria-valuenow="${index+1}" aria-valuemin="1" aria-valuemax="${questions.length}"><span style="width:${((index+1)/questions.length)*100}%"></span></div><div class="panel question"><div class="eyebrow">Elige una respuesta</div><h2>${q.text}</h2><div class="options" role="radiogroup">${q.options.map(o=>`<button class="option ${selected===o.id?'selected':''}" data-answer="${o.id}" role="radio" aria-checked="${selected===o.id}"><span class="radio"></span><span>${o.text}</span></button>`).join('')}</div><p id="answerError" class="error" hidden>Selecciona una opción para continuar.</p><div class="question-nav"><button id="prevQuestion" class="btn btn-secondary">← ${index?'Anterior':'Instrucciones'}</button><button id="nextQuestion" class="btn btn-primary">${index===questions.length-1?'Revisar respuestas':'Siguiente'} →</button></div></div>`,true);
    },

    revision: () => layout(`<div class="page-head"><div><div class="eyebrow">Paso 3 de 3</div><h1>Revisa tus respuestas</h1><p>Confirma que reflejen lo que piensas. Puedes editar cualquiera.</p></div><span>${Object.keys(state.answers).length}/${questions.length} respondidas</span></div><div class="panel"><div class="review-list">${questions.map((q,i)=>`<div class="review-item"><div><b>${i+1}. ${q.text}</b><p>${answerFor(q)?.text||'<span class="error">Sin responder</span>'}</p></div><button class="btn btn-ghost" data-edit="${i}">Editar</button></div>`).join('')}</div><div class="actions"><button class="btn btn-secondary" data-route="evaluacion">Volver</button><button id="confirmAnswers" class="btn btn-primary" ${Object.keys(state.answers).length<questions.length?'disabled':''}>Confirmar y ver resultados →</button></div></div>`),

    procesamiento: () => layout(`<div class="panel processing"><div class="loader" aria-hidden="true"></div><div class="eyebrow">Simulación visual</div><h1>Preparando tu perfil…</h1><p class="subtle">Aplicamos reglas demostrativas a tus respuestas. No se ejecuta un modelo de Machine Learning.</p><div class="processing-steps"><div id="p1">○ Procesando intereses</div><div id="p2">○ Identificando áreas de afinidad</div><div id="p3">○ Preparando resultados orientativos</div></div></div>`,true),

    resultados: () => {
      const dims=state.results?.dimensions||[]; const top=dims.slice(0,2).map(d=>areaName(d.id));
      const recommended=[...careers].sort((a,b)=>affinity(b)-affinity(a)).slice(0,3);
      return layout(`<div class="page-head"><div><div class="eyebrow">Tu resumen vocacional</div><h1>Hola, ${escapeHtml(state.profile.name||state.identity||'estudiante')}</h1><p>Estas son las áreas que destacaron en esta experiencia.</p></div><span class="simulated">Resultado simulado</span></div><div class="result-hero"><div class="result-summary"><div class="eyebrow">Áreas de mayor afinidad</div><h1>${top.join(' + ')}</h1><p>De acuerdo con las respuestas ingresadas, podrías comenzar explorando alternativas relacionadas con ${top.join(' y ')}.</p><button class="btn btn-secondary" data-route="carreras">Explorar carreras →</button></div><div class="panel result-bars">${dims.map(d=>`<div class="result-bar"><div class="row"><b>${areas[d.id].icon} ${areaName(d.id)}</b><strong>${d.percent}%</strong></div><div class="meter"><span style="width:${d.percent}%;background:${areas[d.id].color}"></span></div></div>`).join('')}</div></div><section class="recommendation-section" aria-labelledby="topCareersTitle"><div class="section-heading"><div><div class="eyebrow">Alternativas sugeridas</div><h2 id="topCareersTitle">Tu Top 3 para explorar</h2><p>Se ordena comparando la combinación de tus seis áreas con las ponderaciones simuladas de cada carrera.</p></div><span class="simulated">Afinidades simuladas</span></div><div class="top-careers">${recommended.map((career,index)=>`<article class="top-career"><span class="rank">${index+1}</span><div class="top-career-body"><div class="career-top"><span class="tag">${areaName(career.area)}</span><strong class="affinity">${affinity(career)}%</strong></div><h3>${career.name}</h3><p>Coincide especialmente con <b>${matchReasons(career).join(' y ')}</b>.</p><button class="btn btn-secondary" data-detail="${career.id}">Ver por qué y conocer la carrera →</button></div></article>`).join('')}</div></section>${disclaimer()}<div class="actions"><button class="btn btn-secondary" data-route="revision">Revisar respuestas</button><button class="btn btn-primary" data-route="carreras">Ver todas las alternativas</button></div>`);
    },

    carreras: () => layout(`<div class="page-head"><div><div class="eyebrow">Exploración</div><h1>Carreras que podrías explorar</h1><p>Busca, filtra y abre cada alternativa para conocerla mejor.</p></div><button class="btn btn-secondary" data-route="comparacion">Comparar (${state.compare.length})</button></div><div class="toolbar"><input id="careerSearch" aria-label="Buscar carrera" placeholder="Buscar por nombre o habilidad"><select id="areaFilter" aria-label="Filtrar por área"><option value="">Todas las áreas</option>${Object.entries(areas).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('')}</select><select id="careerSort" aria-label="Ordenar carreras"><option value="affinity">Mayor afinidad</option><option value="name">Nombre A–Z</option></select></div><div id="careerGrid" class="card-grid"></div>${disclaimer()}`),

    detalle: id => {
      const c=careers.find(x=>x.id===id)||careers[0], fav=state.favorites.includes(c.id), comp=state.compare.includes(c.id);
      return layout(`<div class="page-head"><div><div class="eyebrow">${areaName(c.area)}</div><h1>${c.name}</h1><p>${c.description}</p></div><div><span class="affinity">${affinity(c)}% de afinidad simulada</span></div></div><div class="detail-grid"><article class="panel"><div class="reason-box"><span aria-hidden="true">✦</span><div><b>¿Por qué aparece esta alternativa?</b><p>Tu combinación de respuestas muestra coincidencias principalmente con <strong>${matchReasons(c).join(' y ')}</strong>. Esta explicación usa reglas transparentes, no Machine Learning.</p></div></div><div class="info-block"><h3>Habilidades relacionadas</h3><div class="tags">${c.skills.map(x=>`<span class="tag">${x}</span>`).join('')}</div></div><div class="info-block"><h3>Posibles campos profesionales</h3><ul class="list-clean">${c.fields.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="info-block"><h3>Para seguir investigando</h3><p class="subtle">Conversa con profesionales y orientadores; revisa planes de estudio, requisitos y fuentes institucionales actualizadas antes de decidir.</p></div></article><aside class="panel"><h3>Acciones</h3><button class="btn btn-secondary" data-favorite="${c.id}" style="width:100%">${fav?'♥ Guardada':'♡ Guardar'}</button><button class="btn btn-secondary" data-compare="${c.id}" style="width:100%;margin-top:10px">${comp?'✓ En comparación':'+ Comparar'}</button><button class="btn btn-ghost" data-route="carreras" style="width:100%;margin-top:10px">← Volver al catálogo</button></aside></div>${disclaimer()}`);
    },

    comparacion: () => {
      const selected=state.compare.map(id=>careers.find(c=>c.id===id)).filter(Boolean);
      if(selected.length<2) return layout(`<div class="page-head"><div><div class="eyebrow">Comparación orientativa</div><h1>Elige al menos dos carreras</h1></div></div><div class="empty"><p>Seleccionaste ${selected.length}. Agrega carreras desde el catálogo para compararlas lado a lado.</p><button class="btn btn-primary" data-route="carreras">Explorar carreras</button></div>`);
      const row=(label,get)=>`<tr><th>${label}</th>${selected.map(c=>`<td>${get(c)}</td>`).join('')}</tr>`;
      return layout(`<div class="page-head"><div><div class="eyebrow">Comparación orientativa</div><h1>Compara tus alternativas</h1><p>Observa diferencias y formula nuevas preguntas antes de decidir.</p></div><button class="btn btn-secondary" id="clearCompare">Limpiar</button></div><div class="panel compare-wrap"><table class="compare-table"><thead><tr><th>Criterio</th>${selected.map(c=>`<th>${c.name}<br><button class="btn btn-ghost" data-compare="${c.id}">Quitar</button></th>`).join('')}</tr></thead><tbody>${row('Afinidad',c=>`${affinity(c)}% simulada`)}${row('Área',c=>areaName(c.area))}${row('Creatividad',c=>c.profile.creativity)}${row('Análisis',c=>c.profile.analysis)}${row('Comunicación',c=>c.profile.communication)}${row('Campos',c=>c.fields.join(', '))}</tbody></table></div>${disclaimer()}`);
    },

    favoritos: () => { const saved=careers.filter(c=>state.favorites.includes(c.id)); return layout(`<div class="page-head"><div><div class="eyebrow">Tu selección</div><h1>Carreras guardadas</h1><p>Conserva aquí las opciones sobre las que quieras conversar o investigar.</p></div></div><div class="card-grid">${saved.length?saved.map(c=>careerCard(c)).join(''):`<div class="empty"><p>No tienes carreras guardadas todavía.</p><button class="btn btn-primary" data-route="${state.results?'carreras':'inicio'}">${state.results?'Explorar carreras':'Comenzar recorrido'}</button></div>`}</div>`); },

    ayuda: () => layout(`<div class="page-head"><div><div class="eyebrow">Ayuda y transparencia</div><h1>Preguntas frecuentes</h1><p>Entiende la evaluación, los resultados y los límites de la herramienta.</p></div><button id="startGuide" class="btn btn-primary">Ver guía paso a paso</button></div><div>${faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div><div class="panel" style="margin-top:24px"><h2>¿Necesitas orientación?</h2><p class="subtle">En una implementación futura, este espacio podría ofrecer un canal institucional. En esta maqueta no se envían mensajes ni se recopilan datos.</p><div class="actions"><button class="btn btn-secondary" data-route="inicio">Ir al inicio</button><button id="resetExperience" class="btn btn-danger">Reiniciar experiencia</button></div></div>`,true)
  };

  function careerCard(c){
    const fav=state.favorites.includes(c.id), comp=state.compare.includes(c.id);
    return `<article class="career-card"><div class="career-top"><span class="tag">${areaName(c.area)}</span><span class="affinity">${affinity(c)}%</span></div><h3>${c.name}</h3><p>${c.description}</p><div class="match-reason"><span>Coincide con</span><b>${matchReasons(c).join(' + ')}</b></div><div class="tags">${c.skills.slice(0,2).map(x=>`<span class="tag">${x}</span>`).join('')}</div><div class="career-actions"><button class="btn btn-primary" data-detail="${c.id}">Ver detalle</button><button class="btn btn-secondary" data-favorite="${c.id}" aria-label="${fav?'Quitar de':'Guardar en'} favoritos">${fav?'♥ Guardada':'♡ Guardar'}</button><button class="btn btn-secondary" data-compare="${c.id}" aria-label="${comp?'Quitar de':'Añadir a'} comparación">${comp?'✓ Añadida':'⇄ Comparar'}</button></div></article>`;
  }
  function renderCareers(){
    const grid=$('#careerGrid'); if(!grid)return;
    const term=$('#careerSearch').value.toLowerCase(), filter=$('#areaFilter').value, sort=$('#careerSort').value;
    let list=careers.filter(c=>(!filter||c.area===filter)&&(!term||[c.name,c.description,...c.skills].join(' ').toLowerCase().includes(term)));
    list.sort(sort==='name'?(a,b)=>a.name.localeCompare(b.name):(a,b)=>affinity(b)-affinity(a));
    grid.innerHTML=list.length?list.map(c=>careerCard(c)).join(''):'<div class="empty">No encontramos carreras con esos criterios. Prueba otra búsqueda.</div>';
  }
  function toggleFavorite(id){ const next=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id]; setState({favorites:next}); toast(next.includes(id)?'Carrera guardada en favoritos.':'Carrera eliminada de favoritos.'); render(); }
  function toggleCompare(id){
    let next=state.compare.includes(id)?state.compare.filter(x=>x!==id):[...state.compare,id];
    if(next.length>3){ toast('Puedes comparar hasta tres carreras.'); return; }
    setState({compare:next}); toast(next.includes(id)?'Carrera añadida a la comparación.':'Carrera retirada de la comparación.'); render();
  }

  function bind(){
    if($('#careerGrid')) renderCareers();
    document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>go(b.dataset.route));
    [...document.querySelectorAll('[data-detail]')].filter(b=>!b.closest('#careerGrid')).forEach(b=>b.onclick=()=>go(`detalle/${b.dataset.detail}`));
    [...document.querySelectorAll('[data-favorite]')].filter(b=>!b.closest('#careerGrid')).forEach(b=>b.onclick=()=>toggleFavorite(b.dataset.favorite));
    [...document.querySelectorAll('[data-compare]')].filter(b=>!b.closest('#careerGrid')).forEach(b=>b.onclick=()=>toggleCompare(b.dataset.compare));
    if($('#consentCheck')) $('#consentCheck').onchange=e=>{ setState({consent:e.target.checked}); $('#consentContinue').disabled=!e.target.checked; };
    if($('#consentContinue')) $('#consentContinue').onclick=()=>go('acceso');
    if($('#identityForm')) $('#identityForm').onsubmit=e=>{ e.preventDefault(); const value=$('#identity').value.trim(); if(value.length<2){$('#identityError').hidden=false;return;} setState({identity:value}); go('perfil'); };
    if($('#profileForm')) $('#profileForm').onsubmit=e=>{ e.preventDefault(); const profile={name:$('#name').value.trim(),age:$('#age').value,city:$('#city').value,level:$('#level').value,interest:$('#interest').value.trim()}; if(!profile.name||!profile.age||!profile.city||!profile.level){$('#profileError').hidden=false;return;} setState({profile,identity:profile.name}); go('instrucciones'); };
    if($('#startEvaluation')) $('#startEvaluation').onclick=()=>go('evaluacion');
    document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{ const q=questions[state.currentQuestion]; setState({answers:{...state.answers,[q.id]:b.dataset.answer}}); render(); });
    if($('#prevQuestion')) $('#prevQuestion').onclick=()=>{ if(state.currentQuestion===0)go('instrucciones');else{setState({currentQuestion:state.currentQuestion-1});render();} };
    if($('#nextQuestion')) $('#nextQuestion').onclick=()=>{ const q=questions[state.currentQuestion]; if(!state.answers[q.id]){$('#answerError').hidden=false;return;} if(state.currentQuestion===questions.length-1)go('revision');else{setState({currentQuestion:state.currentQuestion+1});render();} };
    document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{setState({currentQuestion:Number(b.dataset.edit)});go('evaluacion');});
    if($('#confirmAnswers')) $('#confirmAnswers').onclick=()=>{setState({results:calculateResults()});go('procesamiento');};
    if($('#careerGrid')){
      ['careerSearch','areaFilter','careerSort'].forEach(id=>$('#'+id).addEventListener(id==='careerSearch'?'input':'change',renderCareers));
      $('#careerGrid').onclick=e=>{
        const detail=e.target.closest('[data-detail]'), favorite=e.target.closest('[data-favorite]'), compare=e.target.closest('[data-compare]');
        if(detail) go(`detalle/${detail.dataset.detail}`);
        else if(favorite) toggleFavorite(favorite.dataset.favorite);
        else if(compare) toggleCompare(compare.dataset.compare);
      };
    }
    if($('#clearCompare')) $('#clearCompare').onclick=()=>{setState({compare:[]});render();};
    if($('#resetExperience')) $('#resetExperience').onclick=()=>{if(confirm('¿Deseas borrar el progreso, resultados y favoritos guardados en este navegador?')){Store.reset();state=Store.load();go('inicio');toast('La experiencia fue reiniciada.');}};
    if($('#startGuide')) $('#startGuide').onclick=openGuide;
  }
  function startProcessing(){
    clearTimeout(processingTimer); const steps=['p1','p2','p3'];
    steps.forEach((id,i)=>setTimeout(()=>{const el=$('#'+id);if(el){el.classList.add('done');el.textContent='✓ '+el.textContent.slice(2);}},500+i*700));
    processingTimer=setTimeout(()=>go('resultados'),2800);
  }
  function render(){
    clearTimeout(processingTimer); state=Store.load(); let raw=routeName(), route=routeGuard(raw); if(route!==raw){go(route);return;}
    const id=location.hash.slice(1).split('/')[1]; app.innerHTML=(views[route]||views.inicio)(id); bind(); updateCounts(); app.focus({preventScroll:true}); window.scrollTo({top:0,behavior:'smooth'}); if(route==='procesamiento')startProcessing();
    $('#mainNav').classList.remove('open'); $('#menuToggle').setAttribute('aria-expanded','false');
  }
  $('#menuToggle').onclick=()=>{const nav=$('#mainNav');nav.classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',nav.classList.contains('open'));};
  $('#openGuide').onclick=openGuide;
  $('#closeGuide').onclick=closeGuide;
  $('#guideOverlay').onclick=e=>{if(e.target.id==='guideOverlay')closeGuide();};
  $('#guidePrevious').onclick=()=>{if(guideIndex>0){guideIndex--;paintGuide();}};
  $('#guideNext').onclick=()=>{if(guideIndex===guideSteps.length-1)closeGuide();else{guideIndex++;paintGuide();}};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#guideOverlay').hidden)closeGuide();});
  window.addEventListener('hashchange',render); updateCounts(); render();
})();
