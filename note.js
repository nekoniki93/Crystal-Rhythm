class Note{

    constructor(data){

        this.lane = data.lane;
        this.time = data.time;
        this.type = data.type || "tap";
        this.length = data.length || 0;

        this.y = -30;
        this.element = null;

    }

    update(){

        this.y += noteSpeed;

        if(this.element){

            this.element.style.top = this.y + "px";

        }

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
