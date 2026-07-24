function createNote(data){

    const note = document.createElement("div");

    note.className = "note";

    if(data.type === "hold"){

        note.classList.add("hold");

        note.style.height = data.length / 8 + "px";

    }

    lanes[data.lane].appendChild(note);

    notes.push({

        lane:data.lane,

        y:-30,

        type:data.type,

        length:data.length || 0,

        element:note

    });

}
