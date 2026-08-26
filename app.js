const SW=new Set(`a à às ao aos aquele aquela aquelas aqueles aquilo aqui ainda algo algum alguma algumas alguns ali ambos ampla amplo amplas amplos antes após as até com como contra da das de dela delas dele deles depois dessa dessas desse desses desta destas deste destes do dos e é em enquanto entre era eram essa essas esse esses esta está estão estas este estes eu foi foram há isso isto já mais mas me meu meus minha minhas na não nas nem nesse nessa nesta neste no nos nós nossa nossas nosso nossos num numa nunca o os ou outra outras outro outros para pela pelas pelo pelos por porque qual quando quanto que quem se sem ser seu seus sob sobre sua suas também tem tendo tenha tenham tenho te toda todas todo todos tu tua tuas um uma umas uns vai vais vamos você vocês vos`.split(/\s+/));

function norm(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function toks(s){return s.replace(/[“”"‘’]/g,'').split(/\s+/).map(x=>x.replace(/^[^\p{L}\p{N}-]+|[^\p{L}\p{N}-]+$/gu,'')).filter(Boolean)}
function bard(x){if(x.length<3||SW.has(x))return false;return !(x.length>5&&['ar','er','ir','ando','endo','indo','ado','ido','ava','avam','aria','asse','esse','isse'].some(e=>x.endsWith(e)))}

function selected(s){
    let exc=new Set((document.getElementById('excluir').value || '').split(',').map(x=>norm(x.trim())).filter(Boolean));
    return toks(s).filter(x=>{
        let n=norm(x);
        if(exc.has(n)) return false;
        return n.length>1&&!/\d/.test(n)&&(document.querySelector('[name=metodo]:checked').value==='pln'?!SW.has(n):bard(n))
    })
}

function count(a){let m=new Map();a.forEach(x=>{x=norm(x);m.set(x,(m.get(x)||0)+1)});return [...m].map(([palavra,n])=>({palavra,n})).sort((a,b)=>b.n-a.n)}

function ng(a,n){
    let exc=new Set((document.getElementById('excluir').value || '').split(',').map(x=>norm(x.trim())).filter(Boolean));
    let m=new Map();
    for(let i=0;i<=a.length-n;i++){
        let g=a.slice(i,i+n).map(norm);
        if(g.some(x=>SW.has(x) || exc.has(x)))continue;
        g=g.join(' ');
        m.set(g,(m.get(g)||0)+1)
    }
    return [...m].map(([grama,n])=>({grama,n})).filter(x=>x.n>1).sort((a,b)=>b.n-a.n)
}

let S={text:'',freq:[],ngr:[],kw:[]},C={};

function mk(id,type,data,opt={}){if(C[id])C[id].destroy();C[id]=new Chart(document.getElementById(id),{type,data,options:{responsive:true,maintainAspectRatio:false,...opt}})}
function esc(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}

// Sincroniza o texto sempre que um botão for clicado
function updateBase() {
    let t = document.getElementById('texto').value.trim();
    if (!t) return false;
    S.text = t;
    S.freq = count(selected(S.text));
    return true;
}

// 1. Nuvem de Palavras
document.getElementById('btnNuvem').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let d = document.getElementById('cloud');
    d.innerHTML = '';
    let mx = Math.max(...S.freq.map(x=>x.n), 1);
    WordCloud(d, {
        list: S.freq.slice(0, 100).map(x => [x.palavra, 12 + (x.n / mx) * 42]),
        gridSize: 8,
        fontFamily: 'Arial',
        color: 'random-dark',
        backgroundColor: 'white',
        rotateRatio: 0.15
    });
};

// 2. Visão Geral
document.getElementById('btnVisao').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let raw = toks(S.text), u = S.freq.length, total = S.freq.reduce((a,b)=>a+b.n,0);
    let sent = S.text.split(/[.!?]+/).filter(x=>x.trim()).length, ttr = total ? u/total : 0;
    
    document.getElementById('metricas').innerHTML = [
        [raw.length, 'Tokens'],
        [u, 'Vocabulário'],
        [(ttr*100).toFixed(1)+'%', 'Riqueza lexical'],
        [sent, 'Sentenças']
    ].map(x=>`<div class="col-sm-6 col-xl-3"><div class="card metric p-3 text-center border-0 bg-light"><b>${x[0]}</b><small>${x[1]}</small></div></div>`).join('');
    
    mk('perfil','doughnut',{
        labels:['Top 5','Demais'],
        datasets:[{data:[S.freq.slice(0,5).reduce((a,b)=>a+b.n,0), Math.max(total-S.freq.slice(0,5).reduce((a,b)=>a+b.n,0),0)]}]
    },{plugins:{legend:{position:'bottom'}}});
};

// 3. Frequência
document.getElementById('btnFreq').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let total = S.freq.reduce((a,b)=>a+b.n,0);
    let a = S.freq.slice(0, 20).reverse();
    
    mk('freqChart','bar',{
        labels: a.map(x=>x.palavra),
        datasets:[{data: a.map(x=>x.n), backgroundColor:'#2C3E50'}]
    },{indexAxis:'y',plugins:{legend:{display:false}}});

    document.querySelector('#freqTable tbody').innerHTML = S.freq.map(x => 
        `<tr><td>${esc(x.palavra)}</td><td>${x.n}</td><td>${((x.n/total)*100).toFixed(2)}%</td></tr>`
    ).join('');
    
    if(window.freqT) window.freqT.destroy();
    window.freqT = new DataTable('#freqTable',{pageLength: 10, lengthChange: false});
};

// 4. N-gramas
document.getElementById('btnNgram').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    S.ngr = ng(selected(S.text), +document.getElementById('ng').value);
    let total = S.ngr.reduce((a,b)=>a+b.n, 0) || 1; // Previne divisão por zero
    let a = S.ngr.slice(0, 20).reverse();
    
    mk('ngChart','bar',{
        labels: a.map(x=>x.grama),
        datasets:[{data:a.map(x=>x.n), backgroundColor:'#536878'}]
    },{indexAxis:'y',plugins:{legend:{display:false}}});
    
    document.querySelector('#ngTable tbody').innerHTML = S.ngr.map(x => 
        `<tr><td>${esc(x.grama)}</td><td>${x.n}</td><td>${((x.n/total)*100).toFixed(2)}%</td></tr>`
    ).join('');
    
    if(window.ngT) window.ngT.destroy();
    window.ngT = new DataTable('#ngTable',{pageLength:10, lengthChange:false});
};

