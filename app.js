const race=new Date("2026-09-20T00:00:00");let tab="race";
const efforts=[
{date:"May 31",total:"3:39:08",swim:"37:35",bike:"1:30:39",run:"1:24:52",hr:158},
{date:"Jun 28",total:"3:22:03",swim:"38:21",bike:"1:28:26",run:"1:10:57",hr:160}];
const state=JSON.parse(localStorage.getItem("raceHQ")||'{"weight":77.8,"raceWeight":77,"notes":"","nutrition":""}');
function save(){localStorage.setItem("raceHQ",JSON.stringify(state))}
function days(){return Math.max(0,Math.ceil((race-new Date())/86400000))}
function card(x){return `<div class="card">${x}</div>`}
function render(){
document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
const c=document.getElementById("content");
if(tab==="race")c.innerHTML=`
<div class="hero"><small>SEPTEMBER 20, 2026</small><div class="days">${days()} DAYS</div><div class="muted">until 5150 Samal</div></div>
<div class="grid"><div class="metric"><small>GOAL</small><b>2:59:59</b></div><div class="metric"><small>READINESS</small><b>87%</b></div></div>
<div class="section-title">Taper milestones</div>${card(`<div class="row"><b>2 weeks out</b><span>Sep 6</span></div><div class="row"><b>1 week out</b><span>Sep 13</span></div><div class="row"><b>Race week</b><span>Sep 14</span></div>`)}
<div class="section-title">Race morning</div>${card(`<div class="check">🏊 <b>Control the swim</b></div><div class="check">🚴 <b>Keep bike HR under control</b></div><div class="check">🏃 <b>Earn the run</b></div>`)}`;
if(tab==="performance")c.innerHTML=`<div class="section-title">5150 performance</div>${efforts.map(e=>card(`<div class="row"><b>${e.date}</b><b>${e.total}</b></div><div class="grid"><div class="metric"><small>SWIM</small><b>${e.swim}</b></div><div class="metric"><small>BIKE</small><b>${e.bike}</b></div><div class="metric"><small>RUN</small><b>${e.run}</b></div><div class="metric"><small>AVG HR</small><b>${e.hr}</b></div></div>`)).join("")}
${card(`<b>Trend</b><p>Your June run split was 13:55 faster than May, while the bike improved by 2:13.</p>`)}`;
if(tab==="target")c.innerHTML=`<div class="section-title">Sub-3 target calculator</div>${card(`<label><b>Goal finish (minutes)</b></label><input id="goal" class="input" type="number" value="179" min="120" max="240"><div class="row"><b>Swim 750m</b><span>18:00</span></div><div class="row"><b>T1</b><span>04:00</span></div><div class="row"><b>Bike 20km</b><span>67:00</span></div><div class="row"><b>T2</b><span>03:00</span></div><div class="row"><b>Run 5km</b><span>47:00</span></div>`)}`;
if(tab==="plan")c.innerHTML=`<div class="section-title">HR zones</div>${card(`<div class="row"><b>Recovery</b><span>Easy</span></div><div class="row"><b>Aerobic</b><span>Endurance</span></div><div class="row"><b>Threshold</b><span>Hard</span></div><div class="row"><b>Max</b><span>Very hard</span></div>`)}
${card(`<b>Samal course notes</b><textarea id="notes" class="input" placeholder="Water, elevation, wind, heat, road conditions...">${state.notes}</textarea><b>Nutrition plan</b><textarea id="nutrition" class="input" placeholder="Gels, fluids, electrolytes, timing...">${state.nutrition}</textarea><button class="btn" onclick="savePlan()">Save notes</button>`)}`;
if(tab==="body")c.innerHTML=`<div class="section-title">Body & readiness</div>${card(`<label><b>Current weight</b></label><input id="weight" class="input" type="number" step=".1" value="${state.weight}"><label><b>Race target</b></label><input id="raceWeight" class="input" type="number" step=".1" value="${state.raceWeight}"><p>Change to target: <b>${(state.weight-state.raceWeight).toFixed(1)} kg</b></p><div class="progress"><i style="width:${Math.min(100,Math.max(0,(84-state.weight)/(84-state.raceWeight)*100))}%"></i></div><br><button class="btn" onclick="saveWeight()">Save weight</button>`)}`;
}
function savePlan(){state.notes=document.getElementById("notes").value;state.nutrition=document.getElementById("nutrition").value;save();alert("Saved")}
function saveWeight(){state.weight=+document.getElementById("weight").value;state.raceWeight=+document.getElementById("raceWeight").value;save();render()}
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render()});render();
