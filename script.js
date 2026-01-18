let songs = [];
let role = "member";
const adminPassword = "admin123";

/* LOAD SONGS */
function loadSongs() {
    let stored = localStorage.getItem("songs");
    songs = stored ? JSON.parse(stored) : [];

    displaySongs(songs);
}

/* DISPLAY SONGS */
function displaySongs(list) {
    let ul = document.getElementById("songList");
    ul.innerHTML = "";

    list.forEach((song, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <b>${song.title}</b><br><br>
            <button onclick="viewLyrics(${index})">View</button>
            ${role === "admin" ? `
                <button onclick="editSong(${index})">Edit</button>
                <button onclick="deleteSong(${index})">Delete</button>
            ` : ""}
        `;
        ul.appendChild(li);
    });
}

/* SEARCH SONGS (MEMBERS) */
function searchSongs() {
    let text = document.getElementById("searchInput").value.toLowerCase();
    let filtered = songs.filter(song =>
        song.title.toLowerCase().includes(text)
    );
    displaySongs(filtered);
}

/* VIEW LYRICS */
function viewLyrics(index) {
    localStorage.setItem("viewIndex", index);
    window.location = "lyrics.html";
}

/* ADMIN LOGIN */
function adminLogin() {
    let pass = prompt("Enter admin password:");
    if (pass === adminPassword) {
        role = "admin";
        alert("Admin logged in");
        displaySongs(songs);
    } else {
        alert("Wrong password");
    }
}

/* DELETE SONG */
function deleteSong(index) {
    if (!confirm("Delete song?")) return;
    songs.splice(index, 1);
    localStorage.setItem("songs", JSON.stringify(songs));
    displaySongs(songs);
}
