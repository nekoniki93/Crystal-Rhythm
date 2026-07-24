function openSettings(){

    document.getElementById("settings").style.display="block";

}

function closeSettings(){

    document.getElementById("settings").style.display="none";

}

document.getElementById("speedSetting").oninput=function(){

    noteSpeed=Number(this.value);

};

document.getElementById("volumeSetting").oninput=function(){

    if(music){

        music.volume=this.value/100;

    }

};
