window.Scoring = (() => {
  const { questions, areas, answerWeights } = MockData;
  const version = 2;
  const ids = Object.keys(areas);
  const maxima = Object.fromEntries(ids.map(id => [id, questions.reduce((sum, q) =>
    sum + Math.max(...q.options.map(o => answerWeights[q.id][o.id][id] || 0)), 0)]));
  const complete = answers => questions.every(q => q.options.some(o => o.id === answers[q.id]));
  function calculate(answers) {
    if (!complete(answers)) throw new Error('Completa las 30 preguntas antes de calcular resultados.');
    const dimensions = ids.map(id => {
      const score = questions.reduce((sum, q) => sum + (answerWeights[q.id][answers[q.id]][id] || 0), 0);
      const normalized = maxima[id] ? 100 * score / maxima[id] : 0;
      return { id, score, normalized, percent: Math.round(normalized) };
    }).sort((a, b) => b.normalized - a.normalized || ids.indexOf(a.id) - ids.indexOf(b.id));
    return { version, dimensions, disclaimer: true };
  }
  function raw(career, result) {
    if (!result) return 0;
    const total = Object.values(career.weights).reduce((a, b) => a + b, 0);
    return total ? result.dimensions.reduce((sum, d) => sum + d.normalized * (career.weights[d.id] || 0), 0) / total : 0;
  }
  const affinity = (career, result) => Math.round(raw(career, result));
  const overlap = (career, result) => (result?.dimensions || []).slice(0, 3)
    .reduce((sum, d) => sum + (d.score > 0 ? career.weights[d.id] || 0 : 0), 0);
  const compare = (a, b, result) => affinity(b, result) - affinity(a, result)
    || overlap(b, result) - overlap(a, result) || a.id.localeCompare(b.id, 'en');
  function reasons(career, result) {
    if (!result) return [career.area];
    return result.dimensions.filter(d => d.score > 0 && career.weights[d.id] > 0)
      .sort((a, b) => b.normalized * career.weights[b.id] - a.normalized * career.weights[a.id])
      .slice(0, 2).map(d => d.id);
  }
  return { version, maxima, complete, calculate, affinity, compare, reasons };
})();
