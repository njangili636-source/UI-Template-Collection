const recipes=[{n:"Tomato Rasam",t:"30 min",s:4,i:[["tomato",3],["tamarind pulp (tbsp)",1],["garlic cloves",4],["rasam powder (tsp)",2]],m:["Boil tomatoes with tamarind and garlic.","Add rasam powder and water; simmer 10 minutes.","Temper with mustard and curry leaves."]},
{n:"Lemon Rice",t:"20 min",s:2,i:[["cooked rice (cup)",2],["lemon",1],["peanuts (tbsp)",2],["turmeric (tsp)",1]],m:["Fry peanuts and turmeric in oil.","Mix in rice.","Add lemon juice and salt."]},
{n:"Masala Omelette",t:"10 min",s:1,i:[["egg",2],["onion",1],["green chilli",1],["tomato",1]],m:["Whisk eggs with chopped onion, chilli and tomato.","Pour into a hot oiled pan.","Cook both sides until set."]},
{n:"Veg Fried Rice",t:"25 min",s:3,i:[["cooked rice (cup)",3],["carrot",1],["onion",1],["soy sauce (tbsp)",2],["egg",2]],m:["Stir-fry onion and carrot on high heat.","Scramble in the eggs.","Add rice and soy sauce; toss 3 minutes."]}];
const q=document.getElementById("q"),list=document.getElementById("list"),view=document.getElementById("view");
function show(){const t=q.value.toLowerCase();const r=recipes.filter(x=>!t||x.i.some(a=>a[0].includes(t)));
list.innerHTML=r.length?r.map(x=>`<button class="card" data-n="${x.n}"><b>${x.n}</b><small>${x.t} · serves ${x.s}</small></button>`).join(""):"<p>No recipe uses that ingredient. Try another.</p>"}
function openRecipe(n,sv){const x=recipes.find(r=>r.n===n);sv=sv||x.s;const f=sv/x.s;
view.hidden=false;view.innerHTML=`<h2>${x.n}</h2><div class="sv"><button aria-label="Fewer servings" data-d="-1">−</button><span>${sv} servings</span><button aria-label="More servings" data-d="1">+</button></div>
<h3>Ingredients</h3><ul>${x.i.map(a=>`<li>${+(a[1]*f).toFixed(1)} ${a[0]}</li>`).join("")}</ul><h3>Method</h3><ol>${x.m.map(s=>`<li>${s}</li>`).join("")}</ol>`;
view.dataset.n=n;view.dataset.sv=sv}
list.addEventListener("click",e=>{const c=e.target.closest(".card");if(c){openRecipe(c.dataset.n);view.scrollIntoView({behavior:"smooth"})}});
view.addEventListener("click",e=>{const b=e.target.closest("[data-d]");if(b)openRecipe(view.dataset.n,Math.max(1,+view.dataset.sv+ +b.dataset.d))});
q.addEventListener("input",show);show();
