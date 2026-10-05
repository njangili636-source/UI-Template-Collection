const restaurants = [
  {id:1,name:'Hyderabadi House',cuisine:'Biryani • North Indian',rating:4.6,delivery:28,price:300,offer:'20% OFF',items:[
    ['Chicken Biryani','249','Fragrant basmati rice, tender chicken and Hyderabadi spices.','assets/dishes/chicken-biryani-user.png','Biryani'],
    ['Chicken 65','199','Crispy, spicy South Indian chicken bites.','assets/dishes/hyderabadi-haleem.jpg','Starters'],
    ['Rogan Josh','279','Slow-cooked mutton curry with aromatic spices.','assets/dishes/rogan-josh.jpg','Main Course']
  ]},
  {id:2,name:'South Spice',cuisine:'South Indian • Breakfast',rating:4.5,delivery:22,price:220,offer:'FLAT ₹100 OFF',items:[
    ['Masala Dosa','129','Crisp dosa filled with spiced potato masala, chutney and sambar.','assets/dishes/masala-dosa.jpg','South Indian'],
    ['Idli Sambar','99','Soft steamed idlis with hot sambar and chutney.','assets/dishes/idli-sambar.jpg','Breakfast'],
    ['Medu Vada','89','Crispy lentil vadas served with sambar and chutney.','assets/dishes/medu-vada.jpg','South Indian']
  ]},
  {id:3,name:'Street Bites',cuisine:'Indian Snacks • Chaat',rating:4.4,delivery:20,price:180,offer:'20% OFF',items:[
    ['Bhel Puri','79','Crunchy puffed rice chaat with chutneys, sev and vegetables.','assets/street/bhel-puri.jpg','Chaat'],
    ['Pani Puri','79','Crispy puris filled with tangy spiced water and potato.','assets/street/pani-puri.jpg','Chaat'],
    ['Dahi Puri','89','Crispy puris topped with yogurt, chutneys and spices.','assets/street/dahi-puri.jpg','Chaat'],
    ['Aloo Tikki','99','Crispy potato patties served with chutneys.','assets/street/aloo-tikki.jpg','Snacks'],
    ['Bhajiya','89','Crispy Indian fritters served hot with chutneys.','assets/street/bhajiya.jpg','Snacks'],
    ['Kathi Roll','139','Stuffed Indian street-style wrap with fresh fillings.','assets/street/kathi-roll.jpg','Wraps']
  ]},
  {id:4,name:'Sweet House',cuisine:'Desserts • Drinks',rating:4.7,delivery:18,price:200,offer:'FREE DESSERT',items:[
    ['Gulab Jamun','99','Soft milk-solid dumplings soaked in sugar syrup.','assets/street/gulab-jamun.jpg','Desserts'],
    ['Jalebi','89','Crispy spiral sweets soaked in saffron sugar syrup.','assets/street/jalebi.jpg','Desserts'],
    ['Lassi','79','Chilled creamy yogurt drink.','assets/street/lassi.jpg','Drinks'],
    ['Smoothie','119','Cold fruit smoothie served chilled.','assets/street/smoothie.jpg','Drinks'],
    ['Lemonade','79','Fresh chilled lemon drink.','assets/street/lemonade.jpg','Drinks'],
    ['Milkshake','129','Thick chilled milkshake with chocolate topping.','assets/street/milkshake.jpg','Drinks'],
    ['Fruit Cup','109','Fresh seasonal fruit served chilled.','assets/street/fruit-cup.jpg','Desserts'],
    ['Fruit Chaat','119','Fresh mixed fruit with a light chaat seasoning.','assets/street/fruit-chaat.jpg','Desserts']
  ]},
  {id:5,name:'Tandoor Point',cuisine:'North Indian • Tandoor',rating:4.5,delivery:31,price:350,offer:'25% OFF',items:[
    ['Tandoori Chicken','279','Char-grilled chicken marinated in yogurt and spices.','assets/street/tandoori-chicken.jpg','Starters'],
    ['Paneer Tikka','229','Smoky tandoor-grilled paneer with peppers and onions.','assets/dishes/paneer-tikka.jpg','Starters'],
    ['Butter Chicken','289','Tender chicken in creamy tomato and butter gravy.','assets/dishes/butter-chicken-2.jpg','Main Course']
  ]},
  {id:6,name:'Coastal Curry',cuisine:'Seafood • Indian',rating:4.3,delivery:34,price:380,offer:'15% OFF',items:[
    ['Fish Curry','249','Coastal-style fish cooked in tangy spiced curry.','assets/dishes/fish-curry.jpg','Seafood'],
    ['Prawn Masala','299','Juicy prawns cooked with onion, tomato and spices.','assets/dishes/prawn-masala.jpg','Seafood'],
    ['Chicken Korma','279','Creamy mildly spiced chicken curry with whole spices.','assets/dishes/chicken-korma.jpg','Main Course']
  ]},
  {id:7,name:'Pizza Studio',cuisine:'Pizza • Italian',rating:4.6,delivery:25,price:450,offer:'BUY 1 GET 1',items:[
    ['Margherita Pizza','299','Classic tomato, mozzarella and basil pizza.','assets/pizza.png','Pizza'],
    ['Farmhouse Pizza','399','Vegetable-loaded pizza with capsicum, onion and tomato.','assets/pizza.png','Pizza'],
    ['Cheese Pizza','349','Cheesy pizza with a rich mozzarella topping.','assets/pizza.png','Pizza']
  ]},
  {id:8,name:'Delhi Zaika',cuisine:'North Indian • Mughlai',rating:4.4,delivery:29,price:280,offer:'FLAT ₹125 OFF',items:[
    ['Dal Makhani','199','Slow-cooked black lentils finished with butter and cream.','assets/dishes/dal-makhani.jpg','Main Course'],
    ['Aloo Paratha','129','Crisp stuffed paratha with spiced potato filling.','assets/dishes/aloo-paratha.jpg','Breads'],
    ['Chole Bhature','179','Spicy chickpea curry served with fluffy bhature.','assets/street/chole-bhature.jpg','North Indian']
  ]}
];

