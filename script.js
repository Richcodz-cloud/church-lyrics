let songs = JSON.parse(localStorage.getItem("songs")) || [];
let role = localStorage.getItem("role");

function isAdmin(){ return role==="admin"; }

function loadSongs(){
  if(isAdmin()) addBtn.style.display="inline";
  render(songs);
  loadRecent();
  loadFav();
}

function render(arr){
  list.innerHTML="";
  arr.forEach((s,i)=>{
    let li=document.createElement("li");
    li.innerText=s.title;
    li.onclick=()=>openSong(i);

    let fav=document.createElement("span");
    fav.innerText=s.fav?" ⭐":" ☆";
    fav.onclick=e=>{e.stopPropagation();s.fav=!s.fav;save();};
    li.append(fav);

    if(isAdmin()){
      let e=document.createElement("button");
      e.innerText="✏️";
      e.onclick=x=>{x.stopPropagation();editSong(i);}
      let d=document.createElement("button");
      d.innerText="🗑";
      d.onclick=x=>{x.stopPropagation();delSong(i);}
      li.append(e,d);
    }
    list.append(li);
  });
}

function searchSong(){
  let k=search.value.toLowerCase();
  render(songs.filter(s=>s.title.toLowerCase().includes(k)));
}

function openSong(i){
  let r=JSON.parse(localStorage.getItem("recent"))||[];
  r=r.filter(x=>x!==i); r.unshift(i); if(r.length>5) r.pop();
  localStorage.setItem("recent",JSON.stringify(r));
  localStorage.setItem("current",i);
  location.href="lyrics.html";
}

function addSong(){
  if(!isAdmin()) return;
  let t=prompt("Title"); let l=prompt("Lyrics");
  if(t&&l){songs.push({title:t,lyrics:l,fav:false});save();}
}

function editSong(i){
  if(!isAdmin()) return;
  let t=prompt("Title",songs[i].title);
  let l=prompt("Lyrics",songs[i].lyrics);
  if(t&&l){songs[i]={...songs[i],title:t,lyrics:l};save();}
}

function delSong(i){
  if(!isAdmin()) return;
  if(confirm("Delete?")){songs.splice(i,1);save();}
}

function save(){
  localStorage.setItem("songs",JSON.stringify(songs));
  loadSongs();
}

function loadLyrics(){
  let s=songs[localStorage.getItem("current")];
  lyrics.innerHTML=`<h2>${s.title}</h2><pre>${s.lyrics}</pre>`;
  autoFit();
}

function autoFit(){
  let f=20; lyrics.style.fontSize=f+"px";
  while(lyrics.scrollHeight<innerHeight*0.95){f++;lyrics.style.fontSize=f+"px";}
}

function searchLyrics(){
  let k=lyricSearch.value.toLowerCase();
  let s=songs[localStorage.getItem("current")];
  let t=s.lyrics.replace(new RegExp(k,"gi"),m=>`<mark>${m}</mark>`);
  lyrics.innerHTML=`<h2>${s.title}</h2><pre>${k?t:s.lyrics}</pre>`;
}

function loadRecent(){
  recentList.innerHTML="";
  (JSON.parse(localStorage.getItem("recent"))||[]).forEach(i=>{
    let li=document.createElement("li");
    li.innerText=songs[i].title;
    li.onclick=()=>openSong(i);
    recentList.append(li);
  });
}

function loadFav(){
  favList.innerHTML="";
  songs.filter(s=>s.fav).forEach((s,i)=>{
    let li=document.createElement("li");
    li.innerText=s.title;
    li.onclick=()=>openSong(i);
    favList.append(li);
  });
}

function exportSongs(){
  if(!isAdmin()) return;
  let a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([JSON.stringify(songs)]));
  a.download="songs_backup.json";
  a.click();
}

function importSongs(){
  if(!isAdmin()) return;
  fileInput.click();
}

fileInput.onchange=()=>{
  let r=new FileReader();
  r.onload=e=>{songs=JSON.parse(e.target.result);save();};
  r.readAsText(fileInput.files[0]);
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",document.body.className);
}
document.body.className=localStorage.getItem("theme")||"";

function logout(){
  localStorage.clear();
  location.href="login.html";
}
