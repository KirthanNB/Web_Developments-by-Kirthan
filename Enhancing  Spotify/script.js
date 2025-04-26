async function getSongs() {

    let songs = [];

    try {

        const response = await fetch('http://127.0.0.1:3002/Songs/');

        const html = await response.text();



        // Create a temporary DOM from the HTML

        const parser = new DOMParser();

        const doc = parser.parseFromString(html, 'text/html');



        // Get all <a> elements

        const links = Array.from(doc.querySelectorAll('a'));



        // Filter only .mp3 links and build full URLs with cleaned slashes

        songs = links

            .map(link => link.getAttribute('href'))

            .filter(href => href.endsWith('.mp3'))

            .map(mp3 => `http://127.0.0.1:3002${mp3.replace(/\\/g, '/')}`);



        return songs;

    } catch (err) {

        console.error("Error fetching songs:", err);

    }

}



document.querySelector(".seekbar").addEventListener("click", (e) => {

    if (!currentAudio || !currentAudio.duration) return;



    const seekBar = e.currentTarget;

    const rect = seekBar.getBoundingClientRect();

    const clickX = e.clientX - rect.left;

    const percentage = clickX / rect.width;



    currentAudio.currentTime = percentage * currentAudio.duration;

});

let currentAudio = null;

let currentSong = null;

let maine = null;

function playmusic(song, e) {

    const playIcon = e.getElementsByTagName("img")[1];

    const playButton = document.querySelectorAll('.playsong button')[1].querySelector("img");

    const mainplay = document.querySelector(".mainplay"); // moved this outside the listener


    // ✅ Sync mainplay click with play/pause

    mainplay.onclick = () => {

        if (currentAudio && currentSong === song) {

            if (currentAudio.paused) {

                currentAudio.play();

                playIcon.src = "http://127.0.0.1:3002/Assets/Pause.svg";

                playButton.src = "http://127.0.0.1:3002/Assets/Pause.svg";

                mainplay.src = playIcon.src;

            } else {

                currentAudio.pause();

                playIcon.src = "http://127.0.0.1:3002/Assets/Play.svg";

                playButton.src = "http://127.0.0.1:3002/Assets/Play.svg";

                mainplay.src = playIcon.src;

            }

        }

    };



    if (currentAudio && currentSong === song) {

        if (!currentAudio.paused) {

            currentAudio.pause();

            playIcon.src = "http://127.0.0.1:3002/Assets/Play.svg";

            playButton.src = "http://127.0.0.1:3002/Assets/Play.svg";

            mainplay.src = playIcon.src;

        } else {

            currentAudio.play();

            playIcon.src = "http://127.0.0.1:3002/Assets/Pause.svg";

            playButton.src = "http://127.0.0.1:3002/Assets/Pause.svg";

            mainplay.src = playIcon.src;

        }

    } else {

        if (currentAudio) {

            currentAudio.pause();

        }



        Array.from(document.querySelectorAll(".songs li")).forEach(li => {

            const icon = li.getElementsByTagName("img")[1];

            icon.src = "http://127.0.0.1:3002/Assets/Play.svg";

        });



        currentAudio = new Audio(`http://127.0.0.1:3002/Songs/${song}.mp3`);

        currentSong = song;

        currentAudio.play();

        playIcon.src = "http://127.0.0.1:3002/Assets/Pause.svg";

        playButton.src = "http://127.0.0.1:3002/Assets/Pause.svg";

        mainplay.src = playIcon.src;



        currentAudio.addEventListener("loadedmetadata", () => {

            // Nothing inside here yet

        });



        currentAudio.addEventListener("timeupdate", () => {

            const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;

            const mins = Math.floor(currentAudio.currentTime / 60);

            const secs = Math.floor(currentAudio.currentTime % 60);

            document.querySelector(".fill").style.width = `${percentage}%`;

            document.querySelector(".timebar").innerHTML = `${mins}.${secs.toString().padStart(2, "0")} / ${Math.floor(currentAudio.duration / 60)}.${Math.floor(currentAudio.duration % 60)}`;

        });



        // ✅ Also update when the song ends

        currentAudio.addEventListener("ended", () => {

            playIcon.src = "http://127.0.0.1:3002/Assets/Play.svg";

            playButton.src = "http://127.0.0.1:3002/Assets/Play.svg";

            mainplay.src = playIcon.src;

        });

    }

}



