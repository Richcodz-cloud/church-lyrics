// ------------------ GLOBAL ------------------
let songs = JSON.parse(localStorage.getItem("songs")) || [];
let isAdmin = false;
const ADMIN_PASSWORD = "admin123";

// Restore theme / font / line spacing on all pages
document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme") || "light";
    document.body.classList.remove("light","dark");
    document.body.classList.add(theme);

    const fontSize = parseInt(localStorage.getItem("fontSize"));
    const lineHeight = parseFloat(localStorage.getItem("lineHeight"));
    const lyrics = document.querySelector(".lyrics");
    if(lyrics){
        if(fontSize) lyrics.style.fontSize = fontSize+"px";
        if(lineHeight) lyrics.style.lineHeight = lineHeight;
    }
});

// ------------------ LOGIN ------------------
function memberLogin(){loginBox.style.display="none"; songSection.style.display="block"; isAdmin=false; addBtn.style.display="none"; loadSongs();}
function adminLogin(){
    if(adminPwd.value===ADMIN_PASSWORD){loginBox.style.display="none"; songSection.style.display="block"; isAdmin=true; addBtn.style.display="inline-block"; loadSongs();}
    else alert("Wrong password");
}
function logout(){location.reload();}

// ------------------ SONG LIST ------------------
function loadSongs(){songs = JSON.parse(localStorage.getItem("songs")) || songs; renderSongs(songs);}
function renderSongs(list){
    const songList = document.getElementById("songList");
    if(!songList) return;
    songList.innerHTML="";
    list.forEach((s,i)=>{
        const li = document.createElement("li");
        li.innerHTML=`<span>${s.title}</span>`;
        li.onclick = ()=>openSong(i);
        if(isAdmin) li.innerHTML += ` <button onclick="editSong(${i})">Edit</button> <button onclick="deleteSong(${i})">Delete</button>`;
        songList.appendChild(li);
    });
}

// ------------------ SEARCH & HIGHLIGHT ------------------
function searchSongs(){
    const keyword = document.getElementById("searchBox").value.toLowerCase();
    const list = document.getElementById("songList"); list.innerHTML="";
    if(keyword==="") renderSongs(songs);
    songs.forEach((song,index)=>{
        if(song.title.toLowerCase().includes(keyword)){
            const li = document.createElement("li");
            const regex = new RegExp(`(${keyword})`,"gi");
            li.innerHTML = song.title.replace(regex, `<span class="highlight">$1</span>`);
            li.onclick = ()=>openSong(index);
            list.appendChild(li);
        }
    });
}

// ------------------ CATEGORY FILTER ------------------
function filterCategory(cat){
    let filtered = songs;
    if(cat!=="All") filtered = songs.filter(s=>s.category===cat);
    renderSongs(filtered);
}

// ------------------ SONG ACTIONS ------------------
function openSong(index){localStorage.setItem("currentSong",index); window.location.href="lyrics.html";}
function addSong(){
    songs.push({title:title.value, lyrics:lyrics.value, category:category.value});
    localStorage.setItem("songs",JSON.stringify(songs));
    goBack();
}
function deleteSong(i){if(confirm("Delete?")){songs.splice(i,1); localStorage.setItem("songs",JSON.stringify(songs)); loadSongs();}}
function editSong(i){localStorage.setItem("editIndex",i); location="edit-song.html";}
function loadEditSong(){
    let i = localStorage.getItem("editIndex");
    editTitle.value = songs[i].title;
    editLyrics.value = songs[i].lyrics;
    editCategory.value = songs[i].category;
}
function updateSong(){
    let i = localStorage.getItem("editIndex");
    songs[i] = {title:editTitle.value, lyrics:editLyrics.value, category:editCategory.value};
    localStorage.setItem("songs",JSON.stringify(songs));
    goBack();
}

// ------------------ BACK BUTTON ------------------
function goBack(){
    localStorage.setItem("theme", document.body.classList.contains("dark")?"dark":"light");
    localStorage.setItem("fontSize", document.querySelector(".lyrics")?.style.fontSize.replace("px",""));
    localStorage.setItem("lineHeight", document.querySelector(".lyrics")?.style.lineHeight);
    window.history.back();
    setTimeout(()=>{location.reload();},100);
}

// ------------------ THEME ------------------
function toggleTheme(){
    if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark"); document.body.classList.add("light"); localStorage.setItem("theme","light");
    } else {
        document.body.classList.remove("light"); document.body.classList.add("dark"); localStorage.setItem("theme","dark");
    }
}

// ------------------ LYRICS + FONT + LINE ------------------
let fontSize = parseInt(localStorage.getItem("fontSize")) || 26;
let lineHeight = parseFloat(localStorage.getItem("lineHeight")) || 1.6;
let scrollInterval;
function applyText(){
    const l = document.querySelector(".lyrics");
    if(l){ l.style.fontSize = fontSize+"px"; l.style.lineHeight = lineHeight; }
}
function increaseFont(){fontSize+=2; localStorage.setItem("fontSize",fontSize); applyText();}
function decreaseFont(){if(fontSize>14){fontSize-=2; localStorage.setItem("fontSize",fontSize); applyText();}}
function increaseLine(){lineHeight+=0.2; localStorage.setItem("lineHeight",lineHeight); applyText();}
function decreaseLine(){if(lineHeight>1.2){lineHeight-=0.2; localStorage.setItem("lineHeight",lineHeight); applyText();}}

// ------------------ AUTO-SCROLL ------------------
function startScroll(){stopScroll(); const box=document.getElementById("lyricsBox"); scrollInterval=setInterval(()=>{box.scrollTop+=1;},100);}
function stopScroll(){clearInterval(scrollInterval);}

// ------------------ FULLSCREEN ------------------
function toggleFullScreen(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}

// ------------------ LOAD LYRICS PAGE ------------------
const currentIndex = localStorage.getItem("currentSong");
if(currentIndex !== null){
    const box = document.getElementById("lyricsBox");
    if(box && songs[currentIndex]){
        box.innerHTML = `<h2>${songs[currentIndex].title}</h2><pre class="lyrics-text">${songs[currentIndex].lyrics}</pre>`;
        applyText();
    }
}
