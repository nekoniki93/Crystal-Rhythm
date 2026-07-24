const achievements=[];

function unlock(name){

    if(achievements.includes(name)) return;

    achievements.push(name);

    alert("🏆 実績解除\n" + name);

}

function checkAchievements(){

    if(combo >= 50){
        unlock("50 COMBO!");
    }

    if(combo >= 100){
        unlock("100コンボ");
    }

    if(score >= 100000){
        unlock("スコア100000突破");
    }

    if(perfect >= 300){
        unlock("PERFECT MASTER");
    }

}
