const news=[["Tech","Chip makers expand plants across South Asia","New fabrication sites are planned over the next three years.","2h ago"],["Sports","Chennai side wins a tense final in extra time","A late goal decided the match in front of a full stadium.","3h ago"],["Business","Retail sales rise as festive season begins","Online and in-store demand both grew compared with last year.","5h ago"],["Science","Researchers map a new coral reef off the coast","The reef spans several kilometres and is largely healthy.","7h ago"],["Tech","Open-source tools gain ground in schools","Teachers report faster setup and lower costs.","9h ago"],["Business","Fuel prices hold steady for a second week","Analysts expect little change before the month ends.","1d ago"]];
const tabs=document.getElementById("tabs"),feed=document.getElementById("feed"),q=document.getElementById("q");
const cats=["All","Saved",...new Set(news.map(n=>n[0]))];let cur="All",saved=new Set();
function draw(){tabs.innerHTML=cats.map(c=>`<button class="${c===cur?"on":""}" data-c="${c}">${c}</button>`).join("");
const t=q.value.toLowerCase();
const r=news.map((n,i)=>({n,i})).filter(({n,i})=>(cur==="All"||(cur==="Saved"?saved.has(i):n[0]===cur))&&(!t||n[1].toLowerCase().includes(t)));
feed.innerHTML=r.length?r.map(({n,i})=>`<article><div><small>${n[0]} · ${n[3]}</small><h2>${n[1]}</h2><p>${n[2]}</p></div><button class="sv" data-i="${i}" aria-label="${saved.has(i)?"Remove from saved":"Save story"}">${saved.has(i)?"★":"☆"}</button></article>`).join(""):"<p>"+(cur==="Saved"?"Nothing saved yet. Tap the star on a story.":"No stories match your search.")+"</p>"}
tabs.addEventListener("click",e=>{if(e.target.dataset.c){cur=e.target.dataset.c;draw()}});
feed.addEventListener("click",e=>{const b=e.target.closest(".sv");if(b){const i=+b.dataset.i;saved.has(i)?saved.delete(i):saved.add(i);draw()}});
q.addEventListener("input",draw);draw();
