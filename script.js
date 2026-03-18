// STARFIELD with subtle movement
const c = document.getElementById("starfield");
const ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

let stars = [];
for(let i=0; i<200; i++){
stars.push({
x: Math.random()*c.width,
y: Math.random()*c.height,
dx: (Math.random()-0.5)*0.15,
dy: (Math.random()-0.5)*0.15
});
}

function drawStars(){
ctx.fillStyle = "#0b1220";
ctx.fillRect(0,0,c.width,c.height);
ctx.fillStyle = "#fff";
stars.forEach(s=>{
ctx.fillRect(s.x,s.y,2,2);
s.x += s.dx;
s.y += s.dy;
if(s.x < 0) s.x = c.width;
if(s.x > c.width) s.x = 0;
if(s.y < 0) s.y = c.height;
if(s.y > c.height) s.y = 0;
});
requestAnimationFrame(drawStars);
}
drawStars();

window.onresize = ()=>{
c.width = window.innerWidth;
c.height = window.innerHeight;
}

// LOCATION POPUP
window.onload = () => {
if(!localStorage.getItem("loc")){
openModal("locationModal");
} else {
loadData();
}

// Enable Enter key on search input
const searchInput = document.getElementById("search");
searchInput.addEventListener("keydown", e => {
if(e.key === "Enter"){
updateLocation(searchInput.value.trim());
}
});
};

// SET LOCATION (mock)
function setLocation(){
localStorage.setItem("loc","Dallas, TX");
closeModal("locationModal");
loadData();
}

function updateLocation(loc){
if(!loc) return alert("Please enter a location.");
localStorage.setItem("loc", loc);
document.getElementById("location").innerText = loc;
loadHourly();
loadForecast();
loadDetails();
}

// LOAD DATA
function loadData(){
document.getElementById("location").innerText = localStorage.getItem("loc") || "Dallas, TX";
loadHourly();
loadForecast();
loadDetails();
}

// HOURLY FORECAST
function loadHourly(){
const h = document.getElementById("hourly");
h.innerHTML = "";
const weatherTypes = [
{icon: "☀️", anim: "sun"},
{icon: "☁️", anim: "cloud"},
{icon: "🌧️", anim: "rain-icon"}
];
for(let i=0; i<12; i++){
let w = weatherTypes[Math.floor(Math.random()*weatherTypes.length)];
h.innerHTML += `<div><div class="weather-icon ${w.anim}">${w.icon}</div>${i+1}h<br>${70+Math.floor(Math.random()*10)}°</div>`;
}
}

// 7 DAY FORECAST (sidebar)
function loadForecast(){
const f = document.getElementById("forecast");
f.innerHTML = "";
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const weatherTypes = ["☀️","☁️","🌧️","⛈️"];
days.forEach(d=>{
const w = weatherTypes[Math.floor(Math.random()*weatherTypes.length)];
const high = 70 + Math.floor(Math.random()*10);
const low = 55 + Math.floor(Math.random()*10);
f.innerHTML += `<div>${d} ${w} <span>${high}° / ${low}°</span></div>`;
});
}

// DETAILS (wind, rain etc)
function loadDetails(){
// This is dummy static data, you can randomize or extend here
document.querySelector(".details").innerHTML = `
<div>Wind: ${(5 + Math.random()*10).toFixed(1)} mph</div>
<div>Rain: ${(Math.random()*30).toFixed(0)}%</div>
`;
}

// RADAR PAGE SHOW/HIDE
function showPage(id){
// hide app main & sidebar when radar active
if(id==="radarPage"){
document.querySelector(".app").style.display = "none";
document.getElementById("radarPage").style.display = "block";
} else {
document.querySelector(".app").style.display = "flex";
document.getElementById("radarPage").style.display = "none";
}
}

function refreshRadar(){
document.querySelectorAll(".radarStorm").forEach(s=>{
s.style.top = (30 + Math.random()*40) + "%";
s.style.left = (30 + Math.random()*40) + "%";
});
}

function closeRadar(){
showPage(""); // back to main app
}

// SUPPORT FORM
function sendSupport(){
const n = document.getElementById("name").value.trim();
const e = document.getElementById("email").value.trim();
const m = document.getElementById("msg").value.trim();

if(!n || !e || !m){
alert("Please fill all fields.");
return;
}

window.location.href = `mailto:hallracing24@gmail.com?subject=Support from ${encodeURIComponent(n)}&body=${encodeURIComponent(m)} (${encodeURIComponent(e)})`;
closeModal("support");
alert("Thank you for your message!");
}

// REVIEW SYSTEM
let rating = 0;
function rate(n){
rating = n;
document.querySelectorAll("#stars span").forEach((s,i)=>{
s.classList.toggle("active", i < n);
});
}

function submitReview(){
const text = document.getElementById("reviewText").value.trim();
if(rating === 0 || !text){
alert("Please select a star rating and write your review.");
return;
}
alert("Thank you for your review!");
closeModal("review");
document.getElementById("reviewText").value = "";
rating = 0;
document.querySelectorAll("#stars span").forEach(s=>s.classList.remove("active"));
}

// MODALS
function openModal(id){
document.getElementById(id).style.display = "block";
}
function closeModal(id){
document.getElementById(id).style.display = "none";
}

// DAILY FORECAST MODAL CONTENT
function loadDailyForecast(){
const container = document.getElementById("dailyForecastList");
container.innerHTML = "";

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const weatherOptions = [
{icon: "☀️", anim: "daily-sun", desc: "Sunny"},
{icon: "☁️", anim: "daily-cloud", desc: "Cloudy"},
{icon: "🌧️", anim: "daily-rain", desc: "Rainy"},
{icon: "⛈️", anim: "daily-rain", desc: "Stormy"}
];

days.forEach(day => {
let w = weatherOptions[Math.floor(Math.random()*weatherOptions.length)];
let high = 70 + Math.floor(Math.random()*10);
let low = 55 + Math.floor(Math.random()*10);

const item = document.createElement("div");
item.className = "daily-forecast-item";
item.innerHTML = `<div class="daily-forecast-icon ${w.anim}">${w.icon}</div><span>${day} - ${w.desc} - ${high}° / ${low}°</span>`;
container.appendChild(item);
});
}

// Open Daily Forecast Modal + load content
document.querySelector('button[onclick="openModal(\'dailyForecastModal\')"]').addEventListener("click", () => {
loadDailyForecast();
});