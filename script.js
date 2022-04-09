const image = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const musicPlayer = document.querySelector("audio")

const btn_prev = document.getElementById("prev")
const btn_play = document.getElementById("play")
const btn_next = document.getElementById("next")

// Music 
const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine", 
        artist: "Jacinto Design",
    }, 
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Jacinto Design",
    },
    {
        name: "metric-1",
        displayName: "Front Row (Remix)",
        artist: "Metric/Jacinto Design",
    },
]

//Does music is playing ? 
let isPlaying = false

//Play song
function playSong() {
    isPlaying = true
    btn_play.classList.replace("fa-play", "fa-pause")
    btn_play.setAttribute("title", "Pause")
    musicPlayer.play()
}

//Pause song
function pauseSong() {
    isPlaying = false
    btn_play.classList.replace("fa-pause", "fa-play")
    btn_play.setAttribute("title", "Play")
    musicPlayer.pause()
}

//Current song
let currentSongIndex = 0

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    musicPlayer.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

//Play prev song
function prevSong() {
    currentSongIndex--
    if (currentSongIndex < 0)
        currentSongIndex = songs.length - 1
    console.log(currentSongIndex)
    loadSong(songs[currentSongIndex])
    playSong()
}

//Play next song
function nextSong() {
    currentSongIndex++
    if (currentSongIndex == songs.length)
        currentSongIndex = 0
    console.log(currentSongIndex)
    loadSong(songs[currentSongIndex])
    playSong()
}

// On laod - Select First Song
loadSong(songs[currentSongIndex])

// Event Listeners
btn_play.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()))
btn_prev.addEventListener("click", prevSong)
btn_next.addEventListener("click", nextSong)
