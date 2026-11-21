const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

function mountJourney(width = 390) {
  const viewport = 844;
  const top = 900;
  const height = viewport * 4;
  const listeners = new Map();
  const effects = [];
  const frames = new Map();
  const changes = [];
  let frameId = 0;
  let stateIndex = 0;
  const previous = {};
  const win = {
    innerWidth: width, innerHeight: viewport, scrollY: 0,
    matchMedia: () => ({matches:false, addEventListener(){}, removeEventListener(){}}),
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name),
    scrollTo: ({top:value}) => { win.scrollY = value; listeners.get('scroll')?.(); }
  };
  const document = {body:{style:{position:''}}};
  const globals = {window:win,document,requestAnimationFrame:fn=>{frames.set(++frameId,fn);return frameId;},cancelAnimationFrame:id=>frames.delete(id)};
  for(const [name,value] of Object.entries(globals)){ previous[name]=global[name]; global[name]=value; }
  const react = {
    useRef: initial => ({current:initial}),
    useState: initial => {const index=stateIndex++; return [initial,value=>{if(index===0)changes.push(value);}];},
    useEffect: fn => effects.push(fn),
    useCallback: fn => fn
  };
  const filename = path.resolve(__dirname,'../src/app/(public)/_components/Journey.tsx');
  const loaded = new Module(filename,module); loaded.paths=module.paths;
  const realRequire=loaded.require.bind(loaded);
  loaded.require=name=>name==='react'?react:realRequire(name);
  loaded._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText,filename);
  const blocks = Array.from({length:4},()=>({style:{setProperty(){}},classList:{toggle(){}}}));
  const scene = {offsetHeight:height,getBoundingClientRect:()=>({top:top-win.scrollY,bottom:top+height-win.scrollY,height})};
  const nodes = [];
  function walk(node){
    if(!node||typeof node!=='object')return;
    if(Array.isArray(node)){node.forEach(walk);return;}
    nodes.push(node);
    const props=node.props||{};
    if(node.ref){
      node.ref.current=props.id==='journey'?scene:props.className==='jst'?{clientHeight:viewport}:props.className==='iso'?{querySelectorAll:()=>blocks}:{style:{},textContent:''};
    }
    walk(props.children);
  }
  walk(loaded.exports.Journey({steps:Array.from({length:4},(_,i)=>({title:`Step ${i+1}`,desc:'Details'}))}));
  const cleanups=effects.map(fn=>fn());
  const flush=()=>{for(const [id,fn] of [...frames]){frames.delete(id);fn();}};
  const scroll=progress=>{win.scrollY=top+progress*(height-viewport);listeners.get('scroll')?.();flush();};
  return {win,listeners,scroll,flush,changes,nodes,top,height,viewport,
    close(){cleanups.forEach(fn=>fn?.());for(const [name,value]of Object.entries(previous)){if(value===undefined)delete global[name];else global[name]=value;}}
  };
}

test('mobile journey follows native scrolling forward and backward through all four stages',()=>{
  const app=mountJourney();
  try{
    for(const [progress,expected]of [[.1,0],[.35,1],[.6,2],[.9,3],[.6,2],[.1,0]]){
      app.scroll(progress);
      assert.equal(app.changes.at(-1)??0,expected,`stage at ${progress*100}% scroll`);
    }
  }finally{app.close();}
});

test('mobile swipes approaching the journey are never cancelled or jumped to the section',()=>{
  const app=mountJourney();
  try{
    let prevented=false;
    app.listeners.get('touchstart')?.({touches:[{clientY:600}]});
    app.listeners.get('touchmove')?.({touches:[{clientY:400}],preventDefault(){prevented=true;}});
    assert.equal(prevented,false,'native vertical swiping must stay available');
    assert.equal(app.win.scrollY,0,'a swipe must not teleport the page to the journey');
  }finally{app.close();}
});

test('step buttons keep the selected stage synchronized with page scroll on mobile',()=>{
  const app=mountJourney();
  try{
    const button=app.nodes.find(node=>node.type==='button'&&node.props.children?.includes?.('Step 3'));
    assert.ok(button);
    button.props.onClick(); app.flush();
    assert.ok(app.win.scrollY>app.top,'selecting a step must move to its actual scroll position');
    assert.equal(app.changes.at(-1),2);
  }finally{app.close();}
});

test('desktop journey continues to follow native scrolling',()=>{
  const app=mountJourney(1440);
  try{app.scroll(.6);assert.equal(app.changes.at(-1),2);}finally{app.close();}
});
