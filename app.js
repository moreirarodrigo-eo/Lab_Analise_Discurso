const SW = new Set(`a à às ao aos aquele aquela aquelas aqueles aquilo aqui ainda algo algum alguma algumas alguns ali ambos ampla amplo amplas amplos antes após as até com como contra da das de dela delas dele deles depois dessa dessas desse desses desta destas deste destes do dos e é em enquanto entre era eram essa essas esse esses esta está estão estas este estes eu foi foram há isso isto já mais mas me meu meus minha minhas na não nas nem nesse nessa nesta neste no nos nós nossa nossas nosso nossos num numa nunca o os ou outra outras outro outros para pela pelas pelo pelos por porque qual quando quanto que quem se sem ser seu seus sob sobre sua suas também tem tendo tenha tenham tenho te toda todas todo todos tu tua tuas um uma umas uns vai vais vamos você vocês vos`.split(/\s+/));
const verbSuffixes = /(ando|endo|indo|ado|ido|ava|avam|aria|asse|esse|isse|[aei]r)$/i;

function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') }
function toks(s) { return s.replace(/[“”"‘’]/g, '').split(/\s+/).map(x => x.replace(/^[^\p{L}\p{N}-]+|[^\p{L}\p{N}-]+$/gu, '')).filter(Boolean) }

function bard(x) { 
    if (x.length < 3 || SW.has(x)) return false; 
    return !(x.length > 5 && ['ar', 'er', 'ir', 'ando', 'endo', 'indo', 'ado', 'ido', 'ava', 'avam', 'aria', 'asse', 'esse', 'isse'].some(e => x.endsWith(e))) 
}

function selected(s) {
    let exc = new Set((document.getElementById('excluir').value || '').split(',').map(x => norm(x.trim())).filter(Boolean));
    let removeVerbs = document.getElementById('removerVerbos').checked;
    
    return toks(s).filter(x => {
        let n = norm(x);
        if (exc.has(n)) return false;
        
        // Aplica o filtro de verbos universal se a caixa estiver marcada
        if (removeVerbs && n.length > 4 && verbSuffixes.test(n)) return false;

        return n.length > 1 && !/\d/.test(n) && (document.querySelector('[name=metodo]:checked').value === 'pln' ? !SW.has(n) : bard(n))
    });
}

function count(a) { 
    let m = new Map(); a.forEach(x => { x = norm(x); m.set(x, (m.get(x) || 0) + 1) }); 
    return [...m].map(([palavra, n]) => ({ palavra, n })).sort((a, b) => b.n - a.n) 
}

function ng(a, n) {
    let exc = new Set((document.getElementById('excluir').value || '').split(',').map(x => norm(x.trim())).filter(Boolean));
    let m = new Map();
    for (let i = 0; i <= a.length - n; i++) {
        let g = a.slice(i, i + n).map(norm);
        if (g.some(x => SW.has(x) || exc.has(x))) continue;
        g = g.join(' ');
        m.set(g, (m.get(g) || 0) + 1)
    }
    return [...m].map(([grama, n]) => ({ grama, n })).filter(x => x.n > 1).sort((a, b) => b.n - a.n)
}

let S = { text: '', freq: [], ngr: [], kw: [] }, C = {};
let networkInstance = null;
let dendroInstance = null;

function mk(id, type, data, opt = {}) {
    if (C[id]) C[id].destroy();
    C[id] = new Chart(document.getElementById(id), { type, data, options: { responsive: true, maintainAspectRatio: false, devicePixelRatio: 3, ...opt } })
}
function esc(s) { return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;') }

function updateBase() {
    let t = document.getElementById('texto').value.trim();
    if (!t) return false;
    S.text = t;
    S.freq = count(selected(S.text));
    return true;
}

// 1 a 6 mantidos iguais (Nuvem, Visão, Freq, Ngram, Kwic, Temas)...
document.getElementById('btnNuvem').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let d = document.getElementById('cloud'); d.innerHTML = '';
    let mx = Math.max(...S.freq.map(x=>x.n), 1);
    WordCloud(d, { list: S.freq.slice(0, 100).map(x => [x.palavra, 12 + (x.n / mx) * 42]), gridSize: 8, fontFamily: 'Arial', color: 'random-dark', backgroundColor: 'white', rotateRatio: 0.15 });
};

document.getElementById('btnVisao').onclick = function() {
    if(!updateBase()) return;
    let raw = toks(S.text), u = S.freq.length, total = S.freq.reduce((a,b)=>a+b.n,0);
    let sent = S.text.split(/[.!?]+/).filter(x=>x.trim()).length, ttr = total ? u/total : 0;
    document.getElementById('metricas').innerHTML = [[raw.length, 'Tokens'], [u, 'Vocabulário'], [(ttr*100).toFixed(1)+'%', 'Riqueza lexical'], [sent, 'Sentenças']].map(x=>`<div class="col-sm-6 col-xl-3"><div class="card metric p-3 text-center border-0 bg-light"><b>${x[0]}</b><small>${x[1]}</small></div></div>`).join('');
    mk('perfil','doughnut',{labels:['Top 5','Demais'],datasets:[{data:[S.freq.slice(0,5).reduce((a,b)=>a+b.n,0), Math.max(total-S.freq.slice(0,5).reduce((a,b)=>a+b.n,0),0)]}]},{plugins:{legend:{position:'bottom'}}});
};

document.getElementById('btnFreq').onclick = function() {
    if(!updateBase()) return;
    let total = S.freq.reduce((a,b)=>a+b.n,0), a = S.freq.slice(0, 20).reverse();
    mk('freqChart','bar',{labels: a.map(x=>x.palavra),datasets:[{data: a.map(x=>x.n), backgroundColor:'#2C3E50'}]},{indexAxis:'y',plugins:{legend:{display:false}}});
    document.querySelector('#freqTable tbody').innerHTML = S.freq.map(x => `<tr><td>${esc(x.palavra)}</td><td>${x.n}</td><td>${((x.n/total)*100).toFixed(2)}%</td></tr>`).join('');
    if(window.freqT) window.freqT.destroy(); window.freqT = new DataTable('#freqTable',{pageLength: 10, lengthChange: false});
};

document.getElementById('btnNgram').onclick = function() {
    if(!updateBase()) return;
    S.ngr = ng(selected(S.text), +document.getElementById('ng').value);
    let total = S.ngr.reduce((a,b)=>a+b.n, 0) || 1, a = S.ngr.slice(0, 20).reverse();
    mk('ngChart','bar',{labels: a.map(x=>x.grama),datasets:[{data:a.map(x=>x.n), backgroundColor:'#536878'}]},{indexAxis:'y',plugins:{legend:{display:false}}});
    document.querySelector('#ngTable tbody').innerHTML = S.ngr.map(x => `<tr><td>${esc(x.grama)}</td><td>${x.n}</td><td>${((x.n/total)*100).toFixed(2)}%</td></tr>`).join('');
    if(window.ngT) window.ngT.destroy(); window.ngT = new DataTable('#ngTable',{pageLength:10, lengthChange:false});
};

document.getElementById('btnKwic').onclick = function() {
    if(!updateBase()) return;
    let term = norm(document.getElementById('termo').value);
    if(!term) return alert('Insira um termo para buscar o contexto.');
    let w = +document.getElementById('janela').value, a = toks(S.text), rows=[];
    a.forEach((x,i)=>{ if(norm(x)===term) rows.push({pre:a.slice(Math.max(0,i-w),i).join(' '), keyword:x, post:a.slice(i+1,i+w+1).join(' ')}); });
    S.kw = rows;
    document.querySelector('#kwTable tbody').innerHTML = rows.length ? rows.map(x => `<tr><td class="text-end">${esc(x.pre)}</td><td class="text-center text-primary"><b>${esc(x.keyword)}</b></td><td>${esc(x.post)}</td></tr>`).join('') : '<tr><td colspan="3" class="text-center">Termo não encontrado no corpus.</td></tr>';
    if(window.kwT) window.kwT.destroy(); window.kwT = new DataTable('#kwTable',{pageLength:10, lengthChange:false, ordering:false});
};

document.getElementById('codificar').onclick = function() {
    if(!updateBase()) return;
    let cats = document.getElementById('cats').value.split(',').map(x=>x.trim()).filter(Boolean), ss = S.text.split(/[.!?]+/).filter(x=>x.trim());
    document.querySelector('#codTable tbody').innerHTML = cats.map(c => {
        let ts = c.split(/\s+/).map(norm), h = ss.filter(s => ts.some(t => norm(s).includes(t)));
        return `<tr><td><b>${esc(c)}</b></td><td>${h.length}</td><td><small>${esc(h.slice(0,3).join(' [...] ')||'—')}</small></td></tr>`
    }).join('');
};

// 7. Rede de Coocorrência (Matriz de Vizinhança)
function getCooccurrenceEdges(limit = 25) {
    let topWords = S.freq.slice(0, limit).map(x => x.palavra);
    let edgesMap = new Map();
    let sentences = S.text.split(/[.!?]+/).map(s => selected(s));
    
    sentences.forEach(sent => {
        let uniqueWords = [...new Set(sent.filter(w => topWords.includes(w)))];
        for (let i = 0; i < uniqueWords.length; i++) {
            for (let j = i + 1; j < uniqueWords.length; j++) {
                let pair = [uniqueWords[i], uniqueWords[j]].sort().join('-');
                edgesMap.set(pair, (edgesMap.get(pair) || 0) + 1);
            }
        }
    });
    
    return { topWords, edgesMap };
}

document.getElementById('btnRede').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let { topWords, edgesMap } = getCooccurrenceEdges(30);
    
    let nodes = topWords.map((w, i) => ({ id: w, label: w, value: S.freq[i].n, font: { size: 16 } }));
    let edges = [...edgesMap].map(([pair, weight]) => {
        let [from, to] = pair.split('-');
        return { from, to, value: weight, title: `Ocorrências conjuntas: ${weight}` };
    }).filter(e => e.value > 1); // Remove ligações muito fracas

    let container = document.getElementById('networkMap');
    if (networkInstance) networkInstance.destroy();
    networkInstance = new vis.Network(container, { nodes, edges }, {
        nodes: { shape: 'dot', color: { background: '#97C2FC', border: '#2B7CE9' } },
        edges: { color: '#cccccc', smooth: false },
        physics: { stabilization: true, barnesHut: { gravitationalConstant: -3000 } }
    });
};

// 8. Dendograma (Agrupamento Hierárquico Mockado)
document.getElementById('btnCluster').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let { topWords, edgesMap } = getCooccurrenceEdges(15);
    
    // Algoritmo simplificado de agrupamento aglomerativo para gerar árvore
    let nodes = topWords.map(w => ({ id: w, label: w, group: 'leaf', shape: 'box' }));
    let edges = [];
    let clusters = topWords.map(w => [w]);
    let clusterId = 0;

    // Constrói agrupamentos baseados na força de ligação (Single-linkage simplificado)
    let sortedEdges = [...edgesMap].sort((a, b) => b[1] - a[1]);
    
    sortedEdges.forEach(([pair, weight]) => {
        let [w1, w2] = pair.split('-');
        let c1 = clusters.findIndex(c => c.includes(w1));
        let c2 = clusters.findIndex(c => c.includes(w2));
        
        if (c1 !== c2 && c1 !== -1 && c2 !== -1) {
            let newClusterName = `Cluster_${clusterId++}`;
            nodes.push({ id: newClusterName, label: '', shape: 'dot', size: 5, color: '#555' });
            
            // Ligações aos grupos antigos (usando o primeiro elemento do array como ID raiz anterior)
            edges.push({ from: newClusterName, to: clusters[c1][0] });
            edges.push({ from: newClusterName, to: clusters[c2][0] });
            
            let merged = [...clusters[c1], ...clusters[c2]];
            // Substitui o primeiro cluster com o nó recém-criado na frente para referência pai
            merged.unshift(newClusterName); 
            
            clusters = clusters.filter((_, i) => i !== c1 && i !== c2);
            clusters.push(merged);
        }
    });

    let container = document.getElementById('dendrogramMap');
    if (dendroInstance) dendroInstance.destroy();
    dendroInstance = new vis.Network(container, { nodes, edges }, {
        layout: { hierarchical: { direction: 'UD', sortMethod: 'directed', levelSeparation: 80 } },
        edges: { color: '#888', smooth: { type: 'cubicBezier' } },
        physics: false
    });
};

// Utils Gerais de Exportação
document.getElementById('limpar').onclick = () => { document.getElementById('texto').value = ''; S = {text:'', freq:[], ngr:[], kw:[]}; };
document.getElementById('file').onchange = e => { let f = e.target.files[0]; if(f){ let r=new FileReader(); r.onload=()=>document.getElementById('texto').value=r.result; r.readAsText(f); } };

function dl(name, text, type='text/csv') { let a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type})); a.download = name; a.click(); }
function csv(a) { return a.length ? [Object.keys(a[0]).join(','), ...a.map(x => Object.values(x).map(v => '"'+String(v).replaceAll('"','""')+'"').join(','))].join('\n') : ''; }

