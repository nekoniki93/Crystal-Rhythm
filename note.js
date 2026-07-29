class Note{

    constructor(data){

        this.lane = data.lane;
        this.type = data.type || "tap";
        this.time = data.time;
        this.length = data.length || 0;

        this.y = -30;
        this.element = null;

    }

}

function createNote(data){

    const note = document.createElement("div");

    note.className = "note";

    if(data.type === "hold"){

        note.classList.add("hold");

        note.style.height = data.length / 8 + "px";

    }

    lanes[data.lane].appendChild(note);

    const n = new Note(data);

    n.element = note;

    notes.push(n);

}
