const fs=require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict');
const context={window:{},localStorage:{getItem:()=>JSON.stringify(saved),setItem:()=>{}}};
let saved={};
vm.createContext(context);
vm.runInContext(fs.readFileSync('js/mock-data.js','utf8'),context);
context.MockData=context.window.MockData;
vm.runInContext(fs.readFileSync('js/scoring.js','utf8'),context);
context.Scoring=context.window.Scoring;
vm.runInContext(fs.readFileSync('js/storage.js','utf8'),context);
const {MockData:d,Scoring:s}=context;
assert.equal(d.questions.length,30);
for(const q of d.questions){
  assert.equal(q.options.length,4);
  for(const o of q.options){
    const weights=d.answerWeights[q.id][o.id];
    assert.equal(Object.values(weights).reduce((a,b)=>a+b,0),3);
    for(const [id,w] of Object.entries(weights)) assert.ok(d.areas[id] && Number.isInteger(w) && w>=0 && w<=3);
  }
}
for(const c of d.careers) for(const [id,w] of Object.entries(c.weights)) assert.ok(d.areas[id] && w>=0 && w<=5);
assert.throws(()=>s.calculate({}));
for(const [name,target] of [['tecnológico','TEC'],['creativo','CRE'],['social','SOC'],['administrativo','ADM'],['salud','SAL'],['educación','EDU'],['mixto',null]]){
  const answers=Object.fromEntries(d.questions.map((q,i)=>[q.id,target ? [...q.options].sort((a,b)=>(d.answerWeights[q.id][b.id][target]||0)-(d.answerWeights[q.id][a.id][target]||0))[0].id : 'abcd'[i%4]]));
  const result=s.calculate(answers);
  assert.deepEqual(result,s.calculate(answers));
  if(target) assert.equal(result.dimensions.find(x=>x.id===target).percent,100);
  const ranked=[...d.careers].sort((a,b)=>s.compare(a,b,result));
  for(const c of ranked){assert.ok(s.affinity(c,result)>=0 && s.affinity(c,result)<=100);assert.ok(s.reasons(c,result).every(id=>c.weights[id]>0));}
  console.log(name+': '+ranked.slice(0,3).map(c=>c.name+' '+s.affinity(c,result)+'%').join(', '));
}
const result={dimensions:[{id:'TEC',score:1,normalized:50},{id:'ING',score:1,normalized:50},{id:'CRE',score:1,normalized:50},{id:'ADM',score:1,normalized:50}]};
assert.ok(s.compare({id:'a',weights:{TEC:2}},{id:'b',weights:{ADM:2}},result)<0);
assert.ok(s.compare({id:'a',weights:{TEC:2}},{id:'b',weights:{TEC:2}},result)<0);
saved={answers:Object.fromEntries(d.questions.slice(0,10).map(q=>[q.id,'a'])),results:{dimensions:[]},favorites:['sistemas'],currentQuestion:9};
const restored=context.window.Store.load();
assert.equal(Object.keys(restored.answers).length,10);assert.equal(restored.results,null);assert.equal(restored.favorites[0],'sistemas');
console.log('OK: matrices, perfiles, límites, determinismo, empates y migración.');
