// Import file
import playlist from "./playlist.js";
import music from "./listmusic.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Array Queue Song

// Variables
const home = $(".feature-home");
const library = $(".feature-library");
const queue = $(".feature-queue");
const main_playList = $(".main-song .list-song");
const main = $("#main");
const playlistSong = $("#playlist-song");
const footer = $("#footer");
const audio = $("#audio");
const thumb = footer.querySelector(".thumbnail-song");
const rangeSong = footer.querySelector(".range-song");
const line = rangeSong.querySelector(".line");
const seekTime = rangeSong.querySelector("#seektime");
const currentTime = footer.querySelector("#currentTime");
const features_control = footer.querySelector(".features-control");
const addQueue = playlistSong.querySelector(".feature-add");
const main_queue = $("#main-queue");
const queueSong = [],
  previousSong = [];

// Function
const ui = {
  isHome: true,
  isLibrary: false,
  isQueue: false,
  isPlay: false,
  isRepeat: false,
  isSearch: false,
  isShuffle: false,
  indexPlaylist: "",
  currentSong: 0,
  currentIndex: 0,
  currentTime: 0,
  lastSong: -1,
  length: 0,
  currentVolume: 1,

  renderPlaylist() {
    let html = "";
    if (this.isHome === true) {
      playlist.forEach((item, index) => {
        html += `<div data-id="box${index + 1}" class="box-song">
          <img
            src="${item.patch}"
            alt="${item.name}"
            class="thumb-img"
          />

          <h4 class="name-song">${item.name}</h4>

          <div class="play-pause">
            <svg
              class="icon-control pause"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pause-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
              />
            </svg>
            <svg
              class="icon-control play"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-play-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
              />
            </svg>
          </div>
        </div>`;
      });
      main_playList.innerHTML = html;
    } else if (this.isLibrary == true) {
      let playlist_image = playlistSong.querySelector(".playlist-img");
      playlist_image.src = "./assets/img/listthumb/library.jpg";
      playlist_image.alt = "Library";
      let playlist_content = playlistSong.querySelector(".content");
      playlist_content.querySelector(".name-playlist").innerText = "Library";
      playlist_content.querySelector(".number").innerText = music.length;
      playlistSong.querySelector(".playlist-thumb").style.backgroundColor =
        "rgba(216, 201, 170, 0.7)";
      music.forEach((item, index) => {
        html += `
        <li class="song-item">
          <div class="song">
            <span class="number-stt">${index + 1}</span>
            <img
              src="${item.thumb}"
              alt="${item.name}"
              class="song-thumb"
            />
            <section class="info-song" audio-id="${index}">
              <h3 class="name-song">${item.name}</h3>
              <h3 class="name-singer">${item.singer}</h3>
            </section>
            <span class="time-song">${item.duration}</span>
          </div>
          <span class="feature-add add">
            <span class="name-feature">Add to queue</span>
            <svg
              class="icon-add"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </span>
        </li>`;
      });
      playlistSong.querySelector(".box-list-song").innerHTML = html;
    } else if (arguments.length > 0) {
      let playlist_image = playlistSong.querySelector(".playlist-img");
      let thumb = arguments[0],
        name = arguments[1];
      playlist_image.src = thumb;
      playlist_image.alt = name;
      let playlist_content = playlistSong.querySelector(".content");
      playlist_content.querySelector(".name-playlist").innerText = name;
      playlistSong.querySelector(".playlist-thumb").style.backgroundColor =
        "rgba(166, 219, 253, 0.5)";
      let total = 1;
      music.forEach((item, index) => {
        if (item.playlist.includes(name)) {
          html += `
          <li class="song-item">
            <div class="song">
              <span class="number-stt">${total++}</span>
              <img
                src="${item.thumb}"
                alt="${item.name}"
                class="song-thumb"
              />
              <section class="info-song" audio-id="${index}">
                <h3 class="name-song">${item.name}</h3>
                <h3 class="name-singer">${item.singer}</h3>
              </section>
              <span class="time-song">${item.duration}</span>
            </div>
            <span class="feature-add add">
              <span class="name-feature">Add to queue</span>
              <svg
                class="icon-add"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </span>
          </li>`;

          // Thêm song vào queue
          if (total == 2) previousSong.push(index);
          if (arguments.length == 3 && arguments[2] == true) {
            if (total != 2) queueSong.push(index);
          }
        }
      });
      playlist_content.querySelector(".number").innerText = total - 1;
      playlistSong.querySelector(".box-list-song").innerHTML = html;
    }
  },

  renderSong(item) {
    let song = item.querySelector(".info-song").getAttribute("audio-id");
    thumb.src = music[song].thumb;
    thumb.alt = music[song].name;
    footer.querySelector(".namesong").innerText = music[song].name;
    footer.querySelector(".namesinger").innerText = music[song].singer;
    footer.querySelector("#timesong").innerText = music[song].duration;
    audio.src = music[song].patch;
    this.isPlay = false;
    this.currentSong = song;
    this.currentIndex = Number(item.querySelector(".number-stt").innerText);
    audio.play();
    footer.querySelector(".play-pause").classList.add("active");
    // Lấy tiếp bài hát
    // Đồng bộ giữa nhạc hiện tại và queue
    let nowSong = main_queue.querySelector(".now-playing .box-list-song");
    nowSong.innerHTML = `
    <li class="song-item">
      <div class="song">
        <span class="number-stt">1</span>
        <img
          src="${music[this.currentSong].thumb}"
          alt="${music[this.currentSong].name}"
          class="song-thumb"
        />
        <section class="info-song">
          <h3 class="name-song">${music[this.currentSong].name}</h3>
          <h3 class="name-singer">${music[this.currentSong].singer}</h3>
        </section>
        <span class="time-song">${music[this.currentSong].duration}</span>
      </div>
      <span class="feature-add add">
        <span class="name-feature">Add to queue</span>
        <svg
          class="icon-add"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
      </span>
    </li>`;
  },

  renderSearch(arrSong) {
    let total = 1,
      html = "";
    arrSong.forEach((item, index) => {
      html += `
        <li class="song-item">
          <div class="song">
            <span class="number-stt">${total++}</span>
            <img
              src="${item.thumb}"
              alt="${item.name}"
              class="song-thumb"
            />
            <section class="info-song" audio-id="${item.id - 1}">
              <h3 class="name-song">${item.name}</h3>
              <h3 class="name-singer">${item.singer}</h3>
            </section>
            <span class="time-song">${item.duration}</span>
          </div>
          <span class="feature-add add">
            <span class="name-feature">Add to queue</span>
            <svg
              class="icon-add"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </span>
        </li>`;
    });
    $("#song-search").querySelector(".box-list-song").innerHTML = html;
    this.activeSong($("#song-search"));
    this.isSearch = true;
  },

  renderQueue(arrSong) {
    let nextSong = main_queue.querySelector(".next-song .box-list-song"),
      songItem = "";
    songItem = queueSong.map((item, index) => {
      return `
      <li class="song-item">
        <div class="song">
          <span class="number-stt">${index + 1}</span>
          <img
            src="${music[item].thumb}"
            alt="${music[item].name}"
            class="song-thumb"
          />
          <section class="info-song">
            <h3 class="name-song">${music[item].name}</h3>
            <h3 class="name-singer">${music[item].singer}</h3>
          </section>
          <span class="time-song">${music[item].duration}</span>
        </div>
        <span class="feature-remove remove">
          <span class="name-feature">Remove to queue</span>
          <svg
            class="icon-add"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
    </li>`;
    });
    nextSong.innerHTML = songItem.join("");
    this.removeQueue();
  },

  createSong(indexSong) {
    let song = document.createElement("div");
    song.classList.add("song-item");

    let song_item = `
      <div class="song">
        <span class="number-stt">1</span>
        <img src="${music[indexSong].thumb}">
        <section class="info-song" audio-id="${indexSong}">
          <h3 class="name-song">${music[indexSong].name}</h3>
          <h3 class="name-singer">${music[indexSong].singer}</h3>
        </section>
        <span class="time-song">${music[indexSong].duration}</span>
      </div>`;
    song.innerHTML = song_item;
    this.renderSong(song);
  },

  activeSong(playlistSong) {
    let boxSong = playlistSong.querySelectorAll(".song-item");
    boxSong.forEach((item) => {
      let value = item.querySelector(".song");
      let add = item.querySelector(".feature-add");
      value.addEventListener("click", () => {
        this.renderSong(value);
      });

      // Thêm vào queue khi nhấn nút add
      add.addEventListener("click", () => {
        let index = item.querySelector(".info-song").getAttribute("audio-id");
        this.addQueue(playlistSong, index);
      });
    });
  },

  activeQueue(playlistSong) {
    let boxSong = playlistSong.querySelectorAll(".song-item");
    boxSong.forEach((item) => {
      let value = item.querySelector(".song");
      let add = item.querySelector(".feature-add");
      value.addEventListener("click", () => {
        this.renderSong(value);
      });
    });
  },
  // Đưa danh sách nhạc vào playlist khi click nút play kế bên playlist
  getPlaylistQueue(playlistSong) {},
  handleEvent() {
    // Xử lý active home
    home.addEventListener("click", () => {
      this.isHome = true;
      this.isLibrary = this.isQueue = false;
      home.classList.add("active");
      library.classList.remove("active");
      queue.classList.remove("active");
      main.style.display = "block";
      playlistSong.style.display = "none";
      main_queue.style.display = "none";
    });

    // Xử lý active library
    library.addEventListener("click", () => {
      this.isLibrary = true;
      this.isHome = this.isQueue = this.isSearch = false;
      library.classList.add("active");
      home.classList.remove("active");
      queue.classList.remove("active");
      main.style.display = "none";
      playlistSong.style.display = "block";
      main_queue.style.display = "none";
      this.renderPlaylist();
      this.activeSong(playlistSong);
    });

    // Xử lý active Last listen
    queue.addEventListener("click", () => {
      this.isQueue = true;
      this.isHome = this.library = this.isSearch = false;
      queue.classList.add("active");
      home.classList.remove("active");
      library.classList.remove("active");
      main.style.display = "none";
      playlistSong.style.display = "none";
      main_queue.style.display = "block";
      this.renderQueue(queueSong);
      this.activeQueue(main_queue);
    });

    // Xử lý active playlist
    if (this.isHome == true) {
      let isCheckPlay = false,
        check = false;
      $$(".main-song [data-id]").forEach((item) => {
        // Click chọn nhạc trong playlist
        item.querySelector(".play-pause").onclick = () => {
          this.isCheckPlay = true;
          if (item.getAttribute("data-id") == this.indexPlaylist)
            this.check = false;
          else {
            this.indexPlaylist = item.getAttribute("data-id");
            this.check = true;
          }
        };
        item.addEventListener("click", () => {
          if (!this.isCheckPlay) {
            this.isHome = this.isLibrary = this.isQueue = this.isSearch = false;
            home.classList.remove("active");
            main.style.display = "none";
            playlistSong.style.display = "block";
          } else {
            this.isHome = this.isLibrary = this.isQueue = this.isSearch = false;
          }
          let thumb = item.querySelector(".thumb-img").src;
          let name = item.querySelector(".name-song").innerText;
          // Render playlist
          if (!this.isCheckPlay) this.renderPlaylist(thumb, name);
          else {
            if (this.check == true) {
              queueSong.splice(0, queueSong.length);
            }
            this.renderPlaylist(thumb, name, this.check);
            let value = playlistSong.querySelector(".song-item .song");
            this.renderSong(value);
          }
          // Click vào Song
          this.isCheckPlay = this.check = false;
          this.activeSong(playlistSong);
        });
        // Đồng bộ giữa play-pause của footer và play-pause của playlist
      });
    }

    // Xử lý click button play-pause audio
    let play = footer.querySelector(".play-pause");
    play.addEventListener("click", () => {
      if (this.isPlay) {
        play.classList.add("active");
        audio.play();
      } else {
        play.classList.remove("active");
        audio.pause();
      }
      this.isPlay = !this.isPlay;
    });

    // Xử lý time Song
    audio.ontimeupdate = () => {
      this.currentTime = audio.currentTime;
      seekTime.value = (this.currentTime / audio.duration) * 100;
      let minute = 0,
        second = Math.floor(this.currentTime % 60);
      if (this.currentTime >= 60) {
        minute = Math.floor(this.currentTime / 60);
      }
      if (second < 10) {
        second = "0" + second;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      currentTime.innerText = `${minute}:${second}`;
      line.style.width = seekTime.value + "%";
      // Check volume
      audio.volume = this.currentVolume;
    };

    // Xử lý khi nhạc chạy hết
    audio.onpause = () => {
      if (audio.ended) {
        if (this.isRepeat) {
          this.createSong(this.currentSong);
        } else {
          if (queueSong.length != 0) {
            if (!this.isShuffle) this.nextSong();
            else this.nextSong(true);
            this.renderQueue(queueSong);
          } else {
            footer.querySelector(".play-pause").classList.remove("active");
          }
        }
      }
    };

    // Xử lý khi tua Song
    seekTime.oninput = (e) => {
      const value = (audio.duration / 100) * e.target.value;
      audio.currentTime = value;
    };

    // Xử lý volume Song
    footer.querySelector("#seekvolume").oninput = (e) => {
      this.currentVolume = e.target.value / 100;
    };

    // Xử lý Repeat Song
    let repeat = features_control.querySelector(".repeat");
    repeat.onclick = () => {
      repeat.classList.toggle("active");
      this.isRepeat = !this.isRepeat;
    };

    // Xử lý Search Song
    let search = $("#input-search");
    search.oninput = (e) => {
      let value = e.target.value.toLowerCase();
      if (value != "") {
        main.classList.add("active");
        let itemSearch = music.filter((item) => {
          let str = item.name.toLowerCase();
          return str.includes(value);
        });
        this.renderSearch(itemSearch);
        this.isSearch = true;
      } else {
        this.isSearch = false;
        main.classList.remove("active");
      }
    };

    // Xử lý nextSong
    footer.querySelector(".next").onclick = () => {
      if (!this.isRepeat) this.nextSong();
      else {
        this.createSong(this.currentSong);
      }
      this.renderQueue(queueSong);
    };

    // Xử lý previous song
    footer.querySelector(".previous").onclick = () => {
      if (!this.isRepeat) this.previousSong();
      else {
        this.createSong(this.currentSong);
      }
      this.renderQueue(queueSong);
    };

    // Xử lý repeatSong
    this.repeatSong();
    // Xử lý shuffleSong
    this.shuffleSong();
  },

  addQueue(playlistSong, index) {
    let toast_add = document.createElement("section");
    toast_add.classList.add("toast-add");
    toast_add.innerHTML = `<span class="text">Added to queue</span> `;
    playlistSong.appendChild(toast_add);
    queueSong.push(index);
  },

  // Xử lý nextSong
  nextSong(check = false) {
    if (queueSong.length != 0) {
      if (check == false) {
        this.createSong(queueSong[0]);
        previousSong.unshift(queueSong[0]);
        queueSong.shift();
      } else {
        let index = 0;
        do {
          index = Math.floor(Math.random() * queueSong.length) + queueSong[0];
        } while (index == this.currentSong);
        if (queueSong.indexOf(index) != -1) {
          this.createSong(queueSong[index]);
          previousSong.unshift(queueSong[index]);
          queueSong.splice(index, 1);
        }
      }
    } else {
      this.createSong(this.currentSong);
    }
  },

  // Xử lý previousSong
  previousSong() {
    if (previousSong.length != 0) {
      if (previousSong.length > 1) {
        queueSong.unshift(previousSong[0]);
        previousSong.shift();
      }
      this.createSong(previousSong[0]);
      // queueSong.unshift(previousSong[0]);
    } else {
      this.createSong(this.currentSong);
    }
  },

  indexShuffle() {},
  // Remove Queue
  removeQueue() {
    let listSong = main_queue.querySelectorAll(".next-song .song-item");
    listSong.forEach((item) => {
      item.querySelector(".remove").onclick = () => {
        let index = Number(item.querySelector(".number-stt").innerText);
        queueSong.splice(index - 1, 1);
        this.renderQueue(queueSong);
      };
    });
  },

  // Repeat Song
  repeatSong() {
    let repeat = features_control.querySelector(".repeat");
    repeat.onclick = () => {
      repeat.classList.toggle("active");
      this.isRepeat = !this.isRepeat;
    };
  },

  // Xử lý shuffleSong
  shuffleSong() {
    let shuffle = features_control.querySelector(".shuffle");
    shuffle.onclick = () => {
      shuffle.classList.toggle("active");
      this.isShuffle = !this.isShuffle;
    };
  },
  start() {
    this.renderPlaylist();
    this.handleEvent();
  },
};

ui.start();
