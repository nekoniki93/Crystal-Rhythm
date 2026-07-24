function saveHighScore(){

    const high = Number(localStorage.getItem("highscore") || 0);

    if(score > high){
        localStorage.setItem("highscore", score);
    }

    document.getElementById("high").textContent =
        "High Score : " + (localStorage.getItem("highscore") || 0);

}

function autoSave(){

    localStorage.setItem("save",JSON.stringify({

        highscore:score,
        speed:noteSpeed,
        auto:auto

    }));

}

setInterval(autoSave,5000);
