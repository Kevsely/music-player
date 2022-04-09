const image = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const musicPlayer = document.querySelector("audio")

const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const currentTimeElmt = document.getElementById("current-time")
const durationElmt = document.getElementById("duration")

const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")

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
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "Pause")
    musicPlayer.play()
}

//Pause song
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", "Play")
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
    loadSong(songs[currentSongIndex])
    playSong()
}

//Play next song
function nextSong() {
    currentSongIndex++
    if (currentSongIndex == songs.length)
        currentSongIndex = 0
    loadSong(songs[currentSongIndex])
    playSong()
}

// Update Progress Bar
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        // Update progress bar width
        const progressPercentage = (currentTime / duration) * 100
        progress.style.width = `${progressPercentage}%`

        // Update the song duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10)   durationSeconds = `0${durationSeconds}`
        // Check that computed duration is ready before display it
        if (durationSeconds) durationElmt.textContent = `${durationMinutes}:${durationSeconds}`
        
        // Update the song current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10)   currentSeconds = `0${currentSeconds}`
        // Check that computed current is ready before display it
        currentTimeElmt.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set the progress bar
function setProgressBar(e) {
    const width = e.srcElement.clientWidth
    const clickX = e.offsetX
    const { duration } = musicPlayer
    
    musicPlayer.currentTime = (duration * (clickX / width))
}

// On laod - Select First Song
loadSong(songs[currentSongIndex])

// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()))
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
musicPlayer.addEventListener("timeupdate", updateProgressBar)
progressContainer.addEventListener("click", setProgressBar)