// 5. KWIC
document.getElementById('btnKwic').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let term = norm(document.getElementById('termo').value);
    if(!term) return alert('Insira um termo para buscar o contexto.');
    
    let w = +document.getElementById('janela').value, a = toks(S.text), rows=[];
    a.forEach((x,i)=>{
        if(norm(x)===term) rows.push({pre:a.slice(Math.max(0,i-w),i).join(' '), keyword:x, post:a.slice(i+1,i+w+1).join(' ')});
    });
    S.kw = rows;
    
    document.querySelector('#kwTable tbody').innerHTML = rows.length ? rows.map(x => 
        `<tr><td class="text-end">${esc(x.pre)}</td><td class="text-center text-primary"><b>${esc(x.keyword)}</b></td><td>${esc(x.post)}</td></tr>`
    ).join('') : '<tr><td colspan="3" class="text-center">Termo não encontrado no corpus.</td></tr>';
    
    if(window.kwT) window.kwT.destroy();
    window.kwT = new DataTable('#kwTable',{pageLength:10, lengthChange:false, ordering:false});
};

// 6. Codificação Temática
document.getElementById('codificar').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let cats = document.getElementById('cats').value.split(',').map(x=>x.trim()).filter(Boolean);
    let ss = S.text.split(/[.!?]+/).filter(x=>x.trim());
    
    document.querySelector('#codTable tbody').innerHTML = cats.map(c => {
        let ts = c.split(/\s+/).map(norm);
        let h = ss.filter(s => ts.some(t => norm(s).includes(t)));
        return `<tr><td><b>${esc(c)}</b></td><td>${h.length}</td><td><small>${esc(h.slice(0,3).join(' [...] ')||'—')}</small></td></tr>`
    }).join('');
};


// Utils Gerais
document.getElementById('limpar').onclick = () => {
    document.getElementById('texto').value = '';
    S = {text:'', freq:[], ngr:[], kw:[]};
};

document.getElementById('file').onchange = e => {
    let f = e.target.files[0];
    if(f){ let r=new FileReader(); r.onload=()=>document.getElementById('texto').value=r.result; r.readAsText(f); }
};

// Funções de Exportação
function dl(name,text,type='text/csv'){let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click()}
function csv(a){return a.length?[Object.keys(a[0]).join(','),...a.map(x=>Object.values(x).map(v=>'"'+String(v).replaceAll('"','""')+'"').join(','))].join('\n'):''}

document.getElementById('exFreq').onclick=()=>dl('frequencia.csv',csv(S.freq));
document.getElementById('exNg').onclick=()=>dl('ngrams.csv',csv(S.ngr));
document.getElementById('exKw').onclick=()=>dl('kwic.csv',csv(S.kw));
document.getElementById('exHtml').onclick=()=>dl('relatorio.html',`<meta charset="utf-8"><style>body{font-family:sans-serif;}</style><h1>Relatório de Análise</h1><h2>Frequência (Top 30)</h2><table border="1"><tr><th>Termo</th><th>Frequência</th></tr>${S.freq.slice(0,30).map(x=>`<tr><td>${esc(x.palavra)}</td><td>${x.n}</td></tr>`).join('')}</table><h2>KWIC</h2><pre>${S.kw.map(x=>x.pre+' ['+x.keyword+'] '+x.post).join('\n')}</pre>`,'text/html');

// Redimensiona os gráficos ao trocar de aba para evitar bugs visuais do Chart.js
document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(el => {
    el.addEventListener('shown.bs.tab', () => {
        Object.values(C).forEach(chart => chart.resize());
    });
});
