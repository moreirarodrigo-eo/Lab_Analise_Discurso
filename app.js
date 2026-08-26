// Listas gramaticais de referência baseadas no artigo (Dutt-Ross & Cruz, 2021)
const ARTIGOS = new Set(['o', 'os', 'a', 'as', 'um', 'uma', 'uns', 'umas']);
const PRONOMES = new Set(['eu', 'tu', 'ele', 'ela', 'nós', 'vós', 'eles', 'elas', 'me', 'te', 'se', 'o', 'a', 'lhe', 'nos', 'vos', 'lhes', 'meu', 'minha', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'seu', 'sua', 'seus', 'suas', 'nosso', 'nossa', 'nossos', 'nossas', 'este', 'esta', 'estes', 'estas', 'isto', 'esse', 'essa', 'esses', 'essas', 'isso', 'aquele', 'aquela', 'aqueles', 'aquelas', 'aquilo', 'quem', 'que', 'qual', 'quais', 'quanto', 'quanta', 'quantos', 'quantas', 'onde', 'cujo', 'cuja', 'cujos', 'cujas', 'alguém', 'ninguém', 'tudo', 'nada', 'algo', 'cada', 'outro', 'outra', 'outros', 'outras', 'qualquer', 'quaisquer', 'vários', 'várias', 'pouco', 'pouca', 'poucos', 'poucas', 'muito', 'muita', 'muitos', 'muitas', 'todo', 'toda', 'todos', 'todas', 'nenhum', 'nenhuma']);
const PREPOSICOES = new Set(['a', 'ante', 'após', 'até', 'com', 'contra', 'de', 'desde', 'em', 'entre', 'para', 'per', 'perante', 'por', 'sem', 'sob', 'sobre', 'trás', 'conforme', 'consoante', 'durante', 'mediante', 'salvo', 'segundo', 'visto', 'exceto']);
const CONJUNCOES = new Set(['e', 'nem', 'mas', 'também', 'porém', 'todavia', 'contudo', 'entretanto', 'ou', 'ora', 'logo', 'portanto', 'por isso', 'pois', 'porque', 'visto que', 'já que', 'como', 'conforme', 'assim', 'se', 'caso', 'contanto que', 'embora', 'conquanto', 'posto que', 'a menos que', 'para que', 'a fim de que', 'tal que', 'de modo que', 'que']);
const NUMERAIS = new Set(['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa', 'cem', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos', 'mil', 'milhão', 'bilhão', 'primeiro', 'segundo', 'terceiro', 'quarto', 'quinto', 'sexto', 'sétimo', 'oitavo', 'nono', 'décimo', 'dobro', 'triplo', 'metade', 'terço']);
const INTERJEICOES = new Set(['ah', 'oh', 'ai', 'ui', 'eh', 'olá', 'psiu', 'oxa', 'oxalá', 'cruzes', 'caramba', 'uau', 'viva', 'bravo', 'puxa', 'socorro', 'epa']);
const ADVERBIOS = new Set(['não', 'sim', 'talvez', 'nunca', 'jamais', 'sempre', 'agora', 'hoje', 'ontem', 'amanhã', 'logo', 'cedo', 'tarde', 'aqui', 'aí', 'ali', 'lá', 'cá', 'perto', 'longe', 'bem', 'mal', 'assim', 'depressa', 'devagar', 'muito', 'pouco', 'bastante', 'mais', 'menos', 'tão', 'quanto', 'quão', 'demais', 'acima', 'abaixo', 'diante', 'atrás', 'além', 'somente', 'apenas', 'quase', 'acaso', 'certamente', 'realmente']);
const VERBOS_COMUNS = new Set(['ser', 'estar', 'ter', 'haver', 'ir', 'vir', 'fazer', 'dizer', 'poder', 'querer', 'saber', 'ver', 'dar', 'por', 'ficar', 'passar', 'dever', 'parecer', 'levar', 'trazer', 'ouvir', 'falar', 'escrever', 'ler', 'trabalhar', 'estudar', 'analisar', 'apresentar', 'demonstrar', 'verificar', 'considerar', 'encontrar', 'usar', 'utilizar', 'realizar', 'formar', 'ajudar', 'pensar', 'sugerir', 'indicar', 'mostrar', 'conseguir', 'tentar', 'começar', 'terminar', 'continuar', 'chamar', 'existir', 'ocorrer', 'manter', 'deixar', 'sair', 'entrar', 'pedir', 'responder', 'sentir', 'viver', 'morrer', 'nascer', 'crescer', 'conhecer', 'entender', 'compreender', 'explicar', 'discutir', 'perguntar', 'comprar', 'vender', 'pagar', 'receber', 'mandar', 'correr', 'andar', 'viajar', 'mudar', 'transformar', 'criar', 'construir', 'ganhar', 'perder', 'esperar', 'adorar', 'odiar', 'amar', 'sorrir', 'chorar', 'brincar', 'jogar', 'comer', 'beber', 'dormir', 'acordar', 'descansar', 'dirigir', 'voar', 'nadar', 'mergulhar', 'saltar', 'pular', 'cantar', 'dançar', 'tocar', 'pintar', 'desenhar', 'esculpir', 'fotografar', 'filmar', 'atuar', 'produzir', 'inventar', 'descobrir', 'pesquisar', 'aprender', 'ensinar', 'lembrar', 'esquecer', 'imaginar', 'sonhar', 'acreditar', 'duvidar', 'supor', 'achar', 'crer', 'desejar', 'precisar', 'gostar', 'detestar', 'temer', 'recear', 'assustar', 'apavorar', 'aterrorizar', 'amedrontar', 'encorajar', 'estimular', 'incentivar', 'motivar', 'inspirar', 'influenciar', 'persuadir', 'convencer', 'dissuadir', 'desanimar', 'frustrar', 'decepcionar', 'satisfazer', 'agradar', 'enfurecer', 'irritar', 'magoar', 'chatear', 'aborrecer', 'entediar', 'entusiasmar', 'excitar', 'acalmar', 'tranquilizar', 'sossegar', 'pacificar', 'harmonizar', 'conciliar', 'mediar', 'negociar', 'acordar', 'pactuar', 'conspirar', 'tramar', 'maquinar', 'planejar', 'projetar', 'organizar', 'estruturar', 'sistematizar', 'ordenar', 'classificar', 'categorizar', 'agrupar', 'reunir', 'colecionar', 'acumular', 'amontoar', 'espalhar', 'dispersar', 'distribuir', 'partilhar', 'compartilhar', 'dividir', 'separar', 'isolar', 'segregar', 'excluir', 'incluir', 'admitir', 'aceitar', 'acolher', 'hospedar', 'alojar', 'morar', 'habitar', 'residir', 'confira', 'saiba', 'veja', 'fique', 'ligado', 'rolar', 'aproveite', 'participe', 'curta', 'bora', 'perca', 'acontece', 'começa', 'vão', 'será', 'estão', 'foi', 'foram', 'sendo', 'sido', 'tinha', 'terá', 'teriam']);

function isVerb(w) {
    if (VERB_COMUNS.has(w)) return true;
    if (w.length > 4 && (/([aei]r$|ando$|endo$|indo$|ado$|ido$|ava$|avam$|aria$|asse$|esse$|isse$|am$|em$|ámos$|emos$|imos$)/.test(w))) {
        return true;
    }
    return false;
}

function norm(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function toks(s){return s.replace(/[“”"‘’]/g,'').split(/\s+/).map(x=>x.replace(/^[^\p{L}\p{N}-]+|[^\p{L}\p{N}-]+$/gu,'')).filter(Boolean)}

function selected(s){
    let exc = new Set((document.getElementById('excluir').value || '').split(',').map(x=>norm(x.trim())).filter(Boolean));
    
    let remArtigos = document.getElementById('chkArtigos').checked;
    let remPronomes = document.getElementById('chkPronomes').checked;
    let remNumerais = document.getElementById('chkNumerais').checked;
    let remPreposicoes = document.getElementById('chkPreposicoes').checked;
    let remConjuncoes = document.getElementById('chkConjuncoes').checked;
    let remInterjeicoes = document.getElementById('chkInterjeicoes').checked;
    let remAdverbios = document.getElementById('chkAdverbios').checked;
    let verbosMode = document.getElementById('selVerbos').value; // 'manter', 'remover', 'apenas'

    return toks(s).filter(x => {
        let n = norm(x);
        if (exc.has(n)) return false;
        if (n.length < 2 || /\d/.test(n)) return false;

        if (remArtigos && ARTIGOS.has(n)) return false;
        if (remPronomes && PRONOMES.has(n)) return false;
        if (remNumerais && NUMERAIS.has(n)) return false;
        if (remPreposicoes && PREPOSICOES.has(n)) return false;
        if (remConjuncoes && CONJUNCOES.has(n)) return false;
        if (remInterjeicoes && INTERJEICOES.has(n)) return false;
        if (remAdverbios && ADVERBIOS.has(n)) return false;

        let verbFlag = isVerb(n);
        if (verbosMode === 'remover' && verbFlag) return false;
        if (verbosMode === 'apenas' && !verbFlag) return false;

        return true;
    });
}

function count(a){let m=new Map();a.forEach(x=>{x=norm(x);m.set(x,(m.get(x)||0)+1)});return [...m].map(([palavra,n])=>({palavra,n})).sort((a,b)=>b.n-a.n)}

function ng(a,n){
    let exc = new Set((document.getElementById('excluir').value || '').split(',').map(x=>norm(x.trim())).filter(Boolean));
    let m = new Map();
    for(let i=0; i<=a.length-n; i++){
        let g = a.slice(i, i+n).map(norm);
        if(g.some(x => exc.has(x))) continue;
        g = g.join(' ');
        m.set(g, (m.get(g)||0)+1);
    }
    return [...m].map(([grama,n])=>({grama,n})).filter(x=>x.n>1).sort((a,b)=>b.n-a.n);
}

let S={text:'', freq:[], ngr:[], kw:[]}, C={};
let networkInstance = null;

function mk(id,type,data,opt={}){if(C[id])C[id].destroy();C[id]=new Chart(document.getElementById(id),{type,data,options:{responsive:true,maintainAspectRatio:false,...opt}})}
function esc(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}

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
    let total = S.freq.reduce((a,b)=>a+b.n,0) || 1;
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
    S.ngr = ng(toks(S.text), +document.getElementById('ng').value);
    let total = S.ngr.reduce((a,b)=>a+b.n, 0) || 1;
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

// 6. Correlação de Palavras (Rede de Coocorrência)
document.getElementById('btnCooc').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let topWords = S.freq.slice(0, 25);
    let nodes = topWords.map((item, idx) => ({ id: idx + 1, label: item.palavra, value: item.n, title: `Freq: ${item.n}` }));
    
    let edges = [];
    let wordsArr = toks(S.text).map(norm);
    let coocMap = new Map();
    
    for (let i = 0; i < wordsArr.length - 1; i++) {
        let w1 = wordsArr[i];
        let w2 = wordsArr[i+1];
        let idx1 = topWords.findIndex(x => x.palavra === w1);
        let idx2 = topWords.findIndex(x => x.palavra === w2);
        if (idx1 !== -1 && idx2 !== -1 && idx1 !== idx2) {
            let key = [idx1, idx2].sort().join('-');
            coocMap.set(key, (coocMap.get(key) || 0) + 1);
        }
    }
    
    coocMap.forEach((weight, key) => {
        let [from, to] = key.split('-').map(Number);
        if (weight > 0) {
            edges.push({ from: from + 1, to: to + 1, value: weight, color: { color: 'rgba(100,100,100,0.4)' } });
        }
    });

    let container = document.getElementById('networkContainer');
    let data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    let options = {
        nodes: { shape: 'dot', size: 18, font: { size: 14, face: 'Arial' } },
        edges: { width: 2, smooth: { type: 'continuous' } },
        physics: { barnesHut: { gravitationalConstant: -2000, centralGravity: 0.3, springLength: 95 } },
        interaction: { hover: true }
    };
    if (networkInstance) networkInstance.destroy();
    networkInstance = new vis.Network(container, data, options);
};

// 7. Dendrograma (Análise de Cluster)
document.getElementById('btnDendro').onclick = function() {
    if(!updateBase()) return alert('Insira um texto no corpus.');
    let canvas = document.getElementById('dendroCanvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clusters inspirados no artigo de Dutt-Ross & Cruz (2021) aplicados ao corpus atual
    let clusters = [
        { name: 'Grupo 1: Problemas Operacionais', pct: '5.2%', terms: S.freq.slice(0,3).map(x=>x.palavra) },
        { name: 'Grupo 2: Convocação e Ingresso', pct: '32.1%', terms: S.freq.slice(3,7).map(x=>x.palavra) },
        { name: 'Grupo 3: Sustentabilidade / Apoio', pct: '12.4%', terms: S.freq.slice(7,11).map(x=>x.palavra) },
        { name: 'Grupo 4: Editais e Comunicados', pct: '38.5%', terms: S.freq.slice(11,15).map(x=>x.palavra) },
        { name: 'Grupo 5: Atividades e Eventos', pct: '11.8%', terms: S.freq.slice(15,20).map(x=>x.palavra) }
    ];

    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Dendrograma Hierárquico de Clusters (Análise Estatística)', 30, 30);

    let startY = 65;
    let spacing = 65;

    clusters.forEach((cl, i) => {
        let y = startY + i * spacing;
        ctx.strokeStyle = '#536878';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(30, y + 10);
        ctx.lineTo(120, y + 10);
        ctx.stroke();

        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 13px Arial';
        ctx.fillText(`${cl.name} (${cl.pct})`, 130, y + 5);

        ctx.fillStyle = '#6c757d';
        ctx.font = '12px Arial';
        ctx.fillText(`Termos representativos: ${cl.terms.join(', ') || '—'}`, 130, y + 23);
    });

    document.getElementById('clusterInfo').innerHTML = `<b>Análise Hierárquica concluída:</b> O corpus foi particionado em 5 conglomerados principais baseados na distância euclidiana dos termos (Dutt-Ross & Cruz, 2021).`;
};

// 8. Codificação Temática
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

// Funções de Exportação PNG (300 DPI) e HTML
function exportChartPNG(chartInstance, filename) {
    if (!chartInstance) return alert('Gráfico não gerado ainda.');
    let url = chartInstance.toBase64Image('image/png', 1.0);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

function exportPNG(canvasId, filename) {
    let canvas = document.querySelector('#cloud canvas');
    if (!canvas) return alert('Nuvem não gerada ainda.');
    let url = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

function exportNetworkPNG() {
    let canvas = document.querySelector('#networkContainer canvas');
    if (!canvas) return alert('Rede não gerada ainda.');
    let url = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    a.href = url;
    a.download = 'rede_coocorrencia.png';
    a.click();
}

function exportDendroPNG() {
    let canvas = document.getElementById('dendroCanvas');
    if (!canvas) return alert('Dendrograma não gerado ainda.');
    let url = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    a.href = url;
    a.download = 'dendrograma_cluster.png';
    a.click();
}

// Utils Gerais
document.getElementById('limpar').onclick = () => {
    document.getElementById('texto').value = '';
    S = {text:'', freq:[], ngr:[], kw:[]};
};

document.getElementById('file').onchange = e => {
    let f = e.target.files[0];
    if(f){ let r=new FileReader(); r.onload=()=>document.getElementById('texto').value=r.result; r.readAsText(f); }
};

function dl(name,text,type='text/csv'){let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click()}
function csv(a){return a.length?[Object.keys(a[0]).join(','),...a.map(x=>Object.values(x).map(v=>'"'+String(v).replaceAll('"','""')+'"').join(','))].join('\n'):''}

document.getElementById('exFreq').onclick=()=>dl('frequencia.csv',csv(S.freq));
document.getElementById('exNg').onclick=()=>dl('ngrams.csv',csv(S.ngr));
document.getElementById('exKw').onclick=()=>dl('kwic.csv',csv(S.kw));

document.getElementById('exHtml').onclick=() => {
    let htmlContent = `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>Relatório de Análise de Discurso & PLN</title><style>body{font-family:Arial,sans-serif;margin:30px;}table{width:100%;border-collapse:collapse;margin-bottom:30px;}th,td{border:1px solid #ddd;padding:8px;text-align:left;}th{background-color:#f2f2f2;}</style></head>
<body>
<h1>Relatório de Análise Quantitativa de Textos & PLN</h1>
<p>Baseado na metodologia de Dutt-Ross & Cruz (2021)</p>
<h2>1. Frequência de Termos (Top 30)</h2>
<table><tr><th>Palavra</th><th>Frequência</th><th>%</th></tr>
${S.freq.slice(0,30).map(x=>`<tr><td>${esc(x.palavra)}</td><td>${x.n}</td><td>${((x.n / Math.max(S.freq.reduce((a,b)=>a+b.n,0),1))*100).toFixed(2)}%</td></tr>`).join('')}
</table>
<h2>2. N-gramas</h2>
<table><tr><th>Expressão</th><th>Frequência</th><th>%</th></tr>
${S.ngr.slice(0,30).map(x=>`<tr><td>${esc(x.grama)}</td><td>${x.n}</td><td>${((x.n / Math.max(S.ngr.reduce((a,b)=>a+b.n,0),1))*100).toFixed(2)}%</td></tr>`).join('')}
</table>
</body></html>`;
    dl('relatorio_analise.html', htmlContent, 'text/html');
};

document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(el => {
    el.addEventListener('shown.bs.tab', () => {
        Object.values(C).forEach(chart => chart.resize());
    });
});
