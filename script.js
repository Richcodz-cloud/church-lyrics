let songs = [];
let isAdmin = false;
const ADMIN_PASSWORD = "admin123";

/* LOAD SONGS */
function loadSongs() {
songs = JSON.parse(localStorage.getItem("songs")) || [];
renderSongs(songs);
}

/* MEMBER LOGIN */
function memberLogin() {
document.getElementById("loginBox").style.display = "none";
document.getElementById("songSection").style.display = "block";
isAdmin = false;
document.getElementById("addBtn").style.display = "none";
loadSongs();
}

/* ADMIN LOGIN */
function adminLogin() {
let pwd = document.getElementById("adminPwd").value;
if (pwd === ADMIN_PASSWORD) {
document.getElementById("loginBox").style.display = "none";
document.getElementById("songSection").style.display = "block";
isAdmin = true;
document.getElementById("addBtn").style.display = "inline-block";
loadSongs();
} else {
alert("Wrong Password");
}
}

/* LOGOUT */
function logout() {
location.reload();
}

/* RENDER SONGS */
function renderSongs(list) {
let ul = document.getElementById("songList");
ul.innerHTML = "";

list.forEach((song, index) => {
let li = document.createElement("li");
li.innerHTML = `
<b>${song.title}</b><br><br>
<button onclick="viewLyrics(${index})">View</button>
${isAdmin ? `
<button onclick="editSong(${index})">Edit</button>
<button onclick="deleteSong(${index})">Delete</button>
` : ""}
`;
ul.appendChild(li);
});
}

/* SEARCH */
function searchSongs() {
let text = document.getElementById("searchBox").value.toLowerCase();
let filtered = songs.filter(s => s.title.toLowerCase().includes(text));
renderSongs(filtered);
}

/* VIEW */
function viewLyrics(index) {
localStorage.setItem("viewSong", JSON.stringify(songs[index]));
window.location = "lyrics.html";
}

/* ADD SONG */
function addSong() {
let title = document.getElementById("title").value;
let lyrics = document.getElementById("lyrics").value;

songs.push({ title, lyrics });
localStorage.setItem("songs", JSON.stringify(songs));
goBack();
}

/* DELETE */
function deleteSong(index) {
if (confirm("Delete song?")) {
songs.splice(index, 1);
localStorage.setItem("songs", JSON.stringify(songs));
loadSongs();
}
}

/* EDIT */
function editSong(index) {
localStorage.setItem("editIndex", index);
window.location = "edit-song.html";
}

function loadEditSong() {
let index = localStorage.getItem("editIndex");
songs = JSON.parse(localStorage.getItem("songs")) || [];
document.getElementById("editTitle").value = songs[index].title;
document.getElementById("editLyrics").value = songs[index].lyrics;
}

function updateSong() {
let index = localStorage.getItem("editIndex");
songs[index].title = document.getElementById("editTitle").value;
songs[index].lyrics = document.getElementById("editLyrics").value;
localStorage.setItem("songs", JSON.stringify(songs));
goBack();
}

/* LYRICS PAGE */
let song = JSON.parse(localStorage.getItem("viewSong"));
if (song && document.getElementById("lyricsBox")) {
document.getElementById("lyricsBox").innerHTML =
`<h2>${song.title}</h2><pre>${song.lyrics}</pre>`;
}

/* THEME */
function toggleTheme() {
document.body.classList.toggle("dark");
}

function goBack() {
window.location = "index.html";
}
