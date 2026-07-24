const keyMap={
"d":0,
"f":1,
"j":2,
"k":3
}

document.addEventListener("keydown",e=>{

const lane=keyMap[e.key.toLowerCase()]

if(lane===undefined)return

lanes[lane].style.background="#444"

setTimeout(()=>{
lanes[lane].style.background="#222"
},80)

})

// ===== 判定表示 =====
const judge=document.createElement("div");
judge.style.position="absolute";
judge.style.top="180px";
judge.style.left="50%";
judge.style.transform="translateX(-50%)";
judge.style.fontSize="60px";
judge.style.fontWeight="bold";
judge.style.pointerEvents="none";
document.body.appendChild(judge);

const accuracy=document.createElement("div");
accuracy.style.position="absolute";
accuracy.style.left="20px";
accuracy.style.top="100px";
accuracy.style.fontSize="24px";
accuracy.innerHTML="Accuracy : 100%";
document.body.appendChild(accuracy);

let perfect=0;
let great=0;
let good=0;
let miss=0;

// キー入力
document.addEventListener("keydown",e=>{

    const lane=keyMap[e.key.toLowerCase()];
    if(lane===undefined)return;

    let target=null;
    let best=9999;

    for(const n of notes){

        if(n.lane!==lane)continue;

        const diff=Math.abs(n.y-610);

        if(diff<best){
            best=diff;
            target=n;
        }

    }

    if(!target)return;
    
    if(best<=20){

        score+=1000;
        combo++;
        perfect++;
        showJudge("PERFECT","#00ff88");
        hitEffect(window.innerWidth/2,610,"#00ff88");
        flashLane(lane)
        perfectExplosion()
        updateComboEffect();
        life += 1;
        updateLife();
        
    }else if(best<=40){

        score+=700;
        combo++;
        great++;
        showJudge("GREAT","#00aaff");
        hitEffect(window.innerWidth/2,610,"#00aaff");
        updateComboEffect();
        life += 0.5;
        updateLife();
        
    }else if(best<=70){

        score+=300;
        combo++;
        good++;
        showJudge("GOOD","#ffff00");
        hitEffect(window.innerWidth/2,610,"#ffff00");
        life -= 2;
        updateLife();

    }else{

        combo=0;
        miss++;
        showJudge("MISS","#ff4444");
        life -= 8;
        updateLife();
        return;

    }

    target.element.remove();
    notes.splice(notes.indexOf(target),1);

    document.getElementById("scoreValue").textContent=score;
    document.getElementById("comboValue").textContent=combo;

    updateAccuracy();

});

function showJudge(text,color){

    judge.textContent=text;

    if(text==="PERFECT"){

        judge.style.color=
        `hsl(${performance.now()/10},100%,60%)`;

    }else{

        judge.style.color=color;

    }

    judge.style.opacity="1";

    judge.style.transform=
    "translateX(-50%) scale(1.4)";

    setTimeout(()=>{

        judge.style.opacity="0";

        judge.style.transform=
        "translateX(-50%) scale(1)";

    },250);

}

function updateAccuracy(){

    const total=perfect+great+good+miss;

    const value=
        (perfect*100+
        great*80+
        good*50)/
        (total*100);

    accuracy.innerHTML=
    "Accuracy : "+
    (value*100).toFixed(2)+"%";

}


const comboText=document.createElement("div");

comboText.style.position="absolute";
comboText.style.top="260px";
comboText.style.left="50%";
comboText.style.transform="translateX(-50%)";
comboText.style.fontSize="50px";
comboText.style.fontWeight="bold";

document.body.appendChild(comboText);

function updateComboEffect(){

    comboText.textContent =
        combo>1 ? combo+" COMBO" : "";

    comboText.style.transform =
        "translateX(-50%) scale(1.3)";

    comboText.style.color="white";

    if(combo>=30){

        comboText.style.color="#00ff66";

    }

    if(combo>=50){

        comboText.style.color="#00ccff";

    }

    if(combo>=100){

        comboText.style.color="#ff00ff";

        document.body.animate([

            {
                background:"#111"
            },

            {
                background:"#333"
            },

            {
                background:"#111"
            }

        ],{

            duration:300

        });

    }

    setTimeout(()=>{

        comboText.style.transform=
        "translateX(-50%) scale(1)";

    },80);

}

let life = 100;

function updateLife(){

    if(life < 0) life = 0;
    if(life > 100) life = 100;

    document.getElementById("lifeBar").style.width = life + "%";

    if(life <= 0){
        showResult();
    }

}
