const flights=[["06:15","AI 431","Delhi","A4","On time"],["07:40","6E 214","Mumbai","B2","Boarding"],["08:05","UK 837","Bengaluru","A1","Delayed"],["09:30","AI 102","Singapore","C3","On time"],["10:10","EK 545","Dubai","C1","On time"],["11:25","SG 308","Kolkata","B5","Cancelled"],["12:00","6E 771","Hyderabad","A6","Delayed"],["13:45","QR 573","Doha","C2","Boarding"]];
const rows=document.getElementById("rows"),q=document.getElementById("q"),st=document.getElementById("st"),empty=document.getElementById("empty");
function render(){const t=q.value.toLowerCase(),s=st.value;
const list=flights.filter(f=>(!s||f[4]===s)&&(!t||f.join(" ").toLowerCase().includes(t)));
rows.innerHTML=list.map(f=>`<tr><td>${f[0]}</td><td>${f[1]}</td><td>${f[2]}</td><td>${f[3]}</td><td><span class="s ${f[4].slice(0,2)}">${f[4]}</span></td></tr>`).join("");
empty.hidden=list.length>0}
q.addEventListener("input",render);st.addEventListener("change",render);render();
