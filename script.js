let songs=JSON.parse(localStorage.songs||"[]");

function init(){
  renderSongs();
  if(localStorage.role!=="admin") document.getElementById("addBtn").style.display="none";
}

function showTab(tab,el){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  el.classList.add("active");

  ["songsTab","recentTab","favTab"].forEach(i=>{
    document.getElementById(i).classList.add("hidden");
  });
  document.getElementById(tab+"Tab").classList.remove("hidden");

  if(tab==="songs") renderSongs();
  if(tab==="recent") renderRecent();
  if(tab==="fav") renderFav();
}

function renderSongs(){
  let c=document.getElementById("songsTab");
  c.innerHTML="";
  let g={};
  songs.forEach((s,i)=>{
    g[s.category]=g[s.category]||[];
    g[s.category].push({s,i});
  });

  for(let cat in g){
    let d=document.createElement("div");
    d.innerHTML=`
      <div class="category-title" onclick="this.nextElementSibling.classList.toggle('hidden')">${cat}</div>
      <div class="hidden">
        ${g[cat].map(o=>`
          <div class="song-item" onclick="openLyrics(${o.i})">${o.s.title}</div>
        `).join("")}
      </div>`;
    c.appendChild(d);
  }
}

function openLyrics(i){
  let r=JSON.parse(localStorage.recent||"[]");
  r=[i,...r.filter(x=>x!==i)].slice(0,5);
  localStorage.recent=JSON.stringify(r);
  localStorage.current=i;
  location.href="lyrics.html";
}

function renderRecent(){
  let r=JSON.parse(localStorage.recent||"[]");
  recentTab.innerHTML=r.length?r.map(i=>`
    <div class="song-item" onclick="openLyrics(${i})">${songs[i].title}</div>
  `).join(""):"<p>No recent songs</p>";
}

function renderFav(){
  let f=JSON.parse(localStorage.fav||"[]");
  favTab.innerHTML=f.length?f.map(i=>`
    <div class="song-item" onclick="openLyrics(${i})">${songs[i].title}</div>
  `).join(""):"<p>No favorites</p>";
}

function loadLyrics(){
  let s=songs[localStorage.current];
  lyrics.innerHTML=`<h2>${s.title}</h2><pre>${s.lyrics}</pre>`;
}
