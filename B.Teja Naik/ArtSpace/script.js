const works=[["Dusk Field","Abstract","linear-gradient(160deg,#f6a15b,#7a3b8f)"],["Tidal Lines","Abstract","repeating-linear-gradient(90deg,#1b5e8c 0 14px,#7ec8e3 14px 28px)"],["Red Sun","Minimal","radial-gradient(circle at 50% 40%,#e63946 0 28%,#f1e9da 29%)"],["Two Planes","Minimal","linear-gradient(90deg,#222 50%,#e9d8a6 50%)"],["Night Garden","Landscape","linear-gradient(#0b1d3a 55%,#2f6f4f 55%)"],["Salt Flats","Landscape","linear-gradient(#bfe3f2 60%,#f4efe6 60%)"],["Ember","Abstract","conic-gradient(from 90deg,#ff7b00,#b5179e,#ff7b00)"],["Quiet Hill","Landscape","radial-gradient(ellipse at 50% 120%,#6a994e 0 55%,#d8e2dc 56%)"]];
const tabs=document.getElementById("tabs"),grid=document.getElementById("grid"),dlg=document.getElementById("dlg"),big=document.getElementById("big"),cap=document.getElementById("cap");
const cats=["All",...new Set(works.map(w=>w[1]))];let cur="All";
function draw(){tabs.innerHTML=cats.map(c=>`<button class="${c===cur?"on":""}" data-c="${c}">${c}</button>`).join("");
grid.innerHTML=works.map((w,i)=>cur==="All"||w[1]===cur?`<button class="art" data-i="${i}" style="background:${w[2]}">${w[0]}</button>`:"").join("")}
tabs.addEventListener("click",e=>{if(e.target.dataset.c){cur=e.target.dataset.c;draw()}});
grid.addEventListener("click",e=>{const b=e.target.closest(".art");if(!b)return;const w=works[b.dataset.i];big.style.background=w[2];cap.textContent=w[0]+" · "+w[1];dlg.showModal()});
document.getElementById("x").onclick=()=>dlg.close();draw();