document.getElementById('exFreq').onclick = () => dl('frequencia.csv', csv(S.freq));
document.getElementById('exNg').onclick = () => dl('ngrams.csv', csv(S.ngr));
document.getElementById('exKw').onclick = () => dl('kwic.csv', csv(S.kw));

// Exportar Canvas (Alta Resolução - aprox. 300dpi)
document.getElementById('exPngCharts').onclick = () => {
    Object.keys(C).forEach(key => {
        let link = document.createElement('a');
        link.download = `grafico_${key}_300dpi.png`;
        link.href = C[key].canvas.toDataURL("image/png", 1.0); // Resolução garantida via devicePixelRatio: 3 no mk()
        link.click();
    });
};

// Exportar HTML com Imagens embutidas
document.getElementById('exHtml').onclick = () => {
    let imgTags = Object.keys(C).map(key => `<h3>Gráfico: ${key}</h3><img style="max-width:100%" src="${C[key].canvas.toDataURL("image/png")}" />`).join('');
    
    let htmlContent = `
    <!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:sans-serif; margin: 40px;} table{border-collapse:collapse;width:100%;margin-bottom:20px} th,td{border:1px solid #ccc;padding:8px;text-align:left} th{background:#f4f4f4}</style></head>
    <body>
        <h1>Relatório de Análise Quantitativa de Textos</h1>
        <h2>Frequência (Top 30)</h2>
        <table><tr><th>Termo</th><th>Frequência</th></tr>${S.freq.slice(0,30).map(x=>`<tr><td>${esc(x.palavra)}</td><td>${x.n}</td></tr>`).join('')}</table>
        <h2>Contexto (KWIC)</h2>
        <pre>${S.kw.map(x=>`${x.pre} [${x.keyword}] ${x.post}`).join('\n')}</pre>
        <hr>
        <h2>Gráficos Gerados</h2>
        ${imgTags}
    </body></html>`;
    dl('relatorio_completo.html', htmlContent, 'text/html');
};

document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(el => {
    el.addEventListener('shown.bs.tab', () => {
        Object.values(C).forEach(chart => chart.resize());
        if(networkInstance) networkInstance.fit();
        if(dendroInstance) dendroInstance.fit();
    });
});
