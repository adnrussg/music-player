const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Time in a Tree",
    artist: "Raleigh Ritchie",
    duration: "3:45",
    src: "./Songs/Time in a Tree.mp3",
    imgsrc: "./SongImages/Time in a Tree.jfif",
  },
  {
    id: 1,
    title: "pinKing",
    artist: "Hoyo-MiX, San-Z",
    duration: "3:06",
    src: "./Songs/pinKing.mp3",
    imgsrc: "./SongImages/pinKing.jfif",
  },
  {
    id: 2,
    title: "I've Got You Under My Skin",
    artist: "Frank Sinatra",
    duration: "3:42",
    src: "./Songs/I've Got You Under My Skin.mp3",
    imgsrc: "./SongImages/I've Got You Under My Skin.jfif",
  },
  {
    id: 3,
    title: "Virgen",
    artist: "Adolescent's Orquesta",
    duration: "4:31",
    src: "./Songs/Virgen.mp3",
    imgsrc: "./SongImages/Virgen.jfif",
  },
  {
    id: 4,
    title: "Buddy Holly",
    artist: "Weezer",
    duration: "2:39",
    src: "./Songs/Buddy Holly.mp3",
    imgsrc: "./SongImages/Buddy Holly.jfif",
  },
  {
    id: 5,
    title: "Chop Suey!",
    artist: "System Of A Down",
    duration: "3:30",
    src: "./Songs/Chop Suey!.mp3",
    imgsrc: "./SongImages/Chop Suey!.jfif",
  },
  {
    id: 6,
    title: "狼之主",
    artist: "塞壬唱片-MSR, Adam Gubman, Shawn W. Smith",
    duration: "3:34",
    src: "./Songs/狼之主.mp3",
    imgsrc: "./SongImages/狼之主.jfif",
  },
  {
    id: 7,
    title: "Lovebug",
    artist: "Jonas Brothers",
    duration: "3:40",
    src: "./Songs/Lovebug.mp3",
    imgsrc: "./SongImages/Lovebug.jfif",
  },
  {
    id: 8,
    title: "Afterglow",
    artist: "Ed Sheeran",
    duration: "3:05",
    src: "./Songs/Afterglow.mp3",
    imgsrc: "./SongImages/Afterglow.jfif",
  },
  {
    id: 9,
    title: "Por Que te Vas",
    artist: "Gaby Moreno",
    duration: "2:57",
    src: "./Songs/Por Que te Vas.mp3",
    imgsrc: "./SongImages/Por Que te Vas.jfif",
  },
  {
    id: 10,
    title: "The Middle",
    artist: "Jimmy Eat World",
    duration: "2:45",
    src: "./Songs/The Middle.mp3",
    imgsrc: "./SongImages/The Middle.jfif",
  },
  {
    id: 11,
    title: "Wildflower and Barley",
    artist: "Hozier",
    duration: "3:42",
    src: "./Songs/Wildflower and Barley.mp3",
    imgsrc: "./SongImages/Wildflower and Barley.jfif",
  },
  {
    id: 12,
    title: "青のすみか",
    artist: "Tatsuya Kitani",
    duration: "3:16",
    src: "./Songs/青のすみか.mp3",
    imgsrc: "./SongImages/青のすみか.jfif",
  },
  {
    id: 13,
    title: "Dystopia",
    artist: "ONE OK ROCK",
    duration: "3:09",
    src: "./Songs/Dystopia.mp3",
    imgsrc: "./SongImages/Dystopia.jfif",
  },
  {
    id: 14,
    title: "Same Blue",
    artist: "OFFICIAL HIGE DANDISM",
    duration: "3:57",
    src: "./Songs/Same Blue.mp3",
    imgsrc: "./SongImages/Same Blue.jfif",
  },
  {
    id: 15,
    title: "キタカゼ",
    artist: "SIX LOUNGE",
    duration: "3:31",
    src: "./Songs/キタカゼ.mp3",
    imgsrc: "./SongImages/キタカゼ.jfif",
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const songImg = document.getElementById("song-cover");
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  songImg.src = song.imgsrc;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
  }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  playSong(userData?.songs[0].id);
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

const getCurrentSongIndex = () =>
  userData?.songs.indexOf(userData?.currentSong);

playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(sortSongs());
setPlayButtonAccessibleText();
