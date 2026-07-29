function startGame(){

    document.getElementById("title").style.display="none";
    document.getElementById("game").style.display="block";

    startTime = performance.now();
    nextNote = 0;
    timer = 0;

    requestAnimationFrame(loop);

    if(loadedMusic){

        music = loadedMusic;

        music.currentTime = 0;

        music.play();

    }else if(currentSong && currentSong.audio){

        music = new Audio(currentSong.audio);

        music.play();

    }

    startSongTimer();

}

function loop(){

    if(paused){
        requestAnimationFrame(loop);
        return;
    }

    const now = performance.now() - startTime;

    while(
        nextNote < currentSong.chart.length &&
        now >= currentSong.chart[nextNote].time
    ){
        spawnChart(currentSong.chart[nextNote]);
        nextNote++;
    }

    for(let i = notes.length - 1; i >= 0; i--){
        const n = notes[i];

        n.update();

        if(n.y > 700){

            n.element.remove();
            notes.splice(i,1);

            combo = 0;
            miss++;

            document.getElementById("comboValue").textContent = combo;

            showJudge("MISS","#ff4444");
            updateAccuracy();

            continue;
        }

        if(n.type==="hold"){

            const key=["d","f","j","k"][n.lane];

            // 判定ラインで押した
            if(
                !n.holding &&
                holdKeys[key] &&
                Math.abs(n.y-610)<20
            ){
                n.holding=true;
            }

            // 押し続けている
            if(n.holding){
                
                n.element.style.filter=
                "drop-shadow(0 0 15px #ff66ff)";
                score++;

                // 途中で離した
                if(!holdKeys[key]){

                    combo=0;
                    miss++;

                    n.element.remove();
                    notes.splice(i,1);

                    showJudge("MISS","#ff4444");

                    continue;

                }

                // 終点まで来た
                const tail = n.y + n.length/8;

                if(tail > 610){

                    perfect++;
                    combo++;

                    n.element.remove();
                    notes.splice(i,1);

                    showJudge("PERFECT","#ff66ff");

                    perfectExplosion();

                    flashLane(n.lane);

                    showJudge(
                    "HOLD PERFECT",
                    "#ff66ff"
                    );

                    continue;

                }

            }

        }

        if(auto && Math.abs(n.y - 610) < 5){

            score += 1000;
            combo++;
            checkAchievements();
            perfect++;

            n.element.remove();
            notes.splice(i,1);

            document.getElementById("scoreValue").textContent = score;
            document.getElementById("comboValue").textContent = combo;

            showJudge("AUTO","#00ff88");
            updateComboEffect();
            updateAccuracy();
        }

    }

    if(combo>=100){

        rainbowBackground();

    }

    if(music){

        timeText.textContent=
        music.currentTime.toFixed(2)+" 秒";

    }
    updateFPS();
    requestAnimationFrame(loop);

}

function spawnChart(data){

    createNote(data);

}

function spawnNote(){

    createNote({
        lane:Math.floor(Math.random()*4),
        type:"tap"
    });

}

function showResult(){

document.getElementById("game").style.display="none";

const result=document.createElement("div");

result.id="result";

result.style.position="absolute";
result.style.inset="0";
result.style.background="#111";
result.style.display="flex";
result.style.flexDirection="column";
result.style.justifyContent="center";
result.style.alignItems="center";

const acc=((perfect*100+great*80+good*50)/((perfect+great+good+miss)*100)*100).toFixed(2);

let rank = "F";

if(acc >= 100) rank = "SSS";
else if(acc >= 99) rank = "SS";
else if(acc >= 97) rank = "S";
else if(acc >= 94) rank = "A";
else if(acc >= 90) rank = "B";
else if(acc >= 80) rank = "C";
else if(acc >= 70) rank = "D";

result.innerHTML=`
<h1>RESULT</h1>

<h2>Score : ${score}</h2>
<h1>${rank}</h1>
<h2>Accuracy : ${acc}%</h2>

<h2>Perfect ${perfect}</h2>

<h2>Great ${great}</h2>

<h2>Good ${good}</h2>

<h2>Miss ${miss}</h2>

<button onclick="location.reload()">Retry</button>
`;

document.body.appendChild(result);

saveHighScore();

}

const longNotes = [
    {
        time:5000,
        lane:1,
        length:1200
    }
];

document.addEventListener("keydown",e=>{

    if(e.key in holdKeys){

        holdKeys[e.key]=true;

    }

});

document.addEventListener("keyup",e=>{

    if(e.key in holdKeys){

        holdKeys[e.key]=false;

    }

});
