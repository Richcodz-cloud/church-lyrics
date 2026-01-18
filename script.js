const ADMIN_PASSWORD = "church123";
let songs = JSON.parse(localStorage.getItem("songs")) || [];
let role = localStorage.getItem("role"); // admin / member
let editIndex = localStorage.getItem("editIndex");
let fontSize = parseInt(localStorage.getItem("fontSize")) || 28;

function memberLogin() {
    localStorage.setItem("role", "member");
    showSongs();
}

function adminLogin() {
    let pwd = document.getElementById("adminPwd").value;
    if (pwd === ADMIN_PASSWORD) {
        localStorage.setItem("role", "admin");
        showSongs();
    } else {
        alert("Wrong admin password");
    }
}

function logout() {
    localStorage.removeItem("role");
    location.reload();
}

function showSongs() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("songSection").style.display = "block";

    if (localStorage.getItem("role") === "admin") {
        document.getElementById("addBtn").style.display = "block";
    }

    loadSongs();
}

function loadSongs() {
    let list = document.getElementById("songList");
    list.innerHTML = "";

    songs.forEach((song, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <strong>${song.title}</strong><br><br>
            <button onclick="viewLyrics(${index})">View</button>
            ${role === "admin" ? `
                <button onclick="editSong(${index})">Edit</button>
                <button onclick="deleteSong(${index})">Delete</button>
            ` : ""}
        `;
        list.appendChild(li);
    });
}

function searchSongs() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let list = document.getElementById("songList");
    list.innerHTML = "";

    songs
        .filter(s => s.title.toLowerCase().includes(input))
        .forEach((song, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <strong>${song.title}</strong><br><br>
                <button onclick="viewLyrics(${index})">View</button>
                ${role === "admin" ? `
                    <button onclick="editSong(${index})">Edit</button>
                    <button onclick="deleteSong(${index})">Delete</button>
                ` : ""}
            `;
            list.appendChild(li);
        });
}

function addSong() {
    if (role !== "admin") return;
    let title = document.getElementById("title").value;
    let lyrics = document.getElementById("lyrics").value;

    if (!title || !lyrics) { alert("Enter song name and lyrics"); return; }
    songs.push({ title, lyrics });
    localStorage.setItem("songs", JSON.stringify(songs));
    location.href = "index.html";
}

function editSong(index) {
    if (role !== "admin") return;
    localStorage.setItem("editIndex", index);
    location.href = "edit-song.html";
}

function loadEditSong() {
    if (role !== "admin" || editIndex === null) return;
    document.getElementById("editTitle").value = songs[editIndex].title;
    document.getElementById("editLyrics").value = songs[editIndex].lyrics;
}

function updateSong() {
    if (role !== "admin") return;
    songs[editIndex].title = document.getElementById("editTitle").value;
    songs[editIndex].lyrics = document.getElementById("editLyrics").value;
    localStorage.setItem("songs", JSON.stringify(songs));
    localStorage.removeItem("editIndex");
    location.href = "index.html";
}

function deleteSong(index) {
    if (role !== "admin") return;
    if (confirm("Delete this song?")) {
        songs.splice(index, 1);
        localStorage.setItem("songs", JSON.stringify(songs));
        loadSongs();
    }
}

function viewLyrics(index) {
    localStorage.setItem("viewIndex", index);
    location.href = "lyrics.html";
}

function loadLyrics() {
    let index = localStorage.getItem("viewIndex");
    if (index === null) return;
    document.getElementById("lyricsBox").innerHTML = `
        <h1>${songs[index].title}</h1>
        <pre>${songs[index].lyrics}</pre>
    `;
    applyFontSize();
}

function goBack() { location.href = "index.html"; }

// Font size
function applyFontSize() {
    let lyrics = document.querySelector("#lyricsBox pre");
    if (lyrics) lyrics.style.fontSize = fontSize + "px";
}
function increaseFont() { fontSize += 2; localStorage.setItem("fontSize", fontSize); applyFontSize(); }
function decreaseFont() { if (fontSize>16) { fontSize-=2; localStorage.setItem("fontSize", fontSize); applyFontSize(); } }

// Dark mode
function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");

// Auto-load
if (role) showSongs();
loadEditSong();
loadLyrics();