const categories=['All','Biryani','Pizza','South Indian','North Indian','Chaat','Snacks','Starters','Desserts','Drinks','Seafood','Breakfast','Main Course','Breads'];
let selectedCat='All', selectedRestaurant=null, menuCat='All', modalItem=null, modalQty=1;
let cart=JSON.parse(localStorage.getItem('foodflow_cart_v4')||'[]');
let orders=JSON.parse(localStorage.getItem('foodflow_orders_v4')||'[]');
let favorites=JSON.parse(localStorage.getItem('foodflow_favorites_v4')||'[]');
const $=id=>document.getElementById(id);
const money=v=>'₹'+Number(v).toLocaleString('en-IN');
const itemData=i=>({name:i[0],price:Number(i[1]),desc:i[2],img:i[3],cat:i[4]});
const save=()=>localStorage.setItem('foodflow_cart_v4',JSON.stringify(cart));
const saveFav=()=>localStorage.setItem('foodflow_favorites_v4',JSON.stringify(favorites));
const saveOrders=()=>localStorage.setItem('foodflow_orders_v4',JSON.stringify(orders));
function toast(m){const e=$('toast');e.textContent=m;e.classList.add('show');clearTimeout(window.__t);window.__t=setTimeout(()=>e.classList.remove('show'),1800)}
function showOnly(section){['restaurantsSection','menuSection','ordersSection'].forEach(id=>$(id).classList.toggle('hidden',id!==section));document.querySelector('.categories').classList.toggle('hidden',section!=='restaurantsSection');document.querySelector('.offersStrip').classList.toggle('hidden',section!=='restaurantsSection')}
function renderCategories(){$('categoryChips').innerHTML=categories.map(c=>`<button class="chip ${selectedCat===c?'active':''}" data-cat="${c}">${c}</button>`).join('')}
function filteredRestaurants(){const q=$('searchInput').value.trim().toLowerCase();let list=restaurants.filter(r=>(selectedCat==='All'||r.cuisine.toLowerCase().includes(selectedCat.toLowerCase())||r.items.some(i=>i[4]===selectedCat))&&(!q||r.name.toLowerCase().includes(q)||r.cuisine.toLowerCase().includes(q)||r.items.some(i=>i[0].toLowerCase().includes(q))));const s=$('sortSelect').value;if(s==='rating')list.sort((a,b)=>b.rating-a.rating);if(s==='delivery')list.sort((a,b)=>a.delivery-b.delivery);if(s==='priceLow')list.sort((a,b)=>a.price-b.price);return list}
function restaurantImage(r){return r.items[0][3]}
function renderRestaurants(list=filteredRestaurants()){$('restaurantGrid').innerHTML=list.length?list.map(r=>`<article class="restaurant"><div class="restaurantPhotoWrap"><img class="restaurantImg" src="${restaurantImage(r)}" alt="${r.name}"><button class="heartBtn ${favorites.includes(r.id)?'liked':''}" data-fav="${r.id}">${favorites.includes(r.id)?'♥':'♡'}</button></div><div class="restaurantBody"><div class="restaurantTitle"><h3>${r.name}</h3><span class="rating">★ ${r.rating}</span></div><div class="meta">${r.cuisine}</div><div class="tags">${r.items.slice(0,3).map(i=>`<span class="tag">${i[0]}</span>`).join('')}</div><div class="restaurantBottom"><span>⚡ ${r.delivery} min • ${money(r.price)} for two</span><button class="menuBtn" data-open="${r.id}">View menu →</button></div></div></article>`).join(''):'<div class="emptyState">No restaurants found. Try another search.</div>'}
function openRestaurant(id){selectedRestaurant=restaurants.find(r=>r.id===Number(id));if(!selectedRestaurant)return;menuCat='All';$('restaurantDetail').innerHTML=`<div class="restaurantHero"><img src="${restaurantImage(selectedRestaurant)}" alt="${selectedRestaurant.name}"><div><p class="eyebrow">${selectedRestaurant.offer}</p><h1>${selectedRestaurant.name}</h1><p>${selectedRestaurant.cuisine}</p><p>★ ${selectedRestaurant.rating} • ${selectedRestaurant.delivery} min • ${money(selectedRestaurant.price)} for two</p><p class="muted">Fresh food • Secure checkout • Live order status</p></div></div>`;renderMenuCategories();renderMenu();showOnly('menuSection');window.scrollTo({top:0,behavior:'smooth'})}
function renderMenuCategories(){const cats=['All',...new Set(selectedRestaurant.items.map(i=>i[4]))];$('menuCategories').innerHTML=cats.map(c=>`<button class="menuSideBtn ${menuCat===c?'active':''}" data-menucat="${c}">${c}</button>`).join('')}
function renderMenu(){const items=selectedRestaurant.items.filter(i=>menuCat==='All'||i[4]===menuCat);$('menuItems').innerHTML=items.map(i=>{const idx=selectedRestaurant.items.indexOf(i);const d=itemData(i);const nonveg=/chicken|mutton|fish|prawn|egg|korma|rogan/.test(d.name.toLowerCase());return `<article class="menuItem"><div><span class="veg ${nonveg?'nonveg':''}">● ${nonveg?'NON-VEG':'VEG'}</span><h3>${d.name}</h3><div class="menuPrice">${money(d.price)}</div><p>${d.desc}</p></div><div class="menuVisual"><img src="${d.img}" alt="${d.name}"><button class="menuAdd" data-add="${selectedRestaurant.id}:${idx}">ADD</button></div></article>`}).join('')}
function openItem(rid,idx){const r=restaurants.find(x=>x.id===Number(rid));if(!r||!r.items[idx])return;modalItem={r,i:r.items[idx]};modalQty=1;$('modalImg').src=modalItem.i[3];$('modalRestaurant').textContent=r.name;$('modalName').textContent=modalItem.i[0];$('modalDesc').textContent=modalItem.i[2];$('modalQty').textContent='1';$('extraCheese').checked=false;updateModal();$('itemModal').classList.add('open')}
function itemPrice(){return Number(modalItem.i[1])+(modalItem.i[0].toLowerCase().includes('pizza')&&$('extraCheese').checked?40:0)}
function updateModal(){$('modalQty').textContent=modalQty;$('modalPrice').textContent=money(itemPrice()*modalQty)}
function updateCartCount(){$('cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderCart(){const el=$('cartItems');el.innerHTML=cart.length?cart.map((x,n)=>`<div class="cartLine"><img src="${x.img}" alt="${x.name}"><div><strong>${x.name}</strong><small>${x.restaurant}${x.cheese?' • Extra cheese':''}</small><div class="qty"><button data-qty="${n}:-1">−</button><b>${x.qty}</b><button data-qty="${n}:1">+</button></div></div><strong>${money(x.price*x.qty)}</strong></div>`).join(''):'<div class="emptyCart">Your cart is empty.<br><small>Add something delicious from a restaurant.</small></div>';const sub=cart.reduce((s,x)=>s+x.price*x.qty,0),delivery=cart.length?(sub>=399?0:39):0,fee=cart.length?7:0;$('bill').innerHTML=`<div class="billRow"><span>Item total</span><b>${money(sub)}</b></div><div class="billRow"><span>Delivery fee</span><b>${delivery?'₹39':'FREE'}</b></div><div class="billRow"><span>Platform fee</span><b>${money(fee)}</b></div><div class="billRow total"><span>Total</span><b>${money(sub+delivery+fee)}</b></div>`;$('checkoutBtn').disabled=!cart.length}
function showOrders(){$('ordersList').innerHTML=orders.length?orders.map(o=>`<div class="orderCard"><div><b>${o.restaurant}</b><p>${o.items.join(', ')}</p><small>${o.time} • Order ${o.id}</small></div><div><b>${money(o.total)}</b><p class="status">● ${o.status}</p></div></div>`).join(''):'<div class="emptyState">No orders yet.</div>';showOnly('ordersSection');window.scrollTo({top:0,behavior:'smooth'})}
function showFavorites(){const favs=restaurants.filter(r=>favorites.includes(r.id));if(!favs.length){toast('No favorite restaurants yet');return}showOnly('restaurantsSection');renderRestaurants(favs);window.scrollTo({top:0,behavior:'smooth'})}

document.addEventListener('click',e=>{
 const cat=e.target.closest('[data-cat]');if(cat){selectedCat=cat.dataset.cat;renderCategories();renderRestaurants();return}
 const fav=e.target.closest('[data-fav]');if(fav){const id=Number(fav.dataset.fav);favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];saveFav();renderRestaurants();toast(favorites.includes(id)?'Saved to favorites':'Removed from favorites');return}
 const open=e.target.closest('[data-open]');if(open){openRestaurant(open.dataset.open);return}
 const mc=e.target.closest('[data-menucat]');if(mc&&selectedRestaurant){menuCat=mc.dataset.menucat;renderMenuCategories();renderMenu();return}
 const add=e.target.closest('[data-add]');if(add){const [rid,idx]=add.dataset.add.split(':');openItem(rid,idx);return}
 const q=e.target.closest('[data-qty]');if(q){const [n,delta]=q.dataset.qty.split(':').map(Number);cart[n].qty+=delta;if(cart[n].qty<=0)cart.splice(n,1);save();updateCartCount();renderCart();return}
});

document.addEventListener('DOMContentLoaded',()=>{
 $('categoryChips').addEventListener('click',()=>{});
 $('searchInput').addEventListener('input',renderRestaurants);$('sortSelect').addEventListener('change',renderRestaurants);
 $('clearFilters').onclick=()=>{selectedCat='All';$('searchInput').value='';$('sortSelect').value='rating';renderCategories();renderRestaurants()};
 $('exploreBtn').onclick=()=>{showOnly('restaurantsSection');$('restaurantsSection').scrollIntoView({behavior:'smooth'})};
 $('backRestaurants').onclick=()=>{showOnly('restaurantsSection');renderRestaurants();window.scrollTo({top:0,behavior:'smooth'})};
 $('ordersBtn').onclick=showOrders;$('backFromOrders').onclick=()=>{showOnly('restaurantsSection');renderRestaurants();window.scrollTo({top:0,behavior:'smooth'})};
 $('favBtn').onclick=showFavorites;
 $('locationBtn').onclick=()=>toast('Delivery location: Sai University, Chennai');
 $('offersBtn').onclick=()=>toast('FLAT ₹150 OFF applied to eligible first orders');$('offersHero').onclick=()=>toast('FLAT ₹150 OFF applied to eligible first orders');$('claimOffer').onclick=()=>toast('FLAT ₹150 OFF applied to eligible first orders');
 $('cartBtn').onclick=()=>{$('cartDrawer').classList.add('open');renderCart()};$('closeCart').onclick=()=>$('cartDrawer').classList.remove('open');$('closeModal').onclick=()=>$('itemModal').classList.remove('open');
 $('itemModal').onclick=e=>{if(e.target.id==='itemModal')$('itemModal').classList.remove('open')};$('cartDrawer').onclick=e=>{if(e.target.id==='cartDrawer')$('cartDrawer').classList.remove('open')};
 $('modalPlus').onclick=()=>{modalQty++;updateModal()};$('modalMinus').onclick=()=>{modalQty=Math.max(1,modalQty-1);updateModal()};$('extraCheese').onchange=updateModal;
 $('addModal').onclick=()=>{if(!modalItem)return;const {r,i}=modalItem;const cheese=$('extraCheese').checked&&i[0].toLowerCase().includes('pizza');const key=`${r.id}-${i[0]}-${cheese}`;const found=cart.find(x=>x.key===key);const price=itemPrice();if(found)found.qty+=modalQty;else cart.push({key,rid:r.id,restaurant:r.name,name:i[0],price,qty:modalQty,img:i[3],cheese});save();updateCartCount();$('itemModal').classList.remove('open');toast(`${i[0]} added to cart`)};
 $('checkoutBtn').onclick=()=>{if(!cart.length){toast('Your cart is empty');return}const id='FF'+Date.now().toString().slice(-7),sub=cart.reduce((a,x)=>a+x.price*x.qty,0),delivery=sub>=399?0:39,total=sub+delivery+7;orders.unshift({id,restaurant:cart[0].restaurant,items:cart.map(x=>`${x.name} × ${x.qty}`),total,status:'Preparing',time:new Date().toLocaleString()});saveOrders();cart=[];save();updateCartCount();renderCart();$('cartDrawer').classList.remove('open');toast(`Order ${id} placed successfully`);showOrders()};
 renderCategories();renderRestaurants();updateCartCount();
});
