window.Store = (() => {
  const KEY = 'brujula-vocacional-2026';
  const empty = { consent: false, identity: '', profile: {}, answers: {}, currentQuestion: 0, results: null, favorites: [], compare: [] };
  const load = () => {
    try {
      const state = { ...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
      state.answers = Object.fromEntries(MockData.questions.filter(q => q.options.some(o => o.id === state.answers?.[q.id])).map(q => [q.id,state.answers[q.id]]));
      if(state.results?.version !== Scoring.version || !Scoring.complete(state.answers)) state.results = null;
      state.currentQuestion = Math.max(0,Math.min(MockData.questions.length-1,Number(state.currentQuestion)||0));
      return state;
    }
    catch { return { ...empty }; }
  };
  const save = (patch) => {
    const state = { ...load(), ...patch };
    localStorage.setItem(KEY, JSON.stringify(state));
    return state;
  };
  const reset = () => localStorage.removeItem(KEY);
  return { load, save, reset };
})();
