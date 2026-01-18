// ------------------ GLOBAL ------------------
let songs = JSON.parse(localStorage.getItem("songs")) || [];
let loginType = localStorage.getItem("loginType") || "member";

// ------------------ SONG LIST ------------------
function loadSongs(){
    if(loginType==="admin") document.getElementById("addBtn").style.display="inline-block";
    songs = JSON.parse(localStorage.getItem("songs")) || [];
    renderSongs(songs);
}

function renderSongs(list){
    const songList = document.getElementById("songList");
    songList.innerHTML="";
    list.forEach((s,i)=>{
        const li = document.createElement("li");
        li.innerText = s.title;
        li.onclick = ()=>openSong(i);
        songList.appendChild(li);
    });
}

function searchSongs(){
    const keyword = document.getElementById("searchBox").value.toLowerCase();
    const filtered = songs.filter(s=>s.title.toLowerCase().includes(keyword));
    renderSongs(filtered);
}

function openSong(index){
    localStorage.setItem("currentSong",index);
    window.location.href="lyrics.html";
}

// ------------------ LYRICS ------------------
function loadLyrics(){
    const index = localStorage.getItem("currentSong");
    const box = document.getElementById("lyricsBox");
    if(!box || !songs[index]) return;
    box.innerHTML = `<h2>${songs[index].title}</h2><pre>${songs[index].lyrics}</pre>`;
    adjustLyricsHeight();
}

function adjustLyricsHeight(){
    const box = document.getElementById("lyricsBox");
    if(!box) return;
    const containerHeight = window.innerHeight * 0.9;
    let fontSize = 20;
    box.style.fontSize = fontSize + "px";
    while(box.scrollHeight < containerHeight){
        fontSize += 1;
        box.style.fontSize = fontSize + "px";
        if(fontSize > 200) break;
    }
}
window.addEventListener("resize", adjustLyricsHeight);

// ------------------ FULLSCREEN ------------------
function toggleFullScreen(){
    document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
}

// ------------------ THEME ------------------
function toggleTheme(){
    if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark"); document.body.classList.add("light");
        localStorage.setItem("theme","light");
    } else {
        document.body.classList.remove("light"); document.body.classList.add("dark");
        localStorage.setItem("theme","dark");
    }
}
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

// ------------------ LOGOUT ------------------
function logout(){
    localStorage.removeItem("loginType");
    window.location.href="login.html";
}

// ------------------ HAMBURGER MENU ------------------
const hamburger = document.getElementById("hamburgerMenu");
if(hamburger){
    hamburger.addEventListener("click",()=>{
        hamburger.classList.toggle("active");
    });
}
