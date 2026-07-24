let skin = 0;

const skins = [
    "cyan",
    "#ff4d4d",
    "#ffd700",
    "#00ff66",
    "#ff66ff"
];

function applySkin(){

    document.querySelectorAll(".note").forEach(note=>{

        note.style.background = skins[skin];

    });

}

function nextSkin(){

    skin++;

    if(skin>=skins.length){

        skin=0;

    }

    applySkin();

}
