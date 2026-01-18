// ------------------ GLOBAL ------------------
let songs = JSON.parse(localStorage.getItem("songs")) || [];
let loginType = localStorage.getItem("loginType") || "member";

// ------------------ SONG LIST ------------------
function loadSongs(){
    const addBtn = document.getElementById("addBtn");
    if(loginType==="admin" && addBtn) addBtn.style.display="inline-block";

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

        if(loginType==="admin"){
            const editBtn = document.createElement("button");
            editBtn.innerText="✏️ Edit";
            editBtn.style.marginLeft="10px";
            editBtn.onclick = (e)=>{
                e.stopPropagation();
                editSong(i);
            };

            const delBtn = document.createElement("button");
            delBtn.innerText="🗑 Delete";
            delBtn.style.marginLeft="5px";
            delBtn.onclick = (e)=>{
                e.stopPropagation();
                deleteSong(i);
            };

            li.appendChild(editBtn);
            li.appendChild(delBtn);
        }

        songList.appendChild(li);
    });
}

// ------------------ SEARCH ------------------
function searchSongs(){
    const keyword = document.getElementById("searchBox").value.toLowerCase();
    const filtered = songs.filter(s=>s.title.toLowerCase().includes(keyword));
    renderSongs(filtered);
}

// ------------------ OPEN SONG ------------------
function openSong(index){
    localStorage.setItem("currentSong",index);
    window.location.href="lyrics.html";
}

// ------------------ ADD/EDIT/DELETE SONG ------------------
function addSong(){
    const title = prompt("Enter Song Title:");
    const lyrics = prompt("Enter Song Lyrics:");
    if(title && lyrics){
        songs.push({title,lyrics});
        localStorage.setItem("songs",JSON.stringify(songs));
        loadSongs();
    }
}

function editSong(index){
    const title = prompt("Edit Song Title:", songs[index].title);
    const lyrics = prompt("Edit Song Lyrics:", songs[index].lyrics);
    if(title && lyrics){
        songs[index]={title,lyrics};
        localStorage.setItem("songs",JSON.stringify(songs));
        loadSongs();
    }
}

function deleteSong(index){
    if(confirm("Are you sure you want to delete this song?")){
        songs.splice(index,1);
        localStorage.setItem("songs",JSON.stringify(songs));
        loadSongs();
    }
}

// ------------------ LYRICS PAGE ------------------
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
    const containerHeight = window.innerHeight * 0.95;
    const containerWidth = window.innerWidth * 0.95;
    let fontSize = 20;
    box.style.fontSize = fontSize + "px";

    while(box.scrollHeight < containerHeight && box.scrollWidth < containerWidth){
        fontSize += 1;
        box.style.fontSize = fontSize + "px";
        if(fontSize > 200) break;
    }
}
window.addEventListener("resize", adjustLyricsHeight);

// ------------------ THEME ------------------
function toggleTheme(){
    if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme","light");
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
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
