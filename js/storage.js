window.Store = (() => {
  const KEY = 'brujula-vocacional-2026';
  const empty = { consent:false, identity:'', profile:{}, answers:{}, currentQuestion:0, results:null, favorites:[], compare:[] };
  const load = () => {
    try { return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
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
