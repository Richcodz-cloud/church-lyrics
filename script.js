let songs = [];
let isAdmin = false;
const ADMIN_PASSWORD = "admin123";

/* LOAD */
function loadSongs() {
songs = JSON.parse(localStorage.getItem("songs")) || [];
renderSongs(songs);
}

/* LOGIN */
function memberLogin() {
loginBox.style.display="none";
songSection.style.display="block";
isAdmin=false;
addBtn.style.display="none";
loadSongs();
}

function adminLogin() {
if (adminPwd.value === ADMIN_PASSWORD) {
loginBox.style.display="none";
songSection.style.display="block";
isAdmin=true;
addBtn.style.display="inline-block";
loadSongs();
} else alert("Wrong password");
}

function logout(){ location.reload(); }

/* RENDER */
function renderSongs(list) {
songList.innerHTML="";
list.forEach((s,i)=>{
songList.innerHTML+=`
<li><b>${s.title}</b><br>
<button onclick="viewLyrics(${i})">View</button>
${isAdmin?`<button onclick="editSong(${i})">Edit</button>
<button onclick="deleteSong(${i})">Delete</button>`:""}
</li>`;
});
}

/* SEARCH */
function searchSongs() {
let t=searchBox.value.toLowerCase();
renderSongs(songs.filter(s=>s.title.toLowerCase().includes(t)));
}

/* SONG ACTIONS */
function viewLyrics(i){
localStorage.setItem("viewSong",JSON.stringify(songs[i]));
location="lyrics.html";
}

function addSong(){
songs.push({title:title.value,lyrics:lyrics.value});
localStorage.setItem("songs",JSON.stringify(songs));
goBack();
}

function deleteSong(i){
if(confirm("Delete?")){
songs.splice(i,1);
localStorage.setItem("songs",JSON.stringify(songs));
loadSongs();
}
}

function editSong(i){
localStorage.setItem("editIndex",i);
location="edit-song.html";
}

function loadEditSong(){
let i=localStorage.getItem("editIndex");
songs=JSON.parse(localStorage.getItem("songs"))||[];
editTitle.value=songs[i].title;
editLyrics.value=songs[i].lyrics;
}

function updateSong(){
let i=localStorage.getItem("editIndex");
songs[i]={title:editTitle.value,lyrics:editLyrics.value};
localStorage.setItem("songs",JSON.stringify(songs));
goBack();
}

/* LYRICS DISPLAY */
let song=JSON.parse(localStorage.getItem("viewSong"));
if(song && lyricsBox){
lyricsBox.innerHTML=`<h2>${song.title}</h2>
<pre class="lyrics-text">${song.lyrics}</pre>`;
applyText();
}

/* THEME */
function toggleTheme(){ document.body.classList.toggle("dark"); }

/* PROJECTOR CONTROLS */
let fontSize=parseInt(localStorage.getItem("fontSize"))||26;
let lineHeight=parseFloat(localStorage.getItem("lineHeight"))||1.6;

function applyText(){
let l=document.querySelector(".lyrics-text");
if(l){ l.style.fontSize=fontSize+"px"; l.style.lineHeight=lineHeight; }
}

function increaseFont(){ fontSize+=2; localStorage.setItem("fontSize",fontSize); applyText(); }
function decreaseFont(){ if(fontSize>14){ fontSize-=2; applyText(); } }

function increaseLine(){ lineHeight+=0.2; localStorage.setItem("lineHeight",lineHeight); applyText(); }
function decreaseLine(){ if(lineHeight>1.2){ lineHeight-=0.2; applyText(); } }

function toggleFullScreen(){
document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
}

function goBack(){ location="index.html"; }

