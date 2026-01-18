let songs = JSON.parse(localStorage.getItem("songs")) || [];
let role = localStorage.getItem("role");

function loadSongs(){
  if(role==="admin") addBtn.style.display="inline";
  render(songs);
}

function render(arr){
  list.innerHTML="";
  arr.forEach((s,i)=>{
    let li=document.createElement("li");
    li.innerText=s.title;
    li.onclick=()=>openSong(i);

    if(role==="admin"){
      let e=document.createElement("button");
      e.innerText="✏️";
      e.onclick=(x)=>{x.stopPropagation();editSong(i);}
      let d=document.createElement("button");
      d.innerText="🗑";
      d.onclick=(x)=>{x.stopPropagation();delSong(i);}
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
  localStorage.setItem("current",i);
  location.href="lyrics.html";
}

function addSong(){
  let t=prompt("Title");
  let l=prompt("Lyrics");
  if(t&&l){songs.push({title:t,lyrics:l});
  save();}
}

function editSong(i){
  let t=prompt("Title",songs[i].title);
  let l=prompt("Lyrics",songs[i].lyrics);
  if(t&&l){songs[i]={title:t,lyrics:l};save();}
}

function delSong(i){
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
  let f=20;
  lyrics.style.fontSize=f+"px";
  while(lyrics.scrollHeight<innerHeight*0.95){f++;lyrics.style.fontSize=f+"px";}
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