async function main() {

    songs = await getSongs();

    console.log(songs);

    const songul = document.querySelector(".songs ul");



    for (const song of songs) {

        let songName = song.split("/Songs/")[1].replace(/\.mp3$/i, "");

        songul.innerHTML += `<li>
                             <img class="music" style="filter: invert(1);" src="Assets/Music.svg" alt="">
    
                                <p>
    
                                ${songName}
    
                                 </p>
    
                             <img style="filter: invert(1);" src="Assets/Play.svg" alt="Play">
    
                                 </li>`;

    }



    // Add event listeners for all songs

    Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e => {

        e.addEventListener("click", elements => {

            const songName = e.querySelector("p")?.textContent.trim();

            console.log(songName);

            maine = e;

            playmusic(songName, e);

            let displayName = songName.length > 20 ? songName.substring(0, 20) + "..." : songName;

            document.querySelector(".info").innerHTML = `${displayName}`;

        });

    });

    document.querySelector(".prev").addEventListener("click", () => {
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].includes(currentSong)) {
                let prevSong = songs[i - 1]?.split("/").pop().replace(".mp3", "");
                if (!prevSong) return; // No previous song (optional safety)
                console.log(prevSong);
    
                // 🛠 Update maine
                Array.from(document.querySelectorAll(".songs li")).forEach(li => {
                    if (li.querySelector("p")?.textContent.trim() === prevSong) {
                        maine = li;
                    }
                });
    
                playmusic(prevSong, maine);
    
                let displayName = prevSong.length > 20 ? prevSong.substring(0, 20) + "..." : prevSong;
                document.querySelector(".info").innerHTML = `${displayName}`;
                break;
            }
        }
    });

    document.querySelector(".next").addEventListener("click", () => {
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].includes(currentSong)) {
                let nextSong = songs[i + 1]?.split("/").pop().replace(".mp3", "");
                if (!nextSong) return; // No next song (optional safety)
                console.log(nextSong);
    
                // 🛠 Update maine
                Array.from(document.querySelectorAll(".songs li")).forEach(li => {
                    if (li.querySelector("p")?.textContent.trim() === nextSong) {
                        maine = li;
                    }
                });
    
                playmusic(nextSong, maine);
    
                let displayName = nextSong.length > 20 ? nextSong.substring(0, 20) + "..." : nextSong;
                document.querySelector(".info").innerHTML = `${displayName}`;
                break;
            }
        }
    });

// Function to perform search
function searchSongs() {
    let userInput = document.getElementById("srh").value.trim().toLowerCase();
    const allSongs = Array.from(document.querySelector(".songs ul").children);

    allSongs.forEach(li => {
        const songName = li.querySelector("p").textContent.toLowerCase();

        if (songName.includes(userInput)) {
            li.style.display = ""; // Show matching
        } else {
            li.style.display = "none"; // Hide non-matching
        }
    });
}

// Real-time input event listener
document.getElementById("srh").addEventListener("input", searchSongs);

// Click event listener (if you still want the button functionality)
document.querySelector(".SEARCH").addEventListener("click", searchSongs);

// Enter key event listener (optional if you still want Enter to trigger search)
document.getElementById("srh").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchSongs();  // Trigger search when Enter is pressed
    }
});

document.querySelector(".insta").addEventListener("click", e=>{
    window.open("https://www.instagram.com/kirthan.nb/", "_blank");
})
document.querySelector(".git").addEventListener("click", e=>{
    window.open("https://github.com/KirthanNB/", "_blank");
})
document.querySelector(".Linkedin").addEventListener("click", e=>{
    window.open("https://www.linkedin.com/in/kirthan-nb-8b522530b/", "_blank");
})
 
}


main();