const lanes=document.querySelectorAll(".lane")

let notes=[]

let score=0
let combo=0

let noteSpeed=5;
let paused=false;
let auto=false

document.addEventListener("keydown",e=>{

if(e.key==="F9")

auto=!auto

})

saveHighScore();
