let songs=JSON.parse(localStorage.songs||"[]");

function init(){
  renderSongs();
  if(localStorage.role!=="admin") document.getElementById("addBtn").style.display="none";
}

// MENU FUNCTIONS
function toggleMenu(){document.getElementById("menu").classList.toggle("hidden");}
function logout(){localStorage.clear(); location.href="login.html";}
function switchLogin(){localStorage.removeItem("role"); location.href="login.html";}
function goHome(){location.href="index.html";}

// TAB FUNCTIONS
function showTab(tab,el){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  el.classList.add("active");
  ["songsTab","recentTab","favTab"].forEach(id=>document.getElementById(id).classList.add("hidden"));
  document.getElementById(tab+"Tab").classList.remove("hidden");
  if(tab==="songs") renderSongs();
  if(tab==="recent") renderRecent();
  if(tab==="fav") renderFav();
}

// RENDER SONGS (ADMIN + MEMBER)
function renderSongs(){
  let c=document.getElementById("songsTab");
  c.innerHTML="";
  let g={};
  songs.forEach((s,i)=>{ g[s.category]=g[s.category]||[]; g[s.category].push({s,i}); });

  for(let cat in g){
    let d=document.createElement("div");
    d.innerHTML=`
      <div class="category-title" onclick="this.nextElementSibling.classList.toggle('hidden')">${cat}</div>
      <div class="hidden">
        ${g[cat].map(o=>`
          <div class="song-item">
            <span onclick="openLyrics(${o.i})">${o.s.title}</span>
            ${localStorage.role==="admin"?`
              <div class="admin-actions">
                <button onclick="editSong(${o.i})">✏️</button>
                <button onclick="deleteSong(${o.i})">🗑️</button>
              </div>`:""}
          </div>`).join("")}
      </div>`;
    c.appendChild(d);
  }
}

// OPEN LYRICS + TRACK RECENT
function openLyrics(i){
  let r=JSON.parse(localStorage.recent||"[]");
  r=[i,...r.filter(x=>x!==i)].slice(0,5);
  localStorage.recent=JSON.stringify(r);
  localStorage.current=i;
  location.href="lyrics.html";
}

// EDIT / DELETE
function editSong(i){localStorage.edit=i; location.href="edit-song.html";}
function deleteSong(i){if(confirm("Delete this song?")){songs.splice(i,1); localStorage.songs=JSON.stringify(songs); renderSongs();}}

// RECENT & FAVORITES
function renderRecent(){
  let r=JSON.parse(localStorage.recent||"[]");
  recentTab.innerHTML=r.length?r.map(i=>`<div class="song-item" onclick="openLyrics(${i})">${songs[i].title}</div>`).join(""):"<p>No recent songs</p>";
}
function renderFav(){
  let f=JSON.parse(localStorage.fav||"[]");
  favTab.innerHTML=f.length?f.map(i=>`<div class="song-item" onclick="openLyrics(${i})">${songs[i].title}</div>`).join(""):"<p>No favorites</p>";
}

// LYRICS PAGE
function loadLyrics(){
  let s=songs[localStorage.current];
  lyrics.innerHTML=`<h2>${s.title}</h2><pre>${s.lyrics}</pre>`;
}

// SEARCH FUNCTION
function searchSongs(){
  let q=document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".song-item span").forEach(s=>{
    s.parentElement.style.display=s.textContent.toLowerCase().includes(q)?"block":"none";
  });
}
