function hitEffect(x,y,color){

    for(let i=0;i<10;i++){

        const p=document.createElement("div");

        p.style.position="fixed";
        p.style.left=x+"px";
        p.style.top=y+"px";

        p.style.width="8px";
        p.style.height="8px";
        p.style.borderRadius="50%";
        p.style.background=color;

        document.body.appendChild(p);

        const dx=(Math.random()-0.5)*200;
        const dy=(Math.random()-0.5)*200;

        p.animate([
            {transform:"translate(0,0)",opacity:1},
            {transform:`translate(${dx}px,${dy}px)`,opacity:0}
        ],{
            duration:500
        });

        setTimeout(()=>p.remove(),500);

    }

}

function perfectExplosion(){

for(let i=0;i<30;i++){

const p=document.createElement("div")

p.className="particle"

p.style.left="50%"

p.style.top="610px"

document.body.appendChild(p)

const angle=Math.random()*Math.PI*2

const d=100*Math.random()

p.animate([

{
transform:"translate(0,0)"
},

{
transform:`translate(${Math.cos(angle)*d}px,${Math.sin(angle)*d}px)`
}

],{

duration:500

})

setTimeout(()=>p.remove(),500)

}

}

function flashLane(i){

lanes[i].animate([

{
background:"#ffffff"
},

{
background:"#222"
}

],{

duration:120

})

}

const fps=document.createElement("div");

fps.style.position="absolute";
fps.style.right="20px";
fps.style.bottom="20px";
fps.style.fontSize="20px";

document.body.appendChild(fps);

let last=performance.now();

function updateFPS(){

    const now=performance.now();

    fps.textContent=
    "FPS : "+Math.round(1000/(now-last));

    last=now;

}

function rainbowBackground(){

    document.body.style.background=
    `hsl(${performance.now()/20},70%,12%)`;

}
