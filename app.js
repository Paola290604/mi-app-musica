// 🎵 Lista de canciones
const songs = [
  {
    title: "Coraline",
    artist: "Maneskin",
    cover: "https://i.scdn.co/image/ab67616d0000b2735aa05015cfa7bd2943c29b21",
    src: "songs/coraline.mp3"
  },
  {
    title: "Pretty isn’t pretty",
    artist: "Olivia Rodrigo",
    cover: "https://lcpantherpress.com/wp-content/uploads/2023/09/guts.jpeg",
    src: "songs/pretty-isnt-pretty.mp3"
  },
  {
    title: "Cien años",
    artist: "Pedro Infante",
    cover: "https://i.scdn.co/image/ab67616d0000b273111ca667e0c0dd5a7e269c57",
    src: "songs/pedro-infante-cien-anos.mp3"
  },
  {
    title: "Perfect",
    artist: "One Direction",
    cover: "https://i.ytimg.com/vi/mpWY4ck6yr4/mqdefault.jpg",
    src: "songs/one-direction-perfect.mp3"
  },
  {
    title: "Amazing Day",
    artist: "Coldplay",
    cover: "https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6",
    src: "songs/amazing-day.mp3"
  }
];

// 🎯 Referencias del DOM
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("nav button");
const recommendedList = document.getElementById("recommendedList");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const audioPlayer = document.getElementById("audioPlayer");

const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const volumeControl = document.getElementById("volumeControl");
const darkModeToggle = document.getElementById("darkModeToggle");

let currentIndex = 0;
let isPlaying = false;

// 🔹 Cambiar página
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

// 🔹 Mostrar canciones en Inicio
function renderSongs() {
  recommendedList.innerHTML = "";
  songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.classList.add("song-card");
    card.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">
      <div class="song-info">
        <div>${song.title}</div>
        <div>${song.artist}</div>
      </div>
    `;
    card.addEventListener("click", () => loadSong(index, true));
    recommendedList.appendChild(card);
  });
}

// 🔹 Buscar canciones
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = "";
  songs
    .filter(s => s.title.toLowerCase().includes(query) || s.artist.toLowerCase().includes(query))
    .forEach((song, index) => {
      const card = document.createElement("div");
      card.classList.add("song-card");
      card.innerHTML = `
        <img src="${song.cover}" alt="${song.title}">
        <div class="song-info">
          <div>${song.title}</div>
          <div>${song.artist}</div>
        </div>
      `;
      card.addEventListener("click", () => loadSong(index, true));
      searchResults.appendChild(card);
    });
});

// 🔹 Cargar canción
function loadSong(index, play = false) {
  currentIndex = index;
  const song = songs[index];
  playerCover.src = song.cover;
  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist;
  audioPlayer.src = song.src;

  if (play) {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
  }
}

// 🔹 Controles
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶️";
  } else {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
  }
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex, true);
});
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex, true);
});

// 🔹 Progreso
audioPlayer.addEventListener("timeupdate", () => {
  progress.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  totalTimeEl.textContent = formatTime(audioPlayer.duration);
});
progress.addEventListener("input", () => {
  audioPlayer.currentTime = (progress.value / 100) * audioPlayer.duration;
});

// 🔹 Volumen
volumeControl.addEventListener("input", () => {
  audioPlayer.volume = volumeControl.value;
});

// 🔹 Auto siguiente
audioPlayer.addEventListener("ended", () => {
  nextBtn.click();
});

// 🔹 Formato de tiempo mm:ss
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// 🔹 Modo oscuro
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkModeToggle.checked);
});

// 🔹 Inicializar
renderSongs();
loadSong(0);
