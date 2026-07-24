let editorMode=false;

function toggleEditor(){

    editorMode=!editorMode;

    alert(editorMode ?
        "譜面エディタON" :
        "譜面エディタOFF");

}

document.addEventListener("keydown",e=>{

    if(!editorMode)return;

    const lane=keyMap[e.key.toLowerCase()];

    if(lane===undefined)return;

    chart.push({

        time:performance.now()-startTime,

        lane:lane

    });

});

function exportChart(){

    console.log(JSON.stringify(chart,null,2));

    alert("譜面データをコンソールへ出力しました。");

}
