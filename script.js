console.log('Welcome to Musify');

// Identifying the elements by ID
let songIndex = 0;
let songname = document.getElementById('songname');
console.log(songname.innerText);
let audioelement = new Audio('');
console.log(audioelement.src);
let masterPlay = document.getElementById('masterplay');
let progress = document.getElementById('progress');
let gif = document.getElementById('gif');
console.log(gif);
let songlist = Array.from(document.getElementsByClassName('songs'));
let songplay = Array.from(document.getElementsByClassName('masterPlay'));
let alert = document.getElementById('alert');
let alertbtn = document.getElementsByClassName('alertbtn');

let songs = [
    { name: 'K/DA POP/STARS', filepath: 'songs/1.mp3', coverpath: './covers/1.jpg', duration: '3.22' },
    { name: 'Summer Feelings', filepath: 'songs/2.mp3', coverpath: 'covers/2.jpg', duration: '2.40' },
    { name: 'Main Dhoondne Ko', filepath: 'songs/3.mp3', coverpath: 'covers/3.jpg', duration: '4.32' },
    { name: 'Brave Shine', filepath: 'songs/4.mp3', coverpath: 'covers/4.jpg', duration: '3.52' },
    { name: 'Apna Bana Le', filepath: 'songs/5.mp3', coverpath: 'covers/5.jpg', duration: '3.24' },
    { name: 'Innocent of D', filepath: 'songs/6.mp3', coverpath: 'covers/6.jpg', duration: '4.01' },
    { name: 'Fake Love', filepath: 'songs/7.mp3', coverpath: 'covers/7.jpg', duration: '6.21' },
    { name: 'Chale Aana', filepath: 'songs/8.mp3', coverpath: 'covers/8.jpg', duration: '4.13' },
    { name: 'Bloody Power Fame', filepath: 'songs/9.mp3', coverpath: 'covers/10.png', duration: '3.58' }
]

// Master Play/Pause
masterPlay.addEventListener('click', () => {
    if (songIndex == 0 || audioelement.src == 'https://localhost') {
        alert.style.display = 'grid';
    }
    else if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioelement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});
// PREVIOUS BUTTON
document.getElementById('previous').addEventListener('click', (e) => {
    songIndex = songIndex - 1;
    if (songIndex < 1) {
        songIndex = 9;
    }
    audioelement.src = `songs/${songIndex}.mp3`;
    audioelement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songname.innerText = songs[songIndex - 1].name;
    let preElement = document.getElementById(`${songIndex}`);
    removeplay();
    preElement.classList.remove('fa-play-circle');
    preElement.classList.add('fa-pause-circle');
    console.log(preElement);
    gif.style.opacity = 1;
});
// NEXT BUTTON
document.getElementById('next').addEventListener('click', () => {
    songIndex = songIndex + 1;
    if (songIndex > 9) {
        songIndex = 1;
    }
    audioelement.src = `songs/${songIndex}.mp3`;
    audioelement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songname.innerText = songs[songIndex - 1].name;
    console.log(songIndex);
    let preElement = document.getElementById(`${songIndex}`);
    removeplay();
    preElement.classList.remove('fa-play-circle');
    preElement.classList.add('fa-pause-circle');
    console.log(preElement);
    gif.style.opacity = 1;
});


// PROGRESS BAR
// Regular Progress
audioelement.addEventListener('timeupdate', () => {
    let newprogress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    // console.log(audioelement.duration);
    progress.value = newprogress;
    if (audioelement.currentTime == audioelement.duration) {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        progress.value = 0;
        gif.style.opacity = 0;
    }
    // console.log(newprogress);
});

// Streaming Progress
progress.addEventListener('change', () => {
    let newprogress = parseInt((progress.value * audioelement.duration) / 100);
    audioelement.currentTime = newprogress;
});

// SETTING CORRECT IMG AND SONG NAMES
songlist.forEach((elements, i) => {
    elements.getElementsByTagName('img')[0].src = songs[i].coverpath;
    elements.getElementsByClassName('info')[0].innerHTML = songs[i].name;
    elements.getElementsByClassName('time')[0].getElementsByTagName('span')[0].innerHTML = songs[i].duration;
});

// FINDING AND SETTING THE SELECTED AUDIO
let removeplay = () => {
    Array.from(document.getElementsByClassName('songfont')).forEach((element) => {
        // console.log(element);
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    });
}

Array.from(document.getElementsByClassName('songs')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        removeplay();
        songIndex = parseInt(e.target.id);
        // console.log("index"+ songIndex);
        // console.log(e);
        // console.log(document.getElementById(e.target.id).childNodes);
        // console.log(document.getElementById(e.target.id).childNodes.item(5).childNodes.item(3).classList);
        document.getElementById(e.target.id).childNodes.item(5).childNodes.item(3).classList.remove('fa-play-circle');
        document.getElementById(e.target.id).childNodes.item(5).childNodes.item(3).classList.add('fa-pause-circle');
        // e.target.classList.remove('fa-play-circle');
        // e.target.classList.add('fa-pause-circle');
        // audioelement.currentTime = 0;
        audioelement.src = `songs/${songIndex}.mp3`;
        audioelement.play();
        // console.log(element);
        songname.innerText = songs[songIndex - 1].name;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
    });
});

// ADDING BUTTON FUNCTION
alertbtn[0].addEventListener('click',()=>{
    alert.style.display = 'none';
});