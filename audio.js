let loadedMusic = null;

function loadMusic(){

    const file =
        document.getElementById("musicFile").files[0];

    if(!file){

        alert("音楽ファイルを選択してください。");
        return;

    }

    loadedMusic = new Audio(
        URL.createObjectURL(file)
    );

    alert("読み込み完了！");

}

document.addEventListener("keydown",e=>{

    if(e.code==="Space"){

        if(!music)return;

        if(music.paused){

            music.play();

            paused=false;

        }else{

            music.pause();

            paused=true;

        }

    }

});

const timeText=document.createElement("div");

timeText.style.position="absolute";
timeText.style.top="140px";
timeText.style.left="20px";
timeText.style.fontSize="24px";

document.body.appendChild(timeText);

document.getElementById("volumeSetting").oninput=function(){

    document.getElementById("volumeValue").textContent=
        this.value+"%";

    if(music){

        music.volume=this.value/100;

    }

};

let songLength = 60;
let timer = 0;

function startSongTimer(){

    timer = 0;

    setInterval(()=>{

        timer++;

        if(timer >= songLength){

            showResult();

        }

    },1000);

}

const BPM = 120;

async function loadChart(file) {
    const response = await fetch(file);
    return await response.json();
}

let startTime=0;
let nextNote=0;

document.addEventListener("keydown",e=>{

if(e.key==="Escape"){

paused=!paused;

}

});

const songs = [

{
    name:"シャイニングスター",
    bpm:120,
    audio:"music/シャイニングスター.mp3",
    chartFile:"charts/シャイニングスター.json"
},

{
    name:"Fast Beat",
    bpm:180,
    audio:"music/fast.mp3",
    chartFile:"charts/fast.json"
},

{
    name:"Night Sky",
    bpm:140,
    audio:"music/12345.mp3",
    chartFile:"charts/12345.json"
}

];

async function selectSong(i){

    currentSong = songs[i];

    currentSong.chart = await loadChart(currentSong.chartFile);

    startGame();

}

let music
let currentSong;
